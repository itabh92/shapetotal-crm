# ShapeTotalCRM — Política Local

Herda `/Users/italosouza/AGENTS.md`, `/Users/italosouza/PROJECTS.md` e `/Users/italosouza/.agents/rules/engenharia-maxima.md`.
Para contexto arquitetural, ler `/Users/italosouza/Medicamentos/ShapeTotalCRM/ARQUITETURA_TECNICA_CRM.md`.

## Regras locais
- Catálogo/CRM próprio com Git independente (`github.com/itabh92/shapetotal-crm`) — **não** é o Estoque Italo (`/Users/italosouza/Projetos/Estoque`).
- Stack Vanilla JS/HTML/CSS + Python 3 sem dependências pesadas de build; não adicionar dependências sem justificativa explícita.
- Validar toda alteração rodando `node --test tests/` (e `node --check` / `py_compile` nos arquivos alterados) e exibindo a saída real.
