# redoc: reconstrução padronizada de documentos

Pega um comunicado ilegível (print de print, foto de mural, imagem comprimida de WhatsApp) e gera versões nítidas no mesmo padrão visual:

| Formato | Saída | Uso |
|---|---|---|
| `story` | PNG vertical, 2160 px de largura | WhatsApp / celular |
| `tv` | PNG 16:9, 3840×2160 | Tela/TV do PS, slide |
| `a4` | PDF A4 em página única + PNG de pré-visualização | Mural, impressão |

O conteúdo é escrito uma vez em JSON e o layout é sempre o mesmo. Por isso o texto é idêntico nos três formatos.

## Instalação

```bash
npm install --prefix redoc        # instala o Playwright
npx playwright install chromium   # se ainda não houver Chromium
```

Fonte recomendada: **Inter** (se não estiver instalada, cai para Segoe UI / Roboto / Helvetica).

## Uso

```bash
node redoc/render.js redoc/examples/telegrave.json --out out
node redoc/render.js spec.json --out out --formats story,a4   # só alguns formatos
node redoc/render.js spec.json --out out --html               # salva também o HTML de cada formato
```

No fim, o script lista os trechos marcados como **leitura incerta** na spec, que precisam ser conferidos antes de divulgar.

Ajustes automáticos:
- **TV**: o conteúdo é ampliado (até 130%) ou reduzido para preencher a tela. Abaixo de 85% sai um aviso, porque a legibilidade à distância fica comprometida.
- **A4**: a escala é calculada para caber em uma página com a largura sempre preenchida.

## Spec

```jsonc
{
  "name": "telegrave",              // kebab-case, vira o nome dos arquivos
  "source": "descrição do original", // rastreabilidade (não é renderizado)
  "uncertain": ["trecho X: ..."],    // leituras duvidosas, listadas no console
  "theme": { "primary": "#14206e" }, // opcional, sobrescreve cores (ver DEFAULT_THEME)
  "header": { "kicker": "...", "title": "...", "subtitle": "...", "tag": "...", "tagIcon": "monitor" },
  "blocks": [ /* ver tabela abaixo */ ],
  "footer": { "brand": "...", "note": "...", "disclaimer": "Releitura não oficial do comunicado original" }
}
```

Texto aceita `**negrito**` e `==marca-texto==`. Todo o resto é escapado.

| Bloco | Campos | Visual |
|---|---|---|
| `objective` | `text`, `label?`, `icon?` | Caixa de destaque com ícone |
| `section` | `title` | Título de seção com linhas |
| `steps` | `label?` (ex. "MOMENTO", "PASSO"), `items[{title, text? \| bullets?, number?}]` | Etapas numeradas 1º, 2º... |
| `tiles` | `items[{icon?, label?, title}]` | Blocos suaves (filas, canais) |
| `cards` | `items[{icon?, title, text?, variant?: "warn"}]` | Grade de até 3 colunas |
| `alert` | `title`, `items[]`, `icon?` | Caixa vermelha de exceções/prioridades |
| `bar` | `icon?`, `label?`, `text` | Faixa escura (datas, abrangência) |
| `text` | `text` | Parágrafo simples |
| `break` | (nenhum) | Quebra de coluna no formato TV (ignorado nos outros) |

Ícones disponíveis: veja `lib/icons.js`.

## Regras de reconstrução

1. **Fidelidade**: nada é acrescentado ou removido do original. Reorganizar (tópicos, destaques, ordem visual) pode; mudar o sentido não.
2. **Incerteza explícita**: toda leitura duvidosa vai em `uncertain`.
3. **Marca**: logos oficiais não são reproduzidos (a marca sai como texto). Mantenha o `disclaimer` quando a peça circular fora do contexto pessoal.
