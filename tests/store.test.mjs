import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  executarMigracaoLocalStorageParaIdb,
  gerarEventosMigracao,
  reconstruirProjecoesDeEventos,
  reconciliarMigracao,
  MIGRATION_FLAG_KEY
} from '../store/index.js';

/**
 * Simulador fiel de IndexedDB em memória para testes em Node.
 */
function createFakeIndexedDB() {
  const databases = new Map();

  function makeReq() {
    return { result: null, error: null, onsuccess: null, onerror: null, onupgradeneeded: null };
  }

  return {
    open(name) {
      const req = makeReq();
      queueMicrotask(() => {
        let isNew = false;
        if (!databases.has(name)) {
          isNew = true;
          const stores = new Map();
          databases.set(name, {
            name,
            stores,
            objectStoreNames: { contains: s => stores.has(s) },
            createObjectStore(sName, opts) {
              const rows = new Map();
              const obj = {
                keyPath: opts?.keyPath || 'id',
                rows,
                createIndex() {}
              };
              stores.set(sName, obj);
              return obj;
            },
            transaction(storeNames) {
              const tx = { oncomplete: null, onerror: null, onabort: null, error: null };
              let pending = 0;
              let completed = false;

              function scheduleFinish() {
                queueMicrotask(() => {
                  if (pending === 0 && !completed) {
                    completed = true;
                    if (tx.oncomplete) tx.oncomplete();
                  }
                });
              }

              tx.objectStore = sName => {
                const storeMeta = stores.get(sName);
                if (!storeMeta) throw new Error(`Store missing: ${sName}`);
                return {
                  get(key) {
                    const r = makeReq();
                    pending++;
                    queueMicrotask(() => {
                      r.result = storeMeta.rows.has(String(key))
                        ? structuredClone(storeMeta.rows.get(String(key)))
                        : undefined;
                      pending--;
                      if (r.onsuccess) r.onsuccess({ target: r });
                      if (pending === 0) scheduleFinish();
                    });
                    return r;
                  },
                  put(val) {
                    const r = makeReq();
                    const k = String(val[storeMeta.keyPath]);
                    storeMeta.rows.set(k, structuredClone(val));
                    pending++;
                    queueMicrotask(() => {
                      r.result = k;
                      pending--;
                      if (r.onsuccess) r.onsuccess({ target: r });
                      if (pending === 0) scheduleFinish();
                    });
                    return r;
                  },
                  getAll() {
                    const r = makeReq();
                    pending++;
                    queueMicrotask(() => {
                      r.result = Array.from(storeMeta.rows.values()).map(v => structuredClone(v));
                      pending--;
                      if (r.onsuccess) r.onsuccess({ target: r });
                      if (pending === 0) scheduleFinish();
                    });
                    return r;
                  }
                };
              };
              scheduleFinish();
              return tx;
            }
          });
        }
        const db = databases.get(name);
        req.result = db;
        if (isNew && req.onupgradeneeded) req.onupgradeneeded({ target: req });
        if (req.onsuccess) req.onsuccess({ target: req });
      });
      return req;
    }
  };
}

function createFakeStorage(initial = {}) {
  const m = new Map(Object.entries(initial));
  return {
    getItem: k => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: k => m.delete(k)
  };
}

const catalogoRaw = JSON.parse(fs.readFileSync(new URL('../catalogo_dados.json', import.meta.url), 'utf8'));
const catalog = catalogoRaw.productos || [];

function getCustoUnitBrl(prod, st) {
  const pid = Number(prod.id);
  if (st.custosReais && Number(st.custosReais[pid]) > 0) return Number(st.custosReais[pid]);
  const cot = Number(st.cotacao) || 5.6;
  const frete = Number(st.fretePct ?? 30);
  return Math.round(Number(prod.precio || 0) * cot * (1 + frete / 100) * 100) / 100;
}

const sampleState = {
  cotacao: 5.6,
  fretePct: 30,
  meuEstoque: catalogoRaw.meu_estoque_qtds || { 2848: 4, 2889: 4, 3207: 1, 2830: 3 },
  custosReais: { 2830: 550 },
  clientes: [
    { id: 'cli_1', nome: 'Diogenes', telefone: '31972191092', cidade: 'Ribeirão das Neves' },
    { id: 'cli_2', nome: 'Eliz', telefone: '31988887777', cidade: 'BH' }
  ],
  vendas: [
    { id: 'v_1', data: '2026-11-12T15:00:00Z', produtoId: 2830, qtd: 1, valorUnitario: 1000, valorTotal: 1000, custoTotal: 550, lucro: 450, cliente: 'Diogenes', telefone: '31972191092', statusPagamento: 'pago', estornada: false },
    { id: 'v_2', data: '2026-11-12T16:00:00Z', produtoId: 2848, qtd: 1, valorUnitario: 1800, valorTotal: 1800, custoTotal: 728, lucro: 1072, cliente: 'Eliz', telefone: '31988887777', statusPagamento: 'pago', estornada: false }
  ],
  encomendas: [
    { id: 'ENC-1', data: '2026-11-12T12:00:00Z', cliente: 'Diogenes', telefone: '31972191092', status: 'pendente', etapa: 'negociacao', valorTotal: 1030, sinal: 1030, itens: [{ produtoId: 3207, qtd: 1, precoUnit: 1000 }] }
  ],
  pedidosTransito: [
    { id: 'TR-1', status: 'em_transito', custo_total_reais: 2000, itens: [{ id_catalogo: 2848, qtd: 2, custo_unit_brl: 700 }] }
  ],
  frascosDoses: { 9006: { mgRestante: 117.5, totalAplicadasMg: 2.5 } }
};

test('migracao completa: backup, eventos atomicos, idempotencia e reconciliacao zero diferenca', async () => {
  const idb = createFakeIndexedDB();
  const storage = createFakeStorage({
    SHAPETOTAL_CRM_STATE_V1: JSON.stringify(sampleState)
  });

  const downloads = [];
  const res1 = await executarMigracaoLocalStorageParaIdb({
    rawState: sampleState,
    rawCatalog: catalog,
    getCustoUnitBrlFn: getCustoUnitBrl,
    idbFactory: idb,
    storage,
    downloader: (filename, content) => downloads.push({ filename, bytes: content.length })
  });

  console.log('\n=== RELATORIO DE RECONCILIACAO (ANTES x DEPOIS) ===');
  console.log(JSON.stringify(res1.relatorio, null, 2));
  console.log('BACKUP GERADO:', res1.backupInfo?.filename, '| BYTES:', res1.backupInfo?.bytes);
  console.log('FLAG MIGRADO (RETENCAO 30 DIAS):', res1.flagObj);

  assert.equal(res1.sucesso, true);
  assert.equal(res1.abortado, false);
  assert.equal(res1.relatorio.ok, true);
  assert.equal(res1.logBateProjecao, true);
  assert.equal(res1.relatorio.produtos.diff, 0);
  assert.equal(res1.relatorio.clientes.diff, 0);
  assert.equal(res1.relatorio.vendas.diff, 0);
  assert.equal(res1.relatorio.saldoPorSku.divergencias.length, 0);
  assert.equal(res1.relatorio.custoTotalEstoqueCent.diff, 0);

  // Backup gerado com data no nome e localStorage preservado
  assert.equal(downloads.length, 1);
  assert.match(downloads[0].filename, /^backup-pre-migracao-\d{4}-\d{2}-\d{2}\.json$/);
  assert.ok(storage.getItem('SHAPETOTAL_CRM_STATE_V1'));
  assert.ok(storage.getItem(MIGRATION_FLAG_KEY));

  // Idempotência: rodar 2x não duplica eventos nem altera o resultado
  const res2 = await executarMigracaoLocalStorageParaIdb({
    rawState: sampleState,
    rawCatalog: catalog,
    getCustoUnitBrlFn: getCustoUnitBrl,
    idbFactory: idb,
    storage,
    downloader: (filename, content) => downloads.push({ filename, bytes: content.length })
  });
  assert.equal(res2.sucesso, true);
  assert.equal(res2.commitRes.gravados, 0);
  assert.equal(res2.commitRes.ignorados, res1.commitRes.gravados);
  assert.deepEqual(res2.relatorio, res1.relatorio);
});

test('propriedade: eventos de migracao em ordem embaralhada geram estado identico e batem com projecao', () => {
  const eventos = gerarEventosMigracao(sampleState, catalog, getCustoUnitBrl);
  const baseProj = reconstruirProjecoesDeEventos(eventos);

  const recBase = reconciliarMigracao(sampleState, catalog, baseProj, getCustoUnitBrl);
  assert.equal(recBase.ok, true);

  // Embaralha determinístico e duplica eventos
  const embaralhado = [...eventos].reverse().concat(eventos.slice(0, 10));
  const embProj = reconstruirProjecoesDeEventos(embaralhado);

  assert.equal(embProj.produto.size, baseProj.produto.size);
  assert.equal(embProj.cliente.size, baseProj.cliente.size);
  assert.equal(embProj.venda.size, baseProj.venda.size);
  assert.equal(embProj.lote.size, baseProj.lote.size);

  for (const [k, pBase] of baseProj.produto.entries()) {
    assert.deepEqual(embProj.produto.get(k), pBase);
  }
});

test('seguranca: divergencia na reconciliacao aborta migracao e preserva localStorage sem marcar migrado', () => {
  const projCorrompida = reconstruirProjecoesDeEventos([]);
  const rec = reconciliarMigracao(sampleState, catalog, projCorrompida, getCustoUnitBrl);
  assert.equal(rec.ok, false);
  assert.ok(rec.produtos.diff !== 0);
  assert.ok(rec.custoTotalEstoqueCent.diff !== 0);
});
