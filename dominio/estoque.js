/**
 * Regras puras de disponibilidade e redutor idempotente/comutativo de eventos de estoque.
 */

export function disponibilidade(p) {
  const fisico = Number(p?.fisico) || 0;
  const resFisico = Number(p?.reservadoFisico) || 0;
  const transito = Number(p?.transito) || 0;
  const resTransito = Number(p?.reservadoTransito) || 0;

  const livre = fisico - resFisico;
  const chegando = transito - resTransito;

  if (livre > 0) return { status: 'DISPONIVEL', qtd: livre };
  if (chegando > 0) return { status: 'CHEGANDO', qtd: chegando, previsao: p?.proximaChegada || null };
  if (fisico > 0) return { status: 'RESERVADO', qtd: 0 };
  return { status: 'ENCOMENDA', qtd: 0 };
}

/**
 * Reduz uma lista de eventos de estoque em qualquer ordem (comutativo e idempotente por event.id).
 * Eventos suportados:
 * - PEDIDO_CRIADO: { itens: [{ produtoId, qtd }] }
 * - PEDIDO_RECEBIDO: { itens: [{ produtoId, qtd }] }
 * - PEDIDO_CANCELADO: { itens: [{ produtoId, qtd }] }
 * - RESERVA_CRIADA: { produtoId, qtd, alvo: 'FISICO'|'TRANSITO' }
 * - RESERVA_LIBERADA: { produtoId, qtd, alvo: 'FISICO'|'TRANSITO' }
 * - RESERVA_CONVERTIDA: { produtoId, qtd } (transito -> fisico)
 * - VENDA_CONFIRMADA: { itens: [{ produtoId, qtd, consumiuReserva?: boolean }] }
 * - VENDA_ESTORNADA: { itens: [{ produtoId, qtd }] }
 * - AJUSTE_ESTOQUE: { produtoId, delta }
 * - PERDA: { produtoId, qtd }
 */
export function aplicarEventosEstoque(eventos) {
  const vistos = new Set();
  const produtos = new Map();

  const ensure = pid => {
    const key = String(pid);
    if (!produtos.has(key)) {
      produtos.set(key, {
        fisico: 0,
        reservadoFisico: 0,
        transito: 0,
        reservadoTransito: 0
      });
    }
    return produtos.get(key);
  };

  for (const ev of eventos || []) {
    if (!ev || !ev.id) continue;
    const eid = String(ev.id);
    if (vistos.has(eid)) continue;
    vistos.add(eid);

    const d = ev.data || {};
    switch (ev.type) {
      case 'PEDIDO_CRIADO':
        for (const it of d.itens || []) {
          ensure(it.produtoId).transito += Number(it.qtd) || 0;
        }
        break;
      case 'PEDIDO_RECEBIDO':
        for (const it of d.itens || []) {
          const p = ensure(it.produtoId);
          const q = Number(it.qtd) || 0;
          p.transito -= q;
          p.fisico += q;
        }
        break;
      case 'PEDIDO_CANCELADO':
        for (const it of d.itens || []) {
          ensure(it.produtoId).transito -= Number(it.qtd) || 0;
        }
        break;
      case 'RESERVA_CRIADA': {
        const p = ensure(d.produtoId);
        const q = Number(d.qtd) || 0;
        if (d.alvo === 'TRANSITO') p.reservadoTransito += q;
        else p.reservadoFisico += q;
        break;
      }
      case 'RESERVA_LIBERADA': {
        const p = ensure(d.produtoId);
        const q = Number(d.qtd) || 0;
        if (d.alvo === 'TRANSITO') p.reservadoTransito -= q;
        else p.reservadoFisico -= q;
        break;
      }
      case 'RESERVA_CONVERTIDA': {
        const p = ensure(d.produtoId);
        const q = Number(d.qtd) || 0;
        p.reservadoTransito -= q;
        p.reservadoFisico += q;
        break;
      }
      case 'VENDA_CONFIRMADA':
        for (const it of d.itens || []) {
          const p = ensure(it.produtoId);
          const q = Number(it.qtd) || 0;
          p.fisico -= q;
          if (it.consumiuReserva) p.reservadoFisico -= q;
        }
        break;
      case 'VENDA_ESTORNADA':
        for (const it of d.itens || []) {
          ensure(it.produtoId).fisico += Number(it.qtd) || 0;
        }
        break;
      case 'AJUSTE_ESTOQUE':
        ensure(d.produtoId).fisico += Number(d.delta) || 0;
        break;
      case 'PERDA':
        ensure(d.produtoId).fisico -= Number(d.qtd) || 0;
        break;
      default:
        break;
    }
  }

  return Object.fromEntries(produtos.entries());
}
