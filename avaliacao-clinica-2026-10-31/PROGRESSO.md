# Avaliação clínica 2026-10-31 — progresso

Projeto: dor epigástrica + transaminases/GGT altas, pós-colecistectomia, 50 anos. Entrega: PDF no design system "Briefing técnico" (artefato claude.ai de 29/10/2026).
Teto combinado: 6 M tokens (~17 agentes Opus 5.5: 7 pesquisa + 7 verificação + 1 fontes brasileiras/de maior nome + 2 crítica).

Regra de fontes (Lucas, 31/10 ~12h): brasileira primeiro (SBH, FBG, CBC/CBCD, SOBED, Ministério da Saúde, ANVISA); depois diretriz internacional de maior nome na edição mais recente (ASGE, ESGE, ACG, Tóquio, EASL). UpToDate fora. Série antiga/pequena e relato de caso não entram no PDF; ficam só como apoio na tabela de verificação. Onde não há diretriz brasileira, o PDF diz isso.

- [x] Design system lido (tokens, bundle.css, componentes); fontes Barlow baixadas em fonts/
- [x] Rascunho do PDF (avaliacao.html → avaliacao.pdf, 4 páginas, sem nome nem datas da paciente); páginas cabendo com folga de 7 a 33 mm
- [x] Correção de horário: controle das 15h30 é ~21 h após a dor (não 45 h); página 3 reescrita
- [x] Pesquisa em fonte primária (7 temas) — 7/7 gravados em resultados/
- [x] Agente extra de fontes brasileiras e de maior nome gravado (resultados/fontes-de-maior-nome.json, 40 afirmações)
- [x] PR #3 mergeado pelo Lucas em 31/10 ~15h13 (até o commit 3d17479). O trabalho segue na mesma branch, refeita a partir do main; o que vier depois vai em PR novo.
- [ ] Verificação adversarial (7 temas) — 1/7 gravada (asge-esge: 14/14 confirmadas)
- [ ] Ajuste do texto com as fontes verificadas; tabela verificacao-diretrizes.md
- [ ] Crítica clínica e de forma (reduzida a 1 agente por causa do orçamento)
- [ ] PDF final entregue


Orçamento (medido em 31/10 ~15h15, arquivos dos agentes): 15 agentes = 6,69 M de criação de cache + 0,97 M de saída = 7,66 M (sem releitura de cache; com releitura, 143 M). Já passou o teto de 6 M dito no início; estimativa de fechamento ~11 M com as 6 verificações e 1 crítico. Qual contagem vale para o plano: não verificado.
