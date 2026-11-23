// Motor de Business Intelligence & Análise Financeira (FP&A) — ShapeTotal CRM
// 100% puro, determinístico, sem dependências externas (funciona no browser PWA e em testes Node).
(function (root) {
  'use strict';

  const MESES_PT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const CANAL_LABELS = {
    pronta_entrega: '📍 Pronta Entrega BH',
    encomenda: '📦 Encomenda',
    doses: '💉 Doses Avulsas (120 mg)'
  };

  const CATEGORIA_LABELS = {
    emagrecedores: '🔥 GLP-1 & Emagrecedores',
    anabolizante: '💪 Anabolizantes',
    hgh: '🧬 HGH Somatropina',
    peptideo: '⚗️ Peptídeos Bio-Regenerativos',
    sarms_post: '🧪 SARMs, Pós-Ciclo & HCG',
    estetico: '✨ Estético, Botox & Pele',
    saude_mental: '🧠 Saúde Mental & Nootrópicos',
    potencia_suporte: '⚡ Potência, Diluentes & Suporte'
  };

  const PAGAMENTO_LABELS = {
    pix: '💠 PIX',
    cartao_parcelado: '💳 Cartão Parcelado',
    cartao_debito: '💳 Cartão Débito / 1x',
    dinheiro: '💵 Dinheiro',
    outros: '🧾 Outros'
  };

  const DESPESA_CATEGORIAS = [
    { key: 'frete_motoboy', label: '🏍️ Frete / Motoboy BH' },
    { key: 'embalagem_frio', label: '🧊 Embalagem / Gelox / Isopor' },
    { key: 'frete_nacional', label: '🚚 Frete SP/CWB → BH' },
    { key: 'taxa_financeira', label: '💳 Taxa Extra / Banco' },
    { key: 'marketing', label: '📣 Marketing / Tráfego' },
    { key: 'perda_avaria', label: '⚠️ Perda / Avaria / Validade' },
    { key: 'outros', label: '🧾 Outras Despesas' }
  ];

  function round2(n) {
    return Math.round((Number(n) || 0) * 100) / 100;
  }

  function safeNum(v, fallback) {
    const n = Number(v);
    return Number.isFinite(n) ? n : (fallback || 0);
  }

  function parseSafeDate(raw) {
    if (raw === null || raw === undefined || raw === '') {
      return { valid: false, ts: 0, date: null, year: null, monthKey: null };
    }
    if (typeof raw === 'number' && Number.isFinite(raw)) {
      const d = new Date(raw);
      if (!Number.isNaN(d.getTime())) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        return { valid: true, ts: d.getTime(), date: d, year: y, monthKey: `${y}-${m}` };
      }
    }
    const str = String(raw).trim();
    // Formato brasileiro dd/MM/yyyy (com ou sem hora)
    const br = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:[^\d]*(\d{1,2}):(\d{2}))?/);
    if (br) {
      const dd = Number(br[1]);
      const mm = Number(br[2]);
      const yyyy = Number(br[3]);
      const hh = br[4] ? Number(br[4]) : 12;
      const mi = br[5] ? Number(br[5]) : 0;
      const d = new Date(yyyy, mm - 1, dd, hh, mi, 0, 0);
      if (!Number.isNaN(d.getTime()) && d.getFullYear() === yyyy && d.getMonth() === mm - 1) {
        return {
          valid: true,
          ts: d.getTime(),
          date: d,
          year: yyyy,
          monthKey: `${yyyy}-${String(mm).padStart(2, '0')}`
        };
      }
    }
    // ISO YYYY-MM-DD (evita deslocamento de fuso em data pura)
    const isoDateOnly = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoDateOnly) {
      const yyyy = Number(isoDateOnly[1]);
      const mm = Number(isoDateOnly[2]);
      const dd = Number(isoDateOnly[3]);
      const d = new Date(yyyy, mm - 1, dd, 12, 0, 0, 0);
      if (!Number.isNaN(d.getTime())) {
        return {
          valid: true,
          ts: d.getTime(),
          date: d,
          year: yyyy,
          monthKey: `${yyyy}-${String(mm).padStart(2, '0')}`
        };
      }
    }
    const d = new Date(str);
    if (!Number.isNaN(d.getTime())) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      return { valid: true, ts: d.getTime(), date: d, year: y, monthKey: `${y}-${m}` };
    }
    return { valid: false, ts: 0, date: null, year: null, monthKey: null };
  }

  function formatMonthLabel(ym) {
    if (!ym || !/^\d{4}-\d{2}$/.test(ym)) return String(ym || '—');
    const [y, m] = ym.split('-');
    const idx = Math.max(0, Math.min(11, Number(m) - 1));
    return `${MESES_PT[idx]}/${y.slice(2)}`;
  }

  function normalizePaymentBucket(raw) {
    const s = String(raw || '').toLowerCase();
    if (!s || s.includes('pix')) return 'pix';
    if (s.includes('parcel') || s.includes('crédito') || s.includes('credito') || s.includes('12x') || s.includes('cartão') || s.includes('cartao')) {
      if (s.includes('débito') || s.includes('debito')) return 'cartao_debito';
      if (s.includes('1x') || s.includes('à vista') || s.includes('a vista')) return 'cartao_debito';
      return 'cartao_parcelado';
    }
    if (s.includes('débito') || s.includes('debito')) return 'cartao_debito';
    if (s.includes('dinheiro') || s.includes('espécie') || s.includes('especie') || s.includes('usdt')) return 'dinheiro';
    return 'outros';
  }

  function inferCanalVenda(venda, encomendaByVendaId) {
    if (!venda) return 'pronta_entrega';
    if (venda.isDose) return 'doses';
    if (venda.origem === 'encomenda') return 'encomenda';
    const enc = encomendaByVendaId && encomendaByVendaId.get(String(venda.id));
    if (enc && enc.tipoOperacao === 'encomenda') return 'encomenda';
    const obs = String(venda.obs || '').toLowerCase();
    if (obs.includes('encomenda') && !obs.includes('pronta')) return 'encomenda';
    return 'pronta_entrega';
  }

  function estimateCardFee(venda, pricingConfig) {
    if (!venda) return 0;
    if (venda.taxaCartao !== undefined && venda.taxaCartao !== null && Number.isFinite(Number(venda.taxaCartao))) {
      return round2(Math.max(0, Number(venda.taxaCartao)));
    }
    const bucket = normalizePaymentBucket(venda.formaPagamento);
    const total = safeNum(venda.valorTotal, 0);
    if (total <= 0) return 0;
    const installments = (pricingConfig && pricingConfig.cardInstallments) || {};
    if (bucket === 'cartao_parcelado') {
      const mdr12 = safeNum(installments['12'] && installments['12'].mdrPct, 10.7239);
      return round2(total * (mdr12 / 100));
    }
    if (bucket === 'cartao_debito') {
      const s = String(venda.formaPagamento || '').toLowerCase();
      if (s.includes('débito') || s.includes('debito')) {
        return round2(total * 0.015);
      }
      const mdr1 = safeNum(installments['1'] && installments['1'].mdrPct, 2.9503);
      return round2(total * (mdr1 / 100));
    }
    return 0;
  }

  function getRangeForPeriodo(periodo, anoFilter, mesFilter, nowTs) {
    const now = new Date(nowTs);
    const curY = now.getFullYear();
    const curM = now.getMonth(); // 0..11
    const startOfCurMonth = new Date(curY, curM, 1, 0, 0, 0, 0).getTime();
    const endOfCurMonth = new Date(curY, curM + 1, 0, 23, 59, 59, 999).getTime();
    const prevDate = new Date(curY, curM - 1, 1);
    const prevY = prevDate.getFullYear();
    const prevM = prevDate.getMonth();
    const startOfPrevMonth = new Date(prevY, prevM, 1, 0, 0, 0, 0).getTime();
    const endOfPrevMonth = new Date(prevY, prevM + 1, 0, 23, 59, 59, 999).getTime();
    const prev2Date = new Date(curY, curM - 2, 1);
    const startOfPrev2Month = new Date(prev2Date.getFullYear(), prev2Date.getMonth(), 1, 0, 0, 0, 0).getTime();
    const endOfPrev2Month = new Date(prev2Date.getFullYear(), prev2Date.getMonth() + 1, 0, 23, 59, 59, 999).getTime();

    const curYm = `${curY}-${String(curM + 1).padStart(2, '0')}`;
    const prevYm = `${prevY}-${String(prevM + 1).padStart(2, '0')}`;
    const prev2Ym = `${prev2Date.getFullYear()}-${String(prev2Date.getMonth() + 1).padStart(2, '0')}`;

    if (mesFilter && mesFilter !== 'todos' && /^\d{4}-\d{2}$/.test(mesFilter)) {
      const [yStr, mStr] = mesFilter.split('-');
      const y = Number(yStr);
      const m = Number(mStr) - 1;
      const start = new Date(y, m, 1, 0, 0, 0, 0).getTime();
      const end = new Date(y, m + 1, 0, 23, 59, 59, 999).getTime();
      const pd = new Date(y, m - 1, 1);
      const pStart = new Date(pd.getFullYear(), pd.getMonth(), 1, 0, 0, 0, 0).getTime();
      const pEnd = new Date(pd.getFullYear(), pd.getMonth() + 1, 0, 23, 59, 59, 999).getTime();
      const pYm = `${pd.getFullYear()}-${String(pd.getMonth() + 1).padStart(2, '0')}`;
      return {
        start, end, label: formatMonthLabel(mesFilter),
        prevStart: pStart, prevEnd: pEnd, prevLabel: formatMonthLabel(pYm)
      };
    }

    if (periodo === 'mes_atual') {
      return {
        start: startOfCurMonth, end: endOfCurMonth, label: formatMonthLabel(curYm),
        prevStart: startOfPrevMonth, prevEnd: endOfPrevMonth, prevLabel: formatMonthLabel(prevYm)
      };
    }
    if (periodo === 'mes_anterior') {
      return {
        start: startOfPrevMonth, end: endOfPrevMonth, label: formatMonthLabel(prevYm),
        prevStart: startOfPrev2Month, prevEnd: endOfPrev2Month, prevLabel: formatMonthLabel(prev2Ym)
      };
    }
    if (periodo === '7d' || periodo === '30d' || periodo === '90d') {
      const days = periodo === '7d' ? 7 : periodo === '30d' ? 30 : 90;
      const ms = days * 86400000;
      return {
        start: nowTs - ms, end: nowTs + 86400000, label: `Últimos ${days} dias`,
        prevStart: nowTs - 2 * ms, prevEnd: nowTs - ms - 1, prevLabel: `${days}d anteriores`
      };
    }
    if (anoFilter && anoFilter !== 'todos' && /^\d{4}$/.test(String(anoFilter))) {
      const y = Number(anoFilter);
      return {
        start: new Date(y, 0, 1, 0, 0, 0, 0).getTime(),
        end: new Date(y, 11, 31, 23, 59, 59, 999).getTime(),
        label: `Ano ${y}`,
        prevStart: new Date(y - 1, 0, 1, 0, 0, 0, 0).getTime(),
        prevEnd: new Date(y - 1, 11, 31, 23, 59, 59, 999).getTime(),
        prevLabel: `Ano ${y - 1}`
      };
    }
    return {
      start: null, end: null, label: 'Todo o histórico',
      prevStart: null, prevEnd: null, prevLabel: null
    };
  }

  function resolveProductGroupKey(pid, fallbackNome, catalogById) {
    const prod = catalogById && catalogById.get(Number(pid));
    if (prod && prod.groupKey) return prod.groupKey;
    const txt = String((prod && prod.nombre) || fallbackNome || '').toLowerCase();
    if (['tirzepatid', 'tirzep', 'tirzec', 'lipoland', 'lipoless', 'tirzedral', 'retatrutid', 'retratutid', 'mounjaro', 'semaglutid', 'ozempic', 't.g.', 'tg '].some(k => txt.includes(k))) {
      return 'emagrecedores';
    }
    if (['somatropin', 'hgh', 'landertropin', 'genotropin', 'omnitrope'].some(k => txt.includes(k))) return 'hgh';
    if (['bpc-157', 'tb-500', 'cjc', 'ipamorelin', 'glow', 'klow', 'epithalon', 'mots-c', 'pt-141'].some(k => txt.includes(k))) return 'peptideo';
    if (['semax', 'selank', 'modafinil', 'cbd', 'dsip'].some(k => txt.includes(k))) return 'saude_mental';
    if (['botox', 'toxina', 'ácido hialur', 'acido hialur'].some(k => txt.includes(k))) return 'estetico';
    return 'anabolizante';
  }

  function makeSemaforo(status, texto, detalhe) {
    const map = {
      verde: { cor: '#10b981', bg: 'rgba(16,185,129,0.14)', border: 'rgba(16,185,129,0.45)', icone: '🟢', label: 'Positivo' },
      amarelo: { cor: '#f59e0b', bg: 'rgba(245,158,11,0.14)', border: 'rgba(245,158,11,0.45)', icone: '🟡', label: 'Atenção' },
      vermelho: { cor: '#ef4444', bg: 'rgba(239,68,68,0.14)', border: 'rgba(239,68,68,0.45)', icone: '🔴', label: 'Abaixo do esperado' },
      neutro: { cor: '#94a3b8', bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.35)', icone: '⚪', label: 'Sem dados' }
    };
    const meta = map[status] || map.neutro;
    return {
      status: status || 'neutro',
      icone: meta.icone,
      label: meta.label,
      cor: meta.cor,
      bg: meta.bg,
      border: meta.border,
      texto: texto || meta.label,
      detalhe: detalhe || ''
    };
  }

  function calcDeltaPct(atual, anterior) {
    const a = safeNum(atual, 0);
    const b = safeNum(anterior, 0);
    if (b === 0) return a > 0 ? 100 : (a < 0 ? -100 : null);
    return round2(((a - b) / Math.abs(b)) * 100);
  }

  function computeBiReport(input) {
    const opts = input || {};
    const nowTs = opts.nowTs !== undefined && opts.nowTs !== null ? Number(opts.nowTs) : Date.now();
    const pricingConfig = opts.pricingConfig || {};
    const rawVendas = Array.isArray(opts.vendas) ? opts.vendas : [];
    const rawEncomendas = Array.isArray(opts.encomendas) ? opts.encomendas : [];
    const rawPedidosTransito = Array.isArray(opts.pedidosTransito) ? opts.pedidosTransito : [];
    const rawDespesas = Array.isArray(opts.despesas) ? opts.despesas : [];
    const meuEstoque = (opts.meuEstoque && typeof opts.meuEstoque === 'object') ? opts.meuEstoque : {};
    const custosReais = (opts.custosReais && typeof opts.custosReais === 'object') ? opts.custosReais : {};
    const frascosDoses = (opts.frascosDoses && typeof opts.frascosDoses === 'object') ? opts.frascosDoses : {};
    const divergenciasEstoque = Array.isArray(opts.divergenciasEstoque) ? opts.divergenciasEstoque : [];

    // Normaliza catalogById (Map ou objeto/array)
    const catalogById = new Map();
    if (opts.catalogById instanceof Map) {
      opts.catalogById.forEach((v, k) => catalogById.set(Number(k), v));
    } else if (Array.isArray(opts.catalog)) {
      opts.catalog.forEach(p => { if (p && p.id !== undefined) catalogById.set(Number(p.id), p); });
    }

    const encomendaByVendaId = new Map();
    rawEncomendas.forEach(e => {
      if (e && e.vendaId) encomendaByVendaId.set(String(e.vendaId), e);
    });

    const filters = Object.assign({
      periodo: 'todos',
      ano: 'todos',
      mes: 'todos',
      canal: 'todos',
      categoria: 'todos',
      produtoId: 'todos',
      cliente: 'todos',
      pagamento: 'todos'
    }, opts.filters || {});

    // 1. Pré-enriquece todas as vendas ativas (exclui estornadas)
    const vendasAtivasAll = [];
    const qualidadeIssues = [];
    let vendasSemCustoCount = 0;
    let vendasDataInvalidaCount = 0;
    let vendasSemTelefoneCount = 0;
    let vendasMargemAtipicaBaixa = 0;
    let vendasMargemAtipicaAlta = 0;

    rawVendas.forEach(v => {
      if (!v || v.estornada) return;
      const dtInfo = parseSafeDate(v.data);
      if (!dtInfo.valid) vendasDataInvalidaCount++;

      const clienteNome = String(v.cliente || 'Cliente sem nome').trim() || 'Cliente sem nome';
      if (!String(v.telefone || '').replace(/\D/g, '')) vendasSemTelefoneCount++;

      const canal = inferCanalVenda(v, encomendaByVendaId);
      const pagamentoBucket = normalizePaymentBucket(v.formaPagamento);
      const valorTotal = round2(safeNum(v.valorTotal, 0));
      const valorFrete = round2(Math.max(0, safeNum(v.valorFrete, 0)));
      const valorProdutos = round2(v.valorProdutos !== undefined ? safeNum(v.valorProdutos, valorTotal - valorFrete) : Math.max(0, valorTotal - valorFrete));
      const taxaCartao = estimateCardFee(v, pricingConfig);
      const receitaLiquida = round2(valorTotal - taxaCartao);

      // Itens normalizados da venda
      const itensNorm = (Array.isArray(v.itens) && v.itens.length > 0)
        ? v.itens.map(it => {
            const pid = Number(it.produtoId || 0);
            const qtd = Math.max(1, safeNum(it.qtd, 1));
            const sub = round2(safeNum(it.subtotal, safeNum(it.precoUnit, 0) * qtd));
            return {
              produtoId: pid,
              nome: String(it.produtoNome || v.produtoNome || `Produto #${pid}`),
              qtd,
              subtotal: sub,
              categoria: resolveProductGroupKey(pid, it.produtoNome, catalogById)
            };
          })
        : [{
            produtoId: Number(v.produtoId || 0),
            nome: String(v.produtoNome || `Produto #${v.produtoId || 0}`),
            qtd: Math.max(1, safeNum(v.qtd, 1)),
            subtotal: valorProdutos || valorTotal,
            categoria: resolveProductGroupKey(v.produtoId, v.produtoNome, catalogById)
          }];

      // Custo real gravado ou fallback estimado
      let custoTotal = safeNum(v.custoTotal, 0);
      let custoEstimado = false;
      if (custoTotal <= 0 && valorTotal > 0) {
        custoEstimado = true;
        vendasSemCustoCount++;
        let fallbackCusto = 0;
        itensNorm.forEach(it => {
          const prod = catalogById.get(it.produtoId);
          const unitCost = safeNum(custosReais[it.produtoId], prod ? safeNum(prod.custo, 0) : 0);
          if (v.isDose && safeNum(v.doseMg, 0) > 0 && unitCost > 0) {
            fallbackCusto += (unitCost / 120) * safeNum(v.doseMg, 0);
          } else {
            fallbackCusto += unitCost * it.qtd;
          }
        });
        custoTotal = round2(fallbackCusto);
      } else {
        custoTotal = round2(custoTotal);
      }

      const lucroBruto = round2(receitaLiquida - custoTotal);
      const margemVendaPct = receitaLiquida > 0 ? round2((lucroBruto / receitaLiquida) * 100) : 0;
      if (receitaLiquida > 0 && custoTotal > 0) {
        if (margemVendaPct < 10) vendasMargemAtipicaBaixa++;
        if (margemVendaPct > 85 && !v.isDose) vendasMargemAtipicaAlta++;
      }

      // Categoria dominante da venda (primeiro item)
      const categoriaPrincipal = itensNorm[0] ? itensNorm[0].categoria : 'emagrecedores';
      const isPendente = v.statusPagamento === 'pendente';

      vendasAtivasAll.push({
        raw: v,
        id: String(v.id || ''),
        dt: dtInfo,
        cliente: clienteNome,
        telefone: String(v.telefone || ''),
        canal,
        pagamentoBucket,
        isPendente,
        isDose: !!v.isDose,
        valorTotal,
        valorProdutos,
        valorFrete,
        taxaCartao,
        receitaLiquida,
        custoTotal,
        custoEstimado,
        lucroBruto,
        margemVendaPct,
        categoriaPrincipal,
        itens: itensNorm,
        qtdTotal: itensNorm.reduce((s, it) => s + it.qtd, 0)
      });
    });

    // Pré-enriquece despesas manuais
    const despesasAll = rawDespesas.filter(Boolean).map(d => {
      const dtInfo = parseSafeDate(d.data);
      return {
        id: String(d.id || ''),
        dt: dtInfo,
        data: String(d.data || ''),
        categoria: String(d.categoria || 'outros'),
        descricao: String(d.descricao || 'Despesa operacional'),
        valor: round2(Math.max(0, safeNum(d.valor, 0))),
        status: d.status === 'pendente' ? 'pendente' : 'pago',
        obs: String(d.obs || '')
      };
    });

    // Pré-enriquece compras de lotes (pedidosTransito)
    let lotesSemValorCount = 0;
    const lotesAll = rawPedidosTransito.filter(Boolean).map(ped => {
      const dtInfo = parseSafeDate(ped.data_compra || ped.data);
      const custo = round2(Math.max(0, safeNum(ped.custo_total_reais, 0)));
      if (custo <= 0) lotesSemValorCount++;
      const extras = round2(Math.max(0, safeNum(ped.despesasExtras, 0)));
      return {
        id: String(ped.id || ''),
        dt: dtInfo,
        status: String(ped.status || 'em_transito'),
        custoTotal: custo,
        despesasExtras: extras,
        fornecedor: String(ped.fornecedor || 'Fornecedor')
      };
    });

    // 2. Opções dinâmicas de filtro (extraídas da base completa)
    const anosSet = new Set();
    const mesesSet = new Set();
    const clientesSet = new Set();
    const produtosMapOpts = new Map();

    vendasAtivasAll.forEach(v => {
      if (v.dt.valid) {
        anosSet.add(String(v.dt.year));
        mesesSet.add(v.dt.monthKey);
      }
      clientesSet.add(v.cliente);
      v.itens.forEach(it => {
        if (it.produtoId) produtosMapOpts.set(it.produtoId, it.nome);
      });
    });
    despesasAll.forEach(d => {
      if (d.dt.valid) {
        anosSet.add(String(d.dt.year));
        mesesSet.add(d.dt.monthKey);
      }
    });
    lotesAll.forEach(l => {
      if (l.dt.valid) {
        anosSet.add(String(l.dt.year));
        mesesSet.add(l.dt.monthKey);
      }
    });

    const filterOptions = {
      anos: Array.from(anosSet).sort().reverse(),
      meses: Array.from(mesesSet).sort().reverse().map(ym => ({ key: ym, label: formatMonthLabel(ym) })),
      canais: Object.entries(CANAL_LABELS).map(([key, label]) => ({ key, label })),
      categorias: Object.entries(CATEGORIA_LABELS).map(([key, label]) => ({ key, label })),
      produtos: Array.from(produtosMapOpts.entries()).map(([id, nome]) => ({ id, nome })).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')),
      clientes: Array.from(clientesSet).sort((a, b) => a.localeCompare(b, 'pt-BR')),
      pagamentos: [
        ...Object.entries(PAGAMENTO_LABELS).map(([key, label]) => ({ key, label })),
        { key: 'pendente', label: '⏳ Apenas Pendentes (A Receber)' }
      ]
    };

    // 3. Aplica filtros dimensionais (sem tempo) + filtro temporal
    const range = getRangeForPeriodo(filters.periodo, filters.ano, filters.mes, nowTs);

    function matchesDimension(v) {
      if (filters.canal !== 'todos' && v.canal !== filters.canal) return false;
      if (filters.categoria !== 'todos' && !v.itens.some(it => it.categoria === filters.categoria)) return false;
      if (filters.produtoId !== 'todos' && !v.itens.some(it => String(it.produtoId) === String(filters.produtoId))) return false;
      if (filters.cliente !== 'todos' && v.cliente !== filters.cliente) return false;
      if (filters.pagamento !== 'todos') {
        if (filters.pagamento === 'pendente') {
          if (!v.isPendente) return false;
        } else if (v.pagamentoBucket !== filters.pagamento) {
          return false;
        }
      }
      return true;
    }

    function matchesRange(dtInfo, start, end) {
      if (start === null && end === null) return true;
      if (!dtInfo || !dtInfo.valid) return false;
      return dtInfo.ts >= start && dtInfo.ts <= end;
    }

    const vendasDim = vendasAtivasAll.filter(matchesDimension);
    const vendasPeriodo = vendasDim.filter(v => matchesRange(v.dt, range.start, range.end));
    const despesasPeriodo = despesasAll.filter(d => matchesRange(d.dt, range.start, range.end));
    const lotesPeriodo = lotesAll.filter(l => matchesRange(l.dt, range.start, range.end));

    // Sinais de encomendas ainda abertas (não convertidas em venda / não canceladas)
    const encomendasAbertas = rawEncomendas.filter(e => e && e.status !== 'entregue' && e.status !== 'cancelado' && !e.vendaId);
    const sinaisRecebidosPeriodo = encomendasAbertas
      .filter(e => matchesRange(parseSafeDate(e.data), range.start, range.end))
      .reduce((s, e) => s + Math.max(0, safeNum(e.sinal, 0)), 0);
    const saldoEncomendasChegadas = rawEncomendas
      .filter(e => e && e.status === 'chegou_bh' && !e.vendaId)
      .reduce((s, e) => s + Math.max(0, safeNum(e.saldoRestante, safeNum(e.valorTotal, 0) - safeNum(e.sinal, 0))), 0);

    // 4. Agrega KPIs do período filtrado (DRE + Caixa)
    function summarizePeriod(vList, dList, lList, sinaisVal) {
      const receitaBruta = round2(vList.reduce((s, v) => s + v.valorTotal, 0));
      const receitaProdutos = round2(vList.reduce((s, v) => s + v.valorProdutos, 0));
      const freteCobrado = round2(vList.reduce((s, v) => s + v.valorFrete, 0));
      const taxasCartao = round2(vList.reduce((s, v) => s + v.taxaCartao, 0));
      const receitaLiquida = round2(receitaBruta - taxasCartao);
      const custosTotais = round2(vList.reduce((s, v) => s + v.custoTotal, 0));
      const lucroBruto = round2(receitaLiquida - custosTotais);
      const despesasOperacionais = round2(dList.reduce((s, d) => s + d.valor, 0));
      const despesasPagas = round2(dList.filter(d => d.status !== 'pendente').reduce((s, d) => s + d.valor, 0));
      const despesasPendentes = round2(dList.filter(d => d.status === 'pendente').reduce((s, d) => s + d.valor, 0));
      const despesasLotesExtras = round2(lList.reduce((s, l) => s + l.despesasExtras, 0));
      const lucroLiquido = round2(lucroBruto - despesasOperacionais);

      const margemBrutaPct = receitaLiquida > 0 ? round2((lucroBruto / receitaLiquida) * 100) : 0;
      const margemLiquidaPct = receitaLiquida > 0 ? round2((lucroLiquido / receitaLiquida) * 100) : 0;
      const roiSobreCmvPct = custosTotais > 0 ? round2((lucroLiquido / custosTotais) * 100) : 0;

      const vendasPagasLiquido = round2(vList.filter(v => !v.isPendente).reduce((s, v) => s + v.receitaLiquida, 0));
      const vendasPendentesValor = round2(vList.filter(v => v.isPendente).reduce((s, v) => s + v.valorTotal, 0));
      const comprasPagas = round2(lList.reduce((s, l) => s + l.custoTotal + l.despesasExtras, 0));

      const entradasCaixa = round2(vendasPagasLiquido + safeNum(sinaisVal, 0));
      const saidasCaixa = round2(comprasPagas + despesasPagas);
      const geracaoCaixa = round2(entradasCaixa - saidasCaixa);

      const qtdVendas = vList.length;
      const qtdUnidades = vList.reduce((s, v) => s + v.qtdTotal, 0);
      const ticketMedio = qtdVendas > 0 ? round2(receitaBruta / qtdVendas) : 0;
      const lucroMedioPorVenda = qtdVendas > 0 ? round2(lucroLiquido / qtdVendas) : 0;

      return {
        receitaBruta,
        receitaProdutos,
        freteCobrado,
        taxasCartao,
        receitaLiquida,
        custosTotais,
        lucroBruto,
        despesasOperacionais,
        despesasPagas,
        despesasPendentes,
        despesasLotesExtras,
        despesasTotaisComTaxas: round2(despesasOperacionais + taxasCartao),
        lucroLiquido,
        margemBrutaPct,
        margemLiquidaPct,
        roiSobreCmvPct,
        vendasPagasLiquido,
        vendasPendentesValor,
        sinaisRecebidos: round2(safeNum(sinaisVal, 0)),
        comprasPagas,
        entradasCaixa,
        saidasCaixa,
        geracaoCaixa,
        qtdVendas,
        qtdUnidades,
        ticketMedio,
        lucroMedioPorVenda
      };
    }

    const kpisBase = summarizePeriod(vendasPeriodo, despesasPeriodo, lotesPeriodo, sinaisRecebidosPeriodo);
    const aReceberTotal = round2(kpisBase.vendasPendentesValor + saldoEncomendasChegadas);

    // 5. Posição de Patrimônio / Capital Alocado (snapshot atual)
    let estoqueCusto = 0;
    let estoquePotencialPix = 0;
    let estoqueUnidades = 0;
    Object.entries(meuEstoque).forEach(([pidStr, qRaw]) => {
      const q = Math.max(0, safeNum(qRaw, 0));
      if (q <= 0) return;
      const pid = Number(pidStr);
      const prod = catalogById.get(pid);
      const unitCusto = safeNum(custosReais[pid], prod ? safeNum(prod.custo, 0) : 0);
      const unitPix = prod ? safeNum(prod.precoFinal, 0) : 0;
      estoqueUnidades += q;
      estoqueCusto += unitCusto * q;
      estoquePotencialPix += unitPix * q;
    });
    estoqueCusto = round2(estoqueCusto);
    estoquePotencialPix = round2(estoquePotencialPix);

    const transitoInvestido = round2(
      lotesAll.filter(l => l.status !== 'entregue').reduce((s, l) => s + l.custoTotal, 0)
    );
    const capitalAlocadoTotal = round2(estoqueCusto + transitoInvestido);

    // 6. Séries mensais (evolução temporal respeitando filtros dimensionais + ano se houver)
    const seriesMap = new Map();
    function ensureMonth(ym) {
      if (!seriesMap.has(ym)) {
        seriesMap.set(ym, {
          mesKey: ym,
          label: formatMonthLabel(ym),
          receitaBruta: 0,
          taxasCartao: 0,
          receitaLiquida: 0,
          custos: 0,
          despesas: 0,
          lucroLiquido: 0,
          margemPct: 0,
          entradasCaixa: 0,
          saidasCaixa: 0,
          fluxoCaixa: 0,
          fluxoAcumulado: 0,
          qtdVendas: 0
        });
      }
      return seriesMap.get(ym);
    }

    const filterYearOnly = (dtInfo) => {
      if (!dtInfo || !dtInfo.valid) return false;
      if (filters.ano !== 'todos' && String(dtInfo.year) !== String(filters.ano)) return false;
      return true;
    };

    vendasDim.forEach(v => {
      if (!filterYearOnly(v.dt)) return;
      const m = ensureMonth(v.dt.monthKey);
      m.receitaBruta = round2(m.receitaBruta + v.valorTotal);
      m.taxasCartao = round2(m.taxasCartao + v.taxaCartao);
      m.receitaLiquida = round2(m.receitaLiquida + v.receitaLiquida);
      m.custos = round2(m.custos + v.custoTotal);
      if (!v.isPendente) m.entradasCaixa = round2(m.entradasCaixa + v.receitaLiquida);
      m.qtdVendas += 1;
    });
    despesasAll.forEach(d => {
      if (!filterYearOnly(d.dt)) return;
      const m = ensureMonth(d.dt.monthKey);
      m.despesas = round2(m.despesas + d.valor);
      if (d.status !== 'pendente') m.saidasCaixa = round2(m.saidasCaixa + d.valor);
    });
    lotesAll.forEach(l => {
      if (!filterYearOnly(l.dt)) return;
      const m = ensureMonth(l.dt.monthKey);
      m.saidasCaixa = round2(m.saidasCaixa + l.custoTotal + l.despesasExtras);
    });

    const seriesMensais = Array.from(seriesMap.values()).sort((a, b) => a.mesKey.localeCompare(b.mesKey));
    let acum = 0;
    seriesMensais.forEach(m => {
      m.lucroLiquido = round2(m.receitaLiquida - m.custos - m.despesas);
      m.margemPct = m.receitaLiquida > 0 ? round2((m.lucroLiquido / m.receitaLiquida) * 100) : 0;
      m.fluxoCaixa = round2(m.entradasCaixa - m.saidasCaixa);
      acum = round2(acum + m.fluxoCaixa);
      m.fluxoAcumulado = acum;
    });

    // 7. Comparativo com período anterior
    let comparativo = null;
    if (range.prevStart !== null && range.prevEnd !== null) {
      const prevV = vendasDim.filter(v => matchesRange(v.dt, range.prevStart, range.prevEnd));
      const prevD = despesasAll.filter(d => matchesRange(d.dt, range.prevStart, range.prevEnd));
      const prevL = lotesAll.filter(l => matchesRange(l.dt, range.prevStart, range.prevEnd));
      const prevSum = summarizePeriod(prevV, prevD, prevL, 0);
      comparativo = {
        labelAtual: range.label,
        labelAnterior: range.prevLabel,
        temBaseAnterior: prevSum.qtdVendas > 0 || prevSum.despesasOperacionais > 0,
        anterior: prevSum,
        deltaReceitaPct: calcDeltaPct(kpisBase.receitaBruta, prevSum.receitaBruta),
        deltaLucroPct: calcDeltaPct(kpisBase.lucroLiquido, prevSum.lucroLiquido),
        deltaMargemPp: round2(kpisBase.margemLiquidaPct - prevSum.margemLiquidaPct),
        deltaVendasPct: calcDeltaPct(kpisBase.qtdVendas, prevSum.qtdVendas)
      };
    } else if (seriesMensais.length >= 2) {
      const ult = seriesMensais[seriesMensais.length - 1];
      const pen = seriesMensais[seriesMensais.length - 2];
      comparativo = {
        labelAtual: ult.label,
        labelAnterior: pen.label,
        temBaseAnterior: pen.qtdVendas > 0 || pen.receitaBruta > 0,
        anterior: {
          receitaBruta: pen.receitaBruta,
          lucroLiquido: pen.lucroLiquido,
          margemLiquidaPct: pen.margemPct,
          qtdVendas: pen.qtdVendas
        },
        deltaReceitaPct: calcDeltaPct(ult.receitaBruta, pen.receitaBruta),
        deltaLucroPct: calcDeltaPct(ult.lucroLiquido, pen.lucroLiquido),
        deltaMargemPp: round2(ult.margemPct - pen.margemPct),
        deltaVendasPct: calcDeltaPct(ult.qtdVendas, pen.qtdVendas)
      };
    }

    // 8. Rankings: Produto, Cliente, Canal, Categoria, Pagamento
    const prodMap = new Map();
    const cliMap = new Map();
    const canalMap = new Map();
    const catMap = new Map();
    const pagMap = new Map();

    const totalReceitaRef = kpisBase.receitaBruta || 0;

    vendasPeriodo.forEach(v => {
      // Canal
      const cCur = canalMap.get(v.canal) || {
        key: v.canal,
        label: CANAL_LABELS[v.canal] || v.canal,
        qtdVendas: 0,
        qtdUnidades: 0,
        receita: 0,
        custos: 0,
        taxas: 0,
        lucro: 0
      };
      cCur.qtdVendas += 1;
      cCur.qtdUnidades += v.qtdTotal;
      cCur.receita = round2(cCur.receita + v.valorTotal);
      cCur.custos = round2(cCur.custos + v.custoTotal);
      cCur.taxas = round2(cCur.taxas + v.taxaCartao);
      cCur.lucro = round2(cCur.lucro + v.lucroBruto);
      canalMap.set(v.canal, cCur);

      // Pagamento
      const pCur = pagMap.get(v.pagamentoBucket) || {
        key: v.pagamentoBucket,
        label: PAGAMENTO_LABELS[v.pagamentoBucket] || v.pagamentoBucket,
        qtdVendas: 0,
        receita: 0,
        taxas: 0
      };
      pCur.qtdVendas += 1;
      pCur.receita = round2(pCur.receita + v.valorTotal);
      pCur.taxas = round2(pCur.taxas + v.taxaCartao);
      pagMap.set(v.pagamentoBucket, pCur);

      // Cliente
      const cliKey = v.cliente.toLowerCase();
      const clCur = cliMap.get(cliKey) || {
        cliente: v.cliente,
        telefone: v.telefone,
        qtdVendas: 0,
        qtdUnidades: 0,
        receita: 0,
        custos: 0,
        lucro: 0,
        pendente: 0,
        ultimaTs: 0,
        ultimaData: ''
      };
      clCur.qtdVendas += 1;
      clCur.qtdUnidades += v.qtdTotal;
      clCur.receita = round2(clCur.receita + v.valorTotal);
      clCur.custos = round2(clCur.custos + v.custoTotal);
      clCur.lucro = round2(clCur.lucro + v.lucroBruto);
      if (v.isPendente) clCur.pendente = round2(clCur.pendente + v.valorTotal);
      if (!clCur.telefone && v.telefone) clCur.telefone = v.telefone;
      if (v.dt.valid && v.dt.ts > clCur.ultimaTs) {
        clCur.ultimaTs = v.dt.ts;
        clCur.ultimaData = v.raw.data;
      }
      cliMap.set(cliKey, clCur);

      // Rateio proporcional por item (para Produto e Categoria)
      const sumSub = v.itens.reduce((s, it) => s + it.subtotal, 0);
      v.itens.forEach(it => {
        const peso = sumSub > 0 ? (it.subtotal / sumSub) : (1 / v.itens.length);
        const recIt = round2(v.valorTotal * peso);
        const recLiqIt = round2(v.receitaLiquida * peso);
        const custoIt = round2(v.custoTotal * peso);
        const lucroIt = round2(recLiqIt - custoIt);

        // Produto
        const prKey = it.produtoId || it.nome;
        const prCur = prodMap.get(prKey) || {
          produtoId: it.produtoId,
          nome: it.nome,
          categoria: it.categoria,
          categoriaLabel: CATEGORIA_LABELS[it.categoria] || it.categoria,
          qtd: 0,
          qtdVendas: 0,
          receita: 0,
          custos: 0,
          lucro: 0,
          estoqueAtual: safeNum(meuEstoque[it.produtoId], 0)
        };
        prCur.qtd += it.qtd;
        prCur.qtdVendas += 1;
        prCur.receita = round2(prCur.receita + recIt);
        prCur.custos = round2(prCur.custos + custoIt);
        prCur.lucro = round2(prCur.lucro + lucroIt);
        prodMap.set(prKey, prCur);

        // Categoria
        const catCur = catMap.get(it.categoria) || {
          key: it.categoria,
          label: CATEGORIA_LABELS[it.categoria] || it.categoria,
          qtdVendas: 0,
          qtdUnidades: 0,
          receita: 0,
          custos: 0,
          lucro: 0
        };
        catCur.qtdVendas += 1;
        catCur.qtdUnidades += it.qtd;
        catCur.receita = round2(catCur.receita + recIt);
        catCur.custos = round2(catCur.custos + custoIt);
        catCur.lucro = round2(catCur.lucro + lucroIt);
        catMap.set(it.categoria, catCur);
      });
    });

    const porProduto = Array.from(prodMap.values()).map(p => ({
      ...p,
      margemPct: p.receita > 0 ? round2((p.lucro / p.receita) * 100) : 0,
      sharePct: totalReceitaRef > 0 ? round2((p.receita / totalReceitaRef) * 100) : 0
    })).sort((a, b) => b.lucro - a.lucro);

    const porCliente = Array.from(cliMap.values()).map(c => ({
      ...c,
      margemPct: c.receita > 0 ? round2((c.lucro / c.receita) * 100) : 0,
      ticketMedio: c.qtdVendas > 0 ? round2(c.receita / c.qtdVendas) : 0,
      sharePct: totalReceitaRef > 0 ? round2((c.receita / totalReceitaRef) * 100) : 0,
      diasSemComprar: c.ultimaTs > 0 ? Math.max(0, Math.floor((nowTs - c.ultimaTs) / 86400000)) : null
    })).sort((a, b) => b.lucro - a.lucro);

    const porCanal = Array.from(canalMap.values()).map(c => ({
      ...c,
      margemPct: c.receita > 0 ? round2((c.lucro / c.receita) * 100) : 0,
      sharePct: totalReceitaRef > 0 ? round2((c.receita / totalReceitaRef) * 100) : 0
    })).sort((a, b) => b.receita - a.receita);

    const porCategoria = Array.from(catMap.values()).map(c => ({
      ...c,
      margemPct: c.receita > 0 ? round2((c.lucro / c.receita) * 100) : 0,
      sharePct: totalReceitaRef > 0 ? round2((c.receita / totalReceitaRef) * 100) : 0
    })).sort((a, b) => b.lucro - a.lucro);

    const porPagamento = Array.from(pagMap.values()).map(p => ({
      ...p,
      sharePct: totalReceitaRef > 0 ? round2((p.receita / totalReceitaRef) * 100) : 0
    })).sort((a, b) => b.receita - a.receita);

    // 9. Produtos parados em estoque BH (>30d sem venda) para oportunidades/riscos
    const lastSaleByPid = new Map();
    vendasAtivasAll.forEach(v => {
      if (!v.dt.valid) return;
      v.itens.forEach(it => {
        if (!it.produtoId) return;
        const prev = lastSaleByPid.get(it.produtoId) || 0;
        if (v.dt.ts > prev) lastSaleByPid.set(it.produtoId, v.dt.ts);
      });
    });
    const estoqueParado = [];
    Object.entries(meuEstoque).forEach(([pidStr, qRaw]) => {
      const q = Math.max(0, safeNum(qRaw, 0));
      if (q <= 0) return;
      const pid = Number(pidStr);
      const lastTs = lastSaleByPid.get(pid) || 0;
      const dias = lastTs > 0 ? Math.floor((nowTs - lastTs) / 86400000) : 999;
      if (dias >= 30) {
        const prod = catalogById.get(pid);
        const unitPix = prod ? safeNum(prod.precoFinal, 0) : 0;
        const unitCusto = safeNum(custosReais[pid], prod ? safeNum(prod.custo, 0) : 0);
        estoqueParado.push({
          produtoId: pid,
          nome: prod ? prod.nombre : `Produto #${pid}`,
          qtd: q,
          dias,
          valorCusto: round2(unitCusto * q),
          valorPotencialPix: round2(unitPix * q)
        });
      }
    });
    estoqueParado.sort((a, b) => b.valorPotencialPix - a.valorPotencialPix);
    const capitalParadoCusto = round2(estoqueParado.reduce((s, x) => s + x.valorCusto, 0));

    // 10. Auditoria de qualidade e inconsistências
    if (vendasSemCustoCount > 0) {
      qualidadeIssues.push({
        severidade: 'critico',
        titulo: `${vendasSemCustoCount} venda(s) sem custo real registrado`,
        detalhe: 'O lucro dessas vendas foi calculado usando fallback de catálogo, podendo distorcer a margem real.',
        comoCorrigir: 'Registre o custo real ao dar entrada de lotes no Trânsito para travar o CMV de cada SKU.'
      });
    }
    if (divergenciasEstoque.length > 0) {
      qualidadeIssues.push({
        severidade: 'critico',
        titulo: `${divergenciasEstoque.length} SKU(s) com divergência no razão de estoque`,
        detalhe: 'A soma das movimentações difere do saldo físico em meuEstoque.',
        comoCorrigir: 'Abra o Extrato do SKU no estoque BH e faça o ajuste de inventário.'
      });
    }
    if (vendasDataInvalidaCount > 0) {
      qualidadeIssues.push({
        severidade: 'aviso',
        titulo: `${vendasDataInvalidaCount} venda(s) com data ausente ou inválida`,
        detalhe: 'Vendas sem data válida ficam de fora da evolução mensal e filtros de período.',
        comoCorrigir: 'Verifique os lançamentos antigos em Histórico de Vendas.'
      });
    }
    if (vendasMargemAtipicaBaixa > 0) {
      qualidadeIssues.push({
        severidade: 'aviso',
        titulo: `${vendasMargemAtipicaBaixa} venda(s) com margem líquida abaixo de 10%`,
        detalhe: 'Pode indicar desconto excessivo, taxa de cartão não repassada ou custo lançado errado.',
        comoCorrigir: 'Revise o preço unitário e o pagamento parcelado nessas vendas.'
      });
    }
    if (vendasMargemAtipicaAlta > 0) {
      qualidadeIssues.push({
        severidade: 'info',
        titulo: `${vendasMargemAtipicaAlta} venda(s) com margem acima de 85%`,
        detalhe: 'Verifique se o custo unitário do SKU está corretamente cadastrado.',
        comoCorrigir: 'Confira o custo real no cadastro ou entrada do lote.'
      });
    }
    if (kpisBase.qtdVendas > 0 && despesasPeriodo.length === 0) {
      qualidadeIssues.push({
        severidade: 'info',
        titulo: 'Nenhuma despesa operacional lançada no período',
        detalhe: 'O Lucro Líquido ainda não desconta motoboy, embalagem/gelox, frete interno SP→BH ou tráfego pago.',
        comoCorrigir: 'Use o botão "💸 + Lançar Despesa" para registrar gastos reais e ter DRE 100% fiel.'
      });
    }
    if (lotesSemValorCount > 0) {
      qualidadeIssues.push({
        severidade: 'aviso',
        titulo: `${lotesSemValorCount} lote(s) em trânsito sem custo total preenchido`,
        detalhe: 'O Fluxo de Caixa e o Capital Alocado ficam subestimados sem o custo pago ao fornecedor.',
        comoCorrigir: 'Preencha o valor pago em Trânsito / Compras.'
      });
    }
    if (vendasSemTelefoneCount > 0) {
      qualidadeIssues.push({
        severidade: 'info',
        titulo: `${vendasSemTelefoneCount} venda(s) sem WhatsApp do cliente`,
        detalhe: 'Limita o disparo automático de follow-up de recompra e cobrança.',
        comoCorrigir: 'Complete o telefone no cadastro do cliente em 👥 Clientes.'
      });
    }

    // 11. Semáforos Gerenciais Automáticos
    const temVendas = kpisBase.qtdVendas > 0;
    const shareAReceber = kpisBase.receitaBruta > 0 ? round2((aReceberTotal / kpisBase.receitaBruta) * 100) : (aReceberTotal > 0 ? 100 : 0);
    const top1ClienteShare = porCliente.length > 0 ? porCliente[0].sharePct : 0;

    const semMargem = !temVendas
      ? makeSemaforo('neutro', 'Sem vendas no período')
      : kpisBase.margemLiquidaPct >= 32
        ? makeSemaforo('verde', `Saudável (${kpisBase.margemLiquidaPct.toFixed(1)}%)`, 'Meta operacional ≥ 32%')
        : kpisBase.margemLiquidaPct >= 20
          ? makeSemaforo('amarelo', `Comprimida (${kpisBase.margemLiquidaPct.toFixed(1)}%)`, 'Ideal ≥ 32%; revisar descontos/despesas')
          : makeSemaforo('vermelho', `Crítica (${kpisBase.margemLiquidaPct.toFixed(1)}%)`, 'Abaixo do piso de 20%');

    const semLucro = !temVendas && kpisBase.despesasOperacionais === 0
      ? makeSemaforo('neutro', 'Sem movimento')
      : kpisBase.lucroLiquido <= 0
        ? makeSemaforo('vermelho', 'Resultado negativo', 'Custos + despesas superam receita líquida')
        : (comparativo && comparativo.temBaseAnterior && comparativo.deltaLucroPct !== null && comparativo.deltaLucroPct < -20)
          ? makeSemaforo('amarelo', `Queda de ${Math.abs(comparativo.deltaLucroPct).toFixed(0)}% vs ant.`, `Lucro positivo, mas abaixo de ${comparativo.labelAnterior}`)
          : makeSemaforo('verde', 'Lucro saudável', `ROI sobre CMV: ${kpisBase.roiSobreCmvPct.toFixed(1)}%`);

    const semCaixa = (kpisBase.entradasCaixa === 0 && kpisBase.saidasCaixa === 0)
      ? makeSemaforo('neutro', 'Sem fluxo no período')
      : kpisBase.geracaoCaixa >= 0
        ? makeSemaforo('verde', 'Caixa positivo', 'Entradas cobrem compras e despesas')
        : (kpisBase.comprasPagas > 0 && (kpisBase.geracaoCaixa + kpisBase.comprasPagas) >= 0)
          ? makeSemaforo('amarelo', 'Reinvestido em estoque', 'Negativo por compra de lote; operacional positivo')
          : makeSemaforo('vermelho', 'Queima de caixa', 'Saídas acima das entradas pagas');

    const semAReceber = aReceberTotal <= 0
      ? makeSemaforo('verde', 'Zero pendência', '100% recebido à vista')
      : shareAReceber <= 15
        ? makeSemaforo('verde', `Sob controle (${shareAReceber.toFixed(0)}%)`, 'Pendência baixa frente à receita')
        : shareAReceber <= 30
          ? makeSemaforo('amarelo', `Atenção (${shareAReceber.toFixed(0)}% da rec.)`, 'Cobrar clientes pendentes')
          : makeSemaforo('vermelho', `Elevado (${shareAReceber.toFixed(0)}% da rec.)`, 'Risco de travar capital de giro');

    const semConcentracao = (porCliente.length === 0 || kpisBase.qtdVendas < 3)
      ? makeSemaforo('neutro', 'Base pequena')
      : top1ClienteShare <= 30
        ? makeSemaforo('verde', `Diversificada (${top1ClienteShare.toFixed(0)}%)`, 'Nenhum cliente domina a receita')
        : top1ClienteShare <= 50
          ? makeSemaforo('amarelo', `Moderada (${top1ClienteShare.toFixed(0)}%)`, `Top 1: ${porCliente[0].cliente}`)
          : makeSemaforo('vermelho', `Alta (${top1ClienteShare.toFixed(0)}%)`, `Dependência excessiva de ${porCliente[0].cliente}`);

    const criticosQualidade = qualidadeIssues.filter(q => q.severidade === 'critico').length;
    const avisosQualidade = qualidadeIssues.filter(q => q.severidade === 'aviso').length;
    const semDados = criticosQualidade > 0
      ? makeSemaforo('vermelho', `${criticosQualidade} erro(s) crítico(s)`)
      : avisosQualidade > 0
        ? makeSemaforo('amarelo', `${avisosQualidade} aviso(s)`)
        : makeSemaforo('verde', 'Base consistente');

    // Semáforo geral executivo
    const statusesChave = [semMargem.status, semLucro.status, semCaixa.status, semAReceber.status].filter(s => s !== 'neutro');
    const geralStatus = statusesChave.length === 0
      ? 'neutro'
      : statusesChave.includes('vermelho')
        ? 'vermelho'
        : statusesChave.includes('amarelo')
          ? 'amarelo'
          : 'verde';
    const semGeral = makeSemaforo(
      geralStatus,
      geralStatus === 'verde' ? 'Operação saudável' : geralStatus === 'amarelo' ? 'Pontos de atenção' : geralStatus === 'vermelho' ? 'Ação corretiva necessária' : 'Aguardando vendas'
    );

    const semaforos = {
      geral: semGeral,
      margemLiquida: semMargem,
      lucroLiquido: semLucro,
      geracaoCaixa: semCaixa,
      aReceber: semAReceber,
      concentracaoCliente: semConcentracao,
      qualidadeDados: semDados
    };

    // 12. Insights Executivos Automáticos (Conclusões, Riscos, Oportunidades, Recomendações)
    const fmtBrl = n => 'R$ ' + round2(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const conclusoes = [];
    const riscos = [];
    const oportunidades = [];
    const recomendacoes = [];

    if (temVendas) {
      conclusoes.push(
        `No período (${range.label}), foram ${kpisBase.qtdVendas} venda(s) (${kpisBase.qtdUnidades} un) somando ${fmtBrl(kpisBase.receitaBruta)} de receita bruta e ${fmtBrl(kpisBase.lucroLiquido)} de lucro líquido (margem líquida de ${kpisBase.margemLiquidaPct.toFixed(1)}%).`
      );
      if (comparativo && comparativo.temBaseAnterior && comparativo.deltaReceitaPct !== null) {
        const sinalRec = comparativo.deltaReceitaPct >= 0 ? '+' : '';
        const sinalLuc = (comparativo.deltaLucroPct || 0) >= 0 ? '+' : '';
        conclusoes.push(
          `Comparado a ${comparativo.labelAnterior}, a receita variou ${sinalRec}${comparativo.deltaReceitaPct.toFixed(1)}% e o lucro líquido ${sinalLuc}${(comparativo.deltaLucroPct || 0).toFixed(1)}%.`
        );
      }
      if (porProduto.length > 0) {
        const topP = porProduto[0];
        conclusoes.push(
          `Produto campeão de lucro: ${topP.nome} (${fmtBrl(topP.lucro)} líquidos · ${topP.margemPct.toFixed(1)}% de margem · ${topP.qtd} un).`
        );
      }
      if (porCliente.length > 0) {
        const topC = porCliente[0];
        conclusoes.push(
          `Principal cliente: ${topC.cliente} com ${fmtBrl(topC.receita)} (${topC.sharePct.toFixed(1)}% da receita · ${topC.qtdVendas} pedido(s)).`
        );
      }
    } else {
      conclusoes.push(
        `Nenhuma venda ativa encontrada para o filtro atual (${range.label}). Há ${fmtBrl(estoquePotencialPix)} em estoque BH pronto para girar e ${fmtBrl(transitoInvestido)} em trânsito.`
      );
    }

    // Riscos
    if (aReceberTotal > 0) {
      riscos.push({
        nivel: semAReceber.status,
        texto: `${fmtBrl(aReceberTotal)} em aberto para receber (${shareAReceber.toFixed(0)}% da receita do período).`,
        acao: { label: 'Cobrar pendentes', handler: 'openSalesHistoryModal' }
      });
    }
    if (semConcentracao.status === 'vermelho' || semConcentracao.status === 'amarelo') {
      riscos.push({
        nivel: semConcentracao.status,
        texto: `Alta concentração de receita: ${porCliente[0].cliente} representa ${top1ClienteShare.toFixed(1)}% do faturamento.`,
        acao: { label: 'Ver Clientes', handler: 'openClientesModal' }
      });
    }
    if (kpisBase.taxasCartao > 0 && kpisBase.receitaBruta > 0 && (kpisBase.taxasCartao / kpisBase.receitaBruta) > 0.05) {
      riscos.push({
        nivel: 'amarelo',
        texto: `Taxas de cartão consomem ${fmtBrl(kpisBase.taxasCartao)} (${((kpisBase.taxasCartao / kpisBase.receitaBruta) * 100).toFixed(1)}% da receita). Garanta o acréscimo de +12,012% no 12x.`,
        acao: null
      });
    }
    if (estoqueParado.length > 0) {
      riscos.push({
        nivel: estoqueParado.length >= 3 ? 'vermelho' : 'amarelo',
        texto: `${estoqueParado.length} SKU(s) em BH sem venda há 30+ dias (${fmtBrl(capitalParadoCusto)} empatados a custo).`,
        acao: { label: 'Ver Parados', handler: 'openPaineisComerciaisModal' }
      });
    }
    if (semMargem.status === 'vermelho' || semMargem.status === 'amarelo') {
      riscos.push({
        nivel: semMargem.status,
        texto: `Margem líquida em ${kpisBase.margemLiquidaPct.toFixed(1)}% (abaixo da meta de 32%).`,
        acao: null
      });
    }
    if (riscos.length === 0) {
      riscos.push({ nivel: 'verde', texto: 'Nenhum risco financeiro relevante detectado no recorte atual.', acao: null });
    }

    // Oportunidades
    const prodAltaMargem = porProduto.filter(p => p.margemPct >= 38).sort((a, b) => b.margemPct - a.margemPct)[0];
    if (prodAltaMargem) {
      oportunidades.push(
        `Escalar ${prodAltaMargem.nome}: entregou ${prodAltaMargem.margemPct.toFixed(1)}% de margem líquida (${fmtBrl(prodAltaMargem.lucro)} de lucro).`
      );
    }
    const clientesRecompra = porCliente.filter(c => c.diasSemComprar !== null && c.diasSemComprar >= 25).slice(0, 3);
    if (clientesRecompra.length > 0) {
      oportunidades.push(
        `${clientesRecompra.length} cliente(s) já passaram de 25 dias desde a última compra (${clientesRecompra.map(c => c.cliente).join(', ')}) — janela ideal de recompra.`
      );
    }
    if (estoquePotencialPix > 0) {
      const lucroPotEstoque = round2(Math.max(0, estoquePotencialPix - estoqueCusto));
      oportunidades.push(
        `Estoque pronto em BH (${estoqueUnidades} un) tem potencial de ${fmtBrl(estoquePotencialPix)} no PIX (+${fmtBrl(lucroPotEstoque)} de margem bruta potencial).`
      );
    }
    if (encomendasAbertas.length > 0) {
      const valEnc = round2(encomendasAbertas.reduce((s, e) => s + safeNum(e.valorTotal, 0), 0));
      oportunidades.push(
        `${encomendasAbertas.length} encomenda(s) em andamento somam ${fmtBrl(valEnc)} de receita contratada para converter em caixa.`
      );
    }
    if (oportunidades.length === 0) {
      oportunidades.push('Registre suas vendas e despesas diariamente para destravar comparativos de recompra e ranking de margem.');
    }

    // Recomendações práticas
    if (aReceberTotal > 0) {
      recomendacoes.push({
        texto: `Priorizar recebimento dos ${fmtBrl(aReceberTotal)} em aberto antes de fazer nova compra ao fornecedor.`,
        acaoLabel: 'Abrir Vendas',
        handler: 'openSalesHistoryModal'
      });
    }
    if (estoqueParado.length > 0) {
      recomendacoes.push({
        texto: `Fazer oferta direcionada no WhatsApp para girar ${estoqueParado[0].nome} (${estoqueParado[0].qtd} un paradas em BH).`,
        acaoLabel: 'Lista Pronta Entrega',
        handler: 'openProntaEntregaWa'
      });
    }
    if (kpisBase.qtdVendas > 0 && despesasPeriodo.length === 0) {
      recomendacoes.push({
        texto: 'Lançar despesas de motoboy, embalagem e frete interno para apurar o lucro líquido real sem distorção.',
        acaoLabel: '+ Lançar Despesa',
        handler: 'openDespesaModal'
      });
    }
    if (porCanal.length > 1) {
      const melhorCanal = [...porCanal].sort((a, b) => b.margemPct - a.margemPct)[0];
      recomendacoes.push({
        texto: `Reforçar oferta no canal "${melhorCanal.label}", que lidera em rentabilidade (${melhorCanal.margemPct.toFixed(1)}% de margem).`,
        acaoLabel: 'Nova Venda',
        handler: 'openVendaRapidaModal'
      });
    }
    if (recomendacoes.length === 0) {
      recomendacoes.push({
        texto: 'Manter a rotina de registro de vendas, custos reais de lote e despesas para acompanhar a evolução mensal.',
        acaoLabel: '⚡ Nova Venda',
        handler: 'openVendaRapidaModal'
      });
    }

    // 13. DRE Estruturado (para tabela executiva e exportação)
    const pctRec = (v) => kpisBase.receitaBruta > 0 ? round2((v / kpisBase.receitaBruta) * 100) : 0;
    const dre = [
      { id: 'receita_bruta', label: '(+) Receita Bruta de Vendas', valor: kpisBase.receitaBruta, pct: 100, tipo: 'positivo', destaque: false },
      { id: 'taxas_cartao', label: '(−) Taxas de Cartão (MDR est./real)', valor: -kpisBase.taxasCartao, pct: -pctRec(kpisBase.taxasCartao), tipo: 'deducao', destaque: false },
      { id: 'receita_liquida', label: '(=) Receita Líquida', valor: kpisBase.receitaLiquida, pct: pctRec(kpisBase.receitaLiquida), tipo: 'subtotal', destaque: false },
      { id: 'cmv', label: '(−) Custo dos Produtos Vendidos (CMV)', valor: -kpisBase.custosTotais, pct: -pctRec(kpisBase.custosTotais), tipo: 'custo', destaque: false },
      { id: 'lucro_bruto', label: '(=) Lucro Bruto / Margem de Contribuição', valor: kpisBase.lucroBruto, pct: pctRec(kpisBase.lucroBruto), tipo: 'subtotal', destaque: false },
      { id: 'despesas_op', label: '(−) Despesas Operacionais Lançadas', valor: -kpisBase.despesasOperacionais, pct: -pctRec(kpisBase.despesasOperacionais), tipo: 'despesa', destaque: false },
      { id: 'lucro_liquido', label: '(=) Resultado Operacional (Lucro Líquido)', valor: kpisBase.lucroLiquido, pct: pctRec(kpisBase.lucroLiquido), tipo: 'total', destaque: true }
    ];

    return {
      geradoEm: new Date(nowTs).toISOString(),
      periodoLabel: range.label,
      filters,
      filterOptions,
      kpis: {
        ...kpisBase,
        aReceberTotal,
        saldoEncomendasChegadas: round2(saldoEncomendasChegadas),
        shareAReceberPct: shareAReceber,
        estoqueUnidades,
        estoqueCusto,
        estoquePotencialPix,
        transitoInvestido,
        capitalAlocadoTotal,
        capitalParadoCusto
      },
      dre,
      semaforos,
      comparativo,
      seriesMensais,
      rankings: {
        porProduto,
        porCliente,
        porCanal,
        porCategoria,
        porPagamento
      },
      despesasFiltradas: [...despesasPeriodo].sort((a, b) => (b.dt.ts || 0) - (a.dt.ts || 0)),
      estoqueParado,
      insights: {
        conclusoes,
        riscos,
        oportunidades,
        recomendacoes
      },
      qualidadeDados: {
        totalAlertas: qualidadeIssues.length,
        criticos: criticosQualidade,
        avisos: avisosQualidade,
        itens: qualidadeIssues
      }
    };
  }

  function buildExecutiveWhatsAppSummary(report) {
    if (!report) return '';
    const fmt = n => 'R$ ' + round2(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const k = report.kpis;
    const s = report.semaforos;
    const lines = [
      `📊 *RELATÓRIO EXECUTIVO — SHAPE TOTAL CRM*`,
      `🗓️ Período: *${report.periodoLabel}* · Status: ${s.geral.icone} *${s.geral.texto}*`,
      ``,
      `💰 *DRE GERENCIAL*`,
      `• Receita Bruta: *${fmt(k.receitaBruta)}* (${k.qtdVendas} vendas · ${k.qtdUnidades} un)`,
      `• (−) Taxas Cartão: ${fmt(k.taxasCartao)}`,
      `• (=) Receita Líquida: *${fmt(k.receitaLiquida)}*`,
      `• (−) CMV (Produtos): ${fmt(k.custosTotais)}`,
      `• (−) Despesas Operacionais: ${fmt(k.despesasOperacionais)}`,
      `• (=) *Lucro Líquido:* ${s.lucroLiquido.icone} *${fmt(k.lucroLiquido)}* (Margem ${s.margemLiquida.icone} *${k.margemLiquidaPct.toFixed(1)}%*)`,
      ``,
      `🏦 *CAIXA & CAPITAL*`,
      `• Geração de Caixa: ${s.geracaoCaixa.icone} *${fmt(k.geracaoCaixa)}* (Entradas ${fmt(k.entradasCaixa)} − Saídas ${fmt(k.saidasCaixa)})`,
      `• A Receber: ${s.aReceber.icone} *${fmt(k.aReceberTotal)}*`,
      `• Capital Alocado: *${fmt(k.capitalAlocadoTotal)}* (Estoque BH ${fmt(k.estoqueCusto)} + Trânsito ${fmt(k.transitoInvestido)})`,
      `• Potencial Estoque BH (PIX): *${fmt(k.estoquePotencialPix)}*`
    ];
    if (report.rankings.porProduto.length) {
      const top3 = report.rankings.porProduto.slice(0, 3);
      lines.push('', `🏆 *TOP PRODUTOS (LUCRO)*`);
      top3.forEach((p, idx) => lines.push(`${idx + 1}. ${p.nome} — +${fmt(p.lucro)} (${p.margemPct.toFixed(1)}%)`));
    }
    if (report.rankings.porCliente.length) {
      const top3c = report.rankings.porCliente.slice(0, 3);
      lines.push('', `👥 *TOP CLIENTES*`);
      top3c.forEach((c, idx) => lines.push(`${idx + 1}. ${c.cliente} — ${fmt(c.receita)} (${c.qtdVendas} ped.)`));
    }
    if (report.insights.recomendacoes.length) {
      lines.push('', `🎯 *PRÓXIMAS AÇÕES*`);
      report.insights.recomendacoes.slice(0, 3).forEach(r => lines.push(`• ${r.texto}`));
    }
    return lines.join('\n');
  }

  function buildExecutiveCSV(report) {
    if (!report) return '';
    const escCsv = (v) => `"${String(v === undefined || v === null ? '' : v).replace(/"/g, '""')}"`;
    const rows = [
      ['SECAO', 'ITEM', 'VALOR_BRL', 'PERCENTUAL_OU_QTD', 'DETALHE']
    ];
    report.dre.forEach(d => {
      rows.push(['DRE', d.label, round2(d.valor).toFixed(2), `${d.pct}%`, report.periodoLabel]);
    });
    rows.push(['CAIXA', 'Entradas Recebidas', round2(report.kpis.entradasCaixa).toFixed(2), '', 'Regime de caixa']);
    rows.push(['CAIXA', 'Saidas Pagas (Compras + Despesas)', round2(report.kpis.saidasCaixa).toFixed(2), '', 'Regime de caixa']);
    rows.push(['CAIXA', 'Geracao de Caixa Liquida', round2(report.kpis.geracaoCaixa).toFixed(2), report.semaforos.geracaoCaixa.texto, '']);
    rows.push(['CAIXA', 'Contas a Receber', round2(report.kpis.aReceberTotal).toFixed(2), `${report.kpis.shareAReceberPct}%`, '']);
    report.rankings.porProduto.forEach(p => {
      rows.push(['RANKING_PRODUTO', p.nome, round2(p.lucro).toFixed(2), `${p.qtd} un / ${p.margemPct}%`, `Receita R$ ${round2(p.receita).toFixed(2)}`]);
    });
    report.rankings.porCliente.forEach(c => {
      rows.push(['RANKING_CLIENTE', c.cliente, round2(c.receita).toFixed(2), `${c.qtdVendas} ped / ${c.margemPct}%`, `Lucro R$ ${round2(c.lucro).toFixed(2)}`]);
    });
    report.despesasFiltradas.forEach(d => {
      rows.push(['DESPESA', `${d.categoria} - ${d.descricao}`, round2(d.valor).toFixed(2), d.status, d.data]);
    });
    return rows.map(r => r.map(escCsv).join(',')).join('\n');
  }

  const api = {
    CANAL_LABELS,
    CATEGORIA_LABELS,
    PAGAMENTO_LABELS,
    DESPESA_CATEGORIAS,
    parseSafeDate,
    formatMonthLabel,
    normalizePaymentBucket,
    inferCanalVenda,
    estimateCardFee,
    computeBiReport,
    buildExecutiveWhatsAppSummary,
    buildExecutiveCSV
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.SHAPETOTAL_BI = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
