#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gera o catálogo oficial em PDF exclusivo de TIRZEPATIDAS para clientes.
Organização idêntica ao site: cabeçalhos por marca, foto nítida de cada produto,
nome do medicamento, apresentação e preços (fixos oficiais e margem máxima de 55%).
"""

import os
import json
import math
import shutil
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image as RLImage, PageBreak, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from PIL import Image as PILImage

BASE_DIR = '/Users/italosouza/Medicamentos/ShapeTotalCRM'
FOTOS_DIR = os.path.join(BASE_DIR, 'fotos')
JSON_PATH = os.path.join(BASE_DIR, 'catalogo_dados.json')
PDF_OUT = os.path.join(BASE_DIR, 'Catalogo_Tirzepatida_ShapeTotal.pdf')

# Tabela Oficial de Preços Fixos e Ajustes de Margem
SPECIAL_FIXED = {
    # Linha 60 mg / 4 vias x 15 mg / MD 15 mg -> Pix: 900, Cartão: 1000
    2848: (900, 1000), 3207: (900, 1000), 2889: (900, 1000), 2988: (900, 1000),
    3072: (900, 1000), 2997: (900, 1000), 2996: (900, 1000), 3308: (900, 1000),
    3381: (900, 1000), 3039: (900, 1000), 3136: (900, 1000), 3203: (900, 1000),
    446:  (900, 1000), 3389: (900, 1000), 3014: (900, 1000), 3392: (900, 1000),
    3271: (900, 1000), 2877: (900, 1000), 2765: (900, 1000), 3186: (900, 1000),
    
    # Spectrum 60mg (Importado alto custo USD 130 -> Margem 55%)
    3149: (1467, 1567),
    
    # Ampolas avulsas 15 mg
    2875: (250, 300), 3008: (250, 300),
    2763: (450, 550), # Gen-Tirz 15mg ajustado
    3206: (735, 835)  # Pharmacom Jaros 15mg importado ajustado
}

# Nomes comerciais mais limpos e elegantes das marcas
BRAND_DISPLAY = {
    'LANDERLAN': '🧬 LANDERLAN (LIPOLAND)',
    'ETICOS': '💎 ÉTICOS (LIPOLESS & SLIMEX)',
    'INDUFAR': '🔬 INDUFAR (TG TIRZEPATIDA)',
    'QUIMFA': '📦 QUIMFA (TIRZEC)',
    'LILLY': '👑 ELI LILLY (MOUNJARO ORIGINAL)',
    'CATEDRAL': '🧪 CATEDRAL (T36 & TIRZEDRAL)',
    'ZPHC': '⚡ ZPHC PHARMACEUTICALS',
    'LASCA': '💠 LASCA (GLUCONEX)',
    'OXYGEN': '🧬 OXYGEN LABS (TIRZEGEN)',
    'SYNEDICA': '🔬 SYNEDICA LABS',
    'VELTRANE': '💎 VELTRANE LABS',
    'SPECTRUM': '⚡ SPECTRUM PHARMA (MOUNJAOS)',
    'PHARMACOM': '🧪 PHARMACOM LABS (JAROS)',
    'GEN HEALTH': '🧬 GEN-HEALTH (GEN-TIRZ)',
    'ROYAL PHARMACEUTICA': '📦 ROYAL PHARMA',
    'CHINA': '🌐 LINHA DIRETA (IMPORTAÇÃO)'
}

# Ordem de prioridade das marcas no catálogo
BRAND_ORDER = [
    'LILLY', 'LANDERLAN', 'INDUFAR', 'QUIMFA', 'ETICOS', 'CATEDRAL', 
    'ZPHC', 'LASCA', 'OXYGEN', 'SYNEDICA', 'VELTRANE', 'SPECTRUM', 
    'PHARMACOM', 'GEN HEALTH', 'ROYAL PHARMACEUTICA', 'CHINA'
]

def get_product_prices(p):
    pid = p['id']
    usd = float(p.get('precio', 0) or 0)
    custo = usd * 5.60 * 1.30
    if pid in SPECIAL_FIXED:
        pix, cartao = SPECIAL_FIXED[pid]
        is_fixed = True
    else:
        # Margem máxima de 55%
        pix = math.ceil(custo * 1.55)
        cartao = pix + 100
        is_fixed = False
    return pix, cartao, is_fixed

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
    print("Iniciando geração do catálogo de Tirzepatidas...")
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    all_prods = data.get('productos', [])
    tirz_prods = []
    
    for p in all_prods:
        txt = f"{p.get('nombre', '')} {p.get('composicion', '')} {p.get('marca', '')}".lower()
        if 'tirz' in txt or 'mounjaro' in txt or 'lipoless' in txt or 'lipoland' in txt or 'gluconex' in txt or 't36' in txt or ('tg' in txt and 'indufar' in txt):
            tirz_prods.append(p)
            
    print(f"Total de produtos selecionados: {len(tirz_prods)}")
    
    # Agrupa por Marca conforme ordem definida
    grouped = {}
    for p in tirz_prods:
        b = (p.get('marca') or 'OUTRAS').upper().strip()
        if b not in grouped:
            grouped[b] = []
        grouped[b].append(p)
        
    # Ordena produtos dentro de cada marca (os de 60mg e mais vendidos primeiro)
    for b in grouped:
        grouped[b].sort(key=lambda x: (
            0 if x['id'] in SPECIAL_FIXED else 1,
            -int(x.get('stock_cde', 0) or 0),
            x.get('nombre', '')
        ))

    # Estilos
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
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#0f172a')
    )
    
    prod_sub_style = ParagraphStyle(
        'ProdSub',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#64748b')
    )
    
    price_pix_style = ParagraphStyle(
        'PricePix',
        fontName='Helvetica-Bold',
        fontSize=12.5,
        leading=15,
        textColor=colors.HexColor('#047857'),
        alignment=TA_RIGHT
    )
    
    price_cartao_style = ParagraphStyle(
        'PriceCartao',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.HexColor('#4338ca'),
        alignment=TA_RIGHT
    )
    
    price_parc_style = ParagraphStyle(
        'PriceParc',
        fontName='Helvetica',
        fontSize=7.5,
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
    
    # ==================== BANNER TOPO CAPA ====================
    topbar_data = [
        [
            Paragraph("<b>SHAPE TOTAL · CATÁLOGO EXCLUSIVO</b><br/><font size='8' color='#94a3b8'>TABELA DE PREÇOS OFICIAL · PRONTA ENTREGA</font>", ParagraphStyle('TopL', fontName='Helvetica-Bold', fontSize=12, leading=14, textColor=colors.HexColor('#ffffff'))),
            Paragraph("<b>LINHA COMPLETA TIRZEPATIDA</b><br/><font size='8' color='#34d399'>Duplo Agonista GLP-1 + GIP</font>", ParagraphStyle('TopR', fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=colors.HexColor('#10b981'), alignment=TA_RIGHT))
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
    story.append(Spacer(1, 12))
    
    # Resumo das Condições Comerciais em destaque
    summary_data = [
        [
            Paragraph("<b>📦 LINHA 60 MG (4 VIAS / MD)</b><br/><font size='8' color='#475569'>TG, Tirzec, Lipoless, Lipoland, T36, Gluconex, Slimex, Oxygen, Veltrane...<br/>Duração de até 6 meses</font>", styles['Normal']),
            Paragraph("<b>PIX: R$ 900,00</b><br/><font size='8' color='#4338ca'>Cartão: R$ 1.000,00 em até 6x</font>", ParagraphStyle('P1', fontName='Helvetica-Bold', fontSize=10.5, textColor=colors.HexColor('#047857'), alignment=TA_RIGHT))
        ],
        [
            Paragraph("<b>💉 AMPOLAS AVULSAS 15 MG</b><br/><font size='8' color='#475569'>Frascos avulsos (ZPHC, Pharmacom, Gen-Tirz, Sin Marca)</font>", styles['Normal']),
            Paragraph("<b>PIX: R$ 250,00 cada</b><br/><font size='8' color='#4338ca'>Cartão: R$ 300,00 em até 6x</font>", ParagraphStyle('P2', fontName='Helvetica-Bold', fontSize=10.5, textColor=colors.HexColor('#047857'), alignment=TA_RIGHT))
        ]
    ]
    t_summary = Table(summary_data, colWidths=[360, 183])
    t_summary.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_summary)
    story.append(Spacer(1, 14))
    
    # Itera pelas marcas na ordem prioritária
    sorted_brands = [b for b in BRAND_ORDER if b in grouped] + [b for b in grouped if b not in BRAND_ORDER]
    
    for brand_key in sorted_brands:
        prods = grouped[brand_key]
        if not prods:
            continue
            
        brand_label = BRAND_DISPLAY.get(brand_key, f"🏷️ {brand_key}")
        
        # Barra da Marca
        b_bar = Table([[
            Paragraph(f"<b>{brand_label}</b> ({len(prods)} itens disponíveis)", brand_header_style)
        ]], colWidths=[543])
        b_bar.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#dcfce7')),
            ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#86efac')),
            ('TOPPADDING', (0,0), (-1,-1), 5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 5),
            ('LEFTPADDING', (0,0), (-1,-1), 10),
        ]))
        
        brand_flowables = [b_bar, Spacer(1, 6)]
        
        for p in prods:
            pid = p['id']
            nome = p.get('nombre', '')
            qty = p.get('qty') or ''
            mg = p.get('mg') or ''
            spec = f"Apresentação: {qty} {mg}".strip()
            if spec == "Apresentação:":
                spec = "Uso Subcutâneo · Original com QR Code"
                
            pix, cartao, is_fixed = get_product_prices(p)
            
            # Foto
            img_rl = get_product_image(pid, max_w=95, max_h=95)
            if not img_rl:
                img_cell = Paragraph(f"<font size='22'>🧬</font><br/><font size='7' color='#94a3b8'>SHAPE TOTAL</font>", ParagraphStyle('NoImg', alignment=TA_CENTER))
            else:
                img_cell = img_rl
                
            # Detalhes
            fixed_tag = " · <font color='#047857'><b>VALOR FIXO OFICIAL</b></font>" if is_fixed else ""
            desc_text = p.get('desc_comercial') or "Tirzepatida oficial lacrada para controle glicêmico e queima de gordura."
            
            info_cell = [
                Paragraph(f"<b>{nome}</b>", prod_name_style),
                Spacer(1, 2),
                Paragraph(f"<font color='#0284c7'><b>{brand_key}</b></font>{fixed_tag} · <font color='#64748b'>{spec}</font>", prod_sub_style),
                Spacer(1, 2),
                Paragraph(desc_text, prod_sub_style)
            ]
            
            # Box de Preço
            price_cell = [
                Paragraph(f"💠 <b>PIX: R$ {pix:,.2f}</b>", price_pix_style),
                Spacer(1, 2),
                Paragraph(f"💳 <b>Cartão: R$ {cartao:,.2f}</b>", price_cartao_style),
                Paragraph(f"em até 6x de R$ {cartao/6:,.2f} s/ juros", price_parc_style)
            ]
            
            card = Table([[img_cell, info_cell, price_cell]], colWidths=[105, 278, 160])
            card.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#ffffff')),
                ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#e2e8f0')),
                ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
                ('ALIGN', (0,0), (0,0), 'CENTER'),
                ('TOPPADDING', (0,0), (-1,-1), 5),
                ('BOTTOMPADDING', (0,0), (-1,-1), 5),
                ('LEFTPADDING', (0,0), (-1,-1), 6),
                ('RIGHTPADDING', (0,0), (-1,-1), 8),
            ]))
            
            brand_flowables.append(card)
            brand_flowables.append(Spacer(1, 5))
            
        story.extend(brand_flowables)
        story.append(Spacer(1, 8))
        
    def add_footer(canvas, doc):
        canvas.saveState()
        canvas.setFont('Helvetica', 8)
        canvas.setFillColor(colors.HexColor('#64748b'))
        text = f"Shape Total · Catálogo Oficial de Tirzepatidas · Pedidos via WhatsApp · Pronta Entrega · Página {doc.page}"
        canvas.drawCentredString(A4[0] / 2.0, 12, text)
        canvas.restoreState()
        
    print("Compilando PDF oficial de Tirzepatidas...")
    doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)
    print(f"Sucesso! Catálogo gerado em: {PDF_OUT}")

if __name__ == '__main__':
    main()
