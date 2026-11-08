#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gerador de Catálogo em PDF exclusivo de ESTÉTICA, BOTOX, SAÚDE MENTAL & OUTROS.
Organizado por Seção Temática com fotos 600x600, nome do produto, composição,
apresentação e preços calculados na margem máxima (75% estética/botox/pele, 65% saúde mental, 70% potência/outros).
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
PDF_OUT = os.path.join(BASE_DIR, 'Catalogo_Esteticos_e_Outros_ShapeTotal.pdf')
DESKTOP_OUT = '/Users/italosouza/Desktop/Catalogo_Esteticos_e_Outros_ShapeTotal.pdf'
DOWNLOADS_OUT = '/Users/italosouza/Downloads/Catalogo_Esteticos_e_Outros_ShapeTotal.pdf'

def classify_section(p):
    c = (p.get('categoria') or '').lower().strip()
    n = (p.get('nombre') or '').lower()
    
    if c in ['estetico', 'botox'] or 'botox' in n or 'dysport' in n or 'botulax' in n or 'meditoxin' in n or 'nabota' in n or 'sculptra' in n or 'acido' in n or 'hialu' in n or 'fill' in n:
        return 'ESTETICA_BOTOX', '✨ HARMONIZAÇÃO, BOTOX & PREENCHEDORES'
    elif c in ['saude mental'] or 'zicartil' in n or 'lispax' in n or 'modafinil' in n or 'fluoxetina' in n or 'cognil' in n or 'modcop' in n:
        return 'SAUDE_MENTAL', '🧠 SAÚDE MENTAL, NOOTRÓPICOS & PERFORMANCE COGNITIVA'
    elif c in ['potencia sexual'] or 'tadala' in n or 'pramil' in n or 'ceebis' in n or 'digram' in n or 'erofast' in n:
        return 'POTENCIA_SEXUAL', '⚡ POTÊNCIA SEXUAL, VIGOR & CIRCULAÇÃO'
    elif c in ['anti acne', 'cosmetico', 'capilar'] or 'roacutan' in n or 'isotretinoina' in n or 'roas' in n or 'ghk-cu cream' in n or 'biotina' in n or 'biotidina' in n:
        return 'DERMATOLOGIA', '🌟 DERMATOLOGIA, ANTI-ACNE & CUIDADOS ESPECIAIS'
    elif c in ['cbd'] or 'cannabidiol' in n:
        return 'CBD', '🌿 CANNABIDIOL MEDICINAL (CBD)'
    else:
        return 'SUPORTE_OUTROS', '📦 SUPORTE, DILUENTES, APLICADORES & OUTROS'

SECTION_ORDER = [
    'ESTETICA_BOTOX',
    'SAUDE_MENTAL',
    'POTENCIA_SEXUAL',
    'DERMATOLOGIA',
    'CBD',
    'SUPORTE_OUTROS'
]

SECTION_COLORS = {
    'ESTETICA_BOTOX': ('#be185d', '#fdf2f8', '#fbcfe8'), # Rosa cosmético
    'SAUDE_MENTAL': ('#4338ca', '#eef2ff', '#c7d2fe'),   # Índigo neuro
    'POTENCIA_SEXUAL': ('#b91c1c', '#fef2f2', '#fecaca'), # Vermelho rubi
    'DERMATOLOGIA': ('#b45309', '#fffbeb', '#fde68a'),    # Âmbar derma
    'CBD': ('#15803d', '#f0fdf4', '#bbf7d0'),             # Verde botânico
    'SUPORTE_OUTROS': ('#334155', '#f8fafc', '#cbd5e1')   # Slate técnico
}

def get_product_prices(p):
    usd = float(p.get('precio', 0) or 0)
    mult_custo = 5.60 * 1.30 # Dólar 5.60 + 30% frete = 7.28
    custo = usd * mult_custo
    
    cat = (p.get('categoria') or '').lower().strip()
    if cat in ['estetico', 'botox', 'cosmetico', 'anti acne']:
        max_pct = 75 # 75% margem máxima para linha estética, botox e cosméticos
    elif cat in ['saude mental']:
        max_pct = 65 # 65% margem máxima para nootrópicos / saúde mental
    else:
        max_pct = 70 # 70% margem máxima para potência, capilar, diluentes, CBD e outros
        
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
    print("Iniciando geração do catálogo de Estética, Saúde Mental e Outros...")
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    anab_cats = {'anabolizante', 'sarms', 'post ciclo', 'hcg'}
    emag_cats = {'emagrecedores', 'queimador'}
    pept_cats = {'peptideo', 'hgh'}
    
    target_prods = []
    for p in data.get('productos', []):
        c = (p.get('categoria') or '').lower().strip()
        pid = p.get('id')
        if c in anab_cats and pid != 3214:
            continue
        if c in emag_cats:
            continue
        if c in pept_cats or pid == 3214:
            continue
        target_prods.append(p)
        
    print(f"Total de produtos selecionados: {len(target_prods)}")
    
    # Agrupa por Seção Temática
    grouped = {s: [] for s in SECTION_ORDER}
    section_titles = {}
    
    for p in target_prods:
        sec_key, sec_title = classify_section(p)
        grouped[sec_key].append(p)
        section_titles[sec_key] = sec_title
        
    for s in grouped:
        grouped[s].sort(key=lambda x: (
            -int(x.get('stock_cde', 0) or 0),
            x.get('nombre', '')
        ))

    styles = getSampleStyleSheet()
    
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
    
    # Topbar Elegante
    topbar_data = [
        [
            Paragraph("<b>SHAPE TOTAL · CATÁLOGO OFICIAL 2026</b><br/><font size='8' color='#94a3b8'>ESTÉTICA, HARMONIZAÇÃO, SAÚDE MENTAL & SUPORTE</font>", ParagraphStyle('TopL', fontName='Helvetica-Bold', fontSize=12, leading=14, textColor=colors.HexColor('#ffffff'))),
            Paragraph(f"<b>{len(target_prods)} PRODUTOS EXCLUSIVOS</b><br/><font size='8' color='#f472b6'>Preços Máximos Tabelados · Linha Premium</font>", ParagraphStyle('TopR', fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=colors.HexColor('#f472b6'), alignment=TA_RIGHT))
        ]
    ]
    t_topbar = Table(topbar_data, colWidths=[340, 203])
    t_topbar.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#1e1b4b')),
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
        Paragraph("<b>Padrão de Qualidade Shape Total:</b> Toxinas botulínicas, preenchedores, nootrópicos e medicamentos 100% autênticos de distribuidores credenciados. Pagamento com desconto à vista no PIX ou Cartão de Crédito parcelado em até 6x sem juros.", ParagraphStyle('N1', fontName='Helvetica', fontSize=8.5, leading=12, textColor=colors.HexColor('#1e293b')))
    ]]
    t_notice = Table(notice_data, colWidths=[543])
    t_notice.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_notice)
    story.append(Spacer(1, 12))
    
    for sec_key in SECTION_ORDER:
        prods = grouped[sec_key]
        if not prods:
            continue
            
        sec_title = section_titles.get(sec_key, sec_key)
        bar_text_color, bar_bg, bar_border = SECTION_COLORS.get(sec_key, ('#0f172a', '#f1f5f9', '#cbd5e1'))
        
        sec_header_style = ParagraphStyle(
            f'SecH_{sec_key}',
            fontName='Helvetica-Bold',
            fontSize=11,
            leading=14,
            textColor=colors.HexColor(bar_text_color),
            alignment=TA_LEFT
        )
        
        b_bar = Table([[
            Paragraph(f"<b>{sec_title}</b> ({len(prods)} itens)", sec_header_style)
        ]], colWidths=[543])
        b_bar.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor(bar_bg)),
            ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor(bar_border)),
            ('TOPPADDING', (0,0), (-1,-1), 5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 5),
            ('LEFTPADDING', (0,0), (-1,-1), 10),
        ]))
        
        sec_flow = [b_bar, Spacer(1, 5)]
        
        for p in prods:
            pix, cartao = get_product_prices(p)
            parc = round(cartao / 6, 2)
            
            nome = p.get('nombre') or 'Produto sem nome'
            comp = (p.get('composicion') or '').strip()
            pres = (p.get('presentacion') or '').strip()
            mg = (p.get('mg') or '').strip()
            marca = (p.get('marca') or '').upper().strip()
            
            sub_parts = []
            if marca: sub_parts.append(f"<b>Marca:</b> {marca}")
            if comp: sub_parts.append(f"<b>Princípio:</b> {comp.upper()}")
            if pres: sub_parts.append(f"<b>Formato:</b> {pres.upper()}")
            if mg: sub_parts.append(f"<b>Dose:</b> {mg.upper()}")
            sub_text = " • ".join(sub_parts)
            
            stock_cde = int(p.get('stock_cde', 0) or 0)
            stock_badge = "<font color='#047857'><b>● DISPONÍVEL</b></font>" if stock_cde > 0 else "<font color='#64748b'>● SOB ENCOMENDA</font>"
            
            details_cell = [
                Paragraph(f"<b>{nome}</b>", prod_name_style),
                Spacer(1, 3),
                Paragraph(sub_text, prod_sub_style),
                Spacer(1, 2),
                Paragraph(f"{stock_badge} &nbsp;|&nbsp; <font color='#0f172a'>Cód #{p.get('id')}</font>", prod_sub_style)
            ]
            
            price_cell = [
                Paragraph(f"<font size='7' color='#047857'>À VISTA NO PIX</font><br/><b>R$ {pix:,d}</b>".replace(',', '.'), price_pix_style),
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
            
            sec_flow.append(t_prod)
            sec_flow.append(Spacer(1, 4))
            
        story.extend(sec_flow)
        story.append(Spacer(1, 8))
        
    print("Compilando PDF via ReportLab...")
    doc.build(story)
    print(f"PDF gerado com sucesso em: {PDF_OUT}")

if __name__ == '__main__':
    main()
