/**
 * Alocação de lotes (FEFO por validade + FIFO por entrada) com custo fechado no centavo.
 * Quem consome o saldo restante do lote absorve o resto exato de custoSaldoCent.
 */

export function ordenarLotes(lotes) {
  return [...(lotes || [])].sort((a, b) => {
    const va = a.validade ? String(a.validade) : '9999-12-31';
    const vb = b.validade ? String(b.validade) : '9999-12-31';
    if (va !== vb) return va.localeCompare(vb);
    const ea = String(a.entradaEm || '');
    const eb = String(b.entradaEm || '');
    if (ea !== eb) return ea.localeCompare(eb);
    return String(a.id || '').localeCompare(String(b.id || ''));
  });
}

/**
 * Aloca quantidade solicitada sobre lotes com saldo > 0 (não muta os lotes originais).
 * @returns {Array<{loteId: string, qtd: number, custoCent: number}>}
 */
export function alocar(lotes, qtdSolicitada) {
  let restante = Math.round(Number(qtdSolicitada) || 0);
  if (restante <= 0) throw new Error('QTD_INVALIDA');

  const ordenados = ordenarLotes(lotes);
  const usos = [];

  for (const lote of ordenados) {
    if (restante === 0) break;
    const saldo = Math.round(Number(lote.saldo) || 0);
    if (saldo <= 0) continue;

    const custoSaldo = Math.round(Number(lote.custoSaldoCent) || 0);
    const q = Math.min(saldo, restante);
    const custoCent = q === saldo ? custoSaldo : Math.round((custoSaldo * q) / saldo);

    usos.push({ loteId: String(lote.id), qtd: q, custoCent });
    restante -= q;
  }

  if (restante > 0) {
    throw new Error('ESTOQUE_INSUFICIENTE');
  }
  return usos;
}

/**
 * Monta venda completa travando alocação, receita, custo e lucro em centavos inteiros.
 */
export function montarVenda(itens, lotesPorProduto, descontoCent = 0) {
  if (!Array.isArray(itens) || itens.length === 0) {
    throw new Error('VENDA_SEM_ITENS');
  }
  const desc = Math.max(0, Math.round(Number(descontoCent) || 0));

  const linhas = itens.map(item => {
    const lotes = lotesPorProduto[item.produtoId] || [];
    const qtd = Math.round(Number(item.qtd) || 0);
    const precoCent = Math.round(Number(item.precoCent) || 0);
    const alocacao = alocar(lotes, qtd);
    return {
      ...item,
      qtd,
      precoCent,
      alocacao
    };
  });

  const brutoCent = linhas.reduce((s, l) => s + l.precoCent * l.qtd, 0);
  const receitaCent = brutoCent - desc;
  const custoCent = linhas.reduce(
    (s, l) => s + l.alocacao.reduce((acc, u) => acc + u.custoCent, 0),
    0
  );

  return {
    itens: linhas,
    descontoCent: desc,
    receitaCent,
    custoCent,
    lucroCent: receitaCent - custoCent
  };
}
