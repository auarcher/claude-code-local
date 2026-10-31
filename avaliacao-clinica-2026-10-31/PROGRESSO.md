# Avaliação clínica 2026-10-31 — progresso

Projeto: dor epigástrica + transaminases/GGT altas, pós-colecistectomia, 50 anos. Entrega: PDF no design system "Briefing técnico" (artefato claude.ai de 29/10/2026).
Teto combinado: 6 M tokens (~17 agentes Opus 5.5: 7 pesquisa + 7 verificação + 1 fontes brasileiras/de maior nome + 2 crítica).

Regra de fontes (Lucas, 31/10 ~12h): brasileira primeiro (SBH, FBG, CBC/CBCD, SOBED, Ministério da Saúde, ANVISA); depois diretriz internacional de maior nome na edição mais recente (ASGE, ESGE, ACG, Tóquio, EASL). UpToDate fora. Série antiga/pequena e relato de caso não entram no PDF; ficam só como apoio na tabela de verificação. Onde não há diretriz brasileira, o PDF diz isso.

- [x] Design system lido (tokens, bundle.css, componentes); fontes Barlow baixadas em fonts/
- [x] Rascunho do PDF (avaliacao.html → avaliacao.pdf, 4 páginas, sem nome nem datas da paciente); páginas cabendo com folga de 7 a 33 mm
- [x] Correção de horário: controle das 15h30 é ~21 h após a dor (não 45 h); página 3 reescrita
- [ ] Pesquisa em fonte primária (7 temas) — 3/7 gravados em resultados/ (asge-esge-coledocolitiase, transaminases-obstrucao-biliar, tg18-colangite-antibiotico)
- [x] Branch avaliacao-clinica-2026-10-31 enviada ao GitHub; PR rascunho #3 (nada vai ao main sem decisão do Lucas)
- [ ] Verificação adversarial (7 temas) — resultados/<tema>-verificado.json
- [ ] Agente extra: fontes brasileiras e de maior nome (meias-vidas, Kwo 2026, Mohamed 2023, MS/ANVISA) — resultados/fontes-de-maior-nome.json
- [ ] Ajuste do texto com as fontes verificadas; tabela verificacao-diretrizes.md
- [ ] Crítica clínica e de forma (2 agentes)
- [ ] PDF final entregue
