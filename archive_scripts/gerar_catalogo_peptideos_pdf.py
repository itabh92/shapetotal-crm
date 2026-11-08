#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gerador de Catálogo em PDF exclusivo de PEPTÍDEOS & HGH.
Organizado por Marca com fotos 600x600, nome do produto, composição,
apresentação e preços calculados na margem máxima (65% para peptídeos e HGH).
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
PDF_OUT = os.path.join(BASE_DIR, 'Catalogo_Peptideos_HGH_ShapeTotal.pdf')
DESKTOP_OUT = '/Users/italosouza/Desktop/Catalogo_Peptideos_HGH_ShapeTotal.pdf'
DOWNLOADS_OUT = '/Users/italosouza/Downloads/Catalogo_Peptideos_HGH_ShapeTotal.pdf'

BRAND_DISPLAY = {
    'ZPHC': '⚡ ZPHC PHARMACEUTICALS (LINHA COMPLETA)',
    'OXYGEN': '💎 OXYGEN PEPTIDES & HORMONES',
    'CHINA': '🔬 PEPTÍDEOS PURA MATÉRIA-PRIMA (IMPORTAÇÃO DIRETA)',
    'SIN MARCA': '🔬 PEPTÍDEOS PURA MATÉRIA-PRIMA (IMPORTAÇÃO DIRETA)',
    'GEN HEALTH': '🌿 GEN-HEALTH BIOTECH',
    'GENO PHARMA': '🧪 GENO PHARMA LABS',
    'NEO PEPTIDEO': '🧬 NEO PEPTIDES ADVANCED',
    'MUSCLE LABS': '💪 MUSCLE LABS / PLEXTROPIN GH',
    'SPECTRUM': '⚡ SPECTRUM PHARMA (SPECTRUS GH)',
    'BIONEXIS': '🖊️ BIONEXIS BIOTECH (CANETAS & FRASCOS)',
    'COOPER PHARMA': '💎 COOPER PHARMA (IMPORTADO)',
    'SYNEDICA': '🌟 SYNEDICA BIOTECH',
    'KIGTROPIN': '💉 KIGTROPIN HGH SOMATROPIN',
    'ALLUVI': '🔬 ALLUVI LABS',
    'PFIZER': '🏥 PFIZER (GENOTROPIN ORIGINAL)',
    'ETICOS': '📦 ETICOS PHARMA',
    'BRATVA': '🇷🇺 BRATVA LABS',
    'CANADA BIO LABS': '🍁 CANADA BIO LABS',
    'LANDERLAN': '🧬 LANDERLAN OFICIAL',
    'SANDOZ': '🏥 SANDOZ (OMNITROPE)',
    'USA PEPTIDES': '🇺🇸 USA PEPTIDES',
    'XL PEPTIDES': '🔬 XL PEPTIDES'
}

BRAND_PRIORITY = [
    'ZPHC', 'OXYGEN', 'CHINA', 'SIN MARCA', 'GEN HEALTH', 'GENO PHARMA',
    'NEO PEPTIDEO', 'MUSCLE LABS', 'SPECTRUM', 'BIONEXIS', 'COOPER PHARMA',
    'SYNEDICA', 'KIGTROPIN', 'PFIZER', 'ALLUVI', 'ETICOS', 'BRATVA',
    'CANADA BIO LABS', 'LANDERLAN', 'SANDOZ', 'USA PEPTIDES', 'XL PEPTIDES'
]

def get_product_prices(p):
    usd = float(p.get('precio', 0) or 0)
    mult_custo = 5.60 * 1.30 # Dólar 5.60 + 30% frete
    custo = usd * mult_custo
    
    max_pct = 65 # 65% margem máxima para Peptídeos e HGH
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
    print("Iniciando geração do catálogo completo de Peptídeos & HGH...")
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    pept_prods = []
    for p in data.get('productos', []):
        c = (p.get('categoria') or '').lower().strip()
        if c in ['peptideo', 'hgh'] or p.get('id') == 3214:
            pept_prods.append(p)
            
    print(f"Total de produtos de Peptídeos & HGH: {len(pept_prods)}")
    
    # Agrupa por Marca
    grouped = {}
    for p in pept_prods:
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
        textColor=colors.HexColor('#083344'),
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
        textColor=colors.HexColor('#0284c7'),
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
    
    # Topbar Biotech Style
    topbar_data = [
        [
            Paragraph("<b>SHAPE TOTAL · CATÁLOGO OFICIAL 2026</b><br/><font size='8' color='#94a3b8'>LINHA COMPLETA PEPTÍDEOS & HGH SOMATROPINA</font>", ParagraphStyle('TopL', fontName='Helvetica-Bold', fontSize=12, leading=14, textColor=colors.HexColor('#ffffff'))),
            Paragraph(f"<b>{len(pept_prods)} PRODUTOS OFICIAIS</b><br/><font size='8' color='#38bdf8'>Preços Máximos Tabelados · Alta Pureza 99%+</font>", ParagraphStyle('TopR', fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=colors.HexColor('#38bdf8'), alignment=TA_RIGHT))
        ]
    ]
    t_topbar = Table(topbar_data, colWidths=[340, 203])
    t_topbar.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#082f49')),
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
        Paragraph("<b>Garantia Shape Total Biotech:</b> Peptídeos liofilizados de alta pureza (99.5%+) e HGH Somatropina autêntica com lacre e certificação. Pagamento à vista no PIX com margem calculada ou Cartão de Crédito parcelado em até 6x sem juros.", ParagraphStyle('N1', fontName='Helvetica', fontSize=8.5, leading=12, textColor=colors.HexColor('#1e293b')))
    ]]
    t_notice = Table(notice_data, colWidths=[543])
    t_notice.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0f9ff')),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#bae6fd')),
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
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#e0f2fe')),
            ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#7dd3fc')),
            ('TOPPADDING', (0,0), (-1,-1), 5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 5),
            ('LEFTPADDING', (0,0), (-1,-1), 10),
        ]))
        
        brand_flow = [b_bar, Spacer(1, 5)]
        
        for p in prods:
            pix, cartao = get_product_prices(p)
            parc = round(cartao / 6, 2)
            
            nome = p.get('nombre') or 'Produto sem nome'
            comp = (p.get('composicion') or '').strip()
            pres = (p.get('presentacion') or '').strip()
            mg = (p.get('mg') or '').strip()
            cat = (p.get('categoria') or '').upper().strip()
            
            sub_parts = []
            if comp: sub_parts.append(f"<b>Princípio:</b> {comp.upper()}")
            if pres: sub_parts.append(f"<b>Formato:</b> {pres.upper()}")
            if mg: sub_parts.append(f"<b>Dose:</b> {mg.upper()}")
            sub_parts.append(f"<b>Linha:</b> {cat}")
            sub_text = " • ".join(sub_parts)
            
            stock_cde = int(p.get('stock_cde', 0) or 0)
            stock_badge = "<font color='#0284c7'><b>● DISPONÍVEL</b></font>" if stock_cde > 0 else "<font color='#64748b'>● SOB ENCOMENDA</font>"
            
            details_cell = [
                Paragraph(f"<b>{nome}</b>", prod_name_style),
                Spacer(1, 3),
                Paragraph(sub_text, prod_sub_style),
                Spacer(1, 2),
                Paragraph(f"{stock_badge} &nbsp;|&nbsp; <font color='#0f172a'>Cód #{p.get('id')}</font>", prod_sub_style)
            ]
            
            price_cell = [
                Paragraph(f"<font size='7' color='#0284c7'>À VISTA NO PIX</font><br/><b>R$ {pix:,d}</b>".replace(',', '.'), price_pix_style),
                Spacer(1, 2),
                Paragraph(f"<font size='6.5' color='#4338ca'>NO CARTÃO</font><br/><b>R$ {cartao:,d}</b>".replace(',', '.'), price_cartao_style),
                Paragraph(f"em até 6x de R$ {parc:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.'), price_parc_style)
            ]
            
            img_element = get_product_image(p.get('id'), max_w=85, max_h=85)
            if not img_element:
                img_element = Paragraph("<font size='8' color='#94a3b8'>[Foto Oficial<br/>Shape Total]</font>", ParagraphStyle('NoImg', alignment=TA_CENTER))
                
            row_data = [
                [img_element, details_cell, price_cell]
            ]
            
            t_prod = Table(row_data, colWidths=[90, 310, 143])
            t_prod.setStyle(TableStyle([
                ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
                ('ALIGN', (0,0), (0,0), 'CENTER'),
                ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#ffffff')),
                ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
                ('TOPPADDING', (0,0), (-1,-1), 4),
                ('BOTTOMPADDING', (0,0), (-1,-1), 4),
                ('LEFTPADDING', (0,0), (-1,-1), 6),
                ('RIGHTPADDING', (0,0), (-1,-1), 6),
            ]))
            
            brand_flow.append(t_prod)
            brand_flow.append(Spacer(1, 4))
            
        story.extend(brand_flow)
        story.append(Spacer(1, 8))
        
    print("Compilando PDF via ReportLab...")
    doc.build(story)
    print(f"PDF gerado com sucesso em: {PDF_OUT}")
    
    # Copia para Downloads e Desktop
    shutil.copy2(PDF_OUT, DOWNLOADS_OUT)
    print(f"Copiado para: {DOWNLOADS_OUT}")
    try:
        shutil.copy2(PDF_OUT, DESKTOP_OUT)
        print(f"Copiado para: {DESKTOP_OUT}")
    except Exception as e:
        print(f"Aviso ao copiar para Desktop: {e}")

if __name__ == '__main__':
    main()
