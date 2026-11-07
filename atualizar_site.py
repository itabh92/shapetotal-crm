#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Sincroniza todos os produtos e fotos de https://shapetotal.com/api/catalogo
para o CRM local em /Users/italosouza/Medicamentos/ShapeTotalCRM/.
"""
import json
import os
import urllib.request
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_DIR = '/Users/italosouza/Medicamentos/ShapeTotalCRM'
FOTOS_DIR = os.path.join(BASE_DIR, 'fotos')
API_URL = 'https://shapetotal.com/api/catalogo'
LOG_FILE = os.path.join(BASE_DIR, 'sync.log')

def log(msg):
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    line = f"[{now}] {msg}"
    print(line)
    try:
        with open(LOG_FILE, 'a', encoding='utf-8') as f:
            f.write(line + '\n')
    except Exception:
        pass

def main():
    log("Iniciando sincronização diária da Shape Total...")
    os.makedirs(FOTOS_DIR, exist_ok=True)

    try:
        req = urllib.request.Request(API_URL, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=30) as resp:
            raw_data = json.loads(resp.read().decode('utf-8'))
    except Exception as e:
        log(f"Erro ao conectar na API da Shape Total: {e}")
        return

    # Salva dados brutos
    with open(os.path.join(BASE_DIR, 'catalogo_dados.json'), 'w', encoding='utf-8') as f:
        json.dump(raw_data, f, ensure_ascii=False, indent=2)

    # Gera dados_catalogo.js
    js_content = "window.SHAPETOTAL_RAW = " + json.dumps(raw_data, ensure_ascii=False) + ";\n"
    with open(os.path.join(BASE_DIR, 'dados_catalogo.js'), 'w', encoding='utf-8') as f:
        f.write(js_content)

    # Baixa fotos novas
    prods = [p for p in raw_data.get('productos', []) if p.get('foto')]
    def dl(p):
        dest = os.path.join(FOTOS_DIR, f"producto-{p['id']}.jpg")
        if os.path.exists(dest) and os.path.getsize(dest) > 100:
            return False
        try:
            r = urllib.request.Request('https://shapetotal.com' + p['foto'], headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(r, timeout=12) as res:
                b = res.read()
                if len(b) > 100:
                    with open(dest, 'wb') as out:
                        out.write(b)
                    return True
        except Exception:
            return False
        return False

    novas_fotos = 0
    with ThreadPoolExecutor(max_workers=16) as ex:
        for fut in as_completed([ex.submit(dl, p) for p in prods]):
            if fut.result():
                novas_fotos += 1

    # Atualiza shapetotal_mobile.html
    try:
        with open(os.path.join(BASE_DIR, 'styles.css'), 'r', encoding='utf-8') as f:
            css = f.read()
        with open(os.path.join(BASE_DIR, 'dados_catalogo.js'), 'r', encoding='utf-8') as f:
            dados_js = f.read()
        with open(os.path.join(BASE_DIR, 'app.js'), 'r', encoding='utf-8') as f:
            app_js = f.read()
        with open(os.path.join(BASE_DIR, 'index.html'), 'r', encoding='utf-8') as f:
            html = f.read()

        html_bundled = html.replace('<link rel="stylesheet" href="styles.css" />', f'<style>\n{css}\n</style>')
        script_replacement = f'<script>\n{dados_js}\n{app_js}\n</script>'
        html_bundled = html_bundled.replace('<script src="dados_catalogo.js"></script>\n  <script src="app.js"></script>', script_replacement)
        html_bundled = html_bundled.replace('<script src="dados_catalogo.js"></script>', '')
        html_bundled = html_bundled.replace('<script src="app.js"></script>', script_replacement)

        out_path = os.path.join(BASE_DIR, 'shapetotal_mobile.html')
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(html_bundled)
    except Exception as e:
        log(f"Aviso ao atualizar bundle mobile: {e}")

    log(f"Sincronização concluída com sucesso: {len(raw_data.get('productos', []))} SKUs | {novas_fotos} novas fotos.")

if __name__ == '__main__':
    main()
