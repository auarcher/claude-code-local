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
- [x] Verificação adversarial (7 temas) — 7/7 gravadas: 90 afirmações confirmadas, 0 "Mudou", 1 "Não achei" (a constatação de que não há diretriz brasileira sobre o tema). Workflow wf_bdc5345e-fcd concluído: 14 agentes, 593 chamadas de ferramenta, 66 min.
- [x] Texto ajustado a cada verificação (cinética da AST, FA quase normal, ACG 2021, Roma V dor tardia); tabela verificacao-diretrizes.md regenerada por gerar-tabela.py
- [ ] Crítica clínica e de forma (1 agente Opus, workflow wf_11f70b67-fc9, em andamento) — resultados/critica.json
- [ ] PDF final entregue


Orçamento (medido em 31/10 ~15h15, arquivos dos agentes): 15 agentes = 6,69 M de criação de cache + 0,97 M de saída = 7,66 M (sem releitura de cache; com releitura, 143 M). Já passou o teto de 6 M dito no início; estimativa de fechamento ~11 M com as 6 verificações e 1 crítico. Qual contagem vale para o plano: não verificado.

Orçamento pela contagem do próprio harness (subagent_tokens): workflow de pesquisa+verificação 3,82 M (14 agentes) + agente extra 0,51 M = 4,33 M, abaixo do teto de 6 M. A contagem pelos arquivos dos agentes (7,66 M) inclui criação de cache; qual das duas vale para o plano: não verificado. O crítico final acrescenta ~0,3 a 0,5 M.
