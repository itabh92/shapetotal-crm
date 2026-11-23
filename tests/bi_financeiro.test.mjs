import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(import.meta.dirname, '..');
const BI = require(path.join(ROOT, 'bi_engine.js'));
const pricingJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'pricing_config.json'), 'utf8'));
const pricingJs = fs.readFileSync(path.join(ROOT, 'pricing_config.js'), 'utf8');
const catJs = fs.readFileSync(path.join(ROOT, 'dados_catalogo.js'), 'utf8');
const biJs = fs.readFileSync(path.join(ROOT, 'bi_engine.js'), 'utf8');
const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');

function createAppHarness(initialState = {}) {
  const elements = {};
  const alerts = [];
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
      click() {},
      querySelectorAll() { return []; }
    };
  }
  const storageData = { SHAPETOTAL_CRM_STATE_V1: JSON.stringify(initialState) };
  const sandbox = {
    Date,
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
    confirm() { return true; },
    prompt() { return '0'; },
    setTimeout() { return 1; },
    clearTimeout() {},
    console
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(pricingJs, sandbox);
  vm.runInContext(catJs, sandbox);
  vm.runInContext(biJs, sandbox);
  vm.runInContext(appJs, sandbox);
  sandbox.document._onReady();
  const getState = () => JSON.parse(sandbox.localStorage.getItem('SHAPETOTAL_CRM_STATE_V1'));
  return { CRM: sandbox.window.CRM, doc: sandbox.document, alerts, getState };
}

test('BI FP&A: DRE fecha no centavo, separa competencia de caixa real e ignora vendas estornadas', () => {
  const nowTs = new Date('2026-11-22T15:00:00Z').getTime();
  const catalogById = new Map([
    [3207, { id: 3207, nombre: 'Tirzec 60mg', groupKey: 'emagrecedores', custo: 560, precoFinal: 840 }],
    [2848, { id: 2848, nombre: 'TG 60mg', groupKey: 'emagrecedores', custo: 640, precoFinal: 960 }],
    [9006, { id: 9006, nombre: 'Tirzepatide 120mg', groupKey: 'emagrecedores', custo: 830, precoFinal: 1240 }]
  ]);

  const report = BI.computeBiReport({
    nowTs,
    pricingConfig: pricingJson,
    catalogById,
    meuEstoque: { 3207: 4, 2848: 2 },
    custosReais: { 3207: 560, 2848: 640 },
    vendas: [
      {
        id: 'v1', data: '2026-11-10T12:00:00Z', produtoId: 3207, produtoNome: 'Tirzec 60mg',
        qtd: 2, valorUnitario: 850, valorProdutos: 1700, valorFrete: 0, valorTotal: 1700,
        custoTotal: 1120, lucro: 580, formaPagamento: '💠 À vista no PIX', statusPagamento: 'pago',
        cliente: 'Ana Paula', telefone: '31999990001', estornada: false
      },
      {
        id: 'v2', data: '2026-11-15T14:00:00Z', produtoId: 2848, produtoNome: 'TG 60mg',
        qtd: 1, valorUnitario: 1000, valorProdutos: 1000, valorFrete: 0, valorTotal: 1000,
        custoTotal: 640, lucro: 360, formaPagamento: '💳 Cartão Parcelado 12x', statusPagamento: 'pago',
        cliente: 'Carlos Mendes', telefone: '31999990002', estornada: false
      },
      {
        id: 'v3', data: '2026-11-18T16:00:00Z', produtoId: 9006, produtoNome: 'Tirzepatide 120mg — Dose 5mg',
        qtd: 1, isDose: true, doseMg: 5, valorUnitario: 150, valorProdutos: 150, valorFrete: 30, valorTotal: 180,
        custoTotal: 35, lucro: 115, formaPagamento: '💠 PIX', statusPagamento: 'pendente',
        cliente: 'Fernanda Lima', telefone: '31999990003', estornada: false
      },
      {
        id: 'v_est', data: '2026-11-19T10:00:00Z', produtoId: 3207, produtoNome: 'Tirzec 60mg',
        qtd: 5, valorTotal: 4250, custoTotal: 2800, lucro: 1450, formaPagamento: '💠 PIX',
        statusPagamento: 'pago', cliente: 'Ignorar Estornada', estornada: true
      }
    ],
    despesas: [
      { id: 'd1', data: '2026-11-12', categoria: 'frete_motoboy', descricao: 'Motoboy centro', valor: 45, status: 'pago' },
      { id: 'd2', data: '2026-11-20', categoria: 'embalagem_frio', descricao: 'Gelox', valor: 55, status: 'pendente' }
    ],
    pedidosTransito: [
      { id: 'PED-1', data_compra: '11/11/2026', status: 'em_transito', custo_total_reais: 1200, itens: [] }
    ],
    encomendas: [
      { id: 'ENC-1', data: '2026-11-14T10:00:00Z', status: 'pendente', cliente: 'Joao', valorTotal: 900, sinal: 300, saldoRestante: 600 }
    ]
  });

  const k = report.kpis;
  // Receita Bruta = 1700 + 1000 + 180 = 2880 (estornada ignorada)
  assert.equal(k.receitaBruta, 2880);
  // Taxa cartão 12x sobre v2 (R$ 1000 * 10.7239% = 107.24)
  assert.equal(k.taxasCartao, 107.24);
  assert.equal(k.receitaLiquida, 2772.76);
  // CMV = 1120 + 640 + 35 = 1795
  assert.equal(k.custosTotais, 1795);
  // Lucro Bruto = 2772.76 - 1795 = 977.76
  assert.equal(k.lucroBruto, 977.76);
  // Despesas operacionais competência = 45 + 55 = 100
  assert.equal(k.despesasOperacionais, 100);
  // Lucro Líquido = 977.76 - 100 = 877.76
  assert.equal(k.lucroLiquido, 877.76);

  // Regime de Caixa:
  // Entradas pagas = v1 (1700) + v2 líquido (1000 - 107.24 = 892.76) + sinal encomenda aberta (300) = 2892.76
  assert.equal(k.entradasCaixa, 2892.76);
  // Saídas pagas = pedido trânsito (1200) + despesa paga (45) = 1245 (despesa pendente 55 não sai do caixa ainda)
  assert.equal(k.saidasCaixa, 1245);
  assert.equal(k.geracaoCaixa, 1647.76);
  // A receber = v3 pendente (180)
  assert.equal(k.aReceberTotal, 180);

  // Capital alocado: Estoque (4*560 + 2*640 = 3520) + Trânsito (1200) = 4720
  assert.equal(k.estoqueCusto, 3520);
  assert.equal(k.transitoInvestido, 1200);
  assert.equal(k.capitalAlocadoTotal, 4720);

  // Semáforos coerentes
  assert.equal(report.semaforos.geracaoCaixa.status, 'verde');
  assert.equal(report.semaforos.aReceber.status, 'verde'); // 180/2880 = 6.25% <= 15%
  assert.equal(report.semaforos.margemLiquida.status, 'amarelo'); // 877.76 / 2772.76 = 31.66% (entre 20% e 32%)
});

test('BI FP&A: filtros interativos, evolucao mensal, comparativo MoM e auditoria de inconsistencias', () => {
  const nowTs = new Date('2026-11-22T15:00:00Z').getTime();
  const reportFull = BI.computeBiReport({
    nowTs,
    pricingConfig: pricingJson,
    vendas: [
      { id: 'out1', data: '2026-10-10T10:00:00Z', produtoId: 3207, produtoNome: 'Tirzec 60mg', qtd: 1, valorTotal: 800, custoTotal: 500, formaPagamento: 'PIX', statusPagamento: 'pago', cliente: 'Maria', telefone: '31988881111' },
      { id: 'nov1', data: '2026-11-05T10:00:00Z', produtoId: 3207, produtoNome: 'Tirzec 60mg', qtd: 2, valorTotal: 1600, custoTotal: 1000, formaPagamento: 'PIX', statusPagamento: 'pago', cliente: 'Maria', telefone: '' },
      { id: 'nov2', data: 'data_ruim', produtoId: 2848, produtoNome: 'TG 60mg', qtd: 1, valorTotal: 950, custoTotal: 0, formaPagamento: 'PIX', statusPagamento: 'pago', cliente: 'Pedro', telefone: '31988882222' }
    ],
    pedidosTransito: [
      { id: 'PED-ZERO', data_compra: '12/11/2026', status: 'em_transito', custo_total_reais: 0, itens: [] }
    ],
    divergenciasEstoque: [{ produtoId: 3207, divergencia: -1 }]
  });

  // Evolução mensal ordenada cronologicamente (Out/26 -> Nov/26)
  assert.equal(reportFull.seriesMensais.length, 2);
  assert.equal(reportFull.seriesMensais[0].mesKey, '2026-10');
  assert.equal(reportFull.seriesMensais[1].mesKey, '2026-11');
  // Comparativo automático do último mês vs penúltimo: 1600 vs 800 = +100%
  assert.equal(reportFull.comparativo.deltaReceitaPct, 100);

  // Auditoria de qualidade deve flagrar custo zerado, divergência estoque, data inválida, lote sem valor e sem despesas
  const titulos = reportFull.qualidadeDados.itens.map(i => i.titulo).join(' | ');
  assert.match(titulos, /sem custo real/);
  assert.match(titulos, /divergência no razão/);
  assert.match(titulos, /data ausente ou inválida/);
  assert.match(titulos, /sem custo total preenchido/);
  assert.match(titulos, /Nenhuma despesa operacional/);
  assert.equal(reportFull.semaforos.qualidadeDados.status, 'vermelho');

  // Filtro por cliente + mês específico
  const reportFiltered = BI.computeBiReport({
    nowTs,
    pricingConfig: pricingJson,
    vendas: [
      { id: 'out1', data: '2026-10-10T10:00:00Z', produtoId: 3207, produtoNome: 'Tirzec 60mg', qtd: 1, valorTotal: 800, custoTotal: 500, formaPagamento: 'PIX', statusPagamento: 'pago', cliente: 'Maria' },
      { id: 'nov1', data: '2026-11-05T10:00:00Z', produtoId: 3207, produtoNome: 'Tirzec 60mg', qtd: 2, valorTotal: 1600, custoTotal: 1000, formaPagamento: 'PIX', statusPagamento: 'pago', cliente: 'Maria' }
    ],
    filters: { mes: '2026-11', cliente: 'Maria' }
  });
  assert.equal(reportFiltered.kpis.receitaBruta, 1600);
  assert.equal(reportFiltered.kpis.lucroLiquido, 600);
  assert.equal(reportFiltered.comparativo.deltaReceitaPct, 100);

  // Resumo WhatsApp e CSV gerados corretamente
  const wa = BI.buildExecutiveWhatsAppSummary(reportFiltered);
  assert.match(wa, /RELATÓRIO EXECUTIVO/);
  assert.match(wa, /1\.600,00/);
  const csv = BI.buildExecutiveCSV(reportFiltered);
  assert.match(csv, /DRE/);
  assert.match(csv, /RANKING_PRODUTO/);
});

test('CRM integrado: abrir BI Financeiro, lancar/alternar/excluir despesa e renderizar graficos e insights', () => {
  const { CRM, doc, getState } = createAppHarness({
    meuEstoque: { 3207: 3 },
    custosReais: { 3207: 560 },
    vendas: [
      {
        id: 'v_bi_1', data: '2026-11-18T11:00:00Z', produtoId: 3207, produtoNome: 'Tirzec 60mg',
        qtd: 2, valorUnitario: 900, valorProdutos: 1800, valorFrete: 0, valorTotal: 1800,
        custoTotal: 1120, lucro: 680, formaPagamento: '💠 PIX', statusPagamento: 'pago',
        cliente: 'Juliana Costa', telefone: '31999998888', estornada: false
      }
    ],
    encomendas: [],
    pedidosTransito: [],
    despesas: []
  });

  // Lança despesa operacional pelo modal
  CRM.openDespesaModal();
  doc.getElementById('despData').value = '2026-11-19';
  doc.getElementById('despValor').value = '80';
  doc.getElementById('despCategoria').value = 'frete_motoboy';
  doc.getElementById('despStatus').value = 'pago';
  doc.getElementById('despDescricao').value = 'Motoboy Savassi';
  CRM.saveDespesa();

  let st = getState();
  assert.equal(st.despesas.length, 1);
  assert.equal(st.despesas[0].valor, 80);

  // Abre aba BI & Financeiro e valida DOM renderizado (DRE, SVG, Semáforos, Insights, Despesa)
  CRM.openBiFinanceiro();
  const biHtml = doc.getElementById('biFinanceiroContainer').innerHTML;
  assert.match(biHtml, /Dashboard Executivo/);
  assert.match(biHtml, /DRE Gerencial Simplificado/);
  assert.match(biHtml, /<svg viewBox=/);
  assert.match(biHtml, /Motoboy Savassi/);
  assert.match(biHtml, /Juliana Costa/);
  assert.match(biHtml, /Insights Executivos/);

  const rep = CRM.getBiReport();
  assert.equal(rep.kpis.receitaBruta, 1800);
  assert.equal(rep.kpis.despesasOperacionais, 80);
  assert.equal(rep.kpis.lucroLiquido, 600); // 1800 - 1120 - 80

  // Toggle status da despesa (pago -> pendente) e exclusão
  const despId = st.despesas[0].id;
  CRM.toggleDespesaStatus(despId);
  assert.equal(getState().despesas[0].status, 'pendente');

  CRM.deleteDespesa(despId);
  assert.equal(getState().despesas.length, 0);
});
