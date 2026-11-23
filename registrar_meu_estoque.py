#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Registra o Estoque Físico Local de Italo (Pronta Entrega BH) no ShapeTotal CRM.
Gera meu_estoque_dados.json, atualiza catalogo_dados.json e dados_catalogo.js,
reempacota shapetotal_mobile.html e gera o catálogo em PDF de Pronta Entrega BH.
"""

import json
import os
import shutil
from datetime import datetime
from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.platypus import (
    Image as RLImage, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
)

from pricing_engine import compute_product_pricing, load_pricing_config, write_pricing_config_js

BASE_DIR = '/Users/italosouza/Medicamentos/ShapeTotalCRM'
FOTOS_DIR = os.path.join(BASE_DIR, 'fotos')
JSON_PATH = os.path.join(BASE_DIR, 'catalogo_dados.json')
DADOS_JS_PATH = os.path.join(BASE_DIR, 'dados_catalogo.js')
DOWNLOADS_DIR = '/Users/italosouza/Downloads'
DESKTOP_DIR = '/Users/italosouza/Desktop'

# ITENS FÍSICOS EM MÃOS — preços calculados automaticamente pelo motor pricing_engine.py (Dólar + 30% frete + % grupo)
CUSTO_TOTAL_PAGO_LOTE = 10665.22

ESTOQUE_LOCAL = [
    {
        'id_catalogo': 2848,
        'nome': 'TG 60 mg — Indufar (4x15 mg)',
        'tipo': 'caixa_fechada',
        'apresentacao': 'Caixa com 4 ampolas de 15 mg (60 mg total)',
        'qtd': 5,
        'obs': 'Inventário físico conferido em 23/11/2026'
    },
    {
        'id_catalogo': 2996,
        'nome': 'Tirzec 60 mg Ampola Única — Quimfa (1x2 mL)',
        'tipo': 'caixa_fechada',
        'apresentacao': 'Frasco ampola única multi-dosis de 2 mL (60 mg total / 15 mg por 0,5 mL)',
        'qtd': 0,
        'obs': 'Ampola única multi-dosis lacrada original Quimfa'
    },
    {
        'id_catalogo': 3207,
        'nome': 'Tirzec 60 mg — Quimfa (4x15 mg)',
        'tipo': 'caixa_fechada',
        'apresentacao': 'Caixa com 4 ampolas de 15 mg (60 mg total)',
        'qtd': 7,
        'obs': 'Inventário físico conferido em 23/11/2026'
    },
    {
        'id_catalogo': 2988,
        'nome': 'Lipoland 60 mg — Landerlan (4x15 mg)',
        'tipo': 'caixa_fechada',
        'apresentacao': 'Caixa com 4 ampolas de 15 mg (60 mg total)',
        'qtd': 0,
        'obs': 'Caixa lacrada original Landerlan'
    },
    {
        'id_catalogo': 2889,
        'nome': 'Lipoless 60 mg — Eticos (4x15 mg)',
        'tipo': 'caixa_fechada',
        'apresentacao': 'Caixa com 4 ampolas de 15 mg (60 mg total)',
        'qtd': 1,
        'obs': 'Inventário físico conferido em 23/11/2026'
    },
    {
        'id_catalogo': 3136,
        'nome': 'Tirzedral 60 mg — Catedral (4x15 mg)',
        'tipo': 'caixa_fechada',
        'apresentacao': 'Caixa com 4 ampolas de 15 mg (60 mg total)',
        'qtd': 0,
        'obs': 'Caixa aberta para venda em ampolas avulsas'
    },
    {
        'id_catalogo': 3370,
        'nome': 'Retatrutida Gen-Health 240 mg (Kit 4x60 mg)',
        'tipo': 'kit_fechado',
        'apresentacao': 'Kit fechado com 4 frascos de 60 mg + 1 Água Bacteriostática',
        'qtd': 0,
        'obs': 'Kit fechado zerado no inventário físico de 23/11/2026'
    },
    {
        'id_catalogo': 2830,
        'nome': 'Retatrutida Gen-Health 60 mg (Ampolas)',
        'tipo': 'ampola_fechada',
        'apresentacao': 'Ampola liofilizada de 60 mg + Água Bacteriostática',
        'qtd': 3,
        'obs': '3 ampolas avulsas de 60 mg Gen-Health'
    },
    {
        'id_catalogo': 9001,
        'nome': 'Lipoland 15 mg (Ampola Avulsa)',
        'tipo': 'ampola_avulsa',
        'apresentacao': '1 ampola liofilizada de 15 mg (Landerlan)',
        'qtd': 0,
        'obs': 'Ampola avulsa oficial Landerlan'
    },
    {
        'id_catalogo': 9002,
        'nome': 'Tirzec 15 mg (Ampola Avulsa)',
        'tipo': 'ampola_avulsa',
        'apresentacao': '1 ampola liofilizada de 15 mg (Quimfa)',
        'qtd': 0,
        'obs': 'Ampola avulsa oficial Quimfa (sai da caixa 4x15 mg ao vender)'
    },
    {
        'id_catalogo': 9003,
        'nome': 'TG 15 mg (Ampola Avulsa)',
        'tipo': 'ampola_avulsa',
        'apresentacao': '1 ampola liofilizada de 15 mg (Indufar)',
        'qtd': 3,
        'obs': '3 ampolas avulsas de TG 15 mg Indufar'
    },
    {
        'id_catalogo': 9004,
        'nome': 'Lipoless 15 mg (Ampola Avulsa)',
        'tipo': 'ampola_avulsa',
        'apresentacao': '1 ampola liofilizada de 15 mg (Eticos)',
        'qtd': 0,
        'obs': 'Ampola avulsa oficial Eticos Labs (sai da caixa 4x15 mg ao vender)'
    },
    {
        'id_catalogo': 9007,
        'nome': 'Catedral Tirzedral 15 mg (Ampola Avulsa)',
        'tipo': 'ampola_avulsa',
        'apresentacao': '1 ampola liofilizada de 15 mg (Catedral)',
        'qtd': 0,
        'obs': 'Ampola avulsa oficial Catedral'
    },
    {
        'id_catalogo': 9005,
        'nome': 'Retatrutida Gen-Health 120 mg (Frasco para Doses)',
        'tipo': 'frasco_doses',
        'apresentacao': 'Frasco de 120 mg aberto reservado para aplicação fracionada',
        'qtd': 1,
        'obs': 'Frasco em uso para doses locais (inventário 23/11/2026)'
    },
    {
        'id_catalogo': 9006,
        'nome': 'Tirzepatida Gen-Tirz 120 mg (Frasco para Doses)',
        'tipo': 'frasco_doses',
        'apresentacao': 'Frasco de 120 mg aberto reservado para aplicação fracionada',
        'qtd': 0,
        'obs': 'Frasco de doses de Tirzepatida encerrado (23/11/2026)'
    }
]

def main():
    print("Iniciando registro do Estoque Próprio em BH...")
    pricing_cfg = load_pricing_config()
    write_pricing_config_js(pricing_cfg)

    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        cat_data = json.load(f)
    cat_by_id = {int(p['id']): p for p in cat_data.get('productos', []) if p.get('id') is not None}

    itens_calculados = []
    for item in ESTOQUE_LOCAL:
        prod = cat_by_id.get(int(item['id_catalogo']), {'id': item['id_catalogo'], 'precio': 0, 'categoria': 'emagrecedores'})
        pr = compute_product_pricing(prod, tier='auto', cfg=pricing_cfg)
        enriched = dict(item)
        enriched['custo_brl'] = pr['custo']
        enriched['tier_estrategico'] = pr['effective_tier']
        enriched['preco_pix'] = float(pr['preco_pix'])
        enriched['preco_cartao'] = float(pr['preco_cartao'])
        itens_calculados.append(enriched)

    total_caixas_60 = sum(item['qtd'] for item in itens_calculados if item['tipo'] == 'caixa_fechada')
    total_ampolas_60 = sum(
        (item['qtd'] * 4 if item['tipo'] == 'kit_fechado' else item['qtd'])
        for item in itens_calculados if item['tipo'] in ['ampola_fechada', 'kit_fechado']
    )
    total_ampolas_15 = sum(item['qtd'] for item in itens_calculados if item['tipo'] == 'ampola_avulsa')
    total_frascos_120 = sum(item['qtd'] for item in itens_calculados if item['tipo'] == 'frasco_doses')

    # Rateio proporcional exato do valor total pago informado (CUSTO_TOTAL_PAGO_LOTE = R$ 3.175,00)
    total_tabela_custo = sum(item['qtd'] * item['custo_brl'] for item in itens_calculados if item['qtd'] > 0)
    custos_reais_seed = {}
    pago_cent_restante = int(round(CUSTO_TOTAL_PAGO_LOTE * 100))
    ativos_pago = [it for it in itens_calculados if it['qtd'] > 0]
    for idx_it, item in enumerate(ativos_pago):
        peso = item['qtd'] * item['custo_brl']
        if idx_it == len(ativos_pago) - 1:
            parcela_cent = pago_cent_restante
        else:
            parcela_cent = int(round((CUSTO_TOTAL_PAGO_LOTE * 100) * (peso / total_tabela_custo))) if total_tabela_custo > 0 else 0
            pago_cent_restante -= parcela_cent
        item['custo_pago_total_brl'] = round(parcela_cent / 100.0, 2)
        item['custo_pago_unit_brl'] = round((parcela_cent / 100.0) / item['qtd'], 2)
        custos_reais_seed[str(item['id_catalogo'])] = item['custo_pago_unit_brl']

    total_faturamento_pix = sum(item['qtd'] * item['preco_pix'] for item in itens_calculados)
    total_faturamento_cartao = sum(item['qtd'] * item['preco_cartao'] for item in itens_calculados)

    dados_estoque = {
        'atualizado_em': datetime.now().strftime('%d/%m/%Y às %H:%M'),
        'responsavel': 'Italo Souza',
        'local': 'Belo Horizonte / MG (Pronta Entrega)',
        'resumo': {
            'caixas_fechadas_60mg': total_caixas_60,
            'ampolas_retatrutida_60mg': total_ampolas_60,
            'ampolas_avulsas_15mg': total_ampolas_15,
            'frascos_doses_120mg': total_frascos_120,
            'total_itens_contabilizados': len([it for it in itens_calculados if it['qtd'] > 0]),
            'custo_total_pago_brl': round(CUSTO_TOTAL_PAGO_LOTE, 2),
            'custo_referencia_site_brl': round(total_tabela_custo, 2),
            'faturamento_potencial_pix': total_faturamento_pix,
            'faturamento_potencial_cartao': total_faturamento_cartao,
            'lucro_potencial_pix_sobre_pago': round(total_faturamento_pix - CUSTO_TOTAL_PAGO_LOTE, 2)
        },
        'itens': itens_calculados
    }
    
    # 1. Salva meu_estoque_dados.json no CRM
    meu_estoque_path = os.path.join(BASE_DIR, 'meu_estoque_dados.json')
    with open(meu_estoque_path, 'w', encoding='utf-8') as f:
        json.dump(dados_estoque, f, ensure_ascii=False, indent=2)
    print(f"meu_estoque_dados.json salvo em: {meu_estoque_path}")

    # 2. Limpa quaisquer chaves operacionais antigas do catálogo público
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        cat_data = json.load(f)

    qtd_map = {}
    for item in ESTOQUE_LOCAL:
        cid = item['id_catalogo']
        if item['qtd'] > 0:
            qtd_map[cid] = qtd_map.get(cid, 0) + item['qtd']

    cat_data.pop('meu_estoque_resumo', None)
    cat_data.pop('meu_estoque_qtds', None)
    for p in cat_data.get('productos', []):
        p.pop('meu_estoque_qtd', None)

    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(cat_data, f, ensure_ascii=False, indent=2)

    # 3. Gera dados_catalogo.js público sem expor estoque físico nem compras em trânsito
    js_content = "window.SHAPETOTAL_RAW = " + json.dumps(cat_data, ensure_ascii=False) + ";\n"
    with open(DADOS_JS_PATH, 'w', encoding='utf-8') as f:
        f.write(js_content)

    # 3b. Gera semente local não-versionada para importação manual no CRM quando desejado
    compras_path = os.path.join(BASE_DIR, 'compras_transito_dados.json')
    pedidos_transito = []
    if os.path.exists(compras_path):
        try:
            with open(compras_path, 'r', encoding='utf-8') as fc:
                pedidos_transito = json.load(fc).get('pedidos', [])
        except Exception:
            pass
    seed_path = os.path.join(BASE_DIR, 'backup_local_crm_seed.json')
    with open(seed_path, 'w', encoding='utf-8') as fs_seed:
        json.dump({
            'meuEstoque': qtd_map,
            'custosReais': custos_reais_seed,
            'pedidosTransito': pedidos_transito
        }, fs_seed, ensure_ascii=False, indent=2)

    # 4. Mantém shapetotal_mobile.html como redirecionador seguro para index.html
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
        print(f"Aviso bundle: {e}")

    # 5. Gera PDF exclusivo: Catalogo_Pronta_Entrega_BH.pdf
    pdf_out = os.path.join(BASE_DIR, 'Catalogo_Pronta_Entrega_BH.pdf')
    pdf_downloads = os.path.join(DOWNLOADS_DIR, 'Catalogo_Pronta_Entrega_BH.pdf')
    pdf_desktop = os.path.join(DESKTOP_DIR, 'Catalogo_Pronta_Entrega_BH.pdf')

    styles = getSampleStyleSheet()
    
    prod_name_style = ParagraphStyle(
        'ProdNamePE', fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=colors.HexColor('#0f172a')
    )
    prod_sub_style = ParagraphStyle(
        'ProdSubPE', fontName='Helvetica', fontSize=8.5, leading=11.5, textColor=colors.HexColor('#475569')
    )
    price_pix_style = ParagraphStyle(
        'PricePixPE', fontName='Helvetica-Bold', fontSize=13, leading=15, textColor=colors.HexColor('#047857'), alignment=TA_RIGHT
    )
    price_cartao_style = ParagraphStyle(
        'PriceCartaoPE', fontName='Helvetica-Bold', fontSize=8.5, leading=11.5, textColor=colors.HexColor('#4338ca'), alignment=TA_RIGHT
    )
    price_parc_style = ParagraphStyle(
        'PriceParcPE', fontName='Helvetica', fontSize=7.5, leading=9.5, textColor=colors.HexColor('#64748b'), alignment=TA_RIGHT
    )

    doc = SimpleDocTemplate(
        pdf_out, pagesize=A4, leftMargin=26, rightMargin=26, topMargin=26, bottomMargin=26
    )

    story = []

    # Header Pronta Entrega BH
    topbar_data = [
        [
            Paragraph("<b>SHAPE TOTAL · PRONTA ENTREGA BELO HORIZONTE</b><br/><font size='8.5' color='#94a3b8'>ESTOQUE FÍSICO EM MÃOS · RETIRADA OU MOTOBOY HOJE</font>", ParagraphStyle('TopL', fontName='Helvetica-Bold', fontSize=12, leading=15, textColor=colors.HexColor('#ffffff'))),
            Paragraph("<b>⚡ DISPONIBILIDADE IMEDIATA</b><br/><font size='8' color='#34d399'>Tirzepatidas & Retatrutida 100% Originais</font>", ParagraphStyle('TopR', fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=colors.HexColor('#34d399'), alignment=TA_RIGHT))
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

    # Aviso de Retirada e Entrega
    notice_data = [[
        Paragraph("<b>Envio Expresso para BH e Região:</b> Produtos disponíveis para entrega no mesmo dia via motoboy ou retirada segura. Pagamento à vista no PIX com super desconto ou no Cartão de Crédito em até 12x sem juros para Tirzepatidas e Retatrutida.", ParagraphStyle('N1', fontName='Helvetica', fontSize=8.5, leading=12, textColor=colors.HexColor('#1e293b')))
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

    # Itens de pronta entrega
    for item in itens_calculados:
        if int(item.get('qtd', 0) or 0) <= 0:
            continue
        pid = item['id_catalogo']
        nome = item['nome']
        apres = item['apresentacao']
        qtd = item['qtd']
        pix = item['preco_pix']
        cartao = item['preco_cartao']
        num_parc = 12
        parc = round(cartao / num_parc, 2)
        obs = item['obs']

        # Imagem
        img_path = os.path.join(FOTOS_DIR, f"producto-{pid}.jpg")
        img_el = None
        if os.path.exists(img_path):
            try:
                with PILImage.open(img_path) as im:
                    w, h = im.size
                    ratio = min(85 / w, 85 / h)
                    img_el = RLImage(img_path, width=w * ratio, height=h * ratio)
            except Exception:
                pass
        if not img_el:
            img_el = Paragraph("<font size='8' color='#94a3b8'>[Foto Oficial<br/>Shape Total]</font>", ParagraphStyle('NoImg', alignment=TA_CENTER))

        str_pix = f"R$ {pix:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')
        str_cartao = f"R$ {cartao:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')
        str_parc = f"R$ {parc:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')

        details_cell = [
            Paragraph(f"<b>{nome}</b>", prod_name_style),
            Spacer(1, 2),
            Paragraph(f"<b>Apresentação:</b> {apres}", prod_sub_style),
            Spacer(1, 1.5),
            Paragraph(f"<font color='#047857'><b>● EM ESTOQUE HOJE: {qtd} un</b></font> &nbsp;•&nbsp; <font color='#64748b'>{obs}</font>", prod_sub_style)
        ]

        price_cell = [
            Paragraph(f"<font size='7' color='#047857'>À VISTA NO PIX</font><br/><b>{str_pix}</b>", price_pix_style),
            Spacer(1, 2),
            Paragraph(f"<font size='7' color='#4338ca'>NO CARTÃO</font><br/><b>{str_cartao}</b>", price_cartao_style),
            Paragraph(f"em até {num_parc}x de {str_parc} s/ juros", price_parc_style)
        ]

        row_data = [[img_el, details_cell, price_cell]]
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

        story.append(t_prod)
        story.append(Spacer(1, 4))

    doc.build(story)
    print(f"PDF de Pronta Entrega gerado em: {pdf_out}")

    # Copia para Downloads e Desktop
    shutil.copy2(pdf_out, pdf_downloads)
    shutil.copy2(pdf_out, pdf_desktop)
    print("Copiado com sucesso para Downloads e Desktop!")

if __name__ == '__main__':
    main()
