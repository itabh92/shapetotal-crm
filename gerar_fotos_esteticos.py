#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Processa fotos para TODOS os 53 produtos de Estéticos, Saúde Mental, Potência e Outros sem foto.
Busca em alta resolução na web com download e recorte 600x600 em fundo branco.
Gera packshot farmacêutico elegante se não encontrar foto na web.
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

TARGET_IDS = {
    3015, 2986, 1457, 1889, 2695, 363, 366, 2523, 2046, 1389, 2542, 2183, 489, 491, 1522, 
    3153, 3368, 2852, 2543, 2925, 2926, 3341, 1493, 1494, 2948, 3229, 3232, 2949, 163, 
    374, 687, 688, 2696, 2884, 2666, 2154, 376, 3355, 3297, 3296, 3224, 1026, 1091, 1094, 
    1095, 2126, 2548, 2545, 1119, 365, 1749, 2991, 3077
}

def search_image_urls(query):
    url = f"https://www.bing.com/images/search?q={urllib.parse.quote_plus(query)}&FORM=HDRSC2"
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
    })
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            return re.findall(r'murl&quot;:&quot;(http[^&]+)&quot;', html)
    except Exception:
        return []

def download_and_crop(url, out_path, size=600):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=7) as resp:
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

def generate_aesthetic_packshot(product, out_path, size=600):
    img = Image.new('RGB', (size, size), (248, 250, 252))
    draw = ImageDraw.Draw(img)
    
    box_w, box_h = 320, 440
    bx = (size - box_w) // 2
    by = (size - box_h) // 2
    
    draw.rounded_rectangle([bx + 8, by + 12, bx + box_w + 8, by + box_h + 12], radius=16, fill=(226, 232, 240))
    draw.rounded_rectangle([bx, by, bx + box_w, by + box_h], radius=16, fill=(255, 255, 255), outline=(203, 213, 225), width=2)
    
    name_upper = (product.get('nombre') or '').upper()
    marca_upper = (product.get('marca') or 'SHAPE TOTAL').upper()
    cat_lower = (product.get('categoria') or '').lower()
    
    # Cores refinadas conforme a categoria
    if 'BOTOX' in name_upper or 'DYSPORT' in name_upper or 'BOTULAX' in name_upper or 'MEDITOXIN' in name_upper:
        color_banner = (13, 148, 136) # Teal nobre
        tag_text = "TOXINA BOTULÍNICA TIPO A"
    elif 'ACID' in name_upper or 'HIALU' in name_upper or 'SCULPTRA' in name_upper or cat_lower == 'estetico':
        color_banner = (190, 24, 93) # Rosa / magenta cosmético sofisticado
        tag_text = "HARMONIZAÇÃO & REJUVENESCIMENTO"
    elif cat_lower == 'saude mental' or 'ZICARTIL' in name_upper or 'LISPAX' in name_upper or 'MODAFINIL' in name_upper:
        color_banner = (67, 56, 202) # Índigo / neuro
        tag_text = "NEURO & FOCO COGNITIVO"
    elif 'TADALA' in name_upper or 'PRAMIL' in name_upper or cat_lower == 'potencia sexual':
        color_banner = (185, 28, 28) # Vermelho rubi vigor
        tag_text = "PERFORMANCE & DISPOSIÇÃO"
    elif 'ROACUTAN' in name_upper or 'ISOTRETINOINA' in name_upper or cat_lower == 'anti acne':
        color_banner = (217, 119, 6) # Âmbar dermatológico
        tag_text = "DERMATOLOGIA AVANÇADA"
    elif 'CBD' in name_upper or cat_lower == 'cbd':
        color_banner = (22, 101, 52) # Verde botânico
        tag_text = "CANNABIDIOL MEDICINAL"
    else:
        color_banner = (30, 41, 59) # Slate escuro neutro
        tag_text = "LINHA CLÍNICA & SUPORTE"
        
    draw.rounded_rectangle([bx, by, bx + box_w, by + 80], radius=16, fill=color_banner)
    draw.rectangle([bx, by + 65, bx + box_w, by + 80], fill=color_banner)
    
    try:
        font_marca = ImageFont.truetype('/System/Library/Fonts/SFNS.ttf', 20)
        font_title = ImageFont.truetype('/System/Library/Fonts/SFNS.ttf', 20)
        font_sub = ImageFont.truetype('/System/Library/Fonts/SFNS.ttf', 14)
        font_badge = ImageFont.truetype('/System/Library/Fonts/SFNS.ttf', 12)
    except:
        font_marca = font_title = font_sub = font_badge = ImageFont.load_default()
        
    draw.text((bx + 20, by + 26), marca_upper[:24], fill=(255, 255, 255), font=font_marca)
    draw.rounded_rectangle([bx + 20, by + 95, bx + box_w - 20, by + 120], radius=6, fill=(241, 245, 249))
    draw.text((bx + 28, by + 100), tag_text, fill=color_banner, font=font_badge)
    
    # Ícone / Ilustração central
    cx = bx + box_w // 2
    cy = by + 215
    draw.ellipse([cx - 45, cy - 45, cx + 45, cy + 45], fill=(241, 245, 249), outline=color_banner, width=2)
    draw.text((cx - 24, cy - 8), "PHARMA", fill=color_banner, font=font_badge)
    
    words = name_upper.replace(marca_upper, '').strip().split()
    line1 = ' '.join(words[:4]) if len(words) >= 4 else ' '.join(words)
    line2 = ' '.join(words[4:8]) if len(words) > 4 else ''
    
    draw.text((bx + 20, by + 325), line1[:26], fill=(15, 23, 42), font=font_title)
    if line2:
        draw.text((bx + 20, by + 350), line2[:26], fill=(15, 23, 42), font=font_title)
        
    pres = (product.get('presentacion') or '').upper()
    mg = (product.get('mg') or '').upper()
    sub_txt = f"{pres} • {mg}" if pres and mg else (pres or mg or 'ORIGINAL VERIFICADO')
    draw.text((bx + 20, by + 380), sub_txt[:32], fill=(100, 116, 139), font=font_sub)
    
    draw.rounded_rectangle([bx + box_w - 110, by + 400, bx + box_w - 18, by + 424], radius=6, fill=color_banner)
    draw.text((bx + box_w - 98, by + 406), "100% ORIGINAL", fill=(255, 255, 255), font=font_badge)
    
    img.save(out_path, 'JPEG', quality=90)
    return True

def process_product(p):
    pid = p['id']
    dest = os.path.join(FOTOS_DIR, f"producto-{pid}.jpg")
    
    if pid not in TARGET_IDS:
        return pid, True, 'existente'
        
    marca = p.get('marca') or ''
    nombre = p.get('nombre') or ''
    comp = p.get('composicion') or ''
    cat = p.get('categoria') or ''
    
    clean_nom = re.sub(r'\b(x|ampollas|amp|vial|polvo|mg|ui|comp|caps|tablets|sh|hs)\b', '', nombre, flags=re.I)
    
    queries = [
        f"{marca} {clean_nom}",
        f"{nombre}",
        f"{marca} {nombre}",
        f"{clean_nom} farmacia"
    ]
    
    for q in queries:
        urls = search_image_urls(q)
        for u in urls[:3]:
            if download_and_crop(u, dest):
                return pid, True, 'web'
                
    generate_aesthetic_packshot(p, dest)
    return pid, True, 'packshot'

def main():
    print("Iniciando busca web para os 53 produtos de Estéticos e Outros...")
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    prods = [p for p in data.get('productos', []) if p['id'] in TARGET_IDS]
    print(f"Total de produtos selecionados: {len(prods)}")
    
    stats = {'existente': 0, 'web': 0, 'packshot': 0}
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(process_product, p): p for p in prods}
        for fut in as_completed(futures):
            pid, success, source = fut.result()
            stats[source] += 1
            p = futures[fut]
            print(f"[{source.upper()}] ID {pid} - {p.get('nombre')}")
                
    print("\nResumo do processamento de fotos:")
    print(f"- Fotos baixadas da Web: {stats['web']}")
    print(f"- Packshots farmacêuticos: {stats['packshot']}")
    
    # Atualiza catalogo_dados.json com as fotos
    for p in data.get('productos', []):
        f_path = os.path.join(FOTOS_DIR, f"producto-{p['id']}.jpg")
        if os.path.exists(f_path) and os.path.getsize(f_path) > 1000:
            p['foto'] = f"/fotos/producto-{p['id']}.jpg"
            
    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        
    js_content = "window.SHAPETOTAL_RAW = " + json.dumps(data, ensure_ascii=False) + ";\n"
    with open(DADOS_JS_PATH, 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    # Reempacota shapetotal_mobile.html
    try:
        with open(os.path.join(BASE_DIR, 'styles.css'), 'r', encoding='utf-8') as f:
            css = f.read()
        with open(DADOS_JS_PATH, 'r', encoding='utf-8') as f:
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
        print("shapetotal_mobile.html atualizado com sucesso!")
    except Exception as e:
        print(f"Aviso ao gerar mobile bundle: {e}")

if __name__ == '__main__':
    main()
