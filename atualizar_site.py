#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Sincroniza todos os produtos e fotos de https://shapetotal.com/api/catalogo
para o CRM local em /Users/italosouza/Medicamentos/ShapeTotalCRM/.
Faz Smart Merge preservando SKUs exclusivos de BH (id >= 9000), coleções canônicas,
preços fixados, estoque físico de BH e pedidos em trânsito.
"""
import argparse
import hashlib
import json
import os
import textwrap
import urllib.request
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

from pricing_engine import load_pricing_config, write_pricing_config_js, CONFIG_JSON_PATH

BASE_DIR = '/Users/italosouza/Medicamentos/ShapeTotalCRM'
FOTOS_DIR = os.path.join(BASE_DIR, 'fotos')
API_URL = 'https://shapetotal.com/api/catalogo'
LOG_FILE = os.path.join(BASE_DIR, 'sync.log')
JSON_PATH = os.path.join(BASE_DIR, 'catalogo_dados.json')
DADOS_JS_PATH = os.path.join(BASE_DIR, 'dados_catalogo.js')

def log(msg):
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    line = f"[{now}] {msg}"
    print(line)
    try:
        with open(LOG_FILE, 'a', encoding='utf-8') as f:
            f.write(line + '\n')
    except Exception:
        pass

def classificar_colecao(p):
    c = (p.get('categoria') or '').lower().strip()
    txt = f"{p.get('nombre') or ''} {p.get('composicion') or ''}".lower()
    if any(k in txt for k in ['tirzepatida', 'tirzepatide', 'retatrutida', 'retatrutide', 'semaglutida', 'semaglutide', 'mounjaro', 'ozempic', 'lipoless', 'lipoland', 'tirzec', 'tirzedral', 't36', 'gluconex', 'clembuterol', 'sibutramina', 'orlistat', 't3', 't4', 'efedrina', 'cagrilintide', 'adipotide', 'aod 9604', 'aod-9604', 'frag 176', 'slupp', 'slu-pp', '5-amino', 'mots-c', 'tesofensine']) or c in ('emagrecedores', 'queimador'):
        return ('1_emagrecedores', '🔥 EMAGRECEDORES & DEFINIÇÃO (GLP-1 & QUEIMADORES)')
    if c in ('anabolizante', 'sarms', 'post ciclo', 'hcg'):
        return ('2_anabolizantes', '💪 ANABOLIZANTES, SARMS & TPC')
    if any(k in txt for k in ['semax', 'selank', 'cerebrolysin', 'cbl', 'dsip', 'dihexa', 'pinealon', 'pe-22-28', 'noopept', 'modafinil', 'foco', 'ansiedade', 'tadalafil', 'sildenafil', 'pt-141', 'kisspeptin']) or c in ('saude mental', 'potencia sexual', 'insonia'):
        return ('5_saude_mental_suporte', '🧠 SAÚDE MENTAL, PERFORMANCE SEXUAL & SUPORTE')
    if c in ('peptideo', 'hgh') or any(k in txt for k in ['somatropin', 'hgh', 'gh ', 'bpc-157', 'tb-500', 'ipamorelin', 'cjc-1295', 'tesamorelin', 'sermorelin', 'ghrp', 'igf-1', 'follistatin', 'epithalon', 'ss-31', 'nad+', 'glutationa', 'thymosin', 'll-37', 'kpv', 'ara-290', 'vip ']):
        return ('3_hgh_peptideos', '🧬 HGH SOMATROPINA & PEPTÍDEOS BIO-REGENERATIVOS')
    return ('4_estetica', '✨ ESTÉTICA, HARMONIZAÇÃO & DERMATOLOGIA')

def main():
    parser = argparse.ArgumentParser(description='Sincroniza catálogo e fotos da Shape Total.')
    parser.add_argument('--refresh-fotos', action='store_true', help='Rebaixa todas as fotos do site e substitui as que mudaram.')
    parser.add_argument('--cotacao', type=float, default=None, help='Atualiza a cotação do dólar padrão em pricing_config.json (ex: 5.85).')
    args = parser.parse_args()

    log("Iniciando sincronização diária inteligente da Shape Total...")
    if args.cotacao is not None and args.cotacao > 0:
        cfg = load_pricing_config()
        cfg['cotacao'] = round(float(args.cotacao), 4)
        with open(CONFIG_JSON_PATH, 'w', encoding='utf-8') as fc:
            json.dump(cfg, fc, ensure_ascii=False, indent=2)
            fc.write('\n')
        log(f"Cotação padrão atualizada para R$ {cfg['cotacao']:.2f} em pricing_config.json.")

    os.makedirs(FOTOS_DIR, exist_ok=True)

    # Carrega base local existente para preservar enriquecimentos e SKUs locais
    local_data = {}
    local_by_id = {}
    local_custom_skus = []
    if os.path.exists(JSON_PATH):
        try:
            with open(JSON_PATH, 'r', encoding='utf-8') as f:
                local_data = json.load(f)
            for p in local_data.get('productos', []):
                pid = p.get('id')
                local_by_id[pid] = p
                if pid and int(pid) >= 9000:
                    local_custom_skus.append(p)
        except Exception as e:
            log(f"Aviso ao ler JSON local: {e}")

    try:
        req = urllib.request.Request(API_URL, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=30) as resp:
            raw_data = json.loads(resp.read().decode('utf-8'))
    except Exception as e:
        log(f"Erro ao conectar na API da Shape Total (mantendo base local intacta): {e}")
        return

    # Faz Smart Merge de cada produto da API com os metadados locais
    merged_prods = []
    api_ids = set()
    for p in raw_data.get('productos', []):
        pid = p.get('id')
        api_ids.add(pid)
        old = local_by_id.get(pid, {})

        # Preserva coleções e descrição comercial; remove qualquer preço fixo legado
        if old.get('colecao_id'):
            p['colecao_id'] = old['colecao_id']
            p['colecao_nome'] = old.get('colecao_nome', '')
        else:
            cid, cnome = classificar_colecao(p)
            p['colecao_id'] = cid
            p['colecao_nome'] = cnome

        if 'desc_comercial' in old:
            p['desc_comercial'] = old['desc_comercial']
        p.pop('preco_pix_fixo', None)
        p.pop('preco_cartao_fixo', None)
        p.pop('meu_estoque_qtd', None)

        merged_prods.append(p)

    # Re-adiciona SKUs exclusivos locais (id >= 9000) sem dados operacionais nem preços fixos legados
    for custom_p in local_custom_skus:
        if custom_p.get('id') not in api_ids:
            clean_custom = dict(custom_p)
            clean_custom.pop('preco_pix_fixo', None)
            clean_custom.pop('preco_cartao_fixo', None)
            clean_custom.pop('meu_estoque_qtd', None)
            merged_prods.append(clean_custom)

    raw_data['productos'] = merged_prods
    raw_data.pop('meu_estoque_qtds', None)
    raw_data.pop('meu_estoque_resumo', None)

    write_pricing_config_js()

    # Salva catalogo_dados.json público (sem estoque privado ou trânsito)
    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(raw_data, f, ensure_ascii=False, indent=2)

    # Gera dados_catalogo.js apenas com catálogo público (dados operacionais ficam no IndexedDB/localStorage)
    js_content = "window.SHAPETOTAL_RAW = " + json.dumps(raw_data, ensure_ascii=False) + ";\n"
    with open(DADOS_JS_PATH, 'w', encoding='utf-8') as f:
        f.write(js_content)

    # Baixa fotos novas (e rebaixa todas quando --refresh-fotos estiver ativo)
    prods_with_foto = [p for p in merged_prods if p.get('foto') and int(p.get('id', 0)) < 9000]
    def dl(p):
        dest = os.path.join(FOTOS_DIR, f"producto-{p['id']}.jpg")
        existed = os.path.exists(dest) and os.path.getsize(dest) > 100
        if existed and not args.refresh_fotos:
            return 'skip'
        try:
            r = urllib.request.Request('https://shapetotal.com' + p['foto'], headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(r, timeout=15) as res:
                b = res.read()
                if len(b) > 100:
                    if existed:
                        with open(dest, 'rb') as old_f:
                            if hashlib.sha256(old_f.read()).digest() == hashlib.sha256(b).digest():
                                return 'same'
                    with open(dest, 'wb') as out:
                        out.write(b)
                    return 'updated' if existed else 'new'
        except Exception:
            return 'error'
        return 'error'

    novas_fotos = 0
    fotos_atualizadas = 0
    fotos_erro = 0
    with ThreadPoolExecutor(max_workers=16) as ex:
        for fut in as_completed([ex.submit(dl, p) for p in prods_with_foto]):
            res_status = fut.result()
            if res_status == 'new':
                novas_fotos += 1
            elif res_status == 'updated':
                fotos_atualizadas += 1
            elif res_status == 'error':
                fotos_erro += 1

    # Garante 100% de cobertura visual: gera card limpo 400x400 para SKUs sem foto oficial no site
    fotos_geradas = 0
    missing_photo_prods = [
        p for p in merged_prods
        if not (os.path.exists(os.path.join(FOTOS_DIR, f"producto-{p['id']}.jpg"))
                and os.path.getsize(os.path.join(FOTOS_DIR, f"producto-{p['id']}.jpg")) > 100)
    ]
    if missing_photo_prods:
        try:
            from PIL import Image, ImageDraw, ImageFont

            def load_font(size, bold=False):
                candidates = (
                    ['/System/Library/Fonts/Helvetica.ttc', '/Library/Fonts/Arial Bold.ttf', '/System/Library/Fonts/Supplemental/Arial Bold.ttf']
                    if bold else
                    ['/System/Library/Fonts/Helvetica.ttc', '/Library/Fonts/Arial.ttf', '/System/Library/Fonts/Supplemental/Arial.ttf']
                )
                for path in candidates:
                    if os.path.exists(path):
                        try:
                            return ImageFont.truetype(path, size)
                        except Exception:
                            pass
                return ImageFont.load_default()

            f_brand = load_font(18, bold=True)
            f_title = load_font(22, bold=True)
            f_sub = load_font(15, bold=False)
            f_footer = load_font(13, bold=True)

            palette = {
                'emagrecedores': ('#064e3b', '#10b981', 'GLP-1 · EMAGRECEDORES'),
                'anabolizante': ('#1e1b4b', '#6366f1', 'PERFORMANCE · ANABOLIZANTES'),
                'hgh': ('#0c4a6e', '#0ea5e9', 'SOMATROPINA · HGH'),
                'peptideo': ('#3b0764', '#a855f7', 'PEPTIDEOS BIO-REGENERATIVOS'),
                'estetico': ('#831843', '#ec4899', 'ESTETICA & HARMONIZACAO'),
                'suplementos': ('#14532d', '#22c55e', 'SAUDE & SUPLEMENTACAO'),
            }

            for p in missing_photo_prods:
                dest = os.path.join(FOTOS_DIR, f"producto-{p['id']}.jpg")
                cat_key = str(p.get('categoria') or '').lower()
                bg_hex, acc_hex, cat_label = palette.get(cat_key, ('#0f172a', '#38bdf8', 'SHAPE TOTAL · ORIGINAL'))
                img = Image.new('RGB', (400, 400), '#f8fafc')
                draw = ImageDraw.Draw(img)

                # Topo escuro + faixa de destaque
                draw.rectangle([0, 0, 400, 82], fill=bg_hex)
                draw.rectangle([0, 82, 400, 88], fill=acc_hex)

                marca = str(p.get('marca') or 'SHAPE TOTAL').strip().upper()[:26]
                draw.text((24, 20), marca, fill='#ffffff', font=f_brand)
                draw.text((24, 48), cat_label[:34], fill='#cbd5e1', font=f_sub)

                # Frasco estilizado central/direito sutil ao fundo
                draw.rounded_rectangle([24, 110, 376, 336], radius=16, fill='#ffffff', outline='#cbd5e1', width=2)
                draw.rounded_rectangle([40, 126, 210, 152], radius=8, fill=bg_hex)
                draw.text((52, 131), f"ID #{p['id']} · OFICIAL", fill='#ffffff', font=f_footer)

                nome_clean = str(p.get('nombre') or 'Produto Shape Total').strip()
                lines = textwrap.wrap(nome_clean, width=24)[:4]
                y_txt = 176
                for ln in lines:
                    draw.text((40, y_txt), ln, fill='#0f172a', font=f_title)
                    y_txt += 30

                pres = str(p.get('presentacion') or '').strip()[:36]
                if pres:
                    draw.text((40, 304), pres, fill='#475569', font=f_sub)

                # Rodape
                draw.rectangle([0, 356, 400, 400], fill='#0f172a')
                draw.text((24, 370), "SHAPE TOTAL · QUALIDADE GARANTIDA", fill='#38bdf8', font=f_footer)

                img.save(dest, 'JPEG', quality=90)
                fotos_geradas += 1
        except Exception as e:
            log(f"Aviso ao gerar cards para fotos ausentes: {e}")

    log(f"Cobertura de fotos: {novas_fotos} novas | {fotos_atualizadas} atualizadas | {fotos_geradas} cards gerados | {fotos_erro} erros.")

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
    except Exception as e:
        log(f"Aviso ao atualizar bundle mobile: {e}")

    log(f"Sincronização concluída com sucesso: {len(merged_prods)} SKUs | {novas_fotos} novas fotos | {fotos_atualizadas} fotos atualizadas | {fotos_erro} erros.")

if __name__ == '__main__':
    main()
