# ESTADO — avaliacao-clinica

Atualizado em 31/10/2026, 14:09 (Brasília), hora lida do `date` do contêiner da sessão.

## O que é
Avaliação de um caso de dor epigástrica com transaminases e GGT altas, mulher de 50 anos colecistectomizada, em PDF de 4 páginas no design system "Briefing técnico" (artefato de 29/10/2026). Sem dado identificável de paciente.

## Estado
Feito. PDF entregue. PR #3 mergeado pelo Lucas (versão anterior à crítica). PR #4, rascunho, aberto com a versão final.

## Decisões tomadas (não reabrir)
- 31/10, Lucas: fontes brasileiras primeiro (Ministério da Saúde, CONITEC, SBH, ANVISA); depois diretriz internacional de maior nome na edição vigente. UpToDate fora. Série antiga ou pequena e relato de caso não sustentam frase do PDF.
- 31/10, resultado: diagnóstico mais provável é cálculo de colédoco que migrou; colangite só "suspeita" por Tóquio 2018; hepatite improvável. Imagem da via biliar (colangiorressonância ou ecoendoscopia) nos dois cenários do controle.
- 31/10, Claude, revertível: data de atendimento retirada do cabeçalho do PDF; crítica final com 1 agente em vez de 2.

## Adiado pelo Lucas (não cobrar)
Nada registrado nesta sessão.

## Decisões que dependem do Lucas
1. ⭐ Mesclar o PR #4 (PDF final, tabela de verificação, este ESTADO) ou pedir ajuste.
2. Manter ou não o CLAUDE.md criado na raiz do repositório com a regra de entregáveis.
3. Copiar a regra de entregáveis para as preferências do claude.ai (texto pronto no fechamento da sessão).

## Perguntas sem resposta (só ele responde; estão na página 4 do PDF)
Valores de referência do laboratório para ALT, AST e GGT. Hora da coleta de D1. Dipirona, chás ou suplementos antes da dor. "HEV" na conduta é hidratação venosa? Ceftriaxona mantida ou dose única? Diâmetro do colédoco nos laudos.

## Próximo passo
Lucas: abrir o PDF e decidir o PR #4.

## Onde estão os arquivos
GitHub auarcher/claude-code-local, branch avaliacao-clinica-2026-10-31, pasta avaliacao-clinica-2026-10-31/: avaliacao.pdf (final), avaliacao.html, verificacao-diretrizes.md, resultados/ (15 JSON: 7 pesquisas, 7 verificações, fontes extras, crítica), PROGRESSO.md, render.js, ds/ e fonts/ (cópia local do kit), gerar-tabela.py. O main tem só a versão do PR #3.

## Não refazer
Pesquisa e verificação de fontes (resultados/*.json; 90 afirmações confirmadas, 0 mudaram, 1 "não achei"). Cópia local do design system (ds/, fonts/) e o renderizador (render.js). Para reeditar: alterar avaliacao.html e rodar `node render.js avaliacao.html avaliacao.pdf pag`, que também avisa se alguma página estourou o rodapé.

## Pendente no código
`git status --short` limpo no fechamento; último commit 83f4cec enviado. O commit deste fechamento (ESTADO e CLAUDE.md) vem logo depois, na mesma branch.

## Linha para o índice COMECE-AQUI.md
- avaliacao-clinica: caso biliar de 31/10/2026, PDF entregue; estado em projetos/avaliacao-clinica/ESTADO-avaliacao-clinica.md (cópia no repo claude-code-local, branch avaliacao-clinica-2026-10-31).

## Prompt de retomada
Continua avaliacao-clinica. Leia ~/Central-Claude/COMECE-AQUI.md e ~/Central-Claude/projetos/avaliacao-clinica/ESTADO-avaliacao-clinica.md (ou avaliacao-clinica-2026-10-31/ESTADO-avaliacao-clinica.md no repo claude-code-local, branch avaliacao-clinica-2026-10-31). Próximo passo: Lucas decide o PR #4.
