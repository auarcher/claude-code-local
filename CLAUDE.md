# Regras para o Claude neste repositório

Dono: Lucas Auache. Vale para sessão na nuvem (claude.ai/code) e no Mac.

## Todo entregável tem de abrir na interface do app

1. Arquivo que o Lucas vai ler (PDF, HTML, imagem, planilha, markdown) é gravado dentro desta pasta do repositório, que é o diretório de trabalho da sessão. Nunca só em /tmp, /private/tmp ou na pasta de transcrições. A interface só abre arquivos do diretório de trabalho.
2. Ao entregar, anexar o arquivo na conversa com a ferramenta de envio de arquivo ao usuário (SendUserFile) e dizer o caminho relativo. Se a ferramenta não estiver disponível na hora, dizer o caminho e que ele abre pela lista de arquivos da sessão ou pelo GitHub.
3. Commit e push na branch da sessão depois de cada entrega, para o arquivo abrir também no GitHub, que mostra PDF e markdown direto na página.
4. PDF: gerar localmente na pasta do projeto, com fontes locais, e conferir as páginas em imagem antes de entregar. Modelo pronto: `avaliacao-clinica-2026-10-31/render.js` (Playwright, A4, aviso de rodapé estourado).
5. Nunca dado de paciente, senha ou chave em arquivo versionado. Data de atendimento não vai no documento.

## Fechar e retomar

Só pelas skills `fechar-sessao` e `retomar`. Sem o Mac, o ESTADO fica no bloco "Para salvar na Central" e numa cópia na pasta do projeto dentro do repositório.
