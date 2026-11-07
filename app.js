
  const SPECIAL_FIXED_REC = {
    // Linha 60 mg / 4 vias x 15 mg / MD 15 mg -> Pix: R$ 900,00 | Cartão: R$ 1.000,00
    2848: { rec: 900, cartao: 1000, label: 'TG 15mg x 4 (60mg)' },
    3207: { rec: 900, cartao: 1000, label: 'Tirzec 15mg x 4 (60mg)' },
    2889: { rec: 900, cartao: 1000, label: 'Lipoless 15mg x 4 (60mg)' },
    2988: { rec: 900, cartao: 1000, label: 'Lipoland 15mg x 4 (60mg)' },
    3072: { rec: 900, cartao: 1000, label: 'Lipoland MD 15mg' },
    2997: { rec: 900, cartao: 1000, label: 'Lipoless MD 15mg' },
    2996: { rec: 900, cartao: 1000, label: 'Tirzec MD 15mg' },
    3308: { rec: 900, cartao: 1000, label: 'T36 MD 15mg' },
    3381: { rec: 900, cartao: 1000, label: 'T36 15mg x 4 (60mg)' },
    3039: { rec: 900, cartao: 1000, label: 'Gluconex 15mg x 4 (60mg)' },
    3136: { rec: 900, cartao: 1000, label: 'Tirzedral 15mg x 4 (60mg)' },
    3203: { rec: 900, cartao: 1000, label: 'Tirzedral MD 15mg' },
    446:  { rec: 900, cartao: 1000, label: 'Lipoless 15mg x 4 Jer' },
    3389: { rec: 900, cartao: 1000, label: 'Slimex 15mg x 4 (60mg)' },
    3014: { rec: 900, cartao: 1000, label: 'Synedica Tirzepatida 60mg' },
    3392: { rec: 900, cartao: 1000, label: 'Oxygen Tirzegen 60mg x 4' },
    3271: { rec: 900, cartao: 1000, label: 'Oxygen Tirzegen 60mg Polvo' },
    2877: { rec: 900, cartao: 1000, label: 'Sin Marca Tirzepatida 60mg' },
    3149: { rec: 900, cartao: 1000, label: 'Spectrum Mounjaos 60mg' },
    2765: { rec: 900, cartao: 1000, label: 'Gen-Tirz 60mg' },
    3186: { rec: 900, cartao: 1000, label: 'Veltrane Tirzepatide 60mg' },

    // Retatrutida 60 mg -> Pix: R$ 1.000,00 | Cartão: R$ 1.100,00
    3340: { rec: 1000, cartao: 1100, label: 'Oxygen Retatrutide 60mg' },
    2830: { rec: 1000, cartao: 1100, label: 'Gen Retatrutide 60mg' },
    2942: { rec: 1000, cartao: 1100, label: 'Gen-Health Caneta 60mg' },
    3156: { rec: 1000, cartao: 1100, label: 'Veltrane Retatrutide 60mg' },
    3391: { rec: 1000, cartao: 1100, label: 'Synedica Retatrutide 60mg' },
    3147: { rec: 1000, cartao: 1100, label: 'ZPHC Caneta Retatrutide 60mg' },
    2965: { rec: 1000, cartao: 1100, label: 'ZPHC Retatrutide 60mg (5x12mg)' },

    // Ampolas / Frascos avulsos 15 mg -> Pix: R$ 250,00 | Cartão: R$ 300,00
    3206: { rec: 250, cartao: 300, label: 'Tirzepatida 15mg 1 Vial (Pharmacom)' },
    2763: { rec: 250, cartao: 300, label: 'Gen-Tirz 15mg' },
    2875: { rec: 250, cartao: 300, label: 'Sin Marca Tirzepatida 15mg' },
    3008: { rec: 250, cartao: 300, label: 'ZPHC Tirzepatide 15mg' }
  };

(function () {
  const STORAGE_KEY = 'SHAPETOTAL_CRM_STATE_V1';

  const DEFAULT_GROUP_MARGINS = {
    anabolizante: { label: '💪 Anabolizantes', min: 28, rec: 40, max: 58 },
    emagrecedores: { label: '🔥 Emagrecedores & Queimadores', min: 28, rec: 40, max: 55 },
    saude_mental: { label: '🧠 Saúde Mental & Nootrópicos', min: 32, rec: 45, max: 65 },
    peptideo: { label: '🧬 Peptídeos & HGH', min: 30, rec: 45, max: 65 },
    estetico: { label: '✨ Estético, Botox & Pele', min: 35, rec: 50, max: 75 },
    sarms_post: { label: '🧪 SARMs, Pós-Ciclo & HCG', min: 30, rec: 42, max: 60 },
    potencia_outros: { label: '⚡ Potência, Capilar & Outros', min: 32, rec: 45, max: 70 }
  };

  let state = {
    cotacao: 5.60,
    fretePct: 30,
    taxaCartaoFixa: 100,
    activeTier: 'rec', // 'min' | 'rec' | 'max'
    viewMode: 'grid', // 'grid' | 'table'
    clientMode: false,
    mainGroup: 'todas',
    subCat: 'todas',
    brand: 'todas',
    stockFilter: 'com_estoque', // 'com_estoque' | 'todos' | 'sem_estoque'
    branchFilter: 'todas', // 'todas' | 'cde' | 'pj' | 'sg'
    sortBy: 'estoque_desc',
    search: '',
    groupMargins: JSON.parse(JSON.stringify(DEFAULT_GROUP_MARGINS)),
    overrides: {}, // { [id]: { usd, tier, customPrice, customMargin, desc, fav } }
    cart: {} // { [id]: qty }
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state.cotacao = Number(parsed.cotacao) || 5.60;
        state.fretePct = parsed.fretePct !== undefined ? Number(parsed.fretePct) : 30;
        state.taxaCartaoFixa = parsed.taxaCartaoFixa !== undefined ? Number(parsed.taxaCartaoFixa) : 100;
        state.activeTier = parsed.activeTier || 'rec';
        if (parsed.groupMargins) {
          for (const k of Object.keys(DEFAULT_GROUP_MARGINS)) {
            if (parsed.groupMargins[k]) {
              state.groupMargins[k] = { ...DEFAULT_GROUP_MARGINS[k], ...parsed.groupMargins[k] };
            }
          }
        }
        state.overrides = parsed.overrides || {};
      }
    } catch (e) {
      console.error('Erro ao carregar estado:', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        cotacao: state.cotacao,
        fretePct: state.fretePct,
        taxaCartaoFixa: state.taxaCartaoFixa,
        activeTier: state.activeTier,
        groupMargins: state.groupMargins,
        overrides: state.overrides
      }));
    } catch (e) {
      console.error('Erro ao salvar estado:', e);
    }
  }

  const rawCatalog = (window.SHAPETOTAL_RAW && window.SHAPETOTAL_RAW.productos) ? window.SHAPETOTAL_RAW.productos : [];

  function mapCategoryToGroupKey(cat) {
    const c = (cat || '').toLowerCase().trim();
    if (c === 'anabolizante') return 'anabolizante';
    if (c === 'emagrecedores' || c === 'queimador') return 'emagrecedores';
    if (c === 'saude mental') return 'saude_mental';
    if (c === 'peptideo' || c === 'hgh') return 'peptideo';
    if (c === 'estetico' || c === 'botox' || c === 'cosmetico' || c === 'anti acne') return 'estetico';
    if (c === 'sarms' || c === 'post ciclo' || c === 'hcg') return 'sarms_post';
    return 'potencia_outros';
  }

  function mapProductMainTab(p) {
    const c = (p.categoria || '').toLowerCase().trim();
    const txt = ((p.nombre || '') + ' ' + (p.composicion || '')).toLowerCase();
    if (c === 'anabolizante') return 'anabolizantes';
    if (c === 'emagrecedores' || c === 'queimador') return 'emagrecedores';
    if (c === 'saude mental' || txt.includes('semax') || txt.includes('selank') || txt.includes('cbl') || txt.includes('dsip')) return 'saude_mental';
    if (c === 'peptideo' || c === 'hgh') return 'peptideos';
    return 'outros';
  }

  function computeProduct(p) {
    const ov = state.overrides[p.id] || {};
    const usd = ov.usd !== undefined && ov.usd !== '' ? Number(ov.usd) : Number(p.precio || 0);
    const multCusto = state.cotacao * (1 + state.fretePct / 100);
    const custo = usd * multCusto;

    const gKey = mapCategoryToGroupKey(p.categoria);
    const gm = state.groupMargins[gKey] || DEFAULT_GROUP_MARGINS.potencia_outros;

    // Anabolizantes high-cost calibration when default rec is used
    let recPct = gm.rec;
    if (gKey === 'anabolizante' && gm.rec === 40) {
      if (custo >= 500) recPct = 32;
      else if (custo >= 300) recPct = 38;
    }

    const minPct = gm.min;
    const maxPct = gm.max;

    const precoMin = Math.ceil(custo * (1 + minPct / 100));
    let precoRec = Math.ceil(custo * (1 + recPct / 100));
    const isSpecialFixed = SPECIAL_FIXED_REC[p.id];
    if (isSpecialFixed) {
      precoRec = isSpecialFixed.rec;
    }
    const precoMax = Math.ceil(custo * (1 + maxPct / 100));

    const lucroMin = Math.max(0, precoMin - custo);
    const lucroRec = Math.max(0, precoRec - custo);
    const lucroMax = Math.max(0, precoMax - custo);

    const chosenTier = ov.tier || state.activeTier;
    let precoFinal = precoRec;
    let margemAplicada = recPct;

    if (chosenTier === 'min') {
      precoFinal = precoMin;
      margemAplicada = minPct;
    } else if (chosenTier === 'max') {
      precoFinal = precoMax;
      margemAplicada = maxPct;
    }

    if (ov.customMargin !== undefined && ov.customMargin !== '') {
      margemAplicada = Number(ov.customMargin);
      precoFinal = Math.ceil(custo * (1 + margemAplicada / 100));
    }
    if (ov.customPrice !== undefined && ov.customPrice !== '') {
      precoFinal = Number(ov.customPrice);
      margemAplicada = custo > 0 ? Math.round(((precoFinal - custo) / custo) * 100) : 0;
    }

    if (isSpecialFixed && (!ov.tier || ov.tier === 'rec') && !ov.customPrice && !ov.customMargin) {
      precoFinal = isSpecialFixed.rec;
      margemAplicada = custo > 0 ? Math.round(((precoFinal - custo) / custo) * 100) : 0;
    }
    const lucroFinal = precoFinal - custo;
    const precoCartao = (isSpecialFixed && (!ov.tier || ov.tier === 'rec') && !ov.customPrice)
      ? isSpecialFixed.cartao
      : precoFinal + state.taxaCartaoFixa;

    const cde = Number(p.stock_cde || 0);
    const pj = Number(p.stock_pj || 0);
    const sg = Number(p.stock_sg || 0);
    const stockTotal = cde + pj + sg;

    const desc = ov.desc !== undefined ? ov.desc : (p.desc_comercial || '');
    const localFoto = p.foto ? `fotos/producto-${p.id}.jpg` : '';
    const remoteFoto = p.foto ? `https://shapetotal.com${p.foto}` : '';

    return {
      ...p,
      usd,
      custo,
      minPct,
      recPct,
      maxPct,
      precoMin,
      precoRec,
      precoMax,
      lucroMin,
      lucroRec,
      lucroMax,
      chosenTier,
      precoFinal,
      precoCartao,
      lucroFinal,
      margemAplicada,
      cde,
      pj,
      sg,
      stockTotal,
      desc,
      localFoto,
      remoteFoto,
      hasCustom: Boolean(ov.customPrice || ov.customMargin || ov.usd || ov.tier)
    };
  }

  function formatBRL(v) {
    return 'R$ ' + Number(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatBRLInt(v) {
    return 'R$ ' + Number(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function getFilteredProducts() {
    const q = state.search.trim().toLowerCase();
    let list = rawCatalog.map(computeProduct);

    list = list.filter(p => {
      if (state.mainGroup !== 'todas') {
        const c = (p.categoria || '').toLowerCase();
        const txt = ((p.nombre || '') + ' ' + (p.composicion || '')).toLowerCase();
        if (state.mainGroup === 'anabolizantes' && !(c === 'anabolizante' || c === 'sarms' || c === 'post ciclo' || c === 'hcg')) return false;
        if (state.mainGroup === 'emagrecedores' && !(c === 'emagrecedores' || c === 'queimador')) return false;
        if (state.mainGroup === 'saude_mental' && !(c === 'saude mental' || txt.includes('semax') || txt.includes('selank') || txt.includes('cbl') || txt.includes('dsip'))) return false;
        if (state.mainGroup === 'peptideos' && !(c === 'peptideo' || c === 'hgh' || Boolean(p.desc_comercial))) return false;
        if (state.mainGroup === 'estetico_outros' && (c === 'anabolizante' || c === 'emagrecedores' || c === 'peptideo' || c === 'hgh' || c === 'saude mental')) return false;
      }

      if (state.subCat !== 'todas' && (p.categoria || 'sem_categoria') !== state.subCat) return false;
      if (state.brand !== 'todas' && (p.marca || 'sem_marca') !== state.brand) return false;

      if (state.stockFilter === 'com_estoque' && p.stockTotal <= 0) return false;
      if (state.stockFilter === 'sem_estoque' && p.stockTotal > 0) return false;

      if (state.branchFilter === 'cde' && p.cde <= 0) return false;
      if (state.branchFilter === 'pj' && p.pj <= 0) return false;
      if (state.branchFilter === 'sg' && p.sg <= 0) return false;

      if (q) {
        const hay = `${p.id} shape-${p.id} ${p.nombre || ''} ${p.marca || ''} ${p.composicion || ''} ${p.categoria || ''} ${p.desc || ''}`.toLowerCase();
        const tokens = q.split(/\s+/);
        for (const t of tokens) {
          if (!hay.includes(t)) return false;
        }
      }
      return true;
    });

    list.sort((a, b) => {
      if (state.sortBy === 'estoque_desc') return b.stockTotal - a.stockTotal;
      if (state.sortBy === 'preco_asc') return a.precoFinal - b.precoFinal;
      if (state.sortBy === 'preco_desc') return b.precoFinal - a.precoFinal;
      if (state.sortBy === 'lucro_desc') return b.lucroFinal - a.lucroFinal;
      if (state.sortBy === 'nome_asc') return (a.nombre || '').localeCompare(b.nombre || '');
      return b.stockTotal - a.stockTotal;
    });

    return list;
  }

  function renderMarginDrawer() {
    const container = document.getElementById('marginConfigGrid');
    if (!container) return;
    container.innerHTML = Object.entries(state.groupMargins).map(([key, g]) => `
      <div class="group-margin-card">
        <div class="group-margin-title">
          <span>${g.label}</span>
        </div>
        <div class="margin-inputs">
          <div class="m-field">
            <label>🟢 Mínimo (%)</label>
            <input type="number" step="1" data-gkey="${key}" data-tier="min" value="${g.min}">
          </div>
          <div class="m-field">
            <label>🎯 Recomendado (%)</label>
            <input type="number" step="1" data-gkey="${key}" data-tier="rec" value="${g.rec}">
          </div>
          <div class="m-field">
            <label>🔥 Máximo (%)</label>
            <input type="number" step="1" data-gkey="${key}" data-tier="max" value="${g.max}">
          </div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('input[data-gkey]').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const k = e.target.getAttribute('data-gkey');
        const t = e.target.getAttribute('data-tier');
        state.groupMargins[k][t] = Number(e.target.value) || 0;
        saveState();
        renderAll();
      });
    });
  }

  function populateDropdowns() {
    const subSelect = document.getElementById('subCatSelect');
    const brandSelect = document.getElementById('brandSelect');
    const cats = {};
    const brands = {};
    rawCatalog.forEach(p => {
      const c = p.categoria || 'sem_categoria';
      const b = p.marca || 'sem_marca';
      cats[c] = (cats[c] || 0) + 1;
      brands[b] = (brands[b] || 0) + 1;
    });

    subSelect.innerHTML = `<option value="todas">📂 Subcategoria: Todas (${rawCatalog.length})</option>` +
      Object.entries(cats).sort((a, b) => b[1] - a[1]).map(([c, cnt]) =>
        `<option value="${c}">${c.toUpperCase()} (${cnt})</option>`
      ).join('');

    brandSelect.innerHTML = `<option value="todas">🏷️ Laboratório: Todos (${Object.keys(brands).length})</option>` +
      Object.entries(brands).sort((a, b) => b[1] - a[1]).map(([b, cnt]) =>
        `<option value="${b}">${b.toUpperCase()} (${cnt})</option>`
      ).join('');
  }

  function renderKPIs(filtered) {
    const withStock = filtered.filter(p => p.stockTotal > 0);
    const avgCost = withStock.length ? withStock.reduce((s, p) => s + p.custo, 0) / withStock.length : 0;
    const avgPrice = withStock.length ? withStock.reduce((s, p) => s + p.precoFinal, 0) / withStock.length : 0;
    const avgProfit = withStock.length ? withStock.reduce((s, p) => s + p.lucroFinal, 0) / withStock.length : 0;
    const mult = (state.cotacao * (1 + state.fretePct / 100)).toFixed(2);

    document.getElementById('kpiCount').textContent = `${filtered.length} SKUs`;
    document.getElementById('kpiCountSub').textContent = `${withStock.length} com estoque imediato`;
    document.getElementById('kpiMult').textContent = `R$ ${mult}`;
    document.getElementById('kpiMultSub').textContent = `Dólar R$ ${state.cotacao.toFixed(2)} + ${state.fretePct}% frete`;
    document.getElementById('kpiAvgPrice').textContent = formatBRL(avgPrice);
    document.getElementById('kpiAvgCost').textContent = `Custo médio: ${formatBRL(avgCost)}`;
    document.getElementById('kpiAvgProfit').textContent = formatBRL(avgProfit);
    document.getElementById('kpiAvgProfitSub').textContent = `Faixa ativa: ${state.activeTier === 'min' ? 'Mínimo' : state.activeTier === 'rec' ? 'Recomendado' : 'Máximo'}`;
  }

  function renderProducts(filtered) {
    const container = document.getElementById('productsContainer');
    if (!filtered.length) {
      container.innerHTML = `<div style="padding:40px;text-align:center;color:var(--text-muted);background:var(--bg-card);border-radius:12px;">Nenhum produto encontrado para este filtro.</div>`;
      return;
    }

    if (state.viewMode === 'grid') {
      container.className = 'product-grid';
      container.innerHTML = filtered.map(p => {
        const imgHtml = p.localFoto
          ? `<img src="${p.localFoto}" loading="lazy" alt="${p.nombre}" onerror="if(this.src!=='${p.remoteFoto}'){this.src='${p.remoteFoto}';}else{this.parentElement.innerHTML='<div class=\\'p-placeholder\\'>🧬<br><small>${p.marca || 'SHAPE'}</small></div>';}">`
          : `<div class="p-placeholder"><span style="font-size:28px;">💊</span><small style="margin-top:6px;">${(p.marca || 'SHAPE TOTAL').toUpperCase()}</small></div>`;

        return `
          <div class="p-card ${p.stockTotal <= 0 ? 'no-stock' : ''}" data-id="${p.id}">
            <div class="p-media" onclick="window.CRM.openEditModal(${p.id})">
              ${imgHtml}
              <div class="p-badges">
                <span class="badge badge-cat">${p.categoria || 'geral'}</span>
                <span class="badge ${p.stockTotal > 0 ? 'badge-stock-ok' : 'badge-stock-zero'}">
                  ${p.stockTotal > 0 ? `EST: ${p.stockTotal}` : 'SEM ESTOQUE'}
                </span>
              </div>
            </div>
            <div class="p-body">
              <div class="p-meta">
                <span class="p-sku">SHAPE-${p.id}</span>
                <span class="p-brand">${p.marca || 'S/ MARCA'}</span>
              </div>
              <div class="p-title">${p.nombre}</div>
              ${p.composicion ? `<div class="p-comp">🧪 ${p.composicion}</div>` : ''}
              ${p.desc ? `<div class="p-desc">${p.desc}</div>` : ''}
              <div class="p-stock-branches">
                <span class="branch-pill">CDE: <b>${p.cde}</b></span>
                <span class="branch-pill">PJ: <b>${p.pj}</b></span>
                <span class="branch-pill">SG: <b>${p.sg}</b></span>
                ${p.presentacion ? `<span class="branch-pill">${p.presentacion}</span>` : ''}
              </div>

              <div class="p-cost-bar internal-only">
                <span>Fonte: <b>USD ${p.usd.toFixed(2)}</b></span>
                <span>Custo Total: <b style="color:#f8fafc">${formatBRL(p.custo)}</b></span>
              </div>

              <div class="tiers-box internal-only">
                <div class="tier-pill ${p.chosenTier === 'min' && !p.hasCustom ? 'selected-min' : ''}" onclick="window.CRM.setProductTier(${p.id}, 'min')">
                  <div class="t-name">Mín (${p.minPct}%)</div>
                  <div class="t-price">${formatBRLInt(p.precoMin)}</div>
                  <div class="t-profit">+${formatBRLInt(p.lucroMin)}</div>
                </div>
                <div class="tier-pill ${p.chosenTier === 'rec' && !p.hasCustom ? 'selected-rec' : ''}" onclick="window.CRM.setProductTier(${p.id}, 'rec')">
                  <div class="t-name">Ideal (${p.recPct}%)</div>
                  <div class="t-price">${formatBRLInt(p.precoRec)}</div>
                  <div class="t-profit">+${formatBRLInt(p.lucroRec)}</div>
                </div>
                <div class="tier-pill ${p.chosenTier === 'max' && !p.hasCustom ? 'selected-max' : ''}" onclick="window.CRM.setProductTier(${p.id}, 'max')">
                  <div class="t-name">Máx (${p.maxPct}%)</div>
                  <div class="t-price">${formatBRLInt(p.precoMax)}</div>
                  <div class="t-profit">+${formatBRLInt(p.lucroMax)}</div>
                </div>
              </div>

              <div class="p-price-hero">
                <div>
                  <div class="final-label">Preço Final PIX ${p.hasCustom ? '✏️' : ''}</div>
                  <div class="card-val">Cartão: ${formatBRLInt(p.precoCartao)}</div>
                </div>
                <div style="text-align:right">
                  <div class="final-val">${formatBRLInt(p.precoFinal)}</div>
                  <div class="t-profit internal-only">Lucro Líq: ${formatBRL(p.lucroFinal)} (${p.margemAplicada}%)</div>
                </div>
              </div>

              <div class="p-actions">
                <button class="btn btn-primary" onclick="window.CRM.addToCart(${p.id})">➕ Orçamento</button>
                <button class="btn" onclick="window.CRM.copySingleWhatsApp(${p.id})">📲 Copiar Linha</button>
                <button class="btn internal-only" title="Editar preço/descrição" onclick="window.CRM.openEditModal(${p.id})">✏️</button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    } else {
      container.className = 'table-wrap';
      container.innerHTML = `
        <table class="crm-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>SKU</th>
              <th>Produto / Composição</th>
              <th>Marca / Cat</th>
              <th>Estoque</th>
              <th class="internal-only">USD</th>
              <th class="internal-only">Custo R$</th>
              <th class="internal-only">Mínimo</th>
              <th class="internal-only">Recomendado</th>
              <th class="internal-only">Máximo</th>
              <th>Venda PIX</th>
              <th class="internal-only">Lucro R$</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(p => `
              <tr>
                <td>
                  ${p.localFoto ? `<img class="tbl-thumb" src="${p.localFoto}" onerror="this.src='${p.remoteFoto}'" onclick="window.CRM.openEditModal(${p.id})">` : '💊'}
                </td>
                <td class="p-sku">SHAPE-${p.id}</td>
                <td>
                  <div style="font-weight:700;color:#fff">${p.nombre}</div>
                  <div style="font-size:11px;color:#38bdf8">${p.composicion || ''}</div>
                  ${p.desc ? `<div style="font-size:11px;color:var(--text-muted)">${p.desc}</div>` : ''}
                </td>
                <td>
                  <div style="font-weight:700;text-transform:uppercase">${p.marca || '-'}</div>
                  <div style="font-size:11px;color:var(--text-muted)">${p.categoria || '-'}</div>
                </td>
                <td>
                  <b style="color:${p.stockTotal > 0 ? '#34d399' : '#f87171'}">${p.stockTotal}</b>
                  <div style="font-size:10px;color:var(--text-muted)">${p.cde}/${p.pj}/${p.sg}</div>
                </td>
                <td class="internal-only">$${p.usd.toFixed(2)}</td>
                <td class="internal-only">${formatBRL(p.custo)}</td>
                <td class="internal-only">
                  <b>${formatBRLInt(p.precoMin)}</b>
                  <div style="font-size:10px;color:#34d399">+${formatBRLInt(p.lucroMin)} (${p.minPct}%)</div>
                </td>
                <td class="internal-only" style="background:rgba(16,185,129,0.08)">
                  <b style="color:#10b981">${formatBRLInt(p.precoRec)}</b>
                  <div style="font-size:10px;color:#34d399">+${formatBRLInt(p.lucroRec)} (${p.recPct}%)</div>
                </td>
                <td class="internal-only">
                  <b>${formatBRLInt(p.precoMax)}</b>
                  <div style="font-size:10px;color:#34d399">+${formatBRLInt(p.lucroMax)} (${p.maxPct}%)</div>
                </td>
                <td><b style="font-size:14px;color:var(--accent)">${formatBRLInt(p.precoFinal)}</b></td>
                <td class="internal-only" style="color:#34d399;font-weight:700">${formatBRL(p.lucroFinal)} (${p.margemAplicada}%)</td>
                <td>
                  <div style="display:flex;gap:4px">
                    <button class="btn btn-primary" onclick="window.CRM.addToCart(${p.id})">➕</button>
                    <button class="btn" onclick="window.CRM.copySingleWhatsApp(${p.id})">📲</button>
                    <button class="btn internal-only" onclick="window.CRM.openEditModal(${p.id})">✏️</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }
  }

  function renderCartBar() {
    const bar = document.getElementById('cartFloatingBar');
    const entries = Object.entries(state.cart).filter(([, q]) => q > 0);
    if (!entries.length) {
      bar.classList.remove('has-items');
      return;
    }
    let totalItems = 0;
    let totalVenda = 0;
    let totalLucro = 0;
    entries.forEach(([id, qty]) => {
      const raw = rawCatalog.find(x => String(x.id) === String(id));
      if (raw) {
        const cp = computeProduct(raw);
        totalItems += qty;
        totalVenda += cp.precoFinal * qty;
        totalLucro += cp.lucroFinal * qty;
      }
    });
    bar.classList.add('has-items');
    bar.innerHTML = `🛒 Orçamento: ${totalItems} iten(s) | Total PIX: ${formatBRLInt(totalVenda)} <span class="internal-only" style="font-size:11px;background:rgba(0,0,0,0.25);padding:3px 8px;border-radius:99px;">Lucro: ${formatBRL(totalLucro)}</span>`;
  }

  function renderAll() {
    const filtered = getFilteredProducts();
    renderKPIs(filtered);
    renderProducts(filtered);
    renderCartBar();
  }

  // Public actions
  window.CRM = {

    checkPassword() {
      const input = document.getElementById('authInput');
      const err = document.getElementById('authError');
      const val = (input.value || '').trim();
      const customPass = localStorage.getItem('ST_CUSTOM_PASS');
      const validPasses = ['shape2026', '1020', 'italo2026'];
      if (customPass) validPasses.push(customPass);

      if (validPasses.includes(val)) {
        localStorage.setItem('ST_AUTH', 'true');
        sessionStorage.setItem('ST_AUTH', 'true');
        document.getElementById('authOverlay').style.display = 'none';
        err.style.display = 'none';
        input.value = '';
        showToast('Acesso liberado com sucesso!');
      } else {
        err.style.display = 'block';
        input.select();
      }
    },

    lockApp() {
      localStorage.removeItem('ST_AUTH');
      sessionStorage.removeItem('ST_AUTH');
      const overlay = document.getElementById('authOverlay');
      if (overlay) {
        overlay.style.display = 'flex';
        const inp = document.getElementById('authInput');
        if (inp) { inp.value = ''; inp.focus(); }
      }
      showToast('Catálogo bloqueado!');
    },

    setProductTier(id, tier) {
      if (!state.overrides[id]) state.overrides[id] = {};
      state.overrides[id].tier = tier;
      delete state.overrides[id].customPrice;
      delete state.overrides[id].customMargin;
      saveState();
      renderAll();
    },

    copySingleWhatsApp(id) {
      const raw = rawCatalog.find(x => x.id === id);
      if (!raw) return;
      const p = computeProduct(raw);
      const line = p.desc
        ? `• *${p.nombre}*: ${p.desc} ➔ *${formatBRLInt(p.precoFinal)}*`
        : `• *${p.nombre}* (${(p.marca || '').toUpperCase()})${p.composicion ? ' - ' + p.composicion : ''} ➔ *${formatBRLInt(p.precoFinal)}*`;
      navigator.clipboard.writeText(line);
      showToast('Linha copiada para o WhatsApp!');
    },

    addToCart(id) {
      state.cart[id] = (state.cart[id] || 0) + 1;
      renderCartBar();
      showToast('Adicionado ao orçamento!');
    },

    openEditModal(id) {
      const raw = rawCatalog.find(x => x.id === id);
      if (!raw) return;
      const p = computeProduct(raw);
      const ov = state.overrides[id] || {};
      const modal = document.getElementById('editProductModal');
      document.getElementById('editModalTitle').textContent = `SHAPE-${p.id} · ${p.nombre}`;
      document.getElementById('editProdId').value = p.id;
      document.getElementById('editProdUsd').value = p.usd;
      document.getElementById('editProdMargin').value = ov.customMargin !== undefined ? ov.customMargin : '';
      document.getElementById('editProdPrice').value = ov.customPrice !== undefined ? ov.customPrice : '';
      document.getElementById('editProdDesc').value = p.desc || '';
      document.getElementById('editModalSummary').innerHTML = `
        Custo calculado: <b>${formatBRL(p.custo)}</b> |
        Mín (${p.minPct}%): <b>${formatBRLInt(p.precoMin)}</b> |
        Ideal (${p.recPct}%): <b>${formatBRLInt(p.precoRec)}</b> |
        Máx (${p.maxPct}%): <b>${formatBRLInt(p.precoMax)}</b>
      `;
      modal.classList.add('open');
    },

    saveProductModal() {
      const id = Number(document.getElementById('editProdId').value);
      if (!state.overrides[id]) state.overrides[id] = {};
      const usdVal = document.getElementById('editProdUsd').value;
      const mVal = document.getElementById('editProdMargin').value;
      const pVal = document.getElementById('editProdPrice').value;
      const dVal = document.getElementById('editProdDesc').value;

      state.overrides[id].usd = usdVal !== '' ? Number(usdVal) : undefined;
      state.overrides[id].customMargin = mVal !== '' ? Number(mVal) : '';
      state.overrides[id].customPrice = pVal !== '' ? Number(pVal) : '';
      state.overrides[id].desc = dVal;

      saveState();
      document.getElementById('editProductModal').classList.remove('open');
      renderAll();
      showToast('Produto atualizado!');
    },

    resetProductOverride() {
      const id = Number(document.getElementById('editProdId').value);
      delete state.overrides[id];
      saveState();
      document.getElementById('editProductModal').classList.remove('open');
      renderAll();
      showToast('Restaurado para a regra do grupo!');
    },

    openWhatsAppCatalogModal(mode) {
      const modal = document.getElementById('waCatalogModal');
      const textarea = document.getElementById('waCatalogText');
      if (mode === 'tabela_especial') {
        textarea.value = `📋 TABELA DE PREÇOS

📦 Linha 60 mg — duração de até 6 meses
•  TG 60 mg
•  Tirzec (4 vias)
•  Lipoless (4 vias)
•  Lipoland (4 vias)
•  Lipoless MD (multidose)
•  Tirzec MD (multidose)
•  T36 MD (multidose)
•  Gluconex (4 vias)
💠 Pix: R$ 900,00
💳 Cartão: R$ 1.000,00 em até 6x sem juros

🧬 Retatrutida 60 mg
💠 Pix: R$ 1.000,00
💳 Cartão: R$ 1.100,00 em até 6x sem juros

💉 Ampolas avulsas de 15 mg
•  Tirzepatida • Lipoless • TG • Tirzec • Lipoland
💠 Pix: R$ 250,00 cada
💳 Cartão: R$ 300,00 cada em até 6x sem juros`;
      } else if (mode === 'grok') {
        textarea.value = generateGrokGuideWhatsApp();
      } else {
        const filtered = getFilteredProducts();
        const lines = [
          `*CATÁLOGO ATUALIZADO — ${state.mainGroup.toUpperCase()} (${filtered.length} produtos)*`,
          `_Valores à vista no PIX_`,
          ``
        ];
        filtered.forEach(p => {
          if (p.desc) {
            lines.push(`•  *${p.nombre}*: ${p.desc} ➔ *${formatBRLInt(p.precoFinal)}*`);
          } else {
            lines.push(`•  *${p.nombre}* (${(p.marca || '').toUpperCase()})${p.composicion ? ' — ' + p.composicion : ''} ➔ *${formatBRLInt(p.precoFinal)}*`);
          }
        });
        textarea.value = lines.join('\n');
      }
      modal.classList.add('open');
    },

    openCartModal() {
      const modal = document.getElementById('waCatalogModal');
      const textarea = document.getElementById('waCatalogText');
      const entries = Object.entries(state.cart).filter(([, q]) => q > 0);
      let totalPix = 0;
      let totalCusto = 0;
      const lines = [`*ORÇAMENTO SHAPE TOTAL*`, ``];
      entries.forEach(([id, qty]) => {
        const raw = rawCatalog.find(x => String(x.id) === String(id));
        if (raw) {
          const p = computeProduct(raw);
          const sub = p.precoFinal * qty;
          totalPix += sub;
          totalCusto += p.custo * qty;
          lines.push(`• ${qty}x *${p.nombre}* ➔ *${formatBRLInt(sub)}* (${formatBRLInt(p.precoFinal)} un)`);
        }
      });
      lines.push(``);
      lines.push(`💰 *Total à vista (PIX): ${formatBRLInt(totalPix)}*`);
      lines.push(`💳 *Total no Cartão: ${formatBRLInt(totalPix + state.taxaCartaoFixa)}*`);
      textarea.value = lines.join('\n');
      modal.classList.add('open');
    },

    clearCart() {
      state.cart = {};
      renderCartBar();
      document.getElementById('waCatalogModal').classList.remove('open');
      showToast('Orçamento limpo!');
    },

    exportCSV() {
      const filtered = getFilteredProducts();
      const header = ['SKU', 'Nome', 'Marca', 'Categoria', 'Composicao', 'Estoque_Total', 'CDE', 'PJ', 'SG', 'USD', 'Custo_BRL', 'Min_BRL', 'Recomendado_BRL', 'Maximo_BRL', 'Venda_Final_BRL', 'Lucro_BRL', 'Margem_Pct'];
      const rows = filtered.map(p => [
        `SHAPE-${p.id}`,
        `"${(p.nombre || '').replace(/"/g, '""')}"`,
        `"${(p.marca || '').replace(/"/g, '""')}"`,
        `"${(p.categoria || '').replace(/"/g, '""')}"`,
        `"${(p.composicion || '').replace(/"/g, '""')}"`,
        p.stockTotal, p.cde, p.pj, p.sg,
        p.usd.toFixed(2),
        p.custo.toFixed(2),
        p.precoMin,
        p.precoRec,
        p.precoMax,
        p.precoFinal,
        p.lucroFinal.toFixed(2),
        `${p.margemAplicada}%`
      ].join(';'));
      const csv = '\uFEFF' + [header.join(';'), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `catalogo_shapetotal_${state.mainGroup}_cot${state.cotacao}.csv`;
      a.click();
    }
  };

  function generateGrokGuideWhatsApp() {
    function bestPriceById(id, fallbackUsd) {
      const raw = rawCatalog.find(x => x.id === id);
      const p = raw ? computeProduct(raw) : computeProduct({ id: 0, precio: fallbackUsd, categoria: 'peptideo' });
      return formatBRLInt(p.precoFinal);
    }

    return [
      `🧬 *GUIA COMPLETO: PEPTÍDEOS & BLENDS — O QUE CADA UM FAZ?*`,
      ``,
      `Fala, pessoal! Segue o resumo prático e direto ao ponto de cada peptídeo e blend para você escolher o protocolo certo para o seu objetivo:`,
      ``,
      `🔥 *1. QUEIMA DE GORDURA, DEFINIÇÃO & METABOLISMO*`,
      `•  *HGH Frag 176-191*: Focado em queimar gordura teimosa e localizada sem mexer na glicose e sem reter líquido. ➔ *${bestPriceById(3059, 35)}* (5mg)`,
      `•  *AOD-9604*: Versão aprimorada do fragmento de GH que quebra a gordura estocada e impede a formação de novas células de gordura. ➔ *${bestPriceById(3060, 40)}* (5mg)`,
      `•  *MOTS-c*: Peptídeo mitocondrial que transforma carboidratos em energia pura, melhora a sensibilidade à insulina e aumenta o fôlego nos treinos. ➔ *${bestPriceById(3117, 26)}* (10mg)`,
      `•  *SLU-PP-332*: Conhecido como "cardio em pó/cápsula", replica no músculo os efeitos metabólicos do exercício aeróbico intenso mesmo em repouso. ➔ *${bestPriceById(3185, 35)}* (60 caps)`,
      `•  *Adipotide*: Corta o fluxo de sangue que alimenta as células de gordura branca, acelerando a perda de gordura profunda. ➔ *${bestPriceById(3283, 150)}* (Kit 27.5mg ZPHC)`,
      `•  *AICAR*: Estimula a enzima metabólica AMPK, forçando o organismo a queimar gordura como fonte primária de energia. ➔ *${bestPriceById(2331, 19)}* (60 caps)`,
      ``,
      `💪 *2. ESTÍMULO DE GH & GANHO DE MASSA*`,
      `•  *Ipamorelin*: Libera pulsos limpos de GH; melhora o sono profundo, a densidade muscular e o tônus sem dar fome descontrolada. ➔ *${bestPriceById(3139, 50)}* (10mg)`,
      `•  *CJC-1295*: Potencializa e prolonga a secreção natural de GH, gerando sinergia máxima para queima e recuperação. ➔ *${bestPriceById(3029, 38)}* (5mg)`,
      `•  *Tesamorelin*: O mais potente estimulador de GH para secar gordura visceral profunda do abdômen e reduzir gordura no fígado. ➔ *${bestPriceById(3123, 31)}* (5mg)`,
      `•  *GHRP-2*: Estimulador potente de GH que favorece ganho de força, volume muscular e recuperação tecidual rápida. ➔ *${bestPriceById(3176, 70)}* (Kit 25mg ZPHC)`,
      `•  *GHRP-6*: Estimulador de GH que desperta apetite intenso, sendo a escolha clássica para ganho de peso e bulking. ➔ *${bestPriceById(389, 13)}* (1 ampola)`,
      `•  *IGF-1 LR3*: Fator de crescimento anabólico de longa duração que atua na criação de novas fibras musculares e transporte de nutrientes. ➔ *${bestPriceById(393, 13)}* (1 ampola)`,
      ``,
      `🛠️ *3. RECUPERAÇÃO DE LESÕES, INFLAMAÇÃO & IMUNIDADE*`,
      `•  *BPC-157*: Regenerador tecidual de elite; cura tendões, ligamentos, articulações e protege o estômago e o intestino contra úlceras e refluxos. ➔ *${bestPriceById(385, 15)}* (1 ampola)`,
      `•  *TB-500*: Age no corpo todo reparando rupturas de fibras musculares, reduzindo inflamações crônicas e devolvendo flexibilidade. ➔ *${bestPriceById(399, 20)}* (1 ampola)`,
      `•  *KPV*: Poderoso anti-inflamatório natural que desinflama o intestino (SII, colites) e acalma a pele contra acne severa e dermatites. ➔ *${bestPriceById(3034, 38)}* (10mg)`,
      `•  *LL-37*: Peptídeo antimicrobiano que elimina bactérias e vírus resistentes, blindando o sistema imunológico contra infecções frequentes. ➔ *${bestPriceById(3119, 45)}* (5mg)`,
      ``,
      `✨ *4. ESTÉTICA, PELE, CABELO & BRONZEAMENTO*`,
      `•  *GHK-Cu*: Peptídeo de cobre que estimula colágeno e elastina, devolvendo firmeza à pele, suavizando linhas e fechando poros. ➔ *${bestPriceById(3120, 30)}* (100mg)`,
      `•  *AHK-Cu*: Variante de cobre desenhada para a raiz capilar; combate a queda, acelera o nascimento e encorpa os fios. ➔ *${bestPriceById(3224, 60)}* (100mg)`,
      `•  *Melanotan-2*: Estimula a produção homogênea de melanina, proporcionando bronzeamento duradouro com mínima exposição ao sol. ➔ *${bestPriceById(3127, 22)}* (10mg)`,
      ``,
      `⚡ *5. ENERGIA CELULAR, MITOCÔNDRIAS & LONGEVIDADE*`,
      `•  *NAD+*: Combustível celular que restaura a energia física, combate o cansaço crônico, limpa a mente e repara o DNA. ➔ *${bestPriceById(3115, 38)}* (500mg)`,
      `•  *SS-31*: Regenera mitocôndrias desgastadas, aumentando a resistência física e blindando coração e rins contra sobrecarga. ➔ *${bestPriceById(3031, 32)}* (10mg)`,
      `•  *Epithalon*: O peptídeo da longevidade; atua nos telômeros celulares, retarda o envelhecimento biológico e regula o sono. ➔ *${bestPriceById(3124, 24)}* (10mg)`,
      `•  *L-Glutathione*: O antioxidante mestre do corpo; faz desintoxicação hepática profunda e uniformiza o tom da pele. ➔ *${bestPriceById(3281, 70)}* (Kit 3000mg ZPHC)`,
      ``,
      `🧠 *6. CÉREBRO, FOCO, ANSIEDADE & SONO*`,
      `•  *Semax*: Nootrópico avançado que eleva a clareza mental, a retenção de memória e o foco prolongado sem causar taquicardia. ➔ *${bestPriceById(3344, 45)}* (Spray Nasal)`,
      `•  *Selank*: Ação ansiolítica que alivia o estresse e a agitação mental sem dar sono, lentidão ou qualquer risco de dependência. ➔ *${bestPriceById(3033, 28)}* (5mg)`,
      `•  *CBL (Cerebrolysin)*: Complexo neuroprotetor que recupera conexões cerebrais e protege os neurônios contra desgaste e estresse crônico. ➔ *${bestPriceById(3266, 55)}* (20mg)`,
      `•  *DSIP*: Peptídeo indutor do sono que garante a fase mais profunda e reparadora do descanso noturno. ➔ *${bestPriceById(3264, 60)}* (5mg)`,
      ``,
      `🌶️ *7. LIBIDO & PERFORMANCE SEXUAL*`,
      `•  *PT-141*: Atua diretamente no sistema nervoso central estimulando o desejo sexual e a ereção em homens e mulheres. ➔ *${bestPriceById(3032, 38)}* (10mg)`,
      ``,
      `🧬 *8. BLENDS COMBINADOS (Mais praticidade e sinergia na mesma aplicação)*`,
      `•  *Glow Blend (GHK-Cu + BPC-157 + TB-500)*: O blend estético definitivo; combina firmeza da pele, síntese de colágeno e regeneração profunda. ➔ *${bestPriceById(3395, 40)}* (70mg)`,
      `•  *Klow Blend (GHK-Cu + BPC-157 + TB-500 + KPV)*: Fórmula do Glow potencializada com KPV para quem tem pele muito reativa, acne inflamatória ou rosácea. ➔ *${bestPriceById(3278, 53)}* (80mg)`,
      `•  *CJC-1295 + Ipamorelin*: A combinação mais consagrada de secretagogos; estimula GH natural, melhora o sono e tonifica o músculo sem retenção. ➔ *${bestPriceById(3230, 60)}* (10mg)`,
      `•  *Double Burn Mix (AOD-9604 + HGH Frag 176-191)*: Sinergia lipolítica dupla que acelera a quebra da gordura estocada e bloqueia o acúmulo de nova gordura. ➔ *${bestPriceById(3285, 130)}* (Kit 25mg ZPHC)`,
      `•  *Super Slim Mix (AOD-9604 + HGH Frag 176-191 + Adipotide)*: O blend mais agressivo do catálogo para queima acelerada e destruição de células adiposas. ➔ *${bestPriceById(3283, 150)}* (Kit 27.5mg ZPHC)`,
      `•  *Ultra Rehab Mix (BPC-157 + TB-500 em alta dose)*: Fórmula potente focada em acelerar a cura de lesões articulares, estiramentos e tendinites crônicas. ➔ *${bestPriceById(3061, 90)}* (20mg ZPHC)`,
      `•  *Mega Mass Mix (CJC-1295 + GHRP-6)*: União de estímulo contínuo de GH com aumento do apetite pela grelina para quem busca ganho de volume bruto. ➔ *${bestPriceById(3294, 115)}* (Kit 50mg ZPHC)`
    ].join('\n');
  }

  function showToast(msg) {
    const t = document.getElementById('toastBox');
    t.textContent = msg;
    t.style.opacity = '1';
    setTimeout(() => { t.style.opacity = '0'; }, 2200);
  }

  function initEvents() {
    const cotInput = document.getElementById('inputCotacao');
    const freteInput = document.getElementById('inputFrete');
    const cartaoInput = document.getElementById('inputTaxaCartao');

    cotInput.value = state.cotacao;
    freteInput.value = state.fretePct;
    cartaoInput.value = state.taxaCartaoFixa;

    cotInput.addEventListener('input', e => {
      state.cotacao = Number(e.target.value) || 0;
      saveState();
      renderAll();
    });
    freteInput.addEventListener('input', e => {
      state.fretePct = Number(e.target.value) || 0;
      saveState();
      renderAll();
    });
    cartaoInput.addEventListener('input', e => {
      state.taxaCartaoFixa = Number(e.target.value) || 0;
      saveState();
      renderAll();
    });

    document.querySelectorAll('.tier-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeTier = btn.getAttribute('data-tier');
        document.querySelectorAll('.tier-btn').forEach(b => b.className = 'tier-btn');
        btn.classList.add(`active-${state.activeTier}`);
        saveState();
        renderAll();
      });
    });

    document.querySelectorAll('.group-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.group-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.mainGroup = tab.getAttribute('data-group');
        state.subCat = 'todas';
        document.getElementById('subCatSelect').value = 'todas';
        renderAll();
      });
    });

    document.getElementById('searchInput').addEventListener('input', e => {
      state.search = e.target.value;
      renderAll();
    });

    document.getElementById('subCatSelect').addEventListener('change', e => {
      state.subCat = e.target.value;
      renderAll();
    });

    document.getElementById('brandSelect').addEventListener('change', e => {
      state.brand = e.target.value;
      renderAll();
    });

    document.getElementById('stockSelect').addEventListener('change', e => {
      state.stockFilter = e.target.value;
      renderAll();
    });

    document.getElementById('branchSelect').addEventListener('change', e => {
      state.branchFilter = e.target.value;
      renderAll();
    });

    document.getElementById('sortSelect').addEventListener('change', e => {
      state.sortBy = e.target.value;
      renderAll();
    });

    document.getElementById('btnToggleMargins').addEventListener('click', () => {
      document.getElementById('marginDrawer').classList.toggle('open');
    });

    document.getElementById('btnViewMode').addEventListener('click', (e) => {
      state.viewMode = state.viewMode === 'grid' ? 'table' : 'grid';
      e.currentTarget.textContent = state.viewMode === 'grid' ? '📊 Ver Planilha' : '🛍️ Ver Loja';
      renderAll();
    });

    document.getElementById('btnClientMode').addEventListener('click', (e) => {
      state.clientMode = !state.clientMode;
      document.body.classList.toggle('client-mode', state.clientMode);
      e.currentTarget.textContent = state.clientMode ? '🔓 Modo Admin' : '👁️ Modo Cliente';
    });

    document.getElementById('btnCopyWaModal').addEventListener('click', () => {
      const txt = document.getElementById('waCatalogText').value;
      navigator.clipboard.writeText(txt);
      showToast('Texto completo copiado para o WhatsApp!');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadState();
    populateDropdowns();
    renderMarginDrawer();
    initEvents();
    renderAll();

    // Check initial authentication
    const isAuthed = localStorage.getItem('ST_AUTH') === 'true' || sessionStorage.getItem('ST_AUTH') === 'true';
    const overlay = document.getElementById('authOverlay');
    if (overlay) {
      overlay.style.display = isAuthed ? 'none' : 'flex';
    }

  });
})();
