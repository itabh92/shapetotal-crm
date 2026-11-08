#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gerador de Catálogo em PDF exclusivo de ANABOLIZANTES & SARMS.
Organizado por Marca igual ao site, com fotos 600x600, nome do medicamento,
apresentação e preços calculados na margem máxima (58% para anabolizantes e 60% para SARMs/HCG).
"""

import os
import json
import math
import shutil
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image as RLImage, PageBreak
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from PIL import Image as PILImage

BASE_DIR = '/Users/italosouza/Medicamentos/ShapeTotalCRM'
FOTOS_DIR = os.path.join(BASE_DIR, 'fotos')
JSON_PATH = os.path.join(BASE_DIR, 'catalogo_dados.json')
PDF_OUT = os.path.join(BASE_DIR, 'Catalogo_Anabolizantes_ShapeTotal.pdf')
DESKTOP_OUT = '/Users/italosouza/Desktop/Catalogo_Anabolizantes_ShapeTotal.pdf'
DOWNLOADS_OUT = '/Users/italosouza/Downloads/Catalogo_Anabolizantes_ShapeTotal.pdf'

BRAND_DISPLAY = {
    'LANDERLAN': '🧬 LANDERLAN (OFICIAL & GOLD)',
    'COOPER PHARMA': '💎 COOPER PHARMA (IMPORTADO)',
    'ZPHC': '⚡ ZPHC PHARMACEUTICALS',
    'KING FARMA': '👑 KING FARMA',
    'MUSCLE LABS': '💪 MUSCLE LABS / MUSCLE PHARMA',
    'DRAGON ELITE': '🐉 DRAGON ELITE',
    'EMINENCE LABS': '🔬 EMINENCE LABS',
    'PHARMACOM': '🧪 PHARMACOM LABS',
    'CANADA BIO LABS': '🍁 CANADA BIO LABS',
    'SPECTRUM': '⚡ SPECTRUM PHARMA',
    'R+ NEW GENERATION': '🔬 R+ NEW GENERATION',
    'ROYAL PHARMACEUTICA': '📦 ROYAL PHARMACEUTICA',
    'GENIQS PHARMA': '💎 GENIQS PHARMA',
    'PURETRIG': '💉 PURETRIG (HCG)',
    'CHORAGON': '💉 CHORAGON (HCG)',
    'BERGAMO': '🧬 BERGAMO'
}

BRAND_PRIORITY = [
    'LANDERLAN', 'COOPER PHARMA', 'ZPHC', 'KING FARMA', 'MUSCLE LABS',
    'DRAGON ELITE', 'EMINENCE LABS', 'PHARMACOM', 'CANADA BIO LABS',
    'SPECTRUM', 'R+ NEW GENERATION', 'ROYAL PHARMACEUTICA', 'GENIQS PHARMA'
]

def get_product_prices(p):
    usd = float(p.get('precio', 0) or 0)
    mult_custo = 5.60 * 1.30 # Dólar 5.60 + 30% frete
    custo = usd * mult_custo
    
    cat = (p.get('categoria') or '').lower().strip()
    if cat in ['sarms', 'post ciclo', 'hcg']:
        max_pct = 60 # 60% margem máxima
    else:
        max_pct = 58 # 58% margem máxima para anabolizantes
        
    preco_pix = math.ceil(custo * (1 + max_pct / 100))
    preco_cartao = preco_pix + 100
    return preco_pix, preco_cartao

def get_product_image(pid, max_w=95, max_h=95):
    img_path = os.path.join(FOTOS_DIR, f"producto-{pid}.jpg")
    if os.path.exists(img_path):
        try:
            with PILImage.open(img_path) as im:
                w, h = im.size
                ratio = min(max_w / w, max_h / h)
                return RLImage(img_path, width=w * ratio, height=h * ratio)
        except Exception:
            pass
    return None

def main():
    print("Iniciando geração do catálogo completo de Anabolizantes...")
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    anab_prods = []
    for p in data.get('productos', []):
        c = (p.get('categoria') or '').lower().strip()
        if c in ['anabolizante', 'sarms', 'post ciclo', 'hcg']:
            anab_prods.append(p)
            
    print(f"Total de produtos de Anabolizantes: {len(anab_prods)}")
    
    # Agrupa por Marca
    grouped = {}
    for p in anab_prods:
        b = (p.get('marca') or 'OUTRAS').upper().strip()
        if b not in grouped:
            grouped[b] = []
        grouped[b].append(p)
        
    for b in grouped:
        grouped[b].sort(key=lambda x: (
            -int(x.get('stock_cde', 0) or 0),
            x.get('nombre', '')
        ))

    styles = getSampleStyleSheet()
    
    brand_header_style = ParagraphStyle(
        'BrandHeader',
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=colors.HexColor('#052e16'),
        alignment=TA_LEFT
    )
    
    prod_name_style = ParagraphStyle(
        'ProdName',
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13.5,
        textColor=colors.HexColor('#0f172a')
    )
    
    prod_sub_style = ParagraphStyle(
        'ProdSub',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#64748b')
    )
    
    price_pix_style = ParagraphStyle(
        'PricePix',
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=14,
        textColor=colors.HexColor('#047857'),
        alignment=TA_RIGHT
    )
    
    price_cartao_style = ParagraphStyle(
        'PriceCartao',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#4338ca'),
        alignment=TA_RIGHT
    )
    
    price_parc_style = ParagraphStyle(
        'PriceParc',
        fontName='Helvetica',
        fontSize=7,
        leading=9,
        textColor=colors.HexColor('#64748b'),
        alignment=TA_RIGHT
    )

    doc = SimpleDocTemplate(
        PDF_OUT,
        pagesize=A4,
        leftMargin=26,
        rightMargin=26,
        topMargin=26,
        bottomMargin=26
    )
    
    story = []
    
    # Topbar
    topbar_data = [
        [
            Paragraph("<b>SHAPE TOTAL · CATÁLOGO OFICIAL 2026</b><br/><font size='8' color='#94a3b8'>LINHA COMPLETA ANABOLIZANTES, SARMS & PÓS-CICLO</font>", ParagraphStyle('TopL', fontName='Helvetica-Bold', fontSize=12, leading=14, textColor=colors.HexColor('#ffffff'))),
            Paragraph("<b>464 PRODUTOS OFICIAIS</b><br/><font size='8' color='#34d399'>Preços Máximos Tabelados · Pronta Entrega</font>", ParagraphStyle('TopR', fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=colors.HexColor('#10b981'), alignment=TA_RIGHT))
        ]
    ]
    t_topbar = Table(topbar_data, colWidths=[340, 203])
    t_topbar.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#0b1120')),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_topbar)
    story.append(Spacer(1, 10))
    
    # Aviso de Originalidade e Condições
    notice_data = [[
        Paragraph("<b>Garantia Shape Total:</b> Todos os produtos são 100% originais com QR Code e lote verificável diretamente no site do laboratório oficial. Pagamento seguro à vista no PIX com desconto ou Cartão de Crédito em até 6x sem juros.", ParagraphStyle('N1', fontName='Helvetica', fontSize=8.5, leading=12, textColor=colors.HexColor('#1e293b')))
    ]]
    t_notice = Table(notice_data, colWidths=[543])
    t_notice.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f1f5f9')),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_notice)
    story.append(Spacer(1, 12))
    
    sorted_brands = [b for b in BRAND_PRIORITY if b in grouped] + [b for b in grouped if b not in BRAND_PRIORITY]
    
    for brand_key in sorted_brands:
        prods = grouped[brand_key]
        if not prods:
            continue
            
        brand_label = BRAND_DISPLAY.get(brand_key, f"🏷️ {brand_key}")
        
        b_bar = Table([[
            Paragraph(f"<b>{brand_label}</b> ({len(prods)} itens)", brand_header_style)
        ]], colWidths=[543])
        b_bar.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#dcfce7')),
            ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#86efac')),
            ('TOPPADDING', (0,0), (-1,-1), 5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 5),
            ('LEFTPADDING', (0,0), (-1,-1), 10),
        ]))
        
        brand_flow = [b_bar, Spacer(1, 5)]
        
        for p in prods:
            pid = p['id']
            nome = p.get('nombre', '')
            qty = p.get('qty') or ''
            mg = p.get('mg') or ''
            spec = f"{qty} {mg}".strip()
            if not spec:
                spec = "Produto Original Selado"
                
            pix, cartao = get_product_prices(p)
            
            img_rl = get_product_image(pid, max_w=90, max_h=90)
            if not img_rl:
                img_cell = Paragraph(f"<font size='20'>💊</font><br/><font size='6.5' color='#94a3b8'>SHAPE TOTAL</font>", ParagraphStyle('NoImg', alignment=TA_CENTER))
            else:
                img_cell = img_rl
                
            info_cell = [
                Paragraph(f"<b>{nome}</b>", prod_name_style),
                Spacer(1, 1),
                Paragraph(f"<font color='#0284c7'><b>{brand_key}</b></font> · <font color='#64748b'>{spec}</font>", prod_sub_style)
            ]
            
            price_cell = [
                Paragraph(f"💠 <b>PIX: R$ {pix:,.2f}</b>", price_pix_style),
                Spacer(1, 1),
                Paragraph(f"💳 <b>Cartão: R$ {cartao:,.2f}</b>", price_cartao_style),
                Paragraph(f"até 6x de R$ {cartao/6:,.2f} s/ juros", price_parc_style)
            ]
            
            card = Table([[img_cell, info_cell, price_cell]], colWidths=[95, 298, 150])
            card.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#ffffff')),
                ('BOX', (0,0), (-1,-1), 0.8, colors.HexColor('#e2e8f0')),
                ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
                ('ALIGN', (0,0), (0,0), 'CENTER'),
                ('TOPPADDING', (0,0), (-1,-1), 4),
                ('BOTTOMPADDING', (0,0), (-1,-1), 4),
                ('LEFTPADDING', (0,0), (-1,-1), 5),
                ('RIGHTPADDING', (0,0), (-1,-1), 8),
            ]))
            
            brand_flow.append(card)
            brand_flow.append(Spacer(1, 4))
            
        story.extend(brand_flow)
        story.append(Spacer(1, 8))
        
    def add_footer(canvas, doc):
        canvas.saveState()
        canvas.setFont('Helvetica', 8)
        canvas.setFillColor(colors.HexColor('#64748b'))
        text = f"Shape Total · Catálogo Oficial de Anabolizantes & SARMs · Pronta Entrega · Página {doc.page}"
        canvas.drawCentredString(A4[0] / 2.0, 12, text)
        canvas.restoreState()
        
    print("Compilando PDF oficial de Anabolizantes...")
    doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)
    print(f"Sucesso! Catálogo gerado em: {PDF_OUT}")
    
    # Copia para Desktop e Downloads
    for dest in [DESKTOP_OUT, DOWNLOADS_OUT]:
        try:
            shutil.copy2(PDF_OUT, dest)
            print(f"Cópia salva em: {dest}")
        except Exception as e:
            print(f"Aviso ao copiar para {dest}: {e}")

if __name__ == '__main__':
    main()
