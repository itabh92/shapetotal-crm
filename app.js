
  const SPECIAL_FIXED_REC = {
    // Linha 60 mg / 4 vias x 15 mg / MD 15 mg -> Pix: R$ 900,00 | Cartão: R$ 1.000,00
    2848: { rec: 900, cartao: 1000, label: 'TG 15mg x 4 (60mg)' },
    3207: { rec: 900, cartao: 1000, label: 'Tirzec 15mg x 4 (60mg)' },
    2889: { rec: 900, cartao: 1000, label: 'Lipoless 15mg x 4 (60mg)' },
    2988: { rec: 900, cartao: 1000, label: 'Lipoland 15mg x 4 (60mg)' },
    3072: { rec: 900, cartao: 1000, label: 'Lipoland MD 15mg' },
    2997: { rec: 900, cartao: 1000, label: 'Lipoless MD 15mg' },
    2996: { rec: 900, cartao: 1000, label: 'Tirzec MD 15mg' },
    3308: { rec: 900, cartao: 1000, label: 'T36 MD 15mg' },
    3381: { rec: 900, cartao: 1000, label: 'T36 15mg x 4 (60mg)' },
    3039: { rec: 900, cartao: 1000, label: 'Gluconex 15mg x 4 (60mg)' },
    3136: { rec: 900, cartao: 1000, label: 'Tirzedral 15mg x 4 (60mg)' },
    3203: { rec: 900, cartao: 1000, label: 'Tirzedral MD 15mg' },
    446:  { rec: 900, cartao: 1000, label: 'Lipoless 15mg x 4 Jer' },
    3389: { rec: 900, cartao: 1000, label: 'Slimex 15mg x 4 (60mg)' },
    3014: { rec: 900, cartao: 1000, label: 'Synedica Tirzepatida 60mg' },
    3392: { rec: 900, cartao: 1000, label: 'Oxygen Tirzegen 60mg x 4' },
    3271: { rec: 900, cartao: 1000, label: 'Oxygen Tirzegen 60mg Polvo' },
    2877: { rec: 900, cartao: 1000, label: 'Sin Marca Tirzepatida 60mg' },
    3149: { rec: 1467, cartao: 1567, label: 'Spectrum Mounjaos 60mg (Importado)' },
    2765: { rec: 900, cartao: 1000, label: 'Gen-Tirz 60mg' },
    3186: { rec: 900, cartao: 1000, label: 'Veltrane Tirzepatide 60mg' },

    // Retatrutida 60 mg -> Pix: R$ 1.000,00 | Cartão: R$ 1.100,00
    3340: { rec: 1000, cartao: 1100, label: 'Oxygen Retatrutide 60mg' },
    2830: { rec: 1000, cartao: 1100, label: 'Gen Retatrutide 60mg' },
    2942: { rec: 1000, cartao: 1100, label: 'Gen-Health Caneta 60mg' },
    3156: { rec: 1000, cartao: 1100, label: 'Veltrane Retatrutide 60mg' },
    3391: { rec: 1000, cartao: 1100, label: 'Synedica Retatrutide 60mg' },
    3147: { rec: 1000, cartao: 1100, label: 'ZPHC Caneta Retatrutide 60mg' },
    2965: { rec: 1000, cartao: 1100, label: 'ZPHC Retatrutide 60mg (5x12mg)' },
    3370: { rec: 3800, cartao: 4200, label: 'Kit Retatrutida Gen-Health (4x60mg)' },

    // Ampolas / Frascos avulsos 15 mg
    3206: { rec: 735, cartao: 835, label: 'Pharmacom Jaros Tirzepatida 15mg (Importado)' },
    2763: { rec: 450, cartao: 550, label: 'Gen-Tirz 15mg' },
    2875: { rec: 250, cartao: 300, label: 'Sin Marca Tirzepatida 15mg' },
    3008: { rec: 250, cartao: 300, label: 'ZPHC Tirzepatide 15mg' },

    // Itens Exclusivos Pronta Entrega BH (Ampolas avulsas e frascos)
    9001: { rec: 250, cartao: 300, label: 'Lipoland 15mg (Ampola Avulsa)' },
    9002: { rec: 250, cartao: 300, label: 'Tirzec 15mg (Ampola Avulsa)' },
    9003: { rec: 250, cartao: 300, label: 'TG 15mg (Ampola Avulsa)' },
    9004: { rec: 250, cartao: 300, label: 'Lipoless 15mg (Ampola Avulsa)' },
    9005: { rec: 2000, cartao: 2200, label: 'Retatrutida Gen 120mg (Doses)' },
    9006: { rec: 1800, cartao: 2000, label: 'Tirzepatida Gen-Tirz 120mg (Doses)' }
  };

  const ESTOQUE_CANONICO_BH = {
    2848: 4, // TG 60mg (Caixa 4x15mg)
    2889: 4, // Lipoless 60mg (Caixa 4x15mg)
    3207: 1, // Tirzec 60mg (Caixa 4x15mg)
    3136: 1, // Tirzedral 60mg (Caixa 4x15mg)
    3370: 1, // Kit Retatrutida 4x60mg + Água
    2830: 3, // Retatrutida 60mg ampolas fechadas
    9001: 3, // Ampola avulsa Lipoland 15mg
    9002: 3, // Ampola avulsa Tirzec 15mg
    9003: 3, // Ampola avulsa TG 15mg
    9004: 2, // Ampola avulsa Lipoless 15mg
    9005: 1, // Retatrutida 120mg frasco doses
    9006: 1  // Tirzepatida 120mg frasco doses
  };

  const TABELA_DOSES_OFICIAIS = {
    9006: {
      id: 9006,
      nome: 'Tirzepatide Injection 120mg/4ml (30mg/ml)',
      marca: 'USA Peptides',
      totalMg: 120,
      fotoTabela: 'fotos/tabela_doses_tirzepatida_120mg.jpg',
      doses: [
        { mg: 2.5, preco: 65, label: '2,5 mg', fullLabel: '2,5 mg — R$ 65,00' },
        { mg: 5.0, preco: 130, label: '5,0 mg', fullLabel: '5,0 mg — R$ 130,00' },
        { mg: 7.5, preco: 185, label: '7,5 mg', fullLabel: '7,5 mg — R$ 185,00' }
      ]
    },
    9005: {
      id: 9005,
      nome: 'Retatrutide 120 mg (GLP-1, GIP, Glucagon)',
      marca: 'GEN-HEALTH',
      totalMg: 120,
      fotoTabela: 'fotos/tabela_doses_retatrutida_120mg.jpg',
      doses: [
        { mg: 2.5, preco: 80, label: '2,5 mg', fullLabel: '2,5 mg — R$ 80,00' },
        { mg: 5.0, preco: 150, label: '5,0 mg', fullLabel: '5,0 mg — R$ 150,00' }
      ]
    }
  };

  const PEDIDOS_TRANSITO_CANONICOS = [
    {
      id: "PED-20261109-02",
      data_compra: "09/11/2026",
      fornecedor: "Outro Fornecedor",
      status: "em_transito",
      custo_total_reais: 3125.00,
      itens: [
        { id_catalogo: 2996, nome: "QUIMFA TIRZEC MULTI DOSIS 60 MG (AMPOLA ÚNICA)", qtd: 2, preco_venda_pix: 900, preco_venda_cartao: 1000 },
        { id_catalogo: 2848, nome: "INDUFAR T.G. TIRZEPATIDA X 15 MG. X 4 AMP. (60 MG)", qtd: 2, preco_venda_pix: 900, preco_venda_cartao: 1000 },
        { id_catalogo: 3207, nome: "TIRZEC X 15 MG. X 4 AMPOLLAS (60 MG)", qtd: 1, preco_venda_pix: 900, preco_venda_cartao: 1000 }
      ]
    },
    {
      id: "PED-20261109-01",
      data_compra: "09/11/2026",
      fornecedor: "Shape Total / Importação",
      status: "em_transito",
      custo_total_reais: 2644.20,
      itens: [
        { id_catalogo: 3207, nome: "TIRZEC X 15 MG. X 4 AMPOLLAS (60 MG)", qtd: 3, preco_venda_pix: 900, preco_venda_cartao: 1000 },
        { id_catalogo: 2848, nome: "INDUFAR T.G. TIRZEPATIDA X 15 MG. X 4 AMP. (60 MG)", qtd: 3, preco_venda_pix: 900, preco_venda_cartao: 1000 }
      ]
    },
    {
      id: "PED-20261106-01",
      data_compra: "06/11/2026",
      fornecedor: "Shape Total / Importação",
      status: "em_transito",
      custo_total_reais: 6103.41,
      itens: [
        { id_catalogo: 3072, nome: "LIPOLAND MULTIDOSIS X 15 MG", qtd: 1, preco_venda_pix: 900, preco_venda_cartao: 1000 },
        { id_catalogo: 2848, nome: "INDUFAR T.G. TIRZEPATIDA X 15 MG. X 4 AMP. (60 MG)", qtd: 3, preco_venda_pix: 900, preco_venda_cartao: 1000 },
        { id_catalogo: 2889, nome: "LIPOLESS X 15 MG. X 4 AMPOLLAS (60 MG)", qtd: 1, preco_venda_pix: 900, preco_venda_cartao: 1000 },
        { id_catalogo: 3207, nome: "TIRZEC X 15 MG. X 4 AMPOLLAS (60 MG)", qtd: 5, preco_venda_pix: 900, preco_venda_cartao: 1000 },
        { id_catalogo: 3230, nome: "OXYGEN CJC 1295 + IPAMORELIN X 10 MG.", qtd: 1, preco_venda_pix: 630, preco_venda_cartao: 730 }
      ]
    }
  ];

(function () {
  const STORAGE_KEY = 'SHAPETOTAL_CRM_STATE_V1';
  const BACKUP_KEY = 'SHAPETOTAL_CRM_BACKUP_PRE_IMPORT';

  const DEFAULT_GROUP_MARGINS = {
    anabolizante: { label: '💪 Anabolizantes', min: 28, rec: 40, max: 58 },
    emagrecedores: { label: '🔥 Emagrecedores & Queimadores', min: 28, rec: 40, max: 55 },
    saude_mental: { label: '🧠 Saúde Mental & Nootrópicos', min: 32, rec: 45, max: 65 },
    peptideo: { label: '🧬 Peptídeos & HGH', min: 30, rec: 45, max: 65 },
    estetico: { label: '✨ Estético, Botox & Pele', min: 35, rec: 50, max: 75 },
    sarms_post: { label: '🧪 SARMs, Pós-Ciclo & HCG', min: 30, rec: 42, max: 60 },
    potencia_outros: { label: '⚡ Potência, Capilar & Outros', min: 32, rec: 45, max: 70 }
  };

  let state = {
    cotacao: 5.60,
    fretePct: 30,
    taxaCartaoFixa: 100,
    activeTier: 'rec', // 'min' | 'rec' | 'max'
    viewMode: 'grid', // 'grid' | 'table'
    clientMode: false,
    mainGroup: 'todas',
    subCat: 'todas',
    brand: 'todas',
    stockFilter: 'com_estoque', // 'com_estoque' | 'todos' | 'sem_estoque'
    branchFilter: 'todas', // 'todas' | 'cde' | 'pj' | 'sg'
    sortBy: 'estoque_desc',
    search: '',
    groupMargins: JSON.parse(JSON.stringify(DEFAULT_GROUP_MARGINS)),
    overrides: {}, // { [id]: { usd, tier, customPrice, customMargin, desc, fav } }
    meuEstoque: {}, // { [id]: qty }
    cart: {}, // { [id]: qty }
    vendas: [], // [ { id, data, produtoId, produtoNome, qtd, valorUnitario, valorTotal, pagamento, cliente, telefone, obs, lucro } ]
    pedidosTransito: [], // [ { id, data_compra, status, custo_total_reais, itens: [ { id_catalogo, nome, qtd, ... } ] } ]
    frascosDoses: {
      9006: { mgRestante: 120, totalAplicadasMg: 0 },
      9005: { mgRestante: 120, totalAplicadasMg: 0 }
    }
  };

  function loadState() {
    // O estoque canônico só é semeado quando o aparelho nunca teve estoque salvo.
    // Estoque zerado por vendas é estado legítimo e não pode ser "recuperado".
    let temEstoqueSalvo = false;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        temEstoqueSalvo = !!parsed.meuEstoque && typeof parsed.meuEstoque === 'object';
        state.canonVistos = Array.isArray(parsed.canonVistos) ? parsed.canonVistos.map(String) : [];
        state.cotacao = Number(parsed.cotacao) || 5.60;
        state.fretePct = parsed.fretePct !== undefined ? Number(parsed.fretePct) : 30;
        state.taxaCartaoFixa = parsed.taxaCartaoFixa !== undefined ? Number(parsed.taxaCartaoFixa) : 100;
        state.activeTier = parsed.activeTier || 'rec';
        if (parsed.groupMargins) {
          for (const k of Object.keys(DEFAULT_GROUP_MARGINS)) {
            if (parsed.groupMargins[k]) {
              state.groupMargins[k] = { ...DEFAULT_GROUP_MARGINS[k], ...parsed.groupMargins[k] };
            }
          }
        }
        state.overrides = parsed.overrides || {};
        state.meuEstoque = parsed.meuEstoque || {};
        state.vendas = Array.isArray(parsed.vendas) ? parsed.vendas : [];
        state.pedidosTransito = Array.isArray(parsed.pedidosTransito) ? parsed.pedidosTransito : [];
        state.frascosDoses = parsed.frascosDoses || {
          9006: { mgRestante: 120, totalAplicadasMg: 0 },
          9005: { mgRestante: 120, totalAplicadasMg: 0 }
        };
      } else {
        state.frascosDoses = {
          9006: { mgRestante: 120, totalAplicadasMg: 0 },
          9005: { mgRestante: 120, totalAplicadasMg: 0 }
        };
      }
    } catch (e) {
      console.error('Erro ao carregar estado:', e);
    }

    if (!state.frascosDoses) {
      state.frascosDoses = {};
    }
    if (!state.frascosDoses[9006]) state.frascosDoses[9006] = { mgRestante: 120, totalAplicadasMg: 0 };
    if (!state.frascosDoses[9005]) state.frascosDoses[9005] = { mgRestante: 120, totalAplicadasMg: 0 };

    // Auto-merge: cada pedido canônico entra uma única vez por aparelho.
    // Depois de visto, não volta mesmo que o usuário o exclua.
    if (!Array.isArray(state.pedidosTransito)) state.pedidosTransito = [];
    if (!Array.isArray(state.canonVistos)) state.canonVistos = [];
    let changed = false;
    PEDIDOS_TRANSITO_CANONICOS.forEach(canon => {
      const cid = String(canon.id);
      if (state.canonVistos.includes(cid)) return;
      if (!state.pedidosTransito.some(p => String(p.id) === cid)) {
        state.pedidosTransito.unshift(JSON.parse(JSON.stringify(canon)));
      }
      state.canonVistos.push(cid);
      changed = true;
    });

    // Semeia o estoque físico de BH somente na primeira carga do aparelho
    if (!temEstoqueSalvo) {
      state.meuEstoque = JSON.parse(JSON.stringify(ESTOQUE_CANONICO_BH));
      changed = true;
    }
    if (changed) saveState();
  }

  function esc(v) {
    return String(v === undefined || v === null ? '' : v).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  // Dados que trafegam entre aparelhos (link de sync e arquivo de backup)
  function buildSyncData() {
    return {
      cotacao: state.cotacao,
      fretePct: state.fretePct,
      taxaCartaoFixa: state.taxaCartaoFixa,
      activeTier: state.activeTier,
      meuEstoque: state.meuEstoque,
      vendas: state.vendas || [],
      pedidosTransito: state.pedidosTransito || [],
      frascosDoses: state.frascosDoses || {},
      overrides: state.overrides || {},
      canonVistos: state.canonVistos || []
    };
  }

  // Aceita somente as chaves e os tipos esperados de um payload importado
  function sanitizeImported(imp) {
    if (!imp || typeof imp !== 'object' || Array.isArray(imp)) return null;
    const out = {};
    const isObj = o => !!o && typeof o === 'object' && !Array.isArray(o);
    ['cotacao', 'fretePct', 'taxaCartaoFixa'].forEach(k => {
      if (imp[k] !== undefined && isFinite(Number(imp[k]))) out[k] = Number(imp[k]);
    });
    if (['min', 'rec', 'max'].includes(imp.activeTier)) out.activeTier = imp.activeTier;
    if (isObj(imp.meuEstoque)) {
      out.meuEstoque = {};
      Object.keys(imp.meuEstoque).forEach(k => {
        const q = Math.floor(Number(imp.meuEstoque[k]));
        if (/^\d+$/.test(k) && q > 0) out.meuEstoque[k] = q;
      });
    }
    if (Array.isArray(imp.vendas)) {
      const num = x => Number(x) || 0;
      out.vendas = imp.vendas.filter(isObj).map(v => ({
        ...v,
        id: num(v.id),
        produtoId: num(v.produtoId),
        qtd: num(v.qtd),
        doseMg: num(v.doseMg),
        isDose: !!v.isDose,
        valorUnitario: num(v.valorUnitario),
        valorTotal: num(v.valorTotal),
        custoTotal: num(v.custoTotal),
        lucro: num(v.lucro),
        data: String(v.data || ''),
        produtoNome: String(v.produtoNome || ''),
        marca: String(v.marca || ''),
        formaPagamento: String(v.formaPagamento || ''),
        cliente: String(v.cliente || ''),
        telefone: String(v.telefone || ''),
        obs: String(v.obs || '')
      })).filter(v => v.id > 0);
    }
    if (Array.isArray(imp.pedidosTransito)) {
      out.pedidosTransito = imp.pedidosTransito.filter(isObj).map(p => ({
        ...p,
        id: String(p.id || '').replace(/[^\w-]/g, ''),
        itens: Array.isArray(p.itens) ? p.itens.filter(isObj) : []
      })).filter(p => p.id);
    }
    if (isObj(imp.frascosDoses)) {
      out.frascosDoses = {};
      Object.keys(imp.frascosDoses).forEach(k => {
        const f = imp.frascosDoses[k];
        if (/^\d+$/.test(k) && isObj(f)) {
          out.frascosDoses[k] = {
            mgRestante: Math.max(0, Number(f.mgRestante) || 0),
            totalAplicadasMg: Math.max(0, Number(f.totalAplicadasMg) || 0),
            perdaMg: Math.max(0, Number(f.perdaMg) || 0)
          };
        }
      });
    }
    if (isObj(imp.overrides)) out.overrides = imp.overrides;
    if (Array.isArray(imp.canonVistos)) out.canonVistos = imp.canonVistos.map(String);
    return out;
  }

  // Importação sempre pede confirmação e guarda o estado anterior para desfazer
  function applyImported(rawImported, origem) {
    const imp = sanitizeImported(rawImported);
    if (!imp || !Object.keys(imp).length) {
      alert('Dados de sincronização inválidos.');
      return false;
    }
    const current = localStorage.getItem(STORAGE_KEY);
    let cur = {};
    if (current) try { cur = JSON.parse(current) || {}; } catch (e) {}
    const soma = o => Object.values(o || {}).reduce((s, v) => s + (Number(v) || 0), 0);
    const msg = `Importar dados (${origem})?\n\n` +
      `NESTE APARELHO HOJE: ${soma(cur.meuEstoque)} un em estoque · ${(cur.vendas || []).length} vendas\n` +
      `DADOS RECEBIDOS: ${soma(imp.meuEstoque)} un em estoque · ${(imp.vendas || []).length} vendas\n\n` +
      `Os dados recebidos SUBSTITUEM os deste aparelho. Uma cópia do estado atual fica guardada para desfazer.`;
    if (!confirm(msg)) return false;
    if (current) {
      localStorage.setItem(BACKUP_KEY, JSON.stringify({ quando: new Date().toISOString(), estado: current }));
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...imp }));
    return true;
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        cotacao: state.cotacao,
        fretePct: state.fretePct,
        taxaCartaoFixa: state.taxaCartaoFixa,
        activeTier: state.activeTier,
        groupMargins: state.groupMargins,
        overrides: state.overrides,
        meuEstoque: state.meuEstoque,
        vendas: state.vendas || [],
        pedidosTransito: state.pedidosTransito || [],
        frascosDoses: state.frascosDoses || {},
        canonVistos: state.canonVistos || []
      }));
    } catch (e) {
      console.error('Erro ao salvar estado:', e);
      alert('⚠️ Não foi possível salvar os dados neste aparelho. Exporte um backup agora.');
    }
  }

  const rawCatalog = (window.SHAPETOTAL_RAW && window.SHAPETOTAL_RAW.productos) ? window.SHAPETOTAL_RAW.productos : [];

  function mapCategoryToGroupKey(cat) {
    const c = (cat || '').toLowerCase().trim();
    if (c === 'anabolizante') return 'anabolizante';
    if (c === 'emagrecedores' || c === 'queimador') return 'emagrecedores';
    if (c === 'saude mental') return 'saude_mental';
    if (c === 'peptideo' || c === 'hgh') return 'peptideo';
    if (c === 'estetico' || c === 'botox' || c === 'cosmetico' || c === 'anti acne') return 'estetico';
    if (c === 'sarms' || c === 'post ciclo' || c === 'hcg') return 'sarms_post';
    return 'potencia_outros';
  }

  function mapProductMainTab(p) {
    const c = (p.categoria || '').toLowerCase().trim();
    const txt = ((p.nombre || '') + ' ' + (p.composicion || '')).toLowerCase();
    if (c === 'anabolizante') return 'anabolizantes';
    if (c === 'emagrecedores' || c === 'queimador') return 'emagrecedores';
    if (c === 'saude mental' || txt.includes('semax') || txt.includes('selank') || txt.includes('cbl') || txt.includes('dsip')) return 'saude_mental';
    if (c === 'peptideo' || c === 'hgh') return 'peptideos';
    return 'outros';
  }

  function computeProduct(p) {
    const ov = state.overrides[p.id] || {};
    const usd = ov.usd !== undefined && ov.usd !== '' ? Number(ov.usd) : Number(p.precio || 0);
    const multCusto = state.cotacao * (1 + state.fretePct / 100);
    const custo = usd * multCusto;

    const gKey = mapCategoryToGroupKey(p.categoria);
    const gm = state.groupMargins[gKey] || DEFAULT_GROUP_MARGINS.potencia_outros;

    // Anabolizantes high-cost calibration when default rec is used
    let recPct = gm.rec;
    if (gKey === 'anabolizante' && gm.rec === 40) {
      if (custo >= 500) recPct = 32;
      else if (custo >= 300) recPct = 38;
    }

    const minPct = gm.min;
    const maxPct = gm.max;

    const precoMin = Math.ceil(custo * (1 + minPct / 100));
    let precoRec = Math.ceil(custo * (1 + recPct / 100));
    const isSpecialFixed = SPECIAL_FIXED_REC[p.id];
    if (isSpecialFixed) {
      precoRec = isSpecialFixed.rec;
    }
    const precoMax = Math.ceil(custo * (1 + maxPct / 100));

    const lucroMin = Math.max(0, precoMin - custo);
    const lucroRec = Math.max(0, precoRec - custo);
    const lucroMax = Math.max(0, precoMax - custo);

    const chosenTier = ov.tier || state.activeTier;
    let precoFinal = precoRec;
    let margemAplicada = recPct;

    if (chosenTier === 'min') {
      precoFinal = precoMin;
      margemAplicada = minPct;
    } else if (chosenTier === 'max') {
      precoFinal = precoMax;
      margemAplicada = maxPct;
    }

    if (ov.customMargin !== undefined && ov.customMargin !== '') {
      margemAplicada = Number(ov.customMargin);
      precoFinal = Math.ceil(custo * (1 + margemAplicada / 100));
    }
    if (ov.customPrice !== undefined && ov.customPrice !== '') {
      precoFinal = Number(ov.customPrice);
      margemAplicada = custo > 0 ? Math.round(((precoFinal - custo) / custo) * 100) : 0;
    }

    if (isSpecialFixed && (!ov.tier || ov.tier === 'rec') && !ov.customPrice && !ov.customMargin) {
      precoFinal = isSpecialFixed.rec;
      margemAplicada = custo > 0 ? Math.round(((precoFinal - custo) / custo) * 100) : 0;
    }
    const lucroFinal = precoFinal - custo;
    const precoCartao = (isSpecialFixed && (!ov.tier || ov.tier === 'rec') && !ov.customPrice)
      ? isSpecialFixed.cartao
      : precoFinal + state.taxaCartaoFixa;

    const cde = Number(p.stock_cde || 0);
    const pj = Number(p.stock_pj || 0);
    const sg = Number(p.stock_sg || 0);
    const stockTotal = cde + pj + sg;

    const desc = ov.desc !== undefined ? ov.desc : (p.desc_comercial || '');
    const localFoto = p.foto ? `fotos/producto-${p.id}.jpg` : '';
    const remoteFoto = p.foto ? `https://shapetotal.com${p.foto}` : '';

    return {
      ...p,
      usd,
      custo,
      minPct,
      recPct,
      maxPct,
      precoMin,
      precoRec,
      precoMax,
      lucroMin,
      lucroRec,
      lucroMax,
      chosenTier,
      precoFinal,
      precoCartao,
      lucroFinal,
      margemAplicada,
      cde,
      pj,
      sg,
      stockTotal,
      desc,
      localFoto,
      remoteFoto,
      hasCustom: Boolean(ov.customPrice || ov.customMargin || ov.usd || ov.tier)
    };
  }

  function formatBRL(v) {
    return 'R$ ' + Number(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatBRLInt(v) {
    return 'R$ ' + Number(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const GYM_SYNONYMS = {
    'dura': ['dura', 'durateston', 'sustanon', 'sustan', 'testoviron'],
    'durateston': ['dura', 'durateston', 'sustanon', 'sustan'],
    'deca': ['deca', 'durabolin', 'nandrolona', 'nandrolone'],
    'enan': ['enan', 'enantato', 'enanthate', 'testoviron'],
    'enantato': ['enan', 'enantato', 'enanthate'],
    'cipio': ['cipio', 'cipionato', 'cypionate'],
    'cipionato': ['cipio', 'cipionato', 'cypionate'],
    'propi': ['propi', 'propionato', 'propionate'],
    'propionato': ['propi', 'propionato', 'propionate'],
    'stano': ['stano', 'stanozolol', 'stanazol', 'winstrol', 'rexogin', 'stromba'],
    'winstrol': ['stano', 'stanozolol', 'stanazol', 'winstrol', 'rexogin'],
    'trembo': ['trembo', 'trembolona', 'trenbolone', 'tri-tren', 'parabolan', 'tren'],
    'tren': ['trembo', 'trembolona', 'trenbolone', 'tri-tren', 'parabolan', 'tren'],
    'trembolona': ['trembo', 'trembolona', 'trenbolone', 'parabolan'],
    'diana': ['diana', 'dianabol', 'metandienona', 'methandienone', 'metandrostenolona'],
    'dianabol': ['diana', 'dianabol', 'metandienona'],
    'hemo': ['hemo', 'hemogenin', 'oximetolona', 'oxymetholone', 'anadrol'],
    'hemogenin': ['hemo', 'hemogenin', 'oximetolona', 'anadrol'],
    'oxan': ['oxan', 'oxandrolona', 'oxandrolone', 'anavar'],
    'oxandrolona': ['oxan', 'oxandrolona', 'oxandrolone', 'anavar'],
    'primo': ['primo', 'primobolan', 'metenolona', 'methenolone'],
    'primobolan': ['primo', 'primobolan', 'metenolona'],
    'mast': ['mast', 'masteron', 'drostanolona', 'drostanolone'],
    'masteron': ['mast', 'masteron', 'drostanolona'],
    'clembu': ['clembu', 'clembuterol', 'clenbuterol', 'lavizoo', 'pulmonil'],
    'clenbuterol': ['clembu', 'clembuterol', 'clenbuterol'],
    'mounjaro': ['mounjaro', 'tirzepatida', 'tirzepatide', 'tirzec', 'lipoless', 'lipoland'],
    'tirzepatida': ['mounjaro', 'tirzepatida', 'tirzepatide', 'tirzec', 'lipoless'],
    'ozempic': ['ozempic', 'semaglutida', 'semaglutide', 'wegovy'],
    'wegovy': ['ozempic', 'semaglutida', 'semaglutide', 'wegovy'],
    'semaglutida': ['ozempic', 'semaglutida', 'semaglutide'],
    'reta': ['reta', 'retatrutida', 'retatrutide'],
    'retatrutida': ['reta', 'retatrutida', 'retatrutide'],
    'gh': ['gh', 'hgh', 'somatropina', 'somatropin', 'norditropin'],
    'bpc': ['bpc', 'bpc-157', 'bpc157'],
    'tadalafila': ['tadalafila', 'tadalafil', 'cialis'],
    'cialis': ['tadalafila', 'tadalafil', 'cialis']
  };

  function getFilteredProducts() {
    const q = state.search.trim().toLowerCase();
    let list = rawCatalog.map(computeProduct);

    list = list.filter(p => {
      if (state.mainGroup !== 'todas') {
        if (state.mainGroup === 'meu_estoque') {
          const meuQtd = (state.meuEstoque || {})[p.id] || 0;
          if (meuQtd <= 0) return false;
        } else if (p.colecao_id) {
          if (state.mainGroup === 'anabolizantes' && p.colecao_id !== '2_anabolizantes') return false;
          if (state.mainGroup === 'emagrecedores' && p.colecao_id !== '1_emagrecedores') return false;
          if (state.mainGroup === 'peptideos' && p.colecao_id !== '3_hgh_peptideos') return false;
          if (state.mainGroup === 'estetico_outros' && p.colecao_id !== '4_estetica') return false;
          if (state.mainGroup === 'saude_mental' && p.colecao_id !== '5_saude_mental_suporte') return false;
        } else {
          const c = (p.categoria || '').toLowerCase();
          const txt = ((p.nombre || '') + ' ' + (p.composicion || '')).toLowerCase();
          if (state.mainGroup === 'anabolizantes' && !(c === 'anabolizante' || c === 'sarms' || c === 'post ciclo' || c === 'hcg')) return false;
          if (state.mainGroup === 'emagrecedores' && !(c === 'emagrecedores' || c === 'queimador')) return false;
          if (state.mainGroup === 'saude_mental' && !(c === 'saude mental' || txt.includes('semax') || txt.includes('selank') || txt.includes('cbl') || txt.includes('dsip'))) return false;
          if (state.mainGroup === 'peptideos' && !(c === 'peptideo' || c === 'hgh' || Boolean(p.desc_comercial))) return false;
          if (state.mainGroup === 'estetico_outros' && (c === 'anabolizante' || c === 'emagrecedores' || c === 'peptideo' || c === 'hgh' || c === 'saude mental')) return false;
        }
      }

      if (state.mainGroup !== 'meu_estoque') {
        if (state.subCat !== 'todas' && (p.categoria || 'sem_categoria') !== state.subCat) return false;
        if (state.brand !== 'todas' && (p.marca || 'sem_marca') !== state.brand) return false;
        if (state.stockFilter === 'com_estoque' && p.stockTotal <= 0) return false;
        if (state.stockFilter === 'sem_estoque' && p.stockTotal > 0) return false;

        if (state.branchFilter === 'cde' && p.cde <= 0) return false;
        if (state.branchFilter === 'pj' && p.pj <= 0) return false;
        if (state.branchFilter === 'sg' && p.sg <= 0) return false;
      }

      if (q) {
        const hay = `${p.id} shape-${p.id} ${p.nombre || ''} ${p.marca || ''} ${p.composicion || ''} ${p.categoria || ''} ${p.desc || ''}`.toLowerCase();
        const tokens = q.split(/\s+/).filter(Boolean);
        for (const t of tokens) {
          const syns = GYM_SYNONYMS[t] || [t];
          const matched = syns.some(s => hay.includes(s));
          if (!matched) return false;
        }
      }
      return true;
    });

    list.sort((a, b) => {
      if (state.sortBy === 'estoque_desc') return b.stockTotal - a.stockTotal;
      if (state.sortBy === 'preco_asc') return a.precoFinal - b.precoFinal;
      if (state.sortBy === 'preco_desc') return b.precoFinal - a.precoFinal;
      if (state.sortBy === 'lucro_desc') return b.lucroFinal - a.lucroFinal;
      if (state.sortBy === 'nome_asc') return (a.nombre || '').localeCompare(b.nombre || '');
      return b.stockTotal - a.stockTotal;
    });

    return list;
  }

  function renderMarginDrawer() {
    const container = document.getElementById('marginConfigGrid');
    if (!container) return;
    container.innerHTML = Object.entries(state.groupMargins).map(([key, g]) => `
      <div class="group-margin-card">
        <div class="group-margin-title">
          <span>${g.label}</span>
        </div>
        <div class="margin-inputs">
          <div class="m-field">
            <label>🟢 Mínimo (%)</label>
            <input type="number" step="1" data-gkey="${key}" data-tier="min" value="${g.min}">
          </div>
          <div class="m-field">
            <label>🎯 Recomendado (%)</label>
            <input type="number" step="1" data-gkey="${key}" data-tier="rec" value="${g.rec}">
          </div>
          <div class="m-field">
            <label>🔥 Máximo (%)</label>
            <input type="number" step="1" data-gkey="${key}" data-tier="max" value="${g.max}">
          </div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('input[data-gkey]').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const k = e.target.getAttribute('data-gkey');
        const t = e.target.getAttribute('data-tier');
        state.groupMargins[k][t] = Number(e.target.value) || 0;
        saveState();
        renderAll();
      });
    });
  }

  function populateDropdowns() {
    const subSelect = document.getElementById('subCatSelect');
    const brandSelect = document.getElementById('brandSelect');
    const cats = {};
    const brands = {};
    rawCatalog.forEach(p => {
      const c = p.categoria || 'sem_categoria';
      const b = p.marca || 'sem_marca';
      cats[c] = (cats[c] || 0) + 1;
      brands[b] = (brands[b] || 0) + 1;
    });

    subSelect.innerHTML = `<option value="todas">📂 Subcategoria: Todas (${rawCatalog.length})</option>` +
      Object.entries(cats).sort((a, b) => b[1] - a[1]).map(([c, cnt]) =>
        `<option value="${c}">${c.toUpperCase()} (${cnt})</option>`
      ).join('');

    brandSelect.innerHTML = `<option value="todas">🏷️ Laboratório: Todos (${Object.keys(brands).length})</option>` +
      Object.entries(brands).sort((a, b) => b[1] - a[1]).map(([b, cnt]) =>
        `<option value="${b}">${b.toUpperCase()} (${cnt})</option>`
      ).join('');
  }

  function renderKPIs(filtered) {
    const totalMeuEstoqueCount = Object.values(state.meuEstoque || {}).reduce((a, b) => a + (Number(b) || 0), 0);
    const badgeMeuEstoque = document.getElementById('countMeuEstoque');
    if (badgeMeuEstoque) badgeMeuEstoque.textContent = totalMeuEstoqueCount;

    const badgeVendas = document.getElementById('countVendasBadge');
    if (badgeVendas) badgeVendas.textContent = (state.vendas || []).length;

    const pedidosTransito = (state.pedidosTransito || []).filter(p => p.status === 'em_transito');
    const totalItensTransito = pedidosTransito.reduce((acc, ped) => {
      return acc + (ped.itens || []).reduce((s, it) => s + (Number(it.qtd) || 0), 0);
    }, 0);
    const badgeTransito = document.getElementById('countTransitoBadge');
    if (badgeTransito) badgeTransito.textContent = totalItensTransito;

    const bhPanel = document.getElementById('bhExecutivePanel');
    const pyFilters = ['subCatSelect', 'brandSelect', 'stockSelect', 'branchSelect'];

    if (state.mainGroup === 'meu_estoque') {
      if (bhPanel) bhPanel.style.display = 'block';
      pyFilters.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
      });

      const totalItens = filtered.reduce((s, p) => s + ((state.meuEstoque || {})[p.id] || 0), 0);
      const totalCusto = filtered.reduce((s, p) => s + (p.custo * ((state.meuEstoque || {})[p.id] || 0)), 0);
      const totalVenda = filtered.reduce((s, p) => s + (p.precoFinal * ((state.meuEstoque || {})[p.id] || 0)), 0);
      const totalCartao = filtered.reduce((s, p) => s + (p.precoCartao * ((state.meuEstoque || {})[p.id] || 0)), 0);
      const totalLucro = filtered.reduce((s, p) => s + (p.lucroFinal * ((state.meuEstoque || {})[p.id] || 0)), 0);

      let transitoInvestido = 0;
      let transitoVendaPix = 0;
      pedidosTransito.forEach(ped => {
        transitoInvestido += Number(ped.custo_total_reais || 0);
        (ped.itens || []).forEach(it => {
          transitoVendaPix += Number(it.preco_venda_pix || 900) * Number(it.qtd || 0);
        });
      });
      const transitoLucro = transitoVendaPix - transitoInvestido;

      const vendas = state.vendas || [];
      const vendasFaturado = vendas.reduce((s, v) => s + (Number(v.valorTotal) || 0), 0);
      const vendasLucro = vendas.reduce((s, v) => s + (Number(v.lucro) || 0), 0);

      if (document.getElementById('bhPanelEmMaosValor')) {
        document.getElementById('bhPanelEmMaosValor').textContent = `${formatBRL(totalVenda)} (PIX)`;
        document.getElementById('bhPanelEmMaosSub').textContent = `${totalItens} un · Cartão: ${formatBRL(totalCartao)}`;
        document.getElementById('bhPanelTransitoValor').textContent = `${formatBRL(transitoVendaPix)} (PIX)`;
        document.getElementById('bhPanelTransitoSub').textContent = `${totalItensTransito} un · Pago: ${formatBRL(transitoInvestido)}`;
        document.getElementById('bhPanelVendasValor').textContent = formatBRL(vendasFaturado);
        document.getElementById('bhPanelVendasSub').textContent = `${vendas.length} vendas · Lucro: +${formatBRL(vendasLucro)}`;
        document.getElementById('bhPanelTotalPotencial').textContent = formatBRL(totalVenda + transitoVendaPix);
        document.getElementById('bhPanelTotalLucro').textContent = `${totalItens + totalItensTransito} unidades · Lucro Previsto: +${formatBRL(totalLucro + transitoLucro)}`;
      }

      renderDosesFrascos();

      document.getElementById('kpiCount').textContent = `${totalItens} unidades`;
      document.getElementById('kpiCountSub').textContent = `${filtered.length} SKUs em mãos (Pronta Entrega)`;
      document.getElementById('kpiMult').textContent = formatBRL(totalCusto);
      document.getElementById('kpiMultSub').textContent = `Capital Investido no Estoque`;
      document.getElementById('kpiAvgPrice').textContent = formatBRL(totalVenda);
      document.getElementById('kpiAvgCost').textContent = `Faturamento Previsto (PIX)`;
      document.getElementById('kpiAvgProfit').textContent = formatBRL(totalLucro);
      document.getElementById('kpiAvgProfitSub').textContent = `Lucro Líquido Projetado no Bolso`;
      return;
    }

    if (bhPanel) bhPanel.style.display = 'none';
    pyFilters.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = '';
    });

    const withStock = filtered.filter(p => p.stockTotal > 0);
    const avgCost = withStock.length ? withStock.reduce((s, p) => s + p.custo, 0) / withStock.length : 0;
    const avgPrice = withStock.length ? withStock.reduce((s, p) => s + p.precoFinal, 0) / withStock.length : 0;
    const avgProfit = withStock.length ? withStock.reduce((s, p) => s + p.lucroFinal, 0) / withStock.length : 0;
    const mult = (state.cotacao * (1 + state.fretePct / 100)).toFixed(2);

    document.getElementById('kpiCount').textContent = `${filtered.length} SKUs`;
    document.getElementById('kpiCountSub').textContent = `${withStock.length} com estoque imediato`;
    document.getElementById('kpiMult').textContent = `R$ ${mult}`;
    document.getElementById('kpiMultSub').textContent = `Dólar R$ ${state.cotacao.toFixed(2)} + ${state.fretePct}% frete`;
    document.getElementById('kpiAvgPrice').textContent = formatBRL(avgPrice);
    document.getElementById('kpiAvgCost').textContent = `Custo médio: ${formatBRL(avgCost)}`;
    document.getElementById('kpiAvgProfit').textContent = formatBRL(avgProfit);
    document.getElementById('kpiAvgProfitSub').textContent = `Faixa ativa: ${state.activeTier === 'min' ? 'Mínimo' : state.activeTier === 'rec' ? 'Recomendado' : 'Máximo'}`;
  }

  function renderProducts(filtered) {
    const container = document.getElementById('productsContainer');
    if (!filtered.length) {
      container.innerHTML = `<div style="padding:40px;text-align:center;color:var(--text-muted);background:var(--bg-card);border-radius:12px;">Nenhum produto encontrado para este filtro.</div>`;
      return;
    }

    if (state.viewMode === 'grid') {
      container.className = 'product-grid';
      container.innerHTML = filtered.map(p => {
        const imgHtml = p.localFoto
          ? `<img src="${p.localFoto}" loading="lazy" alt="${p.nombre}" onerror="if(this.src!=='${p.remoteFoto}'){this.src='${p.remoteFoto}';}else{this.parentElement.innerHTML='<div class=\\'p-placeholder\\'>🧬<br><small>${p.marca || 'SHAPE'}</small></div>';}">`
          : `<div class="p-placeholder"><span style="font-size:28px;">💊</span><small style="margin-top:6px;">${(p.marca || 'SHAPE TOTAL').toUpperCase()}</small></div>`;

        return `
          <div class="p-card ${p.stockTotal <= 0 ? 'no-stock' : ''}" data-id="${p.id}">
            <div class="p-media" onclick="window.CRM.openEditModal(${p.id})">
              ${imgHtml}
              <div class="p-badges">
                <span class="badge badge-cat">${p.categoria || 'geral'}</span>
                <span class="badge ${p.stockTotal > 0 ? 'badge-stock-ok' : 'badge-stock-zero'}">
                  ${p.stockTotal > 0 ? `EST: ${p.stockTotal}` : 'SEM ESTOQUE'}
                </span>
              </div>
            </div>
            <div class="p-body">
              <div class="p-meta">
                <span class="p-sku">SHAPE-${p.id}</span>
                <span class="p-brand">${p.marca || 'S/ MARCA'}</span>
              </div>
              <div class="p-title">${p.nombre}</div>
              ${p.composicion ? `<div class="p-comp">🧪 ${p.composicion}</div>` : ''}
              ${p.desc ? `<div class="p-desc">${p.desc}</div>` : ''}
              <div class="p-stock-branches">
                <span class="branch-pill">CDE: <b>${p.cde}</b></span>
                <span class="branch-pill">PJ: <b>${p.pj}</b></span>
                <span class="branch-pill">SG: <b>${p.sg}</b></span>
                ${p.presentacion ? `<span class="branch-pill">${p.presentacion}</span>` : ''}
              </div>

              <div class="p-cost-bar internal-only">
                <span>Fonte: <b>USD ${p.usd.toFixed(2)}</b></span>
                <span>Custo Total: <b style="color:#f8fafc">${formatBRL(p.custo)}</b></span>
              </div>

              <div class="tiers-box internal-only">
                <div class="tier-pill ${p.chosenTier === 'min' && !p.hasCustom ? 'selected-min' : ''}" onclick="window.CRM.setProductTier(${p.id}, 'min')">
                  <div class="t-name">Mín (${p.minPct}%)</div>
                  <div class="t-price">${formatBRLInt(p.precoMin)}</div>
                  <div class="t-profit">+${formatBRLInt(p.lucroMin)}</div>
                </div>
                <div class="tier-pill ${p.chosenTier === 'rec' && !p.hasCustom ? 'selected-rec' : ''}" onclick="window.CRM.setProductTier(${p.id}, 'rec')">
                  <div class="t-name">Ideal (${p.recPct}%)</div>
                  <div class="t-price">${formatBRLInt(p.precoRec)}</div>
                  <div class="t-profit">+${formatBRLInt(p.lucroRec)}</div>
                </div>
                <div class="tier-pill ${p.chosenTier === 'max' && !p.hasCustom ? 'selected-max' : ''}" onclick="window.CRM.setProductTier(${p.id}, 'max')">
                  <div class="t-name">Máx (${p.maxPct}%)</div>
                  <div class="t-price">${formatBRLInt(p.precoMax)}</div>
                  <div class="t-profit">+${formatBRLInt(p.lucroMax)}</div>
                </div>
              </div>

              <div class="p-price-hero">
                <div>
                  <div class="final-label">Preço Final PIX ${p.hasCustom ? '✏️' : ''}</div>
                  <div class="card-val">Cartão: ${formatBRLInt(p.precoCartao)}</div>
                </div>
                <div style="text-align:right">
                  <div class="final-val">${formatBRLInt(p.precoFinal)}</div>
                  <div class="t-profit internal-only">Lucro Líq: ${formatBRL(p.lucroFinal)} (${p.margemAplicada}%)</div>
                </div>
              </div>

              <div class="meu-estoque-box internal-only" style="margin:8px 0; padding:6px 10px; background:#0f172a; border-radius:8px; border:1px solid ${((state.meuEstoque || {})[p.id] || 0) > 0 ? '#10b981' : '#334155'}; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:11px; font-weight:700; color:${((state.meuEstoque || {})[p.id] || 0) > 0 ? '#34d399' : '#94a3b8'};">📦 Meu Estoque BH:</span>
                <div style="display:flex; align-items:center; gap:6px;">
                  <button class="btn" style="padding:2px 8px; font-size:12px; height:24px; min-width:24px;" onclick="window.CRM.changeMeuEstoque(${p.id}, -1)">-</button>
                  <b style="font-size:13px; color:${((state.meuEstoque || {})[p.id] || 0) > 0 ? '#34d399' : '#ffffff'}; min-width:24px; text-align:center;">${((state.meuEstoque || {})[p.id] || 0)}</b>
                  <button class="btn" style="padding:2px 8px; font-size:12px; height:24px; min-width:24px;" onclick="window.CRM.changeMeuEstoque(${p.id}, 1)">+</button>
                </div>
              </div>

              ${((state.meuEstoque || {})[p.id] || 0) > 0 ? `
                <button class="btn btn-green internal-only" style="width:100%; margin:4px 0 8px 0; background:#059669; color:#fff; font-weight:800; padding:7px 10px; border-radius:6px; font-size:12px; display:flex; align-items:center; justify-content:center; gap:6px; border:1px solid #34d399;" onclick="window.CRM.openSaleModal(${p.id})">
                  💰 Dar Baixa / Registrar Venda
                </button>
              ` : ''}

              <div class="p-actions">
                <button class="btn btn-primary" onclick="window.CRM.addToCart(${p.id})">➕ Orçamento</button>
                <button class="btn" onclick="window.CRM.copySingleWhatsApp(${p.id})">📲 Copiar Linha</button>
                <button class="btn internal-only" title="Editar preço/descrição" onclick="window.CRM.openEditModal(${p.id})">✏️</button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    } else {
      container.className = 'table-wrap';
      container.innerHTML = `
        <table class="crm-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>SKU</th>
              <th>Produto / Composição</th>
              <th>Marca / Cat</th>
              <th>Estoque Fornecedor</th>
              <th class="internal-only">Meu Estoque BH</th>
              <th class="internal-only">USD</th>
              <th class="internal-only">Custo R$</th>
              <th class="internal-only">Mínimo</th>
              <th class="internal-only">Recomendado</th>
              <th class="internal-only">Máximo</th>
              <th>Venda PIX</th>
              <th class="internal-only">Lucro R$</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(p => `
              <tr>
                <td>
                  ${p.localFoto ? `<img class="tbl-thumb" src="${p.localFoto}" onerror="this.src='${p.remoteFoto}'" onclick="window.CRM.openEditModal(${p.id})">` : '💊'}
                </td>
                <td class="p-sku">SHAPE-${p.id}</td>
                <td>
                  <div style="font-weight:700;color:#fff">${p.nombre}</div>
                  <div style="font-size:11px;color:#38bdf8">${p.composicion || ''}</div>
                  ${p.desc ? `<div style="font-size:11px;color:var(--text-muted)">${p.desc}</div>` : ''}
                </td>
                <td>
                  <div style="font-weight:700;text-transform:uppercase">${p.marca || '-'}</div>
                  <div style="font-size:11px;color:var(--text-muted)">${p.categoria || '-'}</div>
                </td>
                <td>
                  <b style="color:${p.stockTotal > 0 ? '#34d399' : '#f87171'}">${p.stockTotal}</b>
                  <div style="font-size:10px;color:var(--text-muted)">${p.cde}/${p.pj}/${p.sg}</div>
                </td>
                <td class="internal-only" style="text-align:center;">
                  <div style="display:inline-flex; align-items:center; gap:4px;">
                    <button class="btn" style="padding:1px 6px; font-size:11px; height:22px;" onclick="window.CRM.changeMeuEstoque(${p.id}, -1)">-</button>
                    <b style="color:${((state.meuEstoque || {})[p.id] || 0) > 0 ? '#34d399' : '#94a3b8'}; min-width:20px;">${((state.meuEstoque || {})[p.id] || 0)}</b>
                    <button class="btn" style="padding:1px 6px; font-size:11px; height:22px;" onclick="window.CRM.changeMeuEstoque(${p.id}, 1)">+</button>
                  </div>
                </td>
                <td class="internal-only">$${p.usd.toFixed(2)}</td>
                <td class="internal-only">${formatBRL(p.custo)}</td>
                <td class="internal-only">
                  <b>${formatBRLInt(p.precoMin)}</b>
                  <div style="font-size:10px;color:#34d399">+${formatBRLInt(p.lucroMin)} (${p.minPct}%)</div>
                </td>
                <td class="internal-only" style="background:rgba(16,185,129,0.08)">
                  <b style="color:#10b981">${formatBRLInt(p.precoRec)}</b>
                  <div style="font-size:10px;color:#34d399">+${formatBRLInt(p.lucroRec)} (${p.recPct}%)</div>
                </td>
                <td class="internal-only">
                  <b>${formatBRLInt(p.precoMax)}</b>
                  <div style="font-size:10px;color:#34d399">+${formatBRLInt(p.lucroMax)} (${p.maxPct}%)</div>
                </td>
                <td><b style="font-size:14px;color:var(--accent)">${formatBRLInt(p.precoFinal)}</b></td>
                <td class="internal-only" style="color:#34d399;font-weight:700">${formatBRL(p.lucroFinal)} (${p.margemAplicada}%)</td>
                <td>
                  <div style="display:flex;gap:4px">
                    ${((state.meuEstoque || {})[p.id] || 0) > 0 ? `<button class="btn btn-green internal-only" style="background:#059669; color:#fff; font-weight:800;" title="Dar Baixa / Registrar Venda" onclick="window.CRM.openSaleModal(${p.id})">💰</button>` : ''}
                    <button class="btn btn-primary" onclick="window.CRM.addToCart(${p.id})">➕</button>
                    <button class="btn" onclick="window.CRM.copySingleWhatsApp(${p.id})">📲</button>
                    <button class="btn internal-only" onclick="window.CRM.openEditModal(${p.id})">✏️</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }
  }

  function renderCartBar() {
    const bar = document.getElementById('cartFloatingBar');
    const entries = Object.entries(state.cart).filter(([, q]) => q > 0);
    if (!entries.length) {
      bar.classList.remove('has-items');
      return;
    }
    let totalItems = 0;
    let totalVenda = 0;
    let totalLucro = 0;
    entries.forEach(([id, qty]) => {
      const raw = rawCatalog.find(x => String(x.id) === String(id));
      if (raw) {
        const cp = computeProduct(raw);
        totalItems += qty;
        totalVenda += cp.precoFinal * qty;
        totalLucro += cp.lucroFinal * qty;
      }
    });
    bar.classList.add('has-items');
    bar.innerHTML = `🛒 Orçamento: ${totalItems} iten(s) | Total PIX: ${formatBRLInt(totalVenda)} <span class="internal-only" style="font-size:11px;background:rgba(0,0,0,0.25);padding:3px 8px;border-radius:99px;">Lucro: ${formatBRL(totalLucro)}</span>`;
  }

  function renderDosesFrascos() {
    const container = document.getElementById('dosesFrascosContainer');
    if (!container) return;

    const ids = [9006, 9005];
    container.innerHTML = ids.map(id => {
      const conf = TABELA_DOSES_OFICIAIS[id];
      if (!conf) return '';
      const doseState = (state.frascosDoses && state.frascosDoses[id]) || { mgRestante: 120, totalAplicadasMg: 0 };
      const mgRest = Math.max(0, Number(doseState.mgRestante || 0));
      const totalMg = conf.totalMg || 120;
      const pct = Math.min(100, Math.max(0, Math.round((mgRest / totalMg) * 100)));
      const estoqueFechados = Number((state.meuEstoque || {})[id] || 0);

      // Cor da barra de progresso
      let barColor = '#10b981';
      if (pct <= 20) barColor = '#ef4444';
      else if (pct <= 50) barColor = '#f59e0b';

      return `
        <div style="background:#090d16; border:1px solid #1e293b; border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:8px;">
              <div style="display:flex; gap:10px; align-items:center;">
                <img src="${conf.fotoTabela}" style="width:48px; height:48px; object-fit:cover; border-radius:6px; border:1px solid #38bdf8; cursor:pointer;" title="Clique para ver a tabela oficial ampliada" onclick="window.CRM.openDoseImageModal(${id})" />
                <div>
                  <div style="font-size:13px; font-weight:800; color:#f8fafc;">${conf.nome}</div>
                  <div style="font-size:11px; color:#38bdf8; font-weight:700;">${conf.marca} · Solução Injetável em Frasco 120 mg</div>
                </div>
              </div>
              <span style="font-size:10px; background:#1e293b; color:#94a3b8; padding:3px 6px; border-radius:4px; font-weight:700; white-space:nowrap;">
                ${estoqueFechados} frasco(s) reserva
              </span>
            </div>

            <!-- Barra de Progresso do Frasco em Uso -->
            <div style="background:#0f172a; border-radius:6px; padding:8px 10px; border:1px solid #1e293b; margin-bottom:10px;">
              <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
                <span style="color:#94a3b8; font-weight:700;">🧪 Frasco em Uso:</span>
                <b style="color:${barColor}; font-weight:800;">${mgRest} mg restantes (${pct}%)</b>
              </div>
              <div style="width:100%; height:7px; background:#1e293b; border-radius:4px; overflow:hidden;">
                <div style="width:${pct}%; height:100%; background:${barColor}; transition:width 0.3s;"></div>
              </div>
            </div>

            <!-- Botões de Aplicação / Venda de Dose Rápida -->
            <div style="font-size:11px; color:#cbd5e1; font-weight:700; margin-bottom:6px;">💉 Baixa Rápida de Dose Aplicada:</div>
            <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:10px;">
              ${conf.doses.map(d => `
                <button class="btn btn-green" style="background:#065f46; color:#fff; font-size:11px; font-weight:800; padding:6px 10px; border:1px solid #10b981;" onclick="window.CRM.openDoseSaleModal(${id}, ${d.mg}, ${d.preco})">
                  💉 ${d.label} (R$ ${d.preco})
                </button>
              `).join('')}
              <button class="btn" style="background:#1e293b; font-size:11px; color:#38bdf8; padding:6px 10px;" onclick="window.CRM.openDoseSaleModal(${id}, 'custom')">
                ⚙️ Outra Dose
              </button>
            </div>
          </div>

          <!-- Ações do Frasco -->
          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #1e293b; padding-top:8px; margin-top:4px;">
            <button class="btn" style="font-size:11px; color:#38bdf8; padding:4px 8px;" onclick="window.CRM.openDoseImageModal(${id})">
              🔍 Ver Tabela Oficial
            </button>
            <div style="display:flex; gap:6px;">
              <button class="btn" style="font-size:10px; color:#fbbf24; background:#1e293b; padding:4px 8px;" title="Resetar ou abrir outro frasco de 120mg" onclick="window.CRM.abrirNovoFrascoDose(${id})">
                🔄 Abrir Novo Frasco
              </button>
              <button class="btn btn-amber" style="font-size:10px; font-weight:700; padding:4px 8px;" onclick="window.CRM.openWhatsAppCatalogModal('tabela_doses_avulsas')">
                📲 Tabela WhatsApp
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderAll() {
    const filtered = getFilteredProducts();
    renderKPIs(filtered);
    renderProducts(filtered);
    renderCartBar();
  }

  // Public actions
  window.CRM = {

    checkPassword() {
      const input = document.getElementById('authInput');
      const err = document.getElementById('authError');
      const val = (input.value || '').trim();
      const customPass = localStorage.getItem('ST_CUSTOM_PASS');
      const validPasses = ['shape2026', '1020', 'italo2026'];
      if (customPass) validPasses.push(customPass);

      if (validPasses.includes(val)) {
        localStorage.setItem('ST_AUTH', 'true');
        sessionStorage.setItem('ST_AUTH', 'true');
        document.getElementById('authOverlay').style.display = 'none';
        err.style.display = 'none';
        input.value = '';
        showToast('Acesso liberado com sucesso!');
      } else {
        err.style.display = 'block';
        input.select();
      }
    },

    lockApp() {
      localStorage.removeItem('ST_AUTH');
      sessionStorage.removeItem('ST_AUTH');
      const overlay = document.getElementById('authOverlay');
      if (overlay) {
        overlay.style.display = 'flex';
        const inp = document.getElementById('authInput');
        if (inp) { inp.value = ''; inp.focus(); }
      }
      showToast('Catálogo bloqueado!');
    },

    setProductTier(id, tier) {
      if (!state.overrides[id]) state.overrides[id] = {};
      state.overrides[id].tier = tier;
      delete state.overrides[id].customPrice;
      delete state.overrides[id].customMargin;
      saveState();
      renderAll();
    },

    copySingleWhatsApp(id) {
      const raw = rawCatalog.find(x => x.id === id);
      if (!raw) return;
      const p = computeProduct(raw);
      const line = p.desc
        ? `• *${p.nombre}*: ${p.desc} ➔ *${formatBRLInt(p.precoFinal)}*`
        : `• *${p.nombre}* (${(p.marca || '').toUpperCase()})${p.composicion ? ' - ' + p.composicion : ''} ➔ *${formatBRLInt(p.precoFinal)}*`;
      navigator.clipboard.writeText(line);
      showToast('Linha copiada para o WhatsApp!');
    },

    addToCart(id) {
      state.cart[id] = (state.cart[id] || 0) + 1;
      renderCartBar();
      showToast('Adicionado ao orçamento!');
    },

    openEditModal(id) {
      const raw = rawCatalog.find(x => x.id === id);
      if (!raw) return;
      const p = computeProduct(raw);
      const ov = state.overrides[id] || {};
      const modal = document.getElementById('editProductModal');
      document.getElementById('editModalTitle').textContent = `SHAPE-${p.id} · ${p.nombre}`;
      document.getElementById('editProdId').value = p.id;
      document.getElementById('editProdUsd').value = p.usd;
      document.getElementById('editProdMargin').value = ov.customMargin !== undefined ? ov.customMargin : '';
      document.getElementById('editProdPrice').value = ov.customPrice !== undefined ? ov.customPrice : '';
      document.getElementById('editProdDesc').value = p.desc || '';
      document.getElementById('editModalSummary').innerHTML = `
        Custo calculado: <b>${formatBRL(p.custo)}</b> |
        Mín (${p.minPct}%): <b>${formatBRLInt(p.precoMin)}</b> |
        Ideal (${p.recPct}%): <b>${formatBRLInt(p.precoRec)}</b> |
        Máx (${p.maxPct}%): <b>${formatBRLInt(p.precoMax)}</b>
      `;
      modal.classList.add('open');
    },

    saveProductModal() {
      const id = Number(document.getElementById('editProdId').value);
      if (!state.overrides[id]) state.overrides[id] = {};
      const usdVal = document.getElementById('editProdUsd').value;
      const mVal = document.getElementById('editProdMargin').value;
      const pVal = document.getElementById('editProdPrice').value;
      const dVal = document.getElementById('editProdDesc').value;

      state.overrides[id].usd = usdVal !== '' ? Number(usdVal) : undefined;
      state.overrides[id].customMargin = mVal !== '' ? Number(mVal) : '';
      state.overrides[id].customPrice = pVal !== '' ? Number(pVal) : '';
      state.overrides[id].desc = dVal;

      saveState();
      document.getElementById('editProductModal').classList.remove('open');
      renderAll();
      showToast('Produto atualizado!');
    },

    resetProductOverride() {
      const id = Number(document.getElementById('editProdId').value);
      delete state.overrides[id];
      saveState();
      document.getElementById('editProductModal').classList.remove('open');
      renderAll();
      showToast('Restaurado para a regra do grupo!');
    },

    changeMeuEstoque(id, delta) {
      if (!state.meuEstoque) state.meuEstoque = {};
      const current = Number(state.meuEstoque[id] || 0);
      const next = Math.max(0, current + delta);
      if (next === 0) {
        delete state.meuEstoque[id];
      } else {
        state.meuEstoque[id] = next;
      }
      saveState();
      renderAll();
      showToast(next > 0 ? `Estoque BH: ${next} un` : `Removido do estoque BH`);
    },

    resetEstoqueBase() {
      if (confirm('Deseja restaurar o estoque físico para a contagem canônica de 27 itens em BH?')) {
        state.meuEstoque = JSON.parse(JSON.stringify(ESTOQUE_CANONICO_BH));
        saveState();
        renderAll();
        showToast('Estoque BH restaurado para 27 unidades!');
      }
    },

    openDoseSaleModal(productId, doseMg, dosePreco) {
      const modal = document.getElementById('saleModal');
      const selectContainer = document.getElementById('saleProdSelectContainer');
      selectContainer.style.display = 'none';

      window.CRM.setSaleModalData(productId);

      const isDoseInput = document.getElementById('saleIsDose');
      const doseMgInput = document.getElementById('saleDoseMg');

      if (doseMg === 'custom') {
        window.CRM.selectSaleMode('custom', productId);
      } else {
        window.CRM.selectSaleDose(productId, doseMg, dosePreco);
      }

      modal.classList.add('open');
    },

    openDoseImageModal(productId) {
      const conf = TABELA_DOSES_OFICIAIS[productId];
      if (!conf) return;
      const modal = document.getElementById('doseImageModal');
      document.getElementById('doseImageModalTitle').textContent = `Tabela Oficial: ${conf.nome}`;
      document.getElementById('doseImageModalImg').src = conf.fotoTabela;
      modal.classList.add('open');
    },

    abrirNovoFrascoDose(productId) {
      const conf = TABELA_DOSES_OFICIAIS[productId];
      const doseState = (state.frascosDoses && state.frascosDoses[productId]) || { mgRestante: 120 };
      const estoqueFechados = Number((state.meuEstoque || {})[productId] || 0);

      const msg = `Frasco em uso atual possui ${doseState.mgRestante} mg restantes.\nVocê possui ${estoqueFechados} frascos fechados no Estoque Reserva de BH.\n\nDeseja abrir um novo frasco de 120mg e dar baixa de 1 unidade do seu estoque reserva?`;
      if (confirm(msg)) {
        if (estoqueFechados <= 0) {
          alert('Você não tem frascos fechados no Estoque BH para abrir!');
          return;
        }
        state.meuEstoque[productId] = estoqueFechados - 1;
        if (!state.frascosDoses) state.frascosDoses = {};
        state.frascosDoses[productId] = {
          mgRestante: 120,
          totalAplicadasMg: 0,
          perdaMg: (Number(doseState.perdaMg) || 0) + (Number(doseState.mgRestante) || 0)
        };
        saveState();
        renderAll();
        showToast(`Novo frasco de ${conf.nome} aberto com sucesso (120 mg disponíveis)!`);
      }
    },

    selectSaleMode(mode, productId) {
      const raw = rawCatalog.find(x => x.id === productId);
      if (!raw) return;
      const p = computeProduct(raw);
      const pay = document.getElementById('salePayment').value;
      const isCartao = pay === 'cartao_6x';

      if (mode === 'frasco_inteiro') {
        document.getElementById('saleIsDose').value = '0';
        document.getElementById('saleDoseMg').value = '0';
        document.getElementById('saleDoseCustomContainer').style.display = 'none';
        const unitVal = isCartao ? p.precoCartao : p.precoFinal;
        document.getElementById('saleUnitPrice').value = unitVal;
        document.getElementById('saleTotalValue').value = unitVal;
        document.getElementById('saleQty').value = 1;
        document.getElementById('salePriceHint').textContent = `Frasco Fechado 120mg (${isCartao ? 'Cartão' : 'PIX'}): ${formatBRL(unitVal)}`;
      } else if (mode === 'custom') {
        document.getElementById('saleIsDose').value = '1';
        document.getElementById('saleDoseCustomContainer').style.display = 'grid';
        document.getElementById('saleCustomDoseMg').focus();
      }
    },

    selectSaleDose(productId, doseMg, dosePreco) {
      document.getElementById('saleIsDose').value = '1';
      document.getElementById('saleDoseMg').value = doseMg;
      document.getElementById('saleDoseCustomContainer').style.display = 'none';
      document.getElementById('saleUnitPrice').value = dosePreco;
      document.getElementById('saleTotalValue').value = dosePreco;
      document.getElementById('saleQty').value = 1;
      document.getElementById('salePriceHint').textContent = `Dose Individual Oficial: ${doseMg} mg ➔ ${formatBRL(dosePreco)}`;
    },

    onCustomDoseChange() {
      const mg = Number(document.getElementById('saleCustomDoseMg').value) || 0;
      document.getElementById('saleDoseMg').value = mg;
    },

    onCustomDosePriceChange() {
      const preco = Number(document.getElementById('saleCustomDosePrice').value) || 0;
      document.getElementById('saleUnitPrice').value = preco;
      document.getElementById('saleTotalValue').value = preco;
      document.getElementById('salePriceHint').textContent = `Dose Personalizada: ${document.getElementById('saleDoseMg').value} mg ➔ ${formatBRL(preco)}`;
    },

    openSaleModal(productId) {
      const modal = document.getElementById('saleModal');
      const selectContainer = document.getElementById('saleProdSelectContainer');
      const select = document.getElementById('saleProdSelect');
      const inStockProds = rawCatalog.map(computeProduct).filter(p => ((state.meuEstoque || {})[p.id] || 0) > 0);

      if (!inStockProds.length) {
        showToast('Nenhum produto com estoque em BH no momento!');
        return;
      }

      let targetId = productId;
      if (!targetId || !inStockProds.some(p => p.id === targetId)) {
        targetId = inStockProds[0].id;
        selectContainer.style.display = 'block';
        select.innerHTML = inStockProds.map(p => `
          <option value="${p.id}" ${p.id === targetId ? 'selected' : ''}>
            ${p.nombre} (Disponível: ${state.meuEstoque[p.id]} un)
          </option>
        `).join('');
      } else {
        selectContainer.style.display = 'none';
      }

      window.CRM.setSaleModalData(targetId);
      modal.classList.add('open');
    },

    onSaleProductSelect(val) {
      window.CRM.setSaleModalData(Number(val));
    },

    setSaleModalData(productId) {
      const raw = rawCatalog.find(x => x.id === productId);
      if (!raw) return;
      const p = computeProduct(raw);
      const stock = (state.meuEstoque || {})[p.id] || 0;

      document.getElementById('saleProdId').value = p.id;
      document.getElementById('saleProdTitle').textContent = p.nombre;
      document.getElementById('saleProdSub').textContent = `${(p.marca || '').toUpperCase()} · ${p.presentacion || p.categoria || ''}`;
      document.getElementById('saleProdStockBadge').textContent = `📦 Em estoque agora: ${stock} unidades`;
      document.getElementById('saleProdImg').src = p.localFoto || p.remoteFoto || '';

      const qtyInput = document.getElementById('saleQty');
      qtyInput.value = 1;
      qtyInput.max = Math.max(1, stock);

      const dateInput = document.getElementById('saleDate');
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      dateInput.value = now.toISOString().slice(0, 16);

      document.getElementById('saleClientName').value = '';
      document.getElementById('saleClientPhone').value = '';
      document.getElementById('saleNotes').value = '';
      document.getElementById('salePayment').value = 'pix';

      // Configuração de doses fracionadas se for 9005 ou 9006
      const doseBox = document.getElementById('saleDoseSelectorBox');
      const doseButtonsContainer = document.getElementById('saleDoseButtons');
      const confDose = TABELA_DOSES_OFICIAIS[productId];

      if (confDose && doseBox && doseButtonsContainer) {
        doseBox.style.display = 'block';
        const doseState = (state.frascosDoses && state.frascosDoses[productId]) || { mgRestante: 120 };
        document.getElementById('saleDoseFrascoSaldoBadge').textContent = `Frasco em uso: ${doseState.mgRestante} mg disponíveis`;

        doseButtonsContainer.innerHTML = `
          <button type="button" class="btn" style="font-size:11px; padding:5px 9px; background:#1e293b; color:#fff;" onclick="window.CRM.selectSaleMode('frasco_inteiro', ${productId})">
            📦 Frasco Fechado (120mg)
          </button>
          ${confDose.doses.map(d => `
            <button type="button" class="btn btn-green" style="font-size:11px; padding:5px 9px; background:#065f46; color:#fff; font-weight:700;" onclick="window.CRM.selectSaleDose(${productId}, ${d.mg}, ${d.preco})">
              💉 ${d.label} (R$ ${d.preco})
            </button>
          `).join('')}
          <button type="button" class="btn" style="font-size:11px; padding:5px 9px; background:#1e293b; color:#38bdf8;" onclick="window.CRM.selectSaleMode('custom', ${productId})">
            ⚙️ Outra Dose
          </button>
        `;
        document.getElementById('saleIsDose').value = '0';
        document.getElementById('saleDoseMg').value = '0';
        document.getElementById('saleDoseCustomContainer').style.display = 'none';
      } else if (doseBox) {
        doseBox.style.display = 'none';
        document.getElementById('saleIsDose').value = '0';
        document.getElementById('saleDoseMg').value = '0';
        document.getElementById('saleDoseCustomContainer').style.display = 'none';
      }

      window.CRM.onSalePaymentChange();
    },

    onSalePaymentChange() {
      const pid = Number(document.getElementById('saleProdId').value);
      const raw = rawCatalog.find(x => x.id === pid);
      if (!raw) return;
      const p = computeProduct(raw);
      const pay = document.getElementById('salePayment').value;
      const qty = Math.max(1, Number(document.getElementById('saleQty').value) || 1);
      const isDose = document.getElementById('saleIsDose') && document.getElementById('saleIsDose').value === '1';

      if (isDose) {
        // Se for dose, não altera o valor sugerido da dose oficial
        return;
      }

      let unitPrice = p.precoFinal;
      if (pay === 'cartao_6x') {
        unitPrice = p.precoCartao;
      }
      const total = unitPrice * qty;
      document.getElementById('saleUnitPrice').value = unitPrice;
      document.getElementById('saleTotalValue').value = total;
      document.getElementById('salePriceHint').textContent = `Sugestão (${pay === 'cartao_6x' ? 'Cartão' : 'PIX'}): ${formatBRL(unitPrice)} cada un × ${qty} = ${formatBRL(total)}`;
    },

    onSaleUnitPriceChange() {
      const unitVal = Number(document.getElementById('saleUnitPrice').value) || 0;
      const qty = Math.max(1, Number(document.getElementById('saleQty').value) || 1);
      const total = unitVal * qty;
      document.getElementById('saleTotalValue').value = total;
      document.getElementById('salePriceHint').textContent = `Valor: ${formatBRL(unitVal)} cada un × ${qty} = ${formatBRL(total)}`;
    },

    onSaleQtyChange() {
      const unitVal = Number(document.getElementById('saleUnitPrice').value) || 0;
      const qty = Math.max(1, Number(document.getElementById('saleQty').value) || 1);
      const total = unitVal * qty;
      document.getElementById('saleTotalValue').value = total;
      document.getElementById('salePriceHint').textContent = `Valor: ${formatBRL(unitVal)} cada un × ${qty} = ${formatBRL(total)}`;
    },

    onSaleTotalValueChange() {
      const totalVal = Number(document.getElementById('saleTotalValue').value) || 0;
      const qty = Math.max(1, Number(document.getElementById('saleQty').value) || 1);
      const unitVal = Math.round(totalVal / qty);
      document.getElementById('saleUnitPrice').value = unitVal;
      document.getElementById('salePriceHint').textContent = `Total: ${formatBRL(totalVal)} ➔ ${formatBRL(unitVal)} por cada unidade`;
    },

    updateSaleTotalPreview() {
      window.CRM.onSaleQtyChange();
    },

    confirmSale() {
      const pid = Number(document.getElementById('saleProdId').value);
      const raw = rawCatalog.find(x => x.id === pid);
      if (!raw) {
        showToast('Selecione um produto!');
        return;
      }
      const p = computeProduct(raw);
      const currentStock = Number((state.meuEstoque || {})[pid] || 0);
      const qty = Math.max(1, Number(document.getElementById('saleQty').value) || 1);

      const unitRaw = document.getElementById('saleUnitPrice').value.trim();
      const totalRaw = document.getElementById('saleTotalValue').value.trim();
      const unitVal = unitRaw !== '' && isFinite(Number(unitRaw)) ? Number(unitRaw) : p.precoFinal;
      const totalVal = totalRaw !== '' && isFinite(Number(totalRaw)) ? Number(totalRaw) : (unitVal * qty);
      const pay = document.getElementById('salePayment').value;
      const payLabelMap = {
        'pix': '💠 À vista no PIX',
        'cartao_6x': '💳 Cartão de Crédito (até 6x)',
        'cartao_debito': '💳 Cartão Débito',
        'dinheiro': '💵 Dinheiro em Espécie'
      };
      const payLabel = payLabelMap[pay] || pay;
      const client = document.getElementById('saleClientName').value.trim() || 'Cliente';
      const phone = document.getElementById('saleClientPhone').value.trim();
      const notes = document.getElementById('saleNotes').value.trim();
      const dateVal = document.getElementById('saleDate').value || new Date().toISOString();

      const isDose = document.getElementById('saleIsDose') && document.getElementById('saleIsDose').value === '1';
      const doseMg = Number(document.getElementById('saleDoseMg') ? document.getElementById('saleDoseMg').value : 0) || 0;

      // Se for venda de dose fracionada
      if (isDose) {
        if (doseMg <= 0) {
          alert('Informe a quantidade em mg da dose aplicada!');
          return;
        }
        if (!state.frascosDoses) state.frascosDoses = {};
        if (!state.frascosDoses[pid]) state.frascosDoses[pid] = { mgRestante: 120, totalAplicadasMg: 0 };

        const frascoAtual = state.frascosDoses[pid];
        if (frascoAtual.mgRestante < doseMg) {
          const abrirOutro = confirm(`Atenção: o frasco em uso só tem ${frascoAtual.mgRestante} mg restantes (a dose é de ${doseMg} mg).\n\nDeseja abrir um novo frasco de 120mg agora usando seu estoque de reserva?`);
          if (abrirOutro) {
            const estoqueReserva = Number((state.meuEstoque || {})[pid] || 0);
            if (estoqueReserva <= 0) {
              alert('Você não tem frascos reservas fechados no Estoque BH!');
              return;
            }
            state.meuEstoque[pid] = estoqueReserva - 1;
            frascoAtual.perdaMg = (Number(frascoAtual.perdaMg) || 0) + (Number(frascoAtual.mgRestante) || 0);
            frascoAtual.mgRestante = 120;
          } else {
            return;
          }
        }

        // Abate miligramas do frasco
        frascoAtual.mgRestante = Math.max(0, frascoAtual.mgRestante - doseMg);
        frascoAtual.totalAplicadasMg = (frascoAtual.totalAplicadasMg || 0) + doseMg;

        // Custo proporcional da dose
        const custoDose = Math.round(((p.custo || 600) / 120) * doseMg);
        const lucroEst = totalVal - custoDose;

        const venda = {
          id: Date.now(),
          data: dateVal,
          produtoId: p.id,
          produtoNome: `${p.nombre} — Dose Avulsa ${doseMg} mg`,
          marca: p.marca || '',
          qtd: 1,
          isDose: true,
          doseMg: doseMg,
          valorUnitario: unitVal,
          valorTotal: totalVal,
          formaPagamento: payLabel,
          cliente: client,
          telefone: phone,
          obs: notes,
          custoTotal: custoDose,
          lucro: lucroEst
        };

        if (!state.vendas) state.vendas = [];
        state.vendas.unshift(venda);
        saveState();

        document.getElementById('saleModal').classList.remove('open');
        renderAll();
        showToast(`Dose de ${doseMg} mg registrada! Restam ${frascoAtual.mgRestante} mg no frasco.`);
        window.CRM.showSaleReceipt(venda, p);
        return;
      }

      // Se for frasco/caixa fechada
      if (qty > currentStock) {
        alert(`Quantidade solicitada (${qty}) é maior do que o estoque disponível em BH (${currentStock} un)!`);
        return;
      }

      // Baixa no estoque
      const nextStock = currentStock - qty;
      if (nextStock <= 0) {
        delete state.meuEstoque[pid];
      } else {
        state.meuEstoque[pid] = nextStock;
      }

      // Registro de Venda com Valor Unitário explícito
      const lucroEst = totalVal - (p.custo * qty);
      const venda = {
        id: Date.now(),
        data: dateVal,
        produtoId: p.id,
        produtoNome: p.nombre,
        marca: p.marca || '',
        qtd: qty,
        isDose: false,
        valorUnitario: unitVal,
        valorTotal: totalVal,
        formaPagamento: payLabel,
        cliente: client,
        telefone: phone,
        obs: notes,
        custoTotal: p.custo * qty,
        lucro: lucroEst
      };

      if (!state.vendas) state.vendas = [];
      state.vendas.unshift(venda);
      saveState();

      document.getElementById('saleModal').classList.remove('open');
      renderAll();
      showToast(`Venda registrada! Baixa de ${qty} un efetuada.`);

      // Abre comprovante / recibo
      window.CRM.showSaleReceipt(venda, p);
    },

    showSaleReceipt(venda, p) {
      const modal = document.getElementById('saleReceiptModal');
      const textarea = document.getElementById('saleReceiptText');
      const dataFmt = new Date(venda.data).toLocaleString('pt-BR');

      if (venda.isDose) {
        const lines = [
          `💉 *COMPROVANTE DE APLICAÇÃO DE DOSE — SHAPE TOTAL*`,
          `━━━━━━━━━━━━━━━━━━━━━━━━━`,
          `👤 *Paciente / Cliente:* ${venda.cliente}`,
          `🧪 *Medicamento:* ${venda.produtoNome}`,
          `💉 *Dosagem Aplicada:* *${venda.doseMg} mg* (Dose Individual)`,
          `💰 *Valor Cobrado:* *${formatBRL(venda.valorTotal)}*`,
          `💳 *Forma de Pagamento:* ${venda.formaPagamento}`,
          `📅 *Data da Aplicação:* ${dataFmt}`,
          `📍 *Local:* Atendimento Pronta Entrega Belo Horizonte`,
          venda.obs ? `📝 *Observação:* ${venda.obs}` : ``,
          `━━━━━━━━━━━━━━━━━━━━━━━━━`,
          `🔒 *Procedência:* Medicamento 100% original com controle de pureza e diluição precisa.`,
          `Conte sempre com a Shape Total para alcançar sua melhor versão com saúde! 🚀💪`
        ].filter(Boolean);

        textarea.value = lines.join('\n');
        window._lastReceiptPhone = venda.telefone;
        modal.classList.add('open');
        return;
      }

      const lines = [
        `✅ *COMPROVANTE DE PEDIDO — SHAPE TOTAL*`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `👤 *Cliente:* ${venda.cliente}`,
        `📦 *Item:* ${venda.qtd}x *${venda.produtoNome}*`,
        `💵 *Valor Unitário:* ${formatBRL(venda.valorUnitario)} cada`,
        `💰 *Valor Total Cobrado:* ${formatBRL(venda.valorTotal)}`,
        `💳 *Forma de Pagamento:* ${venda.formaPagamento}`,
        `📅 *Data da Operação:* ${dataFmt}`,
        `🚚 *Entrega:* Pronta Entrega Belo Horizonte (Retirada ou Motoboy)`,
        venda.obs ? `📝 *Observação:* ${venda.obs}` : ``,
        `━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `🔒 *Garantia:* Medicamentos 100% originais com lacre e rastreio.`,
        `Agradecemos a confiança e preferência! 🚀💪`
      ].filter(Boolean);

      textarea.value = lines.join('\n');
      window._lastReceiptPhone = venda.telefone;
      modal.classList.add('open');
    },

    openReceiptWhatsApp() {
      const text = document.getElementById('saleReceiptText').value;
      const phone = (window._lastReceiptPhone || '').replace(/\D/g, '');
      if (phone) {
        const fullPhone = phone.startsWith('55') ? phone : `55${phone}`;
        window.open(`https://api.whatsapp.com/send?phone=${fullPhone}&text=${encodeURIComponent(text)}`, '_blank');
      } else {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
      }
      showToast('Abrindo WhatsApp com o comprovante...');
    },

    copyReceiptText() {
      const text = document.getElementById('saleReceiptText').value;
      navigator.clipboard.writeText(text);
      showToast('Comprovante copiado para a área de transferência!');
    },

    openSalesHistoryModal() {
      const modal = document.getElementById('salesHistoryModal');
      const vendas = state.vendas || [];

      const totalFat = vendas.reduce((s, v) => s + (Number(v.valorTotal) || 0), 0);
      const totalLucro = vendas.reduce((s, v) => s + (Number(v.lucro) || 0), 0);
      const totalQtd = vendas.reduce((s, v) => s + (Number(v.qtd) || 0), 0);

      document.getElementById('historyTotalFaturado').textContent = formatBRL(totalFat);
      document.getElementById('historyTotalLucro').textContent = formatBRL(totalLucro);
      document.getElementById('historyTotalQtd').textContent = `${totalQtd} unidades`;
      document.getElementById('historyTotalVendasCount').textContent = `${vendas.length} vendas`;

      const tbody = document.getElementById('historyTableBody');
      if (!vendas.length) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:24px; color:var(--text-muted);">Nenhuma venda registrada ainda. Use o botão "+ Nova Venda" para dar baixa.</td></tr>`;
      } else {
        tbody.innerHTML = vendas.map(v => {
          const d = new Date(v.data).toLocaleString('pt-BR');
          const unitVal = v.valorUnitario || (v.qtd > 0 ? Math.round(v.valorTotal / v.qtd) : v.valorTotal);
          return `
            <tr>
              <td style="white-space:nowrap; font-size:11px; color:#94a3b8;">${d}</td>
              <td><b>${esc(v.produtoNome)}</b></td>
              <td style="text-align:center;"><b style="color:#34d399;">${v.qtd}</b></td>
              <td style="color:#38bdf8;">${formatBRL(unitVal)}</td>
              <td><b style="color:#34d399;">${formatBRL(v.valorTotal)}</b></td>
              <td style="color:#fbbf24;">+${formatBRL(v.lucro)}</td>
              <td>${esc(v.cliente)}</td>
              <td style="font-size:11px;">${esc(v.formaPagamento)}</td>
              <td style="text-align:center;">
                <button class="btn" style="padding:2px 8px; font-size:11px; color:#f87171;" title="Estornar venda e devolver item ao estoque" onclick="window.CRM.undoSale(${Number(v.id) || 0})">
                  ↩️ Estornar
                </button>
              </td>
            </tr>
          `;
        }).join('');
      }

      modal.classList.add('open');
    },

    undoSale(saleId) {
      const vIdx = (state.vendas || []).findIndex(v => v.id === saleId);
      if (vIdx === -1) return;
      const v = state.vendas[vIdx];

      const descItem = v.isDose ? `Dose Avulsa (${v.doseMg} mg)` : `${v.qtd}x`;
      if (confirm(`Estornar a venda de ${descItem} "${v.produtoNome}" para ${v.cliente}?\n\nO item ou os miligramas voltarão automaticamente para o seu estoque.`)) {
        if (v.isDose) {
          if (!state.frascosDoses) state.frascosDoses = {};
          if (!state.frascosDoses[v.produtoId]) state.frascosDoses[v.produtoId] = { mgRestante: 120, totalAplicadasMg: 0 };
          state.frascosDoses[v.produtoId].mgRestante = Math.min(120, (Number(state.frascosDoses[v.produtoId].mgRestante) || 0) + Number(v.doseMg || 0));
          state.frascosDoses[v.produtoId].totalAplicadasMg = Math.max(0, (Number(state.frascosDoses[v.produtoId].totalAplicadasMg) || 0) - Number(v.doseMg || 0));
        } else {
          if (!state.meuEstoque) state.meuEstoque = {};
          state.meuEstoque[v.produtoId] = (Number(state.meuEstoque[v.produtoId]) || 0) + v.qtd;
        }

        state.vendas.splice(vIdx, 1);
        saveState();
        renderAll();
        window.CRM.openSalesHistoryModal();
        showToast(v.isDose ? `Venda estornada! +${v.doseMg} mg devolvidos ao frasco.` : `Venda estornada! ${v.qtd} un devolvida ao Estoque BH.`);
      }
    },

    clearSalesHistory() {
      if (confirm('Tem certeza que deseja limpar todo o histórico de vendas? Esta ação não pode ser desfeita.')) {
        state.vendas = [];
        saveState();
        renderAll();
        window.CRM.openSalesHistoryModal();
        showToast('Histórico de vendas limpo.');
      }
    },

    exportSalesCSV() {
      const vendas = state.vendas || [];
      if (!vendas.length) {
        showToast('Nenhuma venda para exportar!');
        return;
      }
      const header = ['ID', 'Data', 'Produto', 'Quantidade', 'Valor_Unitario_BRL', 'Valor_Total_BRL', 'Forma_Pagamento', 'Cliente', 'Telefone', 'Observacao', 'Lucro_Estimado_BRL'];
      const rows = vendas.map(v => {
        const unitVal = v.valorUnitario || (v.qtd > 0 ? Math.round(v.valorTotal / v.qtd) : v.valorTotal);
        return [
          v.id,
          `"${new Date(v.data).toLocaleString('pt-BR')}"`,
          `"${(v.produtoNome || '').replace(/"/g, '""')}"`,
          v.qtd,
          unitVal,
          v.valorTotal,
          `"${(v.formaPagamento || '').replace(/"/g, '""')}"`,
          `"${(v.cliente || '').replace(/"/g, '""')}"`,
          `"${(v.telefone || '').replace(/"/g, '""')}"`,
          `"${(v.obs || '').replace(/"/g, '""')}"`,
          v.lucro
        ].join(';');
      });
      const csv = '\uFEFF' + [header.join(';'), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `relatorio_vendas_shapetotal_${new Date().toISOString().slice(0,10)}.csv`;
      a.click();
    },

    openTransitoModal() {
      const modal = document.getElementById('transitoModal');
      if (!state.pedidosTransito || state.pedidosTransito.length === 0) {
        state.pedidosTransito = JSON.parse(JSON.stringify(PEDIDOS_TRANSITO_CANONICOS));
        saveState();
      }
      const pedidos = state.pedidosTransito || [];
      const emTransito = pedidos.filter(p => p.status === 'em_transito');

      let totalInvestido = 0;
      let totalVendaPix = 0;
      let totalVendaCartao = 0;
      let totalQtd = 0;

      emTransito.forEach(ped => {
        totalInvestido += Number(ped.custo_total_reais || 0);
        (ped.itens || []).forEach(it => {
          totalQtd += Number(it.qtd || 0);
          totalVendaPix += (Number(it.preco_venda_pix || 900) * Number(it.qtd || 0));
          totalVendaCartao += (Number(it.preco_venda_cartao || 1000) * Number(it.qtd || 0));
        });
      });

      const totalLucro = totalVendaPix - totalInvestido;

      document.getElementById('kpiTransitoInvestido').textContent = formatBRL(totalInvestido);
      document.getElementById('kpiTransitoFaturamento').textContent = formatBRL(totalVendaPix);
      document.getElementById('kpiTransitoLucro').textContent = `+${formatBRL(totalLucro)}`;
      document.getElementById('kpiTransitoQtd').textContent = `${totalQtd} unidades`;

      const container = document.getElementById('transitoPedidosContainer');
      if (!pedidos.length) {
        container.innerHTML = `<div style="text-align:center; padding:24px; color:var(--text-muted);">Nenhum pedido registrado.</div>`;
      } else {
        container.innerHTML = pedidos.map(ped => {
          const isEntregue = ped.status === 'entregue';
          const totalItensPed = (ped.itens || []).reduce((s, it) => s + Number(it.qtd || 0), 0);
          return `
            <div style="background:#0f172a; border-radius:8px; border:1px solid ${isEntregue ? '#334155' : '#fbbf24'}; padding:14px; position:relative;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid #1e293b; padding-bottom:8px;">
                <div>
                  <span style="font-weight:800; font-size:14px; color:${isEntregue ? '#94a3b8' : '#fbbf24'};">
                    ${isEntregue ? '✅ PEDIDO ENTREGUE' : '🚚 PEDIDO EM TRÂNSITO'} #${ped.id}
                  </span>
                  <span style="font-size:12px; color:#94a3b8; margin-left:8px;">Data: ${ped.data_compra}</span>
                </div>
                <div style="text-align:right;">
                  <span style="font-size:11px; color:#94a3b8;">Investido:</span>
                  <b style="font-size:14px; color:#f87171; margin-left:4px;">${formatBRL(ped.custo_total_reais)}</b>
                </div>
              </div>

              <div style="font-size:12px; margin-bottom:12px;">
                <b style="color:#e2e8f0;">Itens Comprados (${totalItensPed} un):</b>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:6px; margin-top:6px;">
                  ${(ped.itens || []).map(it => `
                    <div style="background:#0b1120; padding:6px 10px; border-radius:6px; border:1px solid #1e293b; display:flex; justify-content:space-between; align-items:center;">
                      <span style="color:#f8fafc; font-weight:700;">${it.qtd}x ${it.nome}</span>
                      <span style="color:#34d399; font-weight:800; font-size:11px;">PIX ${formatBRLInt(it.preco_venda_pix || 900)}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:11px; color:${isEntregue ? '#34d399' : '#fbbf24'};">
                  ● Status: <b>${isEntregue ? 'Entregue no Estoque BH' : 'Pago • Aguardando Entrega'}</b>
                </span>
                <div style="display:flex; gap:8px; align-items:center;">
                  <button class="btn" style="padding:4px 8px; font-size:11px; color:#f87171;" title="Excluir registro de pedido" onclick="window.CRM.deletePurchase('${ped.id}')">🗑️</button>
                  ${!isEntregue ? `
                    <button class="btn btn-green" style="background:#059669; color:#fff; font-weight:800; padding:6px 14px; font-size:12px;" onclick="window.CRM.confirmarChegadaPedido('${ped.id}')">
                      📦 Confirmar Chegada em BH
                    </button>
                  ` : `
                    <span style="font-size:11px; color:#94a3b8;">Estoque atualizado</span>
                  `}
                </div>
              </div>
            </div>
          `;
        }).join('');
      }

      modal.classList.add('open');
    },

    confirmarChegadaPedido(pedidoId) {
      const ped = (state.pedidosTransito || []).find(p => p.id === pedidoId);
      if (!ped) return;

      const totalItens = (ped.itens || []).reduce((s, it) => s + Number(it.qtd || 0), 0);
      if (confirm(`Confirmar o recebimento físico do pedido #${ped.id}? ${totalItens} unidades serão adicionadas automaticamente ao seu Estoque de Pronta Entrega em BH.`)) {
        if (!state.meuEstoque) state.meuEstoque = {};

        (ped.itens || []).forEach(it => {
          const pid = it.id_catalogo;
          state.meuEstoque[pid] = (Number(state.meuEstoque[pid]) || 0) + Number(it.qtd || 0);
        });

        ped.status = 'entregue';
        ped.data_entrega = new Date().toISOString();

        saveState();
        renderAll();
        window.CRM.openTransitoModal();
        showToast(`Pedido recebido! ${totalItens} unidades somadas ao Estoque BH.`);
      }
    },

    deletePurchase(pedidoId) {
      const idx = (state.pedidosTransito || []).findIndex(p => p.id === pedidoId);
      if (idx === -1) return;
      if (confirm(`Deseja remover este registro de pedido (#${pedidoId}) da lista de trânsito?`)) {
        state.pedidosTransito.splice(idx, 1);
        saveState();
        renderAll();
        window.CRM.openTransitoModal();
        showToast('Pedido removido.');
      }
    },

    resetPedidosTransito() {
      if (confirm('Restaurar os 3 pedidos pagos em trânsito (22 unidades a chegar — R$ 11.872,61 investidos)?')) {
        state.pedidosTransito = JSON.parse(JSON.stringify(PEDIDOS_TRANSITO_CANONICOS));
        saveState();
        renderAll();
        window.CRM.openTransitoModal();
        showToast('Pedidos em trânsito restaurados com sucesso (22 un)!');
      }
    },

    toggleNewPurchaseForm() {
      const box = document.getElementById('newPurchaseBox');
      if (!box) return;
      const isVisible = box.style.display === 'block';
      box.style.display = isVisible ? 'none' : 'block';
      if (!isVisible) {
        window._tempPurchaseItems = [];
        document.getElementById('npDate').value = new Date().toLocaleDateString('pt-BR');
        document.getElementById('npTotalCost').value = '';
        document.getElementById('npItemsList').innerHTML = '<span style="color:#64748b;">Nenhum item adicionado ainda. Selecione acima e clique em "+ Incluir Item".</span>';
        const sel = document.getElementById('npProdSelect');
        const sorted = [...rawCatalog].sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));
        sel.innerHTML = sorted.map(p => `<option value="${p.id}">${p.nombre} (${(p.marca || '').toUpperCase()})</option>`).join('');
      }
    },

    addNewPurchaseItem() {
      if (!window._tempPurchaseItems) window._tempPurchaseItems = [];
      const sel = document.getElementById('npProdSelect');
      const pid = Number(sel.value);
      const qty = Math.max(1, Number(document.getElementById('npProdQty').value) || 1);
      const raw = rawCatalog.find(x => x.id === pid);
      if (!raw) return;
      const p = computeProduct(raw);

      window._tempPurchaseItems.push({
        id_catalogo: p.id,
        nome: p.nombre,
        qtd: qty,
        preco_venda_pix: p.precoFinal,
        preco_venda_cartao: p.precoCartao
      });

      const listEl = document.getElementById('npItemsList');
      listEl.innerHTML = window._tempPurchaseItems.map((it, i) => `
        <div style="display:flex; justify-content:space-between; padding:4px 8px; background:#0f172a; margin-bottom:4px; border-radius:4px;">
          <span><b>${it.qtd}x</b> ${it.nome}</span>
          <span style="color:#34d399;">Venda PIX: ${formatBRL(it.preco_venda_pix * it.qtd)}</span>
        </div>
      `).join('');
    },

    saveNewPurchase() {
      const items = window._tempPurchaseItems || [];
      if (!items.length) {
        alert('Adicione pelo menos 1 medicamento na compra clicando em "+ Incluir Item"!');
        return;
      }
      const cost = Number(document.getElementById('npTotalCost').value) || 0;
      if (cost <= 0) {
        alert('Informe o Custo Total Pago (R$) pela encomenda!');
        return;
      }
      const dateStr = document.getElementById('npDate').value.trim() || new Date().toLocaleDateString('pt-BR');
      const newPed = {
        id: 'PED-' + Date.now().toString().slice(-6),
        data_compra: dateStr,
        fornecedor: 'Shape Total / Importação',
        status: 'em_transito',
        custo_total_reais: cost,
        itens: items
      };

      if (!state.pedidosTransito) state.pedidosTransito = [];
      state.pedidosTransito.unshift(newPed);
      saveState();
      document.getElementById('newPurchaseBox').style.display = 'none';
      renderAll();
      window.CRM.openTransitoModal();
      showToast('Nova compra em trânsito registrada com sucesso!');
    },

    openAddStockModal() {
      const modal = document.getElementById('addStockModal');
      document.getElementById('addStockSearch').value = '';
      document.getElementById('addStockQty').value = 1;
      window.CRM.filterAddStockSelect('');
      modal.classList.add('open');
    },

    filterAddStockSelect(query) {
      const q = (query || '').toLowerCase().trim();
      const sel = document.getElementById('addStockSelect');
      const filtered = rawCatalog.filter(p => {
        if (!q) return true;
        const txt = `${p.id} ${p.nombre || ''} ${p.marca || ''} ${p.composicion || ''}`.toLowerCase();
        return txt.includes(q);
      }).sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));

      sel.innerHTML = filtered.slice(0, 150).map(p => {
        const cur = (state.meuEstoque || {})[p.id] || 0;
        return `<option value="${p.id}">${p.nombre} — ${(p.marca || '').toUpperCase()} ${cur > 0 ? `(Em mãos: ${cur} un)` : ''}</option>`;
      }).join('');
    },

    confirmAddStock() {
      const pid = Number(document.getElementById('addStockSelect').value);
      const qty = Math.max(1, Number(document.getElementById('addStockQty').value) || 1);
      if (!pid) return;
      if (!state.meuEstoque) state.meuEstoque = {};
      state.meuEstoque[pid] = (Number(state.meuEstoque[pid]) || 0) + qty;
      saveState();
      document.getElementById('addStockModal').classList.remove('open');
      renderAll();
      showToast(`+${qty} un adicionadas ao seu Estoque BH!`);
    },

    openWhatsAppCatalogModal(mode) {
      const modal = document.getElementById('waCatalogModal');
      const textarea = document.getElementById('waCatalogText');
      if (mode === 'meu_estoque') {
        const inStock = rawCatalog.map(computeProduct).filter(p => ((state.meuEstoque || {})[p.id] || 0) > 0);
        if (!inStock.length) {
          textarea.value = `📦 *PRONTA ENTREGA EM BELO HORIZONTE — SHAPE TOTAL*\n\n(Nenhum produto cadastrado no seu estoque físico ainda. No CRM, use o botão "+" no campo "Meu Estoque BH" do produto para adicionar suas caixas.)`;
        } else {
          const lines = [
            `📦 *PRONTA ENTREGA EM BELO HORIZONTE — SHAPE TOTAL*`,
            `_Disponível para retirada imediata ou entrega via motoboy hoje:_`,
            ``
          ];
          inStock.forEach(p => {
            const qtd = (state.meuEstoque || {})[p.id];
            lines.push(`• *${p.nombre}* (${qtd}x un em mãos)`);
            lines.push(`  💠 *À vista no PIX: ${formatBRLInt(p.precoFinal)}*`);
            lines.push(`  💳 *No Cartão: ${formatBRLInt(p.precoCartao)}* (em até 6x s/ juros)`);
            lines.push(``);
          });
          lines.push(`🚀 Entrega expressa para Belo Horizonte e região.`);
          lines.push(`🔒 Produtos 100% originais com QR Code.`);
          textarea.value = lines.join('\n');
        }
      } else if (mode === 'tabela_doses_avulsas') {
        textarea.value = `💉 *TABELA OFICIAL DE DOSES INDIVIDUAIS — SHAPE TOTAL*
_Aplicação de Doses Fracionadas com Medicamentos Originais de 120 mg_

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🇺🇸 *TIRZEPATIDE INJECTION 120MG / 4ML*
*USA Peptides — Qualidade Internacional*
• *2,5 mg:* R$ 65,00 (Dose Individual)
• *5,0 mg:* R$ 130,00 (Dose Individual)
• *7,5 mg:* R$ 185,00 (Dose Individual)
✨ _Auxilia no controle de peso, suporte metabólico e qualidade de vida._
📌 _Doses calculadas para o melhor aproveitamento do lote de 120 mg._

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧬 *RETATRUTIDE 120 MG (GLP-1, GIP, GLUCAGON)*
*GEN-HEALTH — Ciência Para Uma Vida Melhor*
• *2,5 mg:* R$ 80,00 (Dose Individual)
• *5,0 mg:* R$ 150,00 (Dose Individual)
✨ _Revolução no emagrecimento com triplo agonista (aplicação 1x por semana)._
📌 _Solução injetável em vial de altíssima pureza._

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚚 *Atendimento Express em Belo Horizonte e Região*
🔒 *Garantia:* Produtos originais em vials lacrados, diluição correta e total segurança.
📲 _Dúvidas ou agendamento de aplicação? Chame aqui!_`;
      } else if (mode === 'tabela_especial') {
        textarea.value = `📋 TABELA DE PREÇOS

📦 Linha 60 mg — duração de até 6 meses
•  TG 60 mg
•  Tirzec (4 vias)
•  Lipoless (4 vias)
•  Lipoland (4 vias)
•  Lipoless MD (multidose)
•  Tirzec MD (multidose)
•  T36 MD (multidose)
•  Gluconex (4 vias)
💠 Pix: R$ 900,00
💳 Cartão: R$ 1.000,00 em até 6x sem juros

🧬 Retatrutida 60 mg
💠 Pix: R$ 1.000,00
💳 Cartão: R$ 1.100,00 em até 6x sem juros

💉 Ampolas avulsas de 15 mg
•  Tirzepatida • Lipoless • TG • Tirzec • Lipoland
💠 Pix: R$ 250,00 cada
💳 Cartão: R$ 300,00 cada em até 6x sem juros`;
      } else if (mode === 'grok') {
        textarea.value = generateGrokGuideWhatsApp();
      } else {
        const filtered = getFilteredProducts();
        const lines = [
          `*CATÁLOGO ATUALIZADO — ${state.mainGroup.toUpperCase()} (${filtered.length} produtos)*`,
          `_Valores à vista no PIX | Cartão em até 6x_`,
          ``
        ];
        // Organiza por Marca mantendo 100% dos produtos filtrados
        const byBrand = {};
        filtered.forEach(p => {
          const b = (p.marca || 'OUTRAS MARCAS').toUpperCase().trim();
          if (!byBrand[b]) byBrand[b] = [];
          byBrand[b].push(p);
        });
        Object.keys(byBrand).sort().forEach(brand => {
          lines.push(`*━━━ 🏷️ ${brand} (${byBrand[brand].length}) ━━━*`);
          byBrand[brand].forEach(p => {
            if (p.desc) {
              lines.push(`•  *${p.nombre}*: ${p.desc} ➔ *${formatBRLInt(p.precoFinal)}*`);
            } else {
              lines.push(`•  *${p.nombre}*${p.composicion ? ' — ' + p.composicion : ''} ➔ *${formatBRLInt(p.precoFinal)}*`);
            }
          });
          lines.push(``);
        });
        textarea.value = lines.join('\n');
      }
      modal.classList.add('open');
    },

    openWhatsAppDirect() {
      const textarea = document.getElementById('waCatalogText');
      const text = textarea ? textarea.value : '';
      if (!text) {
        showToast('Nada para enviar!');
        return;
      }
      navigator.clipboard.writeText(text);
      if (text.length < 2500) {
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
        showToast('Abrindo WhatsApp com texto pronto...');
      } else {
        const url = `https://api.whatsapp.com/send`;
        window.open(url, '_blank');
        showToast('Texto copiado! Cole na conversa do WhatsApp.');
      }
    },

    clearSearch() {
      const inp = document.getElementById('searchInput');
      const btn = document.getElementById('btnClearSearch');
      if (inp) {
        inp.value = '';
        state.search = '';
      }
      if (btn) btn.style.display = 'none';
      renderAll();
      showToast('Busca limpa!');
    },

    openCartModal() {
      const modal = document.getElementById('waCatalogModal');
      const textarea = document.getElementById('waCatalogText');
      const entries = Object.entries(state.cart).filter(([, q]) => q > 0);
      let totalPix = 0;
      let totalCusto = 0;
      const lines = [`*ORÇAMENTO SHAPE TOTAL*`, ``];
      entries.forEach(([id, qty]) => {
        const raw = rawCatalog.find(x => String(x.id) === String(id));
        if (raw) {
          const p = computeProduct(raw);
          const sub = p.precoFinal * qty;
          totalPix += sub;
          totalCusto += p.custo * qty;
          lines.push(`• ${qty}x *${p.nombre}* ➔ *${formatBRLInt(sub)}* (${formatBRLInt(p.precoFinal)} un)`);
        }
      });
      lines.push(``);
      lines.push(`💰 *Total à vista (PIX): ${formatBRLInt(totalPix)}*`);
      lines.push(`💳 *Total no Cartão: ${formatBRLInt(totalPix + state.taxaCartaoFixa)}*`);
      textarea.value = lines.join('\n');
      modal.classList.add('open');
    },

    clearCart() {
      state.cart = {};
      renderCartBar();
      document.getElementById('waCatalogModal').classList.remove('open');
      showToast('Orçamento limpo!');
    },

    exportCSV() {
      const filtered = getFilteredProducts();
      const header = ['SKU', 'Nome', 'Marca', 'Categoria', 'Composicao', 'Estoque_Total', 'CDE', 'PJ', 'SG', 'USD', 'Custo_BRL', 'Min_BRL', 'Recomendado_BRL', 'Maximo_BRL', 'Venda_Final_BRL', 'Lucro_BRL', 'Margem_Pct'];
      const rows = filtered.map(p => [
        `SHAPE-${p.id}`,
        `"${(p.nombre || '').replace(/"/g, '""')}"`,
        `"${(p.marca || '').replace(/"/g, '""')}"`,
        `"${(p.categoria || '').replace(/"/g, '""')}"`,
        `"${(p.composicion || '').replace(/"/g, '""')}"`,
        p.stockTotal, p.cde, p.pj, p.sg,
        p.usd.toFixed(2),
        p.custo.toFixed(2),
        p.precoMin,
        p.precoRec,
        p.precoMax,
        p.precoFinal,
        p.lucroFinal.toFixed(2),
        `${p.margemAplicada}%`
      ].join(';'));
      const csv = '\uFEFF' + [header.join(';'), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `catalogo_shapetotal_${state.mainGroup}_cot${state.cotacao}.csv`;
      a.click();
    },

    openSyncModal() {
      const modal = document.getElementById('syncModal');
      const jsonStr = JSON.stringify(buildSyncData());
      const b64 = btoa(encodeURIComponent(jsonStr));
      const baseUrl = window.location.origin + window.location.pathname;
      const syncUrl = `${baseUrl}#sync=${b64}`;

      document.getElementById('syncUrlInput').value = syncUrl;

      const undoBtn = document.getElementById('btnUndoImport');
      if (undoBtn) undoBtn.style.display = localStorage.getItem(BACKUP_KEY) ? 'inline-flex' : 'none';

      const totalVendas = (state.vendas || []).length;
      const totalItens = Object.values(state.meuEstoque || {}).reduce((s, v) => s + Number(v || 0), 0);
      document.getElementById('syncSummaryBadge').textContent = `📦 ${totalItens} unidades no estoque · 📋 ${totalVendas} vendas · 💉 Doses atualizadas`;

      modal.classList.add('open');
    },

    copySyncUrl() {
      const input = document.getElementById('syncUrlInput');
      input.select();
      navigator.clipboard.writeText(input.value);
      showToast('Link de sincronização copiado!');
    },

    shareSyncWhatsApp() {
      const input = document.getElementById('syncUrlInput');
      const url = input.value;
      const msg = `📲 *SINCRONIZAÇÃO SHAPE TOTAL CRM*\nClique no link abaixo para sincronizar seus dados (estoque, vendas e doses) neste aparelho:\n\n${url}`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
    },

    async shareSyncNative() {
      const url = document.getElementById('syncUrlInput').value;
      if (navigator.share) {
        try { await navigator.share({ title: 'Sincronização ShapeTotal CRM', url }); } catch (e) {}
      } else {
        window.CRM.copySyncUrl();
      }
    },

    exportBackupFile() {
      const blob = new Blob([JSON.stringify({ app: 'shapetotal-crm', versao: 1, exportado_em: new Date().toISOString(), dados: buildSyncData() }, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      const d = new Date();
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      a.download = `backup_shapetotal_${d.toISOString().slice(0, 16).replace(/[:T]/g, '-')}.json`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      showToast('Backup exportado!');
    },

    importBackupFile(inputEl) {
      const file = inputEl && inputEl.files && inputEl.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          if (applyImported(parsed && parsed.dados ? parsed.dados : parsed, 'arquivo de backup')) {
            loadState();
            renderAll();
            document.getElementById('syncModal').classList.remove('open');
            showToast('Backup restaurado!');
          }
        } catch (e) {
          alert('Arquivo de backup inválido.');
        }
        inputEl.value = '';
      };
      reader.readAsText(file);
    },

    undoLastImport() {
      const raw = localStorage.getItem(BACKUP_KEY);
      if (!raw) { showToast('Nenhuma importação para desfazer.'); return; }
      try {
        const bk = JSON.parse(raw);
        if (!confirm(`Desfazer a última importação e voltar ao estado de ${new Date(bk.quando).toLocaleString('pt-BR')}?`)) return;
        localStorage.setItem(STORAGE_KEY, bk.estado);
        localStorage.removeItem(BACKUP_KEY);
        loadState();
        renderAll();
        document.getElementById('syncModal').classList.remove('open');
        showToast('Importação desfeita.');
      } catch (e) {
        alert('Não foi possível desfazer.');
      }
    },

    importSyncPayloadManual() {
      const raw = prompt('Cole aqui o código ou link de sincronização copiado do outro aparelho:');
      if (!raw) return;
      try {
        let b64 = raw.trim();
        if (b64.includes('#sync=')) {
          b64 = b64.split('#sync=')[1];
        }
        const jsonStr = decodeURIComponent(atob(b64));
        const imported = JSON.parse(jsonStr);
        if (applyImported(imported, 'código colado')) {
          loadState();
          renderAll();
          document.getElementById('syncModal').classList.remove('open');
          showToast('Sincronização concluída!');
        }
      } catch (e) {
        alert('Código de sincronização inválido. Certifique-se de copiar o link completo.');
      }
    },

    forceUpdateApp() {
      if (confirm('Deseja recarregar a versão mais recente do CRM limpando o cache local?')) {
        window.location.reload(true);
      }
    }
  };

  function generateGrokGuideWhatsApp() {
    function bestPriceById(id, fallbackUsd) {
      const raw = rawCatalog.find(x => x.id === id);
      const p = raw ? computeProduct(raw) : computeProduct({ id: 0, precio: fallbackUsd, categoria: 'peptideo' });
      return formatBRLInt(p.precoFinal);
    }

    return [
      `🧬 *GUIA COMPLETO: PEPTÍDEOS & BLENDS — O QUE CADA UM FAZ?*`,
      ``,
      `Fala, pessoal! Segue o resumo prático e direto ao ponto de cada peptídeo e blend para você escolher o protocolo certo para o seu objetivo:`,
      ``,
      `🔥 *1. QUEIMA DE GORDURA, DEFINIÇÃO & METABOLISMO*`,
      `•  *HGH Frag 176-191*: Focado em queimar gordura teimosa e localizada sem mexer na glicose e sem reter líquido. ➔ *${bestPriceById(3059, 35)}* (5mg)`,
      `•  *AOD-9604*: Versão aprimorada do fragmento de GH que quebra a gordura estocada e impede a formação de novas células de gordura. ➔ *${bestPriceById(3060, 40)}* (5mg)`,
      `•  *MOTS-c*: Peptídeo mitocondrial que transforma carboidratos em energia pura, melhora a sensibilidade à insulina e aumenta o fôlego nos treinos. ➔ *${bestPriceById(3117, 26)}* (10mg)`,
      `•  *SLU-PP-332*: Conhecido como "cardio em pó/cápsula", replica no músculo os efeitos metabólicos do exercício aeróbico intenso mesmo em repouso. ➔ *${bestPriceById(3185, 35)}* (60 caps)`,
      `•  *Adipotide*: Corta o fluxo de sangue que alimenta as células de gordura branca, acelerando a perda de gordura profunda. ➔ *${bestPriceById(3283, 150)}* (Kit 27.5mg ZPHC)`,
      `•  *AICAR*: Estimula a enzima metabólica AMPK, forçando o organismo a queimar gordura como fonte primária de energia. ➔ *${bestPriceById(2331, 19)}* (60 caps)`,
      ``,
      `💪 *2. ESTÍMULO DE GH & GANHO DE MASSA*`,
      `•  *Ipamorelin*: Libera pulsos limpos de GH; melhora o sono profundo, a densidade muscular e o tônus sem dar fome descontrolada. ➔ *${bestPriceById(3139, 50)}* (10mg)`,
      `•  *CJC-1295*: Potencializa e prolonga a secreção natural de GH, gerando sinergia máxima para queima e recuperação. ➔ *${bestPriceById(3029, 38)}* (5mg)`,
      `•  *Tesamorelin*: O mais potente estimulador de GH para secar gordura visceral profunda do abdômen e reduzir gordura no fígado. ➔ *${bestPriceById(3123, 31)}* (5mg)`,
      `•  *GHRP-2*: Estimulador potente de GH que favorece ganho de força, volume muscular e recuperação tecidual rápida. ➔ *${bestPriceById(3176, 70)}* (Kit 25mg ZPHC)`,
      `•  *GHRP-6*: Estimulador de GH que desperta apetite intenso, sendo a escolha clássica para ganho de peso e bulking. ➔ *${bestPriceById(389, 13)}* (1 ampola)`,
      `•  *IGF-1 LR3*: Fator de crescimento anabólico de longa duração que atua na criação de novas fibras musculares e transporte de nutrientes. ➔ *${bestPriceById(393, 13)}* (1 ampola)`,
      ``,
      `🛠️ *3. RECUPERAÇÃO DE LESÕES, INFLAMAÇÃO & IMUNIDADE*`,
      `•  *BPC-157*: Regenerador tecidual de elite; cura tendões, ligamentos, articulações e protege o estômago e o intestino contra úlceras e refluxos. ➔ *${bestPriceById(385, 15)}* (1 ampola)`,
      `•  *TB-500*: Age no corpo todo reparando rupturas de fibras musculares, reduzindo inflamações crônicas e devolvendo flexibilidade. ➔ *${bestPriceById(399, 20)}* (1 ampola)`,
      `•  *KPV*: Poderoso anti-inflamatório natural que desinflama o intestino (SII, colites) e acalma a pele contra acne severa e dermatites. ➔ *${bestPriceById(3034, 38)}* (10mg)`,
      `•  *LL-37*: Peptídeo antimicrobiano que elimina bactérias e vírus resistentes, blindando o sistema imunológico contra infecções frequentes. ➔ *${bestPriceById(3119, 45)}* (5mg)`,
      ``,
      `✨ *4. ESTÉTICA, PELE, CABELO & BRONZEAMENTO*`,
      `•  *GHK-Cu*: Peptídeo de cobre que estimula colágeno e elastina, devolvendo firmeza à pele, suavizando linhas e fechando poros. ➔ *${bestPriceById(3120, 30)}* (100mg)`,
      `•  *AHK-Cu*: Variante de cobre desenhada para a raiz capilar; combate a queda, acelera o nascimento e encorpa os fios. ➔ *${bestPriceById(3224, 60)}* (100mg)`,
      `•  *Melanotan-2*: Estimula a produção homogênea de melanina, proporcionando bronzeamento duradouro com mínima exposição ao sol. ➔ *${bestPriceById(3127, 22)}* (10mg)`,
      ``,
      `⚡ *5. ENERGIA CELULAR, MITOCÔNDRIAS & LONGEVIDADE*`,
      `•  *NAD+*: Combustível celular que restaura a energia física, combate o cansaço crônico, limpa a mente e repara o DNA. ➔ *${bestPriceById(3115, 38)}* (500mg)`,
      `•  *SS-31*: Regenera mitocôndrias desgastadas, aumentando a resistência física e blindando coração e rins contra sobrecarga. ➔ *${bestPriceById(3031, 32)}* (10mg)`,
      `•  *Epithalon*: O peptídeo da longevidade; atua nos telômeros celulares, retarda o envelhecimento biológico e regula o sono. ➔ *${bestPriceById(3124, 24)}* (10mg)`,
      `•  *L-Glutathione*: O antioxidante mestre do corpo; faz desintoxicação hepática profunda e uniformiza o tom da pele. ➔ *${bestPriceById(3281, 70)}* (Kit 3000mg ZPHC)`,
      ``,
      `🧠 *6. CÉREBRO, FOCO, ANSIEDADE & SONO*`,
      `•  *Semax*: Nootrópico avançado que eleva a clareza mental, a retenção de memória e o foco prolongado sem causar taquicardia. ➔ *${bestPriceById(3344, 45)}* (Spray Nasal)`,
      `•  *Selank*: Ação ansiolítica que alivia o estresse e a agitação mental sem dar sono, lentidão ou qualquer risco de dependência. ➔ *${bestPriceById(3033, 28)}* (5mg)`,
      `•  *CBL (Cerebrolysin)*: Complexo neuroprotetor que recupera conexões cerebrais e protege os neurônios contra desgaste e estresse crônico. ➔ *${bestPriceById(3266, 55)}* (20mg)`,
      `•  *DSIP*: Peptídeo indutor do sono que garante a fase mais profunda e reparadora do descanso noturno. ➔ *${bestPriceById(3264, 60)}* (5mg)`,
      ``,
      `🌶️ *7. LIBIDO & PERFORMANCE SEXUAL*`,
      `•  *PT-141*: Atua diretamente no sistema nervoso central estimulando o desejo sexual e a ereção em homens e mulheres. ➔ *${bestPriceById(3032, 38)}* (10mg)`,
      ``,
      `🧬 *8. BLENDS COMBINADOS (Mais praticidade e sinergia na mesma aplicação)*`,
      `•  *Glow Blend (GHK-Cu + BPC-157 + TB-500)*: O blend estético definitivo; combina firmeza da pele, síntese de colágeno e regeneração profunda. ➔ *${bestPriceById(3395, 40)}* (70mg)`,
      `•  *Klow Blend (GHK-Cu + BPC-157 + TB-500 + KPV)*: Fórmula do Glow potencializada com KPV para quem tem pele muito reativa, acne inflamatória ou rosácea. ➔ *${bestPriceById(3278, 53)}* (80mg)`,
      `•  *CJC-1295 + Ipamorelin*: A combinação mais consagrada de secretagogos; estimula GH natural, melhora o sono e tonifica o músculo sem retenção. ➔ *${bestPriceById(3230, 60)}* (10mg)`,
      `•  *Double Burn Mix (AOD-9604 + HGH Frag 176-191)*: Sinergia lipolítica dupla que acelera a quebra da gordura estocada e bloqueia o acúmulo de nova gordura. ➔ *${bestPriceById(3285, 130)}* (Kit 25mg ZPHC)`,
      `•  *Super Slim Mix (AOD-9604 + HGH Frag 176-191 + Adipotide)*: O blend mais agressivo do catálogo para queima acelerada e destruição de células adiposas. ➔ *${bestPriceById(3283, 150)}* (Kit 27.5mg ZPHC)`,
      `•  *Ultra Rehab Mix (BPC-157 + TB-500 em alta dose)*: Fórmula potente focada em acelerar a cura de lesões articulares, estiramentos e tendinites crônicas. ➔ *${bestPriceById(3061, 90)}* (20mg ZPHC)`,
      `•  *Mega Mass Mix (CJC-1295 + GHRP-6)*: União de estímulo contínuo de GH com aumento do apetite pela grelina para quem busca ganho de volume bruto. ➔ *${bestPriceById(3294, 115)}* (Kit 50mg ZPHC)`
    ].join('\n');
  }

  function showToast(msg) {
    const t = document.getElementById('toastBox');
    t.textContent = msg;
    t.style.opacity = '1';
    setTimeout(() => { t.style.opacity = '0'; }, 2200);
  }

  function initEvents() {
    const cotInput = document.getElementById('inputCotacao');
    const freteInput = document.getElementById('inputFrete');
    const cartaoInput = document.getElementById('inputTaxaCartao');

    cotInput.value = state.cotacao;
    freteInput.value = state.fretePct;
    cartaoInput.value = state.taxaCartaoFixa;

    cotInput.addEventListener('input', e => {
      state.cotacao = Number(e.target.value) || 0;
      saveState();
      renderAll();
    });
    freteInput.addEventListener('input', e => {
      state.fretePct = Number(e.target.value) || 0;
      saveState();
      renderAll();
    });
    cartaoInput.addEventListener('input', e => {
      state.taxaCartaoFixa = Number(e.target.value) || 0;
      saveState();
      renderAll();
    });

    document.querySelectorAll('.tier-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeTier = btn.getAttribute('data-tier');
        document.querySelectorAll('.tier-btn').forEach(b => b.className = 'tier-btn');
        btn.classList.add(`active-${state.activeTier}`);
        saveState();
        renderAll();
      });
    });

    document.querySelectorAll('.group-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.group-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.mainGroup = tab.getAttribute('data-group');
        state.subCat = 'todas';
        document.getElementById('subCatSelect').value = 'todas';
        renderAll();
      });
    });

    let searchTimer = null;
    const searchInp = document.getElementById('searchInput');
    const searchClearBtn = document.getElementById('btnClearSearch');
    searchInp.addEventListener('input', e => {
      state.search = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = state.search ? 'flex' : 'none';
      }
      clearTimeout(searchTimer);
      searchTimer = setTimeout(renderAll, 150);
    });

    document.getElementById('subCatSelect').addEventListener('change', e => {
      state.subCat = e.target.value;
      renderAll();
    });

    document.getElementById('brandSelect').addEventListener('change', e => {
      state.brand = e.target.value;
      renderAll();
    });

    document.getElementById('stockSelect').addEventListener('change', e => {
      state.stockFilter = e.target.value;
      renderAll();
    });

    document.getElementById('branchSelect').addEventListener('change', e => {
      state.branchFilter = e.target.value;
      renderAll();
    });

    document.getElementById('sortSelect').addEventListener('change', e => {
      state.sortBy = e.target.value;
      renderAll();
    });

    document.getElementById('btnToggleMargins').addEventListener('click', () => {
      document.getElementById('marginDrawer').classList.toggle('open');
    });

    document.getElementById('btnViewMode').addEventListener('click', (e) => {
      state.viewMode = state.viewMode === 'grid' ? 'table' : 'grid';
      e.currentTarget.textContent = state.viewMode === 'grid' ? '📊 Ver Planilha' : '🛍️ Ver Loja';
      renderAll();
    });

    document.getElementById('btnClientMode').addEventListener('click', (e) => {
      state.clientMode = !state.clientMode;
      document.body.classList.toggle('client-mode', state.clientMode);
      e.currentTarget.textContent = state.clientMode ? '🔓 Modo Admin' : '👁️ Modo Cliente';
    });

    document.getElementById('btnCopyWaModal').addEventListener('click', () => {
      const txt = document.getElementById('waCatalogText').value;
      navigator.clipboard.writeText(txt);
      showToast('Texto completo copiado para o WhatsApp!');
    });
  }

  function checkSyncFromUrl() {
    const hash = window.location.hash || '';
    if (!hash.startsWith('#sync=')) return;
    try {
      const imported = JSON.parse(decodeURIComponent(atob(hash.substring(6))));
      if (applyImported(imported, 'link de sincronização')) {
        alert('✅ Sincronização concluída neste aparelho.');
      }
    } catch (e) {
      console.error('Erro na sincronização via URL:', e);
      alert('Link de sincronização inválido ou incompleto.');
    }
    history.replaceState(null, null, window.location.pathname + window.location.search);
  }

  document.addEventListener('DOMContentLoaded', () => {
    checkSyncFromUrl();
    loadState();
    populateDropdowns();
    renderMarginDrawer();
    initEvents();
    renderAll();

    // Check initial authentication
    const isAuthed = localStorage.getItem('ST_AUTH') === 'true' || sessionStorage.getItem('ST_AUTH') === 'true';
    const overlay = document.getElementById('authOverlay');
    if (overlay) {
      overlay.style.display = isAuthed ? 'none' : 'flex';
    }

  });
})();
