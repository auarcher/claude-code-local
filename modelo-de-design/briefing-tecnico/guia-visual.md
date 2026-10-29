# Guia visual: briefing técnico

Identidade de um documento A4 de leitura rápida para empresa. Cara de material feito por gente: fundo branco, preto, uma única cor de destaque, letra condensada nos títulos, números grandes e desenhos de traço simples.

Exemplo pronto: `exemplo-briefing.pdf`. Modelo editável: `modelo.html`.

## Cores

| Nome | Código | Uso |
|---|---|---|
| Tinta | #14171A | Texto, faixa do topo, bloco escuro, pontos cheios, traço dos diagramas |
| Destaque | #E8421F | Palavra-chave do título, rótulos, números dos passos, datas no bloco escuro, filete de citação, o elemento principal de um diagrama |
| Apagado | #5A636B | Texto secundário, legendas, notas, rodapé |
| Fio | #D5DADE | Linhas finas que separam blocos |
| Painel | #F0F2F4 | Fundo da caixa de explicação e das saídas do diagrama |
| Cinza de contorno | #A7AFB5 | Pontos vazados, item "não tem", desenhos secundários |
| Branco | #FFFFFF | Fundo da página |
| Bloco escuro | divisória #3A4047, texto #E6E9EC | Só dentro do bloco de marcos |

- O destaque é escasso: uma palavra por linha de título e, no máximo, um elemento laranja por bloco.
- Fundo sempre branco. Nada de creme, bege ou degradê.

## Letras

- **Barlow Condensed** (500 a 800): títulos, números, rótulos, faixa do topo.
- **Barlow** (400, 600 e 700): texto corrido.
- As duas estão no Google Fonts, com licença aberta (OFL). Os arquivos estão em `fonts/`.
- Para página web ou artefato do Claude, carregue as duas do Google Fonts.

| Elemento | Letra | Tamanho | Peso | Outros |
|---|---|---|---|---|
| Título da capa | Condensed | 41 pt | 800 | entrelinha 0,98; até 3 linhas, uma palavra laranja em cada |
| Título de página | Condensed | 31 pt | 800 | entrelinha 1,0 |
| Número grande | Condensed | 62 pt | 700 | o "/5" a 26 pt, cinza |
| Datas no bloco escuro | Condensed | 34 pt | 800 | laranja |
| Número de passo | Condensed | 30 pt | 800 | laranja |
| Seção | Condensed | 17 pt | 700 | |
| Etiqueta de formato | Condensed | 17 pt | 700 | contorno de 1,6 pt |
| Grupo de coluna | Condensed | 13 pt | 700 | fio preto de 1 pt embaixo |
| Rótulo | Condensed | 10,5 pt | 700 | maiúsculas, espaçamento 0,09 em, laranja |
| Faixa do topo | Condensed | 9,5 pt | 600 | maiúsculas, espaçamento 0,09 em, branco sobre tinta |
| Abertura da capa | Barlow | 11,5 pt | 400 | |
| Abertura de página | Barlow | 11 pt | 400 | |
| Texto | Barlow | 10 a 10,6 pt | 400 | entrelinha 1,4 a 1,45 |
| Notas e legendas | Barlow | 9 a 9,6 pt | 400 | cinza |
| Fontes | Barlow | 8,6 pt | 400 | cinza |
| Rodapé | Barlow | 8 pt | 400 | cinza |

Menor letra permitida: 8 pt. Se o texto não cabe, corte texto; não diminua a letra.

## Página

- **Tamanho:** A4 retrato, 210 × 297 mm, sem margem de impressão.
- **Faixa do topo:** 13 mm de altura, tinta, com margens laterais de 16 mm.
  - Na capa: "Briefing técnico" à esquerda e a data à direita.
  - Nas outras páginas: número da página em laranja, " · ", o tema da página e, à direita, "Briefing técnico".
- **Conteúdo:** começa 11 mm abaixo da faixa, com margens laterais de 16 mm.
- **Rodapé:** a 8 mm da borda de baixo, com um fio de 0,5 pt em cima. O assunto do documento fica à esquerda e "n / total" à direita.
- **Espaço até o rodapé:** pelo menos 5 mm entre o conteúdo e o rodapé.
- **Espaço entre colunas:** 10 mm entre duas colunas; 7 mm entre três cartões.
- **Tamanho do documento:** até 4 páginas, salvo pedido diferente.

## Componentes

Os nomes entre crases são as classes CSS em `modelo.html`.

1. **Faixa do topo** (`band`): tarja preta com o número da página em laranja.
2. **Título da capa** (`hero`): três linhas curtas que já dizem a conclusão, cada uma com uma palavra-chave em laranja (`em`).
3. **Abertura** (`deck` na capa, `lead` nas páginas): duas a quatro frases que bastam para quem só lê isso.
4. **Números grandes com pontos** (`stats`, `stat`, `num`):
   - Até três por linha, com fio preto de 2 pt em cima e divisórias finas entre eles.
   - Embaixo de cada número fica uma fileira de pontos: cheio quer dizer que tem; vazado, que não tem.
   - O rótulo de cada ponto tem no máximo 5 caracteres, como Free, Pro, Max, Team e Ent.; rótulo maior sai cortado.
5. **Colunas de sim e não** (`two`, `who`, `it`, `it no`): círculo preto com visto para o que tem; círculo vazado com traço, e texto cinza, para o que não tem.
6. **Diagrama** (`flow`):
   - Traço preto de 2,4 px e setas cheias.
   - Só o elemento principal fica em laranja.
   - As saídas ficam em painel cinza-claro com filete preto à esquerda.
7. **Cartões com desenho** (`dev`):
   - Desenho de tela em traço simples, sem sombra, com título curto e duas linhas em cinza.
   - Para "não existe aqui", use o sinal de proibido em laranja.
8. **Citação** (`quote`): filete laranja de 3 pt à esquerda, começa com frase em negrito.
9. **Ficha** (`col2`, `fact`): rótulo cinza em maiúsculas à esquerda e o dado à direita, separados por fios finos.
10. **Bloco escuro de marcos** (`dark`, `ms`): até três datas em laranja, cada uma com uma frase curta.
11. **Etiquetas de formato** (`tile`): retângulos com contorno preto; o principal vai cheio de laranja (`tile hot`).
12. **Dúvidas** (`q`): círculo preto com "?", a pergunta em preto e o que se sabe em cinza.
13. **Passos** (`stp`): número grande laranja e uma ação por passo, com o caminho exato na tela.
14. **Caixa de explicação** (`whybox`): fundo cinza-claro com filete laranja de 4 pt, rótulo em cima e um parágrafo.
15. **Marcadores de origem** (`mk`):
    - Losango (`mk d`): visto na prática, sem texto oficial.
    - Círculo (`mk o`): blog ou site de terceiros.
    - A legenda dos dois fica na linha de fontes.
16. **Fontes** (`src`): última página, em cinza, com a data em que foram lidas.

## Texto

- Português do Brasil, frase curta, tom de conversa.
- **Títulos dizem a conclusão.** Por exemplo, "Projects, só a Pro e Max." em vez de "Sobre o Projects".
- **Siglas:** sigla técnica só com a tradução na mesma frase.
- **Origem dos fatos:** todo fato tem origem.
  - O que é oficial não leva marca.
  - O que vem de terceiros ou foi só observado leva o marcador.
- **Nunca entram:** dado de paciente, nome de pessoa sem autorização, senha ou chave.

## O que não fazer

- **Visual:**
  - Emoji, degradê, cartão com sombra, cantos muito arredondados, fundo creme.
  - Ícone decorativo sem função.
- **Cor:** mais de uma cor de destaque, ou laranja espalhado pela página.
- **Texto:**
  - Frases de efeito, "Ótima pergunta", pilha de ressalvas, tom de guru.
  - Parágrafos longos.
- **Layout:**
  - Tabela cheia de bordas.
  - Página com conteúdo encostado no rodapé, ou com mais da metade vazia.
