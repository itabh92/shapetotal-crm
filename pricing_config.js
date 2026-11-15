// Arquivo gerado automaticamente a partir de pricing_config.json.
// Nao edite manualmente sem atualizar pricing_config.json.
window.SHAPETOTAL_PRICING_CONFIG = {
  "version": "2026-11-14-v2",
  "updatedAt": "2026-11-14",
  "currencyNote": "Custo fixo = USD site * cotacao * (1 + fretePct / 100). Frete fixo 30%; muda apenas Dolar ou preco USD do site.",
  "cotacao": 5.8,
  "fretePct": 30,
  "taxaCartaoPct": 12,
  "minValidUsd": 0.05,
  "rounding": {
    "below50Step": 1,
    "from50To299Step": 5,
    "from300Step": 10,
    "doseStep": 5
  },
  "groupMargins": {
    "emagrecedores": {
      "label": "🔥 GLP-1 & Emagrecedores",
      "min": 35,
      "rec": 48,
      "max": 65
    },
    "anabolizante": {
      "label": "💪 Anabolizantes",
      "min": 40,
      "rec": 55,
      "max": 75
    },
    "hgh": {
      "label": "🧬 HGH Somatropina",
      "min": 28,
      "rec": 35,
      "max": 48
    },
    "peptideo": {
      "label": "⚗️ Peptídeos Bio-Regenerativos",
      "min": 35,
      "rec": 52,
      "max": 70
    },
    "sarms_post": {
      "label": "🧪 SARMs, Pós-Ciclo & HCG",
      "min": 38,
      "rec": 55,
      "max": 75
    },
    "estetico": {
      "label": "✨ Estético, Botox & Pele",
      "min": 38,
      "rec": 55,
      "max": 75
    },
    "saude_mental": {
      "label": "🧠 Saúde Mental, Nootrópicos & CBD",
      "min": 38,
      "rec": 55,
      "max": 75
    },
    "potencia_suporte": {
      "label": "⚡ Potência, Diluentes & Suporte",
      "min": 50,
      "rec": 75,
      "max": 100
    }
  },
  "doseVials": {
    "9006": {
      "id": 9006,
      "nome": "Tirzepatide Injection 120mg/4ml (30mg/ml)",
      "marca": "USA Peptides",
      "totalMg": 120,
      "fotoTabela": "fotos/tabela_doses_tirzepatida_120mg.jpg",
      "doses": [
        {
          "mg": 2.5,
          "label": "2,5 mg",
          "fatorFracionamento": 2.5
        },
        {
          "mg": 5.0,
          "label": "5,0 mg",
          "fatorFracionamento": 2.35
        },
        {
          "mg": 7.5,
          "label": "7,5 mg",
          "fatorFracionamento": 2.25
        }
      ]
    },
    "9005": {
      "id": 9005,
      "nome": "Retatrutide 120 mg (GLP-1, GIP, Glucagon)",
      "marca": "GEN-HEALTH",
      "totalMg": 120,
      "fotoTabela": "fotos/tabela_doses_retatrutida_120mg.jpg",
      "doses": [
        {
          "mg": 2.5,
          "label": "2,5 mg",
          "fatorFracionamento": 3.0
        },
        {
          "mg": 5.0,
          "label": "5,0 mg",
          "fatorFracionamento": 2.85
        },
        {
          "mg": 7.5,
          "label": "7,5 mg",
          "fatorFracionamento": 2.7
        }
      ]
    }
  }
};
