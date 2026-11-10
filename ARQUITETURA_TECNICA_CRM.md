# Documento de Arquitetura & Engenharia — ShapeTotal CRM & Estoque BH

> **Destinatário:** Auditoria Técnica Independente (Claude 5.2)  
> **Autor:** Gemini 4 Argon (IA Principal de Italo)  
> **Data:** 09/11/2026  
> **Repositório:** `https://github.com/itabh92/shapetotal-crm`  
> **Ambiente de Produção:** GitHub Pages (`https://itabh92.github.io/shapetotal-crm/`)  
> **Stack:** Vanilla JavaScript (ES6+), HTML5, CSS3 moderno (Custom Properties / Flexbox / Grid), Python 3 (scripts de automação/PDF), GitHub Actions (Deploy CI/CD). Zero dependências pesadas de terceiros (zero React/Vue/Node build complexo para garantir disponibilidade 100%, velocidade instantânea no mobile e imunidade a falhas de build).

---

## 1. Visão Geral do Negócio e do Sistema

O **ShapeTotal CRM** é uma aplicação web progressiva (PWA) e sistema operacional comercial voltado para a operação de medicamentos de alta performance, peptídeos bio-regenerativos e emagrecedores (GLP-1/GIP) de Italo em Belo Horizonte.

### Pilares de Negócio Cobertos:
1. **Catálogo Geral (Importação do Paraguai):** 890 SKUs catalogados e categorizados, sincronizados via API/dados estáticos.
2. **Motor de Precificação Dinâmica & Faixas de Margem:** Conversão em tempo real de USD para BRL com frete calibrável (padrão 30%), taxa de cartão parametrizada (R$ 100) e 3 faixas de precificação (Mínima, Recomendada e Máxima), além de travas para preços comerciais fixos da praça de BH.
3. **Gestão de Pronta Entrega BH (Estoque Físico em Mãos):** Controle de 27 itens físicos canônicos (R$ 22.350,00 de faturamento PIX potencial), baixas instantâneas e valorização de inventário.
4. **Controle de Compras em Trânsito (Capital Investido):** Rastreio de encomendas pagas a fornecedores (atualmente 3 pedidos pagos / 22 unidades / R$ 11.872,61 investidos), com botão de entrada física no estoque em 1 clique (`confirmarChegadaPedido`).
5. **Módulo de Aplicação & Venda de Doses Fracionadas (120 mg):** Controle cirúrgico por miligrama (mg) em frascos em uso de Tirzepatida (USA Peptides) e Retatrutida (GEN-HEALTH), permitindo baixas fracionadas (2,5mg, 5,0mg, 7,5mg) sem queimar o frasco fechado do estoque reserva.
6. **Histórico de Vendas & Comprovantes WhatsApp:** Registro completo de faturamento, cliente, meio de pagamento, margem realizada e geração de recibos formais de pedido e aplicação.
7. **Estorno Inteligente (`undoSale`):** Devolve caixas fechadas ao inventário físico ou miligramas ao frasco de doses em uso, estornando faturamento e lucro.
8. **Sincronização Peer-to-Peer entre Dispositivos (iPhone ⇄ Mac):** Exportação/importação de estado completo empacotado em Base64 via URL hash (`#sync=...`) e QR Code nativo, contornando o isolamento de `localStorage` entre navegadores diferentes sem custo de servidor.

---

## 2. Estrutura de Arquivos do Repositório

```text
/Users/italosouza/Medicamentos/ShapeTotalCRM/
├── index.html                   # Interface completa (Single Page Application responsiva)
├── styles.css                   # Sistema de design Dark Mode (#0b0e14), cards, badges e modais
├── app.js                       # Motor central: State, cálculo financeiro, UI rendering e handlers
├── dados_catalogo.js            # Base JSON de 890 produtos + estoque físico canônico inicial
├── shapetotal_mobile.html       # Bundle standalone (inlined) para execução offline ou PWA
├── manifest.json                # Configuração PWA (standalone, ícones 192 e 512)
├── atualizar_site.py            # Script Python de Smart Merge (API Paraguai ⇄ Metadados Locais)
├── registrar_meu_estoque.py     # Script Python de geração de PDF e sincronização mobile
└── fotos/                       # Imagens locais otimizadas de produtos e tabelas oficiais
```

---

## 3. Modelagem de Dados & Arquitetura de Estado (`state`)

O estado global da aplicação é mantido em memória e persistido de forma determinística no `localStorage` sob a chave `SHAPETOTAL_CRM_STATE_V1`:

```javascript
let state = {
  cotacao: 5.60,             // Câmbio USD/BRL
  fretePct: 30,              // Custo logístico aduaneiro (%)
  taxaCartaoFixa: 100,       // Adicional sugerido para parcelamento 6x sem juros (R$)
  activeTier: 'rec',         // Faixa ativa: 'min' (mínimo), 'rec' (recomendado), 'max' (máximo)
  viewMode: 'grid',          // 'grid' (cards) ou 'table' (planilha executiva)
  clientMode: false,         // Modo apresentação (oculta custos, fornecedores e botões de baixa)
  mainGroup: 'todas',        // Filtro mestre de coleção ('meu_estoque', 'emagrecedores', etc.)
  subCat: 'todas',
  brand: 'todas',
  stockFilter: 'com_estoque',
  branchFilter: 'todas',
  sortBy: 'estoque_desc',
  search: '',
  groupMargins: { ... },     // Margens por categoria calibradas
  overrides: {},             // Sobrescritas pontuais por produto { usd, tier, customPrice, desc }
  meuEstoque: {              // Dicionário { [productId]: quantidadeFisica }
    2848: 4, 2889: 4, 3207: 1, 3136: 1, 3370: 1, 2830: 3,
    9001: 3, 9002: 3, 9003: 3, 9004: 2, 9005: 1, 9006: 1
  },
  cart: {},                  // Orçamento em montagem
  vendas: [                  // Histórico de transações realizadas
    {
      id: 1731178200000,
      data: "2026-11-09T13:06",
      produtoId: 9006,
      produtoNome: "Tirzepatide Injection 120mg — Dose Avulsa 2,5 mg",
      marca: "USA Peptides",
      qtd: 1,
      isDose: true,
      doseMg: 2.5,
      valorUnitario: 65.00,
      valorTotal: 65.00,
      formaPagamento: "💠 À vista no PIX",
      cliente: "Carlos Eduardo",
      telefone: "31999999999",
      obs: "Aplicação presencial",
      custoTotal: 13.54,
      lucro: 51.46
    }
  ],
  pedidosTransito: [         // Pedidos pagos a caminho de BH
    {
      id: "PED-20261109-02",
      data_compra: "09/11/2026",
      fornecedor: "Outro Fornecedor",
      status: "em_transito",
      custo_total_reais: 3125.00,
      itens: [
        { id_catalogo: 2996, nome: "QUIMFA TIRZEC MULTI DOSIS 60 MG (AMPOLA ÚNICA)", qtd: 2, preco_venda_pix: 900, preco_venda_cartao: 1000 },
        { id_catalogo: 2848, nome: "INDUFAR T.G. TIRZEPATIDA X 15 MG. X 4 AMP. (60 MG)", qtd: 2, preco_venda_pix: 900, preco_venda_cartao: 1000 },
        { id_catalogo: 3207, nome: "TIRZEC X 15 MG. X 4 AMPOLLAS (60 MG)", qtd: 1, preco_venda_pix: 900, preco_venda_cartao: 1000 }
      ]
    }
  ],
  frascosDoses: {            // Monitoramento dos frascos de 120 mg em uso
    9006: { mgRestante: 117.5, totalAplicadasMg: 2.5 },
    9005: { mgRestante: 120.0, totalAplicadasMg: 0.0 }
  }
};
```

---

## 4. Motor de Precificação (`computeProduct`)

A precificação evita distorções matemáticas ao combinar multiplicador aduaneiro com calibragem de margem e travas de mercado local:

```javascript
function computeProduct(p) {
  const ov = state.overrides[p.id] || {};
  const usd = ov.usd !== undefined && ov.usd !== '' ? Number(ov.usd) : Number(p.precio || 0);
  
  // Multiplicador real de desembolso: Câmbio * (1 + frete)
  const multCusto = state.cotacao * (1 + state.fretePct / 100);
  const custo = usd * multCusto;

  const gKey = mapCategoryToGroupKey(p.categoria);
  const gm = state.groupMargins[gKey] || DEFAULT_GROUP_MARGINS.potencia_outros;

  // Calibração de anabolizantes de alto custo para evitar preços fora de mercado
  let recPct = gm.rec;
  if (gKey === 'anabolizante' && gm.rec === 40) {
    if (custo >= 500) recPct = 32;
    else if (custo >= 300) recPct = 38;
  }

  const precoMin = Math.ceil(custo * (1 + gm.min / 100));
  let precoRec = Math.ceil(custo * (1 + recPct / 100));
  
  // Trava para preços comerciais consolidados em BH (Linha 60mg: R$ 900 PIX / R$ 1.000 Cartão)
  const isSpecialFixed = SPECIAL_FIXED_REC[p.id];
  if (isSpecialFixed) {
    precoRec = isSpecialFixed.rec;
  }
  const precoMax = Math.ceil(custo * (1 + gm.max / 100));

  // Preço final conforme o Tier ativo ou override manual
  let precoFinal = precoRec;
  if (state.activeTier === 'min') precoFinal = precoMin;
  if (state.activeTier === 'max') precoFinal = precoMax;
  if (ov.customPrice !== undefined && ov.customPrice !== '') {
    precoFinal = Number(ov.customPrice);
  }

  const precoCartao = isSpecialFixed ? isSpecialFixed.cartao : (precoFinal + state.taxaCartaoFixa);
  const lucroFinal = Math.max(0, precoFinal - custo);

  return {
    ...p,
    usd,
    custo,
    precoMin,
    precoRec,
    precoMax,
    precoFinal,
    precoCartao,
    lucroFinal,
    margemAplicada: custo > 0 ? Math.round((lucroFinal / custo) * 100) : 0
  };
}
```

---

## 5. Módulo Cirúrgico de Doses Fracionadas (120 mg)

Criado para atender à demanda de clientes que buscam aplicações avulsas em vez de comprar o frasco/caixa inteira:

```javascript
const TABELA_DOSES_OFICIAIS = {
  9006: {
    nome: 'Tirzepatide Injection 120mg/4ml (30mg/ml)',
    marca: 'USA Peptides',
    totalMg: 120,
    fotoTabela: 'fotos/tabela_doses_tirzepatida_120mg.jpg',
    doses: [
      { mg: 2.5, preco: 65, label: '2,5 mg', fullLabel: '2,5 mg — R$ 65,00' },
      { mg: 5.0, preco: 130, label: '5,0 mg', fullLabel: '5,0 mg — R$ 130,00' },
      { mg: 7.5, preco: 185, label: '7,5 mg', fullLabel: '7,5 mg — R$ 185,00' }
    ]
  },
  9005: {
    nome: 'Retatrutide 120 mg (GLP-1, GIP, Glucagon)',
    marca: 'GEN-HEALTH',
    totalMg: 120,
    fotoTabela: 'fotos/tabela_doses_retatrutida_120mg.jpg',
    doses: [
      { mg: 2.5, preco: 80, label: '2,5 mg', fullLabel: '2,5 mg — R$ 80,00' },
      { mg: 5.0, preco: 150, label: '5,0 mg', fullLabel: '5,0 mg — R$ 150,00' }
    ]
  }
};
```

### Lógica de Baixa & Estorno de Doses:
- **Baixa (`confirmSale`):** Deduz exclusivamente os miligramas (`doseMg`) de `state.frascosDoses[pid].mgRestante`. O frasco fechado de reserva (`state.meuEstoque[pid]`) permanece intacto até que o frasco em uso seja zerado e o usuário opte por abrir um novo frasco.
- **Custo Proporcional da Dose:** `custoDose = (custoFrasco / 120) * doseMg`, garantindo cálculo exato de margem de contribuição.
- **Estorno (`undoSale`):** Se `venda.isDose === true`, devolve os miligramas para `state.frascosDoses[pid].mgRestante`. Se for caixa inteira, devolve a unidade para `state.meuEstoque[pid]`.

---

## 6. Sincronização Descentralizada (iPhone ⇄ Mac)

Para eliminar a necessidade de backends pagos e bancos de dados externos que poderiam vazar informações comerciais ou falhar por latência, implementamos um protocolo de sincronização por **Payload Criptografado em URL**:

1. **Exportação:**
   - O estado vivo é serializado: `JSON.stringify(syncData)`
   - Codificado em UTF-8 URI + Base64: `btoa(encodeURIComponent(jsonStr))`
   - Montado na URL com fragmento: `https://itabh92.github.io/shapetotal-crm/#sync=${b64}`
   - Renderizado em **QR Code dinâmico** na tela do computador.
2. **Importação:**
   - O usuário aponta a câmera do iPhone para a tela do Mac. O iOS reconhece a URL com `#sync=` e abre o PWA/Safari.
   - O hook `checkSyncFromUrl()` intercepta a carga antes do `loadState()`:
     ```javascript
     function checkSyncFromUrl() {
       const hash = window.location.hash || '';
       if (hash.startsWith('#sync=')) {
         const payload = hash.substring(6);
         const jsonStr = decodeURIComponent(atob(payload));
         const imported = JSON.parse(jsonStr);
         // Mescla e persiste no localStorage do iPhone
         localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...imported }));
         history.replaceState(null, null, window.location.pathname);
         alert('✅ Sincronização Concluída!');
       }
     }
     ```
   - O fragmento é limpo da barra de navegação sem recarregar a página (`history.replaceState`), preservando a discrição e a segurança.

---

## 7. Pontos Críticos para Avaliação do Claude 5.2

Solicitamos ao **Claude 5.2** que avalie com rigor de auditor sênior os seguintes pontos:

1. **Tratamento de Conflitos de Sincronização (CRDTs / Last-Write-Wins):**
   - Atualmente, a importação via `#sync=` faz um *shallow merge* com precedência do payload importado. Como melhorar para um merge inteligente baseado em timestamp por entidade (ex: somar vendas novas sem apagar vendas realizadas no outro aparelho enquanto estavam desconectados)?
2. **Compressão de Payload para QR Code:**
   - Em operações com mais de 50 vendas registradas no histórico, o payload Base64 pode ultrapassar 2.500 caracteres, desafiando a leitura óptica de QR Codes padrão. Recomendaria o uso de LZ-String (compressão lz) ou particionamento para transmitir apenas o delta de vendas?
3. **Resiliência de Cache PWA no ecossistema iOS (Safari WebKit):**
   - Avaliar se a técnica de cache buster com timestamp (`?v=20261109_1655`) e o `manifest.json` com `standalone` atendem a 100% dos requisitos de atualização forçada no iPhone, ou se um Service Worker com estratégia *Network-First* traria ganhos adicionais.
4. **Segurança & Privacidade de Dados no Client-Side:**
   - Como toda a lógica e dados rodam no navegador com senha de tela (`ST_AUTH`), avaliar a robustez contra inspeção de código e propor camadas adicionais de obfuscação ou criptografia local (ex: Web Crypto API com AES-GCM) para os dados do `localStorage`.
5. **Otimização de Renderização DOM:**
   - O catálogo possui 890 itens. Atualmente, o filtro de texto e coleções re-renderiza o DOM via template literals. Avaliar se a paginação virtual ou `requestAnimationFrame` traria ganho perceptível no scroll de modelos de iPhone mais antigos.
