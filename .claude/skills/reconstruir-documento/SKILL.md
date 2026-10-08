---
name: reconstruir-documento
description: Reconstrói comunicados, informativos, fluxos e avisos ilegíveis (imagem borrada, print comprimido, foto de mural) em versões nítidas e padronizadas (PNG vertical para celular, PNG 16:9 para TV e PDF A4) usando a ferramenta redoc. Use quando o pedido for "melhora a qualidade", "não consigo ler", "refaz esse comunicado", "deixa legível", "versão pra imprimir/pra TV", ou quando chegar uma imagem de documento com texto pouco legível.
---

# Reconstruir documento (redoc)

Upscale não recupera texto: com poucos pixels, a IA inventa letras. O caminho certo é **transcrever, estruturar e redesenhar**. A ferramenta fica em `redoc/` na raiz do repositório.

## Fluxo

1. **Transcrever**: ler a imagem inteira e transcrever **literalmente**. Para cada trecho de leitura duvidosa, registrar em `uncertain` o trecho e as alternativas plausíveis. Nunca completar por dedução clínica ou institucional sem marcar.
2. **Estruturar**: escrever a spec em `<scratchpad>/<nome>.json` seguindo `redoc/README.md` e usando `redoc/examples/telegrave.json` como modelo:
   - critérios ou etapas numeradas → `steps`
   - filas, canais, públicos → `tiles`
   - regras operacionais (SLA, onde solicitar) → `cards`, e o que restringe/proíbe vai com `variant: "warn"`
   - exceções e prioridades críticas → `alert`
   - data de vigência e abrangência → `bar`
   - colocar um `break` onde a versão TV deve virar coluna (em geral entre "quando" e "como")
   - destacar com `==...==` só o gatilho decisivo de cada critério (no máximo um por item)
   - `footer.disclaimer: "Releitura não oficial do comunicado original"` quando houver marca de terceiros
3. **Renderizar**:
   ```bash
   NODE_PATH=$(npm root -g) node redoc/render.js <spec.json> --out <scratchpad>/out
   ```
   (Com `redoc/node_modules` instalado, o `NODE_PATH` é dispensável.)
4. **QA visual (obrigatório)**: abrir com Read o `-story.png`, o `-tv.png` e o `-a4-preview.png`. Conferir texto cortado, sobreposição, sobra de espaço e destaque legível. No PDF, rasterizar com `pdftoppm -r 110 -png` e conferir também. Se o console avisar zoom de TV abaixo de 85%, mover o `break` ou enxugar a formatação, nunca o conteúdo.
5. **Entregar**: enviar os arquivos com SendUserFile e listar:
   - os trechos de `uncertain` a confirmar no original
   - que a logo não é a oficial (quando aplicável)
   - qualquer reorganização feita (ex.: parágrafo virou tópicos)

## Regras

- Fidelidade acima de estética: não acrescentar, remover nem reescrever o sentido. Ajustar pontuação/gramática só quando for óbvio, e citar na entrega.
- Não reproduzir logos ou marcas oficiais como imagem.
- Conteúdo clínico (doses, critérios, scores) é transcrito como está no original. Se parecer divergente de guideline atual, **avisar na entrega** sem alterar a peça.
- Ícones novos: adicionar em `redoc/lib/icons.js` (SVG de traço 24×24), não usar emoji.
