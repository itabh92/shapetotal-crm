/**
 * Utilitários puros para aritmética monetária em centavos inteiros.
 * Evita erros de ponto flutuante em somas, rateios e lucros.
 */

export function reaisParaCentavos(valorReais) {
  const n = Number(valorReais);
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100);
}

export function centavosParaReais(centavos) {
  const c = Number(centavos);
  if (!Number.isFinite(c)) return 0;
  return Math.round(c) / 100;
}

export function formatarCentavosBRL(centavos) {
  return centavosParaReais(centavos).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}
