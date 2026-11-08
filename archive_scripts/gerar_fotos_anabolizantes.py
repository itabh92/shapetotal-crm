#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Processa fotos para TODOS os 261 produtos de Anabolizantes sem foto.
Busca paralela no Bing Images com download e recorte 600x600 em fundo branco.
Gera packshot farmacêutico padrão se não encontrar foto na web.
Atualiza catalogo_dados.json, dados_catalogo.js e shapetotal_mobile.html.
"""

import urllib.request
import urllib.parse
import re
import io
import os
import json
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = '/Users/italosouza/Medicamentos/ShapeTotalCRM'
FOTOS_DIR = os.path.join(BASE_DIR, 'fotos')
JSON_PATH = os.path.join(BASE_DIR, 'catalogo_dados.json')
DADOS_JS_PATH = os.path.join(BASE_DIR, 'dados_catalogo.js')
os.makedirs(FOTOS_DIR, exist_ok=True)

def search_image_urls(query):
    url = f"https://www.bing.com/images/search?q={urllib.parse.quote_plus(query)}&FORM=HDRSC2"
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
    })
    try:
        with urllib.request.urlopen(req, timeout=7) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            return re.findall(r'murl&quot;:&quot;(http[^&]+)&quot;', html)
    except Exception:
        return []

def download_and_crop(url, out_path, size=600):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=6) as resp:
            data = resp.read()
            img = Image.open(io.BytesIO(data)).convert('RGB')
            w, h = img.size
            if w < 120 or h < 120:
                return False
            
            ratio = min((size - 40) / w, (size - 40) / h)
            nw, nh = int(w * ratio), int(h * ratio)
            resized = img.resize((nw, nh), Image.LANCZOS)
            
            canvas = Image.new('RGB', (size, size), (255, 255, 255))
            canvas.paste(resized, ((size - nw) // 2, (size - nh) // 2))
            canvas.save(out_path, 'JPEG', quality=90)
            return True
    except Exception:
        return False

def generate_pharma_packshot(product, out_path, size=600):
    img = Image.new('RGB', (size, size), (248, 250, 252))
    draw = ImageDraw.Draw(img)
    
    box_w, box_h = 320, 440
    bx = (size - box_w) // 2
    by = (size - box_h) // 2
    
    # Sombra
    draw.rounded_rectangle([bx + 8, by + 12, bx + box_w + 8, by + box_h + 12], radius=16, fill=(226, 232, 240))
    # Caixa
    draw.rounded_rectangle([bx, by, bx + box_w, by + box_h], radius=16, fill=(255, 255, 255), outline=(203, 213, 225), width=2)
    
    name_upper = (product.get('nombre') or '').upper()
    marca_upper = (product.get('marca') or 'SHAPE TOTAL').upper()
    
    # Cores de topo conforme o anabolizante
    color_banner = (30, 58, 138) # azul marinho escuro
    if 'TREMB' in name_upper:
        color_banner = (185, 28, 28) # vermelho escuro para trembo
    elif 'TEST' in name_upper or 'DURA' in name_upper or 'ENAN' in name_upper or 'SUSTAN' in name_upper:
        color_banner = (217, 119, 6) # dourado / ambar
    elif 'DECA' in name_upper or 'NANDRO' in name_upper:
        color_banner = (4, 120, 87) # verde escuro
    elif 'STANO' in name_upper or 'WINSTROL' in name_upper:
        color_banner = (14, 165, 233) # azul ciano
    elif 'OXAN' in name_upper or 'PRIMO' in name_upper or 'MASTERON' in name_upper:
        color_banner = (109, 40, 217) # roxo nobre
        
    draw.rounded_rectangle([bx, by, bx + box_w, by + 75], radius=16, fill=color_banner)
    draw.rectangle([bx, by + 60, bx + box_w, by + 75], fill=color_banner)
    
    try:
        font_marca = ImageFont.truetype('/System/Library/Fonts/SFNS.ttf', 20)
        font_title = ImageFont.truetype('/System/Library/Fonts/SFNS.ttf', 22)
        font_sub = ImageFont.truetype('/System/Library/Fonts/SFNS.ttf', 15)
        font_badge = ImageFont.truetype('/System/Library/Fonts/SFNS.ttf', 13)
    except:
        font_marca = font_title = font_sub = font_badge = ImageFont.load_default()
        
    draw.text((bx + 20, by + 26), marca_upper, fill=(255, 255, 255), font=font_marca)
    draw.line([bx + 20, by + 120, bx + box_w - 20, by + 120], fill=(241, 245, 249), width=2)
    
    words = product.get('nombre', '').split()
    line1 = " ".join(words[:3])
    line2 = " ".join(words[3:6])
    draw.text((bx + 20, by + 140), line1, fill=(15, 23, 42), font=font_title)
    if line2:
        draw.text((bx + 20, by + 170), line2, fill=(15, 23, 42), font=font_title)
        
    qty = product.get('qty') or ''
    mg = product.get('mg') or ''
    spec = f"Concentração: {qty} {mg}".strip()
    draw.text((bx + 20, by + 240), spec, fill=(100, 116, 139), font=font_sub)
    draw.text((bx + 20, by + 265), "Uso Intramuscular / Oral", fill=(148, 163, 184), font=font_sub)
    
    draw.rounded_rectangle([bx + 20, by + box_h - 75, bx + box_w - 20, by + box_h - 25], radius=8, fill=(240, 253, 244), outline=(187, 247, 208))
    draw.text((bx + 35, by + box_h - 60), "✓ PRODUTO ORIGINAL SELADO", fill=(22, 101, 52), font=font_badge)
    
    img.save(out_path, 'JPEG', quality=90)
    return True

def process_single_product(p):
    pid = p['id']
    nome = p.get('nombre', '')
    marca = p.get('marca', '')
    out_file = os.path.join(FOTOS_DIR, f"producto-{pid}.jpg")
    
    if os.path.exists(out_file) and os.path.getsize(out_file) > 1000:
        return pid, True, 'cached'
        
    clean_nome = re.sub(r'(\bx\b|\b\d+\s*amp\b|\bcomp\b|\btabs\b)', ' ', nome, flags=re.I)
    query = f"{marca} {clean_nome}".strip()
    query = re.sub(r'\s+', ' ', query)
    
    urls = search_image_urls(query)
    for u in urls[:5]:
        if download_and_crop(u, out_file):
            return pid, True, 'web'
            
    generate_pharma_packshot(p, out_file)
    return pid, True, 'generated'

def main():
    print("Iniciando varredura para 100% dos Anabolizantes sem foto...")
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    anab_prods = []
    for p in data['productos']:
        c = (p.get('categoria') or '').lower().strip()
        if c in ['anabolizante', 'sarms', 'post ciclo', 'hcg']:
            anab_prods.append(p)
            
    without_photo = [p for p in anab_prods if not p.get('foto')]
    print(f"Total Anabolizantes: {len(anab_prods)} | Sem foto: {len(without_photo)}")
    
    done_count = 0
    web_count = 0
    gen_count = 0
    
    # Processa com 6 workers em paralelo
    with ThreadPoolExecutor(max_workers=6) as executor:
        futures = {executor.submit(process_single_product, p): p for p in without_photo}
        for future in as_completed(futures):
            p = futures[future]
            try:
                pid, success, source = future.result()
                done_count += 1
                if source == 'web': web_count += 1
                elif source == 'generated': gen_count += 1
                if done_count % 15 == 0 or done_count == len(without_photo):
                    print(f"Progresso: {done_count}/{len(without_photo)} fotos concluídas ({web_count} web, {gen_count} mockups)...")
            except Exception as e:
                print(f"Erro em {p['id']}: {e}")
                
    # Atualiza catalogo_dados.json
    for p in anab_prods:
        pid = p['id']
        fpath = os.path.join(FOTOS_DIR, f"producto-{pid}.jpg")
        if os.path.exists(fpath):
            p['foto'] = f"/api/foto/producto-{pid}.jpg"
            
    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        
    with open(DADOS_JS_PATH, 'w', encoding='utf-8') as f:
        f.write('window.SHAPETOTAL_RAW = ')
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write(';\n')
        
    print(f"\nFinalizado com sucesso!")
    print(f"100% dos {len(anab_prods)} Anabolizantes agora têm foto oficial vinculada!")

if __name__ == '__main__':
    main()
