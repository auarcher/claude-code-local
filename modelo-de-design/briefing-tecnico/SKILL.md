---
name: briefing-tecnico
description: Monta documentos e PDFs A4 no visual do briefing técnico, com faixa preta, letra Barlow, preto e laranja, números grandes e fontes no rodapé. Use em briefings, resumos e relatórios curtos.
license: Modelo de uso livre. Fontes Barlow e Barlow Condensed sob SIL Open Font License 1.1 (fonts/OFL.txt).
compatibility: Para gerar PDF, precisa de Node.js com Playwright e Chromium. Sem isso, entregue o HTML pronto para imprimir em A4.
---

# Briefing técnico

Use este modelo quando pedirem um briefing, resumo, relatório curto ou PDF explicativo "no modelo do briefing técnico" ou "no nosso modelo", ou um documento A4 de leitura rápida para empresa.

## Arquivos

- `modelo.html`: quatro páginas A4 com todos os componentes e texto de exemplo. É o ponto de partida.
- `guia-visual.md`: cores, letras, medidas, componentes e regras de texto. Leia antes de montar.
- `gerar-pdf.js`: gera o PDF e avisa quando algum texto invade o rodapé.
- `fonts/`: Barlow e Barlow Condensed (licença OFL).
- `exemplo-briefing.pdf`: um documento real feito com este modelo, para comparar.

## Como montar

1. Copie `modelo.html` e a pasta `fonts/` para a pasta de trabalho, lado a lado. O HTML encontra as fontes por caminho relativo.
2. Planeje antes de escrever. Cada página tem uma ideia, e o título já diz a conclusão. Siga o número de páginas pedido; sem pedido, use até 4.
3. Troque o texto de exemplo e apague os componentes que não servem. Só crie um componente novo se nenhum existente resolver, e siga as mesmas cores, letras e traço.
4. Gere o PDF com `node gerar-pdf.js documento.html documento.pdf`, rodando o script a partir desta pasta ou com o caminho completo dele.
   - Se o script acusar invasão do rodapé, corte texto ou espaço e gere de novo.
   - Nunca diminua a letra abaixo da escala do guia.
5. Antes de entregar, olhe cada página do PDF. Procure:
   - texto cortado;
   - sobreposição;
   - rótulo fora do lugar;
   - página com mais da metade vazia.
6. Na entrega, diga o nome e o caminho do arquivo.

**Sem Node ou Playwright:** entregue o HTML e explique como imprimir: abrir no Chrome, Imprimir, Salvar como PDF, papel A4, margens "Nenhuma" e "Gráficos de plano de fundo" ligado.

**Em artefato do Claude (página web):** carregue Barlow e Barlow Condensed do Google Fonts no lugar dos arquivos locais.

## Regras de texto

- Português do Brasil, frase curta, tom de conversa. O título diz a conclusão, não o tema.
- Sigla técnica só com a tradução na mesma frase.
- Sem cara de IA:
  - emoji, degradê, cartão com sombra, fundo creme ou ícone decorativo;
  - frases como "Ótima pergunta";
  - pilha de ressalvas ou tom de guru.
- Todo fato tem origem.
  - O que vem de terceiros leva o marcador de círculo.
  - O que foi visto, sem texto oficial, leva o losango.
  - As fontes ficam na última página, com a data em que foram lidas.
- A data do documento fica no canto direito da faixa da capa.
- Nunca inclua dado de paciente, senha ou chave.
