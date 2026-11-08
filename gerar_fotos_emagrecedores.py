#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Varre e gera fotos para TODOS os 86 produtos de emagrecimento que estão sem foto.
Se encontrar na web, faz o download e recorte 600x600 em fundo branco.
Se não encontrar, gera um packshot farmacêutico profissional com rótulo, dosagem e marca.
"""
import urllib.request
import urllib.parse
import re
import io
import os
import json
import time
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
        with urllib.request.urlopen(req, timeout=8) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            return re.findall(r'murl&quot;:&quot;(http[^&]+)&quot;', html)
    except Exception as e:
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
    """Gera um mockup de embalagem farmacêutica premium se a foto não estiver na web."""
    img = Image.new('RGB', (size, size), (248, 250, 252))
    draw = ImageDraw.Draw(img)
    
    # Desenha caixa 3D farmacêutica estilizada
    box_w, box_h = 320, 440
    bx = (size - box_w) // 2
    by = (size - box_h) // 2
    
    # Sombra suave da caixa
    draw.rounded_rectangle([bx + 8, by + 12, bx + box_w + 8, by + box_h + 12], radius=16, fill=(226, 232, 240))
    # Caixa frontal branca
    draw.rounded_rectangle([bx, by, bx + box_w, by + box_h], radius=16, fill=(255, 255, 255), outline=(203, 213, 225), width=2)
    
    # Faixa colorida no topo conforme ativo
    name_upper = (product.get('nombre') or '').upper()
    marca_upper = (product.get('marca') or 'SHAPE TOTAL').upper()
    
    color_banner = (16, 185, 129) # verde esmeralda
    if 'RETA' in name_upper:
        color_banner = (139, 92, 246) # roxo violeta
    elif 'SEMA' in name_upper or 'GLUCOX' in name_upper or 'OZEMPIC' in name_upper:
        color_banner = (14, 165, 233) # azul ciano
    elif 'CLEN' in name_upper or 'MELTOS' in name_upper:
        color_banner = (249, 115, 22) # laranja queimador
        
    draw.rounded_rectangle([bx, by, bx + box_w, by + 75], radius=16, fill=color_banner)
    draw.rectangle([bx, by + 60, bx + box_w, by + 75], fill=color_banner) # achata bordas inferiores da faixa
    
    # Fontes do sistema
    try:
        font_marca = ImageFont.truetype('/System/Library/Fonts/SFNS.ttf', 20)
        font_title = ImageFont.truetype('/System/Library/Fonts/SFNS.ttf', 22)
        font_sub = ImageFont.truetype('/System/Library/Fonts/SFNS.ttf', 15)
        font_badge = ImageFont.truetype('/System/Library/Fonts/SFNS.ttf', 13)
    except:
        font_marca = font_title = font_sub = font_badge = ImageFont.load_default()
        
    # Texto da Marca na faixa
    draw.text((bx + 20, by + 26), marca_upper, fill=(255, 255, 255), font=font_marca)
    
    # Linha divisória
    draw.line([bx + 20, by + 120, bx + box_w - 20, by + 120], fill=(241, 245, 249), width=2)
    
    # Nome do produto (quebra em 2 linhas se necessário)
    words = product.get('nombre', '').split()
    line1 = " ".join(words[:3])
    line2 = " ".join(words[3:6])
    draw.text((bx + 20, by + 140), line1, fill=(15, 23, 42), font=font_title)
    if line2:
        draw.text((bx + 20, by + 170), line2, fill=(15, 23, 42), font=font_title)
        
    # Dosagem / Apresentação
    qty = product.get('qty') or ''
    mg = product.get('mg') or ''
    spec = f"Apresentação: {qty} {mg}".strip()
    draw.text((bx + 20, by + 240), spec, fill=(100, 116, 139), font=font_sub)
    draw.text((bx + 20, by + 265), "Uso Subcutâneo / Oral", fill=(148, 163, 184), font=font_sub)
    
    # Selo de Verificação / Originalidade
    draw.rounded_rectangle([bx + 20, by + box_h - 75, bx + box_w - 20, by + box_h - 25], radius=8, fill=(240, 253, 244), outline=(187, 247, 208))
    draw.text((bx + 35, by + box_h - 60), "✓ PRODUTO ORIGINAL SELADO", fill=(22, 101, 52), font=font_badge)
    
    img.save(out_path, 'JPEG', quality=90)
    return True

def main():
    print("Iniciando processamento de fotos para 100% dos Emagrecedores...")
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    emag = [p for p in data['productos'] if (p.get('categoria') or '').lower().strip() in ['emagrecedores', 'queimador']]
    without_photo = [p for p in emag if not p.get('foto')]
    
    print(f"Total de emagrecedores: {len(emag)} | Sem foto: {len(without_photo)}")
    
    count_web = 0
    count_generated = 0
    
    for i, p in enumerate(without_photo, 1):
        pid = p['id']
        nome = p.get('nombre', '')
        marca = p.get('marca', '')
        out_file = os.path.join(FOTOS_DIR, f"producto-{pid}.jpg")
        
        # Gera termos de busca limpos
        clean_nome = re.sub(r'(\bx\b|\b\d+\s*vias\b|\bamp\b|\bjeringas?\b|\bpre\s*cargada\b)', ' ', nome, flags=re.I)
        query = f"{marca} {clean_nome}".strip()
        query = re.sub(r'\s+', ' ', query)
        
        print(f"[{i}/{len(without_photo)}] ID {pid}: {query}...")
        
        found = False
        urls = search_image_urls(query)
        for u in urls[:5]:
            if download_and_crop(u, out_file):
                found = True
                count_web += 1
                print(f"  -> Foto web baixada com sucesso!")
                break
                
        if not found:
            generate_pharma_packshot(p, out_file)
            count_generated += 1
            print(f"  -> Packshot farmacêutico padrão gerado!")
            
        p['foto'] = f"/api/foto/producto-{pid}.jpg"
        time.sleep(0.4)
        
    # Salva dados atualizados
    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        
    with open(DADOS_JS_PATH, 'w', encoding='utf-8') as f:
        f.write('window.SHAPETOTAL_RAW = ')
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write(';\n')
        
    print(f"\nConcluído com sucesso!")
    print(f"Fotos da web: {count_web}")
    print(f"Packshots padronizados: {count_generated}")
    print(f"Agora 100% dos {len(emag)} produtos de emagrecedores possuem foto!")

if __name__ == '__main__':
    main()
