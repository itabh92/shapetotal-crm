#!/bin/zsh
set -euo pipefail
cd /Users/italosouza/Medicamentos/ShapeTotalCRM
/usr/bin/python3 /Users/italosouza/Medicamentos/ShapeTotalCRM/atualizar_site.py
if [ -n "$(git status --porcelain -- catalogo_dados.json dados_catalogo.js fotos/)" ]; then
  git add catalogo_dados.json dados_catalogo.js fotos/
  git commit -m "chore(catalogo): sync semanal automatico shapetotal.com ($(date +%Y-%m-%d))"
  git push origin main >> /Users/italosouza/Medicamentos/ShapeTotalCRM/sync.log 2>&1
fi
