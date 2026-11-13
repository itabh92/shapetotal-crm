export * from './db.js';
export * from './reducers.js';
export * from './migracao.js';

import { executarMigracaoLocalStorageParaIdb, MIGRATION_FLAG_KEY } from './migracao.js';

function downloadJsonBrowser(filename, text) {
  try {
    // Em PWA standalone no iOS, clicar em <a href="blob:..."> pode navegar a tela inteira para o blob e travar o app
    const isIosStandalone =
      (window.navigator && window.navigator.standalone === true) ||
      (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
    const isMobileSafari = /iPhone|iPad|iPod/i.test(navigator.userAgent || '');
    if (isIosStandalone || isMobileSafari) {
      return;
    }
    const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  } catch (e) {
    console.warn('Backup download ignorado:', e);
  }
}

export async function iniciarMigracaoSeguraBrowser() {
  if (typeof window === 'undefined' || !window.indexedDB) return null;

  // Solicita persistência no navegador/PWA para evitar limpeza automática no iOS/Safari
  if (navigator.storage && typeof navigator.storage.persist === 'function') {
    navigator.storage.persist().catch(() => {});
  }

  const rawStr = localStorage.getItem('SHAPETOTAL_CRM_STATE_V1');
  if (!rawStr) return null;
  let rawState = null;
  try {
    rawState = JSON.parse(rawStr);
  } catch {
    return null;
  }

  let extraAudit = [];
  try {
    extraAudit = JSON.parse(localStorage.getItem('ST_AUDIT_LOG_v1') || '[]');
  } catch {}

  const catalog = (window.SHAPETOTAL_RAW && window.SHAPETOTAL_RAW.productos) || [];
  const jaMigrado = !!localStorage.getItem(MIGRATION_FLAG_KEY);

  const run = () =>
    executarMigracaoLocalStorageParaIdb({
      rawState,
      rawCatalog: catalog,
      extraAudit,
      getCustoUnitBrlFn: (prod, st) => {
        const pid = Number(prod.id);
        if (st.custosReais && Number(st.custosReais[pid]) > 0) return Number(st.custosReais[pid]);
        const cot = Number(st.cotacao) || 5.6;
        const frete = Number(st.fretePct) ?? 30;
        return Math.round(Number(prod.precio || 0) * cot * (1 + frete / 100) * 100) / 100;
      },
      downloader: jaMigrado ? null : downloadJsonBrowser
    });

  const res = navigator.locks && typeof navigator.locks.request === 'function'
    ? await navigator.locks.request('shapetotal_migracao_v2', run)
    : await run();

  window.CRM_MIGRACAO_RELATORIO = res;
  if (res && !res.sucesso) {
    console.error('[CRM_STORE] Migração abortada por reconciliação:', res);
  }
  return res;
}

if (typeof window !== 'undefined') {
  window.CRM_STORE = {
    iniciarMigracaoSeguraBrowser
  };
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      iniciarMigracaoSeguraBrowser().catch(err => console.warn('[CRM_STORE] Erro migração:', err));
    }, 600);
  });
}
