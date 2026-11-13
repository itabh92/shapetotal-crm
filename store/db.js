/**
 * Camada IndexedDB do Shape Total CRM (v2).
 * Mantém Event Log imutável + tabela `applied` para idempotência na mesma transação.
 */

export const DB_NAME = 'shapetotal_crm_v2';
export const DB_VERSION = 1;

export const STORES = [
  'events',
  'applied',
  'produto',
  'lote',
  'pedido',
  'reserva',
  'encomenda',
  'venda',
  'cliente',
  'meta'
];

export function openDatabase(idbFactory = globalThis.indexedDB) {
  return new Promise((resolve, reject) => {
    if (!idbFactory) {
      reject(new Error('INDEXEDDB_UNAVAILABLE'));
      return;
    }
    const req = idbFactory.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('events')) {
        const s = db.createObjectStore('events', { keyPath: 'id' });
        s.createIndex('ts', 'ts', { unique: false });
        s.createIndex('type', 'type', { unique: false });
        s.createIndex('synced', 'synced', { unique: false });
      }
      if (!db.objectStoreNames.contains('applied')) {
        db.createObjectStore('applied', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('produto')) {
        const s = db.createObjectStore('produto', { keyPath: 'id' });
        s.createIndex('categoria', 'categoria', { unique: false });
      }
      if (!db.objectStoreNames.contains('lote')) {
        const s = db.createObjectStore('lote', { keyPath: 'id' });
        s.createIndex('produtoId', 'produtoId', { unique: false });
      }
      if (!db.objectStoreNames.contains('pedido')) {
        const s = db.createObjectStore('pedido', { keyPath: 'id' });
        s.createIndex('status', 'status', { unique: false });
      }
      if (!db.objectStoreNames.contains('reserva')) {
        const s = db.createObjectStore('reserva', { keyPath: 'id' });
        s.createIndex('produtoId', 'produtoId', { unique: false });
        s.createIndex('status', 'status', { unique: false });
      }
      if (!db.objectStoreNames.contains('encomenda')) {
        const s = db.createObjectStore('encomenda', { keyPath: 'id' });
        s.createIndex('etapa', 'etapa', { unique: false });
      }
      if (!db.objectStoreNames.contains('venda')) {
        const s = db.createObjectStore('venda', { keyPath: 'id' });
        s.createIndex('data', 'data', { unique: false });
        s.createIndex('clienteId', 'clienteId', { unique: false });
      }
      if (!db.objectStoreNames.contains('cliente')) {
        db.createObjectStore('cliente', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('meta')) {
        db.createObjectStore('meta', { keyPath: 'chave' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('IDB_OPEN_ERROR'));
  });
}

export function reqToPromise(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export function getAllFromStore(db, storeName) {
  const tx = db.transaction([storeName], 'readonly');
  return reqToPromise(tx.objectStore(storeName).getAll());
}

export function getMeta(db, chave) {
  const tx = db.transaction(['meta'], 'readonly');
  return reqToPromise(tx.objectStore('meta').get(chave)).then(r => (r ? r.valor : null));
}

export function setMeta(db, chave, valor) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['meta'], 'readwrite');
    tx.objectStore('meta').put({ chave, valor, atualizadoEm: new Date().toISOString() });
    tx.oncomplete = () => resolve(true);
    tx.onerror = tx.onabort = () => reject(tx.error);
  });
}
