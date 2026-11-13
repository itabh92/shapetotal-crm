/**
 * Migração segura e idempotente de localStorage -> IndexedDB (via Eventos).
 * Regras obrigatórias:
 * 1) Backup JSON com data antes de migrar; não apagar localStorage (manter 30 dias).
 * 2) Gerar EVENTOS (nunca gravar direto nas projeções).
 * 3) Migração idempotente (IDs determinísticos por registro).
 * 4) Dinheiro em centavos inteiros; quantidades na unidade-base.
 * 5) Reconciliação obrigatória (produtos, clientes, vendas, saldo por SKU e custo total do estoque).
 */

import { reaisParaCentavos, createHlc } from '../dominio/index.js';
import { STORES, openDatabase, getAllFromStore, getMeta, setMeta } from './db.js';
import { commitEventsAtomic, reconstruirProjecoesDeEventos } from './reducers.js';

export const MIGRATION_FLAG_KEY = 'SHAPETOTAL_CRM_MIGRADO_V2';

export function exportarBackupLocalStorage(rawState, extraAudit = null, downloader = null) {
  const agora = new Date();
  const stamp = agora.toISOString().slice(0, 10);
  const filename = `backup-pre-migracao-${stamp}.json`;
  const payload = {
    versao: 1,
    exportadoEm: agora.toISOString(),
    origem: 'localStorage',
    estado: rawState || {},
    auditLog: extraAudit || []
  };
  const jsonStr = JSON.stringify(payload, null, 2);
  if (typeof downloader === 'function') {
    downloader(filename, jsonStr);
  }
  return { filename, jsonStr, bytes: jsonStr.length };
}

/**
 * Gera lista ordenada de eventos determinísticos a partir do estado localStorage + catálogo.
 */
export function gerarEventosMigracao(rawState, rawCatalog, getCustoUnitBrlFn) {
  const st = rawState || {};
  const catalog = Array.isArray(rawCatalog) ? rawCatalog : [];
  const hlc = createHlc({ ms: 1731500000000, n: 0 });
  const nowFn = () => 1731500000000;
  const eventos = [];

  const nextTs = () => hlc.tick('mig', null, nowFn);

  // 1. Produtos do catálogo (inclui fatorEmbalagem/unidadeBase para fracionados 9005/9006)
  for (const p of catalog) {
    if (!p || !p.id) continue;
    const pid = String(p.id);
    const isDoseVial = pid === '9005' || pid === '9006';
    eventos.push({
      id: `mig_prod_${pid}`,
      ts: nextTs(),
      device: 'mig',
      type: 'PRODUTO_SALVO',
      v: 1,
      synced: 0,
      data: {
        id: pid,
        sku: pid,
        nome: String(p.nombre || `SKU #${pid}`),
        categoria: String(p.categoria || 'geral'),
        unidadeBase: isDoseVial ? 'mg' : 'un',
        fatorEmbalagem: isDoseVial ? 120 : 1,
        custoUsdCent: reaisParaCentavos(p.precio || 0),
        precoManualCent: p.preco_pix_fixo ? reaisParaCentavos(p.preco_pix_fixo) : null
      }
    });
  }

  // 2. Clientes
  for (const c of st.clientes || []) {
    if (!c || !c.nome) continue;
    const cid = String(c.id || c.telefone || c.nome).trim();
    eventos.push({
      id: `mig_cli_${cid}`,
      ts: nextTs(),
      device: 'mig',
      type: 'CLIENTE_SALVO',
      v: 1,
      synced: 0,
      data: {
        id: cid,
        nome: String(c.nome),
        fone: String(c.telefone || ''),
        cidade: String(c.cidade || ''),
        origem: String(c.origem || 'whatsapp'),
        ultimaCompra: c.ultimaCompra || null
      }
    });
  }

  // 3. Estoque físico atual -> ESTOQUE_INICIAL com lote e custo total fechado em centavos
  const estoqueItens = [];
  for (const [pidStr, qtyRaw] of Object.entries(st.meuEstoque || {})) {
    const pid = Number(pidStr);
    const qty = Math.round(Number(qtyRaw) || 0);
    if (!pid || qty <= 0) continue;

    const rawProd = catalog.find(x => Number(x.id) === pid) || { id: pid };
    const unitBrl = typeof getCustoUnitBrlFn === 'function' ? Number(getCustoUnitBrlFn(rawProd, st)) || 0 : 0;
    const unitCent = reaisParaCentavos(unitBrl);
    const custoTotalCent = unitCent * qty;

    estoqueItens.push({
      produtoId: String(pid),
      qtdBase: qty,
      loteId: `lote_mig_${pid}`,
      custoInicialCent: custoTotalCent,
      entradaEm: st.estoqueAtualizadoEm || new Date().toISOString()
    });
  }

  // Frascos abertos em doses (9005 / 9006) -> unidade-base em mg se houver saldo
  for (const [pidStr, fr] of Object.entries(st.frascosDoses || {})) {
    const pid = Number(pidStr);
    const mg = Math.round(Number(fr && fr.mgRestante) || 0);
    if (!pid || mg <= 0) continue;
    // Se já não foi incluído como unidade ou para registrar o frasco aberto em mg:
    // Mantemos como lote dedicado de dose se não colidir com meuEstoque inteiro;
    // para reconciliação 1:1 com meuEstoque[pid], o saldo por SKU usa meuEstoque[pid] como un.
    if (!Object.prototype.hasOwnProperty.call(st.meuEstoque || {}, pidStr)) {
      const rawProd = catalog.find(x => Number(x.id) === pid) || { id: pid };
      const unitBrl = typeof getCustoUnitBrlFn === 'function' ? Number(getCustoUnitBrlFn(rawProd, st)) || 0 : 0;
      const custoFrascoCent = Math.round((reaisParaCentavos(unitBrl) * mg) / 120);
      estoqueItens.push({
        produtoId: String(pid),
        qtdBase: mg,
        loteId: `lote_mig_dose_${pid}`,
        custoInicialCent: custoFrascoCent,
        entradaEm: new Date().toISOString()
      });
    }
  }

  if (estoqueItens.length > 0) {
    eventos.push({
      id: 'mig_estoque_inicial_v2',
      ts: nextTs(),
      device: 'mig',
      type: 'ESTOQUE_INICIAL',
      v: 1,
      synced: 0,
      data: {
        entradaEm: st.estoqueAtualizadoEm || new Date().toISOString(),
        itens: estoqueItens
      }
    });
  }

  // 4. Pedidos em Trânsito
  for (const ped of st.pedidosTransito || []) {
    if (!ped || !ped.id) continue;
    eventos.push({
      id: `mig_ped_${ped.id}`,
      ts: nextTs(),
      device: 'mig',
      type: 'PEDIDO_CRIADO',
      v: 1,
      synced: 0,
      data: {
        id: String(ped.id),
        status: String(ped.status || 'em_transito'),
        custoTotalCent: reaisParaCentavos(ped.custo_total_reais || 0),
        previsao: ped.dataPrevista || null,
        itens: (ped.itens || []).map(it => ({
          produtoId: String(it.id_catalogo),
          qtdBase: Math.round(Number(it.qtd) || 0),
          custoCent: reaisParaCentavos((it.custo_unit_brl || 0) * (Number(it.qtd) || 0))
        }))
      }
    });
  }

  // 5. Encomendas + Reservas ativas
  for (const enc of st.encomendas || []) {
    if (!enc || !enc.id) continue;
    eventos.push({
      id: `mig_enc_${enc.id}`,
      ts: nextTs(),
      device: 'mig',
      type: 'ENCOMENDA_CRIADA',
      v: 1,
      synced: 0,
      data: {
        id: String(enc.id),
        clienteId: String(enc.telefone || enc.cliente || ''),
        etapa: String(enc.etapa || 'negociacao'),
        etapaDesde: enc.etapaDesde || enc.data || '',
        proximaAcao: String(enc.proximaAcao || ''),
        proximaAcaoEm: enc.proximaAcaoEm || null,
        sinalCent: reaisParaCentavos(enc.sinal || 0),
        valorTotalCent: reaisParaCentavos(enc.valorTotal || 0),
        status: String(enc.status || 'pendente'),
        itens: (enc.itens || []).map(it => ({
          produtoId: String(it.produtoId),
          qtd: Math.round(Number(it.qtd) || 1),
          precoCent: reaisParaCentavos(it.precoUnit || 0)
        }))
      }
    });

    if (enc.status === 'pendente' || enc.status === 'pedido_ao_fornecedor') {
      const itensEnc = Array.isArray(enc.itens) && enc.itens.length
        ? enc.itens
        : (enc.produtoId ? [{ produtoId: enc.produtoId, qtd: enc.qtd || 1 }] : []);
      itensEnc.forEach((it, idx) => {
        if (!it.produtoId) return;
        eventos.push({
          id: `mig_res_${enc.id}_${idx}`,
          ts: nextTs(),
          device: 'mig',
          type: 'RESERVA_CRIADA',
          v: 1,
          synced: 0,
          data: {
            id: `res_${enc.id}_${idx}`,
            produtoId: String(it.produtoId),
            encomendaId: String(enc.id),
            qtd: Math.round(Number(it.qtd) || 1),
            alvo: enc.status === 'pedido_ao_fornecedor' ? 'TRANSITO' : 'FISICO',
            status: 'ativa'
          }
        });
      });
    }
  }

  // 6. Vendas históricas (historicoSomente: true para não abater de novo o saldo físico já final de meuEstoque)
  for (const v of st.vendas || []) {
    if (!v || !v.id) continue;
    eventos.push({
      id: `mig_venda_${v.id}`,
      ts: nextTs(),
      device: 'mig',
      type: 'VENDA_CONFIRMADA',
      v: 1,
      synced: 0,
      data: {
        id: String(v.id),
        data: String(v.data || ''),
        clienteId: String(v.telefone || v.cliente || ''),
        receitaCent: reaisParaCentavos(v.valorTotal || 0),
        custoCent: reaisParaCentavos(v.custoTotal || 0),
        lucroCent: reaisParaCentavos(v.lucro || 0),
        status: v.estornada ? 'estornada' : (v.statusPagamento || 'pago'),
        estornada: !!v.estornada,
        historicoSomente: true,
        itens: Array.isArray(v.itens) && v.itens.length
          ? v.itens.map(it => ({
              produtoId: String(it.produtoId),
              qtd: Math.round(Number(it.qtd) || 1),
              precoCent: reaisParaCentavos(it.precoUnit || 0)
            }))
          : [{
              produtoId: String(v.produtoId || 0),
              qtd: Math.round(Number(v.qtd) || 1),
              precoCent: reaisParaCentavos(v.valorUnitario || 0)
            }]
      }
    });
  }

  return eventos;
}

/**
 * Reconciliação obrigatória Antes (localStorage) x Depois (projeções IndexedDB).
 */
export function reconciliarMigracao(rawState, rawCatalog, projecoes, getCustoUnitBrlFn) {
  const st = rawState || {};
  const catalog = Array.isArray(rawCatalog) ? rawCatalog : [];

  const antesProdutos = catalog.filter(p => p && p.id).length;
  const depoisProdutos = projecoes.produto.size;

  const antesClientes = (st.clientes || []).filter(c => c && c.nome).length;
  const depoisClientes = projecoes.cliente.size;

  const antesVendas = (st.vendas || []).filter(v => v && v.id).length;
  const depoisVendas = projecoes.venda.size;

  const divergenciasSku = [];
  let antesCustoTotalCent = 0;
  let depoisCustoTotalCent = 0;

  for (const [pidStr, qtyRaw] of Object.entries(st.meuEstoque || {})) {
    const pid = String(pidStr);
    const qtyAntes = Math.round(Number(qtyRaw) || 0);
    if (qtyAntes <= 0) continue;

    const prodObj = projecoes.produto.get(pid);
    const qtyDepois = prodObj ? Math.round(Number(prodObj.fisico) || 0) : 0;
    if (qtyAntes !== qtyDepois) {
      divergenciasSku.push({ sku: pid, antes: qtyAntes, depois: qtyDepois });
    }

    const rawProd = catalog.find(x => String(x.id) === pid) || { id: Number(pid) };
    const unitBrl = typeof getCustoUnitBrlFn === 'function' ? Number(getCustoUnitBrlFn(rawProd, st)) || 0 : 0;
    antesCustoTotalCent += reaisParaCentavos(unitBrl) * qtyAntes;

    const lote = projecoes.lote.get(`lote_mig_${pid}`);
    depoisCustoTotalCent += lote ? Math.round(Number(lote.custoSaldoCent) || 0) : 0;
  }

  const ok =
    antesProdutos === depoisProdutos &&
    antesClientes === depoisClientes &&
    antesVendas === depoisVendas &&
    divergenciasSku.length === 0 &&
    antesCustoTotalCent === depoisCustoTotalCent;

  return {
    ok,
    produtos: { antes: antesProdutos, depois: depoisProdutos, diff: depoisProdutos - antesProdutos },
    clientes: { antes: antesClientes, depois: depoisClientes, diff: depoisClientes - antesClientes },
    vendas: { antes: antesVendas, depois: depoisVendas, diff: depoisVendas - antesVendas },
    saldoPorSku: { totalSkusComSaldo: Object.keys(st.meuEstoque || {}).length, divergencias: divergenciasSku },
    custoTotalEstoqueCent: {
      antes: antesCustoTotalCent,
      depois: depoisCustoTotalCent,
      diff: depoisCustoTotalCent - antesCustoTotalCent
    }
  };
}

/**
 * Executa a migração completa no IndexedDB com backup prévio, commit atômico e reconciliação.
 */
export async function executarMigracaoLocalStorageParaIdb({
  rawState,
  rawCatalog,
  extraAudit = null,
  getCustoUnitBrlFn,
  idbFactory = globalThis.indexedDB,
  storage = globalThis.localStorage,
  downloader = null
}) {
  const jaMigrado = storage && storage.getItem(MIGRATION_FLAG_KEY);
  const db = await openDatabase(idbFactory);

  // 1. Backup automático antes de migrar (salvo no IndexedDB meta + opcional downloader)
  let backupInfo = null;
  if (!jaMigrado && rawState && Object.keys(rawState).length > 0) {
    backupInfo = exportarBackupLocalStorage(rawState, extraAudit, downloader);
    await setMeta(db, 'backup_pre_migracao', {
      filename: backupInfo.filename,
      geradoEm: new Date().toISOString(),
      bytes: backupInfo.bytes,
      jsonStr: backupInfo.jsonStr
    });
  }

  // 2. Gera eventos determinísticos e grava atomicamente (idempotente por event.id)
  const eventos = gerarEventosMigracao(rawState, rawCatalog, getCustoUnitBrlFn);
  const commitRes = await commitEventsAtomic(db, eventos, STORES);

  // 3. Lê projeções do IndexedDB e também reconstrói a partir do log para conferência dupla
  const [prodArr, cliArr, vendArr, loteArr, eventsSaved] = await Promise.all([
    getAllFromStore(db, 'produto'),
    getAllFromStore(db, 'cliente'),
    getAllFromStore(db, 'venda'),
    getAllFromStore(db, 'lote'),
    getAllFromStore(db, 'events')
  ]);

  const projecaoIdb = {
    produto: new Map(prodArr.map(p => [String(p.id), p])),
    cliente: new Map(cliArr.map(c => [String(c.id), c])),
    venda: new Map(vendArr.map(v => [String(v.id), v])),
    lote: new Map(loteArr.map(l => [String(l.id), l]))
  };

  const relatorio = reconciliarMigracao(rawState, rawCatalog, projecaoIdb, getCustoUnitBrlFn);

  // Confere se reconstrução do log bate com a projeção do IndexedDB
  const projReconstruida = reconstruirProjecoesDeEventos(eventsSaved);
  const logBateProjecao =
    projReconstruida.produto.size === projecaoIdb.produto.size &&
    projReconstruida.cliente.size === projecaoIdb.cliente.size &&
    projReconstruida.venda.size === projecaoIdb.venda.size &&
    projReconstruida.lote.size === projecaoIdb.lote.size;

  if (!relatorio.ok || !logBateProjecao) {
    return {
      sucesso: false,
      abortado: true,
      motivo: !relatorio.ok ? 'DIVERGENCIA_RECONCILIACAO' : 'DIVERGENCIA_LOG_PROJECAO',
      relatorio,
      logBateProjecao,
      commitRes,
      backupInfo
    };
  }

  // 4. Marca migrado mantendo o localStorage por 30 dias (sem apagar)
  const agora = new Date();
  const reterAte = new Date(agora.getTime() + 30 * 86400000).toISOString();
  const flagObj = {
    versao: 2,
    migradoEm: agora.toISOString(),
    reterLocalStorageAte: reterAte,
    eventosGravados: commitRes.gravados,
    eventosIgnorados: commitRes.ignorados
  };
  await setMeta(db, 'migracao_v2', flagObj);
  if (storage && !jaMigrado) {
    storage.setItem(MIGRATION_FLAG_KEY, JSON.stringify(flagObj));
  }

  return {
    sucesso: true,
    abortado: false,
    relatorio,
    logBateProjecao,
    commitRes,
    backupInfo,
    flagObj,
    db
  };
}
