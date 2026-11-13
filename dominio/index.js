export * from './dinheiro.js';
export * from './hlc.js';
export * from './custo.js';
export * from './lotes.js';
export * from './estoque.js';

import * as dinheiro from './dinheiro.js';
import * as hlc from './hlc.js';
import * as custo from './custo.js';
import * as lotes from './lotes.js';
import * as estoque from './estoque.js';

if (typeof window !== 'undefined') {
  window.CRM_DOMINIO = {
    ...dinheiro,
    ...hlc,
    ...custo,
    ...lotes,
    ...estoque
  };
}
