#!/bin/zsh
set -euo pipefail

REPO="/Users/italosouza/Medicamentos/ShapeTotalCRM"
LOG="$REPO/sync.log"
AVISAR="/Users/italosouza/bin/avisar_italo.py"

ts() { date "+%d/%m/%Y %H:%M"; }

notificar_erro() {
  local rc=$?
  echo "[$(ts)] ERRO sync_semanal (codigo $rc)" >> "$LOG"
  /usr/bin/python3 "$AVISAR" --rotinas "⚠️ ShapeTotal sync_semanal falhou (código $rc). Confira $LOG." >/dev/null 2>&1 || true
  exit "$rc"
}
trap notificar_erro ERR

# Mantém sync.log limitado às últimas 300 linhas para não crescer indefinidamente
if [ -f "$LOG" ] && [ "$(wc -l < "$LOG" 2>/dev/null || echo 0)" -gt 300 ]; then
  tail -n 150 "$LOG" > "$LOG.tmp" && mv "$LOG.tmp" "$LOG"
fi

echo "[$(ts)] ========== INICIO SYNC SEMANAL ==========" >> "$LOG"
cd "$REPO"

# Sincroniza antes com origin/main para evitar push rejeitado caso tenha havido edição manual
git pull --rebase --autostash origin main >> "$LOG" 2>&1

/usr/bin/python3 "$REPO/atualizar_site.py" >> "$LOG" 2>&1

if [ -n "$(git status --porcelain -- catalogo_dados.json dados_catalogo.js pricing_config.js fotos/)" ]; then
  git add catalogo_dados.json dados_catalogo.js pricing_config.js fotos/ >> "$LOG" 2>&1
  git commit -m "chore(catalogo): sync semanal automatico shapetotal.com ($(date +%Y-%m-%d))" >> "$LOG" 2>&1
  git push origin main >> "$LOG" 2>&1
  echo "[$(ts)] OK — catalogo atualizado e enviado para origin/main" >> "$LOG"
else
  echo "[$(ts)] OK — nenhuma alteracao no catalogo" >> "$LOG"
fi
