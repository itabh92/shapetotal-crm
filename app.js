
  const SPECIAL_FIXED_REC = {
    // Linha 60 mg / 4 vias x 15 mg / MD 15 mg -> Pix: R$ 900,00 | Cartão: R$ 1.000,00
    2848: { rec: 900, cartao: 1000, label: 'TG 15mg x 4 (60mg)' },
    3207: { rec: 900, cartao: 1000, label: 'Tirzec 15mg x 4 (60mg)' },
    2889: { rec: 900, cartao: 1000, label: 'Lipoless 15mg x 4 (60mg)' },
    2988: { rec: 900, cartao: 1000, label: 'Lipoland 15mg x 4 (60mg)' },
    3072: { rec: 900, cartao: 1000, label: 'Lipoland MD 15mg' },
    2997: { rec: 900, cartao: 1000, label: 'Lipoless MD 15mg' },
    2996: { rec: 900, cartao: 1000, label: 'Quimfa Tirzec 60mg Ampola Única (1x2ml)' },
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
    3147: { rec: 2250, cartao: 2450, label: 'ZPHC Caneta Retatrutide 60mg' },
    2965: { rec: 2000, cartao: 2200, label: 'ZPHC Retatrutide 60mg (5x12mg)' },
    3370: { rec: 3800, cartao: 4200, label: 'Kit Retatrutida Gen-Health (4x60mg)' },

    // Ampolas / Frascos avulsos 15 mg
    3206: { rec: 735, cartao: 835, label: 'Pharmacom Jaros Tirzepatida 15mg (Importado)' },
    2763: { rec: 450, cartao: 550, label: 'Gen-Tirz 15mg' },
    2875: { rec: 250, cartao: 300, label: 'Sin Marca Tirzepatida 15mg' },
    3008: { rec: 350, cartao: 400, label: 'ZPHC Tirzepatide 15mg' },

    // Itens Exclusivos Pronta Entrega BH (Ampolas avulsas e frascos)
    9001: { rec: 250, cartao: 300, label: 'Lipoland 15mg (Ampola Avulsa)' },
    9002: { rec: 250, cartao: 300, label: 'Tirzec 15mg (Ampola Avulsa)' },
    9003: { rec: 250, cartao: 300, label: 'TG 15mg (Ampola Avulsa)' },
    9004: { rec: 250, cartao: 300, label: 'Lipoless 15mg (Ampola Avulsa)' },
    9007: { rec: 250, cartao: 300, label: 'Tirzedral 15mg (Ampola Avulsa)' },
    9005: { rec: 2000, cartao: 2200, label: 'Retatrutida Gen 120mg (Doses)' },
    9006: { rec: 1800, cartao: 2000, label: 'Tirzepatida Gen-Tirz 120mg (Doses)' }
  };

  const ESTOQUE_CANONICO_BH = {
    2848: 1, // TG 60mg (Caixa 4x15mg) — conferido 11/11
    2889: 3, // Lipoless 60mg (Caixa 4x15mg) — conferido 11/11
    3207: 2, // Tirzec 60mg (Caixa 4x15mg) — conferido 11/11
    2996: 2, // Quimfa Tirzec Multi Dosis 60mg (Ampola Única)
    3136: 0, // Tirzedral 60mg (Caixa 4x15mg) — aberta para ampolas avulsas
    3370: 1, // Kit Retatrutida 4x60mg + Água
    2830: 3, // Retatrutida 60mg ampolas fechadas
    9001: 3, // Ampola avulsa Lipoland 15mg
    9002: 3, // Ampola avulsa Tirzec 15mg
    9003: 3, // Ampola avulsa TG 15mg
    9004: 2, // Ampola avulsa Lipoless 15mg
    9007: 3, // Ampola avulsa Catedral Tirzedral 15mg — conferido 11/11 (3 un)
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
      id: "PED-20261111-01",
      data_compra: "11/11/2026",
      fornecedor: "Jose do Carmo Alves Dantas (Pagseguro)",
      status: "em_transito",
      custo_total_reais: 3740.00,
      comprovante: "E00416968202611111343Vo74dD1GsCc",
      itens: [
        { id_catalogo: 2848, nome: "INDUFAR T.G. TIRZEPATIDA X 15 MG. X 4 AMP. (60 MG)", qtd: 4, preco_venda_pix: 900, preco_venda_cartao: 1000 },
        { id_catalogo: 3207, nome: "TIRZEC X 15 MG. X 4 AMPOLLAS (60 MG)", qtd: 2, preco_venda_pix: 900, preco_venda_cartao: 1000 }
      ]
    },
    {
      id: "PED-20261110-01",
      data_compra: "10/11/2026",
      fornecedor: "Mega Servicos Digitais LTDA",
      status: "em_transito",
      custo_total_reais: 1729.35,
      comprovante: "E00416968202611101746bdLuXF7tnqj",
      itens: [
        { id_catalogo: 3207, nome: "TIRZEC X 15 MG. X 4 AMPOLLAS (60 MG)", qtd: 2, preco_venda_pix: 900, preco_venda_cartao: 1000 },
        { id_catalogo: 2848, nome: "INDUFAR T.G. TIRZEPATIDA X 15 MG. X 4 AMP. (60 MG)", qtd: 2, preco_venda_pix: 900, preco_venda_cartao: 1000 }
      ]
    },
    {
      id: "PED-20261109-02",
      data_compra: "09/11/2026",
      fornecedor: "Outro Fornecedor",
      status: "entregue",
      data_entrega: "10/11/2026 às 16:00",
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
    anabolizante: { label: '💪 Anabolizantes', min: 33, rec: 43, max: 60 },
    emagrecedores: { label: '🔥 Emagrecedores & Queimadores', min: 32, rec: 42, max: 58 },
    saude_mental: { label: '🧠 Saúde Mental & Nootrópicos', min: 32, rec: 47, max: 65 },
    peptideo: { label: '🧬 Peptídeos & HGH', min: 30, rec: 48, max: 65 },
    estetico: { label: '✨ Estético, Botox & Pele', min: 35, rec: 52, max: 75 },
    sarms_post: { label: '🧪 SARMs, Pós-Ciclo & HCG', min: 30, rec: 44, max: 60 },
    potencia_outros: { label: '⚡ Potência, Capilar & Outros', min: 32, rec: 47, max: 70 }
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
    encomendas: [], // [ { id, data, cliente, telefone, endereco, status, produtoId, produtoNome, marca, qtd, precoUnit, valorTotal, formaPagamento, sinal, obs } ]
    pedidosTransito: [], // [ { id, data_compra, status, custo_total_reais, itens: [ { id_catalogo, nome, qtd, ... } ] } ]
    frascosDoses: {
      9006: { mgRestante: 120, totalAplicadasMg: 0 },
      9005: { mgRestante: 120, totalAplicadasMg: 0 }
    },
    cotacaoAtualizadaEm: new Date().toISOString(),
    _bhStockSyncKey: '',
    customProducts: [],
    clientes: [], // [{ id, nome, telefone, endereco, totalGasto, qtdPedidos, ultimaCompra, anotacoes, tags }]
    savedFilters: [], // [{ id, nome, mainGroup, subCat, brand, stockFilter, minMarginFilter, search }]
    minMarginFilter: null
  };

  const AUDIT_LOG_KEY = 'ST_AUDIT_LOG_v1';
  const PASS_SALT = '|SHAPE_TOTAL_SALT_2026_v1|';
  const VALID_PASS_HASHES = [
    'e928dd10685d338a37bbb64597b818214569621b93d1607114734d32d552f6ad', // shape2026
    'e4f85da8d5d37890ab3044efe4ef562b45e4e87b5f5e103f930d51098ba90490', // 1020
    '03c037f6c96e56857dafe85e0510427246baf2f174319116a1f90664e30b5af2'  // italo2026
  ];

  function sha256Pure(ascii) {
    const rightRotate = (v, a) => (v >>> a) | (v << (32 - a));
    const mathPow = Math.pow, maxWord = mathPow(2, 32);
    let result = '';
    const words = [], asciiBitLength = ascii.length * 8;
    let hash = [], k = [], primeCounter = 0;
    const isComposite = {};
    for (let candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (let i = 0; i < 313; i += candidate) isComposite[i] = candidate;
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }
    ascii += '\x80';
    while (ascii.length % 64 - 56) ascii += '\x00';
    for (let i = 0; i < ascii.length; i++) {
      const j = ascii.charCodeAt(i);
      if (j >> 8) return '';
      words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words.length] = ((asciiBitLength / maxWord) | 0);
    words[words.length] = (asciiBitLength);
    for (let j = 0; j < words.length;) {
      const w = words.slice(j, j += 16);
      const oldHash = hash.slice(0);
      for (let i = 0; i < 64; i++) {
        const w15 = w[i - 15], w2 = w[i - 2];
        const a = hash[0], e = hash[4];
        const temp1 = hash[7] + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + ((e & hash[5]) ^ ((~e) & hash[6])) + k[i] + (w[i] = (i < 16) ? w[i] : (w[i - 16] + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) + w[i - 7] + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) | 0);
        const temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
        hash.pop();
      }
      for (let i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
    }
    for (let i = 0; i < 8; i++) {
      for (let j = 3; j + 1; j--) {
        const b = (hash[i] >> (j * 8)) & 255;
        result += ((b < 16) ? 0 : '') + b.toString(16);
      }
    }
    return result;
  }

  async function hashPass(pass) {
    const text = String(pass || '') + PASS_SALT;
    if (window.crypto && window.crypto.subtle) {
      const enc = new TextEncoder();
      const buf = await window.crypto.subtle.digest('SHA-256', enc.encode(text));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    const utf8 = unescape(encodeURIComponent(text));
    return sha256Pure(utf8);
  }

  function logAuditoria(acao, detalhe) {
    try {
      const raw = localStorage.getItem(AUDIT_LOG_KEY);
      const logs = raw ? JSON.parse(raw) : [];
      logs.unshift({
        data: new Date().toISOString(),
        acao,
        detalhe: String(detalhe || '').slice(0, 200)
      });
      localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(logs.slice(0, 50)));
    } catch (e) {}
  }

  let renderLimit = 60;
  let scrollObserver = null;
  let currentEncomendaFilter = 'todas';
  let currentReceiptEncId = null;
  let currentReceiptPhone = '';
  let currentPedidoOperacao = 'pronta_entrega'; // 'pronta_entrega' | 'encomenda'
  let novaEncomendaItens = [];

  function getEncomendaItens(enc) {
    if (!enc) return [];
    if (Array.isArray(enc.itens) && enc.itens.length > 0) return enc.itens;
    if (enc.produtoId) {
      return [{
        produtoId: enc.produtoId,
        produtoNome: enc.produtoNome || 'Medicamento',
        marca: enc.marca || '',
        qtd: Number(enc.qtd) || 1,
        precoUnit: Number(enc.precoUnit) || 0,
        subtotal: enc.valorProdutos || (Number(enc.precoUnit || 0) * Number(enc.qtd || 1)) || Number(enc.valorTotal || 0)
      }];
    }
    return [];
  }

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
        state.cotacaoAtualizadaEm = parsed.cotacaoAtualizadaEm || new Date().toISOString();
        state._bhStockSyncKey = parsed._bhStockSyncKey || '';
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
        state.encomendas = Array.isArray(parsed.encomendas) ? parsed.encomendas : [];
        state.pedidosTransito = Array.isArray(parsed.pedidosTransito) ? parsed.pedidosTransito : [];
        state.customProducts = Array.isArray(parsed.customProducts) ? parsed.customProducts : [];
        state.clientes = Array.isArray(parsed.clientes) ? parsed.clientes : [];
        state.savedFilters = Array.isArray(parsed.savedFilters) ? parsed.savedFilters : [];
        state.customProducts.forEach(cp => {
          if (cp && cp.id && !rawCatalog.some(r => String(r.id) === String(cp.id))) {
            rawCatalog.unshift(cp);
          }
        });
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

    // Se algum pedido canônico foi marcado como 'entregue', sincroniza o status no aparelho e credita o estoque local
    PEDIDOS_TRANSITO_CANONICOS.forEach(canon => {
      if (canon.status === 'entregue') {
        const pedLocal = state.pedidosTransito.find(p => String(p.id) === String(canon.id));
        if (pedLocal && pedLocal.status !== 'entregue') {
          pedLocal.status = 'entregue';
          pedLocal.data_entrega = canon.data_entrega || new Date().toISOString();
          if (!state.meuEstoque) state.meuEstoque = {};
          (pedLocal.itens || []).forEach(it => {
            const pid = it.id_catalogo;
            state.meuEstoque[pid] = (Number(state.meuEstoque[pid]) || 0) + Number(it.qtd || 0);
          });
          changed = true;
        }
      }
    });

    // Semeia o estoque físico de BH apenas na primeira carga do aparelho (quando não há estoque salvo)
    if (!temEstoqueSalvo || !state.meuEstoque || typeof state.meuEstoque !== 'object') {
      state.meuEstoque = JSON.parse(JSON.stringify(ESTOQUE_CANONICO_BH));
      state._bhStockSyncKey = 'SYNC_BH_ESTOQUE_20261111_INVENTARIO_CONFIRMADO_V5';
      changed = true;
    }
    if (changed) saveState();
    backfillClientesFromHistory();
    rebuildSearchIndex();
  }

  function esc(v) {
    return String(v === undefined || v === null ? '' : v).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  // Dados completos (para backup em arquivo JSON)
  function buildSyncData() {
    return {
      cotacao: state.cotacao,
      cotacaoAtualizadaEm: state.cotacaoAtualizadaEm,
      fretePct: state.fretePct,
      taxaCartaoFixa: state.taxaCartaoFixa,
      activeTier: state.activeTier,
      meuEstoque: state.meuEstoque,
      vendas: state.vendas || [],
      encomendas: state.encomendas || [],
      pedidosTransito: state.pedidosTransito || [],
      frascosDoses: state.frascosDoses || {},
      overrides: state.overrides || {},
      customProducts: state.customProducts || [],
      clientes: state.clientes || [],
      savedFilters: state.savedFilters || [],
      canonVistos: state.canonVistos || []
    };
  }

  // Payload compacto (para link de sincronização e QR Code: limita às últimas 30 vendas/encomendas)
  function buildCompactSyncData() {
    return {
      cotacao: state.cotacao,
      fretePct: state.fretePct,
      taxaCartaoFixa: state.taxaCartaoFixa,
      activeTier: state.activeTier,
      meuEstoque: state.meuEstoque,
      vendas: (state.vendas || []).slice(0, 30),
      encomendas: (state.encomendas || []).slice(0, 30),
      pedidosTransito: (state.pedidosTransito || []).filter(p => p.status === 'em_transito'),
      frascosDoses: state.frascosDoses || {},
      overrides: state.overrides || {},
      customProducts: state.customProducts || [],
      clientes: (state.clientes || []).slice(0, 50),
      savedFilters: state.savedFilters || [],
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
        id: String(v.id || ''),
        produtoId: num(v.produtoId),
        qtd: num(v.qtd),
        doseMg: num(v.doseMg),
        isDose: !!v.isDose,
        estornada: !!v.estornada,
        estornadaEm: v.estornadaEm ? String(v.estornadaEm) : null,
        origemAparelho: String(v.origemAparelho || ''),
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
      })).filter(v => v.id);
    }
    if (Array.isArray(imp.encomendas)) {
      const num = x => Number(x) || 0;
      out.encomendas = imp.encomendas.filter(isObj).map(e => ({
        ...e,
        id: String(e.id || ''),
        data: String(e.data || ''),
        cliente: String(e.cliente || ''),
        telefone: String(e.telefone || ''),
        endereco: String(e.endereco || ''),
        status: String(e.status || 'pendente'),
        produtoId: num(e.produtoId),
        produtoNome: String(e.produtoNome || ''),
        marca: String(e.marca || ''),
        qtd: Math.max(1, num(e.qtd)),
        formaPagamento: String(e.formaPagamento || 'pix'),
        precoUnit: num(e.precoUnit),
        valorProdutos: num(e.valorProdutos),
        frete: num(e.frete),
        valorTotal: num(e.valorTotal),
        sinal: num(e.sinal),
        saldoRestante: num(e.saldoRestante),
        obs: String(e.obs || ''),
        loteId: e.loteId ? String(e.loteId) : null,
        vendaId: e.vendaId ? String(e.vendaId) : null
      })).filter(e => e.id);
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

  // Importação: mescla vendas (append-only) e atualiza estoque com confirmação e backup
  function applyImported(rawImported, origem) {
    const imp = sanitizeImported(rawImported);
    if (!imp || !Object.keys(imp).length) {
      alert('Dados de sincronização inválidos.');
      return false;
    }
    const current = localStorage.getItem(STORAGE_KEY);
    let cur = {};
    if (current) try { cur = JSON.parse(current) || {}; } catch (e) {}

    // 1. Merge inteligente de vendas (append-only por ID único)
    const curVendas = Array.isArray(cur.vendas) ? cur.vendas : [];
    const impVendas = Array.isArray(imp.vendas) ? imp.vendas : [];
    const vendasMap = new Map();

    // Registra as vendas locais existentes
    curVendas.forEach(v => {
      if (v && v.id) vendasMap.set(String(v.id), { ...v });
    });

    // Mescla as vendas recebidas
    let novasVendasCount = 0;
    impVendas.forEach(v => {
      if (!v || !v.id) return;
      const vid = String(v.id);
      if (vendasMap.has(vid)) {
        const existente = vendasMap.get(vid);
        // Se em qualquer aparelho a venda foi estornada, o estorno prevalece
        if (v.estornada) {
          existente.estornada = true;
          existente.estornadaEm = v.estornadaEm || existente.estornadaEm || new Date().toISOString();
        }
      } else {
        vendasMap.set(vid, { ...v });
        novasVendasCount++;
      }
    });

    const mergedVendas = Array.from(vendasMap.values()).sort((a, b) => {
      const da = new Date(a.data || 0).getTime();
      const db = new Date(b.data || 0).getTime();
      return db - da;
    });

    // 2. Merge de pedidos em trânsito
    const curPedidos = Array.isArray(cur.pedidosTransito) ? cur.pedidosTransito : [];
    const impPedidos = Array.isArray(imp.pedidosTransito) ? imp.pedidosTransito : [];
    const pedidosMap = new Map();
    curPedidos.forEach(p => { if (p && p.id) pedidosMap.set(String(p.id), p); });
    impPedidos.forEach(p => { if (p && p.id) pedidosMap.set(String(p.id), p); });
    const mergedPedidos = Array.from(pedidosMap.values());

    // 3. Merge de encomendas de clientes
    const curEncomendas = Array.isArray(cur.encomendas) ? cur.encomendas : [];
    const impEncomendas = Array.isArray(imp.encomendas) ? imp.encomendas : [];
    const encMap = new Map();
    curEncomendas.forEach(e => { if (e && e.id) encMap.set(String(e.id), e); });
    impEncomendas.forEach(e => {
      if (!e || !e.id) return;
      const eid = String(e.id);
      if (encMap.has(eid)) {
        const local = encMap.get(eid);
        encMap.set(eid, { ...local, ...e });
      } else {
        encMap.set(eid, e);
      }
    });
    const mergedEncomendas = Array.from(encMap.values()).sort((a, b) => {
      const da = new Date(a.data || 0).getTime();
      const db = new Date(b.data || 0).getTime();
      return db - da;
    });

    // 4. Merge de canonVistos
    const canonSet = new Set([...(cur.canonVistos || []), ...(imp.canonVistos || [])]);

    const soma = o => Object.values(o || {}).reduce((s, v) => s + (Number(v) || 0), 0);
    const msg = `Sincronizar dados (${origem})?\n\n` +
      `📦 Estoque BH: ${soma(imp.meuEstoque !== undefined ? imp.meuEstoque : cur.meuEstoque)} un\n` +
      `🧾 Vendas: ${curVendas.length} locais + ${novasVendasCount} novas = ${mergedVendas.length} total histórico\n` +
      `📝 Encomendas: ${mergedEncomendas.length} cadastradas\n\n` +
      `Os dados de ambos os aparelhos serão unidos sem perda. Uma cópia do estado atual fica salva para desfazer.`;

    if (!confirm(msg)) return false;

    if (current) {
      localStorage.setItem(BACKUP_KEY, JSON.stringify({ quando: new Date().toISOString(), estado: current }));
    }

    const mergedEstoque = { ...(cur.meuEstoque || {}) };
    if (imp.meuEstoque && typeof imp.meuEstoque === 'object') {
      Object.keys(imp.meuEstoque).forEach(pid => {
        const qImp = Number(imp.meuEstoque[pid]) || 0;
        const qLoc = Number(mergedEstoque[pid]) || 0;
        mergedEstoque[pid] = Math.max(qLoc, qImp);
      });
    }

    const nextState = {
      ...cur,
      ...imp,
      meuEstoque: mergedEstoque,
      _bhStockSyncKey: imp._bhStockSyncKey || cur._bhStockSyncKey || '',
      cotacaoAtualizadaEm: imp.cotacaoAtualizadaEm || cur.cotacaoAtualizadaEm || '',
      vendas: mergedVendas,
      encomendas: mergedEncomendas,
      pedidosTransito: mergedPedidos,
      customProducts: Array.isArray(imp.customProducts) ? imp.customProducts : (cur.customProducts || []),
      savedFilters: Array.isArray(imp.savedFilters) ? imp.savedFilters : (cur.savedFilters || []),
      canonVistos: Array.from(canonSet)
    };
    const mergedClientesMap = new Map();
    [...(cur.clientes || []), ...(imp.clientes || [])].forEach(c => {
      if (!c || !c.nome) return;
      const key = String(c.telefone || '').replace(/\D/g, '') || String(c.nome).trim().toLowerCase();
      const prev = mergedClientesMap.get(key);
      if (!prev) {
        mergedClientesMap.set(key, { ...c });
      } else {
        mergedClientesMap.set(key, {
          ...prev,
          ...c,
          totalGasto: Math.max(Number(prev.totalGasto) || 0, Number(c.totalGasto) || 0),
          qtdPedidos: Math.max(Number(prev.qtdPedidos) || 0, Number(c.qtdPedidos) || 0),
          ultimaCompra: (String(c.ultimaCompra || '') > String(prev.ultimaCompra || '')) ? c.ultimaCompra : prev.ultimaCompra,
          anotacoes: c.anotacoes || prev.anotacoes || '',
          tags: Array.from(new Set([...(prev.tags || []), ...(c.tags || [])]))
        });
      }
    });
    nextState.clientes = Array.from(mergedClientesMap.values());

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    return true;
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        cotacao: state.cotacao,
        cotacaoAtualizadaEm: state.cotacaoAtualizadaEm || '',
        _bhStockSyncKey: state._bhStockSyncKey || '',
        fretePct: state.fretePct,
        taxaCartaoFixa: state.taxaCartaoFixa,
        activeTier: state.activeTier,
        groupMargins: state.groupMargins,
        overrides: state.overrides,
        meuEstoque: state.meuEstoque,
        vendas: state.vendas || [],
        encomendas: state.encomendas || [],
        pedidosTransito: state.pedidosTransito || [],
        frascosDoses: state.frascosDoses || {},
        customProducts: state.customProducts || [],
        clientes: state.clientes || [],
        savedFilters: state.savedFilters || [],
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

    let minPct = gm.min;
    let maxPct = gm.max;

    let precoMin = Math.ceil(custo * (1 + minPct / 100));
    let precoRec = Math.ceil(custo * (1 + recPct / 100));
    let precoMax = Math.ceil(custo * (1 + maxPct / 100));
    const isSpecialFixed = SPECIAL_FIXED_REC[p.id];
    if (isSpecialFixed) {
      const fixedRec = isSpecialFixed.rec;
      const fixedCartao = isSpecialFixed.cartao || (fixedRec + state.taxaCartaoFixa);
      precoRec = fixedRec;
      const pisoMin = Math.min(Math.ceil(custo * 1.18), fixedRec - 20);
      precoMin = Math.min(precoMin, pisoMin, fixedRec - 10);
      precoMax = Math.max(precoMax, fixedCartao, fixedRec + 50);
      if (custo > 0) {
        minPct = Math.round(((precoMin - custo) / custo) * 100);
        recPct = Math.round(((precoRec - custo) / custo) * 100);
        maxPct = Math.round(((precoMax - custo) / custo) * 100);
      }
    }

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

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatBRL(v) {
    return 'R$ ' + Number(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatBRLInt(v) {
    return 'R$ ' + Number(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function isGlpProduct(p) {
    if (!p) return false;
    if (SPECIAL_FIXED_REC[p.id]) return true;
    const txt = `${p.nombre || ''} ${p.composicion || ''} ${p.desc || ''}`.toLowerCase();
    return (
      txt.includes('tirzepatid') || txt.includes('tirz') || txt.includes('retatrutid') ||
      txt.includes('mounjaro') || txt.includes('tirzec') || txt.includes('lipoless') ||
      txt.includes('lipoland') || txt.includes('t36') || txt.includes('gluconex') ||
      txt.includes('tirzedral') || txt.includes('slimex') || txt.includes('tirzegen')
    );
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
    'tg': ['tg', 't.g', 't.g.', 'indufar'],
    't.g': ['tg', 't.g', 't.g.', 'indufar'],
    't.g.': ['tg', 't.g', 't.g.', 'indufar'],
    'tirzec': ['tirzec', 'quimfa'],
    'lipoless': ['lipoless', 'eticos'],
    'lipoland': ['lipoland', 'landerlan'],
    'tirzedral': ['tirzedral', 'catedral', 't36'],
    'catedral': ['catedral', 'tirzedral', 't36'],
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

  // Índice pré-computado para busca instantânea (< 50 ms)
  const searchIndexMap = new Map();

  function normalizeSearchText(str) {
    return String(str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/t\.g\./g, 'tg')
      .replace(/t\.g\b/g, 'tg');
  }

  function rebuildSearchIndex() {
    searchIndexMap.clear();
    rawCatalog.forEach(p => {
      const ov = (state.overrides && state.overrides[p.id]) || {};
      const desc = ov.desc !== undefined ? ov.desc : (p.desc_comercial || '');
      const base = normalizeSearchText(`${p.id} shape-${p.id} ${p.nombre || ''} ${p.marca || ''} ${p.composicion || ''} ${p.categoria || ''} ${desc}`);
      // Expande sinônimos relevantes já no índice para busca em O(1)
      const extraSyns = [];
      for (const [k, syns] of Object.entries(GYM_SYNONYMS)) {
        if (base.includes(k) || syns.some(s => base.includes(s))) {
          extraSyns.push(...syns);
        }
      }
      searchIndexMap.set(p.id, extraSyns.length ? `${base} ${extraSyns.join(' ')}` : base);
    });
  }

  // CRM de Clientes: helpers de persistência e histórico
  function normalizeClientKey(nome, telefone) {
    const tel = String(telefone || '').replace(/\D/g, '');
    if (tel.length >= 8) return `tel:${tel.slice(-9)}`;
    return `nome:${normalizeSearchText(nome).trim()}`;
  }

  function findClienteRecord(nome, telefone = '') {
    const lista = state.clientes || [];
    const tel = String(telefone || '').replace(/\D/g, '');
    if (tel.length >= 8) {
      const byTel = lista.find(c => String(c.telefone || '').replace(/\D/g, '').endsWith(tel.slice(-9)));
      if (byTel) return byTel;
    }
    const cleanNome = normalizeSearchText(nome).trim();
    if (!cleanNome || cleanNome === 'cliente') return null;
    return lista.find(c => normalizeSearchText(c.nome).trim() === cleanNome) || null;
  }

  function upsertClienteFromOperacao({ nome, telefone = '', endereco = '', valor = 0, data = '', obs = '' }, skipSave = false) {
    const cleanNome = String(nome || '').trim();
    if (!cleanNome || cleanNome.toLowerCase() === 'cliente') return null;
    if (!Array.isArray(state.clientes)) state.clientes = [];

    let cli = findClienteRecord(cleanNome, telefone);
    const dt = data || new Date().toISOString();
    const valNum = Math.max(0, Number(valor) || 0);

    if (!cli) {
      cli = {
        id: 'cli_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        nome: cleanNome,
        telefone: String(telefone || '').trim(),
        endereco: String(endereco || '').trim(),
        totalGasto: valNum,
        qtdPedidos: 1,
        ultimaCompra: dt,
        anotacoes: String(obs || '').trim(),
        tags: []
      };
      state.clientes.unshift(cli);
    } else {
      if (cleanNome.length > (cli.nome || '').length) cli.nome = cleanNome;
      if (telefone && !cli.telefone) cli.telefone = String(telefone).trim();
      if (endereco && !cli.endereco) cli.endereco = String(endereco).trim();
      cli.totalGasto = Number(cli.totalGasto || 0) + valNum;
      cli.qtdPedidos = Number(cli.qtdPedidos || 0) + 1;
      if (!cli.ultimaCompra || String(dt) > String(cli.ultimaCompra)) {
        cli.ultimaCompra = dt;
      }
    }
    if (!skipSave) saveState();
    return cli;
  }

  function backfillClientesFromHistory() {
    if (Array.isArray(state.clientes) && state.clientes.length > 0) return;
    state.clientes = [];
    const ops = [
      ...(state.vendas || []).filter(v => !v.estornada).map(v => ({
        nome: v.cliente, telefone: v.telefone, endereco: v.endereco,
        valor: v.valorTotal, data: v.data, obs: v.obs
      })),
      ...(state.encomendas || []).filter(e => !e.vendaId && e.status !== 'cancelado').map(e => ({
        nome: e.cliente, telefone: e.telefone, endereco: e.endereco,
        valor: e.valorTotal, data: e.data, obs: e.obs
      }))
    ];
    ops.forEach(op => upsertClienteFromOperacao(op, true));
  }

  function renderClientHistoryBanner(nome, bannerId) {
    const el = document.getElementById(bannerId);
    if (!el) return;
    const cli = findClienteRecord(nome);
    if (!cli) {
      el.style.display = 'none';
      el.innerHTML = '';
      return;
    }
    const ult = cli.ultimaCompra ? new Date(cli.ultimaCompra).toLocaleDateString('pt-BR') : '-';
    const tagsHtml = (cli.tags || []).map(t => `<span style="background:#134e4a;color:#5eead4;padding:1px 6px;border-radius:99px;font-size:10px;margin-left:4px;">${escapeHtml(t)}</span>`).join('');
    el.style.display = 'block';
    el.innerHTML = `👤 <b>${escapeHtml(cli.nome)}</b>${tagsHtml} · <b>${cli.qtdPedidos || 0}</b> pedido(s) · Total: <b>${formatBRL(cli.totalGasto || 0)}</b> · Última: ${ult}${cli.anotacoes ? `<div style="margin-top:3px;color:#cbd5e1;font-size:11px;">📝 ${escapeHtml(cli.anotacoes)}</div>` : ''}`;
  }

  /**
   * Calcula a disponibilidade real de um produto em BH cruzando:
   * - estoqueBH (físico atual)
   * - reservado (encomendas com status pendente ou pedido_ao_fornecedor)
   * - chegando (pedidos em trânsito)
   */
  function getDisponibilidade(produtoId) {
    const pid = Number(produtoId);
    const estoqueBH = Math.max(0, Number((state.meuEstoque || {})[pid] || 0));

    let reservado = 0;
    const reservasDetalhes = [];
    (state.encomendas || []).forEach(enc => {
      if (enc.status !== 'pendente' && enc.status !== 'pedido_ao_fornecedor') return;
      getEncomendaItens(enc).forEach(it => {
        if (Number(it.produtoId) === pid) {
          const q = Math.max(0, Number(it.qtd) || 0);
          if (q > 0) {
            reservado += q;
            reservasDetalhes.push({
              encId: enc.id,
              cliente: enc.cliente || 'Cliente',
              telefone: enc.telefone || '',
              qtd: q,
              status: enc.status,
              data: enc.data || ''
            });
          }
        }
      });
    });

    let chegando = 0;
    const transitoDetalhes = [];
    (state.pedidosTransito || []).forEach(ped => {
      if (ped.status !== 'em_transito') return;
      (ped.itens || []).forEach(it => {
        if (Number(it.id_catalogo) === pid) {
          const q = Math.max(0, Number(it.qtd) || 0);
          if (q > 0) {
            chegando += q;
            transitoDetalhes.push({
              pedidoId: ped.id,
              data: ped.data_compra || '',
              qtd: q
            });
          }
        }
      });
    });

    const disponivel = Math.max(0, estoqueBH - reservado);
    let status = 'encomenda';
    if (disponivel > 0) status = 'pronta';
    else if (reservado > 0) status = 'reservado';
    else if (chegando > 0) status = 'chegando';

    return { estoqueBH, reservado, chegando, disponivel, status, reservasDetalhes, transitoDetalhes };
  }

  function getDisponibilidadeTotals() {
    let pronta = 0;
    let reservado = 0;
    let chegando = 0;
    let pedirFornecedor = 0;

    const estoque = state.meuEstoque || {};
    const idsComMovimento = new Set(Object.keys(estoque).map(Number));
    (state.encomendas || []).forEach(e => {
      if (e.status === 'pendente' || e.status === 'pedido_ao_fornecedor') {
        getEncomendaItens(e).forEach(it => {
          idsComMovimento.add(Number(it.produtoId));
          if (e.status === 'pendente') pedirFornecedor += Number(it.qtd) || 0;
        });
      }
    });
    (state.pedidosTransito || []).forEach(p => {
      if (p.status === 'em_transito') {
        (p.itens || []).forEach(it => idsComMovimento.add(Number(it.id_catalogo)));
      }
    });

    idsComMovimento.forEach(pid => {
      const d = getDisponibilidade(pid);
      pronta += d.disponivel;
      reservado += d.reservado;
      chegando += d.chegando;
    });

    return { pronta, reservado, chegando, pedirFornecedor };
  }

  function getFilteredProducts() {
    const q = normalizeSearchText(state.search.trim());
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
        if (state.stockFilter === 'margem_baixa' && p.margemAplicada >= 20) return false;
        if (state.stockFilter === 'margem_negativa' && p.margemAplicada >= 0) return false;

        if (state.branchFilter === 'cde' && p.cde <= 0) return false;
        if (state.branchFilter === 'pj' && p.pj <= 0) return false;
        if (state.branchFilter === 'sg' && p.sg <= 0) return false;
      }
      if (state.stockFilter === 'disponivel_agora' && getDisponibilidade(p.id).disponivel <= 0) return false;
      if (state.stockFilter === 'reservado_clientes' && getDisponibilidade(p.id).reservado <= 0) return false;

      if (state.minMarginFilter !== null && state.minMarginFilter !== undefined) {
        if (p.margemAplicada < Number(state.minMarginFilter)) return false;
      }

      if (q) {
        const hay = searchIndexMap.get(p.id) || normalizeSearchText(`${p.id} shape-${p.id} ${p.nombre || ''} ${p.marca || ''} ${p.composicion || ''} ${p.categoria || ''} ${p.desc || ''}`);
        const tokens = q.split(/\s+/).filter(Boolean);
        for (const t of tokens) {
          if (!hay.includes(t)) {
            const syns = GYM_SYNONYMS[t];
            if (!syns || !syns.some(s => hay.includes(s))) return false;
          }
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
    const vendasAtivas = (state.vendas || []).filter(v => !v.estornada);
    if (badgeVendas) badgeVendas.textContent = vendasAtivas.length;

    const pedidosTransito = (state.pedidosTransito || []).filter(p => p.status === 'em_transito');
    const totalItensTransito = pedidosTransito.reduce((acc, ped) => {
      return acc + (ped.itens || []).reduce((s, it) => s + (Number(it.qtd) || 0), 0);
    }, 0);
    const badgeTransito = document.getElementById('countTransitoBadge');
    if (badgeTransito) badgeTransito.textContent = totalItensTransito;

    const badgeEncomendas = document.getElementById('countEncomendasBadge');
    const encPendentes = (state.encomendas || []).filter(e => e.status === 'pendente');
    if (badgeEncomendas) badgeEncomendas.textContent = encPendentes.length;

    const bhPanel = document.getElementById('bhExecutivePanel');
    const pyFilters = ['subCatSelect', 'brandSelect', 'stockSelect', 'branchSelect'];

    const lbl1 = document.getElementById('kpiLabel1');
    const lbl2 = document.getElementById('kpiLabel2');
    const lbl3 = document.getElementById('kpiLabel3');
    const lbl4 = document.getElementById('kpiLabel4');

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

      const vendasFaturado = vendasAtivas.reduce((s, v) => s + (Number(v.valorTotal) || 0), 0);
      const vendasLucro = vendasAtivas.reduce((s, v) => s + (Number(v.lucro) || 0), 0);

      if (document.getElementById('bhPanelEmMaosValor')) {
        document.getElementById('bhPanelEmMaosValor').textContent = `${formatBRL(totalVenda)} (PIX)`;
        document.getElementById('bhPanelEmMaosSub').textContent = `${totalItens} un · Cartão: ${formatBRL(totalCartao)}`;
        document.getElementById('bhPanelTransitoValor').textContent = `${formatBRL(transitoVendaPix)} (PIX)`;
        document.getElementById('bhPanelTransitoSub').textContent = `${totalItensTransito} un · Pago: ${formatBRL(transitoInvestido)}`;
        document.getElementById('bhPanelVendasValor').textContent = formatBRL(vendasFaturado);
        document.getElementById('bhPanelVendasSub').textContent = `${vendasAtivas.length} vendas · Lucro: +${formatBRL(vendasLucro)}`;
        document.getElementById('bhPanelTotalPotencial').textContent = formatBRL(totalVenda + transitoVendaPix);
        document.getElementById('bhPanelTotalLucro').textContent = `${totalItens + totalItensTransito} unidades · Lucro Previsto: +${formatBRL(totalLucro + transitoLucro)}`;
      }

      renderDosesFrascos();

      if (lbl1) lbl1.textContent = 'Estoque Físico BH';
      if (lbl2) lbl2.textContent = 'Capital em Mãos (Custo)';
      if (lbl3) lbl3.textContent = 'Faturamento em Mãos (PIX)';
      if (lbl4) lbl4.textContent = 'Lucro Líquido em Mãos';

      document.getElementById('kpiCount').textContent = `${totalItens} unidades`;
      document.getElementById('kpiCountSub').textContent = `${filtered.length} SKUs em mãos (Pronta Entrega)`;
      document.getElementById('kpiMult').textContent = formatBRL(totalCusto);
      document.getElementById('kpiMultSub').textContent = `Capital Investido no Estoque`;
      document.getElementById('kpiAvgPrice').textContent = formatBRL(totalVenda);
      document.getElementById('kpiAvgCost').textContent = `No Cartão: ${formatBRL(totalCartao)}`;
      document.getElementById('kpiAvgProfit').textContent = formatBRL(totalLucro);
      document.getElementById('kpiAvgProfitSub').textContent = `Lucro Líquido Projetado no Bolso`;
      return;
    }

    if (bhPanel) bhPanel.style.display = 'none';
    pyFilters.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = '';
    });

    if (lbl1) lbl1.textContent = 'Produtos Filtrados';
    if (lbl2) lbl2.textContent = 'Multiplicador de Custo';
    if (lbl3) lbl3.textContent = 'Ticket Médio de Venda';
    if (lbl4) lbl4.textContent = 'Lucro Líquido Médio / Un';

    const withStock = filtered.filter(p => p.stockTotal > 0);
    const avgCost = withStock.length ? withStock.reduce((s, p) => s + p.custo, 0) / withStock.length : 0;
    const avgPrice = withStock.length ? withStock.reduce((s, p) => s + p.precoFinal, 0) / withStock.length : 0;
    const avgProfit = withStock.length ? withStock.reduce((s, p) => s + p.lucroFinal, 0) / withStock.length : 0;
    const mult = (state.cotacao * (1 + state.fretePct / 100)).toFixed(2);
    let cotacaoAlerta = '';
    if (state.cotacaoAtualizadaEm) {
      const diffDias = Math.floor((Date.now() - new Date(state.cotacaoAtualizadaEm).getTime()) / 86400000);
      if (diffDias >= 3) cotacaoAlerta = ` · ⚠️ Cotação há ${diffDias}d`;
    }

    document.getElementById('kpiCount').textContent = `${filtered.length} SKUs`;
    document.getElementById('kpiCountSub').textContent = `${withStock.length} com estoque imediato`;
    document.getElementById('kpiMult').textContent = `R$ ${mult}`;
    document.getElementById('kpiMultSub').textContent = `Dólar R$ ${state.cotacao.toFixed(2)} + ${state.fretePct}% frete${cotacaoAlerta}`;
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

    const visible = filtered.slice(0, renderLimit);
    const hasMore = filtered.length > renderLimit;
    const loadMoreBtnHtml = hasMore
      ? `<div id="scrollSentinel" style="grid-column:1 / -1; display:flex; justify-content:center; padding:18px 0;">
           <button class="btn btn-primary" style="padding:10px 22px; font-weight:800;" onclick="window.CRM.loadMore()">Carregar mais (${filtered.length - renderLimit} restantes)</button>
         </div>`
      : '';

    if (state.viewMode === 'grid') {
      container.className = 'product-grid';
      container.innerHTML = visible.map(p => {
        const meuQtd = Number((state.meuEstoque || {})[p.id] || 0);
        const hasAnyStock = p.stockTotal > 0 || meuQtd > 0;
        const stockBadgeLabel = (meuQtd > 0 && p.stockTotal > 0)
          ? `EST: ${p.stockTotal} · BH: ${meuQtd}`
          : (meuQtd > 0)
            ? `📍 PRONTA ENTREGA BH: ${meuQtd}`
            : (p.stockTotal > 0 ? `EST: ${p.stockTotal}` : 'SEM ESTOQUE');

        const imgHtml = p.localFoto
          ? `<img src="${p.localFoto}" loading="lazy" alt="${p.nombre}" onerror="if(this.src!=='${p.remoteFoto}'){this.src='${p.remoteFoto}';}else{this.parentElement.innerHTML='<div class=\\'p-placeholder\\'>🧬<br><small>${p.marca || 'SHAPE'}</small></div>';}">`
          : `<div class="p-placeholder"><span style="font-size:28px;">💊</span><small style="margin-top:6px;">${(p.marca || 'SHAPE TOTAL').toUpperCase()}</small></div>`;

        return `
          <div class="p-card ${!hasAnyStock ? 'no-stock' : ''}" data-id="${p.id}">
            <div class="p-media" onclick="window.CRM.openEditModal(${p.id})">
              ${imgHtml}
              <div class="p-badges">
                <span class="badge badge-cat">${p.categoria || 'geral'}</span>
                <span class="badge ${hasAnyStock ? 'badge-stock-ok' : 'badge-stock-zero'}">
                  ${stockBadgeLabel}
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

              ${(() => {
                const disp = getDisponibilidade(p.id);
                if (disp.disponivel === 0 && disp.reservado === 0 && disp.chegando === 0) {
                  return `<div class="p-disp-row internal-only"><span class="disp-pill disp-gray">⚪ Só encomenda</span></div>`;
                }
                return `<div class="p-disp-row internal-only">
                  <span class="disp-pill ${disp.disponivel > 0 ? 'disp-green' : 'disp-gray'}" title="Estoque livre em BH para prometer agora">🟢 ${disp.disponivel} disponível</span>
                  ${disp.reservado > 0 ? `<button type="button" class="disp-pill disp-amber" onclick="event.stopPropagation(); window.CRM.openDispDetalhesModal(${p.id}, 'reservado')">🟡 ${disp.reservado} reservado</button>` : ''}
                  ${disp.chegando > 0 ? `<button type="button" class="disp-pill disp-blue" onclick="event.stopPropagation(); window.CRM.openDispDetalhesModal(${p.id}, 'chegando')">🔵 ${disp.chegando} chegando</button>` : ''}
                </div>`;
              })()}

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
                  <div class="card-val">Cartão: ${formatBRLInt(p.precoCartao)} <span style="font-size:10px; color:#38bdf8; font-weight:700;">(${isGlpProduct(p) ? 'em até 12x s/ juros' : 'em até 6x'})</span></div>
                </div>
                <div style="text-align:right">
                  <div class="final-val">${formatBRLInt(p.precoFinal)}</div>
                  <div class="t-profit internal-only" style="${p.margemAplicada < 0 ? 'color:#f87171;font-weight:800;' : (p.margemAplicada < 20 ? 'color:#fbbf24;font-weight:700;' : '')}">
                    ${p.margemAplicada < 0 ? '🚨 PREJUÍZO' : (p.margemAplicada < 20 ? '⚠️ Margem Baixa:' : 'Lucro Líq:')} ${formatBRL(p.lucroFinal)} (${p.margemAplicada}%)
                  </div>
                  ${(state.frascosDoses && state.frascosDoses[p.id] && Number(state.frascosDoses[p.id].mgRestante) <= 24)
                    ? `<div class="internal-only" style="font-size:10px;color:#e879f9;font-weight:800;margin-top:2px;">💉 Frasco acabando: ${state.frascosDoses[p.id].mgRestante} mg (&lt;20%)</div>`
                    : ''}
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
                <button class="btn internal-only" style="background:#312e81; color:#c7d2fe; font-weight:700; border:1px solid #4338ca;" title="Registrar encomenda deste produto para cliente" onclick="window.CRM.openNovaEncomendaModal(${p.id})">📝 Encomendar</button>
                <button class="btn internal-only" style="background:#064e3b; color:#a7f3d0; font-weight:700; border:1px solid #059669;" title="Adicionar este produto ao pedido do fornecedor no Paraguai" onclick="window.CRM.adicionarAoPedidoFornecedor(${p.id})">🇵🇾 Pedir PY</button>
                <button class="btn" onclick="window.CRM.copySingleWhatsApp(${p.id})">📲 Copiar Linha</button>
                <button class="btn internal-only" title="Editar preço/descrição" onclick="window.CRM.openEditModal(${p.id})">✏️</button>
              </div>
            </div>
          </div>
        `;
      }).join('') + loadMoreBtnHtml;
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
            ${visible.map(p => `
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
                    <button class="btn internal-only" style="background:#312e81; color:#c7d2fe; font-weight:700; border:1px solid #4338ca;" title="Cadastrar Encomenda p/ Cliente" onclick="window.CRM.openNovaEncomendaModal(${p.id})">📝</button>
                    <button class="btn btn-primary" onclick="window.CRM.addToCart(${p.id})">➕</button>
                    <button class="btn" onclick="window.CRM.copySingleWhatsApp(${p.id})">📲</button>
                    <button class="btn internal-only" onclick="window.CRM.openEditModal(${p.id})">✏️</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        ${loadMoreBtnHtml}
      `;
    }

    // Virtualização progressiva: carrega próximo bloco automaticamente ao rolar perto do fim da lista
    if (scrollObserver) {
      scrollObserver.disconnect();
      scrollObserver = null;
    }
    const sentinel = document.getElementById('scrollSentinel');
    if (sentinel && hasMore && typeof IntersectionObserver !== 'undefined') {
      scrollObserver = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting)) {
          scrollObserver.disconnect();
          renderLimit += 60;
          renderProducts(filtered);
        }
      }, { rootMargin: '320px' });
      scrollObserver.observe(sentinel);
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
              <div style="display:flex; justify-content:space-between; font-size:10px; color:#64748b; margin-top:4px;">
                <span>Aplicado no frasco: <b style="color:#cbd5e1;">${Number(doseState.totalAplicadasMg || 0)} mg</b></span>
                ${Number(doseState.perdaMg || 0) > 0 ? `<span style="color:#f87171;">Sobra/Perda acum.: ${Number(doseState.perdaMg)} mg</span>` : `<span>Capacidade: ${totalMg} mg</span>`}
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
          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #1e293b; padding-top:8px; margin-top:4px; flex-wrap:wrap; gap:6px;">
            <button class="btn" style="font-size:11px; color:#38bdf8; padding:4px 8px;" onclick="window.CRM.openDoseImageModal(${id})">
              🔍 Ver Tabela Oficial
            </button>
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <button class="btn" style="font-size:10px; color:#cbd5e1; background:#1e293b; padding:4px 8px;" title="Ajustar manualmente os mg restantes do frasco em uso" onclick="window.CRM.ajustarSaldoFrascoDose(${id})">
                ✏️ Ajustar mg
              </button>
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

  function updateTabCounts() {
    const counts = {
      todas: rawCatalog.length,
      anabolizantes: 0,
      emagrecedores: 0,
      peptideos: 0,
      estetico_outros: 0,
      saude_mental: 0,
      meu_estoque: 0,
      operacao_dia: 0
    };
    const estoque = state.meuEstoque || {};
    rawCatalog.forEach(p => {
      if (p.colecao_id === '2_anabolizantes') counts.anabolizantes++;
      else if (p.colecao_id === '1_emagrecedores') counts.emagrecedores++;
      else if (p.colecao_id === '3_hgh_peptideos') counts.peptideos++;
      else if (p.colecao_id === '4_estetica') counts.estetico_outros++;
      else if (p.colecao_id === '5_saude_mental_suporte') counts.saude_mental++;
      else {
        const c = (p.categoria || '').toLowerCase();
        const txt = ((p.nombre || '') + ' ' + (p.composicion || '')).toLowerCase();
        if (c === 'anabolizante' || c === 'sarms' || c === 'post ciclo' || c === 'hcg') counts.anabolizantes++;
        else if (c === 'emagrecedores' || c === 'queimador') counts.emagrecedores++;
        else if (c === 'saude mental' || txt.includes('semax') || txt.includes('selank') || txt.includes('cbl') || txt.includes('dsip')) counts.saude_mental++;
        else if (c === 'peptideo' || c === 'hgh' || Boolean(p.desc_comercial)) counts.peptideos++;
        else counts.estetico_outros++;
      }
      const qBh = Number(estoque[p.id] || 0);
      if (qBh > 0) counts.meu_estoque += qBh;
    });
    const avisarHojeCount = (state.encomendas || []).filter(e => e.status === 'chegou_bh').length;
    const pedFornecedorCount = (state.encomendas || []).filter(e => e.status === 'pendente').length;
    counts.operacao_dia = avisarHojeCount + pedFornecedorCount;
    document.querySelectorAll('.group-tab').forEach(tab => {
      const grp = tab.getAttribute('data-group');
      const badge = tab.querySelector('.tab-count');
      if (badge && Object.prototype.hasOwnProperty.call(counts, grp)) {
        badge.textContent = String(counts[grp]);
      }
    });
  }

  function renderDecisionStrip() {
    const elLucroMes = document.getElementById('decLucroMes');
    if (!elLucroMes) return;
    const now = new Date();
    const mesAtual = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const vendasAtivas = (state.vendas || []).filter(v => !v.estornada);
    const lucroMes = vendasAtivas
      .filter(v => String(v.data || '').startsWith(mesAtual))
      .reduce((s, v) => s + (Number(v.lucro) || 0), 0);
    const aReceber = vendasAtivas
      .filter(v => v.statusPagamento === 'pendente')
      .reduce((s, v) => s + (Number(v.valorTotal) || 0), 0);
    const estoque = state.meuEstoque || {};
    const estoqueBaixo = Object.values(estoque).filter(q => Number(q) === 1).length;
    const frascoBaixo = Object.values(state.frascosDoses || {}).filter(f => f && Number(f.mgRestante) <= 24).length;
    const margemBaixa = rawCatalog.reduce((acc, r) => acc + (computeProduct(r).margemAplicada < 20 ? 1 : 0), 0);

    elLucroMes.textContent = formatBRL(lucroMes);
    const elReceber = document.getElementById('decAReceber');
    if (elReceber) elReceber.textContent = formatBRL(aReceber);
    const elEst = document.getElementById('decEstoqueBaixo');
    if (elEst) elEst.textContent = String(estoqueBaixo);
    const elFr = document.getElementById('decFrascoBaixo');
    if (elFr) elFr.textContent = String(frascoBaixo);
    const elMb = document.getElementById('decMargemBaixa');
    if (elMb) elMb.textContent = String(margemBaixa);
  }

  const PRESET_FILTERS = [
    { id: 'glp_estoque', nome: '🔥 GLP-1 c/ Estoque', mainGroup: 'emagrecedores', stockFilter: 'com_estoque', search: 'tirzepatida' },
    { id: 'bh_pronta', nome: '📍 Pronta Entrega BH', mainGroup: 'meu_estoque', stockFilter: 'todos', search: '' },
    { id: 'anabo_alta', nome: '💪 Anabolizantes Margem >=35%', mainGroup: 'anabolizantes', stockFilter: 'com_estoque', minMarginFilter: 35, search: '' },
    { id: 'margem_baixa', nome: '⚠️ Margem <20%', mainGroup: 'todas', stockFilter: 'margem_baixa', search: '' }
  ];

  function renderSavedFilters() {
    const bar = document.getElementById('savedFiltersBar');
    if (!bar) return;
    const customChips = (state.savedFilters || []).map((f, idx) => `
      <span style="display:inline-flex;align-items:center;gap:4px;background:#1e293b;border:1px solid #475569;border-radius:99px;padding:3px 10px;font-size:11px;color:#e2e8f0;">
        <button type="button" style="background:none;border:none;color:inherit;font-weight:700;cursor:pointer;padding:0;" onclick="window.CRM.applySavedFilter('custom_${idx}')">⭐ ${escapeHtml(f.nome)}</button>
        <button type="button" style="background:none;border:none;color:#f87171;cursor:pointer;padding:0;font-size:11px;" title="Remover filtro" onclick="window.CRM.deleteSavedFilter(${idx})">✖</button>
      </span>
    `).join('');

    const presetChips = PRESET_FILTERS.map(f => `
      <button type="button" class="btn" style="padding:4px 10px;font-size:11px;border-radius:99px;background:#0f172a;border:1px solid #334155;color:#cbd5e1;" onclick="window.CRM.applySavedFilter('${f.id}')">${f.nome}</button>
    `).join('');

    bar.innerHTML = `
      <span style="font-size:11px;color:#94a3b8;font-weight:700;margin-right:2px;">Filtros:</span>
      ${presetChips}
      ${customChips}
      <button type="button" class="btn" style="padding:4px 10px;font-size:11px;border-radius:99px;background:#1e1b4b;border:1px solid #4f46e5;color:#c7d2fe;" onclick="window.CRM.saveCurrentFilter()">⭐ Salvar Atual</button>
    `;
  }

  function renderDispStatusStrip() {
    const totals = getDisponibilidadeTotals();
    const elPronta = document.getElementById('statDispPronta');
    const elRes = document.getElementById('statDispReservado');
    const elCheg = document.getElementById('statDispChegando');
    const elPedir = document.getElementById('statDispPedir');
    if (elPronta) elPronta.textContent = String(totals.pronta);
    if (elRes) elRes.textContent = String(totals.reservado);
    if (elCheg) elCheg.textContent = String(totals.chegando);
    if (elPedir) elPedir.textContent = String(totals.pedirFornecedor);
  }

  function renderOperacaoDia() {
    const cont = document.getElementById('operacaoDiaContainer');
    if (!cont) return;

    // 1. Disponível agora
    const disponiveis = rawCatalog
      .map(computeProduct)
      .map(p => ({ p, disp: getDisponibilidade(p.id) }))
      .filter(x => x.disp.disponivel > 0)
      .sort((a, b) => b.disp.disponivel - a.disp.disponivel);

    // 2. Aguardando pedido ao fornecedor (pendente)
    const pedirMap = new Map();
    (state.encomendas || []).filter(e => e.status === 'pendente').forEach(e => {
      getEncomendaItens(e).forEach(it => {
        const pid = Number(it.produtoId);
        const cur = pedirMap.get(pid) || { produtoId: pid, nome: it.produtoNome, qtd: 0, clientes: [] };
        cur.qtd += Number(it.qtd) || 0;
        cur.clientes.push(e.cliente);
        pedirMap.set(pid, cur);
      });
    });
    const aguardandoPedir = Array.from(pedirMap.values());

    // 3. Chegando no trânsito
    const chegandoList = [];
    (state.pedidosTransito || []).filter(ped => ped.status === 'em_transito').forEach(ped => {
      (ped.itens || []).forEach(it => {
        const disp = getDisponibilidade(it.id_catalogo);
        chegandoList.push({
          pedidoId: ped.id,
          data: ped.data_compra,
          produtoId: it.id_catalogo,
          nome: it.nome,
          qtd: it.qtd,
          clientesAguardando: disp.reservasDetalhes.length
        });
      });
    });

    // 4. Clientes para avisar hoje (encomendas que chegaram em BH)
    const avisarClientes = (state.encomendas || []).filter(e => e.status === 'chegou_bh');

    cont.innerHTML = `
      <div class="op-dia-grid">
        <div class="op-dia-card" style="border-color:rgba(16,185,129,0.4);">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <b style="color:#10b981;font-size:14px;">🟢 Disponível Agora (${disponiveis.length} SKUs)</b>
            <button class="btn" style="font-size:11px;padding:3px 8px;" onclick="window.CRM.filterByDisponibilidade('disponivel_agora')">Ver no catálogo</button>
          </div>
          <div class="op-dia-list">
            ${disponiveis.length ? disponiveis.map(({ p, disp }) => `
              <div style="background:#0b1120;padding:8px 10px;border-radius:8px;border:1px solid #1e293b;display:flex;justify-content:space-between;align-items:center;gap:8px;">
                <div>
                  <div style="font-size:12px;font-weight:700;color:#fff;">${escapeHtml(p.nombre)}</div>
                  <div style="font-size:11px;color:#10b981;">🟢 ${disp.disponivel} livre${disp.reservado > 0 ? ` · <span style="color:#f59e0b;">🟡 ${disp.reservado} res.</span>` : ''} · PIX ${formatBRLInt(p.precoFinal)}</div>
                </div>
                <button class="btn btn-green" style="padding:5px 10px;font-size:11px;font-weight:800;" onclick="window.CRM.openSaleModal(${p.id})">⚡ Vender</button>
              </div>
            `).join('') : '<div style="color:var(--text-muted);font-size:12px;">Nenhum item livre em BH no momento.</div>'}
          </div>
        </div>

        <div class="op-dia-card" style="border-color:rgba(245,158,11,0.4);">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <b style="color:#f59e0b;font-size:14px;">📦 Aguardando Pedido ao Fornecedor (${aguardandoPedir.length})</b>
            <button class="btn" style="font-size:11px;padding:3px 8px;background:#4f46e5;color:#fff;" onclick="window.CRM.openPedidoFornecedorModal(); window.CRM.carregarEncomendasClientesNoPedidoFornecedor();">🇵🇾 Puxar p/ Pedido</button>
          </div>
          <div class="op-dia-list">
            ${aguardandoPedir.length ? aguardandoPedir.map(x => `
              <div style="background:#0b1120;padding:8px 10px;border-radius:8px;border:1px solid #1e293b;display:flex;justify-content:space-between;align-items:center;gap:8px;">
                <div>
                  <div style="font-size:12px;font-weight:700;color:#fff;">${x.qtd}x ${escapeHtml(x.nome)}</div>
                  <div style="font-size:11px;color:#94a3b8;">Clientes: ${x.clientes.map(c => escapeHtml(c)).join(', ')}</div>
                </div>
                <button class="btn" style="font-size:11px;padding:4px 8px;" onclick="window.CRM.openEncomendasModal()">Abrir</button>
              </div>
            `).join('') : '<div style="color:var(--text-muted);font-size:12px;">Tudo em dia! Nenhuma encomenda pendente de compra.</div>'}
          </div>
        </div>

        <div class="op-dia-card" style="border-color:rgba(59,130,246,0.4);">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <b style="color:#3b82f6;font-size:14px;">🔵 Chegando no Trânsito (${chegandoList.length} itens)</b>
            <button class="btn" style="font-size:11px;padding:3px 8px;" onclick="window.CRM.openTransitoModal()">Abrir Trânsito</button>
          </div>
          <div class="op-dia-list">
            ${chegandoList.length ? chegandoList.map(c => `
              <div style="background:#0b1120;padding:8px 10px;border-radius:8px;border:1px solid #1e293b;display:flex;justify-content:space-between;align-items:center;gap:8px;">
                <div>
                  <div style="font-size:12px;font-weight:700;color:#fff;">${c.qtd}x ${escapeHtml(c.nome)}</div>
                  <div style="font-size:11px;color:#94a3b8;">#${c.pedidoId} · ${c.data}${c.clientesAguardando > 0 ? ` · <b style="color:#f59e0b;">${c.clientesAguardando} cliente(s) aguardando</b>` : ''}</div>
                </div>
                <button class="btn btn-green" style="font-size:11px;padding:4px 8px;" onclick="window.CRM.confirmarChegadaPedido('${c.pedidoId}')">📦 Chegou</button>
              </div>
            `).join('') : '<div style="color:var(--text-muted);font-size:12px;">Nenhuma carga em trânsito.</div>'}
          </div>
        </div>

        <div class="op-dia-card" style="border-color:rgba(168,85,247,0.4);">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <b style="color:#c084fc;font-size:14px;">📲 Clientes para Avisar Hoje (${avisarClientes.length})</b>
          </div>
          <div class="op-dia-list">
            ${avisarClientes.length ? avisarClientes.map(e => `
              <div style="background:#0b1120;padding:8px 10px;border-radius:8px;border:1px solid #1e293b;display:flex;justify-content:space-between;align-items:center;gap:8px;">
                <div>
                  <div style="font-size:12px;font-weight:700;color:#fff;">${escapeHtml(e.cliente)} · ${escapeHtml(e.produtoNome)}</div>
                  <div style="font-size:11px;color:#34d399;">Chegou em BH! ${e.telefone ? escapeHtml(e.telefone) : 'Sem telefone'}</div>
                </div>
                <button class="btn btn-green" style="font-size:11px;padding:4px 8px;" onclick="window.CRM.avisarClienteChegada('${esc(String(e.id))}')">📲 Avisar</button>
              </div>
            `).join('') : '<div style="color:var(--text-muted);font-size:12px;">Nenhum cliente aguardando aviso de chegada.</div>'}
          </div>
        </div>
      </div>
    `;
  }

  function renderAll() {
    updateTabCounts();
    renderDecisionStrip();
    renderDispStatusStrip();
    renderSavedFilters();
    const cliBadge = document.getElementById('countClientesBadge');
    if (cliBadge) cliBadge.textContent = String((state.clientes || []).length);

    const opCont = document.getElementById('operacaoDiaContainer');
    const prodCont = document.getElementById('productsContainer');
    if (state.mainGroup === 'operacao_dia') {
      if (opCont) opCont.style.display = 'block';
      if (prodCont) prodCont.style.display = 'none';
      renderOperacaoDia();
      return;
    }
    if (opCont) opCont.style.display = 'none';
    if (prodCont) prodCont.style.display = '';

    const filtered = getFilteredProducts();
    renderKPIs(filtered);
    renderProducts(filtered);
    renderCartBar();
  }

  // Public actions
  window.CRM = {

    async checkPassword() {
      const input = document.getElementById('authInput');
      const err = document.getElementById('authError');
      const val = (input.value || '').trim();
      if (!val) {
        err.style.display = 'block';
        input.select();
        return;
      }

      const validHashes = [...VALID_PASS_HASHES];
      const legacyCustom = localStorage.getItem('ST_CUSTOM_PASS');
      if (legacyCustom) {
        const migratedHash = await hashPass(legacyCustom);
        localStorage.setItem('ST_CUSTOM_HASH', migratedHash);
        localStorage.removeItem('ST_CUSTOM_PASS');
      }
      const customHash = localStorage.getItem('ST_CUSTOM_HASH');
      if (customHash) validHashes.push(customHash);

      const enteredHash = await hashPass(val);
      if (validHashes.includes(enteredHash)) {
        localStorage.setItem('ST_AUTH', 'true');
        sessionStorage.setItem('ST_AUTH', 'true');
        document.getElementById('authOverlay').style.display = 'none';
        err.style.display = 'none';
        input.value = '';
        logAuditoria('login', 'Acesso liberado');
        showToast('Acesso liberado com sucesso!');
      } else {
        err.style.display = 'block';
        input.select();
      }
    },

    async alterarSenhaAcesso() {
      const nova = prompt('Digite a nova senha de acesso personalizada (mínimo 4 caracteres):');
      if (nova === null) return;
      const clean = nova.trim();
      if (clean.length < 4) {
        showToast('Senha muito curta. Use pelo menos 4 caracteres.');
        return;
      }
      const confirmacao = prompt('Confirme a nova senha:');
      if (confirmacao === null || confirmacao.trim() !== clean) {
        showToast('As senhas não conferem. Alteração cancelada.');
        return;
      }
      const hash = await hashPass(clean);
      localStorage.setItem('ST_CUSTOM_HASH', hash);
      localStorage.removeItem('ST_CUSTOM_PASS');
      logAuditoria('alterar_senha', 'Senha personalizada atualizada (SHA-256)');
      showToast('Senha personalizada salva com segurança (SHA-256)!');
    },

    verLogAuditoria() {
      let logs = [];
      try {
        logs = JSON.parse(localStorage.getItem(AUDIT_LOG_KEY) || '[]');
      } catch (e) { logs = []; }
      if (!logs.length) {
        alert('Nenhum registro no log de auditoria ainda.');
        return;
      }
      const texto = logs.slice(0, 30).map((l, idx) => {
        const rawDate = l.data || l.ts;
        const dt = rawDate ? new Date(rawDate).toLocaleString('pt-BR') : '-';
        return `${idx + 1}. [${dt}] ${l.acao}: ${l.detalhe || ''}`;
      }).join('\n');
      alert(`📜 LOG DE AUDITORIA (Últimas ${Math.min(logs.length, 30)} ações)\n\n${texto}`);
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

    filterByGroup(grp) {
      document.querySelectorAll('.group-tab').forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-group') === grp);
      });
      state.mainGroup = grp;
      renderLimit = 120;
      renderAll();
    },

    filterByMargin(val) {
      state.mainGroup = 'todas';
      document.querySelectorAll('.group-tab').forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-group') === 'todas');
      });
      state.stockFilter = val || 'margem_baixa';
      const sel = document.getElementById('stockSelect');
      if (sel) sel.value = state.stockFilter;
      renderLimit = 60;
      renderAll();
    },

    filterByDisponibilidade(val) {
      state.mainGroup = 'todas';
      document.querySelectorAll('.group-tab').forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-group') === 'todas');
      });
      state.stockFilter = val || 'disponivel_agora';
      state.minMarginFilter = null;
      const sel = document.getElementById('stockSelect');
      if (sel) sel.value = state.stockFilter;
      renderLimit = 60;
      renderAll();
    },

    openDispDetalhesModal(produtoId, tipo) {
      const modal = document.getElementById('dispDetalhesModal');
      const titleEl = document.getElementById('dispDetalhesTitulo');
      const bodyEl = document.getElementById('dispDetalhesBody');
      if (!modal || !titleEl || !bodyEl) return;

      const prod = rawCatalog.find(p => Number(p.id) === Number(produtoId));
      const disp = getDisponibilidade(produtoId);
      const nomeProd = prod ? prod.nombre : `Produto #${produtoId}`;

      if (tipo === 'reservado') {
        titleEl.textContent = `🟡 Reservas: ${nomeProd}`;
        bodyEl.innerHTML = disp.reservasDetalhes.length ? disp.reservasDetalhes.map(r => `
          <div style="background:#0f172a;border:1px solid #334155;border-radius:8px;padding:10px;display:flex;justify-content:space-between;align-items:center;">
            <div>
              <b style="color:#fbbf24;">👤 ${escapeHtml(r.cliente)} · ${r.qtd} cx</b>
              <div style="font-size:11px;color:#94a3b8;">Status: ${r.status} ${r.telefone ? `· 📱 ${escapeHtml(r.telefone)}` : ''}</div>
            </div>
            <button class="btn" style="font-size:11px;" onclick="document.getElementById('dispDetalhesModal').classList.remove('open'); window.CRM.openEncomendasModal();">Ver Encomenda</button>
          </div>
        `).join('') : '<div style="color:var(--text-muted);font-size:12px;">Nenhuma reserva ativa.</div>';
      } else {
        titleEl.textContent = `🔵 Em Trânsito: ${nomeProd}`;
        bodyEl.innerHTML = disp.transitoDetalhes.length ? disp.transitoDetalhes.map(t => `
          <div style="background:#0f172a;border:1px solid #334155;border-radius:8px;padding:10px;display:flex;justify-content:space-between;align-items:center;">
            <div>
              <b style="color:#38bdf8;">🚚 Pedido #${escapeHtml(String(t.pedidoId))} · ${t.qtd} un</b>
              <div style="font-size:11px;color:#94a3b8;">Data da compra: ${escapeHtml(t.data)}</div>
            </div>
            <button class="btn" style="font-size:11px;" onclick="document.getElementById('dispDetalhesModal').classList.remove('open'); window.CRM.openTransitoModal();">Abrir Trânsito</button>
          </div>
        `).join('') : '<div style="color:var(--text-muted);font-size:12px;">Nenhum pedido em trânsito para este item.</div>';
      }
      modal.classList.add('open');
    },

    avisarClienteChegada(encId) {
      const enc = (state.encomendas || []).find(e => String(e.id) === String(encId));
      if (!enc) return;
      const itensTxt = getEncomendaItens(enc).map(it => `${it.qtd}x ${it.produtoNome}`).join(', ');
      const msg = `Olá *${enc.cliente}*! Tudo bem? 📦✨\n\nSua encomenda (*${itensTxt}*) acabou de chegar aqui em Belo Horizonte!\n\nPodemos combinar a entrega ou retirada hoje?`;
      const digits = String(enc.telefone || '').replace(/\D/g, '');
      const url = digits.length >= 10
        ? `https://api.whatsapp.com/send?phone=${digits.startsWith('55') ? digits : '55' + digits}&text=${encodeURIComponent(msg)}`
        : `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    },

    avisarClientesPedido(pedidoId) {
      const ped = (state.pedidosTransito || []).find(p => String(p.id) === String(pedidoId));
      if (!ped) return;
      const pids = new Set((ped.itens || []).map(it => Number(it.id_catalogo)));
      const clientesChegou = (state.encomendas || []).filter(e =>
        (e.status === 'chegou_bh' || e.status === 'pendente' || e.status === 'pedido_ao_fornecedor') &&
        getEncomendaItens(e).some(it => pids.has(Number(it.produtoId)))
      );
      if (!clientesChegou.length) {
        showToast('Nenhum cliente com encomenda vinculada a este pedido.');
        return;
      }
      const resumo = clientesChegou.map((e, i) => {
        const itens = getEncomendaItens(e).map(it => `${it.qtd}x ${it.produtoNome}`).join(', ');
        return `${i + 1}. ${e.cliente} (${e.telefone || 'sem tel'}) — ${itens}`;
      }).join('\n');
      if (clientesChegou.length === 1) {
        window.CRM.avisarClienteChegada(clientesChegou[0].id);
        return;
      }
      navigator.clipboard?.writeText(`CLIENTES PARA AVISAR (PEDIDO #${ped.id}):\n${resumo}`);
      alert(`📲 Clientes aguardando itens do pedido #${ped.id} (lista copiada!):\n\n${resumo}\n\nUse o painel "⚡ Operação do Dia" -> "Clientes para Avisar Hoje" para disparar 1 a 1 no WhatsApp.`);
    },

    // =========================================================================
    // ITEM 3: PAINÉIS DE DECISÃO COMERCIAL
    // =========================================================================
    openPaineisComerciaisModal() {
      const modal = document.getElementById('paineisComerciaisModal');
      const body = document.getElementById('paineisComerciaisBody');
      if (!modal || !body) return;

      const now = Date.now();
      const ms30d = 30 * 86400000;
      const ms60d = 60 * 86400000;
      const vendasAtivas = (state.vendas || []).filter(v => !v.estornada);

      // Agrega últimos 30 dias por produtoId
      const stats30d = new Map();
      const lastSaleByPid = new Map();

      vendasAtivas.forEach(v => {
        const dt = v.data ? new Date(v.data).getTime() : 0;
        const itens = (Array.isArray(v.itens) && v.itens.length)
          ? v.itens.map(it => ({ pid: Number(it.produtoId), nome: it.produtoNome, qtd: Number(it.qtd) || 1, valor: Number(it.subtotal) || 0, lucro: Number(v.lucro) / v.itens.length }))
          : [{ pid: Number(v.produtoId), nome: v.produtoNome, qtd: Number(v.qtd) || 1, valor: Number(v.valorTotal) || 0, lucro: Number(v.lucro) || 0 }];

        itens.forEach(it => {
          if (!it.pid) return;
          if (!lastSaleByPid.has(it.pid) || dt > lastSaleByPid.get(it.pid)) {
            lastSaleByPid.set(it.pid, dt);
          }
          if (dt >= now - ms30d) {
            const cur = stats30d.get(it.pid) || { pid: it.pid, nome: it.nome, lucro: 0, qtd: 0, fat: 0 };
            cur.lucro += Number(it.lucro) || 0;
            cur.qtd += Number(it.qtd) || 0;
            cur.fat += Number(it.valor) || 0;
            stats30d.set(it.pid, cur);
          }
        });
      });

      const all30 = Array.from(stats30d.values());
      const top10Lucro = [...all30].sort((a, b) => b.lucro - a.lucro).slice(0, 10);
      const top10Qtd = [...all30].sort((a, b) => b.qtd - a.qtd).slice(0, 10);

      // Produtos parados há > 30 / 60 dias com estoque BH > 0
      const parados = [];
      Object.entries(state.meuEstoque || {}).forEach(([pidStr, qRaw]) => {
        const pid = Number(pidStr);
        const q = Number(qRaw) || 0;
        if (q <= 0) return;
        const lastDt = lastSaleByPid.get(pid) || 0;
        const diasSemVenda = lastDt ? Math.floor((now - lastDt) / 86400000) : 999;
        if (diasSemVenda >= 30) {
          const raw = rawCatalog.find(p => Number(p.id) === pid);
          parados.push({
            pid,
            nome: raw ? raw.nombre : `Produto #${pid}`,
            qtd: q,
            dias: diasSemVenda,
            faixa: diasSemVenda >= 60 ? '60d+' : '30d+'
          });
        }
      });
      parados.sort((a, b) => b.dias - a.dias);

      // Estoque crítico (disponível <= 2 com BH > 0, ou frasco < 20%)
      const criticos = [];
      Object.entries(state.meuEstoque || {}).forEach(([pidStr, qRaw]) => {
        const pid = Number(pidStr);
        if ((Number(qRaw) || 0) <= 0) return;
        const disp = getDisponibilidade(pid);
        if (disp.disponivel <= 2) {
          const raw = rawCatalog.find(p => Number(p.id) === pid);
          criticos.push({
            pid,
            nome: raw ? raw.nombre : `Produto #${pid}`,
            detalhe: `Disp: ${disp.disponivel} (BH: ${disp.estoqueBH})`,
            canSell: disp.disponivel > 0
          });
        }
      });
      Object.entries(state.frascosDoses || {}).forEach(([pidStr, f]) => {
        if (f && Number(f.mgRestante) <= 24) {
          const pid = Number(pidStr);
          const raw = rawCatalog.find(p => Number(p.id) === pid);
          criticos.push({
            pid,
            nome: raw ? raw.nombre : `Frasco #${pid}`,
            detalhe: `💉 Frasco ${f.mgRestante} mg (<20%)`,
            canSell: Number(f.mgRestante) > 0
          });
        }
      });

      const actionBtn = (pid, preferSell = true) => {
        const disp = getDisponibilidade(pid);
        if (preferSell && disp.disponivel > 0) {
          return `<button class="btn btn-green" style="padding:4px 8px;font-size:11px;font-weight:800;" onclick="document.getElementById('paineisComerciaisModal').classList.remove('open'); window.CRM.openSaleModal(${pid});">⚡ Vender</button>`;
        }
        return `<button class="btn" style="padding:4px 8px;font-size:11px;background:#064e3b;color:#a7f3d0;" onclick="window.CRM.adicionarAoPedidoFornecedor(${pid})">🇵🇾 Pedir PY</button>`;
      };

      body.innerHTML = `
        <div class="op-dia-card" style="border-color:rgba(16,185,129,0.4);">
          <b style="color:#10b981;font-size:14px;">🏆 Top 10 por Lucro Líquido (30 dias)</b>
          <div class="op-dia-list">
            ${top10Lucro.length ? top10Lucro.map((x, i) => `
              <div style="background:#0b1120;padding:8px 10px;border-radius:8px;border:1px solid #1e293b;display:flex;justify-content:space-between;align-items:center;gap:8px;">
                <div>
                  <div style="font-size:12px;font-weight:700;color:#fff;">#${i + 1} ${escapeHtml(x.nome)}</div>
                  <div style="font-size:11px;color:#34d399;">Lucro: <b>+${formatBRL(x.lucro)}</b> · ${x.qtd} un</div>
                </div>
                ${actionBtn(x.pid, true)}
              </div>
            `).join('') : '<div style="color:var(--text-muted);font-size:12px;">Sem vendas nos últimos 30 dias.</div>'}
          </div>
        </div>

        <div class="op-dia-card" style="border-color:rgba(56,189,248,0.4);">
          <b style="color:#38bdf8;font-size:14px;">📦 Top 10 por Quantidade Vendida (30 dias)</b>
          <div class="op-dia-list">
            ${top10Qtd.length ? top10Qtd.map((x, i) => `
              <div style="background:#0b1120;padding:8px 10px;border-radius:8px;border:1px solid #1e293b;display:flex;justify-content:space-between;align-items:center;gap:8px;">
                <div>
                  <div style="font-size:12px;font-weight:700;color:#fff;">#${i + 1} ${escapeHtml(x.nome)}</div>
                  <div style="font-size:11px;color:#38bdf8;"><b>${x.qtd} unidades</b> · Fat: ${formatBRL(x.fat)}</div>
                </div>
                ${actionBtn(x.pid, true)}
              </div>
            `).join('') : '<div style="color:var(--text-muted);font-size:12px;">Sem vendas nos últimos 30 dias.</div>'}
          </div>
        </div>

        <div class="op-dia-card" style="border-color:rgba(245,158,11,0.4);">
          <b style="color:#f59e0b;font-size:14px;">🧊 Produtos Parados (30d / 60d+ sem venda)</b>
          <div class="op-dia-list">
            ${parados.length ? parados.map(x => `
              <div style="background:#0b1120;padding:8px 10px;border-radius:8px;border:1px solid #1e293b;display:flex;justify-content:space-between;align-items:center;gap:8px;">
                <div>
                  <div style="font-size:12px;font-weight:700;color:#fff;">${escapeHtml(x.nome)}</div>
                  <div style="font-size:11px;color:#fbbf24;">${x.qtd} un em BH · <b>${x.dias >= 999 ? 'Sem vendas registradas' : `${x.dias}d parado`} (${x.faixa})</b></div>
                </div>
                ${actionBtn(x.pid, true)}
              </div>
            `).join('') : '<div style="color:var(--text-muted);font-size:12px;">Nenhum produto parado em BH!</div>'}
          </div>
        </div>

        <div class="op-dia-card" style="border-color:rgba(239,68,68,0.4);">
          <b style="color:#f87171;font-size:14px;">🚨 Estoque Crítico (≤ 2 un ou Frasco &lt;20%)</b>
          <div class="op-dia-list">
            ${criticos.length ? criticos.map(x => `
              <div style="background:#0b1120;padding:8px 10px;border-radius:8px;border:1px solid #1e293b;display:flex;justify-content:space-between;align-items:center;gap:8px;">
                <div>
                  <div style="font-size:12px;font-weight:700;color:#fff;">${escapeHtml(x.nome)}</div>
                  <div style="font-size:11px;color:#fca5a5;">${x.detalhe}</div>
                </div>
                <div style="display:flex;gap:4px;">
                  ${x.canSell ? `<button class="btn btn-green" style="padding:4px 7px;font-size:11px;" onclick="document.getElementById('paineisComerciaisModal').classList.remove('open'); window.CRM.openSaleModal(${x.pid});">⚡</button>` : ''}
                  <button class="btn" style="padding:4px 8px;font-size:11px;background:#064e3b;color:#a7f3d0;" onclick="window.CRM.adicionarAoPedidoFornecedor(${x.pid})">🇵🇾 Pedir</button>
                </div>
              </div>
            `).join('') : '<div style="color:var(--text-muted);font-size:12px;">Nenhum item em nível crítico.</div>'}
          </div>
        </div>
      `;

      modal.classList.add('open');
    },

    // =========================================================================
    // ITEM 4: VENDA RÁPIDA (BOTÃO FLUTUANTE + FLUXO EM 3 PASSOS)
    // =========================================================================
    _vrState: { productId: null, isDose: false, doseMg: 0 },

    openVendaRapidaModal(productId = null) {
      const modal = document.getElementById('vendaRapidaModal');
      if (!modal) return;
      window.CRM.populateEncClientesDatalist();
      const sInp = document.getElementById('vrSearchInput');
      if (sInp) sInp.value = '';
      ['vrCliente', 'vrTelefone'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      if (productId) {
        window.CRM.selectVendaRapidaProduto(productId);
      } else {
        window.CRM.setVendaRapidaStep(1);
        window.CRM.renderVendaRapidaProdutos();
      }
      modal.classList.add('open');
    },

    setVendaRapidaStep(step) {
      const s1 = document.getElementById('vrStep1');
      const s2 = document.getElementById('vrStep2');
      const s3 = document.getElementById('vrStep3');
      const sub = document.getElementById('vrStepSubtitle');
      if (s1) s1.style.display = step === 1 ? 'block' : 'none';
      if (s2) s2.style.display = step === 2 ? 'block' : 'none';
      if (s3) s3.style.display = step === 3 ? 'block' : 'none';
      if (sub) {
        sub.textContent = step === 1
          ? 'Passo 1 de 3: Escolha o produto disponível'
          : (step === 2 ? 'Passo 2 de 3: Quantidade / Dose e Valor' : 'Passo 3 de 3: Cliente e Pagamento');
      }
    },

    renderVendaRapidaProdutos() {
      const cont = document.getElementById('vrProdList');
      if (!cont) return;
      const q = normalizeSearchText((document.getElementById('vrSearchInput')?.value || '').trim());
      let list = rawCatalog.map(computeProduct).map(p => ({ p, disp: getDisponibilidade(p.id) }));

      if (q) {
        const tokens = q.split(/\s+/).filter(Boolean);
        list = list.filter(({ p }) => {
          const hay = searchIndexMap.get(p.id) || normalizeSearchText(`${p.id} ${p.nombre} ${p.marca} ${p.composicion}`);
          return tokens.every(t => hay.includes(t) || (GYM_SYNONYMS[t] && GYM_SYNONYMS[t].some(s => hay.includes(s))));
        });
      } else {
        list = list.filter(({ disp }) => disp.estoqueBH > 0 || disp.disponivel > 0);
      }

      list.sort((a, b) => b.disp.disponivel - a.disp.disponivel || b.disp.estoqueBH - a.disp.estoqueBH);
      const top = list.slice(0, 35);

      cont.innerHTML = top.length ? top.map(({ p, disp }) => `
        <button type="button" style="text-align:left;background:#0f172a;border:1px solid ${disp.disponivel > 0 ? '#10b981' : '#334155'};border-radius:8px;padding:9px 11px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:8px;" onclick="window.CRM.selectVendaRapidaProduto(${p.id})">
          <div>
            <div style="font-size:12.5px;font-weight:800;color:#fff;">${escapeHtml(p.nombre)}</div>
            <div style="font-size:11px;color:${disp.disponivel > 0 ? '#10b981' : '#94a3b8'};">
              ${disp.disponivel > 0 ? `🟢 ${disp.disponivel} disponível` : `BH: ${disp.estoqueBH} · Res: ${disp.reservado}`}
            </div>
          </div>
          <b style="color:#38bdf8;font-size:13px;white-space:nowrap;">${formatBRLInt(p.precoFinal)}</b>
        </button>
      `).join('') : '<div style="color:var(--text-muted);font-size:12px;text-align:center;padding:20px;">Nenhum produto disponível encontrado.</div>';
    },

    selectVendaRapidaProduto(pid) {
      const raw = rawCatalog.find(x => Number(x.id) === Number(pid));
      if (!raw) return;
      const p = computeProduct(raw);
      const disp = getDisponibilidade(p.id);
      window.CRM._vrState = { productId: p.id, isDose: false, doseMg: 0 };

      const badgeEl = document.getElementById('vrSelectedProdBadge');
      if (badgeEl) {
        badgeEl.innerHTML = `
          <div style="font-size:13px;font-weight:800;color:#fff;">${escapeHtml(p.nombre)}</div>
          <div style="font-size:11px;color:${disp.disponivel > 0 ? '#10b981' : '#f59e0b'};margin-top:2px;">
            🟢 Livre: ${disp.disponivel} · BH: ${disp.estoqueBH}${disp.reservado > 0 ? ` · 🟡 Res: ${disp.reservado}` : ''}
          </div>
        `;
      }

      const doseBox = document.getElementById('vrDoseBox');
      if (doseBox) {
        doseBox.style.display = (p.id === 9005 || p.id === 9006 || TABELA_DOSES_OFICIAIS[p.id]) ? 'block' : 'none';
      }
      document.getElementById('vrQty').value = '1';
      document.getElementById('vrUnitPrice').value = String(Math.round(p.precoFinal));
      window.CRM.updateVendaRapidaTotal();
      window.CRM.setVendaRapidaStep(2);
    },

    setVendaRapidaDose(mg, preco) {
      const pid = window.CRM._vrState.productId;
      const raw = rawCatalog.find(x => Number(x.id) === Number(pid));
      if (!raw) return;
      const p = computeProduct(raw);
      if (mg > 0) {
        window.CRM._vrState.isDose = true;
        window.CRM._vrState.doseMg = mg;
        document.getElementById('vrQty').value = '1';
        document.getElementById('vrUnitPrice').value = String(preco);
      } else {
        window.CRM._vrState.isDose = false;
        window.CRM._vrState.doseMg = 0;
        document.getElementById('vrUnitPrice').value = String(Math.round(p.precoFinal));
      }
      window.CRM.updateVendaRapidaTotal();
    },

    updateVendaRapidaTotal() {
      const qty = Math.max(1, Number(document.getElementById('vrQty')?.value || 1));
      const unit = Math.max(0, Number(document.getElementById('vrUnitPrice')?.value || 0));
      const el = document.getElementById('vrTotalPreview');
      if (el) el.textContent = formatBRL(qty * unit);
    },

    onVrClienteInput(val) {
      const cli = findClienteRecord(val);
      const telEl = document.getElementById('vrTelefone');
      if (cli && telEl && !telEl.value && cli.telefone) {
        telEl.value = cli.telefone;
      }
    },

    confirmVendaRapida() {
      const pid = window.CRM._vrState.productId;
      const raw = rawCatalog.find(x => Number(x.id) === Number(pid));
      if (!raw) return;
      const p = computeProduct(raw);
      const qty = Math.max(1, Number(document.getElementById('vrQty')?.value || 1));
      const unitVal = Math.max(0, Number(document.getElementById('vrUnitPrice')?.value || 0));
      const totalVal = unitVal * qty;
      const cliente = (document.getElementById('vrCliente')?.value || '').trim() || 'Cliente';
      const telefone = (document.getElementById('vrTelefone')?.value || '').trim();
      const pay = document.getElementById('vrPagamento')?.value || 'pix';
      const payStatus = document.getElementById('vrPayStatus')?.value || 'pago';
      const isDose = !!window.CRM._vrState.isDose;
      const doseMg = Number(window.CRM._vrState.doseMg) || 0;

      const payMap = { pix: '💠 À vista no PIX', cartao_parcelado: '💳 Cartão de Crédito', dinheiro: '💵 Dinheiro' };
      const payLabel = payMap[pay] || pay;
      const nowIso = new Date().toISOString();

      if (isDose && doseMg > 0) {
        const custoDose = Math.round(((p.custo || 600) / 120) * doseMg);
        if (totalVal < custoDose) {
          alert(`🚫 Venda bloqueada por margem negativa! Custo da dose: ${formatBRL(custoDose)}`);
          return;
        }
        if (!state.frascosDoses) state.frascosDoses = {};
        if (!state.frascosDoses[pid]) state.frascosDoses[pid] = { mgRestante: 120, totalAplicadasMg: 0 };
        const frasco = state.frascosDoses[pid];
        if (frasco.mgRestante < doseMg) {
          alert(`Frasco só tem ${frasco.mgRestante} mg disponíveis. Use a Venda Completa para abrir novo frasco.`);
          return;
        }
        frasco.mgRestante = Math.max(0, frasco.mgRestante - doseMg);
        frasco.totalAplicadasMg = (frasco.totalAplicadasMg || 0) + doseMg;
        if (!Array.isArray(frasco.historico)) frasco.historico = [];
        frasco.historico.unshift({ data: nowIso, cliente, doseMg, valor: totalVal });
        frasco.historico = frasco.historico.slice(0, 30);

        const saleId = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        const encId = 'enc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        state.vendas = state.vendas || [];
        state.vendas.unshift({
          id: saleId, data: nowIso, produtoId: p.id, produtoNome: `${p.nombre} — Dose Avulsa ${doseMg} mg`,
          marca: p.marca || '', qtd: 1, isDose: true, doseMg, estornada: false,
          origemAparelho: /iPhone|iPad/i.test(navigator.userAgent) ? 'iPhone' : 'Mac',
          valorUnitario: unitVal, valorProdutos: totalVal, valorFrete: 0, valorTotal: totalVal,
          formaPagamento: payLabel, statusPagamento: payStatus, cliente, telefone, endereco: '', obs: 'Venda Rápida',
          custoTotal: custoDose, lucro: totalVal - custoDose
        });
        state.encomendas = state.encomendas || [];
        state.encomendas.unshift({
          id: encId, data: nowIso, tipoOperacao: 'pronta_entrega', status: 'entregue',
          cliente, telefone, endereco: '', formaPagamento: pay, frete: 0,
          valorProdutos: totalVal, valorTotal: totalVal, sinal: totalVal, saldoRestante: 0,
          obs: 'Venda Rápida', vendaId: saleId,
          itens: [{ produtoId: p.id, produtoNome: `${p.nombre} (Dose ${doseMg}mg)`, marca: p.marca || '', qtd: 1, precoUnit: unitVal, subtotal: totalVal }]
        });
        upsertClienteFromOperacao({ nome: cliente, telefone, valor: totalVal, data: nowIso }, true);
        logAuditoria('venda_rapida_dose', `${p.nombre} (${doseMg}mg) - ${cliente} - ${formatBRL(totalVal)}`);
        saveState();
        document.getElementById('vendaRapidaModal').classList.remove('open');
        renderAll();
        showToast(`⚡ Dose rápida confirmada (${formatBRL(totalVal)})!`);
        window.CRM.openEncomendaReceiptModal(encId);
        return;
      }

      const disp = getDisponibilidade(pid);
      if (disp.estoqueBH <= 0) {
        alert('Item sem estoque físico em BH! Use Encomenda.');
        return;
      }
      const lucroEst = totalVal - (p.custo * qty);
      if (lucroEst < 0) {
        alert(`🚫 Venda bloqueada por margem negativa! Custo: ${formatBRL(p.custo * qty)}`);
        return;
      }
      if (qty > disp.disponivel) {
        if (!confirm(`⚠️ Há ${disp.reservado} un reservada(s). Livre agora: ${disp.disponivel} un.\nDeseja vender mesmo assim?`)) return;
      }

      const nextStock = disp.estoqueBH - qty;
      if (nextStock <= 0) delete state.meuEstoque[pid];
      else state.meuEstoque[pid] = nextStock;

      const saleId = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
      const encId = 'enc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
      state.vendas = state.vendas || [];
      state.vendas.unshift({
        id: saleId, data: nowIso, produtoId: p.id, produtoNome: p.nombre,
        marca: p.marca || '', qtd: qty, isDose: false, estornada: false,
        origemAparelho: /iPhone|iPad/i.test(navigator.userAgent) ? 'iPhone' : 'Mac',
        valorUnitario: unitVal, valorProdutos: totalVal, valorFrete: 0, valorTotal: totalVal,
        formaPagamento: payLabel, statusPagamento: payStatus, cliente, telefone, endereco: '', obs: 'Venda Rápida',
        custoTotal: p.custo * qty, lucro: lucroEst
      });
      state.encomendas = state.encomendas || [];
      state.encomendas.unshift({
        id: encId, data: nowIso, tipoOperacao: 'pronta_entrega', status: 'entregue',
        cliente, telefone, endereco: '', formaPagamento: pay, frete: 0,
        valorProdutos: totalVal, valorTotal: totalVal, sinal: totalVal, saldoRestante: 0,
        obs: 'Venda Rápida', vendaId: saleId,
        itens: [{ produtoId: p.id, produtoNome: p.nombre, marca: p.marca || '', qtd: qty, precoUnit: unitVal, subtotal: totalVal }]
      });
      upsertClienteFromOperacao({ nome: cliente, telefone, valor: totalVal, data: nowIso }, true);
      logAuditoria('venda_rapida', `${p.nombre} x${qty} - ${cliente} - ${formatBRL(totalVal)}`);
      saveState();
      document.getElementById('vendaRapidaModal').classList.remove('open');
      renderAll();
      showToast(`⚡ Venda rápida confirmada (${formatBRL(totalVal)})!`);
      window.CRM.openEncomendaReceiptModal(encId);
    },

    openNewProductModal() {
      ['npNombre', 'npMarca', 'npComposicion', 'npUsd', 'npFoto'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      const estEl = document.getElementById('npEstoque');
      if (estEl) estEl.value = '1';
      document.getElementById('newProductModal').classList.add('open');
    },

    saveNewProduct() {
      const nombre = (document.getElementById('npNombre').value || '').trim();
      if (!nombre) {
        alert('Informe o nome comercial do produto.');
        return;
      }
      const marca = (document.getElementById('npMarca').value || '').trim().toUpperCase();
      const composicion = (document.getElementById('npComposicion').value || '').trim();
      const colecaoId = document.getElementById('npColecao').value || '1_emagrecedores';
      const usd = Math.max(0, Number(document.getElementById('npUsd').value) || 0);
      const estoqueQtd = Math.max(0, parseInt(document.getElementById('npEstoque').value || '0', 10) || 0);
      const fotoUrl = (document.getElementById('npFoto').value || '').trim();

      const maxCustomId = (state.customProducts || []).reduce((m, x) => Math.max(m, Number(x.id) || 0), 9100);
      const newId = maxCustomId + 1;
      const catMap = {
        '1_emagrecedores': 'emagrecedores',
        '2_anabolizantes': 'anabolizante',
        '3_hgh_peptideos': 'peptideo',
        '4_estetica': 'estetica',
        '5_saude_mental_suporte': 'saude mental'
      };
      const novoProd = {
        id: newId,
        nombre,
        marca: marca || 'OUTROS',
        composicion,
        categoria: catMap[colecaoId] || 'outros',
        colecao_id: colecaoId,
        precio: usd,
        cde: 0,
        pj: 0,
        sg: 0,
        foto_url: fotoUrl,
        custom: true
      };
      if (!Array.isArray(state.customProducts)) state.customProducts = [];
      state.customProducts.unshift(novoProd);
      rawCatalog.unshift(novoProd);
      if (estoqueQtd > 0) {
        if (!state.meuEstoque) state.meuEstoque = {};
        state.meuEstoque[newId] = estoqueQtd;
      }
      logAuditoria('novo_produto', `SHAPE-${newId} ${nombre} (USD ${usd}, BH ${estoqueQtd})`);
      rebuildSearchIndex();
      saveState();
      document.getElementById('newProductModal').classList.remove('open');
      renderAll();
      showToast(`Produto SHAPE-${newId} cadastrado!`);
    },

    applySavedFilter(key) {
      let f = PRESET_FILTERS.find(x => x.id === key);
      if (!f && String(key).startsWith('custom_')) {
        const idx = parseInt(String(key).replace('custom_', ''), 10);
        f = (state.savedFilters || [])[idx];
      }
      if (!f) return;
      state.mainGroup = f.mainGroup || 'todas';
      state.subCat = f.subCat || 'todas';
      state.brand = f.brand || 'todas';
      state.stockFilter = f.stockFilter || 'com_estoque';
      state.minMarginFilter = f.minMarginFilter !== undefined ? f.minMarginFilter : null;
      state.search = f.search || '';

      document.querySelectorAll('.group-tab').forEach(t => t.classList.toggle('active', t.getAttribute('data-group') === state.mainGroup));
      const sInp = document.getElementById('searchInput');
      if (sInp) sInp.value = state.search;
      const stSel = document.getElementById('stockSelect');
      if (stSel) stSel.value = state.stockFilter;
      renderLimit = 60;
      renderAll();
      showToast(`Filtro aplicado: ${f.nome}`);
    },

    saveCurrentFilter() {
      const nome = prompt('Nome para salvar este filtro rápido:');
      if (!nome || !nome.trim()) return;
      if (!Array.isArray(state.savedFilters)) state.savedFilters = [];
      state.savedFilters.push({
        id: 'sf_' + Date.now(),
        nome: nome.trim().slice(0, 32),
        mainGroup: state.mainGroup,
        subCat: state.subCat,
        brand: state.brand,
        stockFilter: state.stockFilter,
        minMarginFilter: state.minMarginFilter,
        search: state.search
      });
      saveState();
      renderSavedFilters();
      showToast('Filtro salvo!');
    },

    deleteSavedFilter(idx) {
      if (!Array.isArray(state.savedFilters)) return;
      state.savedFilters.splice(idx, 1);
      saveState();
      renderSavedFilters();
    },

    openClientesModal() {
      const modal = document.getElementById('clientesModal');
      if (!modal) return;
      window.CRM.renderClientesList();
      modal.classList.add('open');
    },

    renderClientesList() {
      const listEl = document.getElementById('clientesListContainer');
      const subEl = document.getElementById('clientesResumoSub');
      if (!listEl) return;

      const q = normalizeSearchText((document.getElementById('clientesSearchInput')?.value || '').trim());
      const sort = document.getElementById('clientesSortSelect')?.value || 'ultima';
      let lista = [...(state.clientes || [])];

      if (q) {
        lista = lista.filter(c => {
          const hay = normalizeSearchText(`${c.nome || ''} ${c.telefone || ''} ${(c.tags || []).join(' ')} ${c.anotacoes || ''}`);
          return hay.includes(q);
        });
      }

      lista.sort((a, b) => {
        if (sort === 'gasto') return (Number(b.totalGasto) || 0) - (Number(a.totalGasto) || 0);
        if (sort === 'pedidos') return (Number(b.qtdPedidos) || 0) - (Number(a.qtdPedidos) || 0);
        if (sort === 'nome') return String(a.nome || '').localeCompare(String(b.nome || ''));
        return String(b.ultimaCompra || '').localeCompare(String(a.ultimaCompra || ''));
      });

      if (subEl) {
        const totalFat = lista.reduce((s, c) => s + (Number(c.totalGasto) || 0), 0);
        subEl.textContent = `${lista.length} cliente(s) · Total acumulado: ${formatBRL(totalFat)}`;
      }

      if (!lista.length) {
        listEl.innerHTML = `<div style="padding:24px;text-align:center;color:var(--text-muted);background:#0f172a;border-radius:8px;">Nenhum cliente encontrado. Eles são criados automaticamente ao salvar vendas ou encomendas.</div>`;
        return;
      }

      listEl.innerHTML = lista.map(c => {
        const ult = c.ultimaCompra ? new Date(c.ultimaCompra).toLocaleDateString('pt-BR') : '-';
        const tagsHtml = (c.tags || []).map(t => `<span style="background:#134e4a;color:#5eead4;padding:1px 6px;border-radius:99px;font-size:10px;">${escapeHtml(t)}</span>`).join(' ');
        return `
          <div style="background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:10px 12px;cursor:pointer;" onclick="window.CRM.selectClienteDetalhe('${esc(String(c.id))}')">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
              <b style="color:#f8fafc;font-size:13px;">${escapeHtml(c.nome)}</b>
              <b style="color:#34d399;font-size:12px;">${formatBRL(c.totalGasto || 0)}</b>
            </div>
            <div style="font-size:11px;color:#94a3b8;margin-top:3px;display:flex;justify-content:space-between;">
              <span>${c.telefone ? `📱 ${escapeHtml(c.telefone)}` : 'Sem telefone'} · ${c.qtdPedidos || 0} pedido(s)</span>
              <span>Última: ${ult}</span>
            </div>
            ${tagsHtml ? `<div style="margin-top:4px;">${tagsHtml}</div>` : ''}
          </div>
        `;
      }).join('');
    },

    selectClienteDetalhe(clienteId) {
      const detEl = document.getElementById('clienteDetalheContainer');
      const cli = (state.clientes || []).find(c => String(c.id) === String(clienteId));
      if (!detEl || !cli) return;

      const cliNorm = normalizeSearchText(cli.nome);
      const cliTel = String(cli.telefone || '').replace(/\D/g, '');
      const matchOp = op => {
        const opTel = String(op.telefone || '').replace(/\D/g, '');
        if (cliTel.length >= 8 && opTel.length >= 8 && opTel.slice(-9) === cliTel.slice(-9)) return true;
        return normalizeSearchText(op.cliente).trim() === cliNorm;
      };

      const vendasCli = (state.vendas || []).filter(v => !v.estornada && matchOp(v));
      const encsCli = (state.encomendas || []).filter(e => !e.vendaId && matchOp(e));

      const histRows = [
        ...vendasCli.map(v => ({ data: v.data, titulo: v.produtoNome, valor: v.valorTotal, tipo: v.statusPagamento === 'pendente' ? '⏳ A Receber' : '✅ Venda' })),
        ...encsCli.map(e => ({ data: e.data, titulo: e.produtoNome || `${(e.itens || []).length} item(ns)`, valor: e.valorTotal, tipo: `📝 ${e.status}` }))
      ].sort((a, b) => String(b.data || '').localeCompare(String(a.data || '')));

      detEl.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:10px;">
          <div>
            <h4 style="margin:0;color:#fff;font-size:15px;">${escapeHtml(cli.nome)}</h4>
            <div style="font-size:12px;color:#94a3b8;">${cli.telefone ? escapeHtml(cli.telefone) : 'Telefone não informado'}</div>
            ${cli.endereco ? `<div style="font-size:11px;color:#cbd5e1;margin-top:2px;">📍 ${escapeHtml(cli.endereco)}</div>` : ''}
          </div>
          <button class="btn btn-green" style="padding:6px 10px;font-size:11px;font-weight:800;" onclick="window.CRM.whatsappCliente('${esc(String(cli.id))}')">📲 WhatsApp</button>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
          <div style="background:#020617;padding:8px;border-radius:6px;border:1px solid #1e293b;">
            <div style="font-size:10px;color:#94a3b8;">TOTAL GASTO</div>
            <b style="color:#34d399;font-size:14px;">${formatBRL(cli.totalGasto || 0)}</b>
          </div>
          <div style="background:#020617;padding:8px;border-radius:6px;border:1px solid #1e293b;">
            <div style="font-size:10px;color:#94a3b8;">PEDIDOS</div>
            <b style="color:#38bdf8;font-size:14px;">${cli.qtdPedidos || 0}</b>
          </div>
        </div>

        <div class="m-field" style="margin-bottom:8px;">
          <label style="font-size:11px;">🏷️ Tags (separadas por vírgula)</label>
          <input id="cliEditTags" type="text" value="${escapeHtml((cli.tags || []).join(', '))}" placeholder="Ex: VIP, Tirzepatida, Recorrente" />
        </div>
        <div class="m-field" style="margin-bottom:8px;">
          <label style="font-size:11px;">📝 Anotações</label>
          <textarea id="cliEditNotes" rows="2" style="width:100%;background:#020617;border:1px solid #334155;color:#fff;border-radius:6px;padding:6px;font-size:12px;">${escapeHtml(cli.anotacoes || '')}</textarea>
        </div>
        <button class="btn btn-primary" style="width:100%;margin-bottom:12px;font-size:12px;" onclick="window.CRM.saveClienteNotesTags('${esc(String(cli.id))}')">💾 Salvar Tags & Anotações</button>

        <div style="font-size:11px;font-weight:800;color:#94a3b8;margin-bottom:6px;">HISTÓRICO (${histRows.length})</div>
        <div style="display:flex;flex-direction:column;gap:6px;">
          ${histRows.length ? histRows.map(h => `
            <div style="background:#020617;border:1px solid #1e293b;border-radius:6px;padding:6px 8px;font-size:11px;display:flex;justify-content:space-between;gap:8px;">
              <div>
                <div style="color:#e2e8f0;font-weight:700;">${escapeHtml(h.titulo)}</div>
                <div style="color:#64748b;font-size:10px;">${h.data ? new Date(h.data).toLocaleDateString('pt-BR') : '-'} · ${h.tipo}</div>
              </div>
              <b style="color:#34d399;white-space:nowrap;">${formatBRL(h.valor || 0)}</b>
            </div>
          `).join('') : '<div style="font-size:11px;color:#64748b;">Sem compras registradas ainda.</div>'}
        </div>
      `;
    },

    saveClienteNotesTags(clienteId) {
      const cli = (state.clientes || []).find(c => String(c.id) === String(clienteId));
      if (!cli) return;
      const tagsRaw = document.getElementById('cliEditTags')?.value || '';
      const notesRaw = document.getElementById('cliEditNotes')?.value || '';
      cli.tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);
      cli.anotacoes = notesRaw.trim();
      saveState();
      window.CRM.renderClientesList();
      showToast('Cliente atualizado!');
    },

    whatsappCliente(clienteId) {
      const cli = (state.clientes || []).find(c => String(c.id) === String(clienteId));
      if (!cli) return;
      const digits = String(cli.telefone || '').replace(/\D/g, '');
      const msg = encodeURIComponent(`Olá ${cli.nome}! Tudo bem? Passando para saber como está seu protocolo e se precisa de reposição.`);
      if (digits.length >= 10) {
        const phone = digits.startsWith('55') ? digits : `55${digits}`;
        window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${msg}`, '_blank');
      } else {
        window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
      }
    },

    markSalePaid(saleId) {
      const v = (state.vendas || []).find(x => String(x.id) === String(saleId));
      if (!v) return;
      v.statusPagamento = 'pago';
      v.pagoEm = new Date().toISOString();
      logAuditoria('pagamento_recebido', `${v.cliente} - ${v.produtoNome} (${formatBRL(v.valorTotal)})`);
      saveState();
      renderAll();
      window.CRM.openSalesHistoryModal();
      showToast('Pagamento confirmado como PAGO!');
    },

    loadMore() {
      renderLimit += 100;
      renderAll();
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
      logAuditoria('ajuste_estoque', `SKU ${id}: ${current} -> ${next}`);
      saveState();
      renderAll();
      showToast(next > 0 ? `Estoque BH: ${next} un` : `Removido do estoque BH`);
    },

    resetEstoqueBase() {
      if (confirm('Deseja restaurar o estoque físico para a contagem canônica de 32 itens em BH?')) {
        state.meuEstoque = JSON.parse(JSON.stringify(ESTOQUE_CANONICO_BH));
        saveState();
        renderAll();
        showToast('Estoque BH restaurado para 32 unidades!');
      }
    },

    toggleTopbarTools() {
      const drawer = document.getElementById('topbarToolsDrawer');
      const btn = document.getElementById('btnToggleTopbarTools');
      if (!drawer) return;
      const isCollapsed = drawer.classList.toggle('collapsed');
      if (btn) {
        btn.textContent = isCollapsed ? '🛠️ Ferramentas ▸' : '🛠️ Ferramentas ▾';
      }
    },

    ajustarSaldoFrascoDose(productId) {
      const conf = TABELA_DOSES_OFICIAIS[productId];
      if (!conf) return;
      if (!state.frascosDoses) state.frascosDoses = {};
      if (!state.frascosDoses[productId]) state.frascosDoses[productId] = { mgRestante: 120, totalAplicadasMg: 0, perdaMg: 0 };
      const atual = Number(state.frascosDoses[productId].mgRestante || 0);
      const novoRaw = prompt(`Ajustar saldo em mg do frasco em uso (${conf.nome}):\nSaldo atual: ${atual} mg (máx 120 mg)`, String(atual));
      if (novoRaw === null) return;
      const novo = Number(String(novoRaw).replace(',', '.'));
      if (!isFinite(novo) || novo < 0 || novo > 120) {
        alert('Informe um valor válido entre 0 e 120 mg.');
        return;
      }
      const diff = atual - novo;
      if (diff > 0) {
        state.frascosDoses[productId].perdaMg = Math.max(0, (Number(state.frascosDoses[productId].perdaMg) || 0) + diff);
      }
      state.frascosDoses[productId].mgRestante = novo;
      saveState();
      renderAll();
      showToast(`Saldo do frasco ajustado para ${novo} mg!`);
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
      const isCartao = pay === 'cartao_parcelado' || pay === 'cartao_6x';

      if (mode === 'frasco_inteiro') {
        document.getElementById('saleIsDose').value = '0';
        document.getElementById('saleDoseMg').value = '0';
        document.getElementById('saleDoseCustomContainer').style.display = 'none';
        const unitVal = isCartao ? p.precoCartao : p.precoFinal;
        document.getElementById('saleUnitPrice').value = unitVal;
        document.getElementById('saleTotalValue').value = unitVal;
        document.getElementById('saleQty').value = 1;
        document.getElementById('salePriceHint').textContent = `Frasco Fechado 120mg (${isCartao ? (isGlpProduct(p) ? 'Cartão até 12x s/ juros' : 'Cartão até 6x') : 'PIX'}): ${formatBRL(unitVal)}`;
        window.CRM.updateSaleGrandTotal();
      } else if (mode === 'custom') {
        document.getElementById('saleIsDose').value = '1';
        document.getElementById('saleDoseCustomContainer').style.display = 'grid';
        document.getElementById('saleCustomDoseMg').focus();
        window.CRM.updateSaleGrandTotal();
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
      window.CRM.updateSaleGrandTotal();
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
      window.CRM.updateSaleGrandTotal();
    },

    openSaleModal(productId) {
      // Unificação Completa: abre o formulário consolidado já em modo Pronta Entrega BH (baixa imediata)
      window.CRM.openNovaEncomendaModal(productId, 'pronta_entrega');
    },

    filterSaleProdutosSelect(query, selectedId = null) {
      const select = document.getElementById('saleProdSelect');
      const badge = document.getElementById('saleSearchCountBadge');
      if (!select) return;

      const q = (query || '').toLowerCase().trim();
      const allComputed = rawCatalog.map(computeProduct);
      const inStockProds = allComputed.filter(p => ((state.meuEstoque || {})[p.id] || 0) > 0);

      let filtered = allComputed;
      if (q === 'estoque' || q === 'em estoque') {
        filtered = inStockProds;
      } else if (q) {
        filtered = allComputed.filter(p => {
          const txt = `${p.id} ${p.nombre || ''} ${p.marca || ''} ${p.composicion || ''} ${p.categoria || ''}`.toLowerCase();
          return txt.includes(q);
        });
      }

      const filteredInStock = filtered
        .filter(p => ((state.meuEstoque || {})[p.id] || 0) > 0)
        .sort((a, b) => getDisponibilidade(b.id).disponivel - getDisponibilidade(a.id).disponivel);
      const filteredOutStock = filtered.filter(p => !((state.meuEstoque || {})[p.id] || 0));

      if (!filtered.length) {
        select.innerHTML = `<option value="">Nenhum medicamento encontrado com "${escapeHtml(q)}"</option>`;
        if (badge) badge.textContent = '0 opções';
        return;
      }

      let optionsHtml = '';
      if (filteredInStock.length > 0) {
        optionsHtml += `<optgroup label="✅ Pronta Entrega BH (Em Estoque: ${filteredInStock.length})">`;
        optionsHtml += filteredInStock.map(p => {
          const disp = getDisponibilidade(p.id);
          return `
          <option value="${p.id}" ${p.id === selectedId ? 'selected' : ''}>
            ${p.nombre} (Disp: ${disp.disponivel} | BH: ${disp.estoqueBH}${disp.reservado > 0 ? ` | Res: ${disp.reservado}` : ''})
          </option>
        `;
        }).join('');
        optionsHtml += `</optgroup>`;
      }

      if (filteredOutStock.length > 0) {
        optionsHtml += `<optgroup label="📦 Outros Produtos (Estoque 0 ou Encomenda: ${filteredOutStock.length})">`;
        optionsHtml += filteredOutStock.slice(0, 60).map(p => `
          <option value="${p.id}" ${p.id === selectedId ? 'selected' : ''}>
            ${p.nombre} (Disponível: 0 un)
          </option>
        `).join('');
        optionsHtml += `</optgroup>`;
      }

      select.innerHTML = optionsHtml;
      if (badge) {
        badge.textContent = `${filteredInStock.length} em estoque · ${filtered.length} total`;
      }

      const hasSelected = selectedId && filtered.some(p => p.id === selectedId);
      const targetId = hasSelected ? selectedId : (filteredInStock[0] ? filteredInStock[0].id : (filtered[0] ? filtered[0].id : null));
      if (targetId) {
        select.value = targetId;
        window.CRM.setSaleModalData(targetId);
      }
    },

    quickSearchSaleProduto(term) {
      const inp = document.getElementById('saleProdBuscaInput');
      if (inp) {
        inp.value = term === 'estoque' ? '' : term;
        inp.focus();
      }
      window.CRM.filterSaleProdutosSelect(term);
    },

    onSaleClienteSelect(val) {
      const nome = (val || '').trim().toLowerCase();
      if (!nome) return;
      const all = [...(state.encomendas || []), ...(state.vendas || [])];
      const match = all.find(x => (x.cliente || '').trim().toLowerCase() === nome);
      if (match) {
        const phoneInp = document.getElementById('saleClientPhone');
        if (phoneInp && !phoneInp.value && match.telefone) {
          phoneInp.value = match.telefone;
        }
        const addrInp = document.getElementById('saleClientAddress');
        if (addrInp && !addrInp.value && match.endereco) {
          addrInp.value = match.endereco;
        }
        const notesInp = document.getElementById('saleNotes');
        if (notesInp && !notesInp.value && match.obs) {
          notesInp.value = match.obs;
        }
      }
      renderClientHistoryBanner(val, 'saleClientHistoryBanner');
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
      if (document.getElementById('saleClientAddress')) document.getElementById('saleClientAddress').value = '';
      document.getElementById('saleNotes').value = '';
      document.getElementById('salePayment').value = 'pix';
      const shipInput = document.getElementById('saleShipping');
      if (shipInput) shipInput.value = '0';

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

      const isCartao = pay === 'cartao_parcelado' || pay === 'cartao_6x';
      let unitPrice = p.precoFinal;
      if (isCartao) {
        unitPrice = p.precoCartao;
      }
      const total = unitPrice * qty;
      document.getElementById('saleUnitPrice').value = unitPrice;
      document.getElementById('saleTotalValue').value = total;
      window.CRM.updateSaleGrandTotal();
    },

    onSaleUnitPriceChange() {
      const unitVal = Number(document.getElementById('saleUnitPrice').value) || 0;
      const qty = Math.max(1, Number(document.getElementById('saleQty').value) || 1);
      const total = unitVal * qty;
      document.getElementById('saleTotalValue').value = total;
      window.CRM.updateSaleGrandTotal();
    },

    onSaleQtyChange() {
      const unitVal = Number(document.getElementById('saleUnitPrice').value) || 0;
      const qty = Math.max(1, Number(document.getElementById('saleQty').value) || 1);
      const total = unitVal * qty;
      document.getElementById('saleTotalValue').value = total;
      window.CRM.updateSaleGrandTotal();
    },

    onSaleTotalValueChange() {
      const totalVal = Number(document.getElementById('saleTotalValue').value) || 0;
      const qty = Math.max(1, Number(document.getElementById('saleQty').value) || 1);
      const unitVal = Math.round(totalVal / qty);
      document.getElementById('saleUnitPrice').value = unitVal;
      window.CRM.updateSaleGrandTotal();
    },

    onSaleShippingChange() {
      window.CRM.updateSaleGrandTotal();
    },

    updateSaleGrandTotal() {
      const subtotal = Math.max(0, Number(document.getElementById('saleTotalValue').value) || 0);
      const shipEl = document.getElementById('saleShipping');
      const frete = Math.max(0, Number(shipEl ? shipEl.value : 0) || 0);
      const grandTotal = subtotal + frete;
      const grandEl = document.getElementById('saleGrandTotal');
      if (grandEl) grandEl.value = grandTotal;

      const hintEl = document.getElementById('salePriceHint');
      if (hintEl) {
        const qty = Math.max(1, Number(document.getElementById('saleQty').value) || 1);
        const unitVal = Math.round(subtotal / qty);
        if (frete > 0) {
          hintEl.textContent = `Produtos (${qty}x): ${formatBRL(subtotal)} + Frete: ${formatBRL(frete)} ➔ Total a Pagar: ${formatBRL(grandTotal)}`;
        } else {
          hintEl.textContent = `Subtotal: ${formatBRL(unitVal)} cada un × ${qty} = ${formatBRL(subtotal)}`;
        }
      }
      return { subtotal, frete, grandTotal };
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
      const isGlp = isGlpProduct(p);
      const payLabelMap = {
        'pix': '💠 À vista no PIX',
        'cartao_parcelado': isGlp ? '💳 Cartão de Crédito (até 12x s/ juros)' : '💳 Cartão de Crédito (até 6x s/ juros)',
        'cartao_6x': isGlp ? '💳 Cartão de Crédito (até 12x s/ juros)' : '💳 Cartão de Crédito (até 6x)',
        'cartao_debito': '💳 Cartão Débito',
        'dinheiro': '💵 Dinheiro em Espécie'
      };
      const payLabel = payLabelMap[pay] || pay;
      const client = document.getElementById('saleClientName').value.trim() || 'Cliente';
      const phone = document.getElementById('saleClientPhone').value.trim();
      const address = (document.getElementById('saleClientAddress') ? document.getElementById('saleClientAddress').value.trim() : '');
      const notes = document.getElementById('saleNotes').value.trim();
      const dateVal = document.getElementById('saleDate').value || new Date().toISOString();

      const isDose = document.getElementById('saleIsDose') && document.getElementById('saleIsDose').value === '1';
      const doseMg = Number(document.getElementById('saleDoseMg') ? document.getElementById('saleDoseMg').value : 0) || 0;

      const freteVal = Math.max(0, Number(document.getElementById('saleShipping') ? document.getElementById('saleShipping').value : 0) || 0);
      const payStatus = (document.getElementById('salePaymentStatus') ? document.getElementById('salePaymentStatus').value : 'pago') || 'pago';
      const subtotalVal = totalVal;
      const totalComFrete = subtotalVal + freteVal;

      // Se for venda de dose fracionada
      if (isDose) {
        if (doseMg <= 0) {
          alert('Informe a quantidade em mg da dose aplicada!');
          return;
        }
        const custoDosePre = Math.round(((p.custo || 600) / 120) * doseMg);
        if (subtotalVal < custoDosePre) {
          alert(`🚫 Venda bloqueada por margem negativa!\n\nCusto proporcional da dose: ${formatBRL(custoDosePre)}\nValor informado: ${formatBRL(subtotalVal)}`);
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

        // Abate miligramas do frasco e registra histórico
        frascoAtual.mgRestante = Math.max(0, frascoAtual.mgRestante - doseMg);
        frascoAtual.totalAplicadasMg = (frascoAtual.totalAplicadasMg || 0) + doseMg;
        if (!Array.isArray(frascoAtual.historico)) frascoAtual.historico = [];
        frascoAtual.historico.unshift({ data: dateVal, cliente: client, doseMg, valor: totalComFrete });
        frascoAtual.historico = frascoAtual.historico.slice(0, 30);

        // Custo proporcional da dose
        const custoDose = Math.round(((p.custo || 600) / 120) * doseMg);
        const lucroEst = subtotalVal - custoDose;

        const saleId = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        const encId = 'enc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        const aparelhoOrigem = /iPhone|iPad/i.test(navigator.userAgent) ? 'iPhone' : 'Mac';

        const venda = {
          id: saleId,
          data: dateVal,
          produtoId: p.id,
          produtoNome: `${p.nombre} — Dose Avulsa ${doseMg} mg`,
          marca: p.marca || '',
          qtd: 1,
          isDose: true,
          doseMg: doseMg,
          estornada: false,
          origemAparelho: aparelhoOrigem,
          valorUnitario: unitVal,
          valorProdutos: subtotalVal,
          valorFrete: freteVal,
          valorTotal: totalComFrete,
          formaPagamento: payLabel,
          statusPagamento: payStatus,
          cliente: client,
          telefone: phone,
          endereco: address,
          obs: notes,
          custoTotal: custoDose,
          lucro: lucroEst
        };

        if (!state.vendas) state.vendas = [];
        state.vendas.unshift(venda);

        const novaEnc = {
          id: encId,
          data: dateVal,
          tipoOperacao: 'pronta_entrega',
          status: 'entregue',
          cliente: client,
          telefone: phone,
          endereco: address,
          formaPagamento: pay,
          frete: freteVal,
          valorProdutos: subtotalVal,
          valorTotal: totalComFrete,
          sinal: totalComFrete,
          saldoRestante: 0,
          obs: notes,
          vendaId: saleId,
          itens: [
            {
              produtoId: p.id,
              produtoNome: `${p.nombre} (Dose ${doseMg}mg)`,
              marca: p.marca || '',
              qtd: 1,
              precoUnit: unitVal,
              subtotal: subtotalVal
            }
          ]
        };
        if (!Array.isArray(state.encomendas)) state.encomendas = [];
        state.encomendas.unshift(novaEnc);

        saveState();
        upsertClienteFromOperacao({ nome: client, telefone: phone, endereco: address, valor: totalComFrete, data: dateVal, obs: notes });
        logAuditoria('venda_dose', `${p.nombre} (${doseMg}mg) - ${client} - ${formatBRL(totalComFrete)}`);

        document.getElementById('saleModal').classList.remove('open');
        renderAll();
        showToast(`✅ Dose de ${doseMg} mg confirmada! Restam ${frascoAtual.mgRestante} mg no frasco.`);
        window.CRM.openEncomendaReceiptModal(encId);
        return;
      }

      // Se for frasco/caixa fechada
      const dispCaixa = getDisponibilidade(pid);
      if (currentStock <= 0) {
        alert('Item sem estoque físico em BH! Cadastre a entrada no Estoque BH ou registre como Encomenda.');
        return;
      }
      const lucroEst = subtotalVal - (p.custo * qty);
      if (lucroEst < 0) {
        alert(`🚫 Venda bloqueada por margem negativa!\n\nCusto (${qty}x): ${formatBRL(p.custo * qty)}\nValor informado: ${formatBRL(subtotalVal)}\n\nAjuste o preço para cima antes de confirmar.`);
        return;
      }
      if (qty > dispCaixa.disponivel && dispCaixa.reservado > 0) {
        const prosseguirRes = confirm(`⚠️ Atenção: há ${dispCaixa.reservado} un reservada(s) para clientes.\nDisponível livre agora: ${dispCaixa.disponivel} un (Estoque BH: ${currentStock} un).\n\nDeseja vender mesmo assim?`);
        if (!prosseguirRes) return;
      } else if (qty > currentStock) {
        const prosseguir = confirm(`Atenção: A quantidade informada (${qty}) é maior do que o estoque registrado no aparelho (${currentStock} un).\n\nDeseja registrar a venda e ajustar o estoque mesmo assim?`);
        if (!prosseguir) return;
      }
      logAuditoria('venda_caixa', `${p.nombre} x${qty} - ${client} - ${formatBRL(totalComFrete)}`);

      // Baixa no estoque
      const nextStock = currentStock - qty;
      if (nextStock <= 0) {
        delete state.meuEstoque[pid];
      } else {
        state.meuEstoque[pid] = nextStock;
      }

      // Registro de Venda com Valor Unitário explícito
      const saleId = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
      const encId = 'enc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
      const aparelhoOrigem = /iPhone|iPad/i.test(navigator.userAgent) ? 'iPhone' : 'Mac';

      const venda = {
        id: saleId,
        data: dateVal,
        produtoId: p.id,
        produtoNome: p.nombre,
        marca: p.marca || '',
        qtd: qty,
        isDose: false,
        estornada: false,
        origemAparelho: aparelhoOrigem,
        valorUnitario: unitVal,
        valorProdutos: subtotalVal,
        valorFrete: freteVal,
        valorTotal: totalComFrete,
        formaPagamento: payLabel,
        statusPagamento: payStatus,
        cliente: client,
        telefone: phone,
        endereco: address,
        obs: notes,
        custoTotal: p.custo * qty,
        lucro: lucroEst
      };

      if (!state.vendas) state.vendas = [];
      state.vendas.unshift(venda);
      upsertClienteFromOperacao({ nome: client, telefone: phone, endereco: address, valor: totalComFrete, data: dateVal, obs: notes }, true);

      const novaEnc = {
        id: encId,
        data: dateVal,
        tipoOperacao: 'pronta_entrega',
        status: 'entregue',
        cliente: client,
        telefone: phone,
        endereco: address,
        formaPagamento: pay,
        frete: freteVal,
        valorProdutos: subtotalVal,
        valorTotal: totalComFrete,
        sinal: totalComFrete,
        saldoRestante: 0,
        obs: notes,
        vendaId: saleId,
        itens: [
          {
            produtoId: p.id,
            produtoNome: p.nombre,
            marca: p.marca || '',
            qtd: qty,
            precoUnit: unitVal,
            subtotal: subtotalVal
          }
        ]
      };
      if (!Array.isArray(state.encomendas)) state.encomendas = [];
      state.encomendas.unshift(novaEnc);

      saveState();

      document.getElementById('saleModal').classList.remove('open');
      renderAll();
      showToast(`✅ Venda registrada! Baixa de ${qty} un efetuada.`);

      // Abre comprovante / recibo consolidado na mesma ação
      window.CRM.openEncomendaReceiptModal(encId);
    },

    showSaleReceipt(venda, p) {
      const modal = document.getElementById('saleReceiptModal');
      const textarea = document.getElementById('saleReceiptText');
      const dataFmt = new Date(venda.data).toLocaleString('pt-BR');
      const temFrete = (Number(venda.valorFrete) || 0) > 0;
      const subtotalProdutos = venda.valorProdutos || (venda.valorUnitario * venda.qtd);
      const isPix = String(venda.formaPagamento).toLowerCase().includes('pix');

      if (venda.isDose) {
        const lines = [
          `💉 *COMPROVANTE DE APLICAÇÃO DE DOSE — SHAPE TOTAL*`,
          `━━━━━━━━━━━━━━━━━━━━━━━━━`,
          `👤 *Paciente / Cliente:* ${venda.cliente}`,
          `🧪 *Medicamento:* ${venda.produtoNome}`,
          `💉 *Dosagem Aplicada:* *${venda.doseMg} mg* (Dose Individual)`,
          temFrete ? `💵 *Valor da Dose:* ${formatBRL(subtotalProdutos)}` : ``,
          temFrete ? `🚚 *Taxa de Entrega / Deslocamento:* ${formatBRL(venda.valorFrete)}` : ``,
          `💰 *TOTAL A PAGAR:* *${formatBRL(venda.valorTotal)}*`,
          `💳 *Forma de Pagamento:* ${venda.formaPagamento}`,
          `📅 *Data da Aplicação:* ${dataFmt}`,
          venda.endereco ? `📍 *Endereço de Entrega:* ${venda.endereco}` : `📍 *Local:* Atendimento Pronta Entrega Belo Horizonte`,
          venda.obs ? `📝 *Observação:* ${venda.obs}` : ``,
          `━━━━━━━━━━━━━━━━━━━━━━━━━`,
          isPix ? `💠 *Chave PIX (CNPJ):* 64.228.053/0001-47\n🏦 *Beneficiário:* BAXTI IMPORTADOS LTDA (Banco Inter)\n━━━━━━━━━━━━━━━━━━━━━━━━━` : ``,
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
        venda.qtd > 1 ? `💵 *Valor Unitário:* ${formatBRL(venda.valorUnitario)} cada` : ``,
        temFrete ? `📦 *Subtotal Produtos:* ${formatBRL(subtotalProdutos)}` : ``,
        temFrete ? `🚚 *Valor do Frete / Envio:* ${formatBRL(venda.valorFrete)}` : ``,
        `💰 *TOTAL A PAGAR:* *${formatBRL(venda.valorTotal)}*`,
        `💳 *Forma de Pagamento:* ${venda.formaPagamento}`,
        `📅 *Data da Operação:* ${dataFmt}`,
        venda.endereco ? `📍 *Endereço de Entrega:* ${venda.endereco}` : (temFrete ? `🚚 *Entrega:* Envio express (Uber Flash / Motoboy / Sedex)` : `🚚 *Entrega:* Pronta Entrega Belo Horizonte (Retirada em mãos ou Motoboy)`),
        venda.obs ? `📝 *Observação:* ${venda.obs}` : ``,
        `━━━━━━━━━━━━━━━━━━━━━━━━━`,
        isPix ? `💠 *Chave PIX (CNPJ):* 64.228.053/0001-47\n🏦 *Beneficiário:* BAXTI IMPORTADOS LTDA (Banco Inter)\n━━━━━━━━━━━━━━━━━━━━━━━━━` : ``,
        `🔒 *Garantia:* Medicamentos 100% originais com lacre e rastreio.`,
        `Agradecemos a confiança e preferência! 🚀💪`
      ].filter(Boolean);

      textarea.value = lines.join('\n');
      window._lastReceiptPhone = venda.telefone;
      modal.classList.add('open');
    },

    openReceiptWhatsApp(useDirectPhone = false) {
      const text = document.getElementById('saleReceiptText').value;
      const phone = (window._lastReceiptPhone || '').replace(/\D/g, '');
      let url = 'https://api.whatsapp.com/send?';
      if (useDirectPhone && phone && phone !== '31972191092' && phone !== '5531972191092') {
        const fullPhone = phone.startsWith('55') ? phone : `55${phone}`;
        url += `phone=${fullPhone}&`;
      }
      url += `text=${encodeURIComponent(text)}`;

      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        window.location.href = url;
      } else {
        const win = window.open(url, '_blank');
        if (!win || win.closed || typeof win.closed === 'undefined') {
          window.location.href = url;
        }
      }
      showToast('Abrindo WhatsApp para você escolher a pessoa...');
    },

    shareReceiptNative() {
      const text = document.getElementById('saleReceiptText').value;
      if (!text) return;
      if (navigator.share) {
        navigator.share({
          title: 'Comprovante Shape Total / Baxti',
          text: text
        }).catch(() => {
          window.CRM.openReceiptWhatsApp(false);
        });
      } else {
        window.CRM.openReceiptWhatsApp(false);
      }
    },

    copyReceiptText() {
      const text = document.getElementById('saleReceiptText').value;
      navigator.clipboard.writeText(text);
      showToast('Comprovante copiado para a área de transferência!');
    },

    previewSaleWhatsAppQuote() {
      const pid = Number(document.getElementById('saleProdId').value);
      const raw = rawCatalog.find(x => x.id === pid);
      if (!raw) {
        showToast('Selecione um produto!');
        return;
      }
      const p = computeProduct(raw);
      const qty = Math.max(1, Number(document.getElementById('saleQty').value) || 1);
      const unitRaw = document.getElementById('saleUnitPrice').value.trim();
      const totalRaw = document.getElementById('saleTotalValue').value.trim();
      const unitVal = unitRaw !== '' && isFinite(Number(unitRaw)) ? Number(unitRaw) : p.precoFinal;
      const subtotalVal = totalRaw !== '' && isFinite(Number(totalRaw)) ? Number(totalRaw) : (unitVal * qty);

      const freteVal = Math.max(0, Number(document.getElementById('saleShipping') ? document.getElementById('saleShipping').value : 0) || 0);
      const grandTotal = subtotalVal + freteVal;

      const pay = document.getElementById('salePayment').value;
      const isGlp = isGlpProduct(p);
      const payLabelMap = {
        'pix': '💠 À vista no PIX',
        'cartao_parcelado': isGlp ? '💳 Cartão de Crédito (até 12x s/ juros)' : '💳 Cartão de Crédito (até 6x s/ juros)',
        'cartao_6x': isGlp ? '💳 Cartão de Crédito (até 12x s/ juros)' : '💳 Cartão de Crédito (até 6x)',
        'cartao_debito': '💳 Cartão Débito',
        'dinheiro': '💵 Dinheiro em Espécie'
      };
      const payLabel = payLabelMap[pay] || pay;
      const client = document.getElementById('saleClientName').value.trim() || 'Cliente';
      const phone = document.getElementById('saleClientPhone').value.trim();
      const notes = document.getElementById('saleNotes').value.trim();
      const isPix = pay === 'pix';

      const lines = [
        `*ORÇAMENTO & PROPOSTA — SHAPE TOTAL BH* 📦✨`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `👤 *Cliente:* ${client}`,
        `🧪 *Medicamento:* ${qty}x *${p.nombre}*`,
        qty > 1 ? `💵 *Valor Unitário:* ${formatBRL(unitVal)} cada` : ``,
        `📦 *Subtotal Medicamento:* ${formatBRL(subtotalVal)}`,
        freteVal > 0 ? `🚚 *Frete / Envio (Uber Flash / Motoboy):* ${formatBRL(freteVal)}` : `🚚 *Frete:* Retirada em mãos / Frete a combinar`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `💰 *TOTAL A PAGAR:* *${formatBRL(grandTotal)}*`,
        `💳 *Forma de Pagamento:* ${payLabel}`,
        notes ? `📍 *Endereço / Observação:* ${notes}` : ``,
        `━━━━━━━━━━━━━━━━━━━━━━━━━`,
        isPix ? `💠 *Chave PIX (CNPJ):* 64.228.053/0001-47\n🏦 *Beneficiário:* BAXTI IMPORTADOS LTDA (Banco Inter)\n━━━━━━━━━━━━━━━━━━━━━━━━━` : ``,
        `🔒 *Garantia:* Medicamento 100% original, lacrado e com procedência.`,
        `Assim que confirmar, já providenciamos a separação e o envio imediato! 🚀💪`
      ].filter(Boolean);

      const modal = document.getElementById('saleReceiptModal');
      const textarea = document.getElementById('saleReceiptText');
      if (textarea) textarea.value = lines.join('\n');
      window._lastReceiptPhone = phone;
      if (modal) modal.classList.add('open');
      showToast('Mensagem de WhatsApp com frete e total gerada!');
    },

    openSalesHistoryModal() {
      const modal = document.getElementById('salesHistoryModal');
      const vendas = state.vendas || [];
      const vendasAtivas = vendas.filter(v => !v.estornada);

      const totalFat = vendasAtivas.reduce((s, v) => s + (Number(v.valorTotal) || 0), 0);
      const totalLucro = vendasAtivas.reduce((s, v) => s + (Number(v.lucro) || 0), 0);
      const totalQtd = vendasAtivas.reduce((s, v) => s + (Number(v.qtd) || 0), 0);

      document.getElementById('historyTotalFaturado').textContent = formatBRL(totalFat);
      document.getElementById('historyTotalLucro').textContent = formatBRL(totalLucro);
      document.getElementById('historyTotalQtd').textContent = `${totalQtd} unidades`;
      const estornadasCount = vendas.length - vendasAtivas.length;
      const totalAReceber = vendasAtivas.filter(v => v.statusPagamento === 'pendente').reduce((s, v) => s + (Number(v.valorTotal) || 0), 0);
      document.getElementById('historyTotalVendasCount').textContent = `${vendasAtivas.length} vendas ativas${estornadasCount > 0 ? ` (${estornadasCount} estornadas)` : ''}${totalAReceber > 0 ? ` · ⏳ A Receber: ${formatBRL(totalAReceber)}` : ''}`;

      const tbody = document.getElementById('historyTableBody');
      if (!vendas.length) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:24px; color:var(--text-muted);">Nenhuma venda registrada ainda. Use o botão "+ Nova Venda" para dar baixa.</td></tr>`;
      } else {
        tbody.innerHTML = vendas.map(v => {
          const d = new Date(v.data).toLocaleString('pt-BR');
          const unitVal = v.valorUnitario || (v.qtd > 0 ? Math.round(v.valorTotal / v.qtd) : v.valorTotal);
          const isEst = !!v.estornada;
          const isPendente = !isEst && v.statusPagamento === 'pendente';
          const trStyle = isEst ? 'opacity:0.55; background:rgba(239,68,68,0.06);' : (isPendente ? 'background:rgba(245,158,11,0.06);' : '');
          const payBadge = isEst ? '' : (isPendente
            ? `<div style="margin-top:3px;"><span style="font-size:10px;color:#fbbf24;font-weight:700;">⏳ A Receber</span> <button class="btn" style="padding:1px 6px;font-size:10px;background:#065f46;color:#fff;" onclick="window.CRM.markSalePaid('${esc(String(v.id))}')">✅ Pago</button></div>`
            : `<div style="font-size:10px;color:#34d399;margin-top:2px;">✅ Pago</div>`);
          const statusBtn = isEst
            ? `<span style="font-size:10px; color:#f87171; font-weight:700; white-space:nowrap;">🚫 ESTORNADA</span>`
            : `<button class="btn" style="padding:2px 8px; font-size:11px; color:#f87171;" title="Estornar venda e devolver item ao estoque" onclick="window.CRM.undoSale('${esc(String(v.id))}')">↩️ Estornar</button>`;

          return `
            <tr style="${trStyle}">
              <td style="white-space:nowrap; font-size:11px; color:#94a3b8;">${d}</td>
              <td><b>${esc(v.produtoNome)}</b>${isEst ? ' <span style="font-size:10px; color:#f87171;">(Estornada)</span>' : ''}</td>
              <td style="text-align:center;"><b style="color:${isEst ? '#94a3b8' : '#34d399'};">${v.qtd}</b></td>
              <td style="color:#38bdf8;">${formatBRL(unitVal)}</td>
              <td><b style="color:${isEst ? '#94a3b8' : '#34d399'};">${formatBRL(v.valorTotal)}</b>${(Number(v.valorFrete) || 0) > 0 ? `<br><span style="font-size:10px; color:#fbbf24; font-weight:700;">(Frete: ${formatBRL(v.valorFrete)})</span>` : ''}</td>
              <td style="color:${isEst ? '#94a3b8' : '#fbbf24'};">${isEst ? '—' : '+' + formatBRL(v.lucro)}</td>
              <td>${esc(v.cliente)}</td>
              <td style="font-size:11px;">${esc(v.formaPagamento)}${payBadge}</td>
              <td style="text-align:center;">${statusBtn}</td>
            </tr>
          `;
        }).join('');
      }

      modal.classList.add('open');
    },

    undoSale(saleId) {
      const vidStr = String(saleId);
      const vIdx = (state.vendas || []).findIndex(v => String(v.id) === vidStr);
      if (vIdx === -1) return;
      const v = state.vendas[vIdx];
      if (v.estornada) {
        alert('Esta venda já foi estornada anteriormente.');
        return;
      }

      const descItem = v.isDose ? `Dose Avulsa (${v.doseMg} mg)` : `${v.qtd}x`;
      if (confirm(`Estornar a venda de ${descItem} "${v.produtoNome}" para ${v.cliente}?\n\nO item ou os miligramas voltarão automaticamente para o seu estoque.`)) {
        if (v.isDose) {
          if (!state.frascosDoses) state.frascosDoses = {};
          if (!state.frascosDoses[v.produtoId]) state.frascosDoses[v.produtoId] = { mgRestante: 120, totalAplicadasMg: 0 };
          const curMg = Number(state.frascosDoses[v.produtoId].mgRestante) || 0;
          const addMg = Number(v.doseMg || 0);
          if (curMg + addMg > 120) {
            // Se houve abertura de novo frasco após esta dose, devolve 1 frasco fechado à reserva
            if (!state.meuEstoque) state.meuEstoque = {};
            state.meuEstoque[v.produtoId] = (Number(state.meuEstoque[v.produtoId]) || 0) + 1;
            state.frascosDoses[v.produtoId].mgRestante = (curMg + addMg) - 120;
          } else {
            state.frascosDoses[v.produtoId].mgRestante = curMg + addMg;
          }
          state.frascosDoses[v.produtoId].totalAplicadasMg = Math.max(0, (Number(state.frascosDoses[v.produtoId].totalAplicadasMg) || 0) - addMg);
        } else if (Array.isArray(v.itens) && v.itens.length > 0) {
          if (!state.meuEstoque) state.meuEstoque = {};
          v.itens.forEach(it => {
            state.meuEstoque[it.produtoId] = (Number(state.meuEstoque[it.produtoId]) || 0) + (Number(it.qtd) || 1);
          });
        } else {
          if (!state.meuEstoque) state.meuEstoque = {};
          state.meuEstoque[v.produtoId] = (Number(state.meuEstoque[v.produtoId]) || 0) + v.qtd;
        }

        // Se houver encomenda vinculada à venda, cancela a baixa e devolve o status
        const encVinculada = (state.encomendas || []).find(e => String(e.vendaId) === vidStr);
        if (encVinculada) {
          encVinculada.status = 'pendente';
          encVinculada.vendaId = null;
        }

        // Soft delete (append-only) para preservar histórico na sincronização entre Mac e iPhone
        v.estornada = true;
        v.estornadaEm = new Date().toISOString();
        logAuditoria('estorno_venda', `${v.produtoNome} - ${v.cliente} (${formatBRL(v.valorTotal || 0)})`);

        saveState();
        renderAll();
        window.CRM.openSalesHistoryModal();
        showToast(v.isDose ? `Venda estornada! +${v.doseMg} mg devolvidos ao frasco.` : `Venda estornada! Itens devolvidos ao Estoque BH.`);
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
      const header = ['ID', 'Data', 'Status', 'Origem', 'Produto', 'Quantidade', 'Valor_Unitario_BRL', 'Valor_Total_BRL', 'Forma_Pagamento', 'Cliente', 'Telefone', 'Observacao', 'Lucro_Estimado_BRL'];
      const rows = vendas.map(v => {
        const unitVal = v.valorUnitario || (v.qtd > 0 ? Math.round(v.valorTotal / v.qtd) : v.valorTotal);
        return [
          v.id,
          `"${new Date(v.data).toLocaleString('pt-BR')}"`,
          v.estornada ? '"ESTORNADA"' : '"CONCLUIDA"',
          `"${v.origemAparelho || 'Web'}"`,
          `"${(v.produtoNome || '').replace(/"/g, '""')}"`,
          v.qtd,
          unitVal,
          v.valorTotal,
          `"${(v.formaPagamento || '').replace(/"/g, '""')}"`,
          `"${(v.cliente || '').replace(/"/g, '""')}"`,
          `"${(v.telefone || '').replace(/"/g, '""')}"`,
          `"${(v.obs || '').replace(/"/g, '""')}"`,
          v.estornada ? 0 : v.lucro
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
      if (!Array.isArray(state.pedidosTransito)) {
        state.pedidosTransito = [];
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
                  ${(ped.itens || []).map(it => {
                    const dispIt = getDisponibilidade(it.id_catalogo);
                    const aguardando = dispIt.reservasDetalhes.length;
                    return `
                    <div style="background:#0b1120; padding:6px 10px; border-radius:6px; border:1px solid #1e293b; display:flex; justify-content:space-between; align-items:center; gap:6px;">
                      <div>
                        <span style="color:#f8fafc; font-weight:700;">${it.qtd}x ${it.nome}</span>
                        ${aguardando > 0 ? `<div style="font-size:10px;color:#f59e0b;font-weight:700;">🟡 ${aguardando} cliente(s) aguardando</div>` : ''}
                      </div>
                      <span style="color:#34d399; font-weight:800; font-size:11px;">PIX ${formatBRLInt(it.preco_venda_pix || 900)}</span>
                    </div>
                  `;
                  }).join('')}
                </div>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
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
                    <button class="btn" style="background:#4f46e5; color:#fff; font-weight:700; padding:5px 10px; font-size:11px;" onclick="window.CRM.avisarClientesPedido('${ped.id}')">📲 Avisar clientes aguardando</button>
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

        // Marca encomendas de clientes ligadas aos itens recebidos como 'chegou_bh' para avisar hoje
        const pidsRecebidos = new Set((ped.itens || []).map(it => Number(it.id_catalogo)));
        let clientesParaAvisar = 0;
        (state.encomendas || []).forEach(enc => {
          if (enc.status === 'pendente' || enc.status === 'pedido_ao_fornecedor') {
            if (getEncomendaItens(enc).some(it => pidsRecebidos.has(Number(it.produtoId)))) {
              enc.status = 'chegou_bh';
              enc.chegouEm = new Date().toISOString();
              clientesParaAvisar++;
            }
          }
        });

        ped.status = 'entregue';
        ped.data_entrega = new Date().toISOString();

        saveState();
        renderAll();
        window.CRM.openTransitoModal();
        showToast(clientesParaAvisar > 0
          ? `Pedido recebido (+${totalItens} un)! ${clientesParaAvisar} cliente(s) prontos para avisar!`
          : `Pedido recebido! ${totalItens} unidades somadas ao Estoque BH.`);
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
      if (confirm('Restaurar os pedidos canônicos (3 pedidos em trânsito com 21 unidades a chegar — R$ 10.476,96 investidos + 1 entregue)?')) {
        state.pedidosTransito = JSON.parse(JSON.stringify(PEDIDOS_TRANSITO_CANONICOS));
        state.canonVistos = PEDIDOS_TRANSITO_CANONICOS.map(c => String(c.id));
        saveState();
        renderAll();
        window.CRM.openTransitoModal();
        showToast('Pedidos em trânsito restaurados com sucesso (21 un a chegar)!');
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
      const sBox = document.getElementById('cartShippingBox');
      if (sBox) sBox.style.display = 'none';
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
            const parcelasMsg = isGlpProduct(p) ? 'em até 12x s/ juros' : 'em até 6x s/ juros';
            lines.push(`• *${p.nombre}* (${qtd}x un em mãos)`);
            lines.push(`  💠 *À vista no PIX: ${formatBRLInt(p.precoFinal)}*`);
            lines.push(`  💳 *No Cartão: ${formatBRLInt(p.precoCartao)}* (${parcelasMsg})`);
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
💳 Cartão: R$ 1.000,00 em até 12x sem juros

🧬 Retatrutida 60 mg
💠 Pix: R$ 1.000,00
💳 Cartão: R$ 1.100,00 em até 12x sem juros

💉 Ampolas avulsas de 15 mg
•  Tirzepatida • Lipoless • TG • Tirzec • Lipoland
💠 Pix: R$ 250,00 cada
💳 Cartão: R$ 300,00 cada em até 12x sem juros`;
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
      const sBox = document.getElementById('cartShippingBox');
      const sInp = document.getElementById('cartShippingInput');
      if (sBox) sBox.style.display = 'flex';
      const shippingVal = sInp ? Number(sInp.value) || 0 : 0;
      window.CRM.renderCartWhatsAppText(shippingVal);
      modal.classList.add('open');
    },

    onCartShippingChange(val) {
      const shippingVal = Math.max(0, Number(val) || 0);
      window.CRM.renderCartWhatsAppText(shippingVal);
    },

    setCartShippingPreset(val) {
      const inp = document.getElementById('cartShippingInput');
      if (inp) inp.value = val;
      window.CRM.renderCartWhatsAppText(val);
    },

    renderCartWhatsAppText(frete = 0) {
      const textarea = document.getElementById('waCatalogText');
      const entries = Object.entries(state.cart).filter(([, q]) => q > 0);
      let totalPix = 0;
      let totalCusto = 0;
      const lines = [
        `*ORÇAMENTO & PEDIDO — SHAPE TOTAL BH* 📦✨`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━`
      ];

      entries.forEach(([id, qty]) => {
        const raw = rawCatalog.find(x => String(x.id) === String(id));
        if (raw) {
          const p = computeProduct(raw);
          const sub = p.precoFinal * qty;
          totalPix += sub;
          totalCusto += p.custo * qty;
          lines.push(`• ${qty}x *${p.nombre}* ➔ *${formatBRL(sub)}* (${formatBRL(p.precoFinal)} un)`);
        }
      });

      const freteNum = Number(frete) || 0;
      const totalPixComFrete = totalPix + freteNum;
      const totalCartaoComFrete = totalPix + state.taxaCartaoFixa + freteNum;

      lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
      lines.push(`📦 *Subtotal Medicamentos:* ${formatBRL(totalPix)}`);
      if (freteNum > 0) {
        lines.push(`🚚 *Frete / Envio (Uber Flash / Motoboy):* ${formatBRL(freteNum)}`);
      } else {
        lines.push(`🚚 *Frete:* Retirada em mãos / Frete a combinar`);
      }
      lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
      lines.push(`💰 *TOTAL À VISTA NO PIX: ${formatBRL(totalPixComFrete)}*`);
      lines.push(`💳 *TOTAL NO CARTÃO: ${formatBRL(totalCartaoComFrete)}* (em até 12x s/ juros em GLP-1)`);
      lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
      lines.push(`💠 *Chave PIX (CNPJ):* 64.228.053/0001-47`);
      lines.push(`🏦 *Beneficiário:* BAXTI IMPORTADOS LTDA (Banco Inter)`);
      lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
      lines.push(`🔒 *Garantia:* Medicamentos 100% originais com controle de pureza.`);
      lines.push(`Me envie o comprovante e seu endereço completo para agendarmos o envio! 🚀🤝`);

      if (textarea) textarea.value = lines.join('\n');
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
      const jsonStr = JSON.stringify(buildCompactSyncData());
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
    },

    // ==========================================
    // MÓDULO DE ENCOMENDAS & CONCENTRADOR P/ FORNECEDOR
    // ==========================================

    openEncomendasModal(tab = 'concentrador') {
      const modal = document.getElementById('encomendasModal');
      if (!modal) return;
      window.CRM.switchEncomendasTab(tab);
      window.CRM.renderEncomendas();
      modal.classList.add('open');
    },

    switchEncomendasTab(tab) {
      const tConc = document.getElementById('encTabContentConcentrador');
      const tCli = document.getElementById('encTabContentClientes');
      const tNova = document.getElementById('encTabContentNova');

      const bConc = document.getElementById('tabBtnConcentrador');
      const bCli = document.getElementById('tabBtnClientes');
      const bNova = document.getElementById('tabBtnNova');

      if (tConc) tConc.style.display = tab === 'concentrador' ? 'block' : 'none';
      if (tCli) tCli.style.display = tab === 'clientes' ? 'block' : 'none';
      if (tNova) tNova.style.display = tab === 'nova' ? 'block' : 'none';

      if (bConc) {
        bConc.className = tab === 'concentrador' ? 'btn btn-primary' : 'btn';
        bConc.style.background = tab === 'concentrador' ? '#4f46e5' : '';
        bConc.style.borderColor = tab === 'concentrador' ? '#818cf8' : '';
      }
      if (bCli) {
        bCli.className = tab === 'clientes' ? 'btn btn-primary' : 'btn';
        bCli.style.background = tab === 'clientes' ? '#4f46e5' : '';
        bCli.style.borderColor = tab === 'clientes' ? '#818cf8' : '';
      }
      if (bNova) {
        bNova.className = tab === 'nova' ? 'btn btn-green' : 'btn';
        bNova.style.background = tab === 'nova' ? '#059669' : '';
      }

      if (tab === 'nova') {
        window.CRM.populateEncProdutosDropdown();
      } else {
        window.CRM.renderEncomendas();
      }
    },

    filterEncomendas(status, btnElement) {
      currentEncomendaFilter = status;
      document.querySelectorAll('.enc-filter-btn').forEach(b => b.classList.remove('active'));
      if (btnElement) btnElement.classList.add('active');
      window.CRM.renderEncomendasClientes();
    },

    renderEncomendas() {
      const encomendas = Array.isArray(state.encomendas) ? state.encomendas : [];
      const pendentes = encomendas.filter(e => e.status === 'pendente');
      const transito = encomendas.filter(e => e.status === 'pedido_ao_fornecedor');
      const chegou = encomendas.filter(e => e.status === 'chegou_bh');
      const entregues = encomendas.filter(e => e.status === 'entregue');

      const totalCaixasLote = pendentes.reduce((acc, e) => {
        const itens = getEncomendaItens(e);
        return acc + itens.reduce((s, it) => s + (Number(it.qtd) || 0), 0);
      }, 0);
      const bLote = document.getElementById('encCountLote');
      if (bLote) bLote.textContent = totalCaixasLote;

      const bCli = document.getElementById('encCountClientes');
      if (bCli) bCli.textContent = encomendas.length;

      const fTodas = document.getElementById('countFiltroTodas');
      if (fTodas) fTodas.textContent = encomendas.length;
      const fPend = document.getElementById('countFiltroPendente');
      if (fPend) fPend.textContent = pendentes.length;
      const fTrans = document.getElementById('countFiltroTransito');
      if (fTrans) fTrans.textContent = transito.length;
      const fCheg = document.getElementById('countFiltroChegou');
      if (fCheg) fCheg.textContent = chegou.length;
      const fEntr = document.getElementById('countFiltroEntregue');
      if (fEntr) fEntr.textContent = entregues.length;

      const badgeTop = document.getElementById('countEncomendasBadge');
      if (badgeTop) badgeTop.textContent = pendentes.length;

      window.CRM.renderEncomendasConcentrador();
      window.CRM.renderEncomendasClientes();
    },

    renderEncomendasConcentrador() {
      const encomendas = Array.isArray(state.encomendas) ? state.encomendas : [];
      const pendentes = encomendas.filter(e => e.status === 'pendente' || e.status === 'pedido_ao_fornecedor');

      const grupos = {};
      pendentes.forEach(e => {
        const itens = getEncomendaItens(e);
        itens.forEach(it => {
          const pid = it.produtoId;
          if (!grupos[pid]) {
            grupos[pid] = {
              produtoId: pid,
              qtdTotal: 0,
              valorVendaTotal: 0,
              sinalTotal: 0,
              clientes: [],
              marca: it.marca || '',
              nome: it.produtoNome || ''
            };
          }
          grupos[pid].qtdTotal += Number(it.qtd) || 0;
          grupos[pid].valorVendaTotal += Number(it.subtotal) || (it.qtd * it.precoUnit) || 0;
          grupos[pid].clientes.push({
            cliente: e.cliente,
            telefone: e.telefone,
            qtd: it.qtd,
            encId: e.id
          });
        });
      });

      const listaAgrupada = Object.values(grupos);
      let totalPecas = 0;
      let custoTotalUsd = 0;
      let custoTotalBrl = 0;
      let faturamentoTotal = 0;
      let sinalTotal = 0;

      const tbody = document.getElementById('encConcentradorTableBody');
      if (!tbody) return;

      if (!listaAgrupada.length) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:28px 14px; color:#94a3b8;">Nenhuma encomenda pendente no momento. Clique em <b>➕ Nova Encomenda</b> ou use o botão <b>📝 Encomendar</b> nos produtos do catálogo para cadastrar pedidos de clientes!</td></tr>`;
        document.getElementById('encKpiTotalPecas').textContent = '0 caixas';
        document.getElementById('encKpiTotalClientes').textContent = '0 clientes aguardando';
        document.getElementById('encKpiCustoTotal').textContent = 'US$ 0 / R$ 0,00';
        document.getElementById('encKpiFaturamento').textContent = 'R$ 0,00';
        document.getElementById('encKpiSinalRecebido').textContent = 'R$ 0,00 recebido em sinais';
        document.getElementById('encKpiLucro').textContent = '+R$ 0,00';
        document.getElementById('encKpiRoi').textContent = 'ROI projetado: 0%';
        return;
      }

      const rows = listaAgrupada.map(g => {
        const raw = rawCatalog.find(p => p.id === g.produtoId) || { id: g.produtoId, nombre: g.nome, marca: g.marca, precio: 0 };
        const p = computeProduct(raw);

        totalPecas += g.qtdTotal;
        const itemCustoUsd = (p.usd || 0) * g.qtdTotal;
        const itemCustoBrl = (p.custo || 0) * g.qtdTotal;
        custoTotalUsd += itemCustoUsd;
        custoTotalBrl += itemCustoBrl;
        faturamentoTotal += g.valorVendaTotal;
        sinalTotal += g.sinalTotal;
        const itemLucro = g.valorVendaTotal - itemCustoBrl;

        const foto = p.localFoto || p.remoteFoto || '';
        const imgTag = foto
          ? `<img src="${foto}" class="tbl-thumb" style="width:40px;height:40px;object-fit:contain;border-radius:6px;background:#0f172a;cursor:pointer;border:1px solid #1e293b;" onclick="window.CRM.openFotoPreview('${foto}', '${escapeHtml(p.nombre)}')" onerror="this.parentElement.innerHTML='💊'">`
          : '💊';

        const clientesTags = g.clientes.map(c => 
          `<span style="background:#1e293b; color:#38bdf8; padding:3px 7px; border-radius:5px; font-size:11px; border:1px solid #334155; display:inline-flex; align-items:center; gap:5px; margin:2px;" title="${c.telefone}">
            <span>👤 ${escapeHtml(c.cliente)}: <b>${c.qtd} cx</b></span>
            <button type="button" class="btn btn-xs" style="background:#7f1d1d; color:#fca5a5; padding:0 4px; font-size:10px; height:18px; line-height:16px; border:1px solid #dc2626; border-radius:3px; cursor:pointer;" title="Desistir / Cancelar encomenda de ${escapeHtml(c.cliente)}" onclick="event.stopPropagation(); window.CRM.deleteEncomenda('${c.encId}')">✖</button>
          </span>`
        ).join('');

        return `
          <tr>
            <td style="text-align:center;">${imgTag}</td>
            <td>
              <div style="font-weight:700; color:#fff; font-size:12.5px;">${p.nombre}</div>
              <div style="font-size:11px; color:#38bdf8;">${(p.marca || '').toUpperCase()} · Cód: #${p.id}</div>
            </td>
            <td style="text-align:center;">
              <span class="badge" style="background:#b45309; color:#fef3c7; font-size:14px; font-weight:800; padding:4px 10px; border-radius:6px; border:1px solid #fbbf24;">
                ${g.qtdTotal} cx
              </span>
            </td>
            <td>US$ ${(p.usd || 0).toFixed(2)}</td>
            <td style="color:#f87171; font-weight:700;">${formatBRL(itemCustoBrl)}</td>
            <td style="color:#34d399; font-weight:700;">${formatBRL(g.valorVendaTotal)}</td>
            <td style="color:#38bdf8; font-weight:700;">+${formatBRL(itemLucro)}</td>
            <td>${clientesTags}</td>
            <td style="text-align:center;">
              <button type="button" class="btn btn-xs btn-danger" style="background:#dc2626; color:#fff; font-size:11px; font-weight:700; padding:4px 8px; border-radius:4px; border:1px solid #ef4444;" title="Cancelar e remover encomendas deste medicamento" onclick="window.CRM.cancelarEncomendasProduto(${p.id})">
                🗑️ Cancelar
              </button>
            </td>
          </tr>
        `;
      }).join('');

      tbody.innerHTML = rows;

      const clientesUnicos = new Set(pendentes.map(e => (e.cliente || '').trim().toLowerCase())).size;
      const lucroTotal = faturamentoTotal - custoTotalBrl;
      const roi = custoTotalBrl > 0 ? ((lucroTotal / custoTotalBrl) * 100).toFixed(1) : 0;

      document.getElementById('encKpiTotalPecas').textContent = `${totalPecas} caixas`;
      document.getElementById('encKpiTotalClientes').textContent = `${clientesUnicos} clientes aguardando`;
      document.getElementById('encKpiCustoTotal').textContent = `US$ ${custoTotalUsd.toFixed(2)} / ${formatBRL(custoTotalBrl)}`;
      document.getElementById('encKpiFaturamento').textContent = formatBRL(faturamentoTotal);
      document.getElementById('encKpiSinalRecebido').textContent = `${formatBRL(sinalTotal)} recebido em sinais`;
      document.getElementById('encKpiLucro').textContent = `+${formatBRL(lucroTotal)}`;
      document.getElementById('encKpiRoi').textContent = `ROI projetado: ${roi}%`;
    },

    renderEncomendasClientes() {
      const tbody = document.getElementById('encClientesTableBody');
      if (!tbody) return;

      const encomendas = Array.isArray(state.encomendas) ? state.encomendas : [];
      let filtered = encomendas;
      if (currentEncomendaFilter !== 'todas') {
        filtered = encomendas.filter(e => e.status === currentEncomendaFilter);
      }

      if (!filtered.length) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:28px 14px; color:#94a3b8;">Nenhuma encomenda encontrada com o filtro selecionado.</td></tr>`;
        return;
      }

      const rows = filtered.map(e => {
        const itens = getEncomendaItens(e);
        const itensHtml = itens.map(it => {
          const rawIt = rawCatalog.find(p => p.id === it.produtoId) || { id: it.produtoId, nombre: it.produtoNome, marca: it.marca };
          const pIt = computeProduct(rawIt);
          const fotoIt = pIt.localFoto || pIt.remoteFoto || '';
          const img = fotoIt
            ? `<img src="${fotoIt}" class="tbl-thumb" style="width:34px;height:34px;object-fit:contain;border-radius:4px;background:#0f172a;cursor:pointer;border:1px solid #1e293b;" onclick="window.CRM.openFotoPreview('${fotoIt}', '${escapeHtml(it.produtoNome)}')" onerror="this.parentElement.innerHTML='💊'">`
            : '💊';
          return `
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px; background:#020617; padding:4px 6px; border-radius:4px; border:1px solid #1e293b;">
              <div style="width:34px; height:34px; min-width:34px; display:flex; align-items:center; justify-content:center;">
                ${img}
              </div>
              <div style="min-width:0; overflow:hidden;">
                <div style="font-weight:700; color:#fff; font-size:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(it.produtoNome)}</div>
                <div style="font-size:11px; color:#fbbf24;"><b>${it.qtd} cx</b> · ${formatBRL(it.subtotal || (it.qtd * it.precoUnit))}</div>
              </div>
            </div>
          `;
        }).join('');

        const dataStr = e.data ? new Date(e.data).toLocaleDateString('pt-BR') : '';
        const telLimpo = (e.telefone || '').replace(/\D/g, '');
        const waLink = telLimpo ? `https://wa.me/55${telLimpo.replace(/^55/, '')}` : null;

        const statusColors = {
          'pendente': { bg: '#b45309', color: '#fef3c7', text: '🟡 Aguardando Lote' },
          'pedido_ao_fornecedor': { bg: '#0369a1', color: '#e0f2fe', text: '🚚 A Caminho' },
          'chegou_bh': { bg: '#059669', color: '#d1fae5', text: '🟢 Chegou em BH' },
          'entregue': { bg: '#334155', color: '#cbd5e1', text: '✅ Entregue' },
          'cancelado': { bg: '#dc2626', color: '#fee2e2', text: '❌ Cancelado' }
        };
        const stInfo = statusColors[e.status] || { bg: '#334155', color: '#fff', text: e.status };

        return `
          <tr>
            <td style="font-size:11px; color:#94a3b8; white-space:nowrap;">${dataStr}</td>
            <td>
              <div style="font-weight:700; color:#fff; font-size:13px;">${escapeHtml(e.cliente)}</div>
              ${e.telefone ? `<div style="font-size:11px; margin-top:2px;"><a href="${waLink}" target="_blank" style="color:#38bdf8; text-decoration:none;">📱 ${escapeHtml(e.telefone)}</a></div>` : ''}
              ${e.endereco ? `<div style="font-size:10.5px; color:#94a3b8; max-width:220px; white-space:normal; line-height:1.2; margin-top:3px;">📍 ${escapeHtml(e.endereco)}</div>` : ''}
            </td>
            <td style="min-width:220px;">
              ${itensHtml}
              <div style="font-size:10.5px; color:#94a3b8; margin-top:2px;">
                Pagamento: <b style="color:#38bdf8;">${(e.formaPagamento === 'cartao' ? '💳 Cartão (até 12x)' : '💠 PIX')}</b>
              </div>
            </td>
            <td>
              <div style="font-weight:800; color:#34d399; font-size:13px;">${formatBRL(e.valorTotal)}</div>
              ${e.frete > 0 ? `<div style="font-size:10.5px; color:#fbbf24;">+${formatBRL(e.frete)} frete</div>` : ''}
            </td>
            <td>
              <div style="font-size:11px;">Sinal: <b style="color:#fbbf24;">${formatBRL(e.sinal || 0)}</b></div>
              <div style="font-size:11px;">Saldo: <b style="color:#cbd5e1;">${formatBRL(e.saldoRestante || (e.valorTotal - (e.sinal || 0)))}</b></div>
            </td>
            <td>
              <select class="filter-select" style="font-size:11px; padding:3px 6px; font-weight:700; background:${stInfo.bg}; color:${stInfo.color}; border:1px solid rgba(255,255,255,0.2);" onchange="window.CRM.changeStatusEncomenda('${e.id}', this.value)">
                <option value="pendente" ${e.status === 'pendente' ? 'selected' : ''}>🟡 Aguardando Lote</option>
                <option value="pedido_ao_fornecedor" ${e.status === 'pedido_ao_fornecedor' ? 'selected' : ''}>🚚 A Caminho</option>
                <option value="chegou_bh" ${e.status === 'chegou_bh' ? 'selected' : ''}>🟢 Chegou em BH</option>
                <option value="entregue" ${e.status === 'entregue' ? 'selected' : ''}>✅ Entregue</option>
                <option value="cancelado" ${e.status === 'cancelado' ? 'selected' : ''}>❌ Cancelado</option>
              </select>
            </td>
            <td style="text-align:center;">
              <div style="display:flex; gap:4px; justify-content:center; flex-wrap:wrap;">
                <button class="btn btn-xs btn-primary" style="background:#4f46e5; border-color:#818cf8; font-size:11px;" title="Ver Comprovante com Foto" onclick="window.CRM.openEncomendaReceiptModal('${e.id}')">
                  🧾 Recibo c/ Foto
                </button>
                ${e.status === 'entregue' ? `
                  <span class="badge" style="background:#065f46; color:#a7f3d0; font-size:10.5px; font-weight:800; padding:3px 6px; border-radius:4px;" title="Estoque físico já abatido e venda registrada">✅ Baixado</span>
                  <button class="btn btn-xs" style="background:#7f1d1d; color:#fca5a5; border:1px solid #dc2626; font-size:10.5px; font-weight:700;" title="Cancelar baixa e devolver medicamentos ao estoque" onclick="window.CRM.estornarEncomendaEntregue('${e.id}')">
                    ↩️ Estornar Venda
                  </button>
                ` : `
                  <button class="btn btn-xs btn-green" style="background:#059669; color:#fff; font-size:11px; font-weight:800;" title="Dar baixa no estoque BH e registrar venda no histórico" onclick="window.CRM.entregarEncomendaEDarBaixa('${e.id}')">
                    💰 Baixar Estoque
                  </button>
                `}
                ${e.status === 'chegou_bh' ? `
                  <button class="btn btn-xs btn-green" style="background:#0284c7; color:#fff; font-size:11px;" title="Avisar no WhatsApp que chegou em BH" onclick="window.CRM.openAvisoChegadaWhatsApp('${e.id}')">
                    🎉 Avisar Chegada
                  </button>
                ` : ''}
                <button class="btn btn-xs btn-danger" style="background:#dc2626; color:#fff; font-size:11px;" title="Excluir Encomenda" onclick="window.CRM.deleteEncomenda('${e.id}')">
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      tbody.innerHTML = rows;
    },

    openOrdemCompraVisualModal() {
      const encomendas = Array.isArray(state.encomendas) ? state.encomendas : [];
      const pendentes = encomendas.filter(e => e.status === 'pendente');

      const grupos = {};
      pendentes.forEach(e => {
        const itens = getEncomendaItens(e);
        itens.forEach(it => {
          const pid = it.produtoId;
          if (!grupos[pid]) {
            grupos[pid] = {
              produtoId: pid,
              qtdTotal: 0,
              nome: it.produtoNome || '',
              marca: it.marca || ''
            };
          }
          grupos[pid].qtdTotal += Number(it.qtd) || 0;
        });
      });

      const listaAgrupada = Object.values(grupos);
      const container = document.getElementById('ordemCompraVisualGrid');
      const modal = document.getElementById('ordemCompraVisualModal');
      if (!container || !modal) return;

      let totalPecas = 0;
      let custoTotalUsd = 0;
      let custoTotalBrl = 0;

      if (!listaAgrupada.length) {
        container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px 20px; color:#94a3b8; font-size:14px;">Nenhuma encomenda pendente no momento para gerar ordem de compra com fotos.</div>`;
        document.getElementById('ocvTotalCaixas').textContent = '0';
        document.getElementById('ocvTotalItens').textContent = '0 medicamentos diferentes';
        document.getElementById('ocvCustoTotal').textContent = 'US$ 0.00 / R$ 0,00';
        modal.classList.add('open');
        return;
      }

      const cardsHtml = listaAgrupada.map(g => {
        const raw = rawCatalog.find(p => p.id === g.produtoId) || { id: g.produtoId, nombre: g.nome, marca: g.marca, precio: 0, foto: '' };
        const p = computeProduct(raw);
        totalPecas += g.qtdTotal;
        const itemCustoUsd = (p.usd || 0) * g.qtdTotal;
        const itemCustoBrl = (p.custo || 0) * g.qtdTotal;
        custoTotalUsd += itemCustoUsd;
        custoTotalBrl += itemCustoBrl;

        const foto = p.localFoto || p.remoteFoto || '';
        const imgTag = foto
          ? `<img src="${foto}" alt="${escapeHtml(p.nombre)}" style="width:100%; height:140px; object-fit:contain; border-radius:6px; background:#020617; border:1px solid #1e293b;" onerror="this.parentElement.innerHTML='<div style=\\'height:140px;display:flex;align-items:center;justify-content:center;background:#020617;font-size:32px;\\'>💊</div>';">`
          : `<div style="height:140px; display:flex; align-items:center; justify-content:center; background:#020617; font-size:32px; border-radius:6px; border:1px solid #1e293b;">💊</div>`;

        return `
          <div style="background:#0f172a; border:2px solid #334155; border-radius:10px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 6px -1px rgba(0,0,0,0.3);">
            <div>
              <div style="position:relative; margin-bottom:10px;">
                ${imgTag}
                <div style="position:absolute; top:6px; right:6px; background:#b45309; color:#fef3c7; border:2px solid #fbbf24; font-size:16px; font-weight:900; padding:4px 10px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.5);">
                  ${g.qtdTotal} cx
                </div>
              </div>
              <div style="font-size:11px; font-weight:800; color:#38bdf8; text-transform:uppercase; margin-bottom:2px;">
                ${(p.marca || '').toUpperCase()} · CÓD #${p.id}
              </div>
              <div style="font-size:13px; font-weight:800; color:#fff; line-height:1.3; margin-bottom:6px;">
                ${escapeHtml(p.nombre)}
              </div>
              ${p.composicion ? `<div style="font-size:11px; color:#94a3b8; line-height:1.2; margin-bottom:6px;">${escapeHtml(p.composicion)}</div>` : ''}
            </div>

            <div style="margin-top:10px; padding-top:8px; border-top:1px solid #1e293b; display:flex; justify-content:space-between; align-items:center; font-size:11px;">
              <span style="color:#94a3b8;">Custo est.: US$ ${(p.usd || 0).toFixed(2)}</span>
              <span style="color:#f87171; font-weight:700;">Subtotal: ${formatBRL(itemCustoBrl)}</span>
            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = cardsHtml;
      document.getElementById('ocvTotalCaixas').textContent = totalPecas;
      document.getElementById('ocvTotalItens').textContent = `${listaAgrupada.length} medicamentos diferentes`;
      document.getElementById('ocvCustoTotal').textContent = `US$ ${custoTotalUsd.toFixed(2)} / ${formatBRL(custoTotalBrl)}`;
      modal.classList.add('open');
    },

    openFotoPreview(url, title) {
      const modal = document.getElementById('fotoPreviewModal');
      const img = document.getElementById('fotoPreviewImg');
      const t = document.getElementById('fotoPreviewTitle');
      if (!modal || !img) return;
      img.src = url || '';
      if (t) t.textContent = title || 'Foto do Medicamento';
      modal.classList.add('open');
    },

    populateEncClientesDatalist() {
      const dl = document.getElementById('encClientesDatalist');
      if (!dl) return;
      const nomes = new Set();
      (state.vendas || []).forEach(v => { if (v && v.cliente) nomes.add(v.cliente.trim()); });
      (state.encomendas || []).forEach(e => { if (e && e.cliente) nomes.add(e.cliente.trim()); });
      dl.innerHTML = Array.from(nomes).sort().map(n => `<option value="${escapeHtml(n)}"></option>`).join('');
    },

    onEncClienteSelect(val) {
      const nome = (val || '').trim().toLowerCase();
      if (!nome) return;
      // Procura último cadastro com este cliente para autopreencher telefone e endereço
      const all = [...(state.encomendas || []), ...(state.vendas || [])];
      const match = all.find(x => (x.cliente || '').trim().toLowerCase() === nome);
      if (match) {
        const telInp = document.getElementById('encNovoTelefone');
        const endInp = document.getElementById('encNovoEndereco');
        if (telInp && !telInp.value && match.telefone) telInp.value = match.telefone;
        if (endInp && !endInp.value && match.endereco) endInp.value = match.endereco;
      }
      renderClientHistoryBanner(val, 'encClientHistoryBanner');
    },

    populateEncProdutosDropdown(selectedId = null) {
      const searchInp = document.getElementById('encNovoBuscaInput');
      if (searchInp) searchInp.value = '';
      window.CRM.filterEncProdutosSelect('', selectedId);
      window.CRM.populateEncClientesDatalist();
    },

    filterEncProdutosSelect(query, selectedId = null) {
      const sel = document.getElementById('encNovoProdutoSelect');
      const badge = document.getElementById('encSearchCountBadge');
      if (!sel) return;

      const q = (query || '').toLowerCase().trim();
      let filtered = rawCatalog;
      if (q) {
        filtered = rawCatalog.filter(p => {
          const txt = `${p.id} ${p.nombre || ''} ${p.marca || ''} ${p.composicion || ''} ${p.desc_comercial || ''}`.toLowerCase();
          return txt.includes(q);
        });
      }

      const isPronta = currentPedidoOperacao === 'pronta_entrega';
      const inStock = filtered.filter(p => ((state.meuEstoque || {})[p.id] || 0) > 0);
      const outStock = filtered.filter(p => !((state.meuEstoque || {})[p.id] || 0));

      if (!filtered.length) {
        sel.innerHTML = `<option value="">Nenhum produto encontrado com "${escapeHtml(q)}"</option>`;
        if (badge) badge.textContent = '0 opções';
        return;
      }

      let optionsHtml = '';
      if (isPronta && inStock.length > 0) {
        optionsHtml += `<optgroup label="✅ Pronta Entrega BH (${inStock.length} disponíveis)">`;
        optionsHtml += inStock.map(p => `
          <option value="${p.id}" ${p.id === selectedId ? 'selected' : ''}>
            ${p.nombre} — ${(p.marca || '').toUpperCase()} (Estoque: ${(state.meuEstoque || {})[p.id]} un)
          </option>
        `).join('');
        optionsHtml += `</optgroup>`;

        if (outStock.length > 0) {
          optionsHtml += `<optgroup label="📦 Outros Produtos do Catálogo (${outStock.length})">`;
          optionsHtml += outStock.slice(0, 60).map(p => `
            <option value="${p.id}" ${p.id === selectedId ? 'selected' : ''}>
              ${p.nombre} — ${(p.marca || '').toUpperCase()} (Estoque: 0)
            </option>
          `).join('');
          optionsHtml += `</optgroup>`;
        }
      } else {
        const sorted = [...filtered].sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));
        optionsHtml = sorted.map(p => {
          const stk = (state.meuEstoque || {})[p.id] || 0;
          return `<option value="${p.id}" ${p.id === selectedId ? 'selected' : ''}>${p.nombre} — ${(p.marca || '').toUpperCase()}${stk > 0 ? ` [Estoque: ${stk}]` : ''}</option>`;
        }).join('');
      }

      sel.innerHTML = optionsHtml;

      if (badge) {
        if (isPronta) {
          badge.textContent = `${inStock.length} em pronta entrega · ${filtered.length} total`;
        } else {
          badge.textContent = q ? `${filtered.length} encontrados` : `${filtered.length} opções`;
        }
      }

      const hasSelected = selectedId && filtered.some(p => p.id === selectedId);
      const targetId = hasSelected ? selectedId : (isPronta && inStock.length > 0 ? inStock[0].id : (filtered[0] ? filtered[0].id : null));
      if (targetId) {
        sel.value = targetId;
        window.CRM.onEncProdutoChange(targetId);
      }
    },

    setPedidoOperacao(tipo) {
      currentPedidoOperacao = tipo === 'encomenda' ? 'encomenda' : 'pronta_entrega';
      const isPronta = currentPedidoOperacao === 'pronta_entrega';

      const btnPe = document.getElementById('btnOpProntaEntrega');
      const btnEnc = document.getElementById('btnOpEncomenda');
      const hint = document.getElementById('encOperacaoHint');
      const tit = document.getElementById('encNovaTitulo');
      const btnSimples = document.getElementById('btnSalvarPedidoSimples');
      const btnWa = document.getElementById('btnSalvarPedidoWhatsApp');

      if (isPronta) {
        if (btnPe) {
          btnPe.style.background = '#059669';
          btnPe.style.color = '#fff';
          btnPe.style.border = '2px solid #34d399';
        }
        if (btnEnc) {
          btnEnc.style.background = '#1e293b';
          btnEnc.style.color = '#fbbf24';
          btnEnc.style.border = '1px solid #d97706';
        }
        if (hint) {
          hint.textContent = '🟢 Pronta Entrega: Abate estoque físico em BH imediatamente e registra venda';
          hint.style.color = '#34d399';
        }
        if (tit) tit.innerHTML = '💰 Nova Venda & Baixa de Estoque BH';
        if (btnSimples) btnSimples.textContent = '💾 Baixar Estoque & Salvar Venda';
        if (btnWa) btnWa.textContent = '📲 Baixar Estoque & Enviar WhatsApp';
      } else {
        if (btnPe) {
          btnPe.style.background = '#1e293b';
          btnPe.style.color = '#38bdf8';
          btnPe.style.border = '1px solid #334155';
        }
        if (btnEnc) {
          btnEnc.style.background = '#b45309';
          btnEnc.style.color = '#fff';
          btnEnc.style.border = '2px solid #fbbf24';
        }
        if (hint) {
          hint.textContent = '🇵🇾 Encomenda Paraguai: Entra no concentrador do fornecedor e aguarda chegada em BH';
          hint.style.color = '#fbbf24';
        }
        if (tit) tit.innerHTML = '📝 Nova Encomenda p/ Importar (Paraguai)';
        if (btnSimples) btnSimples.textContent = '💾 Salvar Encomenda';
        if (btnWa) btnWa.textContent = '📲 Salvar & Enviar Recibo WhatsApp';
      }

      window.CRM.filterEncProdutosSelect(document.getElementById('encNovoBuscaInput') ? document.getElementById('encNovoBuscaInput').value : '');
    },

    quickSearchEncProduto(term) {
      const inp = document.getElementById('encNovoBuscaInput');
      if (inp) {
        inp.value = term;
        inp.focus();
      }
      window.CRM.filterEncProdutosSelect(term);
    },

    openNovaEncomendaModal(productId = null, operacao = 'encomenda') {
      const modal = document.getElementById('encomendasModal');
      if (!modal) return;
      renderClientHistoryBanner('', 'encClientHistoryBanner');
      window.CRM.switchEncomendasTab('nova');
      window.CRM.setPedidoOperacao(operacao);
      window.CRM.populateEncClientesDatalist();
      novaEncomendaItens = [];

      if (productId) {
        const prod = rawCatalog.find(p => p.id === productId);
        if (prod) {
          const p = computeProduct(prod);
          const pag = document.getElementById('encNovoPagamento') ? document.getElementById('encNovoPagamento').value : 'pix';
          const precoUnit = Math.round(pag === 'cartao' ? p.precoCartao : p.precoFinal);
          novaEncomendaItens.push({
            produtoId: p.id,
            produtoNome: p.nombre,
            marca: p.marca || '',
            qtd: 1,
            precoUnit: precoUnit,
            subtotal: precoUnit
          });
        }
        window.CRM.populateEncProdutosDropdown(productId);
      } else {
        window.CRM.populateEncProdutosDropdown(null);
      }

      window.CRM.renderNovaEncomendaItens();
      modal.classList.add('open');
    },

    onEncProdutoChange(val) {
      const pid = Number(val);
      const raw = rawCatalog.find(p => p.id === pid);
      if (!raw) return;
      const p = computeProduct(raw);
      const pag = document.getElementById('encNovoPagamento') ? document.getElementById('encNovoPagamento').value : 'pix';
      const precoSugerido = pag === 'cartao' ? p.precoCartao : p.precoFinal;

      const pInp = document.getElementById('encNovoPrecoUnit');
      if (pInp) pInp.value = Math.round(precoSugerido);
      window.CRM.onEncTempItemCalc();
    },

    onEncPagamentoChange() {
      const pid = Number(document.getElementById('encNovoProdutoSelect').value);
      if (pid) window.CRM.onEncProdutoChange(pid);
      // Recalcula preços dos itens já no carrinho se o usuário desejar
      const pag = document.getElementById('encNovoPagamento').value;
      novaEncomendaItens.forEach(it => {
        const raw = rawCatalog.find(p => p.id === it.produtoId);
        if (raw) {
          const p = computeProduct(raw);
          it.precoUnit = Math.round(pag === 'cartao' ? p.precoCartao : p.precoFinal);
          it.subtotal = it.qtd * it.precoUnit;
        }
      });
      window.CRM.renderNovaEncomendaItens();
    },

    onEncTempItemCalc() {
      const qtd = Math.max(1, Number(document.getElementById('encNovoQtd').value) || 1);
      const preco = Math.max(0, Number(document.getElementById('encNovoPrecoUnit').value) || 0);
      const subEl = document.getElementById('encNovoSubtotalItem');
      if (subEl) subEl.value = qtd * preco;
    },

    addEncItemToOrder() {
      const pid = Number(document.getElementById('encNovoProdutoSelect').value);
      if (!pid) {
        alert('Selecione um medicamento válido do catálogo.');
        return;
      }
      const raw = rawCatalog.find(p => p.id === pid);
      if (!raw) return;
      const p = computeProduct(raw);

      const qtd = Math.max(1, Number(document.getElementById('encNovoQtd').value) || 1);
      const precoUnit = Math.max(0, Number(document.getElementById('encNovoPrecoUnit').value) || 0);
      const subtotal = qtd * precoUnit;

      const existing = novaEncomendaItens.find(x => x.produtoId === pid);
      if (existing) {
        existing.qtd += qtd;
        existing.subtotal = existing.qtd * existing.precoUnit;
      } else {
        novaEncomendaItens.push({
          produtoId: pid,
          produtoNome: p.nombre,
          marca: p.marca || '',
          qtd: qtd,
          precoUnit: precoUnit,
          subtotal: subtotal
        });
      }

      window.CRM.renderNovaEncomendaItens();
      showToast(`+${qtd}x ${p.nombre} adicionado ao pedido!`);
    },

    removeEncItem(index) {
      if (index >= 0 && index < novaEncomendaItens.length) {
        novaEncomendaItens.splice(index, 1);
        window.CRM.renderNovaEncomendaItens();
      }
    },

    changeEncItemQty(index, delta) {
      if (index >= 0 && index < novaEncomendaItens.length) {
        const item = novaEncomendaItens[index];
        item.qtd += delta;
        if (item.qtd <= 0) {
          novaEncomendaItens.splice(index, 1);
        } else {
          item.subtotal = item.qtd * item.precoUnit;
        }
        window.CRM.renderNovaEncomendaItens();
      }
    },

    clearNovaEncomendaItens() {
      if (!novaEncomendaItens.length) return;
      if (confirm('Deseja limpar todos os medicamentos adicionados a este pedido?')) {
        novaEncomendaItens = [];
        window.CRM.renderNovaEncomendaItens();
      }
    },

    renderNovaEncomendaItens() {
      const container = document.getElementById('encNovoItensContainer');
      const countBadge = document.getElementById('encItensCountBadge');
      if (countBadge) countBadge.textContent = novaEncomendaItens.length;
      if (!container) return;

      if (!novaEncomendaItens.length) {
        container.innerHTML = `
          <div style="text-align:center; padding:18px 10px; color:#94a3b8; font-size:12px;">
            Nenhum medicamento adicionado a este pedido ainda.<br>
            <span style="color:#38bdf8;">Escolha o produto acima e clique no botão azul <b>➕ Adicionar ao Pedido</b>.</span>
          </div>
        `;
        window.CRM.recalcNovaEncomendaTotals();
        return;
      }

      const rowsHtml = novaEncomendaItens.map((it, idx) => {
        const raw = rawCatalog.find(p => p.id === it.produtoId) || {};
        const p = computeProduct(raw);
        const foto = p.localFoto || p.remoteFoto || '';
        const imgTag = foto
          ? `<img src="${foto}" style="width:36px; height:36px; object-fit:contain; border-radius:4px; background:#0f172a; border:1px solid #1e293b;" onerror="this.parentElement.innerHTML='💊'">`
          : '💊';

        return `
          <div style="display:flex; justify-content:space-between; align-items:center; background:#0f172a; padding:8px 10px; border-radius:6px; margin-bottom:6px; border:1px solid #1e293b; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px; flex:1; min-width:0;">
              <div style="width:36px; height:36px; min-width:36px; display:flex; align-items:center; justify-content:center;">
                ${imgTag}
              </div>
              <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                <div style="font-size:12px; font-weight:800; color:#fff; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(it.produtoNome)}</div>
                <div style="font-size:10.5px; color:#38bdf8;">${formatBRL(it.precoUnit)} cada un</div>
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:8px;">
              <div style="display:flex; align-items:center; gap:4px; background:#020617; border:1px solid #334155; border-radius:4px; padding:2px;">
                <button type="button" class="btn" style="padding:1px 6px; font-size:11px; height:22px; min-width:22px;" onclick="window.CRM.changeEncItemQty(${idx}, -1)">-</button>
                <b style="font-size:13px; color:#fbbf24; min-width:22px; text-align:center;">${it.qtd}</b>
                <button type="button" class="btn" style="padding:1px 6px; font-size:11px; height:22px; min-width:22px;" onclick="window.CRM.changeEncItemQty(${idx}, 1)">+</button>
              </div>

              <div style="font-size:13px; font-weight:800; color:#34d399; min-width:80px; text-align:right;">
                ${formatBRL(it.subtotal)}
              </div>

              <button type="button" class="btn btn-xs btn-danger" style="background:#dc2626; color:#fff; padding:2px 6px; font-size:11px;" title="Remover item" onclick="window.CRM.removeEncItem(${idx})">
                ✖
              </button>
            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = rowsHtml;
      window.CRM.recalcNovaEncomendaTotals();
    },

    recalcNovaEncomendaTotals() {
      const subtotalProdutos = novaEncomendaItens.reduce((s, it) => s + (Number(it.subtotal) || 0), 0);
      const subInp = document.getElementById('encNovoSubtotalProdutos');
      if (subInp) subInp.value = formatBRL(subtotalProdutos);

      const frete = Math.max(0, Number(document.getElementById('encNovoFrete') ? document.getElementById('encNovoFrete').value : 0) || 0);
      const totalGeral = subtotalProdutos + frete;

      const totInp = document.getElementById('encNovoValorTotal');
      if (totInp) totInp.value = formatBRL(totalGeral);

      const sinal = Math.max(0, Number(document.getElementById('encNovoSinal') ? document.getElementById('encNovoSinal').value : 0) || 0);
      const saldoRestante = Math.max(0, totalGeral - sinal);

      const salInp = document.getElementById('encNovoSaldoRestante');
      if (salInp) salInp.value = formatBRL(saldoRestante);

      // Prévia de Lucro Líquido Real e contagem de caixas
      let custoTotalBrl = 0;
      let totalCaixas = 0;
      novaEncomendaItens.forEach(it => {
        const raw = rawCatalog.find(p => p.id === it.produtoId) || {};
        const p = computeProduct(raw);
        custoTotalBrl += (p.custo || 0) * it.qtd;
        totalCaixas += it.qtd;
      });
      const lucroEst = subtotalProdutos - custoTotalBrl;
      const hintProfit = document.getElementById('encProfitPreviewHint');
      const hintItems = document.getElementById('encItemsSummaryHint');
      if (hintProfit) hintProfit.textContent = `Lucro previsto deste pedido: +${formatBRL(lucroEst)}`;
      if (hintItems) hintItems.textContent = `${totalCaixas} caixas no pedido (${novaEncomendaItens.length} tipos de medicamentos)`;
    },

    saveNovaEncomenda(enviarWa = false) {
      const cliente = (document.getElementById('encNovoCliente').value || '').trim();
      const telefone = (document.getElementById('encNovoTelefone').value || '').trim();
      const endereco = (document.getElementById('encNovoEndereco').value || '').trim();
      const formaPagamento = document.getElementById('encNovoPagamento') ? document.getElementById('encNovoPagamento').value : 'pix';
      const frete = Math.max(0, Number(document.getElementById('encNovoFrete') ? document.getElementById('encNovoFrete').value : 0) || 0);
      const sinal = Number(document.getElementById('encNovoSinal') ? document.getElementById('encNovoSinal').value : 0) || 0;
      const obs = (document.getElementById('encNovoObs') ? document.getElementById('encNovoObs').value : '').trim();

      if (!cliente) {
        alert('Por favor, informe o Nome do Cliente para cadastrar a encomenda.');
        const cInp = document.getElementById('encNovoCliente');
        if (cInp) cInp.focus();
        return;
      }

      // Se o usuário selecionou o produto no catálogo mas não clicou no botão "➕ Adicionar ao Pedido"
      if (!novaEncomendaItens.length) {
        const sel = document.getElementById('encNovoProdutoSelect');
        const pid = Number(sel ? sel.value : 0);
        if (pid) {
          const raw = rawCatalog.find(p => p.id === pid);
          if (raw) {
            const p = computeProduct(raw);
            const qtd = Math.max(1, Number(document.getElementById('encNovoQtd') ? document.getElementById('encNovoQtd').value : 1) || 1);
            let precoUnit = Number(document.getElementById('encNovoPrecoUnit') ? document.getElementById('encNovoPrecoUnit').value : 0) || 0;
            if (precoUnit <= 0) {
              precoUnit = Math.round(formaPagamento === 'cartao' ? p.precoCartao : p.precoFinal);
            }
            novaEncomendaItens.push({
              produtoId: pid,
              produtoNome: p.nombre,
              marca: p.marca || '',
              qtd: qtd,
              precoUnit: precoUnit,
              subtotal: qtd * precoUnit
            });
          }
        }
      }

      if (!novaEncomendaItens.length) {
        alert('Por favor, selecione um medicamento e clique em "➕ Adicionar ao Pedido" antes de salvar.');
        return;
      }

      const subtotalProdutos = novaEncomendaItens.reduce((s, it) => s + (Number(it.subtotal) || 0), 0);
      const valorTotal = subtotalProdutos + frete;
      const saldoRestante = Math.max(0, valorTotal - sinal);
      const isProntaEntrega = currentPedidoOperacao === 'pronta_entrega';

      // 1. Se for pronta entrega, valida disponibilidade livre e abate do estoque físico BH
      if (isProntaEntrega) {
        for (const it of novaEncomendaItens) {
          const disp = getDisponibilidade(it.produtoId);
          if (it.qtd > disp.disponivel) {
            const msgDisp = disp.reservado > 0
              ? `⚠️ "${it.produtoNome}" tem ${disp.reservado} un reservada(s) para outros clientes.\nDisponível livre: ${disp.disponivel} un (BH: ${disp.estoqueBH} un).\n\nDeseja vender mesmo assim (ou trocar para Encomenda)?`
              : `⚠️ "${it.produtoNome}" tem apenas ${disp.disponivel} un disponível em BH (solicitado: ${it.qtd}).\n\nDeseja vender mesmo assim?`;
            if (!confirm(msgDisp)) return;
          }
        }
        if (!state.meuEstoque) state.meuEstoque = {};
        novaEncomendaItens.forEach(it => {
          const curStock = Number(state.meuEstoque[it.produtoId] || 0);
          const nextStock = curStock - it.qtd;
          if (nextStock <= 0) {
            delete state.meuEstoque[it.produtoId];
          } else {
            state.meuEstoque[it.produtoId] = nextStock;
          }
        });
      }

      // 2. Calcula custo total e lucro líquido real do pedido
      let custoTotalBrl = 0;
      novaEncomendaItens.forEach(it => {
        const raw = rawCatalog.find(x => x.id === it.produtoId) || {};
        const p = computeProduct(raw);
        custoTotalBrl += (p.custo || 0) * it.qtd;
      });
      const lucroEst = subtotalProdutos - custoTotalBrl;

      const saleId = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
      const encId = 'ENC-' + Date.now().toString().slice(-6) + '-' + Math.random().toString(36).substr(2, 3);
      const aparelhoOrigem = /iPhone|iPad/i.test(navigator.userAgent) ? 'iPhone' : 'Mac';

      // 3. Se for pronta entrega, grava a venda oficial no histórico com conciliação imediata
      if (isProntaEntrega) {
        const primeiroItem = novaEncomendaItens[0];
        const nomesProdutos = novaEncomendaItens.length === 1
          ? primeiroItem.produtoNome
          : `${novaEncomendaItens.length} medicamentos: ` + novaEncomendaItens.map(it => `${it.qtd}x ${it.produtoNome}`).join(' + ');

        const venda = {
          id: saleId,
          data: new Date().toISOString(),
          produtoId: primeiroItem.produtoId || 0,
          produtoNome: nomesProdutos,
          marca: primeiroItem.marca || 'Shape Total',
          qtd: novaEncomendaItens.reduce((s, it) => s + it.qtd, 0),
          itens: [...novaEncomendaItens],
          isDose: false,
          doseMg: 0,
          estornada: false,
          origemAparelho: aparelhoOrigem,
          valorUnitario: primeiroItem.precoUnit,
          valorProdutos: subtotalProdutos,
          valorFrete: frete,
          valorTotal: valorTotal,
          formaPagamento: formaPagamento === 'cartao' ? '💳 Cartão de Crédito (até 12x s/ juros)' : '💠 À vista no PIX',
          cliente: cliente,
          telefone: telefone,
          obs: `Venda Pronta Entrega (${encId})${endereco ? ` · Entrega: ${endereco}` : ''}${obs ? ` · ${obs}` : ''}`.trim(),
          custoTotal: custoTotalBrl,
          lucro: lucroEst
        };

        if (!state.vendas) state.vendas = [];
        state.vendas.unshift(venda);
      }

      // 4. Salva a encomenda (se pronta entrega, status 'entregue' vinculada à venda; se encomenda, 'pendente')
      const primeiroItem = novaEncomendaItens[0];
      const newEnc = {
        id: encId,
        data: new Date().toISOString(),
        cliente,
        telefone,
        endereco,
        status: isProntaEntrega ? 'entregue' : 'pendente',
        tipoOperacao: currentPedidoOperacao,
        produtoId: primeiroItem.produtoId,
        produtoNome: primeiroItem.produtoNome,
        marca: primeiroItem.marca,
        qtd: novaEncomendaItens.reduce((s, it) => s + it.qtd, 0),
        precoUnit: primeiroItem.precoUnit,
        itens: [...novaEncomendaItens],
        formaPagamento,
        valorProdutos: subtotalProdutos,
        frete,
        valorTotal,
        sinal: isProntaEntrega ? valorTotal : sinal,
        saldoRestante: isProntaEntrega ? 0 : saldoRestante,
        obs,
        loteId: null,
        vendaId: isProntaEntrega ? saleId : null
      };

      if (!Array.isArray(state.encomendas)) state.encomendas = [];
      state.encomendas.unshift(newEnc);
      upsertClienteFromOperacao({ nome: cliente, telefone, endereco, valor: valorTotal, data: newEnc.data, obs }, true);
      saveState();

      // Limpa formulário
      const cInp = document.getElementById('encNovoCliente');
      if (cInp) cInp.value = '';
      const tInp = document.getElementById('encNovoTelefone');
      if (tInp) tInp.value = '';
      const eInp = document.getElementById('encNovoEndereco');
      if (eInp) eInp.value = '';
      const sInp = document.getElementById('encNovoSinal');
      if (sInp) sInp.value = '0';
      const oInp = document.getElementById('encNovoObs');
      if (oInp) oInp.value = '';
      const fInp = document.getElementById('encNovoFrete');
      if (fInp) fInp.value = '0';
      const searchInp = document.getElementById('encNovoBuscaInput');
      if (searchInp) searchInp.value = '';
      novaEncomendaItens = [];

      renderAll();
      showToast(isProntaEntrega 
        ? `💰 Venda de ${formatBRL(valorTotal)} concluída e estoque baixado!` 
        : `🇵🇾 Encomenda de ${formatBRL(valorTotal)} salva com sucesso!`);

      // Fecha o modal de cadastro para não sobrepor telas
      const mEnc = document.getElementById('encomendasModal');
      if (mEnc) mEnc.classList.remove('open');

      if (enviarWa) {
        window.CRM.openEncomendaReceiptModal(newEnc.id);
        if (newEnc.telefone) {
          showToast('✅ Abrindo recibo para envio no WhatsApp...');
        }
      } else {
        window.CRM.switchEncomendasTab('clientes');
        if (mEnc) mEnc.classList.add('open');
      }
    },

    changeStatusEncomenda(encId, novoStatus) {
      const enc = (state.encomendas || []).find(e => e.id === encId);
      if (!enc) return;

      if (novoStatus === 'entregue') {
        window.CRM.entregarEncomendaEDarBaixa(encId);
        return;
      }

      enc.status = novoStatus;
      saveState();
      renderAll();
      window.CRM.renderEncomendas();
      showToast(`Status atualizado para: ${novoStatus}`);

      if (novoStatus === 'chegou_bh') {
        if (confirm(`Os medicamentos de ${enc.cliente} chegaram em BH! Deseja abrir a mensagem de WhatsApp pronta para avisar o cliente agora?`)) {
          window.CRM.openAvisoChegadaWhatsApp(encId);
        }
      }
    },

    entregarEncomendaEDarBaixa(encId) {
      const enc = (state.encomendas || []).find(e => e.id === encId);
      if (!enc) return;

      if (enc.status === 'entregue' && enc.vendaId) {
        alert(`Esta encomenda já foi entregue e a baixa no estoque já foi registrada (Venda ${enc.vendaId}).`);
        return;
      }

      const itens = getEncomendaItens(enc);
      if (!itens.length) {
        alert('Nenhum medicamento encontrado nesta encomenda.');
        return;
      }

      const itensResumo = itens.map(it => `• ${it.qtd}x ${it.produtoNome}`).join('\n');
      const confirmMsg = `📦 Confirmar entrega e dar baixa no estoque BH?\n\n` +
        `• Cliente: ${enc.cliente}\n` +
        `${itensResumo}\n` +
        `• Total: ${formatBRL(enc.valorTotal)} ${enc.frete > 0 ? `(Frete: ${formatBRL(enc.frete)})` : ''}\n\n` +
        `Ao confirmar, os medicamentos serão abatidos do seu estoque físico em BH e a venda oficial será registrada no CRM.`;

      if (!confirm(confirmMsg)) {
        window.CRM.renderEncomendasClientes();
        return;
      }

      // 1. Abate estoque físico em BH para cada item da encomenda
      if (!state.meuEstoque) state.meuEstoque = {};
      itens.forEach(it => {
        const curStock = Number(state.meuEstoque[it.produtoId] || 0);
        const nextStock = curStock - it.qtd;
        if (nextStock <= 0) {
          delete state.meuEstoque[it.produtoId];
        } else {
          state.meuEstoque[it.produtoId] = nextStock;
        }
      });

      // 2. Registro oficial de Venda no CRM
      const valorProdutos = enc.valorProdutos || itens.reduce((s, it) => s + (it.subtotal || (it.precoUnit * it.qtd)), 0);
      const frete = Number(enc.frete || 0);
      const valorTotal = enc.valorTotal || (valorProdutos + frete);
      
      let custoTotal = 0;
      itens.forEach(it => {
        const raw = rawCatalog.find(x => x.id === it.produtoId) || {};
        const p = computeProduct(raw);
        custoTotal += (p.custo || 0) * it.qtd;
      });
      const lucroEst = valorProdutos - custoTotal;

      const saleId = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
      const aparelhoOrigem = /iPhone|iPad/i.test(navigator.userAgent) ? 'iPhone' : 'Mac';

      const primeiroItem = itens[0] || {};
      const nomesProdutos = itens.length === 1 ? primeiroItem.produtoNome : `${itens.length} medicamentos: ` + itens.map(it => `${it.qtd}x ${it.produtoNome}`).join(' + ');

      const venda = {
        id: saleId,
        data: new Date().toISOString(),
        produtoId: primeiroItem.produtoId || 0,
        produtoNome: nomesProdutos,
        marca: primeiroItem.marca || 'Shape Total',
        qtd: itens.reduce((s, it) => s + it.qtd, 0),
        itens: itens,
        isDose: false,
        doseMg: 0,
        estornada: false,
        origemAparelho: aparelhoOrigem,
        valorUnitario: enc.precoUnit || valorProdutos,
        valorProdutos: valorProdutos,
        valorFrete: frete,
        valorTotal: valorTotal,
        formaPagamento: enc.formaPagamento === 'cartao' ? '💳 Cartão de Crédito (até 12x s/ juros)' : '💠 À vista no PIX',
        cliente: enc.cliente,
        telefone: enc.telefone,
        obs: `Encomenda entregue (${enc.id}) · ${enc.obs || ''}`.trim(),
        custoTotal: custoTotal,
        lucro: lucroEst
      };

      if (!state.vendas) state.vendas = [];
      state.vendas.unshift(venda);
      upsertClienteFromOperacao({ nome: client, telefone: phone, endereco: address, valor: totalComFrete, data: dateVal, obs: notes }, true);

      // 3. Atualiza status da encomenda
      enc.status = 'entregue';
      enc.vendaId = saleId;

      saveState();
      renderAll();
      window.CRM.renderEncomendas();

      showToast(`✅ Baixa realizada! ${itens.length} medicamento(s) baixados e venda de ${formatBRL(valorTotal)} registrada.`);
      window.CRM.openEncomendaReceiptModal(enc.id);
    },

    estornarEncomendaEntregue(encId) {
      const enc = (state.encomendas || []).find(e => e.id === encId);
      if (!enc) return;

      const itens = getEncomendaItens(enc);
      const totalQtd = itens.reduce((s, it) => s + (Number(it.qtd) || 1), 0);
      const confirmMsg = `⚠️ Deseja cancelar/estornar esta venda de "${enc.cliente}"?\n\n` +
        `• Medicamentos a devolver ao estoque físico BH: ${totalQtd} caixa(s)\n` +
        `• Valor total: ${formatBRL(enc.valorTotal)}\n\n` +
        `Ao confirmar:\n` +
        `1. Os medicamentos voltam automaticamente para o seu estoque físico em BH.\n` +
        `2. A venda é estornada do histórico financeiro (sem inflar lucro ou faturamento).\n` +
        `3. O status do pedido volta para "Aguardando" para você corrigir ou excluir.`;

      if (!confirm(confirmMsg)) return;

      // 1. Devolve os medicamentos ao estoque físico em BH
      if (!state.meuEstoque) state.meuEstoque = {};
      itens.forEach(it => {
        const curStock = Number(state.meuEstoque[it.produtoId] || 0);
        state.meuEstoque[it.produtoId] = curStock + (Number(it.qtd) || 1);
      });

      // 2. Se houver venda registrada no histórico oficial, estorna
      if (enc.vendaId && Array.isArray(state.vendas)) {
        const venda = state.vendas.find(v => String(v.id) === String(enc.vendaId));
        if (venda) {
          venda.estornada = true;
          venda.estornadaEm = new Date().toISOString();
        }
      }

      // 3. Atualiza o status da encomenda de volta para pendente
      enc.status = 'pendente';
      enc.vendaId = null;

      saveState();
      renderAll();
      window.CRM.renderEncomendas();
      showToast(`✅ Venda estornada! ${totalQtd} caixa(s) devolvida(s) ao estoque BH.`);
    },

    deleteEncomenda(encId) {
      const enc = (state.encomendas || []).find(e => e.id === encId);
      if (!enc) return;
      const itens = getEncomendaItens(enc);
      const totalQtd = itens.reduce((s, it) => s + (Number(it.qtd) || 1), 0);

      let msg = `⚠️ Deseja realmente cancelar/excluir a encomenda de "${enc.cliente}"?\n\n• Medicamentos: ${totalQtd} caixa(s)\n• Valor: ${formatBRL(enc.valorTotal)}`;
      if (enc.status === 'entregue') {
        msg += `\n\nATENÇÃO: Este pedido já havia sido dado baixa. Ao excluir, as ${totalQtd} caixas voltarão automaticamente para o estoque físico de BH.`;
      }

      if (!confirm(msg)) return;

      if (enc.status === 'entregue') {
        if (!state.meuEstoque) state.meuEstoque = {};
        itens.forEach(it => {
          state.meuEstoque[it.produtoId] = (Number(state.meuEstoque[it.produtoId]) || 0) + (Number(it.qtd) || 1);
        });
        if (enc.vendaId && Array.isArray(state.vendas)) {
          const v = state.vendas.find(x => String(x.id) === String(enc.vendaId));
          if (v) {
            v.estornada = true;
            v.estornadaEm = new Date().toISOString();
          }
        }
      }

      state.encomendas = state.encomendas.filter(e => e.id !== encId);
      saveState();
      renderAll();
      window.CRM.renderEncomendas();
      showToast(`Encomenda de "${enc.cliente}" cancelada com sucesso!`);
    },

    openScriptColetaWhatsApp() {
      const modal = document.getElementById('encomendaReceiptModal');
      const textarea = document.getElementById('encReceiptText');
      const vBox = document.getElementById('encReceiptVisualBox');
      const t = document.getElementById('encReceiptModalTitle');
      const s = document.getElementById('encReceiptModalSub');

      if (vBox) vBox.style.display = 'none';
      if (t) t.textContent = '📋 Script Coleta de Dados do Cliente';
      if (s) s.textContent = 'Envie este texto rápido para o cliente preencher seus dados de entrega e emissão de recibo:';

      currentReceiptPhone = '';
      textarea.value = [
        `Olá! Para formalizar a sua encomenda e emitir o comprovante de reserva, por gentileza preencha os dados abaixo:`,
        ``,
        `👤 *Nome completo:* `,
        `📱 *Telefone / WhatsApp:* `,
        `📍 *Endereço de entrega:* (Rua, Número, Bairro, CEP e Cidade)`,
        `📌 *Ponto de referência:* `,
        `💳 *Forma de pagamento preferida (PIX à vista ou Cartão em até 12x):* `,
        ``,
        `Assim que responder, já confirmamos a sua reserva com o prazo estimado de entrega! 📦✨`
      ].join('\n');

      modal.classList.add('open');
    },

    openEncomendaReceiptModal(encId) {
      const enc = (state.encomendas || []).find(e => e.id === encId);
      if (!enc) return;
      currentReceiptEncId = encId;
      currentReceiptPhone = enc.telefone || '';

      // Fecha o modal de central de encomendas para evitar sobreposição de telas
      const mEnc = document.getElementById('encomendasModal');
      if (mEnc) mEnc.classList.remove('open');

      const modal = document.getElementById('encomendaReceiptModal');
      const textarea = document.getElementById('encReceiptText');
      const vBox = document.getElementById('encReceiptVisualBox');
      const t = document.getElementById('encReceiptModalTitle');
      const s = document.getElementById('encReceiptModalSub');

      if (vBox) vBox.style.display = 'block';
      if (t) t.textContent = '🧾 Comprovante de Encomenda Consolidado';
      if (s) s.textContent = 'Recibo digital com fotos dos produtos para conferência do cliente:';

      const itens = getEncomendaItens(enc);

      // Atualiza Cabeçalho do Card Visual
      const cNomeEl = document.getElementById('encReceiptClienteNome');
      if (cNomeEl) cNomeEl.textContent = enc.cliente;
      const dEl = document.getElementById('encReceiptData');
      if (dEl) dEl.textContent = enc.data ? new Date(enc.data).toLocaleDateString('pt-BR') : '';

      // Renderiza Galeria de Itens com Fotos
      const gallery = document.getElementById('encReceiptItemsGallery');
      if (gallery) {
        gallery.innerHTML = itens.map(it => {
          const rawIt = rawCatalog.find(x => x.id === it.produtoId) || { id: it.produtoId, nombre: it.produtoNome, marca: it.marca, foto: '' };
          const pIt = computeProduct(rawIt);
          const fotoIt = pIt.localFoto || pIt.remoteFoto || '';
          return `
            <div style="display:flex; gap:10px; align-items:center; background:#020617; padding:8px 10px; border-radius:8px; border:1px solid #1e293b;">
              <div style="width:48px; height:48px; min-width:48px; border-radius:6px; background:#0b1120; border:1px solid #334155; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                ${fotoIt ? `<img src="${fotoIt}" style="max-width:100%; max-height:100%; object-fit:contain;" onerror="this.parentElement.innerHTML='💊'">` : '💊'}
              </div>
              <div style="flex:1; min-width:0;">
                <div style="font-size:12px; font-weight:800; color:#fff; line-height:1.25; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(it.produtoNome)}</div>
                <div style="font-size:10.5px; color:#38bdf8;">${(it.marca || '').toUpperCase()} · Cód #${it.produtoId}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:12px; font-weight:800; color:#fbbf24;">${it.qtd} cx</div>
                <div style="font-size:11px; font-weight:700; color:#34d399;">${formatBRL(it.subtotal || (it.precoUnit * it.qtd))}</div>
              </div>
            </div>
          `;
        }).join('');
      }

      // Atualiza Valores do Resumo Financeiro
      const subtotalProdutos = enc.valorProdutos || itens.reduce((s, it) => s + (it.subtotal || (it.precoUnit * it.qtd)), 0);
      const frete = Number(enc.frete || 0);
      const total = enc.valorTotal || (subtotalProdutos + frete);
      const sinal = Number(enc.sinal || 0);
      const saldo = Number(enc.saldoRestante) || Math.max(0, total - sinal);

      const subEl = document.getElementById('encReceiptSubtotal');
      if (subEl) subEl.textContent = formatBRL(subtotalProdutos);
      const totEl = document.getElementById('encReceiptTotal');
      if (totEl) totEl.textContent = formatBRL(total);

      const fRow = document.getElementById('encReceiptFreteRow');
      if (frete > 0) {
        if (fRow) fRow.style.display = 'flex';
        const fEl = document.getElementById('encReceiptFrete');
        if (fEl) fEl.textContent = formatBRL(frete);
      } else {
        if (fRow) fRow.style.display = 'none';
      }

      const sRow = document.getElementById('encReceiptSinalRow');
      if (sinal > 0) {
        if (sRow) sRow.style.display = 'flex';
        const sEl = document.getElementById('encReceiptSinal');
        if (sEl) sEl.textContent = formatBRL(sinal);
      } else {
        if (sRow) sRow.style.display = 'none';
      }

      const salRow = document.getElementById('encReceiptSaldoRow');
      if (saldo > 0) {
        if (salRow) salRow.style.display = 'flex';
        const salEl = document.getElementById('encReceiptSaldo');
        if (salEl) salEl.textContent = formatBRL(saldo);
      } else {
        if (salRow) salRow.style.display = 'none';
      }

      const endBox = document.getElementById('encReceiptEnderecoBox');
      if (enc.endereco) {
        if (endBox) endBox.style.display = 'flex';
        const endEl = document.getElementById('encReceiptEndereco');
        if (endEl) endEl.textContent = enc.endereco;
      } else {
        if (endBox) endBox.style.display = 'none';
      }

      // Monta texto formatado do WhatsApp com itens numerados e fotos
      const isPronta = enc.tipoOperacao === 'pronta_entrega' || enc.status === 'entregue';
      const lines = [
        `*RECIBO DE PEDIDO & RESERVA — BAXTI IMPORTADOS* 📦✨`,
        `Data: ${new Date(enc.data).toLocaleDateString('pt-BR')}`,
        ``,
        `Olá, *${enc.cliente}*! Seu pedido foi registrado com sucesso:`,
        ``,
        `📦 *Medicamentos (${itens.length} ${itens.length === 1 ? 'item' : 'itens'}):*`
      ];

      itens.forEach((it, idx) => {
        const rawIt = rawCatalog.find(x => x.id === it.produtoId) || {};
        const pIt = computeProduct(rawIt);
        // Link público oficial do GitHub Pages: garante anexo e miniatura automática gerada pelo WhatsApp no balão da mensagem
        const fotoUrl = pIt.localFoto ? `https://itabh92.github.io/shapetotal-crm/${pIt.localFoto}` : (pIt.remoteFoto || '');

        lines.push(`${idx + 1}️⃣ *${it.produtoNome}*`);
        lines.push(`• Quantidade: *${it.qtd} caixa(s)*`);
        lines.push(`• Valor: ${formatBRL(it.subtotal || (it.precoUnit * it.qtd))} (${formatBRL(it.precoUnit)} cada)`);
        if (fotoUrl) lines.push(`📸 Foto: ${fotoUrl}`);
        lines.push(``);
      });

      lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
      lines.push(`📦 *Subtotal Medicamentos:* ${formatBRL(subtotalProdutos)}`);
      if (frete > 0) lines.push(`🚚 *Frete / Envio (Uber Flash / Motoboy):* ${formatBRL(frete)}`);
      lines.push(`💰 *VALOR TOTAL DO PEDIDO:* *${formatBRL(total)}* (${enc.formaPagamento === 'cartao' ? 'Cartão em até 12x s/ juros' : 'À vista no PIX'})`);
      if (sinal > 0) lines.push(`💵 *Sinal Pago Antecipado:* ${formatBRL(sinal)}`);
      if (saldo > 0) lines.push(`📍 *Saldo a Pagar na Entrega:* *${formatBRL(saldo)}*`);
      if (enc.endereco) lines.push(`📍 *Endereço de Entrega:* ${enc.endereco}`);
      lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
      lines.push(`💠 *Chave PIX (CNPJ):* 64.228.053/0001-47`);
      lines.push(`🏦 *Beneficiário:* BAXTI IMPORTADOS LTDA`);
      lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
      if (isPronta) {
        lines.push(`🚀 *Prazo de Envio:* Em estoque — envio no mesmo dia (via Uber Flash / Motoboy em BH).`);
      } else {
        lines.push(`🚚 *Prazo de Chegada:* 7 a 10 dias úteis.`);
        lines.push(`Assim que desembarcar em nosso estoque em Belo Horizonte, nossa equipe entra em contato com você para agendar o envio imediato.`);
      }
      lines.push(``);
      lines.push(`Agradecemos pela preferência e confiança! Conte sempre conosco. ✨`);

      if (textarea) textarea.value = lines.join('\n');

      // Atualiza texto dos botões de envio do WhatsApp
      const btnWa = document.getElementById('btnOpenEncWa');
      const btnDirectPhone = document.getElementById('btnOpenEncWaDirectPhone');

      if (btnWa) {
        btnWa.textContent = `📲 Escolher Contato no WhatsApp`;
      }

      if (btnDirectPhone) {
        const telLimpo = (enc.telefone || '').replace(/\D/g, '');
        if (telLimpo && telLimpo !== '31972191092' && telLimpo !== '5531972191092') {
          btnDirectPhone.style.display = 'inline-block';
          btnDirectPhone.textContent = `💬 Direto no (${enc.telefone})`;
        } else {
          btnDirectPhone.style.display = 'none';
        }
      }

      modal.classList.add('open');
    },

    openAvisoChegadaWhatsApp(encId) {
      const enc = (state.encomendas || []).find(e => e.id === encId);
      if (!enc) return;
      currentReceiptEncId = encId;
      currentReceiptPhone = enc.telefone || '';

      const mEnc = document.getElementById('encomendasModal');
      if (mEnc) mEnc.classList.remove('open');

      const modal = document.getElementById('encomendaReceiptModal');
      const textarea = document.getElementById('encReceiptText');
      const vBox = document.getElementById('encReceiptVisualBox');
      const t = document.getElementById('encReceiptModalTitle');
      const s = document.getElementById('encReceiptModalSub');

      if (vBox) vBox.style.display = 'block';
      if (t) t.textContent = '🎉 Aviso de Chegada em BH';
      if (s) s.textContent = 'Mensagem comemorativa avisando o cliente que o medicamento acabou de desembarcar:';

      const raw = rawCatalog.find(p => p.id === enc.produtoId) || { id: enc.produtoId, nombre: enc.produtoNome, marca: enc.marca, foto: '' };
      const p = computeProduct(raw);
      const foto = p.localFoto || p.remoteFoto || '';
      const fotoPublicUrl = p.localFoto ? `https://itabh92.github.io/shapetotal-crm/${p.localFoto}` : (p.remoteFoto || '');

      const saldo = Number(enc.saldoRestante) || Math.max(0, enc.valorTotal - (Number(enc.sinal) || 0));

      const lines = [
        `*BOA NOTÍCIA! SEU PEDIDO CHEGOU EM BH* 🎉📦`,
        ``,
        `Olá, *${enc.cliente}*!`,
        `A sua encomenda de *${enc.produtoNome}* (${enc.qtd} cx) acabou de desembarcar em nosso estoque em Belo Horizonte.`,
        ``
      ];

      if (saldo > 0) lines.push(`💰 *Saldo a acertar na entrega:* ${formatBRL(saldo)}`);
      if (enc.endereco) lines.push(`📍 *Endereço cadastrado:* ${enc.endereco}`);
      if (fotoPublicUrl) lines.push(`📸 *Foto do Produto:* ${fotoPublicUrl}`);
      lines.push(``);
      lines.push(`Podemos agendar a sua entrega hoje mesmo via Uber Flash / Motoboy ou prefere retirar em mãos? Me avise por aqui! ✨`);

      if (textarea) textarea.value = lines.join('\n');

      const btnWa = document.getElementById('btnOpenEncWa');
      const btnDirectPhone = document.getElementById('btnOpenEncWaDirectPhone');

      if (btnWa) {
        btnWa.textContent = `📲 Escolher Contato no WhatsApp`;
      }

      if (btnDirectPhone) {
        const telLimpo = (enc.telefone || '').replace(/\D/g, '');
        if (telLimpo && telLimpo !== '31972191092' && telLimpo !== '5531972191092') {
          btnDirectPhone.style.display = 'inline-block';
          btnDirectPhone.textContent = `💬 Direto no (${enc.telefone})`;
        } else {
          btnDirectPhone.style.display = 'none';
        }
      }

      modal.classList.add('open');
    },

    openEncomendaWhatsAppDirect(useDirectPhone = false) {
      const textarea = document.getElementById('encReceiptText');
      const text = textarea ? textarea.value : '';
      if (!text) {
        showToast('Nada para enviar!');
        return;
      }
      
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).catch(() => {});
        }
      } catch (e) {}

      let url = 'https://api.whatsapp.com/send?';
      let telLimpo = (currentReceiptPhone || '').replace(/\D/g, '');

      // Só inclui o telefone se o usuário clicar explicitamente em "Direto no telefone" E não for o número pessoal
      if (useDirectPhone && telLimpo && telLimpo !== '31972191092' && telLimpo !== '5531972191092') {
        if (!telLimpo.startsWith('55')) telLimpo = '55' + telLimpo;
        url += `phone=${telLimpo}&`;
      }
      // Sem o parâmetro phone, o WhatsApp abre a tela nativa para ESCOLHER A PESSOA/CONTATO!
      url += `text=${encodeURIComponent(text)}`;

      // Se for mobile (iPhone / Android), dispara window.location.href direto
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        window.location.href = url;
      } else {
        const win = window.open(url, '_blank');
        if (!win || win.closed || typeof win.closed === 'undefined') {
          window.location.href = url;
        }
      }
      showToast('Abrindo WhatsApp para você escolher a pessoa...');
    },

    shareEncomendaReceiptNative() {
      const textarea = document.getElementById('encReceiptText');
      const text = textarea ? textarea.value : '';
      if (!text) return;
      if (navigator.share) {
        navigator.share({
          title: 'Recibo Shape Total / Baxti',
          text: text
        }).catch(() => {
          window.CRM.openEncomendaWhatsAppDirect(false);
        });
      } else {
        window.CRM.openEncomendaWhatsAppDirect(false);
      }
    },

    copyEncomendaReceiptText() {
      const textarea = document.getElementById('encReceiptText');
      if (textarea) {
        navigator.clipboard.writeText(textarea.value);
        showToast('Comprovante copiado para o WhatsApp!');
      }
    },

    copyPedidoFornecedorWhatsApp() {
      const pendentes = (state.encomendas || []).filter(e => e.status === 'pendente');
      if (!pendentes.length) {
        alert('Nenhuma encomenda pendente no momento para enviar ao fornecedor.');
        return;
      }

      const grupos = {};
      pendentes.forEach(e => {
        const itens = getEncomendaItens(e);
        itens.forEach(it => {
          const pid = it.produtoId;
          if (!grupos[pid]) {
            grupos[pid] = { produtoId: pid, qtdTotal: 0, nome: it.produtoNome, marca: it.marca };
          }
          grupos[pid].qtdTotal += Number(it.qtd) || 0;
        });
      });

      const lista = Object.values(grupos);
      let totalCaixas = 0;
      const dataHoje = new Date().toLocaleDateString('pt-BR');

      const lines = [
        `*PEDIDO CONSOLIDADO — SHAPE TOTAL / BAXTI* 📦🇵🇾`,
        `Data: ${dataHoje}`,
        ``,
        `Olá! Segue o pedido consolidado de importação para o próximo envio:`,
        ``
      ];

      lista.forEach((g, idx) => {
        const raw = rawCatalog.find(p => p.id === g.produtoId) || { id: g.produtoId, nombre: g.nome, marca: g.marca, foto: '' };
        const p = computeProduct(raw);
        totalCaixas += g.qtdTotal;
        const fotoUrl = p.localFoto ? `https://itabh92.github.io/shapetotal-crm/${p.localFoto}` : (p.remoteFoto || '');

        lines.push(`${idx + 1}️⃣ *${p.nombre}*`);
        lines.push(`• Quantidade: *${g.qtdTotal} caixas*`);
        lines.push(`• Marca: ${(p.marca || '').toUpperCase()} | Cód: #${p.id}`);
        if (fotoUrl) lines.push(`📸 Foto: ${fotoUrl}`);
        lines.push(``);
      });

      lines.push(`📦 *Total consolidado: ${totalCaixas} caixas.*`);
      lines.push(`Por favor confirmar a disponibilidade dos itens e o valor total para liberação do PIX. Obrigado! 🤝`);

      const textoFinal = lines.join('\n');
      navigator.clipboard.writeText(textoFinal);
      alert(`✅ Pedido do fornecedor com links de fotos copiado com sucesso! (${totalCaixas} caixas somadas).\n\nCole diretamente na conversa do fornecedor no WhatsApp.`);
    },

    criarLoteTransitoDeEncomendas() {
      const pendentes = (state.encomendas || []).filter(e => e.status === 'pendente');
      if (!pendentes.length) {
        alert('Nenhuma encomenda pendente para criar carga em trânsito.');
        return;
      }

      const grupos = {};
      pendentes.forEach(e => {
        const itens = getEncomendaItens(e);
        itens.forEach(it => {
          const pid = it.produtoId;
          if (!grupos[pid]) {
            grupos[pid] = { produtoId: pid, qtdTotal: 0, nome: it.produtoNome, marca: it.marca };
          }
          grupos[pid].qtdTotal += Number(it.qtd) || 0;
        });
      });

      const lista = Object.values(grupos);
      let totalCustoBrl = 0;
      const itensTransito = [];

      lista.forEach(g => {
        const raw = rawCatalog.find(p => p.id === g.produtoId) || { id: g.produtoId, nombre: g.nome, marca: g.marca, precio: 0 };
        const p = computeProduct(raw);
        const subCusto = (p.custo || 0) * g.qtdTotal;
        totalCustoBrl += subCusto;

        itensTransito.push({
          id_catalogo: p.id,
          nome: p.nombre,
          marca: p.marca || '',
          categoria: p.categoria || '',
          qtd: g.qtdTotal,
          custo_unit_usd: p.usd || 0,
          custo_unit_reais: p.custo || 0,
          preco_venda_pix: p.precoFinal || 0,
          preco_venda_cartao: p.precoCartao || 0
        });
      });

      const loteId = 'PED-' + Date.now().toString().slice(-6);
      const novoPedidoTransito = {
        id: loteId,
        data_compra: new Date().toLocaleDateString('pt-BR'),
        fornecedor: 'Shape Total / Importação Paraguai (Lote Encomendas)',
        status: 'em_transito',
        custo_total_reais: Math.round(totalCustoBrl),
        itens: itensTransito
      };

      if (!Array.isArray(state.pedidosTransito)) state.pedidosTransito = [];
      state.pedidosTransito.unshift(novoPedidoTransito);

      // Marca todas as encomendas pendentes como "pedido_ao_fornecedor" com o loteId
      pendentes.forEach(e => {
        e.status = 'pedido_ao_fornecedor';
        e.loteId = loteId;
      });

      saveState();
      renderAll();
      window.CRM.renderEncomendas();

      alert(`🚚 Carga em Trânsito criada com sucesso! (${loteId})\n\n${itensTransito.reduce((a, b) => a + b.qtd, 0)} caixas adicionadas ao módulo "🚚 A Chegar". As encomendas foram atualizadas para o status "A Caminho".`);
    },

    cancelarEncomendasProduto(produtoId) {
      const pendentes = (state.encomendas || []).filter(e => e.status === 'pendente');
      const afetadas = pendentes.filter(e => {
        const itens = getEncomendaItens(e);
        return itens.some(it => it.produtoId === produtoId);
      });

      if (!afetadas.length) {
        alert('Nenhuma encomenda pendente para este medicamento.');
        return;
      }

      const raw = rawCatalog.find(p => p.id === produtoId) || {};
      const nomeProd = raw.nombre || 'este medicamento';

      if (afetadas.length === 1) {
        window.CRM.deleteEncomenda(afetadas[0].id);
        return;
      }

      const clientesNomes = afetadas.map(e => `• ${e.cliente} (${e.id})`).join('\n');
      if (confirm(`Existem ${afetadas.length} clientes com encomenda de "${nomeProd}":\n\n${clientesNomes}\n\nDeseja cancelar e remover as encomendas de TODOS esses clientes?`)) {
        const idsToRemove = new Set(afetadas.map(e => e.id));
        state.encomendas = state.encomendas.filter(e => !idsToRemove.has(e.id));
        saveState();
        renderAll();
        window.CRM.renderEncomendas();
        showToast(`Encomendas de ${nomeProd} canceladas!`);
      }
    },

    openPedidoFornecedorModal(produtoIdAdicionar = null) {
      const modal = document.getElementById('pedidoFornecedorModal');
      if (!modal) return;

      // Se o usuário não tiver itens no rascunho e houver encomendas pendentes de clientes, carrega-as automaticamente
      if (!Array.isArray(state.pedidoFornecedorItens) || state.pedidoFornecedorItens.length === 0) {
        state.pedidoFornecedorItens = [];
        const pendentes = (state.encomendas || []).filter(e => e.status === 'pendente');
        if (pendentes.length > 0) {
          const grupos = {};
          pendentes.forEach(e => {
            const itens = getEncomendaItens(e);
            itens.forEach(it => {
              const pid = it.produtoId;
              if (!grupos[pid]) {
                grupos[pid] = { produtoId: pid, qtd: 0, origem: 'encomenda_cliente' };
              }
              grupos[pid].qtd += Number(it.qtd) || 1;
            });
          });
          state.pedidoFornecedorItens = Object.values(grupos);
        }
      }

      // Se foi passado um produtoId específico para adicionar imediatamente
      if (produtoIdAdicionar) {
        const exist = state.pedidoFornecedorItens.find(x => x.produtoId === produtoIdAdicionar);
        if (exist) {
          exist.qtd = (Number(exist.qtd) || 0) + 1;
        } else {
          state.pedidoFornecedorItens.push({ produtoId: produtoIdAdicionar, qtd: 1, origem: 'manual' });
        }
      }

      // Carrega telefone salvo do fornecedor se houver
      const telInput = document.getElementById('pedFornTelefone');
      if (telInput) {
        telInput.value = state.telefoneFornecedor || '';
      }

      // Popula o select de produtos para adição manual
      window.CRM.filtrarProdutosPedidoFornecedor('');

      // Renderiza itens e texto
      window.CRM.renderItensPedidoFornecedor();
      modal.classList.add('open');
    },

    filtrarProdutosPedidoFornecedor(query) {
      const select = document.getElementById('pedFornSelectProd');
      if (!select) return;
      const q = (query || '').toLowerCase().trim();
      const all = rawCatalog.map(computeProduct);

      let filtered = all;
      if (q) {
        filtered = all.filter(p => {
          const txt = `${p.id} ${p.nombre || ''} ${p.marca || ''} ${p.composicion || ''} ${p.categoria || ''}`.toLowerCase();
          return txt.includes(q);
        });
      }

      if (!filtered.length) {
        select.innerHTML = `<option value="">Nenhum medicamento encontrado com "${escapeHtml(q)}"</option>`;
        return;
      }

      select.innerHTML = filtered.slice(0, 80).map(p => `
        <option value="${p.id}">#${p.id} - ${escapeHtml(p.nombre)} (${(p.marca || '').toUpperCase()}) · Custo: US$ ${(p.usd || 0).toFixed(2)} / R$ ${(p.custo || 0).toFixed(0)}</option>
      `).join('');
    },

    quickSearchPedForn(term) {
      const inp = document.getElementById('pedFornBuscaInput');
      if (inp) inp.value = term;
      window.CRM.filtrarProdutosPedidoFornecedor(term);
    },

    adicionarItemPedidoFornecedorManual() {
      const sel = document.getElementById('pedFornSelectProd');
      const qtyInp = document.getElementById('pedFornQty');
      if (!sel || !sel.value) {
        alert('Selecione um produto para adicionar ao pedido.');
        return;
      }
      const pid = Number(sel.value);
      const qtd = Math.max(1, Number(qtyInp ? qtyInp.value : 1) || 1);

      if (!Array.isArray(state.pedidoFornecedorItens)) state.pedidoFornecedorItens = [];
      const exist = state.pedidoFornecedorItens.find(x => x.produtoId === pid);
      if (exist) {
        exist.qtd = (Number(exist.qtd) || 0) + qtd;
      } else {
        state.pedidoFornecedorItens.push({ produtoId: pid, qtd, origem: 'manual' });
      }

      saveState();
      window.CRM.renderItensPedidoFornecedor();
      showToast('Medicamento adicionado ao pedido do fornecedor!');
    },

    adicionarAoPedidoFornecedor(produtoId, qtd = 1) {
      window.CRM.openPedidoFornecedorModal(produtoId);
      showToast('Medicamento adicionado ao pedido do fornecedor!');
    },

    carregarEncomendasClientesNoPedidoFornecedor() {
      const pendentes = (state.encomendas || []).filter(e => e.status === 'pendente' || e.status === 'pedido_ao_fornecedor');
      if (!pendentes.length) {
        alert('Nenhuma encomenda pendente de cliente no momento.');
        return;
      }

      if (!Array.isArray(state.pedidoFornecedorItens)) state.pedidoFornecedorItens = [];
      let adicionados = 0;

      pendentes.forEach(e => {
        const itens = getEncomendaItens(e);
        itens.forEach(it => {
          const pid = it.produtoId;
          const exist = state.pedidoFornecedorItens.find(x => x.produtoId === pid);
          if (exist) {
            exist.qtd = (Number(exist.qtd) || 0) + (Number(it.qtd) || 1);
          } else {
            state.pedidoFornecedorItens.push({ produtoId: pid, qtd: Number(it.qtd) || 1, origem: 'encomenda_cliente' });
          }
          adicionados += Number(it.qtd) || 1;
        });
      });

      saveState();
      window.CRM.renderItensPedidoFornecedor();
      alert(`✅ ${adicionados} caixas de encomendas de clientes adicionadas à lista do fornecedor!`);
    },

    limparPedidoFornecedor() {
      if (state.pedidoFornecedorItens && state.pedidoFornecedorItens.length > 0) {
        if (!confirm('Deseja limpar todos os itens da lista do fornecedor?')) return;
      }
      state.pedidoFornecedorItens = [];
      saveState();
      window.CRM.renderItensPedidoFornecedor();
      showToast('Lista do fornecedor limpa.');
    },

    removerItemPedidoFornecedor(index) {
      if (Array.isArray(state.pedidoFornecedorItens)) {
        state.pedidoFornecedorItens.splice(index, 1);
        saveState();
        window.CRM.renderItensPedidoFornecedor();
      }
    },

    alterarQtdItemPedidoFornecedor(index, delta) {
      if (Array.isArray(state.pedidoFornecedorItens) && state.pedidoFornecedorItens[index]) {
        const novaQtd = (Number(state.pedidoFornecedorItens[index].qtd) || 1) + delta;
        if (novaQtd <= 0) {
          state.pedidoFornecedorItens.splice(index, 1);
        } else {
          state.pedidoFornecedorItens[index].qtd = novaQtd;
        }
        saveState();
        window.CRM.renderItensPedidoFornecedor();
      }
    },

    renderItensPedidoFornecedor() {
      const container = document.getElementById('pedFornItensList');
      const countEl = document.getElementById('pedFornCountItens');
      const totaisEl = document.getElementById('pedFornTotaisBadge');
      const textarea = document.getElementById('pedFornMensagemText');
      if (!container) return;

      const itens = Array.isArray(state.pedidoFornecedorItens) ? state.pedidoFornecedorItens : [];
      let totalCaixas = 0;
      let totalUsd = 0;
      let totalBrl = 0;

      if (itens.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:30px 10px; color:#94a3b8; font-size:12.5px;">Nenhum medicamento na lista do pedido.<br><span style="font-size:11px; color:#64748b;">Clique em "📥 Puxar Encomendas Pendentes" ou pesquise acima para adicionar.</span></div>`;
        if (countEl) countEl.textContent = '0 itens';
        if (totaisEl) totaisEl.textContent = '0 caixas · Custo: US$ 0.00 / R$ 0,00';
        if (textarea) textarea.value = '';
        return;
      }

      const html = itens.map((it, idx) => {
        const raw = rawCatalog.find(p => p.id === it.produtoId) || { id: it.produtoId, nombre: 'Medicamento #' + it.produtoId, marca: '', precio: 0 };
        const p = computeProduct(raw);
        const subUsd = (p.usd || 0) * (it.qtd || 1);
        const subBrl = (p.custo || 0) * (it.qtd || 1);
        totalCaixas += Number(it.qtd) || 1;
        totalUsd += subUsd;
        totalBrl += subBrl;
        const fotoSrc = p.localFoto || p.remoteFoto || '';

        return `
          <div style="display:flex; justify-content:space-between; align-items:center; background:#0f172a; padding:8px 10px; border-radius:6px; margin-bottom:6px; border:1px solid #1e293b; gap:8px;">
            <img src="${fotoSrc}" style="width:42px; height:42px; object-fit:cover; border-radius:4px; background:#020617; border:1px solid #334155;" onerror="this.style.display='none'" />
            <div style="flex:1; min-width:0;">
              <div style="font-size:13px; font-weight:800; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${idx + 1}. ${escapeHtml(p.nombre)}</div>
              <div style="font-size:11px; color:#94a3b8;">
                <span style="color:#38bdf8; font-weight:700;">#${p.id}</span> · ${(p.marca || '').toUpperCase()} · Custo: US$ ${(p.usd || 0).toFixed(2)} (R$ ${(p.custo || 0).toFixed(0)})
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <button type="button" class="btn btn-xs" style="width:24px; height:24px; padding:0; line-height:22px; font-weight:800;" onclick="window.CRM.alterarQtdItemPedidoFornecedor(${idx}, -1)">-</button>
              <b style="font-size:14px; color:#34d399; min-width:24px; text-align:center;">${it.qtd} cx</b>
              <button type="button" class="btn btn-xs" style="width:24px; height:24px; padding:0; line-height:22px; font-weight:800;" onclick="window.CRM.alterarQtdItemPedidoFornecedor(${idx}, 1)">+</button>
              <button type="button" class="btn btn-xs" style="background:#7f1d1d; color:#fca5a5; border:1px solid #dc2626; margin-left:4px;" title="Remover item" onclick="window.CRM.removerItemPedidoFornecedor(${idx})">✖</button>
            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = html;
      if (countEl) countEl.textContent = `${itens.length} ${itens.length === 1 ? 'item' : 'itens'}`;
      if (totaisEl) totaisEl.textContent = `${totalCaixas} caixas · Custo: US$ ${totalUsd.toFixed(2)} / ${formatBRL(totalBrl)}`;

      // Atualiza texto pré-formatado da mensagem
      window.CRM.gerarTextoMensagemPedidoFornecedor(itens, totalCaixas);
    },

    gerarTextoMensagemPedidoFornecedor(itens, totalCaixas) {
      const textarea = document.getElementById('pedFornMensagemText');
      if (!textarea) return;

      const dataHoje = new Date().toLocaleDateString('pt-BR');
      const lines = [
        `*PEDIDO CONSOLIDADO — SHAPE TOTAL / BAXTI* 📦🇵🇾`,
        `Data: ${dataHoje}`,
        ``,
        `Olá! Segue o pedido consolidado de importação para o próximo envio:`,
        ``
      ];

      itens.forEach((it, idx) => {
        const raw = rawCatalog.find(p => p.id === it.produtoId) || { id: it.produtoId, nombre: 'Medicamento #' + it.produtoId, marca: '', foto: '' };
        const p = computeProduct(raw);
        // Link direto do GitHub Pages: gera miniatura/anexo automático no WhatsApp
        const fotoUrl = p.localFoto ? `https://itabh92.github.io/shapetotal-crm/${p.localFoto}` : (p.remoteFoto || '');

        lines.push(`${idx + 1}️⃣ *${p.nombre}*`);
        lines.push(`• Quantidade: *${it.qtd} caixas*`);
        lines.push(`• Marca: ${(p.marca || '').toUpperCase()} | Cód: #${p.id}`);
        if (fotoUrl) lines.push(`📸 Foto: ${fotoUrl}`);
        lines.push(``);
      });

      lines.push(`📦 *Total consolidado: ${totalCaixas} caixas.*`);
      lines.push(`Por favor confirmar a disponibilidade dos itens e o valor total para liberação do PIX. Obrigado! 🤝`);

      textarea.value = lines.join('\n');
    },

    salvarTelefoneFornecedor() {
      const inp = document.getElementById('pedFornTelefone');
      if (!inp) return;
      state.telefoneFornecedor = inp.value.trim();
      saveState();
      showToast('Telefone do fornecedor salvo!');
    },

    copiarMensagemPedidoFornecedor() {
      const textarea = document.getElementById('pedFornMensagemText');
      if (!textarea || !textarea.value) {
        alert('Nenhuma mensagem gerada para copiar.');
        return;
      }
      navigator.clipboard.writeText(textarea.value);
      showToast('Mensagem para o fornecedor copiada com sucesso!');
    },

    enviarPedidoFornecedorWhatsApp() {
      const textarea = document.getElementById('pedFornMensagemText');
      if (!textarea || !textarea.value) {
        alert('Adicione medicamentos ao pedido antes de enviar.');
        return;
      }
      const telInput = document.getElementById('pedFornTelefone');
      const tel = telInput ? telInput.value.replace(/\D/g, '') : '';
      const text = textarea.value;

      let url = '';
      if (tel) {
        url = `https://api.whatsapp.com/send?phone=${tel}&text=${encodeURIComponent(text)}`;
      } else {
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      }

      window.open(url, '_blank') || (window.location.href = url);
      showToast('Abrindo WhatsApp com o pedido pronto...');
    },

    salvarPedidoFornecedorComoTransito() {
      const itens = Array.isArray(state.pedidoFornecedorItens) ? state.pedidoFornecedorItens : [];
      if (!itens.length) {
        alert('Nenhum item na lista para salvar como trânsito.');
        return;
      }

      let totalCustoBrl = 0;
      const itensTransito = [];

      itens.forEach(it => {
        const raw = rawCatalog.find(p => p.id === it.produtoId) || { id: it.produtoId, nombre: 'Produto #' + it.produtoId, marca: '', precio: 0 };
        const p = computeProduct(raw);
        const subCusto = (p.custo || 0) * (it.qtd || 1);
        totalCustoBrl += subCusto;

        itensTransito.push({
          id_catalogo: p.id,
          nome: p.nombre,
          marca: p.marca || '',
          categoria: p.categoria || '',
          qtd: it.qtd || 1,
          custo_unit_usd: p.usd || 0,
          custo_unit_reais: p.custo || 0,
          preco_venda_pix: p.precoFinal || 0,
          preco_venda_cartao: p.precoCartao || 0
        });
      });

      const loteId = 'PED-' + Date.now().toString().slice(-6);
      const novoPedidoTransito = {
        id: loteId,
        data_compra: new Date().toLocaleDateString('pt-BR'),
        fornecedor: 'Shape Total / Importação Paraguai',
        status: 'em_transito',
        custo_total_reais: Math.round(totalCustoBrl),
        itens: itensTransito
      };

      if (!Array.isArray(state.pedidosTransito)) state.pedidosTransito = [];
      state.pedidosTransito.unshift(novoPedidoTransito);

      // Se houver encomendas pendentes de clientes correspondentes, marca-as como pedido_ao_fornecedor
      const pendentes = (state.encomendas || []).filter(e => e.status === 'pendente');
      pendentes.forEach(e => {
        const eItens = getEncomendaItens(e);
        const bateu = eItens.some(it => itens.some(pi => pi.produtoId === it.produtoId));
        if (bateu) {
          e.status = 'pedido_ao_fornecedor';
          e.loteId = loteId;
        }
      });

      saveState();
      renderAll();
      window.CRM.renderEncomendas();

      alert(`🚚 Pedido ${loteId} salvo como Carga em Trânsito com sucesso! (${itensTransito.reduce((a, b) => a + b.qtd, 0)} caixas).\n\nAgora você pode acompanhar a chegada pelo botão "🚚 A Chegar".`);
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
      state.cotacaoAtualizadaEm = new Date().toISOString();
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
        state.minMarginFilter = null;
        document.getElementById('subCatSelect').value = 'todas';
        renderLimit = 60;
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
      renderLimit = 60;
      clearTimeout(searchTimer);
      searchTimer = setTimeout(renderAll, 80);
    });

    document.getElementById('subCatSelect').addEventListener('change', e => {
      state.subCat = e.target.value;
      state.minMarginFilter = null;
      renderLimit = 60;
      renderAll();
    });

    document.getElementById('brandSelect').addEventListener('change', e => {
      state.brand = e.target.value;
      state.minMarginFilter = null;
      renderLimit = 60;
      renderAll();
    });

    document.getElementById('stockSelect').addEventListener('change', e => {
      state.stockFilter = e.target.value;
      state.minMarginFilter = null;
      renderLimit = 60;
      renderAll();
    });

    document.getElementById('branchSelect').addEventListener('change', e => {
      state.branchFilter = e.target.value;
      state.minMarginFilter = null;
      renderLimit = 60;
      renderAll();
    });

    document.getElementById('sortSelect').addEventListener('change', e => {
      state.sortBy = e.target.value;
      renderLimit = 60;
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

    // Em telas mobile/tablet (<= 900px), inicia a gaveta de ferramentas recolhida para liberar 88% da tela para os produtos
    if (window.innerWidth <= 900) {
      const drawer = document.getElementById('topbarToolsDrawer');
      const btn = document.getElementById('btnToggleTopbarTools');
      if (drawer && !drawer.classList.contains('collapsed')) {
        drawer.classList.add('collapsed');
        if (btn) btn.textContent = '🛠️ Ferramentas ▸';
      }
    }

    // Check initial authentication
    const isAuthed = localStorage.getItem('ST_AUTH') === 'true' || sessionStorage.getItem('ST_AUTH') === 'true';
    const overlay = document.getElementById('authOverlay');
    if (overlay) {
      overlay.style.display = isAuthed ? 'none' : 'flex';
    }

  });
})();
