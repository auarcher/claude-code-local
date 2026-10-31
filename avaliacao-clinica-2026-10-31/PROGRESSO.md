# Avaliação clínica 2026-10-31 — progresso (encerrado)

Projeto: dor epigástrica + transaminases/GGT altas, pós-colecistectomia, 50 anos. Entrega: PDF no design system "Briefing técnico" (artefato claude.ai de 29/10/2026), 4 páginas, sem nome nem data de atendimento.

Regra de fontes (Lucas, 31/10 ~12h): brasileira primeiro (Ministério da Saúde, CONITEC, SBH, ANVISA); depois diretriz internacional de maior nome na edição mais recente (ASGE, ESGE, ACG, Tóquio, EASL, Roma, AASLD/NACB). UpToDate fora. Série antiga/pequena e relato de caso não sustentam frase do PDF; ficam só como apoio na tabela de verificação. Onde não há diretriz brasileira, o PDF diz isso.

## Feito
- [x] Design system lido (tokens, bundle.css, componentes); fontes Barlow baixadas em fonts/ (OFL)
- [x] PDF: avaliacao.html → avaliacao.pdf (node render.js avaliacao.html avaliacao.pdf pag), 4 páginas cabendo (folga 5 a 21 mm)
- [x] Pesquisa em fonte primária: 7 temas (resultados/<tema>.json) + agente extra de fontes brasileiras e de maior nome (resultados/fontes-de-maior-nome.json, 40 afirmações)
- [x] Verificação adversarial: 7/7 (resultados/<tema>-verificado.json): 90 afirmações confirmadas, 0 "Mudou", 1 "Não achei" (a constatação de que não há diretriz brasileira sobre coledocolitíase/colangite/transaminases agudas). As 40 do agente extra não tiveram verificador independente.
- [x] Tabela item a item: verificacao-diretrizes.md (gerar-tabela.py)
- [x] Crítica única (resultados/critica.json): 25 achados, todos aplicados; o crítico concorda com o diagnóstico mais provável
- [x] Correções de raciocínio ao longo do dia: controle das 15h30 é ~21 h após a dor (não 45); AST estável entre D0 e D1 não prova agressão cessada; em D1 a AST (299) ainda estava acima da ALT (281); CONITEC 471 usa a ASGE de 2010; data de atendimento retirada do PDF

## Fechamento (5 linhas)
1. Itens: 7 temas pesquisados e verificados de 7; 1 agente extra; 1 crítico; PDF entregue.
2. Agentes: 16, todos Opus 5.5 (7 pesquisa, 7 verificação, 1 fontes extra, 1 crítica); orquestração em Fable 5.1.
3. Pendente: nada no escopo. Dúvidas ao médico estão na página 4 do PDF (referências do laboratório, hora da coleta de D1, fármacos prévios, antibiótico mantido ou não, diâmetro do colédoco).
4. Arquivos: avaliacao-clinica-2026-10-31/ no repositório claude-code-local (branch avaliacao-clinica-2026-10-31, PR #3 mergeado + PR #4 rascunho): avaliacao.pdf, avaliacao.html, verificacao-diretrizes.md, resultados/, PROGRESSO.md.
5. Orçamento: teto dito 6 M. Pela contagem do harness (subagent_tokens): 3,82 M (workflow) + 0,51 M (agente extra) + 0,26 M (crítico) = 4,59 M, abaixo do teto. Pela contagem dos arquivos dos agentes, que inclui criação de cache: ~8 M. Qual vale para o plano: não verificado.
