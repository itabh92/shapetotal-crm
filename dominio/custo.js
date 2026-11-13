/**
 * Rateio exato de despesas de compra em centavos inteiros.
 * A última linha absorve o resto de arredondamento para fechar no centavo.
 */

/**
 * @param {Array<{produtoId: number|string, qtdBase: number, custoCent: number, pesoGramas?: number}>} itens
 * @param {number} despesasCent - Total de despesas extras em centavos inteiros
 * @param {'valor'|'peso'} criterio
 */
export function ratear(itens, despesasCent = 0, criterio = 'valor') {
  if (!Array.isArray(itens) || itens.length === 0) return [];
  const desp = Math.round(Number(despesasCent) || 0);

  const pesos = itens.map(it => {
    if (criterio === 'peso') {
      return Math.max(0, Math.round(Number(it.pesoGramas) || 0)) * Math.max(1, Number(it.qtdBase) || 1);
    }
    return Math.max(0, Math.round(Number(it.custoCent) || 0));
  });

  const totalPeso = pesos.reduce((s, p) => s + p, 0);
  let resto = desp;

  return itens.map((it, idx) => {
    const baseCusto = Math.round(Number(it.custoCent) || 0);
    let parte = 0;
    if (idx === itens.length - 1) {
      parte = resto;
    } else if (totalPeso > 0) {
      parte = Math.round((desp * pesos[idx]) / totalPeso);
    } else {
      parte = Math.round(desp / itens.length);
    }
    resto -= parte;
    return {
      ...it,
      custoCent: baseCusto,
      despesaRateadaCent: parte,
      custoInicialCent: baseCusto + parte
    };
  });
}
