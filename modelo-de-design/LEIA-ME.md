# Modelo de design: briefing técnico

Identidade visual do briefing "Projects, Motion e Design", guardada para reaproveitar: faixa preta, letra Barlow, preto com laranja, números grandes, desenhos de traço e fontes no rodapé.

## O que tem aqui

- `briefing-tecnico/`: o modelo completo, já no formato de skill. Contém:
  - `SKILL.md`: as instruções que o Claude segue;
  - `modelo.html`: 4 páginas com todos os componentes;
  - `guia-visual.md`: cores, letras, medidas e regras;
  - `gerar-pdf.js`: gera o PDF e confere o rodapé;
  - `fonts/`: as fontes;
  - `exemplo-briefing.pdf`: o briefing real.
- `briefing-tecnico.zip`: a mesma pasta, compactada para enviar ao claude.ai.
- `modelo-em-branco.pdf`: o modelo renderizado com o texto de exemplo, para ver os componentes de uma vez.

## Jeito 1 (recomendado): skill no claude.ai

Vale no chat, no Cowork, nas sessões do Claude Code na nuvem e no Claude Code do terminal (versão 2.1.273 ou mais nova, com login da conta claude.ai).

1. Em **Settings > Capabilities**, confira se "Code execution and file creation" está ligado. No layout novo, essa opção se chama "Create and edit files".
2. Vá em **Customize > Skills**, clique em **+**, depois em **+ Create skill** e em **Upload a skill**.
3. Envie o arquivo `briefing-tecnico.zip`.
4. Ligue a skill na lista.
5. Para usar, peça, por exemplo: "Faz um briefing de 2 páginas sobre X no modelo do briefing técnico".

## Jeito 2: design system no Claude Design

Serve para designs e apresentações feitos no Claude Design. Está em beta no Pro e no Max.

1. Numa conversa, anexe:
   - `exemplo-briefing.pdf`;
   - `modelo-em-branco.pdf`;
   - `guia-visual.md`;
   - os arquivos de `fonts/`.
2. Peça: "Crie um design system chamado Briefing técnico a partir destes arquivos. Siga as cores, letras e componentes do guia-visual.md."
3. Depois, ele aparece em **Settings > Capabilities**, em **Manage**, ao lado de Design systems. Se não aparecer ali, procure em **Settings > Design systems**.

## Jeito 3: só no Claude Code do Mac, sem passar pelo claude.ai

Copie a pasta `briefing-tecnico/` para `~/.claude/skills/`.

## Para o PDF sair certo

O script `gerar-pdf.js` precisa de Node.js com Playwright. Se não houver, o Claude entrega o HTML para imprimir pelo Chrome:
- papel A4;
- margens "Nenhuma";
- "Gráficos de plano de fundo" ligado.

## Licenças

- As fontes Barlow e Barlow Condensed estão sob a SIL Open Font License 1.1. A cópia da licença está em `briefing-tecnico/fonts/OFL.txt`.
- O modelo pode ser usado livremente.

## Fontes da documentação

Conferidas em 29 de outubro de 2026:
- support.claude.com: "Set up your design system in Claude Design", "Use skills in Claude" e "How to create custom skills";
- code.claude.com/docs: skills e artifacts.
