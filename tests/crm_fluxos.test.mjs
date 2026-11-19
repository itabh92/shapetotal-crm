import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
const pricingJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'pricing_config.json'), 'utf8'));
const pricingJs = fs.readFileSync(path.join(ROOT, 'pricing_config.js'), 'utf8');
const cat = fs.readFileSync(path.join(ROOT, 'dados_catalogo.js'), 'utf8');

function createHarness({ confirmAnswer = true, promptAnswer = '0', initialState = null } = {}) {
  const elements = {};
  const alerts = [];
  const confirms = [];
  function makeEl(id) {
    return {
      id, value: '', textContent: '', innerHTML: '', checked: false,
      style: {},
      classList: {
        _set: new Set(),
        add(...c) { c.forEach(x => this._set.add(x)); },
        remove(...c) { c.forEach(x => this._set.delete(x)); },
        toggle(c, f) {
          if (f === undefined) { if (this._set.has(c)) { this._set.delete(c); return false; } this._set.add(c); return true; }
          if (f) this._set.add(c); else this._set.delete(c); return f;
        },
        contains(c) { return this._set.has(c); }
      },
      addEventListener() {},
      getAttribute() { return ''; },
      setAttribute() {},
      focus() {},
      select() {},
      querySelectorAll() { return []; }
    };
  }

  const storageData = {};
  if (initialState) {
    storageData.SHAPETOTAL_CRM_STATE_V1 = JSON.stringify(initialState);
  }

  const sandbox = {
    window: {
      innerWidth: 1280,
      location: { hash: '', origin: 'http://localhost:8765', pathname: '/', search: '', href: '' },
      open() { return {}; },
      addEventListener() {}
    },
    document: {
      body: makeEl('body'),
      getElementById(id) { if (!elements[id]) elements[id] = makeEl(id); return elements[id]; },
      querySelector() { return makeEl('qs'); },
      querySelectorAll() { return []; },
      createElement(t) { return makeEl(t); },
      addEventListener(ev, fn) { if (ev === 'DOMContentLoaded') this._onReady = fn; }
    },
    localStorage: {
      getItem(k) { return Object.prototype.hasOwnProperty.call(storageData, k) ? storageData[k] : null; },
      setItem(k, v) { storageData[k] = String(v); },
      removeItem(k) { delete storageData[k]; }
    },
    sessionStorage: { getItem() { return 'true'; }, setItem() {} },
    navigator: {
      userAgent: 'Macintosh',
      clipboard: { writeText: async () => {} },
      serviceWorker: { register: async () => ({}), getRegistration: async () => ({ update: async () => {} }) }
    },
    history: { replaceState() {} },
    IntersectionObserver: function () { return { observe() {}, disconnect() {} }; },
    URL: { createObjectURL() { return 'blob:test'; }, revokeObjectURL() {} },
    Blob: function () {},
    alert(msg) { alerts.push(String(msg)); },
    confirm(msg) {
      confirms.push(String(msg));
      return typeof confirmAnswer === 'function' ? confirmAnswer(String(msg)) : confirmAnswer;
    },
    prompt() { return promptAnswer; },
    setTimeout() { return 1; },
    clearTimeout() {},
    console
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(pricingJs, sandbox);
  vm.runInContext(cat, sandbox);
  vm.runInContext(js, sandbox);
  sandbox.document._onReady();

  const getState = () => JSON.parse(sandbox.localStorage.getItem('SHAPETOTAL_CRM_STATE_V1'));
  return { sandbox, CRM: sandbox.window.CRM, doc: sandbox.document, alerts, confirms, getState };
}

test('consistencia: todos os handlers window.CRM no HTML e JS existem e sao funcoes', () => {
  const { CRM } = createHarness();
  const calls = new Set([
    ...[...html.matchAll(/window\.CRM\.([a-zA-Z0-9_]+)\s*\(/g)].map(m => m[1]),
    ...[...js.matchAll(/window\.CRM\.([a-zA-Z0-9_]+)\s*\(/g)].map(m => m[1])
  ]);
  const faltantes = [...calls].filter(name => typeof CRM[name] !== 'function');
  assert.deepEqual(faltantes, []);
});

test('parseDateTs e calcularAlertas: datas brasileiras dd/MM/yyyy (06/11, 09/11, 10/11) nao geram falso atraso', () => {
  const { CRM } = createHarness({
    initialState: {
      meuEstoque: { 3378: 5 },
      pedidosTransito: [
        { id: 'TR-06', data_compra: '06/11/2026', status: 'em_transito', custo_total_reais: 1000, itens: [{ id_catalogo: 3378, qtd: 2 }] },
        { id: 'TR-09', data_compra: '09/11/2026', status: 'em_transito', custo_total_reais: 1000, itens: [{ id_catalogo: 3378, qtd: 2 }] },
        { id: 'TR-10', data_compra: '10/11/2026', status: 'em_transito', custo_total_reais: 1000, itens: [{ id_catalogo: 3378, qtd: 2 }] }
      ],
      encomendas: [],
      vendas: []
    }
  });

  const ts06 = CRM.parseDateTs('06/11/2026');
  assert.equal(new Date(ts06).getFullYear(), 2026);
  assert.equal(new Date(ts06).getMonth(), 10); // Novembro = 10
  assert.equal(new Date(ts06).getDate(), 6);

  const alertas = CRM.calcularAlertas(true);
  const atrasados = alertas.filter(a => a.tipo === 'transito_atrasado');
  assert.equal(atrasados.length, 0);
});

test('venda rapida: bloqueia cliente vazio ou generico e bloqueia estoque insuficiente sem saldo negativo', () => {
  const { CRM, doc, alerts, getState } = createHarness({
    confirmAnswer: false,
    initialState: { meuEstoque: { 3378: 2 }, vendas: [], encomendas: [], pedidosTransito: [] }
  });

  // 1. Cliente vazio / generico
  CRM.openVendaRapidaModal(3378);
  doc.getElementById('vrQty').value = '1';
  doc.getElementById('vrUnitPrice').value = '1750';
  doc.getElementById('vrCliente').value = 'Cliente';
  CRM.confirmVendaRapida();
  assert.equal(getState().vendas.length, 0);
  assert.ok(alerts.some(m => m.includes('nome real do cliente')));

  // 2. Quantidade acima do fisico
  doc.getElementById('vrCliente').value = 'Joao Silva';
  doc.getElementById('vrQty').value = '5';
  CRM.confirmVendaRapida();
  assert.equal(getState().vendas.length, 0);
  assert.equal(getState().meuEstoque[3378], 2);
});

test('venda rapida: exige confirmacao ao invadir estoque reservado e deduz apenas 1 vez', () => {
  const { CRM, doc, confirms, getState } = createHarness({
    confirmAnswer: true,
    initialState: {
      meuEstoque: { 3378: 2 },
      vendas: [],
      encomendas: [
        { id: 'ENC-R1', status: 'pendente', cliente: 'Ana', itens: [{ produtoId: 3378, produtoNome: 'Retatrutida', qtd: 2, precoUnit: 1750, subtotal: 3500 }] }
      ],
      pedidosTransito: []
    }
  });

  CRM.openVendaRapidaModal(3378);
  doc.getElementById('vrQty').value = '1';
  doc.getElementById('vrUnitPrice').value = '1750';
  doc.getElementById('vrCliente').value = 'Carlos Concorrente';
  CRM.confirmVendaRapida();

  assert.ok(confirms.some(c => c.includes('Conflito com reserva')));
  assert.equal(getState().vendas.length, 1);
  assert.equal(getState().meuEstoque[3378], 1);
});

test('fluxo encomenda -> fornecedor -> transito -> chegada parcial e total -> aviso -> entrega (idempotente e com rateio exato)', () => {
  const { CRM, doc, getState } = createHarness({
    confirmAnswer: true,
    promptAnswer: '100',
    initialState: {
      meuEstoque: {},
      vendas: [],
      encomendas: [
        {
          id: 'ENC-A', data: '2026-11-12T10:00:00Z', status: 'pendente', cliente: 'Maria', telefone: '31999991111',
          valorProdutos: 2000, valorTotal: 2000, sinal: 500, saldoRestante: 1500,
          itens: [
            { produtoId: 3395, produtoNome: 'Glow Blend', qtd: 1, precoUnit: 1000, subtotal: 1000 },
            { produtoId: 3378, produtoNome: 'Retatrutida', qtd: 1, precoUnit: 1000, subtotal: 1000 }
          ]
        },
        {
          id: 'ENC-B', data: '2026-11-12T11:00:00Z', status: 'pendente', cliente: 'Pedro', telefone: '31999992222',
          valorProdutos: 1000, valorTotal: 1000, sinal: 0, saldoRestante: 1000,
          itens: [{ produtoId: 3395, produtoNome: 'Glow Blend', qtd: 1, precoUnit: 1000, subtotal: 1000 }]
        }
      ],
      pedidosTransito: [],
      pedidoFornecedorItens: [{ produtoId: 3370, qtd: 1, origem: 'manual' }]
    }
  });

  // Geracao repetida do pedido ao fornecedor nao duplica e preserva item manual
  CRM.gerarPedidoFornecedorDasEncomendas();
  CRM.gerarPedidoFornecedorDasEncomendas();
  let st = getState();
  const item3395 = st.pedidoFornecedorItens.find(x => x.produtoId === 3395);
  const itemManual = st.pedidoFornecedorItens.find(x => x.produtoId === 3370);
  assert.equal(item3395.qtd, 2);
  assert.equal(itemManual.qtd, 1);
  assert.equal(itemManual.origem, 'manual');

  // Lote parcial: recebe apenas 1 unidade de 3395 vinculado a ENC-B
  st.pedidosTransito.unshift({
    id: 'PED-PARCIAL',
    data_compra: '13/11/2026',
    status: 'em_transito',
    custo_total_reais: 500,
    encomendaIds: ['ENC-B'],
    itens: [{ id_catalogo: 3395, nome: 'Glow Blend', qtd: 1, custo_unit_reais: 500 }]
  });
  st.encomendas.find(e => e.id === 'ENC-B').loteId = 'PED-PARCIAL';
  st.encomendas.find(e => e.id === 'ENC-B').status = 'pedido_ao_fornecedor';

  // Recarrega estado com lote parcial
  const h2 = createHarness({ confirmAnswer: true, promptAnswer: '100', initialState: st });
  h2.CRM.confirmarChegadaPedido('PED-PARCIAL');
  // Segundo clique deve ser ignorado (idempotente)
  h2.CRM.confirmarChegadaPedido('PED-PARCIAL');

  const stPosChegada = h2.getState();
  assert.equal(stPosChegada.meuEstoque[3395], 1); // Nao somou 2x
  assert.equal(stPosChegada.custosReais[3395], 600); // 500 + 100 rateado
  assert.equal(stPosChegada.encomendas.find(e => e.id === 'ENC-B').status, 'chegou_bh');
  assert.equal(stPosChegada.encomendas.find(e => e.id === 'ENC-A').status, 'pendente'); // Nao contaminou ENC-A
  assert.equal(h2.CRM.getDisponibilidade(3395).chegando, 0); // Estado chegando resolvido

  // Aviso de chegada nao fecha encomenda, nao baixa estoque e so marca avisoChegadaEm ao enviar/copiar
  h2.CRM.openAvisoChegadaWhatsApp('ENC-B');
  let stPosAviso = h2.getState();
  assert.equal(stPosAviso.encomendas.find(e => e.id === 'ENC-B').status, 'chegou_bh');
  assert.equal(stPosAviso.meuEstoque[3395], 1);
  assert.equal(Boolean(stPosAviso.encomendas.find(e => e.id === 'ENC-B').avisoChegadaEm), false);

  h2.CRM.copyEncomendaReceiptText();
  stPosAviso = h2.getState();
  assert.equal(Boolean(stPosAviso.encomendas.find(e => e.id === 'ENC-B').avisoChegadaEm), true);

  // Entrega idempotente com apenas 1 movimento de venda e divergencia zero no razao
  h2.CRM.entregarEncomendaEDarBaixa('ENC-B');
  h2.CRM.entregarEncomendaEDarBaixa('ENC-B');
  const stPosEntrega = h2.getState();
  assert.equal(stPosEntrega.vendas.length, 1);
  assert.equal(stPosEntrega.meuEstoque[3395] || 0, 0);
  assert.equal(h2.CRM.getSaldo(3395).divergencia, 0);
  assert.equal((stPosEntrega.movimentacoes || []).filter(m => m.tipo === 'venda' && Number(m.produtoId) === 3395).length, 1);
  assert.equal(h2.doc.getElementById('countAvisarChegadaBadge').textContent, '0');
});

test('reserva reduz livre, cancelamento libera livre e alertas recalculam automaticamente', () => {
  const { CRM, getState } = createHarness({
    confirmAnswer: true,
    initialState: {
      meuEstoque: { 3395: 2 },
      vendas: [],
      encomendas: [
        {
          id: 'ENC-RES', data: '2026-11-12T10:00:00Z', status: 'pendente', cliente: 'Lucas', telefone: '31999993333',
          valorProdutos: 2000, valorTotal: 2000, sinal: 0, saldoRestante: 2000,
          itens: [{ produtoId: 3395, produtoNome: 'Glow Blend', qtd: 2, precoUnit: 1000, subtotal: 2000 }]
        }
      ],
      pedidosTransito: []
    }
  });

  // Antes do cancelamento: 2 fisico, 2 reservado, 0 livre
  let disp = CRM.getDisponibilidade(3395);
  assert.equal(disp.estoqueBH, 2);
  assert.equal(disp.reservado, 2);
  assert.equal(disp.disponivel, 0);

  // Cancelar encomenda libera as 2 unidades imediatamente
  CRM.cancelarEncomenda('ENC-RES');
  disp = CRM.getDisponibilidade(3395);
  assert.equal(disp.estoqueBH, 2);
  assert.equal(disp.reservado, 0);
  assert.equal(disp.disponivel, 2);
  assert.equal(getState().encomendas.find(e => e.id === 'ENC-RES').status, 'cancelado');

  // Alertas recalculam sem erro
  const alertas = CRM.calcularAlertas(true);
  assert.ok(Array.isArray(alertas));
});

test('venda rapida unificada: doses 9005, frete no total, bloqueio de margem negativa e saldo de frasco', () => {
  const { CRM, doc, alerts, getState } = createHarness({
    confirmAnswer: true,
    initialState: { meuEstoque: { 9005: 2 }, custosReais: { 9005: 600 }, vendas: [], encomendas: [], pedidosTransito: [] }
  });

  CRM.openVendaRapidaModal(9005);
  const doseHtml = doc.getElementById('vrDoseButtons').innerHTML;
  assert.match(doseHtml, /5 mg/);
  assert.match(doseHtml, /Frasco fechado/);

  CRM.setVendaRapidaDose(5, 360);
  doc.getElementById('vrCliente').value = 'Paciente Teste';
  doc.getElementById('vrQty').value = '1';
  doc.getElementById('vrFrete').value = '40';
  CRM.updateVendaRapidaTotal();
  assert.match(doc.getElementById('vrTotalPreview').textContent, /400/);

  // Margem negativa bloqueada
  doc.getElementById('vrUnitPrice').value = '10';
  CRM.confirmVendaRapida();
  assert.equal(getState().vendas.length, 0);
  assert.ok(alerts.some(m => m.includes('margem negativa')));

  // Preco valido conclui com frete e desconta mg do frasco aberto
  doc.getElementById('vrUnitPrice').value = '360';
  CRM.confirmVendaRapida();
  const st = getState();
  assert.equal(st.vendas.length, 1);
  assert.equal(st.vendas[0].isDose, true);
  assert.equal(st.vendas[0].doseMg, 5);
  assert.equal(st.vendas[0].valorFrete, 40);
  assert.equal(st.vendas[0].valorTotal, 400);
  assert.equal(st.frascosDoses[9005].mgRestante, 115);
});

test('pronta entrega via Nova Encomenda: usa custo real, valida estoque BH e zera divergencia no razao', () => {
  const { CRM, doc, alerts, getState } = createHarness({
    confirmAnswer: true,
    initialState: { meuEstoque: {}, custosReais: { 3395: 620 }, vendas: [], encomendas: [], pedidosTransito: [], movimentacoes: [] }
  });

  // Entrada via rotina unificada
  doc.getElementById('addStockSelect').value = '3395';
  doc.getElementById('addStockQty').value = '1';
  CRM.confirmAddStock();

  // Tenta vender 2 unidades tendo apenas 1 em BH -> bloqueado
  CRM.openNovaEncomendaModal(null, 'pronta_entrega');
  doc.getElementById('encNovoProdutoSelect').value = '3395';
  doc.getElementById('encNovoCliente').value = 'Comprador BH';
  doc.getElementById('encNovoQtd').value = '2';
  doc.getElementById('encNovoPrecoUnit').value = '1000';
  CRM.saveNovaEncomenda(false);
  assert.equal(getState().vendas.length, 0);
  assert.ok(alerts.some(m => m.includes('Saldo físico insuficiente')));

  // Corrige para 1 unidade e salva pronta entrega -> usa custo real (620) e nao duplica movimento
  doc.getElementById('encNovoProdutoSelect').value = '3395';
  doc.getElementById('encNovoCliente').value = 'Comprador BH';
  doc.getElementById('encNovoQtd').value = '1';
  doc.getElementById('encNovoPrecoUnit').value = '1000';
  CRM.saveNovaEncomenda(false);
  const st = getState();
  assert.equal(st.vendas.length, 1);
  assert.equal(st.vendas[0].custoTotal, 620);
  assert.equal(CRM.getSaldo(3395).divergencia, 0);
  assert.equal((st.movimentacoes || []).filter(m => m.tipo === 'venda' && Number(m.produtoId) === 3395).length, 1);
});

test('seguranca e limpeza UI: sem credenciais/estoque hardcoded/modais mortos e drawer recolhido', () => {
  assert.equal(/VALID_PASS_HASHES|ESTOQUE_CANONICO_BH|PEDIDOS_TRANSITO_CANONICOS|shape2026|italo2026/.test(js), false);
  assert.equal(/ESTOQUE_BH_CANONICO|PEDIDOS_TRANSITO_INICIAIS|meu_estoque_qtds|meu_estoque_resumo/.test(cat), false);
  const catJson = fs.readFileSync(path.join(ROOT, 'catalogo_dados.json'), 'utf8');
  assert.equal(/meu_estoque_qtds|meu_estoque_resumo|"meu_estoque_qtd"|"preco_pix_fixo"|"preco_cartao_fixo"/.test(catJson), false);
  assert.equal(/SPECIAL_FIXED_REC/.test(js), false);
  assert.equal(/saleModal|saleReceiptModal|confirmSale|showSaleReceipt/.test(html + js), false);
  assert.equal((html.match(/avisarClientesChegada\(\)/g) || []).length, 1);
  assert.equal((html.match(/openWhatsAppCatalogModal\('tabela_doses_avulsas'\)/g) || []).length, 1);
  assert.equal((js.match(/openWhatsAppCatalogModal\('tabela_doses_avulsas'\)/g) || []).length, 0);
  assert.equal(html.includes('fabVendaRapida'), false);
  assert.equal(/id="topbarToolsDrawer"[^>]*class="[^"]*\bopen\b/.test(html), false);

  const storeIdx = fs.readFileSync(path.join(ROOT, 'store', 'index.js'), 'utf8');
  assert.match(storeIdx, /downloader:\s*null/);
});

test('precificacao padronizada: dolar 5.95 + 30% frete (7.735), cartao 12x s/j (+12.012% sem perda), estrategia REC/MAX e alinhamento com pricing_config.json', () => {
  const { CRM, doc } = createHarness();
  const snap = CRM.getPricingSnapshot();

  assert.equal(snap.pricingPolicyVersion, pricingJson.version);
  assert.equal(snap.cotacao, 5.95);
  assert.equal(snap.fretePct, 30);
  assert.equal(snap.taxaCartaoPct, 12.012);
  assert.equal(snap.activeTier, 'auto');
  assert.deepEqual(JSON.parse(JSON.stringify(snap.groupMargins)), pricingJson.groupMargins);

  const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, 'catalogo_dados.json'), 'utf8')).productos;
  const byId = id => catalog.find(x => Number(x.id) === Number(id));

  // Tirzepatida TG 60mg (USD 85 * 7.735 = R$ 657,48): competitivo -> REC (48%)
  const tg60 = CRM.computeProduct(byId(2848));
  assert.equal(Math.round(tg60.custo * 100) / 100, 657.48);
  assert.equal(tg60.groupKey, 'emagrecedores');
  assert.equal(tg60.chosenTier, 'rec');
  assert.equal(tg60.precoMin, 890);
  assert.equal(tg60.precoRec, 980);
  assert.equal(tg60.precoMax, 1090);
  assert.equal(tg60.precoFinal, 980);
  assert.equal(tg60.precoCartao, 1100);
  assert.ok(tg60.liquidoCartao12x >= tg60.precoFinal);

  // Retatrutida Gen-Health 60mg (2830): alta demanda -> MAX (65%)
  const genReta60 = CRM.computeProduct(byId(2830));
  assert.equal(genReta60.chosenTier, 'max');
  assert.equal(genReta60.precoFinal, 1090);
  assert.equal(genReta60.precoCartao, 1230);
  assert.ok(genReta60.liquidoCartao12x >= genReta60.precoFinal);

  // Retatrutida Gen-Health 240mg Kit (3370): MAX (65%)
  const genReta240 = CRM.computeProduct(byId(3370));
  assert.equal(genReta240.chosenTier, 'max');
  assert.equal(genReta240.precoFinal, 2940);
  assert.equal(genReta240.precoCartao, 3300);
  assert.ok(genReta240.liquidoCartao12x >= genReta240.precoFinal);

  // ZPHC Retatrutida 60mg (USD 190 * 7.735 = R$ 1.469,65) <= R$ 1.800 -> MAX (65%)
  const zphcReta = CRM.computeProduct(byId(2965));
  assert.equal(Math.round(zphcReta.custo * 100) / 100, 1469.65);
  assert.equal(zphcReta.chosenTier, 'max');
  assert.equal(zphcReta.precoFinal, 2430);
  assert.equal(zphcReta.precoCartao, 2730);

  // Somatropina rotulada como anabolizante na API (ID 3214) cai no grupo hgh -> sempre REC (35%)
  const bratvaGh = CRM.computeProduct(byId(3214));
  assert.equal(bratvaGh.groupKey, 'hgh');
  assert.equal(bratvaGh.chosenTier, 'rec');
  assert.equal(bratvaGh.recPct, 35);

  // Diluente micro-ticket (ID 1522 USD 1.50 -> R$ 11,60) cai em potencia_suporte -> sempre MAX (100%)
  const dil = CRM.computeProduct(byId(1522));
  assert.equal(dil.groupKey, 'potencia_suporte');
  assert.equal(dil.chosenTier, 'max');
  assert.equal(dil.precoFinal, 24);
  assert.equal(dil.precoCartao, 27);

  // Garantia matematica: 100% dos produtos validos do catalogo recebem liquido >= PIX no 12x sem juros
  for (const raw of catalog) {
    const comp = CRM.computeProduct(raw);
    if (!comp.hasPriceIssue && comp.precoFinal > 0) {
      assert.ok(
        comp.liquidoCartao12x >= comp.precoFinal,
        `SKU ${raw.id} perdeu no 12x: liq=${comp.liquidoCartao12x} < pix=${comp.precoFinal}`
      );
    }
  }

  // Produto com USD <= 0.05 nao gera venda a R$ 0,00
  const zeroUsd = CRM.computeProduct(byId(3433));
  assert.equal(zeroUsd.hasPriceIssue, true);
  assert.equal(zeroUsd.precoFinal, 0);
  assert.equal(zeroUsd.precoCartao, 0);

  // Doses de 120mg acompanham a estrategia do frasco dinamicamente
  const doseTirz = CRM.computeDoseVialConfig(9006);
  assert.equal(doseTirz.frascoPricing.chosenTier, 'rec');
  assert.deepEqual(Array.from(doseTirz.doses.map(d => d.preco)), [70, 125, 180]);
  const doseReta = CRM.computeDoseVialConfig(9005);
  assert.equal(doseReta.frascoPricing.chosenTier, 'max');
  assert.deepEqual(Array.from(doseReta.doses.map(d => d.preco)), [90, 170, 240]);

  // WhatsApp dinamico Tirz & Reta usa os precos calculados (TG 980, Lipoless 900, Reta 60mg 1090)
  CRM.openWhatsAppCatalogModal('tabela_especial');
  const waText = doc.getElementById('waCatalogText').value;
  assert.match(waText, /980,00/);
  assert.match(waText, /900,00/);
  assert.match(waText, /1\.090,00/);
});

test('migracao automatica de estado legado (5.60 e customPrice) preserva historico e adota regra 5.95 + 30% + 12.012% + estrategico', () => {
  const { CRM, getState } = createHarness({
    initialState: {
      cotacao: 5.6,
      fretePct: 20,
      taxaCartaoFixa: 100,
      activeTier: 'min',
      groupMargins: { emagrecedores: { label: 'Antigo', min: 10, rec: 15, max: 20 } },
      overrides: {
        2848: { customPrice: 900, customMargin: 40, tier: 'max', desc: 'Nota cliente VIP' }
      },
      meuEstoque: { 2848: 3 },
      vendas: [
        { id: 'v_legacy', data: '2026-11-10T10:00:00Z', produtoId: 2848, qtd: 1, valorUnitario: 900, valorTotal: 900, custoTotal: 600, lucro: 300, statusPagamento: 'pago', estornada: false }
      ]
    }
  });

  const snap = CRM.getPricingSnapshot();
  assert.equal(snap.pricingPolicyVersion, pricingJson.version);
  assert.equal(snap.cotacao, 5.95);
  assert.equal(snap.fretePct, 30);
  assert.equal(snap.taxaCartaoPct, 12.012);
  assert.equal(snap.activeTier, 'auto');
  assert.equal(snap.groupMargins.emagrecedores.rec, 48);

  const saved = getState();
  assert.equal(saved.meuEstoque[2848], 3);
  assert.equal(saved.vendas.length, 1);
  assert.equal(saved.overrides[2848].desc, 'Nota cliente VIP');
  assert.equal(saved.overrides[2848].customPrice, undefined);
  assert.equal(saved.overrides[2848].customMargin, undefined);

  const tg60 = CRM.computeProduct({ id: 2848, precio: 85, categoria: 'emagrecedores' });
  assert.equal(tg60.precoFinal, 980);
});

test('venda de ampola avulsa abre caixa fechada automaticamente (4x15mg e 4x60mg)', () => {
  const { CRM, doc, getState } = createHarness({
    initialState: {
      meuEstoque: { 2889: 2, 3370: 1, 9003: 3, 2830: 3 }
    }
  });

  // Antes da venda: 0 avulsas de Lipoless (9004), mas 2 caixas fechadas (2889) => 8 disponiveis
  const dispAntes = CRM.getDisponibilidade(9004);
  assert.equal(dispAntes.estoqueBH, 0);
  assert.equal(dispAntes.ampolasViaCaixa, 8);
  assert.equal(dispAntes.disponivel, 8);

  // Vende 1 ampola avulsa de Lipoless 15mg (9004)
  CRM.openVendaRapidaModal(9004);
  doc.getElementById('vrCliente').value = 'Paciente Teste Lipoless';
  doc.getElementById('vrQty').value = '1';
  doc.getElementById('vrUnitPrice').value = '250';
  CRM.updateVendaRapidaTotal();
  CRM.confirmVendaRapida();

  let st = getState();
  assert.equal(st.meuEstoque[2889], 1); // abriu 1 caixa de 2 -> 1
  assert.equal(st.meuEstoque[9004], 3); // 4 da caixa - 1 vendida = 3

  // Vende mais 5 avulsas de uma vez -> precisa abrir a 2a caixa (3 + 4 - 5 = 2)
  CRM.openVendaRapidaModal(9004);
  doc.getElementById('vrCliente').value = 'Paciente Lote Avulso';
  doc.getElementById('vrQty').value = '5';
  doc.getElementById('vrUnitPrice').value = '250';
  CRM.updateVendaRapidaTotal();
  CRM.confirmVendaRapida();

  st = getState();
  assert.equal(st.meuEstoque[2889] || 0, 0);
  assert.equal(st.meuEstoque[9004], 2);

  // Vende 4 Retatrutida 60mg (2830) tendo 3 avulsas + 1 kit 240mg (3370): abre o kit e sobram 3 avulsas
  CRM.openVendaRapidaModal(2830);
  doc.getElementById('vrCliente').value = 'Paciente Retatrutida';
  doc.getElementById('vrQty').value = '4';
  doc.getElementById('vrUnitPrice').value = '950';
  CRM.updateVendaRapidaTotal();
  CRM.confirmVendaRapida();

  st = getState();
  assert.equal(st.meuEstoque[3370] || 0, 0);
  assert.equal(st.meuEstoque[2830], 3);
});
