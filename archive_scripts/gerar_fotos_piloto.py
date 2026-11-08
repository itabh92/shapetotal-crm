#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de busca e recorte automático para lote piloto de produtos sem foto.
Gera fotos quadradas 600x600 centralizadas e página de aprovação visual rápida.
"""
import urllib.request
import urllib.parse
import re
import io
import os
import json
import time
from PIL import Image

BASE_DIR = '/Users/italosouza/Medicamentos/ShapeTotalCRM'
OUT_DIR = os.path.join(BASE_DIR, 'fotos_piloto')
PREVIEW_HTML = os.path.join(BASE_DIR, 'fotos_piloto.html')
os.makedirs(OUT_DIR, exist_ok=True)

PILOT_ITEMS = [
    {"id": 660, "marca": "Landerlan", "nome": "Gold Durateston Plus 250mg 10ml", "query": "Landerlan Gold Durateston Plus 250mg 10ml"},
    {"id": 668, "marca": "Landerlan", "nome": "Decaland Depot 5ml 200mg", "query": "Landerlan Decaland Depot 5ml"},
    {"id": 2828, "marca": "ZPHC", "nome": "Testosterone Enanthate 400mg 10ml", "query": "ZPHC Test Enantato 400 10ml"},
    {"id": 2217, "marca": "ZPHC", "nome": "Nandrolone Decanoate 250mg 10ml", "query": "ZPHC Nandrolone Decanoate 250mg 10ml"},
    {"id": 2167, "marca": "ZPHC", "nome": "Trenbolone Acetate 100mg 10ml", "query": "ZPHC Trenbolone Acetate 100mg 10ml"},
    {"id": 2216, "marca": "ZPHC", "nome": "Testosterone Cypionate 250mg 10ml", "query": "ZPHC Testosterone Cypionate 250mg 10ml"},
    {"id": 227, "marca": "Cooper Pharma", "nome": "Clenbolic 50 comp 40mcg (Clenbuterol)", "query": "Cooper Pharma Clenbolic 40mcg"},
    {"id": 2544, "marca": "King Farma", "nome": "Masteron Slow Enantato 10ml 100mg", "query": "King Farma Masteron Slow 10ml"},
    {"id": 593, "marca": "King Farma", "nome": "Masteron Drostanolona 10ml", "query": "King Farma Masteron 10ml"},
    {"id": 616, "marca": "King Farma", "nome": "Testoviron Enantato Testo 10ml", "query": "King Farma Testoviron 10ml"},
    {"id": 611, "marca": "King Farma", "nome": "Sustan Durateston 10ml", "query": "King Farma Sustan 10ml"},
    {"id": 811, "marca": "Muscle Labs", "nome": "Primobolan 100mg 10ml", "query": "Muscle Pharma Primobolan 100mg 10ml"},
    {"id": 817, "marca": "Muscle Labs", "nome": "Sustan XT 250mg 10ml", "query": "Muscle Pharma Sustan XT 250mg 10ml"},
    {"id": 806, "marca": "Muscle Labs", "nome": "Masteron 100mg 10ml", "query": "Muscle Pharma Masteron 100mg 10ml"},
    {"id": 1929, "marca": "Quimfa", "nome": "Pramil Sildenafil 50mg 20 comp", "query": "Pramil Quimfa 50mg 20 comp"},
    {"id": 522, "marca": "Puretrig", "nome": "HCG Puretrig 5000 UI", "query": "HCG Puretrig 5000 UI"},
    {"id": 1483, "marca": "Aventis", "nome": "Lipostabil Fosfatidilcolina 5 amp", "query": "Lipostabil Aventis 5 ampollas"},
    {"id": 3014, "marca": "Synedica Labs", "nome": "Tirzepatida 60mg (4 ampolas x 15mg)", "query": "Synedica Labs Tirzepatida 60mg"},
    {"id": 3319, "marca": "Synedica Labs", "nome": "Retatrutide 120mg", "query": "Synedica Labs Retatrutide 120mg"},
    {"id": 3249, "marca": "Geniqs Pharma", "nome": "Sustangenic 250mg 10ml", "query": "Geniqs Pharma Sustangenic 250mg"},
    {"id": 329, "marca": "Eminence Labs", "nome": "Enaprime Testo Enantato 250mg 10 amp", "query": "Eminence Labs Enaprime 250mg"},
    {"id": 3288, "marca": "Spectrum", "nome": "PT-141 Pen 28mg Bremelanotida", "query": "Spectrum PT-141 Pen 28mg"},
    {"id": 2365, "marca": "Canada Bio Labs", "nome": "Trembolona Acetato 100mg 10ml", "query": "Canada Bio Labs Trenbolone Acetate 10ml"},
    {"id": 378, "marca": "Israderm", "nome": "Toxina Botulínica Botox 100 UI", "query": "Israderm Botox 100 UI"},
    {"id": 1973, "marca": "Israderm", "nome": "Toxina Botulínica Botox 150 UI", "query": "Israderm Botox 150 UI"}
]

def search_image_urls(query):
    url = f"https://www.bing.com/images/search?q={urllib.parse.quote_plus(query)}&FORM=HDRSC2"
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
    })
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            return re.findall(r'murl&quot;:&quot;(http[^&]+)&quot;', html)
    except Exception as e:
        print(f"Erro na busca de {query}: {e}")
        return []

def download_and_crop(url, out_path, size=600):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = resp.read()
            img = Image.open(io.BytesIO(data)).convert('RGB')
            w, h = img.size
            if w < 150 or h < 150:
                return False
            
            ratio = min((size - 40) / w, (size - 40) / h)
            nw, nh = int(w * ratio), int(h * ratio)
            resized = img.resize((nw, nh), Image.LANCZOS)
            
            # White canvas
            canvas = Image.new('RGB', (size, size), (255, 255, 255))
            canvas.paste(resized, ((size - nw) // 2, (size - nh) // 2))
            canvas.save(out_path, 'JPEG', quality=90)
            return True
    except Exception:
        return False

def generate_preview_page(results):
    html = [
        '<!DOCTYPE html>',
        '<html lang="pt-BR">',
        '<head>',
        '  <meta charset="UTF-8">',
        '  <title>Aprovação Visual — Lote Piloto de Fotos</title>',
        '  <style>',
        '    body { font-family: -apple-system, sans-serif; background: #0b1120; color: #f8fafc; padding: 20px; }',
        '    .header { text-align: center; margin-bottom: 24px; }',
        '    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; max-width: 1400px; margin: 0 auto; }',
        '    .card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; overflow: hidden; padding: 12px; text-align: center; }',
        '    .img-box { background: #fff; height: 220px; border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden; margin-bottom: 10px; }',
        '    .img-box img { max-width: 95%; max-height: 95%; object-fit: contain; }',
        '    .brand { font-size: 11px; color: #38bdf8; font-weight: 800; text-transform: uppercase; }',
        '    .name { font-size: 13px; font-weight: 700; margin: 4px 0 8px; min-height: 36px; }',
        '    .badge { display: inline-block; padding: 3px 8px; border-radius: 99px; font-size: 11px; font-weight: 700; }',
        '    .ok { background: #064e3b; color: #34d399; }',
        '    .fail { background: #7f1d1d; color: #fca5a5; }',
        '    .btn-approve { background: #10b981; color: #052e16; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 800; cursor: pointer; margin-top: 16px; font-size: 14px; }',
        '  </style>',
        '</head>',
        '<body>',
        '  <div class="header">',
        '    <h1>🔬 Aprovação Visual · Lote Piloto (Top 25)</h1>',
        '    <p style="color:#94a3b8;">Confira as fotos encontradas e recortadas pelo robô antes de publicar no catálogo oficial.</p>',
        f'    <div style="margin-top:12px;"><span class="badge ok">{sum(1 for r in results if r["success"])} Encontradas</span> <span class="badge fail">{sum(1 for r in results if not r["success"])} Pendentes</span></div>',
        '  </div>',
        '  <div class="grid">'
    ]
    
    for r in results:
        if r['success']:
            img_tag = f'<img src="fotos_piloto/producto-{r["id"]}.jpg" alt="{r["nome"]}" />'
            status = '<span class="badge ok">✓ Foto Recortada</span>'
        else:
            img_tag = '<span style="color:#64748b; font-size:12px;">Sem imagem compatível</span>'
            status = '<span class="badge fail">✗ Não encontrada</span>'
            
        html.append(f'''
        <div class="card">
          <div class="img-box">{img_tag}</div>
          <div class="brand">{r["marca"]} · ID {r["id"]}</div>
          <div class="name">{r["nome"]}</div>
          <div>{status}</div>
        </div>
        ''')
        
    html.extend([
        '  </div>',
        '</body>',
        '</html>'
    ])
    
    with open(PREVIEW_HTML, 'w', encoding='utf-8') as f:
        f.write('\n'.join(html))

def main():
    print(f"Iniciando busca do lote piloto para {len(PILOT_ITEMS)} produtos...")
    results = []
    
    for item in PILOT_ITEMS:
        item_id = item['id']
        query = item['query']
        out_file = os.path.join(OUT_DIR, f"producto-{item_id}.jpg")
        
        print(f"[{item_id}] Buscando: {query}...")
        urls = search_image_urls(query)
        success = False
        
        for u in urls[:6]:
            if download_and_crop(u, out_file):
                print(f"  -> Sucesso com: {u[:70]}...")
                success = True
                break
                
        results.append({
            "id": item_id,
            "marca": item["marca"],
            "nome": item["nome"],
            "success": success
        })
        time.sleep(1) # pausa educada
        
    generate_preview_page(results)
    print("\nLote piloto concluído!")
    print(f"Página de conferência gerada em: {PREVIEW_HTML}")

if __name__ == '__main__':
    main()
