#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gerador de Catálogo Profissional em PDF exclusivo para Tirzepatidas.
Utiliza ReportLab com design visual premium, fotos em alta resolução,
preços fixos oficiais e margem máxima de 55% para os demais produtos.
"""

import os
import json
import math
import shutil
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image as RLImage, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from PIL import Image as PILImage

BASE_DIR = '/Users/italosouza/Medicamentos/ShapeTotalCRM'
FOTOS_DIR = os.path.join(BASE_DIR, 'fotos')
JSON_PATH = os.path.join(BASE_DIR, 'catalogo_dados.json')
PDF_OUT = os.path.join(BASE_DIR, 'Catalogo_Tirzepatida_ShapeTotal.pdf')
DESKTOP_OUT = '/Users/italosouza/Desktop/Catalogo_Tirzepatida_ShapeTotal.pdf'

SPECIAL_FIXED = {
    # Linha 60 mg / 4 vias x 15 mg / MD 15 mg -> Pix: 900, Cartão: 1000
    2848: (900, 1000, "TG 60mg (4 vias x 15mg) Indufar"),
    3207: (900, 1000, "Tirzec 60mg (4 vias x 15mg) Quimfa"),
    2889: (900, 1000, "Lipoless 60mg (4 vias x 15mg) Éticos"),
    2988: (900, 1000, "Lipoland 60mg (4 vias x 15mg) Landerlan"),
    3072: (900, 1000, "Lipoland MD 15mg Landerlan"),
    2997: (900, 1000, "Lipoless MD 15mg Éticos"),
    2996: (900, 1000, "Tirzec MD 15mg Quimfa"),
    3308: (900, 1000, "T36 MD 15mg Catedral"),
    3381: (900, 1000, "T36 60mg (4 vias x 15mg) Catedral"),
    3039: (900, 1000, "Gluconex 60mg (4 vias x 15mg) Lasca"),
    3136: (900, 1000, "Tirzedral 60mg (4 vias x 15mg) Catedral"),
    3203: (900, 1000, "Tirzedral MD 15mg Catedral"),
    446:  (900, 1000, "Lipoless 15mg x 4 Jer Pré-Cargada Éticos"),
    3389: (900, 1000, "Slimex 60mg (4 vias x 15mg) Éticos"),
    3014: (900, 1000, "Synedica Labs Tirzepatida 60mg (4 vias)"),
    3392: (900, 1000, "Oxygen Tirzegen 60mg (4 vias)"),
    3271: (900, 1000, "Oxygen Tirzegen 60mg Polvo"),
    2877: (900, 1000, "Tirzepatida 60mg Sin Marca"),
    3149: (900, 1000, "Spectrum Mounjaos 60mg"),
    2765: (900, 1000, "Gen-Tirz 60mg Gen Health"),
    3186: (900, 1000, "Veltrane Tirzepatide 60mg"),
    # Ampolas avulsas 15 mg -> Pix: 250, Cartão: 300
    3206: (250, 300, "Pharmacom Jaros Tirzepatida 15mg 1 Vial"),
    2763: (250, 300, "Gen-Tirz 15mg 1 Vial"),
    2875: (250, 300, "Tirzepatida 15mg 1 Vial Sin Marca"),
    3008: (250, 300, "ZPHC Tirzepatide 15mg 1 Vial")
}

def get_product_prices(p):
    pid = p['id']
    usd = float(p.get('precio', 0) or 0)
    custo = usd * 5.60 * 1.30
    if pid in SPECIAL_FIXED:
        pix, cartao, label = SPECIAL_FIXED[pid]
        is_fixed = True
    else:
        pix = math.ceil(custo * 1.55)
        cartao = pix + 100
        is_fixed = False
    return pix, cartao, is_fixed

def get_product_image(pid, max_w=125, max_h=135):
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

def create_catalog_pdf():
    print("Carregando banco de dados...")
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    all_prods = data.get('productos', [])
    tirz_prods = []
    
    for p in all_prods:
        txt = f"{p.get('nombre', '')} {p.get('composicion', '')} {p.get('marca', '')}".lower()
        if 'tirz' in txt or 'mounjaro' in txt or 'lipoless' in txt or 'lipoland' in txt or 'gluconex' in txt or 't36' in txt or ('tg' in txt and 'indufar' in txt):
            tirz_prods.append(p)
            
    print(f"Total de Tirzepatidas identificadas: {len(tirz_prods)}")
    
    # Separação por seções
    sec1_60mg = []
    sec2_15mg = []
    sec3_outros = []
    
    for p in tirz_prods:
        pid = p['id']
        nome = (p.get('nombre') or '').lower()
        if pid in SPECIAL_FIXED:
            if SPECIAL_FIXED[pid][0] == 900:
                sec1_60mg.append(p)
            elif SPECIAL_FIXED[pid][0] == 250:
                sec2_15mg.append(p)
            else:
                sec3_outros.append(p)
        else:
            sec3_outros.append(p)
            
    # Ordenações internas
    sec1_60mg.sort(key=lambda x: (x.get('marca') or '', x.get('nombre') or ''))
    sec2_15mg.sort(key=lambda x: (x.get('marca') or '', x.get('nombre') or ''))
    sec3_outros.sort(key=lambda x: (x.get('marca') or '', x.get('nombre') or ''))
    
    # Configuração de Estilos ReportLab
    styles = getSampleStyleSheet()
    
    title_cover = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=26,
        leading=32,
        textColor=colors.HexColor('#0f172a'),
        alignment=TA_CENTER
    )
    
    sub_cover = ParagraphStyle(
        'CoverSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=13,
        leading=18,
        textColor=colors.HexColor('#475569'),
        alignment=TA_CENTER
    )
    
    sec_title = ParagraphStyle(
        'SecTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=18,
        textColor=colors.HexColor('#ffffff'),
        alignment=TA_LEFT
    )
    
    sec_sub = ParagraphStyle(
        'SecSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#cbd5e1'),
        alignment=TA_LEFT
    )
    
    prod_name_style = ParagraphStyle(
        'ProdName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=colors.HexColor('#0f172a')
    )
    
    prod_brand_style = ParagraphStyle(
        'ProdBrand',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#0284c7')
    )
    
    prod_desc_style = ParagraphStyle(
        'ProdDesc',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#475569')
    )
    
    price_pix_style = ParagraphStyle(
        'PricePix',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=14,
        textColor=colors.HexColor('#047857')
    )
    
    price_card_style = ParagraphStyle(
        'PriceCard',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=colors.HexColor('#4338ca')
    )
    
    price_sub_style = ParagraphStyle(
        'PriceSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=9,
        textColor=colors.HexColor('#64748b')
    )
    
    doc = SimpleDocTemplate(
        PDF_OUT,
        pagesize=A4,
        leftMargin=28,
        rightMargin=28,
        topMargin=28,
        bottomMargin=28
    )
    
    story = []
    
    # ==================== CAPA ====================
    # Banner Topo
    badge_data = [[
        Paragraph("<b>SHAPE TOTAL · DISTRIBUIÇÃO FARMACÊUTICA</b>", ParagraphStyle('B1', fontName='Helvetica-Bold', fontSize=10, textColor=colors.HexColor('#10b981'), alignment=TA_CENTER)),
    ]]
    t_badge = Table(badge_data, colWidths=[539])
    t_badge.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#0b1120')),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ]))
    story.append(t_badge)
    story.append(Spacer(1, 18))
    
    story.append(Paragraph("CATÁLOGO OFICIAL 2026<br/><font color='#10b981'>LINHA TIRZEPATIDA (GLP-1 + GIP)</font>", title_cover))
    story.append(Spacer(1, 10))
    story.append(Paragraph("O duplo agonista mais potente do mundo para emagrecimento, queima de gordura visceral e saciedade prolongada com segurança clínica.", sub_cover))
    story.append(Spacer(1, 18))
    
    # Tabela Resumo da Oferta na Capa
    intro_table_data = [
        [
            Paragraph("<b>📦 LINHA 60 MG (4 VIAS / MD)</b><br/><font size='8' color='#475569'>TG, Tirzec, Lipoless, Lipoland, T36, Gluconex, Slimex, Oxygen, Veltrane, Gen-Tirz<br/>Duração de até 6 meses de protocolo</font>", styles['Normal']),
            Paragraph("<b>PIX: R$ 900,00</b><br/><font size='8' color='#4338ca'>Cartão: R$ 1.000,00 em até 6x de R$ 166,67</font>", ParagraphStyle('R1', alignment=TA_RIGHT, fontName='Helvetica-Bold', fontSize=10, textColor=colors.HexColor('#047857')))
        ],
        [
            Paragraph("<b>💉 AMPOLAS AVULSAS 15 MG</b><br/><font size='8' color='#475569'>Frascos individuais para início ou manutenção de dose</font>", styles['Normal']),
            Paragraph("<b>PIX: R$ 250,00</b><br/><font size='8' color='#4338ca'>Cartão: R$ 300,00 em até 6x de R$ 50,00</font>", ParagraphStyle('R2', alignment=TA_RIGHT, fontName='Helvetica-Bold', fontSize=10, textColor=colors.HexColor('#047857')))
        ],
        [
            Paragraph("<b>🧬 CANETAS & DOSAGENS ESPECIAIS</b><br/><font size='8' color='#475569'>Mounjaro Lilly original, Canetas Tirzec, Doses 2.5mg a 12.5mg e Super Kits ZPHC</font>", styles['Normal']),
            Paragraph("<b>Valores no Catálogo</b><br/><font size='8' color='#64748b'>Preços tabelados com margem máxima</font>", ParagraphStyle('R3', alignment=TA_RIGHT, fontName='Helvetica-Bold', fontSize=9, textColor=colors.HexColor('#0f172a')))
        ]
    ]
    t_intro = Table(intro_table_data, colWidths=[360, 179])
    t_intro.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_intro)
    story.append(Spacer(1, 24))
    
    def render_section_header(title, subtitle, bg_color='#0b1120'):
        h_data = [[
            Paragraph(f"<b>{title}</b>", sec_title),
            Paragraph(subtitle, sec_sub)
        ]]
        t_sec = Table(h_data, colWidths=[300, 239])
        t_sec.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor(bg_color)),
            ('TOPPADDING', (0,0), (-1,-1), 8),
            ('BOTTOMPADDING', (0,0), (-1,-1), 8),
            ('LEFTPADDING', (0,0), (-1,-1), 10),
            ('RIGHTPADDING', (0,0), (-1,-1), 10),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ]))
        return t_sec
        
    def render_product_card(p):
        pid = p['id']
        nome = p.get('nombre', '')
        marca = (p.get('marca') or 'SHAPE TOTAL').upper()
        qty = p.get('qty') or ''
        mg = p.get('mg') or ''
        spec = f"Apresentação: {qty} {mg}".strip()
        if spec == "Apresentação:":
            spec = "Uso Subcutâneo · Caixa Lacrada Original"
            
        pix, cartao, is_fixed = get_product_prices(p)
        
        # Imagem
        img_rl = get_product_image(pid, max_w=115, max_h=120)
        if not img_rl:
            img_cell = Paragraph(f"<font size='28'>🧬</font><br/><font size='7' color='#64748b'>{marca}</font>", ParagraphStyle('NoImg', alignment=TA_CENTER))
        else:
            img_cell = img_rl
            
        # Descrição comercial resumida
        desc = p.get('desc_comercial') or (
            "Duplo agonista dos receptores GLP-1 e GIP. Atua no retardo do esvaziamento gástrico, "
            "controle metabólico e redução profunda da fome com excelente preservação muscular."
        )
        
        fixed_badge = " · <font color='#047857'><b>PREÇO OFICIAL FIXO</b></font>" if is_fixed else ""
        
        info_flow = [
            Paragraph(f"<b>{marca}</b>{fixed_badge}", prod_brand_style),
            Spacer(1, 2),
            Paragraph(f"<b>{nome}</b>", prod_name_style),
            Spacer(1, 2),
            Paragraph(f"<font color='#64748b'><b>{spec}</b></font>", prod_desc_style),
            Spacer(1, 3),
            Paragraph(desc, prod_desc_style),
            Spacer(1, 6),
            # Caixa de Preço
            Table([
                [
                    Paragraph(f"💠 <b>PIX: R$ {pix:,.2f}</b>", price_pix_style),
                    Paragraph(f"💳 <b>CARTÃO: R$ {cartao:,.2f}</b><br/><font color='#64748b' size='6.5'>até 6x de R$ {cartao/6:,.2f} s/ juros</font>", price_card_style)
                ]
            ], colWidths=[180, 200], style=[
                ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f1f5f9')),
                ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
                ('TOPPADDING', (0,0), (-1,-1), 4),
                ('BOTTOMPADDING', (0,0), (-1,-1), 4),
                ('LEFTPADDING', (0,0), (-1,-1), 6),
                ('RIGHTPADDING', (0,0), (-1,-1), 6),
                ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ])
        ]
        
        card_table = Table([[img_cell, info_flow]], colWidths=[130, 409])
        card_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#ffffff')),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#e2e8f0')),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('ALIGN', (0,0), (0,0), 'CENTER'),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ]))
        return card_table

    # ==================== SEÇÃO 1 ====================
    story.append(render_section_header("📦 SEÇÃO 1 · LINHA 60 MG (4 VIAS & MULTIDOSE)", "💠 Pix: R$ 900,00 | 💳 Cartão: R$ 1.000,00", '#064e3b'))
    story.append(Spacer(1, 8))
    
    for p in sec1_60mg:
        story.append(render_product_card(p))
        story.append(Spacer(1, 6))
        
    # ==================== SEÇÃO 2 ====================
    story.append(PageBreak())
    story.append(render_section_header("💉 SEÇÃO 2 · AMPOLAS AVULSAS 15 MG", "💠 Pix: R$ 250,00 cada | 💳 Cartão: R$ 300,00 cada", '#1e1b4b'))
    story.append(Spacer(1, 8))
    
    for p in sec2_15mg:
        story.append(render_product_card(p))
        story.append(Spacer(1, 6))
        
    # ==================== SEÇÃO 3 ====================
    story.append(PageBreak())
    story.append(render_section_header("🧬 SEÇÃO 3 · CANETAS, DOSES ESPECIAIS & KITS", "Preços calculados na Margem Máxima de Mercado", '#0f172a'))
    story.append(Spacer(1, 8))
    
    for p in sec3_outros:
        story.append(render_product_card(p))
        story.append(Spacer(1, 6))
        
    # ==================== RODAPÉ GERAL ====================
    def add_page_decorations(canvas, doc):
        canvas.saveState()
        canvas.setFont('Helvetica', 8)
        canvas.setFillColor(colors.HexColor('#64748b'))
        # Footer
        footer_text = f"Shape Total · Catálogo Confidencial de Preços · Pronta Entrega · Página {doc.page}"
        canvas.drawCentredString(A4[0] / 2.0, 14, footer_text)
        canvas.restoreState()
        
    print("Compilando arquivo PDF...")
    doc.build(story, onFirstPage=add_page_decorations, onLaterPages=add_page_decorations)
    print(f"PDF gerado com sucesso em: {PDF_OUT}")
    
    # Copia para Desktop
    try:
        shutil.copy2(PDF_OUT, DESKTOP_OUT)
        print(f"Cópia salva no Desktop: {DESKTOP_OUT}")
    except Exception as e:
        print(f"Aviso ao copiar para Desktop: {e}")

if __name__ == '__main__':
    create_catalog_pdf()
