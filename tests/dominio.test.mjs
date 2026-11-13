import test from 'node:test';
import assert from 'node:assert/strict';
import {
  reaisParaCentavos,
  centavosParaReais,
  createHlc,
  parseHlc,
  compareHlc,
  ratear,
  ordenarLotes,
  alocar,
  montarVenda,
  disponibilidade,
  aplicarEventosEstoque
} from '../dominio/index.js';

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(arr, rng) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

test('dinheiro: conversão sem erro de ponto flutuante', () => {
  assert.equal(reaisParaCentavos(19.99), 1999);
  assert.equal(reaisParaCentavos(0.1 + 0.2), 30);
  assert.equal(centavosParaReais(1999), 19.99);
});

test('propriedade: rateio de despesas fecha no centavo em 200 cenários aleatórios', () => {
  const rng = mulberry32(20261113);
  for (let trial = 0; trial < 200; trial++) {
    const n = 1 + Math.floor(rng() * 12);
    const itens = [];
    for (let i = 0; i < n; i++) {
      itens.push({
        produtoId: 1000 + i,
        qtdBase: 1 + Math.floor(rng() * 10),
        custoCent: 100 + Math.floor(rng() * 250000),
        pesoGramas: 10 + Math.floor(rng() * 500)
      });
    }
    const despesasCent = Math.floor(rng() * 50000);
    const criterio = trial % 2 === 0 ? 'valor' : 'peso';

    const res = ratear(itens, despesasCent, criterio);
    const somaBase = itens.reduce((s, it) => s + it.custoCent, 0);
    const somaInicial = res.reduce((s, it) => s + it.custoInicialCent, 0);
    const somaDesp = res.reduce((s, it) => s + it.despesaRateadaCent, 0);

    assert.equal(somaDesp, despesasCent);
    assert.equal(somaInicial, somaBase + despesasCent);
  }
});

test('propriedade: alocação de lotes FEFO/FIFO fecha custo total sem sobra ou falta de 1 centavo', () => {
  const rng = mulberry32(98765);
  for (let trial = 0; trial < 100; trial++) {
    const numLotes = 1 + Math.floor(rng() * 6);
    const lotes = [];
    let totalQtd = 0;
    let totalCustoInicial = 0;

    for (let i = 0; i < numLotes; i++) {
      const qtd = 1 + Math.floor(rng() * 15);
      const custo = 1000 + Math.floor(rng() * 100000);
      totalQtd += qtd;
      totalCustoInicial += custo;
      lotes.push({
        id: `L${i}`,
        validade: i % 2 === 0 ? `2027-0${1 + (i % 9)}-15` : null,
        entradaEm: `2026-11-0${1 + i}T10:00:00Z`,
        saldo: qtd,
        custoSaldoCent: custo
      });
    }

    // Consome todo o estoque em fatias aleatórias até zerar
    let restante = totalQtd;
    let somaCustosAlocados = 0;
    while (restante > 0) {
      const qVenda = Math.min(restante, 1 + Math.floor(rng() * 7));
      const usos = alocar(lotes, qVenda);
      for (const u of usos) {
        somaCustosAlocados += u.custoCent;
        const lote = lotes.find(l => l.id === u.loteId);
        lote.saldo -= u.qtd;
        lote.custoSaldoCent -= u.custoCent;
        assert.ok(lote.saldo >= 0);
        assert.ok(lote.custoSaldoCent >= 0);
      }
      restante -= qVenda;
    }

    assert.equal(somaCustosAlocados, totalCustoInicial);
    for (const l of lotes) {
      assert.equal(l.saldo, 0);
      assert.equal(l.custoSaldoCent, 0);
    }
  }
});

test('lotes: respeita FEFO (validade menor primeiro) e bloqueia estoque insuficiente', () => {
  const lotes = [
    { id: 'L_LONGO', validade: '2028-01-01', entradaEm: '2026-01-01', saldo: 5, custoSaldoCent: 50000 },
    { id: 'L_CURTO', validade: '2027-02-01', entradaEm: '2026-05-01', saldo: 2, custoSaldoCent: 20000 }
  ];
  const ord = ordenarLotes(lotes);
  assert.equal(ord[0].id, 'L_CURTO');

  const venda = montarVenda(
    [{ produtoId: 2830, qtd: 3, precoCent: 15000 }],
    { 2830: lotes },
    1000
  );
  assert.equal(venda.itens[0].alocacao[0].loteId, 'L_CURTO');
  assert.equal(venda.itens[0].alocacao[0].qtd, 2);
  assert.equal(venda.itens[0].alocacao[1].loteId, 'L_LONGO');
  assert.equal(venda.itens[0].alocacao[1].qtd, 1);
  assert.equal(venda.receitaCent, 44000);
  assert.equal(venda.custoCent, 30000);
  assert.equal(venda.lucroCent, 14000);

  assert.throws(() => alocar(lotes, 99), /ESTOQUE_INSUFICIENTE/);
});

test('propriedade: HLC é estritamente monotônico mesmo com relógio retrocedendo ou remoto adiantado', () => {
  let fakeNow = 1731500000000;
  const hlc = createHlc();
  const gerados = [];

  for (let i = 0; i < 100; i++) {
    // Simula relógio voltando no tempo em alguns passos e eventos remotos no futuro
    if (i % 5 === 0) fakeNow -= 5000;
    else if (i % 3 === 0) fakeNow += 10;
    const remote = i === 30 ? parseHlc('001731500999999-0005-cel2') : null;
    const ts = hlc.tick('cel1', remote, () => fakeNow);
    gerados.push(ts);
  }

  for (let i = 1; i < gerados.length; i++) {
    assert.equal(compareHlc(gerados[i - 1], gerados[i]), -1);
  }
});

test('propriedade: eventos de estoque em ordem embaralhada + duplicados produzem o mesmo estado', () => {
  const rng = mulberry32(424242);
  const eventos = [
    { id: 'e1', type: 'PEDIDO_CRIADO', data: { itens: [{ produtoId: 2830, qtd: 10 }, { produtoId: 9006, qtd: 2 }] } },
    { id: 'e2', type: 'RESERVA_CRIADA', data: { produtoId: 2830, qtd: 3, alvo: 'TRANSITO' } },
    { id: 'e3', type: 'PEDIDO_RECEBIDO', data: { itens: [{ produtoId: 2830, qtd: 10 }] } },
    { id: 'e4', type: 'RESERVA_CONVERTIDA', data: { produtoId: 2830, qtd: 3 } },
    { id: 'e5', type: 'VENDA_CONFIRMADA', data: { itens: [{ produtoId: 2830, qtd: 2, consumiuReserva: true }] } },
    { id: 'e6', type: 'RESERVA_LIBERADA', data: { produtoId: 2830, qtd: 1, alvo: 'FISICO' } },
    { id: 'e7', type: 'AJUSTE_ESTOQUE', data: { produtoId: 2830, delta: -1 } },
    { id: 'e8', type: 'VENDA_ESTORNADA', data: { itens: [{ produtoId: 2830, qtd: 1 }] } },
    { id: 'e9', type: 'PERDA', data: { produtoId: 9006, qtd: 1 } }
  ];

  const base = aplicarEventosEstoque(eventos);
  assert.deepEqual(base['2830'], { fisico: 8, reservadoFisico: 0, transito: 0, reservadoTransito: 0 });
  assert.deepEqual(disponibilidade(base['2830']), { status: 'DISPONIVEL', qtd: 8 });

  for (let trial = 0; trial < 50; trial++) {
    const comDuplicatas = [...eventos, eventos[trial % eventos.length], eventos[0]];
    const embaralhado = shuffle(comDuplicatas, rng);
    const res = aplicarEventosEstoque(embaralhado);
    assert.deepEqual(res, base);
  }
});
