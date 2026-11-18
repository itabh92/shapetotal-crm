#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Motor centralizado de precificação da Shape Total CRM.
Única fonte de verdade lida de pricing_config.json e compartilhada entre:
- pricing_config.js (browser CRM)
- atualizar_site.py
- registrar_meu_estoque.py
- gerar_todos_catalogos_oficiais.py
- gerar_catalogo_tabela_fechada.py
"""

import json
import math
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_JSON_PATH = os.path.join(BASE_DIR, 'pricing_config.json')
CONFIG_JS_PATH = os.path.join(BASE_DIR, 'pricing_config.js')


def load_pricing_config():
    with open(CONFIG_JSON_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)


def write_pricing_config_js(cfg=None):
    if cfg is None:
        cfg = load_pricing_config()
    js_body = (
        "// Arquivo gerado automaticamente a partir de pricing_config.json.\n"
        "// Nao edite manualmente sem atualizar pricing_config.json.\n"
        "window.SHAPETOTAL_PRICING_CONFIG = "
        + json.dumps(cfg, ensure_ascii=False, indent=2)
        + ";\n"
    )
    with open(CONFIG_JS_PATH, 'w', encoding='utf-8') as f:
        f.write(js_body)
    return CONFIG_JS_PATH


def round_retail_brl(val, cfg=None):
    """Arredondamento comercial monotonicamente crescente sem centavos quebrados."""
    n = float(val or 0)
    if n <= 0 or not math.isfinite(n):
        return 0
    if cfg is None:
        cfg = load_pricing_config()
    rounding = cfg.get('rounding', {})
    b50 = int(rounding.get('below50Step', 1) or 1)
    m50 = int(rounding.get('from50To299Step', 5) or 5)
    m300 = int(rounding.get('from300Step', 10) or 10)
    if n < 50:
        return int(math.ceil(n / b50) * b50)
    if n < 300:
        return int(math.ceil(n / m50) * m50)
    return int(math.ceil(n / m300) * m300)


def map_category_to_group_key(product_or_cat):
    """Mapeia produto ou categoria para uma das 8 faixas canônicas de margem."""
    if isinstance(product_or_cat, dict):
        cat = (product_or_cat.get('categoria') or '').lower().strip()
        nom = (product_or_cat.get('nombre') or '').lower()
        comp = (product_or_cat.get('composicion') or '').lower()
        txt = f"{nom} {comp}".strip()
    else:
        cat = str(product_or_cat or '').lower().strip()
        txt = ''

    # HGH / Somatropina mesmo quando rotulada como anabolizante pela API
    if cat == 'hgh' or any(k in txt for k in (
        'somatropin', 'somatrop', 'landertropin', 'plextropin', 'genotropin', 'omnitrope', 'kigtropin', 'spectrus'
    )):
        if 'multi pen' not in txt and 'caneta multi pen' not in txt:
            return 'hgh'

    if cat in ('emagrecedores', 'queimador', 'insulina') or any(k in txt for k in (
        'tirzepatid', 'tirzep', 'retatrutid', 'retratutid', 'semaglutid', 'mounjaro', 'ozempic', 'liraglutid'
    )):
        if 'semax' not in txt:
            return 'emagrecedores'

    if cat == 'anabolizante':
        return 'anabolizante'

    if cat == 'peptideo' or (not cat and any(k in txt for k in (
        'igf1', 'igf-1', 'pt-141', 'pt 141', 'bpc-157', 'tb-500', 'cjc', 'ipamorelin', 'epithalon', 'mots-c'
    ))):
        return 'peptideo'

    if cat in ('sarms', 'post ciclo', 'hcg'):
        return 'sarms_post'

    if cat in ('estetico', 'botox', 'cosmetico', 'anti acne', 'capilar', 'mascara de cabello'):
        return 'estetico'

    if cat in ('saude mental', 'cbd', 'parar de fumar') or 'cannabidiol' in txt or any(k in txt for k in (
        'semax', 'selank', 'modafinil', 'lisdexanfetamina'
    )):
        return 'saude_mental'

    return 'potencia_suporte'


def resolve_strategic_tier(product, custo, gkey=None, cfg=None):
    """Decide entre 'rec' e 'max' por perfil de margem, ticket e elasticidade."""
    if cfg is None:
        cfg = load_pricing_config()
    if gkey is None:
        gkey = map_category_to_group_key(product)
    strategy = cfg.get('tierStrategy', {})
    always_rec = set(strategy.get('alwaysRecGroups', ['hgh']))
    always_max = set(strategy.get('alwaysMaxGroups', ['potencia_suporte']))

    if gkey in always_rec:
        return 'rec', 'Ticket alto / mercado competitivo'
    if gkey in always_max:
        return 'max', 'Ticket baixo de conveniência'

    nom = (product.get('nombre') or '').lower()
    comp = (product.get('composicion') or '').lower()
    txt = f"{nom} {comp}".strip()

    if gkey == 'emagrecedores':
        emag_cfg = strategy.get('emagrecedores', {})
        reta_cutoff = float(emag_cfg.get('retatrutidaMaxCostCutoff', 1800))
        def_cutoff = float(emag_cfg.get('defaultMaxCostCutoff', 350))
        if 'retatrutid' in txt or 'retratutid' in txt:
            if custo > reta_cutoff:
                return 'rec', 'Retatrutida ultra-ticket'
            return 'max', 'Retatrutida alta demanda'
        if custo <= def_cutoff:
            return 'max', 'Ampola/emagrecedor ticket acessível'
        return 'rec', 'GLP-1 competitivo de giro'

    if gkey == 'peptideo':
        pep_cutoff = float(strategy.get('peptideoMaxCostCutoff', 700))
        if custo <= pep_cutoff:
            return 'max', 'Peptídeo de nicho técnico'
        return 'rec', 'Peptídeo ticket alto'

    def_cutoff = float(strategy.get('defaultMaxCostCutoff', 300))
    if custo <= def_cutoff:
        return 'max', 'Ticket acessível (+lucro)'
    return 'rec', 'Ticket médio/alto competitivo'


def compute_product_pricing(product, tier='auto', cotacao=None, frete_pct=None, taxa_cartao_pct=None, cfg=None):
    """Calcula custo aterrisado e faixas Mínimo / Recomendado / Máximo + Cartão 12x sem perda."""
    if cfg is None:
        cfg = load_pricing_config()
    cot = float(cotacao if cotacao is not None else cfg['cotacao'])
    frete = float(frete_pct if frete_pct is not None else cfg['fretePct'])
    cartao_pct = float(taxa_cartao_pct if taxa_cartao_pct is not None else cfg['taxaCartaoPct'])
    min_valid_usd = float(cfg.get('minValidUsd', 0.05))

    usd = float(product.get('precio') or 0)
    mult_custo = cot * (1.0 + frete / 100.0)
    custo = round(usd * mult_custo, 2)

    gkey = map_category_to_group_key(product)
    gm = cfg['groupMargins'].get(gkey, cfg['groupMargins']['potencia_suporte'])
    min_pct = float(gm['min'])
    rec_pct = float(gm['rec'])
    max_pct = float(gm['max'])

    if usd <= min_valid_usd:
        return {
            'usd': usd,
            'mult_custo': mult_custo,
            'custo': custo,
            'group_key': gkey,
            'min_pct': min_pct,
            'rec_pct': rec_pct,
            'max_pct': max_pct,
            'effective_tier': 'rec',
            'tier_reason': 'USD pendente',
            'preco_min': 0,
            'preco_rec': 0,
            'preco_max': 0,
            'preco_pix': 0,
            'preco_cartao': 0,
            'parcela_12x': 0.0,
            'liquido_12x': 0.0,
            'lucro_pix': 0.0,
            'has_price_issue': True,
        }

    preco_min = round_retail_brl(custo * (1.0 + min_pct / 100.0), cfg)
    preco_rec = round_retail_brl(custo * (1.0 + rec_pct / 100.0), cfg)
    preco_max = round_retail_brl(custo * (1.0 + max_pct / 100.0), cfg)

    effective_tier = tier
    tier_reason = ''
    if tier == 'auto':
        effective_tier, tier_reason = resolve_strategic_tier(product, custo, gkey, cfg)

    if effective_tier == 'min':
        preco_pix = preco_min
    elif effective_tier == 'max':
        preco_pix = preco_max
    else:
        effective_tier = 'rec'
        preco_pix = preco_rec

    preco_cartao = round_retail_brl(preco_pix * (1.0 + cartao_pct / 100.0), cfg)
    liquido_12x = round(preco_cartao / (1.0 + cartao_pct / 100.0), 2) if preco_cartao > 0 else 0.0
    parcela_12x = round(preco_cartao / 12.0, 2) if preco_cartao > 0 else 0.0

    return {
        'usd': usd,
        'mult_custo': mult_custo,
        'custo': custo,
        'group_key': gkey,
        'min_pct': min_pct,
        'rec_pct': rec_pct,
        'max_pct': max_pct,
        'effective_tier': effective_tier,
        'tier_reason': tier_reason,
        'preco_min': preco_min,
        'preco_rec': preco_rec,
        'preco_max': preco_max,
        'preco_pix': preco_pix,
        'preco_cartao': preco_cartao,
        'parcela_12x': parcela_12x,
        'liquido_12x': liquido_12x,
        'lucro_pix': round(preco_pix - custo, 2),
        'has_price_issue': False,
    }


def compute_dose_table(product, tier='auto', cfg=None):
    """Calcula preços dinâmicos por dose fracionada (mg) para frascos de 120mg."""
    if cfg is None:
        cfg = load_pricing_config()
    pid_str = str(product.get('id'))
    vial_cfg = cfg.get('doseVials', {}).get(pid_str)
    if not vial_cfg:
        return None
    pricing = compute_product_pricing(product, tier=tier, cfg=cfg)
    total_mg = float(vial_cfg.get('totalMg', 120) or 120)
    dose_step = int(cfg.get('rounding', {}).get('doseStep', 5) or 5)
    base_per_mg = pricing['preco_pix'] / total_mg if pricing['preco_pix'] > 0 else 0
    doses_out = []
    for d in vial_cfg.get('doses', []):
        mg = float(d['mg'])
        fator = float(d['fatorFracionamento'])
        raw = base_per_mg * mg * fator
        preco = int(math.ceil(raw / dose_step) * dose_step) if raw > 0 else 0
        doses_out.append({
            'mg': mg,
            'label': d['label'],
            'preco': preco,
            'fullLabel': f"{d['label']} — R$ {preco:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.'),
        })
    return {
        **vial_cfg,
        'frascoPricing': pricing,
        'doses': doses_out,
    }


if __name__ == '__main__':
    path = write_pricing_config_js()
    print(f'pricing_config.js atualizado em: {path}')
