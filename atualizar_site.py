#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Sincroniza todos os produtos e fotos de https://shapetotal.com/api/catalogo
para o CRM local em /Users/italosouza/Medicamentos/ShapeTotalCRM/.
Faz Smart Merge preservando SKUs exclusivos de BH (id >= 9000), coleções canônicas,
preços fixados, estoque físico de BH e pedidos em trânsito.
"""
import json
import os
import urllib.request
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_DIR = '/Users/italosouza/Medicamentos/ShapeTotalCRM'
FOTOS_DIR = os.path.join(BASE_DIR, 'fotos')
API_URL = 'https://shapetotal.com/api/catalogo'
LOG_FILE = os.path.join(BASE_DIR, 'sync.log')
JSON_PATH = os.path.join(BASE_DIR, 'catalogo_dados.json')
DADOS_JS_PATH = os.path.join(BASE_DIR, 'dados_catalogo.js')
COMPRAS_PATH = os.path.join(BASE_DIR, 'compras_transito_dados.json')

ESTOQUE_BH_CANONICO = {
    "2848": 4,
    "2889": 4,
    "3207": 1,
    "3136": 1,
    "3370": 1,
    "2830": 3,
    "9001": 3,
    "9002": 3,
    "9003": 3,
    "9004": 2,
    "9005": 1,
    "9006": 1
}

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
    log("Iniciando sincronização diária inteligente da Shape Total...")
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

        # Preserva coleções, descrição comercial e preços fixos
        if old.get('colecao_id'):
            p['colecao_id'] = old['colecao_id']
            p['colecao_nome'] = old.get('colecao_nome', '')
        else:
            cid, cnome = classificar_colecao(p)
            p['colecao_id'] = cid
            p['colecao_nome'] = cnome

        for k in ('desc_comercial', 'preco_pix_fixo', 'preco_cartao_fixo', 'meu_estoque_qtd'):
            if k in old:
                p[k] = old[k]

        merged_prods.append(p)

    # Re-adiciona SKUs exclusivos locais (id >= 9000)
    for custom_p in local_custom_skus:
        if custom_p.get('id') not in api_ids:
            merged_prods.append(custom_p)

    raw_data['productos'] = merged_prods
    raw_data['meu_estoque_qtds'] = local_data.get('meu_estoque_qtds', ESTOQUE_BH_CANONICO)
    if 'meu_estoque_resumo' in local_data:
        raw_data['meu_estoque_resumo'] = local_data['meu_estoque_resumo']

    # Salva catalogo_dados.json enriquecido
    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(raw_data, f, ensure_ascii=False, indent=2)

    # Carrega pedidos em trânsito
    pedidos_transito = []
    if os.path.exists(COMPRAS_PATH):
        try:
            with open(COMPRAS_PATH, 'r', encoding='utf-8') as f:
                pedidos_transito = json.load(f).get('pedidos', [])
        except Exception:
            pass

    # Gera dados_catalogo.js completo
    js_content = (
        "window.SHAPETOTAL_RAW = " + json.dumps(raw_data, ensure_ascii=False) + ";\n"
        "window.ESTOQUE_BH_CANONICO = " + json.dumps(raw_data['meu_estoque_qtds'], ensure_ascii=False) + ";\n"
        "window.PEDIDOS_TRANSITO_INICIAIS = " + json.dumps(pedidos_transito, ensure_ascii=False) + ";\n"
    )
    with open(DADOS_JS_PATH, 'w', encoding='utf-8') as f:
        f.write(js_content)

    # Baixa fotos novas se houver
    prods_with_foto = [p for p in merged_prods if p.get('foto') and int(p.get('id', 0)) < 9000]
    def dl(p):
        dest = os.path.join(FOTOS_DIR, f"producto-{p['id']}.jpg")
        if os.path.exists(dest) and os.path.getsize(dest) > 100:
            return False
        try:
            r = urllib.request.Request('https://shapetotal.com' + p['foto'], headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(r, timeout=12) as res:
                b = res.read()
                if len(b) > 100:
                    with open(dest, 'wb') as out:
                        out.write(b)
                    return True
        except Exception:
            return False
        return False

    novas_fotos = 0
    with ThreadPoolExecutor(max_workers=16) as ex:
        for fut in as_completed([ex.submit(dl, p) for p in prods_with_foto]):
            if fut.result():
                novas_fotos += 1

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

    log(f"Sincronização concluída com sucesso: {len(merged_prods)} SKUs | {novas_fotos} novas fotos.")

if __name__ == '__main__':
    main()
