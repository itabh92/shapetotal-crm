/**
 * Redutores puros e idempotentes por `event.id`.
 * Podem rodar:
 * 1) Em memória (para reconstrução do log, reconciliação e testes de propriedade);
 * 2) Dentro de uma única transação IndexedDB (sem await externo!).
 */

export function criarEstadoProjecoesVazio() {
  return {
    produto: new Map(),
    lote: new Map(),
    pedido: new Map(),
    reserva: new Map(),
    encomenda: new Map(),
    venda: new Map(),
    cliente: new Map()
  };
}

function ensureProduto(map, pid) {
  const key = String(pid);
  if (!map.has(key)) {
    map.set(key, {
      id: key,
      sku: key,
      nome: `SKU #${key}`,
      categoria: 'geral',
      unidadeBase: 'un',
      fatorEmbalagem: 1,
      custoUsdCent: 0,
      precoManualCent: null,
      minimo: 2,
      fisico: 0,
      reservadoFisico: 0,
      transito: 0,
      reservadoTransito: 0,
      proximaChegada: null
    });
  }
  return map.get(key);
}

/**
 * Aplica um único evento sobre `projecoes` (em memória) de forma pura.
 * A idempotência externa é garantida pelo conjunto `appliedIds`.
 */
export function aplicarEventoEmMemoria(projecoes, ev, appliedIds) {
  if (!ev || !ev.id) return false;
  const eid = String(ev.id);
  if (appliedIds && appliedIds.has(eid)) return false;
  if (appliedIds) appliedIds.add(eid);

  const d = ev.data || {};
  switch (ev.type) {
    case 'PRODUTO_SALVO': {
      const pid = String(d.id);
      const cur = ensureProduto(projecoes.produto, pid);
      projecoes.produto.set(pid, {
        ...cur,
        ...d,
        id: pid,
        sku: String(d.sku || pid)
      });
      break;
    }

    case 'CLIENTE_SALVO': {
      const cid = String(d.id);
      const prev = projecoes.cliente.get(cid) || {};
      projecoes.cliente.set(cid, {
        ...prev,
        ...d,
        id: cid
      });
      break;
    }

    case 'ESTOQUE_INICIAL':
    case 'PEDIDO_RECEBIDO': {
      for (const it of d.itens || []) {
        const pid = String(it.produtoId);
        const prod = ensureProduto(projecoes.produto, pid);
        const qtd = Math.round(Number(it.qtdBase ?? it.qtd) || 0);
        const custoCent = Math.round(Number(it.custoInicialCent ?? it.custoCent) || 0);

        if (ev.type === 'PEDIDO_RECEBIDO') {
          prod.transito -= qtd;
        }
        prod.fisico += qtd;

        if (it.loteId && !projecoes.lote.has(String(it.loteId))) {
          projecoes.lote.set(String(it.loteId), {
            id: String(it.loteId),
            produtoId: pid,
            pedidoId: d.pedidoId ? String(d.pedidoId) : null,
            serial: it.serial || null,
            validade: it.validade || null,
            entradaEm: d.entradaEm || ev.ts || '',
            qtdInicial: qtd,
            saldo: qtd,
            custoInicialCent: custoCent,
            custoSaldoCent: custoCent
          });
        }
      }
      if (ev.type === 'PEDIDO_RECEBIDO' && d.pedidoId) {
        const ped = projecoes.pedido.get(String(d.pedidoId));
        if (ped) ped.status = 'entregue';
      }
      break;
    }

    case 'PEDIDO_CRIADO': {
      const pedId = String(d.id);
      projecoes.pedido.set(pedId, { ...d, id: pedId });
      if (d.status === 'em_transito') {
        for (const it of d.itens || []) {
          const prod = ensureProduto(projecoes.produto, it.produtoId);
          prod.transito += Math.round(Number(it.qtdBase ?? it.qtd) || 0);
        }
      }
      break;
    }

    case 'ENCOMENDA_CRIADA': {
      const encId = String(d.id);
      projecoes.encomenda.set(encId, { ...d, id: encId });
      break;
    }

    case 'RESERVA_CRIADA': {
      const resId = String(d.id);
      projecoes.reserva.set(resId, { ...d, id: resId, status: d.status || 'ativa' });
      const prod = ensureProduto(projecoes.produto, d.produtoId);
      const q = Math.round(Number(d.qtd) || 0);
      if (d.alvo === 'TRANSITO') prod.reservadoTransito += q;
      else prod.reservadoFisico += q;
      break;
    }

    case 'RESERVA_LIBERADA': {
      const res = projecoes.reserva.get(String(d.reservaId || d.id));
      if (res) res.status = 'liberada';
      const prod = ensureProduto(projecoes.produto, d.produtoId);
      const q = Math.round(Number(d.qtd) || 0);
      if (d.alvo === 'TRANSITO') prod.reservadoTransito -= q;
      else prod.reservadoFisico -= q;
      break;
    }

    case 'VENDA_CONFIRMADA': {
      const vid = String(d.id);
      projecoes.venda.set(vid, { ...d, id: vid });
      if (!d.historicoSomente) {
        for (const it of d.itens || []) {
          const prod = ensureProduto(projecoes.produto, it.produtoId);
          const q = Math.round(Number(it.qtd) || 0);
          prod.fisico -= q;
          if (it.consumiuReserva) prod.reservadoFisico -= q;
          for (const u of it.alocacao || []) {
            const l = projecoes.lote.get(String(u.loteId));
            if (l) {
              l.saldo -= Math.round(Number(u.qtd) || 0);
              l.custoSaldoCent -= Math.round(Number(u.custoCent) || 0);
            }
          }
        }
      }
      break;
    }

    case 'VENDA_ESTORNADA': {
      const v = projecoes.venda.get(String(d.vendaId));
      if (v) v.estornada = true;
      if (!d.historicoSomente) {
        for (const it of d.itens || []) {
          ensureProduto(projecoes.produto, it.produtoId).fisico += Math.round(Number(it.qtd) || 0);
        }
      }
      break;
    }

    case 'AJUSTE_ESTOQUE': {
      const prod = ensureProduto(projecoes.produto, d.produtoId);
      prod.fisico += Math.round(Number(d.delta) || 0);
      break;
    }

    default:
      break;
  }

  return true;
}

export function reconstruirProjecoesDeEventos(eventos) {
  const proj = criarEstadoProjecoesVazio();
  const applied = new Set();
  for (const ev of eventos || []) {
    aplicarEventoEmMemoria(proj, ev, applied);
  }
  return proj;
}

/**
 * Grava um lote de eventos e suas projeções em UMA ÚNICA transação atômica do IndexedDB,
 * garantindo idempotência por `event.id` via store `applied` (zero await externo).
 */
export function commitEventsAtomic(db, eventos, storesList) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(eventos) || eventos.length === 0) {
      resolve({ gravados: 0, ignorados: 0 });
      return;
    }

    const tx = db.transaction(storesList, 'readwrite');
    const appliedStore = tx.objectStore('applied');
    const eventsStore = tx.objectStore('events');
    let gravados = 0;
    let ignorados = 0;

    // Cache em memória da transação para resolver múltiplos eventos no mesmo produto/lote dentro do mesmo batch
    const txCache = criarEstadoProjecoesVazio();

    function processNext(idx) {
      if (idx >= eventos.length) return;
      const ev = eventos[idx];
      if (!ev || !ev.id) {
        ignorados++;
        processNext(idx + 1);
        return;
      }

      const checkReq = appliedStore.get(String(ev.id));
      checkReq.onsuccess = () => {
        if (checkReq.result) {
          ignorados++;
          processNext(idx + 1);
          return;
        }

        appliedStore.put({ id: String(ev.id), ts: ev.ts || '' });
        eventsStore.put({ ...ev, id: String(ev.id) });
        gravados++;

        aplicarNoTransactionSync(tx, txCache, ev, () => {
          processNext(idx + 1);
        });
      };
    }

    processNext(0);

    tx.oncomplete = () => resolve({ gravados, ignorados });
    tx.onerror = tx.onabort = () => reject(tx.error || new Error('TX_ABORTED'));
  });
}

function getOrLoad(store, cacheMap, key, factory, cb) {
  const k = String(key);
  if (cacheMap.has(k)) {
    cb(cacheMap.get(k));
    return;
  }
  const req = store.get(k);
  req.onsuccess = () => {
    const val = req.result || factory(k);
    cacheMap.set(k, val);
    cb(val);
  };
}

function aplicarNoTransactionSync(tx, cache, ev, done) {
  const d = ev.data || {};
  const pStore = tx.objectStore('produto');
  const lStore = tx.objectStore('lote');

  const newProd = k => ({
    id: k, sku: k, nome: `SKU #${k}`, categoria: 'geral',
    unidadeBase: 'un', fatorEmbalagem: 1, custoUsdCent: 0,
    precoManualCent: null, minimo: 2, fisico: 0,
    reservadoFisico: 0, transito: 0, reservadoTransito: 0, proximaChegada: null
  });

  switch (ev.type) {
    case 'PRODUTO_SALVO': {
      getOrLoad(pStore, cache.produto, d.id, newProd, cur => {
        const merged = { ...cur, ...d, id: String(d.id), sku: String(d.sku || d.id) };
        cache.produto.set(merged.id, merged);
        pStore.put(merged);
        done();
      });
      break;
    }
    case 'CLIENTE_SALVO': {
      const cStore = tx.objectStore('cliente');
      const cid = String(d.id);
      const prev = cache.cliente.get(cid) || {};
      const next = { ...prev, ...d, id: cid };
      cache.cliente.set(cid, next);
      cStore.put(next);
      done();
      break;
    }
    case 'ESTOQUE_INICIAL':
    case 'PEDIDO_RECEBIDO': {
      const itens = d.itens || [];
      let i = 0;
      function step() {
        if (i >= itens.length) {
          if (ev.type === 'PEDIDO_RECEBIDO' && d.pedidoId) {
            const pedStore = tx.objectStore('pedido');
            getOrLoad(pedStore, cache.pedido, d.pedidoId, id => ({ id }), ped => {
              ped.status = 'entregue';
              pedStore.put(ped);
              done();
            });
          } else {
            done();
          }
          return;
        }
        const it = itens[i++];
        getOrLoad(pStore, cache.produto, it.produtoId, newProd, prod => {
          const q = Math.round(Number(it.qtdBase ?? it.qtd) || 0);
          const custoCent = Math.round(Number(it.custoInicialCent ?? it.custoCent) || 0);
          if (ev.type === 'PEDIDO_RECEBIDO') prod.transito -= q;
          prod.fisico += q;
          pStore.put(prod);
          if (it.loteId) {
            const lote = {
              id: String(it.loteId),
              produtoId: String(it.produtoId),
              pedidoId: d.pedidoId ? String(d.pedidoId) : null,
              serial: it.serial || null,
              validade: it.validade || null,
              entradaEm: d.entradaEm || ev.ts || '',
              qtdInicial: q,
              saldo: q,
              custoInicialCent: custoCent,
              custoSaldoCent: custoCent
            };
            cache.lote.set(lote.id, lote);
            lStore.put(lote);
          }
          step();
        });
      }
      step();
      break;
    }
    case 'PEDIDO_CRIADO': {
      const pedStore = tx.objectStore('pedido');
      const ped = { ...d, id: String(d.id) };
      cache.pedido.set(ped.id, ped);
      pedStore.put(ped);
      if (d.status !== 'em_transito') {
        done();
        break;
      }
      const itens = d.itens || [];
      let i = 0;
      function stepPed() {
        if (i >= itens.length) { done(); return; }
        const it = itens[i++];
        getOrLoad(pStore, cache.produto, it.produtoId, newProd, prod => {
          prod.transito += Math.round(Number(it.qtdBase ?? it.qtd) || 0);
          pStore.put(prod);
          stepPed();
        });
      }
      stepPed();
      break;
    }
    case 'ENCOMENDA_CRIADA': {
      const eStore = tx.objectStore('encomenda');
      const enc = { ...d, id: String(d.id) };
      cache.encomenda.set(enc.id, enc);
      eStore.put(enc);
      done();
      break;
    }
    case 'RESERVA_CRIADA': {
      const rStore = tx.objectStore('reserva');
      const res = { ...d, id: String(d.id), status: d.status || 'ativa' };
      cache.reserva.set(res.id, res);
      rStore.put(res);
      getOrLoad(pStore, cache.produto, d.produtoId, newProd, prod => {
        const q = Math.round(Number(d.qtd) || 0);
        if (d.alvo === 'TRANSITO') prod.reservadoTransito += q;
        else prod.reservadoFisico += q;
        pStore.put(prod);
        done();
      });
      break;
    }
    case 'VENDA_CONFIRMADA': {
      const vStore = tx.objectStore('venda');
      const v = { ...d, id: String(d.id) };
      cache.venda.set(v.id, v);
      vStore.put(v);
      if (d.historicoSomente) {
        done();
        break;
      }
      const itens = d.itens || [];
      let i = 0;
      function stepV() {
        if (i >= itens.length) { done(); return; }
        const it = itens[i++];
        getOrLoad(pStore, cache.produto, it.produtoId, newProd, prod => {
          const q = Math.round(Number(it.qtd) || 0);
          prod.fisico -= q;
          if (it.consumiuReserva) prod.reservadoFisico -= q;
          pStore.put(prod);
          stepV();
        });
      }
      stepV();
      break;
    }
    default:
      done();
      break;
  }
}
