#!/bin/zsh
set -euo pipefail

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/sbin:/usr/sbin"
CRM_DIR="/Users/italosouza/Medicamentos/ShapeTotalCRM"
LOG_FILE="$CRM_DIR/sync.log"

cd "$CRM_DIR"

aviso_telegram() {
  local msg="$1"
  /usr/bin/python3 -c "
import sys
sys.path.insert(0, '/Users/italosouza/bin')
import avisar_italo
avisar_italo.DESTINO = avisar_italo.TG_ROTINAS
avisar_italo.enviar_telegram(sys.argv[1])
" "$msg" >/dev/null 2>&1 || true
}

on_error() {
  local linha="$1"
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERRO na rotina diária ShapeTotal (linha $linha)" >> "$LOG_FILE"
  aviso_telegram "❌ *ShapeTotal CRM — Falha na rotina das 11h00* (linha $linha). Verifique o log em $LOG_FILE."
}
trap 'on_error $LINENO' ERR

echo "==================================================" >> "$LOG_FILE"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Iniciando rotina diária 11h00 ShapeTotal CRM..." >> "$LOG_FILE"

# 1. Sincronizar API shapetotal.com (produtos, dólar, promoções e atualização de fotos)
/usr/bin/python3 "$CRM_DIR/atualizar_site.py" --refresh-fotos >> "$LOG_FILE" 2>&1

# 1.1 Sincronizar cotação live da API para pricing_config.json e pricing_config.js
/usr/bin/python3 - << 'PYEOF' >> "$LOG_FILE" 2>&1
import json
from datetime import datetime
from pricing_engine import load_pricing_config, write_pricing_config_js, CONFIG_JSON_PATH

with open('/Users/italosouza/Medicamentos/ShapeTotalCRM/catalogo_dados.json', encoding='utf-8') as f:
    cat = json.load(f)
cot_api = float(cat.get('cotizacion') or 0)
if cot_api > 0:
    cfg = load_pricing_config()
    if abs(float(cfg.get('cotacao', 0)) - cot_api) > 1e-4:
        cfg['cotacao'] = round(cot_api, 4)
        cfg['updatedAt'] = datetime.now().strftime('%Y-%m-%d')
        with open(CONFIG_JSON_PATH, 'w', encoding='utf-8') as fc:
            json.dump(cfg, fc, ensure_ascii=False, indent=2)
            fc.write('\n')
        write_pricing_config_js(cfg)
        print(f"pricing_config sincronizado para dólar R$ {cfg['cotacao']:.2f}")
PYEOF

# 2. Regenerar os 5 catálogos oficiais + Tabela Fechada Tirzepatidas (CRM, Downloads e Desktop)
/usr/bin/python3 "$CRM_DIR/gerar_todos_catalogos_oficiais.py" >> "$LOG_FILE" 2>&1
/usr/bin/python3 "$CRM_DIR/gerar_catalogo_tabela_fechada.py" >> "$LOG_FILE" 2>&1

# 3. Rodar suíte de testes antes de publicar
node --test "$CRM_DIR"/tests/*.test.mjs >> "$LOG_FILE" 2>&1

# 4. Ler resumo atualizado do catalogo_dados.json
RESUMO=$(/usr/bin/python3 - << 'PYEOF'
import json
with open('/Users/italosouza/Medicamentos/ShapeTotalCRM/catalogo_dados.json', encoding='utf-8') as f:
    d = json.load(f)
cot = d.get('cotizacion', 0)
skus = len(d.get('productos', []))
promos = len(d.get('promos', []))
print(f"Dólar: R$ {cot} | SKUs: {skus} | Promos: {promos}")
PYEOF
)

# 5. Publicar no GitHub Pages se houver alterações
PUSH_STATUS="Sem alterações novas no site"
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -m "chore(catalogo): rotina diária 11h00 ($(date +%Y-%m-%d) · $RESUMO)" >> "$LOG_FILE" 2>&1
  git push origin main >> "$LOG_FILE" 2>&1
  PUSH_STATUS="Site publicado no GitHub Pages"
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Concluído: $RESUMO | $PUSH_STATUS" >> "$LOG_FILE"
aviso_telegram "✅ *ShapeTotal CRM atualizado (11h00)*
• $RESUMO
• 6 PDFs oficiais regenerados (CRM, Downloads e Desktop)
• Testes automatizados: OK
• $PUSH_STATUS"
