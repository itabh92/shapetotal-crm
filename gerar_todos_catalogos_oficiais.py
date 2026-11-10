#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MASTER GENERATOR: 5 Catálogos Oficiais da Shape Total 2026.
Classificação Canônica e Exclusiva dos 884 SKUs (sem sobreposições).
Garante valores fixos oficiais das Tirzepatidas e Retatrutidas enviadas por Italo,
margem máxima para o restante, exclui versões antigas e mantém apenas as mais novas.
"""

import os
import json
import math
import shutil
import glob
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image as RLImage
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from PIL import Image as PILImage

BASE_DIR = '/Users/italosouza/Medicamentos/ShapeTotalCRM'
FOTOS_DIR = os.path.join(BASE_DIR, 'fotos')
JSON_PATH = os.path.join(BASE_DIR, 'catalogo_dados.json')
DADOS_JS_PATH = os.path.join(BASE_DIR, 'dados_catalogo.js')
DOWNLOADS_DIR = '/Users/italosouza/Downloads'
DESKTOP_DIR = '/Users/italosouza/Desktop'

# TABELA OFICIAL DE PREÇOS FIXOS DEFINIDA POR ITALO
# (Mantém rigorosamente estes valores; para os demais aplica margem máxima)
SPECIAL_FIXED = {
    # Linha Tirzepatida 60 mg (4 frascos x 15 mg ou Multi-Dose 15 mg) -> Pix: R$ 900,00 | Cartão: R$ 1.000,00
    2848: (900, 1000),  # TG 15mg x 4 (60mg)
    3207: (900, 1000),  # Tirzec 15mg x 4 (60mg)
    2889: (900, 1000),  # Lipoless 15mg x 4 (60mg)
    2988: (900, 1000),  # Lipoland 15mg x 4 (60mg)
    3072: (900, 1000),  # Lipoland MD 15mg
    2997: (900, 1000),  # Lipoless MD 15mg
    2996: (900, 1000),  # Tirzec MD 15mg
    3308: (900, 1000),  # T36 MD 15mg
    3381: (900, 1000),  # T36 15mg x 4 (60mg)
    3039: (900, 1000),  # Gluconex 15mg x 4 (60mg)
    3136: (900, 1000),  # Tirzedral 15mg x 4 (60mg)
    3203: (900, 1000),  # Tirzedral MD 15mg
    446:  (900, 1000),  # Lipoless 15mg x 4 Jer
    3389: (900, 1000),  # Slimex 15mg x 4 (60mg)
    3014: (900, 1000),  # Synedica Tirzepatida 60mg
    3392: (900, 1000),  # Oxygen Tirzegen 60mg x 4
    3271: (900, 1000),  # Oxygen Tirzegen 60mg Polvo
    2877: (900, 1000),  # Sin Marca Tirzepatida 60mg
    2765: (900, 1000),  # Gen-Tirz 60mg
    3186: (900, 1000),  # Veltrane Tirzepatide 60mg

    # Spectrum Mounjaos 60mg (Importado alto custo USD 130 -> Pix R$ 1.467,00 | Cartão R$ 1.567,00)
    3149: (1467, 1567),

    # Retatrutida 60 mg -> Pix: R$ 1.000,00 | Cartão: R$ 1.100,00
    3340: (1000, 1100),  # Oxygen Retatrutide 60mg
    2830: (1000, 1100),  # Gen Retatrutide 60mg
    2942: (1000, 1100),  # Gen-Health Caneta 60mg
    3156: (1000, 1100),  # Veltrane Retatrutide 60mg
    3391: (1000, 1100),  # Synedica Retatrutide 60mg
    3147: (1000, 1100),  # ZPHC Caneta Retatrutide 60mg
    2965: (1000, 1100),  # ZPHC Retatrutide 60mg (5x12mg)

    # Ampolas e Frascos avulsos 15 mg
    3206: (735, 835),   # Pharmacom Jaros 15mg importado
    2763: (450, 550),   # Gen-Tirz 15mg
    2875: (250, 300),   # Sin Marca Tirzepatida 15mg
    3008: (250, 300)    # ZPHC Tirzepatide 15mg
}

COLECOES_CONFIG = {
    '1_emagrecedores': {
        'id': '1_emagrecedores',
        'nome': '🔥 EMAGRECEDORES & DEFINIÇÃO (GLP-1 & QUEIMADORES)',
        'subtitulo': 'LINHA COMPLETA TIRZEPATIDA, RETATRUTIDE, SEMAGLUTIDA & LIPOLÍTICOS',
        'pdf_filename': '01_Catalogo_Emagrecedores_ShapeTotal.pdf',
        'topbar_bg': '#064e3b',
        'topbar_badge': '#34d399',
        'brand_bar_bg': '#dcfce7',
        'brand_bar_border': '#86efac',
        'brand_bar_text': '#065f46',
        'price_pix_color': '#047857',
        'garantia_texto': 'Garantia Shape Total: Triplos e duplos agonistas GLP-1/GIP/Glucagon autênticos, termogênicos e lipolíticos formulados para máxima queima de gordura e definição corporal. Pagamento seguro à vista no PIX com margem tabelada ou Cartão de Crédito em até 6x sem juros.'
    },
    '2_anabolizantes': {
        'id': '2_anabolizantes',
        'nome': '💪 ANABOLIZANTES, SARMS & TPC',
        'subtitulo': 'LINHA COMPLETA HIPERTROFIA, FORÇA BRUTA, DENSIDADE & RECUPERAÇÃO PÓS-CICLO',
        'pdf_filename': '02_Catalogo_Anabolizantes_ShapeTotal.pdf',
        'topbar_bg': '#0f172a',
        'topbar_badge': '#fbbf24',
        'brand_bar_bg': '#fef3c7',
        'brand_bar_border': '#fcd34d',
        'brand_bar_text': '#78350f',
        'price_pix_color': '#b45309',
        'garantia_texto': 'Garantia Shape Total: Esteroides injetáveis e orais 100% originais com QR Code de autenticidade, SARMs purificados e protetores pós-ciclo (TPC). Pagamento à vista no PIX ou Cartão de Crédito parcelado em até 6x sem juros.'
    },
    '3_hgh_peptideos': {
        'id': '3_hgh_peptideos',
        'nome': '🧬 HGH SOMATROPINA & PEPTÍDEOS BIO-REGENERATIVOS',
        'subtitulo': 'HORMÔNIO DO CRESCIMENTO, REGENERAÇÃO ARTICULAR & LONGEVIDADE BIOTECNOLÓGICA',
        'pdf_filename': '03_Catalogo_HGH_Peptideos_ShapeTotal.pdf',
        'topbar_bg': '#082f49',
        'topbar_badge': '#38bdf8',
        'brand_bar_bg': '#e0f2fe',
        'brand_bar_border': '#7dd3fc',
        'brand_bar_text': '#0369a1',
        'price_pix_color': '#0284c7',
        'garantia_texto': 'Garantia Shape Total Biotech: Somatropina autêntica e peptídeos liofilizados com certificação de pureza analítica 99.5%+. Suporte celular, regeneração de ligamentos e anti-aging. Pagamento à vista no PIX ou Cartão de Crédito em até 6x.'
    },
    '4_estetica': {
        'id': '4_estetica',
        'nome': '✨ ESTÉTICA, HARMONIZAÇÃO & DERMATOLOGIA',
        'subtitulo': 'TOXINAS BOTULÍNICAS, PREENCHEDORES DE ÁCIDO HIALURÔNICO & DERMO-COSMÉTICOS',
        'pdf_filename': '04_Catalogo_Estetica_Beleza_ShapeTotal.pdf',
        'topbar_bg': '#831843',
        'topbar_badge': '#f472b6',
        'brand_bar_bg': '#fce7f3',
        'brand_bar_border': '#fbcfe8',
        'brand_bar_text': '#9d174d',
        'price_pix_color': '#be185d',
        'garantia_texto': 'Garantia Shape Total Estética: Produtos médicos originais para harmonização facial e corporal de distribuidores oficiais. Cadeia de frio e lote rastreável. Pagamento à vista no PIX ou Cartão em até 6x sem juros.'
    },
    '5_saude_mental_suporte': {
        'id': '5_saude_mental_suporte',
        'nome': '🧠 SAÚDE MENTAL, POTÊNCIA & BEM-ESTAR',
        'subtitulo': 'NOOTRÓPICOS, FOCO COGNITIVO, VIGOR SEXUAL, CANNABIDIOL & ACESSÓRIOS CLÍNICOS',
        'pdf_filename': '05_Catalogo_Saude_Potencia_Suporte_ShapeTotal.pdf',
        'topbar_bg': '#312e81',
        'topbar_badge': '#a5b4fc',
        'brand_bar_bg': '#e0e7ff',
        'brand_bar_border': '#c7d2fe',
        'brand_bar_text': '#3730a3',
        'price_pix_color': '#4338ca',
        'garantia_texto': 'Garantia Shape Total Saúde: Nootrópicos de alta performance para foco e produtividade, potencializadores de vigor e diluentes estéreis. Pagamento à vista no PIX com margem máxima ou Cartão parcelado em até 6x.'
    }
}

def classify_product(p):
    cat = (p.get('categoria') or '').lower().strip()
    nom = (p.get('nombre') or '').lower()
    comp = (p.get('composicion') or '').lower()
    full_txt = f"{nom} {comp}"
    
    is_tirz = any(k in full_txt for k in ['tirzepatid', 'tirzep', 'mounjaro', 'zepbound'])
    is_reta = any(k in full_txt for k in ['retatrutid', 'retratutid'])
    is_sema = any(k in full_txt for k in ['semaglutid', 'ozempic', 'wegovy', 'rybelsus', 'cangrisema', 'cargrisema', 'delgacil', 'glucox', 'semaglix'])
    is_lira = any(k in full_txt for k in ['liraglutid', 'saxenda', 'victoza'])
    is_queima = cat in ['emagrecedores', 'queimador'] or any(k in full_txt for k in ['clembuterol', 'clenbuterol', 't3', 'liotironin', 'l-carnitine', 'liphoscile', 'lipostabil', 'aod'])
    
    is_semax = 'semax' in full_txt
    if is_semax:
        is_sema = False
        
    if is_tirz or is_reta or (is_sema and not is_semax) or is_lira or is_queima:
        return '1_emagrecedores'
        
    is_hgh = cat == 'hgh' or any(k in full_txt for k in ['somatropin', 'somatrop', 'plextropin', 'spectrus', 'kigtropin', 'genotropin', 'omnitrope']) or (cat == 'anabolizante' and 'somatropin' in full_txt)
    is_ghk_injetavel = ('ghk' in full_txt or 'ahk' in full_txt) and not any(k in full_txt for k in ['cream', 'serum', 'crema'])
    is_pept_regenerativo = cat == 'peptideo' or any(k in full_txt for k in ['bpc-157', 'bpc 157', 'tb-500', 'tb 500', 'cjc', 'ipamorelin', 'ghrp', 'tesamorelin', 'epithalon', 'ephitalon', 'mots', 'ss-31', 'pt-141', 'pt 141', 'klow', 'glow', 'kpv', 'll37', 'slupp', 'slu-pp', 'igf'])
    
    is_neuro_pept = any(k in full_txt for k in ['semax', 'selank', 'dsip', 'cbl'])
    
    if (is_hgh or is_ghk_injetavel or is_pept_regenerativo) and not is_neuro_pept:
        return '3_hgh_peptideos'
        
    is_mental = cat == 'saude mental' or is_neuro_pept or any(k in full_txt for k in ['lisdexanfetamina', 'zicartil', 'lispax', 'venvanse', 'modafinil', 'modcop', 'bolixin', 'fluoxetina', 'confium', 'cognil'])
    is_potencia = cat == 'potencia sexual' or any(k in full_txt for k in ['tadalafil', 'tadala', 'sildenafil', 'pramil', 'ceebis', 'digram', 'erofast'])
    is_cbd = cat == 'cbd' or 'cannabidiol' in full_txt
    is_suporte = cat in ['diluente', 'varios', 'insulina', 'parar de fumar', 'medicamento', 'colicas'] or any(k in full_txt for k in ['diluyente', 'agua bac', 'bacteriostatico', 'multi pen', 'afrezza'])
    
    is_estetico = cat in ['estetico', 'botox', 'cosmetico', 'anti acne', 'capilar', 'mascara de cabello'] or any(k in full_txt for k in ['botox', 'dysport', 'botulax', 'meditoxin', 'nabota', 'rentox', 'sculptra', 'acido hialu', 'acid hialu', 'line body', 'line derm', 'bio fill', 'neuramis', 'avalon', 'sofiderm', 'israderm', 'roacutan', 'isotretinoina', 'roas', 'ghk-cu cream', 'ghk-cu serum', 'biotina', 'biotidina'])
    
    if is_estetico and not is_mental and not is_potencia and not is_suporte:
        return '4_estetica'
        
    if is_mental or is_potencia or is_cbd or is_suporte:
        return '5_saude_mental_suporte'
        
    return '2_anabolizantes'

def get_product_prices(p, col_id):
    pid = p.get('id')
    
    # 1. Verifica se possui preço fixo acordado oficialmente
    if pid in SPECIAL_FIXED:
        pix, cartao = SPECIAL_FIXED[pid]
        return pix, cartao, True
        
    # 2. Caso contrário, aplica a margem máxima da respectiva coleção
    usd = float(p.get('precio', 0) or 0)
    mult_custo = 5.60 * 1.30 # Dólar 5.60 + 30% frete = R$ 7.28
    custo = usd * mult_custo
    cat = (p.get('categoria') or '').lower().strip()
    
    if col_id == '1_emagrecedores':
        max_pct = 55
    elif col_id == '2_anabolizantes':
        if cat in ['sarms', 'post ciclo', 'hcg']:
            max_pct = 60
        else:
            max_pct = 58
    elif col_id == '3_hgh_peptideos':
        max_pct = 65
    elif col_id == '4_estetica':
        max_pct = 75
    else: # 5_saude_mental_suporte
        if cat in ['saude mental'] or any(k in (p.get('nombre') or '').lower() for k in ['semax', 'selank', 'dsip', 'zicartil', 'lispax', 'modafinil']):
            max_pct = 65
        else:
            max_pct = 70
            
    preco_pix = math.ceil(custo * (1 + max_pct / 100))
    preco_cartao = preco_pix + 100
    return preco_pix, preco_cartao, False

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

def generate_pdf_for_collection(col_id, prods, cfg):
    pdf_path = os.path.join(BASE_DIR, cfg['pdf_filename'])
    print(f"\n--- Gerando {cfg['nome']} ({len(prods)} SKUs) -> {cfg['pdf_filename']} ---")
    
    grouped = {}
    for p in prods:
        m = (p.get('marca') or 'SHAPE TOTAL').upper().strip()
        grouped.setdefault(m, []).append(p)
        
    for m in grouped:
        grouped[m].sort(key=lambda x: (
            -int(x.get('stock_cde', 0) or 0),
            x.get('nombre', '')
        ))

    styles = getSampleStyleSheet()
    
    brand_header_style = ParagraphStyle(
        f"BrandH_{col_id}",
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=14.5,
        textColor=colors.HexColor(cfg['brand_bar_text']),
        alignment=TA_LEFT
    )
    
    prod_name_style = ParagraphStyle(
        f"ProdName_{col_id}",
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13.5,
        textColor=colors.HexColor('#0f172a')
    )
    
    prod_sub_style = ParagraphStyle(
        f"ProdSub_{col_id}",
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#64748b')
    )
    
    price_pix_style = ParagraphStyle(
        f"PricePix_{col_id}",
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=14,
        textColor=colors.HexColor(cfg['price_pix_color']),
        alignment=TA_RIGHT
    )
    
    price_cartao_style = ParagraphStyle(
        f"PriceCartao_{col_id}",
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#4338ca'),
        alignment=TA_RIGHT
    )
    
    price_parc_style = ParagraphStyle(
        f"PriceParc_{col_id}",
        fontName='Helvetica',
        fontSize=7,
        leading=9,
        textColor=colors.HexColor('#64748b'),
        alignment=TA_RIGHT
    )

    doc = SimpleDocTemplate(
        pdf_path,
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
            Paragraph(f"<b>SHAPE TOTAL · CATÁLOGO OFICIAL 2026</b><br/><font size='8' color='#94a3b8'>{cfg['subtitulo']}</font>", ParagraphStyle('TopL', fontName='Helvetica-Bold', fontSize=11.5, leading=14, textColor=colors.HexColor('#ffffff'))),
            Paragraph(f"<b>{len(prods)} PRODUTOS EXCLUSIVOS</b><br/><font size='8' color='{cfg['topbar_badge']}'>Preços Oficiais Tabelados · 100% Originais</font>", ParagraphStyle('TopR', fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=colors.HexColor(cfg['topbar_badge']), alignment=TA_RIGHT))
        ]
    ]
    t_topbar = Table(topbar_data, colWidths=[340, 203])
    t_topbar.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor(cfg['topbar_bg'])),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_topbar)
    story.append(Spacer(1, 10))
    
    # Aviso de Garantia e Condições
    notice_data = [[
        Paragraph(f"<b>{cfg['garantia_texto']}</b>", ParagraphStyle('N1', fontName='Helvetica', fontSize=8, leading=11.5, textColor=colors.HexColor('#1e293b')))
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
    
    sorted_brands = sorted(grouped.keys(), key=lambda b: -len(grouped[b]))
    
    for brand in sorted_brands:
        b_prods = grouped[brand]
        if not b_prods:
            continue
            
        b_bar = Table([[
            Paragraph(f"<b>🏷️ {brand}</b> ({len(b_prods)} itens)", brand_header_style)
        ]], colWidths=[543])
        b_bar.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor(cfg['brand_bar_bg'])),
            ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor(cfg['brand_bar_border'])),
            ('TOPPADDING', (0,0), (-1,-1), 5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 5),
            ('LEFTPADDING', (0,0), (-1,-1), 10),
        ]))
        
        brand_flow = [b_bar, Spacer(1, 5)]
        
        for p in b_prods:
            pix, cartao, is_fixed = get_product_prices(p, col_id)
            parc = round(cartao / 6, 2)
            
            nome = p.get('nombre') or 'Produto sem nome'
            comp = (p.get('composicion') or '').strip()
            pres = (p.get('presentacion') or '').strip()
            mg = (p.get('mg') or '').strip()
            cat_display = (p.get('categoria') or '').upper().strip()
            
            sub_parts = []
            if comp: sub_parts.append(f"<b>Princípio:</b> {comp.upper()}")
            if pres: sub_parts.append(f"<b>Formato:</b> {pres.upper()}")
            if mg: sub_parts.append(f"<b>Dose:</b> {mg.upper()}")
            sub_parts.append(f"<b>Linha:</b> {cat_display}")
            sub_text = " • ".join(sub_parts)
            
            stock_cde = int(p.get('stock_cde', 0) or 0)
            stock_badge = f"<font color='{cfg['price_pix_color']}'><b>● DISPONÍVEL</b></font>" if stock_cde > 0 else "<font color='#64748b'>● SOB ENCOMENDA</font>"
            fixed_tag = " &nbsp;|&nbsp; <font color='#047857'><b>VALOR FIXO OFICIAL</b></font>" if is_fixed else ""
            
            details_cell = [
                Paragraph(f"<b>{nome}</b>", prod_name_style),
                Spacer(1, 3),
                Paragraph(sub_text, prod_sub_style),
                Spacer(1, 2),
                Paragraph(f"{stock_badge}{fixed_tag} &nbsp;|&nbsp; <font color='#0f172a'>Cód #{p.get('id')}</font>", prod_sub_style)
            ]
            
            price_cell = [
                Paragraph(f"<font size='7' color='{cfg['price_pix_color']}'>À VISTA NO PIX</font><br/><b>R$ {pix:,d}</b>".replace(',', '.'), price_pix_style),
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
        
    doc.build(story)
    print(f"Sucesso: {pdf_path}")
    return pdf_path

def main():
    print("==================================================")
    print("MASTER BUILD: 5 CATÁLOGOS OFICIAIS SHAPE TOTAL")
    print("==================================================")
    
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    prods = data.get('productos', [])
    print(f"Total de produtos no CRM: {len(prods)}")
    
    # Classificação canônica
    collections = {k: [] for k in COLECOES_CONFIG}
    for p in prods:
        col_id = classify_product(p)
        p['colecao_id'] = col_id
        p['colecao_nome'] = COLECOES_CONFIG[col_id]['nome']
        collections[col_id].append(p)
        
    for col_id, col_prods in collections.items():
        print(f"  - {COLECOES_CONFIG[col_id]['nome']}: {len(col_prods)} SKUs")
        
    total_classificados = sum(len(cp) for cp in collections.values())
    assert total_classificados == len(prods), f"Erro de partição: {total_classificados} != {len(prods)}"
    
    # Atualiza JSON e JS do site
    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        
    js_content = "window.SHAPETOTAL_RAW = " + json.dumps(data, ensure_ascii=False) + ";\n"
    with open(DADOS_JS_PATH, 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    # Mantém shapetotal_mobile.html como redirecionador seguro para index.html
    try:
        out_path = os.path.join(BASE_DIR, 'shapetotal_mobile.html')
        redirect_html = (
            '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n'
            '  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n'
            '  <title>Shape Total CRM</title>\n'
            '  <meta http-equiv="refresh" content="0; url=index.html" />\n'
            '  <script>window.location.replace("index.html" + window.location.search + window.location.hash);</script>\n'
            '</head>\n<body style="background:#0b1120; color:#94a3b8; font-family:sans-serif; text-align:center; padding-top:40px;">\n'
            '  <p>Redirecionando para o Shape Total CRM...</p>\n</body>\n</html>\n'
        )
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(redirect_html)
        print("shapetotal_mobile.html redirecionador sincronizado!")
    except Exception as e:
        print(f"Aviso ao gerar mobile bundle: {e}")

    # Limpeza preventiva de PDFs antigos
    for d in [BASE_DIR, DOWNLOADS_DIR, DESKTOP_DIR]:
        for old_f in glob.glob(os.path.join(d, "Catalogo_*.pdf")):
            try:
                os.remove(old_f)
            except Exception:
                pass

    # Gera os 5 novos PDFs
    pdf_paths = []
    for col_id, col_prods in collections.items():
        cfg = COLECOES_CONFIG[col_id]
        p_path = generate_pdf_for_collection(col_id, col_prods, cfg)
        pdf_paths.append(p_path)
        
    # Copia os 5 novos PDFs para Downloads e Desktop (sobrescrevendo com os mais recentes)
    for p_path in pdf_paths:
        fname = os.path.basename(p_path)
        try:
            shutil.copy2(p_path, os.path.join(DOWNLOADS_DIR, fname))
        except Exception as e:
            pass
        try:
            shutil.copy2(p_path, os.path.join(DESKTOP_DIR, fname))
        except Exception as e:
            pass
            
    print("\nTodos os 5 PDFs oficiais foram compilados e atualizados em ShapeTotalCRM, Downloads e Desktop.")
    return pdf_paths

if __name__ == '__main__':
    main()
