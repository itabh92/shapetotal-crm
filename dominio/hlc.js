/**
 * Relógio Lógico Híbrido (Hybrid Logical Clock — HLC).
 * Garante ordenação causal e monotônica entre aparelhos mesmo com relógio local errado.
 * Formato: "<15 dígitos ms>-<4 dígitos contador>-<deviceId>"
 */

export function parseHlc(ts) {
  if (typeof ts !== 'string') return { ms: 0, n: 0, device: '' };
  const parts = ts.split('-');
  if (parts.length < 3) return { ms: 0, n: 0, device: '' };
  const ms = Number.parseInt(parts[0], 10) || 0;
  const n = Number.parseInt(parts[1], 10) || 0;
  const device = parts.slice(2).join('-');
  return { ms, n, device };
}

export function compareHlc(a, b) {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

export function createHlc(initial = { ms: 0, n: 0 }) {
  let last = {
    ms: Number(initial?.ms) || 0,
    n: Number(initial?.n) || 0
  };

  function tick(device, remote = null, nowFn = () => Date.now()) {
    const physical = Number(nowFn()) || 0;
    const remoteMs = Number(remote?.ms) || 0;
    const remoteN = Number(remote?.n) || 0;

    const ms = Math.max(physical, last.ms, remoteMs);
    let n = 0;
    if (ms === last.ms && ms === remoteMs) {
      n = Math.max(last.n, remoteN) + 1;
    } else if (ms === last.ms) {
      n = last.n + 1;
    } else if (ms === remoteMs) {
      n = remoteN + 1;
    }

    last = { ms, n };
    const msStr = String(ms).padStart(15, '0');
    const nStr = String(n).padStart(4, '0');
    return `${msStr}-${nStr}-${String(device || 'local')}`;
  }

  function state() {
    return { ...last };
  }

  return { tick, state };
}
