#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gerador de Catálogo Exclusivo: TABELA DE PREÇOS TIRZEPATIDAS & RETATRUTIDA.
Todos os valores são calculados dinamicamente a partir de catalogo_dados.json + pricing_config.json
(USD site * Dólar 5,80 * 1,30 frete + margem recomendada de mercado + 12% cartão).
"""

import glob
import json
import os
import shutil
from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.platypus import (
    Image as RLImage, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
)

from pricing_engine import compute_product_pricing, load_pricing_config

BASE_DIR = '/Users/italosouza/Medicamentos/ShapeTotalCRM'
FOTOS_DIR = os.path.join(BASE_DIR, 'fotos')
JSON_PATH = os.path.join(BASE_DIR, 'catalogo_dados.json')
DOWNLOADS_DIR = '/Users/italosouza/Downloads'
DESKTOP_DIR = '/Users/italosouza/Desktop'

PDF_FILENAME = 'Tabela_Precos_Tirzepatidas_ShapeTotal.pdf'
PDF_CRM = os.path.join(BASE_DIR, PDF_FILENAME)
PDF_DOWNLOADS = os.path.join(DOWNLOADS_DIR, PDF_FILENAME)
PDF_DESKTOP = os.path.join(DESKTOP_DIR, PDF_FILENAME)

TABELA_ITEMS = [
    {
        'secao': 'LINHA_60MG',
        'secao_titulo': '📦 LINHA 60 MG — TIRZEPATIDA (4 VIAS OU MULTIDOSE)',
        'secao_sub': 'Preços individuais por laboratório conforme cotação e custo real atualizado',
        'secao_cor': '#064e3b',
        'secao_bg': '#dcfce7',
        'secao_border': '#86efac',
        'produtos': [
            {
                'id_catalogo': 2848,
                'id_foto': 2848,
                'nome': 'TG 60 MG (TIRZEPATIDA INDUFAR)',
                'marca': 'INDUFAR PHARMA',
                'apresentacao': 'Caixa com 4 ampolas de 15 mg (60 mg total)',
                'duracao': 'Até 6 meses de tratamento'
            },
            {
                'id_catalogo': 3207,
                'id_foto': 3207,
                'nome': 'TIRZEC 60 MG (4 VIAS)',
                'marca': 'QUIMFA PHARMA',
                'apresentacao': 'Caixa com 4 ampolas de 15 mg (60 mg total)',
                'duracao': 'Até 6 meses de tratamento'
            },
            {
                'id_catalogo': 2889,
                'id_foto': 2889,
                'nome': 'LIPOLESS 60 MG (4 VIAS)',
                'marca': 'ETICOS LABS',
                'apresentacao': 'Caixa com 4 ampolas de 15 mg (60 mg total)',
                'duracao': 'Até 6 meses de tratamento'
            },
            {
                'id_catalogo': 2988,
                'id_foto': 2988,
                'nome': 'LIPOLAND 60 MG (4 VIAS)',
                'marca': 'LANDERLAN OFICIAL',
                'apresentacao': 'Caixa com 4 ampolas de 15 mg (60 mg total)',
                'duracao': 'Até 6 meses de tratamento'
            },
            {
                'id_catalogo': 2997,
                'id_foto': 2997,
                'nome': 'LIPOLESS MD 15 MG (MULTIDOSE)',
                'marca': 'ETICOS LABS',
                'apresentacao': 'Frasco Multidose (MD) de 15 mg de alta concentração',
                'duracao': 'Flexibilidade total no fracionamento das doses'
            },
            {
                'id_catalogo': 2996,
                'id_foto': 2996,
                'nome': 'TIRZEC MD 15 MG (FRASCO ÚNICO)',
                'marca': 'QUIMFA PHARMA',
                'apresentacao': 'Frasco Multidose (MD) de alta estabilidade',
                'duracao': 'Flexibilidade total no fracionamento das doses'
            },
            {
                'id_catalogo': 3136,
                'id_foto': 3136,
                'nome': 'TIRZEDRAL 60 MG (4 VIAS)',
                'marca': 'CATEDRAL LABS',
                'apresentacao': 'Caixa com 4 ampolas de 15 mg (60 mg total)',
                'duracao': 'Até 6 meses de tratamento'
            },
            {
                'id_catalogo': 3308,
                'id_foto': 3308,
                'nome': 'T36 MD 15 MG (FRASCO MULTIDOSE)',
                'marca': 'CATEDRAL LABS',
                'apresentacao': 'Frasco Multidose (MD) de 15 mg',
                'duracao': 'Ajuste posológico customizado'
            },
            {
                'id_catalogo': 3039,
                'id_foto': 3039,
                'nome': 'GLUCONEX 60 MG (4 VIAS)',
                'marca': 'LASCA PHARMA',
                'apresentacao': 'Caixa com 4 ampolas de 15 mg (60 mg total)',
                'duracao': 'Até 6 meses de tratamento'
            },
            {
                'id_catalogo': 3014,
                'id_foto': 3014,
                'nome': 'TIRZEPATIDA SYNEDICA 60 MG',
                'marca': 'SYNEDICA LABS',
                'apresentacao': 'Caixa com 4 ampolas / 60 mg de alta pureza analítica',
                'duracao': 'Até 6 meses de tratamento'
            }
        ]
    },
    {
        'secao': 'RETATRUTIDA_60MG',
        'secao_titulo': '🧬 RETATRUTIDA 60 MG — TRIPLO AGONISTA (GLP-1 / GIP / GLUCAGON)',
        'secao_sub': 'Atuação tripla no metabolismo, tecido adiposo e saciedade central',
        'secao_cor': '#78350f',
        'secao_bg': '#fef3c7',
        'secao_border': '#fcd34d',
        'produtos': [
            {
                'id_catalogo': 2830,
                'id_foto': 2830,
                'nome': 'GEN-HEALTH RETATRUTIDE 60 MG (FRASCO)',
                'marca': 'GEN-HEALTH BIOTECH',
                'apresentacao': 'Frasco de 60 mg liofilizado com diluente',
                'duracao': 'Protocolo de alta intensidade'
            },
            {
                'id_catalogo': 2942,
                'id_foto': 2942,
                'nome': 'GEN-HEALTH RETATRUTIDE 60 MG (CANETA)',
                'marca': 'GEN-HEALTH BIOTECH',
                'apresentacao': 'Caneta pré-carregada dosadora de 60 mg',
                'duracao': 'Conveniência e precisão milimétrica'
            },
            {
                'id_catalogo': 2965,
                'id_foto': 2965,
                'nome': 'ZPHC RETATRUTIDE 60 MG (5x12 MG)',
                'marca': 'ZPHC BIOTECH',
                'apresentacao': 'Caixa importada 5 frascos de 12 mg (60 mg total)',
                'duracao': 'Pureza internacional certificada'
            }
        ]
    },
    {
        'secao': 'AMPOLAS_AVULSAS',
        'secao_titulo': '💉 AMPOLAS AVULSAS DE 15 MG (DOSE INDIVIDUAL)',
        'secao_sub': 'Opção fracionada para início de protocolo, adaptação ou reposição sob medida',
        'secao_cor': '#1e3a8a',
        'secao_bg': '#dbeafe',
        'secao_border': '#93c5fd',
        'produtos': [
            {
                'id_catalogo': 9001,
                'id_foto': 2988,
                'nome': 'LIPOLAND 15 MG (AMPOLA AVULSA)',
                'marca': 'LANDERLAN OFICIAL',
                'apresentacao': '1 ampola liofilizada de 15 mg',
                'duracao': 'Ideal para início de ciclo (3 a 6 semanas)'
            },
            {
                'id_catalogo': 9002,
                'id_foto': 3207,
                'nome': 'TIRZEC 15 MG (AMPOLA AVULSA)',
                'marca': 'QUIMFA PHARMA',
                'apresentacao': '1 ampola liofilizada de 15 mg',
                'duracao': 'Dose individual lacrada'
            },
            {
                'id_catalogo': 9003,
                'id_foto': 2848,
                'nome': 'TG 15 MG (AMPOLA AVULSA)',
                'marca': 'INDUFAR PHARMA',
                'apresentacao': '1 ampola liofilizada de 15 mg',
                'duracao': 'Dose individual lacrada'
            },
            {
                'id_catalogo': 9004,
                'id_foto': 2889,
                'nome': 'LIPOLESS 15 MG (AMPOLA AVULSA)',
                'marca': 'ETICOS LABS',
                'apresentacao': '1 ampola liofilizada de 15 mg',
                'duracao': 'Dose individual lacrada'
            },
            {
                'id_catalogo': 9007,
                'id_foto': 3136,
                'nome': 'TIRZEDRAL 15 MG (AMPOLA AVULSA)',
                'marca': 'CATEDRAL LABS',
                'apresentacao': '1 ampola liofilizada de 15 mg',
                'duracao': 'Dose individual lacrada'
            }
        ]
    }
]

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
    print("Iniciando geração do Catálogo Exclusivo: Tabela de Preços Tirzepatidas...")
    pricing_cfg = load_pricing_config()
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        cat_data = json.load(f)
    cat_by_id = {int(p['id']): p for p in cat_data.get('productos', []) if p.get('id') is not None}

    styles = getSampleStyleSheet()
    
    prod_name_style = ParagraphStyle(
        'ProdNameTabela',
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#0f172a')
    )
    
    prod_sub_style = ParagraphStyle(
        'ProdSubTabela',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#475569')
    )
    
    price_pix_style = ParagraphStyle(
        'PricePixTabela',
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=15,
        textColor=colors.HexColor('#047857'),
        alignment=TA_RIGHT
    )
    
    price_cartao_style = ParagraphStyle(
        'PriceCartaoTabela',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#4338ca'),
        alignment=TA_RIGHT
    )
    
    price_parc_style = ParagraphStyle(
        'PriceParcTabela',
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor('#64748b'),
        alignment=TA_RIGHT
    )

    doc = SimpleDocTemplate(
        PDF_CRM,
        pagesize=A4,
        leftMargin=26,
        rightMargin=26,
        topMargin=26,
        bottomMargin=26
    )
    
    story = []
    
    # Header Principal
    topbar_data = [
        [
            Paragraph("<b>SHAPE TOTAL · TABELA DE PREÇOS OFICIAL</b><br/><font size='8.5' color='#94a3b8'>TIRZEPATIDAS & RETATRUTIDA · LINHA 60 MG & AMPOLAS AVULSAS</font>", ParagraphStyle('TopL', fontName='Helvetica-Bold', fontSize=12, leading=15, textColor=colors.HexColor('#ffffff'))),
            Paragraph("<b>📋 TABELA ATUALIZADA</b><br/><font size='8' color='#34d399'>Margens de Mercado Shape Total · PIX &amp; 12x</font>", ParagraphStyle('TopR', fontName='Helvetica-Bold', fontSize=10.5, leading=13.5, textColor=colors.HexColor('#34d399'), alignment=TA_RIGHT))
        ]
    ]
    t_topbar = Table(topbar_data, colWidths=[340, 203])
    t_topbar.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#064e3b')),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_topbar)
    story.append(Spacer(1, 10))
    
    # Banner de Garantia e Condições
    notice_data = [[
        Paragraph("<b>Garantia Shape Total:</b> Produtos 100% originais com lacre e autenticidade. Linha 60 mg com duração de até 6 meses de tratamento. Pagamento seguro à vista no PIX com super desconto ou no Cartão de Crédito em até 12x sem juros.", ParagraphStyle('N1', fontName='Helvetica', fontSize=8.5, leading=12, textColor=colors.HexColor('#1e293b')))
    ]]
    t_notice = Table(notice_data, colWidths=[543])
    t_notice.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0fdf4')),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#86efac')),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_notice)
    story.append(Spacer(1, 12))
    
    total_prods = sum(len(sec['produtos']) for sec in TABELA_ITEMS)
    
    for sec in TABELA_ITEMS:
        # Barra da Seção
        sec_bar = Table([[
            Paragraph(f"<b>{sec['secao_titulo']}</b><br/><font size='7.5' color='{sec['secao_cor']}'>{sec['secao_sub']}</font>", ParagraphStyle('SecH', fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=colors.HexColor(sec['secao_cor'])))
        ]], colWidths=[543])
        sec_bar.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor(sec['secao_bg'])),
            ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor(sec['secao_border'])),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
            ('LEFTPADDING', (0,0), (-1,-1), 10),
        ]))
        
        sec_flow = [sec_bar, Spacer(1, 5)]
        
        for p in sec['produtos']:
            prod_raw = cat_by_id.get(int(p['id_catalogo']), {'id': p['id_catalogo'], 'precio': 0, 'categoria': 'emagrecedores'})
            pricing = compute_product_pricing(prod_raw, tier='rec', cfg=pricing_cfg)
            pix = pricing['preco_pix']
            cartao = pricing['preco_cartao']
            parc = round(cartao / 12, 2) if cartao > 0 else 0

            nome = p['nome']
            marca = p['marca']
            apres = p['apresentacao']
            duracao = p['duracao']

            tag_fixo = "<font color='#047857'><b>● TABELA SHAPE TOTAL</b></font>"
                
            details_cell = [
                Paragraph(f"<b>{nome}</b>", prod_name_style),
                Spacer(1, 2),
                Paragraph(f"<b>Marca:</b> {marca} &nbsp;•&nbsp; <b>Formato:</b> {apres}", prod_sub_style),
                Spacer(1, 1.5),
                Paragraph(f"<b>Duração:</b> {duracao}", prod_sub_style),
                Spacer(1, 1.5),
                Paragraph(f"{tag_fixo}", prod_sub_style)
            ]
            
            str_pix = f"R$ {pix:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')
            str_cartao = f"R$ {cartao:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')
            str_parc = f"R$ {parc:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')
            
            price_cell = [
                Paragraph(f"<font size='7' color='#047857'>À VISTA NO PIX</font><br/><b>{str_pix}</b>", price_pix_style),
                Spacer(1, 2),
                Paragraph(f"<font size='7' color='#4338ca'>NO CARTÃO</font><br/><b>{str_cartao}</b>", price_cartao_style),
                Paragraph(f"em até 12x de {str_parc} s/ juros", price_parc_style)
            ]
            
            img_element = get_product_image(p['id_foto'], max_w=85, max_h=85)
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
        
    doc.build(story)
    print(f"PDF exclusivo gerado com sucesso em: {PDF_CRM}")
    
    # Regra canônica: Excluir arquivos antigos e manter apenas os novos atualizados
    for dest_dir in [DOWNLOADS_DIR, DESKTOP_DIR]:
        for old_f in glob.glob(os.path.join(dest_dir, "*Tabela_Precos*.pdf")):
            try:
                os.remove(old_f)
            except Exception:
                pass
                
    shutil.copy2(PDF_CRM, PDF_DOWNLOADS)
    print(f"Copiado para Downloads: {PDF_DOWNLOADS}")
    
    shutil.copy2(PDF_CRM, PDF_DESKTOP)
    print(f"Copiado para Desktop: {PDF_DESKTOP}")
    
    return PDF_CRM

if __name__ == '__main__':
    main()
