#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Processa fotos para TODOS os 110 produtos de Peptídeos e HGH.
Busca em alta resolução na web com download e recorte 600x600 em fundo branco.
Gera packshot farmacêutico premium/biotech se não encontrar foto na web.
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
    3134, 3133, 3163, 3102, 2598, 225, 237, 2228, 239, 3081, 3079, 3084, 3080, 3195, 3092, 
    3083, 3082, 3090, 3086, 3095, 3094, 3089, 3093, 3091, 3088, 3085, 3087, 3098, 386, 387, 
    3277, 3276, 388, 389, 391, 392, 393, 394, 3278, 395, 396, 398, 3099, 3097, 971, 562, 
    565, 566, 797, 799, 802, 815, 3140, 3142, 3111, 3110, 3321, 3227, 3274, 3208, 3162, 
    3238, 3243, 3266, 3230, 3264, 3242, 3273, 3160, 3202, 3301, 3155, 3225, 3245, 3343, 
    3344, 3154, 3221, 3247, 3226, 3215, 3275, 3240, 3246, 3161, 3366, 3029, 3124, 3125, 
    3035, 3126, 3027, 3036, 3118, 3032, 2947, 2880, 2879, 3033, 2881, 3030, 3002, 3028, 
    3123, 2610, 3268, 3209, 3292, 3068, 3012
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

def generate_peptide_packshot(product, out_path, size=600):
    img = Image.new('RGB', (size, size), (248, 250, 252))
    draw = ImageDraw.Draw(img)
    
    box_w, box_h = 320, 440
    bx = (size - box_w) // 2
    by = (size - box_h) // 2
    
    # Sombra
    draw.rounded_rectangle([bx + 8, by + 12, bx + box_w + 8, by + box_h + 12], radius=16, fill=(226, 232, 240))
    # Caixa principal
    draw.rounded_rectangle([bx, by, bx + box_w, by + box_h], radius=16, fill=(255, 255, 255), outline=(203, 213, 225), width=2)
    
    name_upper = (product.get('nombre') or '').upper()
    marca_upper = (product.get('marca') or 'SHAPE TOTAL').upper()
    cat_lower = (product.get('categoria') or '').lower()
    
    # Header Biotech Gradient Style
    if 'HGH' in name_upper or 'SOMATROP' in name_upper or cat_lower == 'hgh' or 'GENOTROPIN' in name_upper:
        color_banner = (15, 23, 42) # Slate black / gold premium
        color_accent = (217, 119, 6) # Dourado
        tag_text = "HGH SOMATROPINA PURA"
    elif 'GHK' in name_upper:
        color_banner = (14, 116, 144) # Ciano / cobre / azul profundo
        color_accent = (56, 189, 248)
        tag_text = "PEPTÍDEO DE COBRE"
    elif 'BPC' in name_upper or 'TB' in name_upper or 'KLOW' in name_upper or 'GLOW' in name_upper:
        color_banner = (13, 148, 136) # Verde água / teal biológico
        color_accent = (45, 212, 191)
        tag_text = "RECUPERAÇÃO & REGENERAÇÃO"
    elif 'RETATRUTIDE' in name_upper or 'SEMAGLUTIDA' in name_upper or 'AOD' in name_upper:
        color_banner = (194, 65, 12) # Laranja queima / metabólico
        color_accent = (251, 146, 60)
        tag_text = "METABOLISMO & LIPÓLISE"
    elif 'SEMAX' in name_upper or 'SELANK' in name_upper or 'NAD' in name_upper or 'DSIP' in name_upper:
        color_banner = (109, 40, 217) # Roxo neuro
        color_accent = (167, 139, 250)
        tag_text = "NOOTRÓPICO & LONGEVIDADE"
    else:
        color_banner = (3, 105, 161) # Azul biotech
        color_accent = (14, 165, 233)
        tag_text = "BIOTECH PEPTIDE 99%+"
        
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
    
    cx = bx + box_w // 2
    is_caneta = 'CANETA' in name_upper or 'PEN' in name_upper
    
    if is_caneta:
        pen_w, pen_h = 36, 170
        px = cx - pen_w // 2
        py = by + 135
        draw.rounded_rectangle([px, py, px + pen_w, py + pen_h], radius=8, fill=(226, 232, 240), outline=(148, 163, 184), width=2)
        draw.rectangle([px + 6, py + 40, px + pen_w - 6, py + 85], fill=color_accent)
        draw.rounded_rectangle([px + 4, py + 110, px + pen_w - 4, py + 155], radius=4, fill=(100, 116, 139))
    else:
        vial_w, vial_h = 90, 150
        vx = cx - vial_w // 2
        vy = by + 145
        draw.rounded_rectangle([vx + 20, vy - 16, vx + vial_w - 20, vy - 4], radius=4, fill=color_accent)
        draw.rounded_rectangle([vx + 24, vy - 4, vx + vial_w - 24, vy + 12], radius=2, fill=(203, 213, 225), outline=(148, 163, 184), width=1)
        draw.rounded_rectangle([vx, vy + 12, vx + vial_w, vy + vial_h], radius=10, fill=(241, 245, 249), outline=(203, 213, 225), width=2)
        draw.rectangle([vx + 6, vy + 40, vx + vial_w - 6, vy + 115], fill=(255, 255, 255), outline=color_accent, width=1)
        draw.text((vx + 12, vy + 50), "BIOTECH", fill=color_banner, font=font_badge)
        draw.text((vx + 12, vy + 75), "STERILE", fill=(100, 116, 139), font=font_badge)
        draw.text((vx + 12, vy + 95), "LYOPHILIZED", fill=color_accent, font=font_badge)
    
    words = name_upper.replace(marca_upper, '').strip().split()
    line1 = ' '.join(words[:4]) if len(words) >= 4 else ' '.join(words)
    line2 = ' '.join(words[4:8]) if len(words) > 4 else ''
    
    draw.text((bx + 20, by + 325), line1[:26], fill=(15, 23, 42), font=font_title)
    if line2:
        draw.text((bx + 20, by + 350), line2[:26], fill=(15, 23, 42), font=font_title)
        
    pres = (product.get('presentacion') or '').upper()
    mg = (product.get('mg') or '').upper()
    sub_txt = f"{pres} • {mg}" if pres and mg else (pres or mg or 'USO SUBCUTÂNEO')
    draw.text((bx + 20, by + 380), sub_txt[:32], fill=(100, 116, 139), font=font_sub)
    
    draw.rounded_rectangle([bx + box_w - 110, by + 400, bx + box_w - 18, by + 424], radius=6, fill=color_banner)
    draw.text((bx + box_w - 102, by + 406), "99.5% PURITY", fill=(255, 255, 255), font=font_badge)
    
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
    
    clean_nom = re.sub(r'\b(x|ampollas|amp|vial|polvo|mg|ui)\b', '', nombre, flags=re.I)
    
    queries = [
        f"{marca} {clean_nom} peptide",
        f"{marca} {nombre}",
        f"{nombre} somatropin" if 'hgh' in cat or 'somatrop' in nombre.lower() else f"{nombre} peptide vial",
        f"{marca} {comp} vial",
        f"{clean_nom} peptide"
    ]
    
    for q in queries:
        urls = search_image_urls(q)
        for u in urls[:3]:
            if download_and_crop(u, dest):
                return pid, True, 'web'
                
    # Se falhou download da web, gera packshot
    generate_peptide_packshot(p, dest)
    return pid, True, 'packshot'

def main():
    print("Iniciando busca web para os 110 Peptídeos e HGH...")
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    pept_prods = []
    for p in data.get('productos', []):
        c = (p.get('categoria') or '').lower().strip()
        if c in ['peptideo', 'hgh'] or p.get('id') == 3214:
            pept_prods.append(p)
            
    stats = {'existente': 0, 'web': 0, 'packshot': 0}
    with ThreadPoolExecutor(max_workers=12) as executor:
        futures = {executor.submit(process_product, p): p for p in pept_prods if p['id'] in TARGET_IDS}
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
