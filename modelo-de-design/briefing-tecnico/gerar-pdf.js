// Gera um PDF A4 a partir de um HTML no modelo "briefing técnico"
// e avisa se algum conteúdo invade o rodapé de alguma página.
//
// Uso:  node gerar-pdf.js documento.html documento.pdf
// Precisa: Node.js e o pacote "playwright" com o Chromium instalado
//          (npm i playwright && npx playwright install chromium).
//
// Saída: 0 = tudo certo; 2 = conteúdo invadindo o rodapé; 1 = erro.

const path = require('path');
const { chromium } = require('playwright');

async function main() {
  const [entrada, saida] = process.argv.slice(2);
  if (!entrada || !saida) {
    console.error('Uso: node gerar-pdf.js documento.html documento.pdf');
    return 1;
  }
  const html = path.resolve(entrada);
  const pdf = path.resolve(saida);

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto('file://' + html, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);

    // Mede, em cada página, o ponto mais baixo do conteúdo contra o topo do rodapé.
    const medidas = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('section.page')).map((sec, i) => {
        const topo = sec.getBoundingClientRect().top;
        const foot = sec.querySelector('.foot');
        const topoRodape = foot ? foot.getBoundingClientRect().top - topo : sec.clientHeight;
        let maisBaixo = 0;
        sec.querySelectorAll('.content *').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) maisBaixo = Math.max(maisBaixo, r.bottom - topo);
        });
        return { pagina: i + 1, maisBaixo: Math.round(maisBaixo), topoRodape: Math.round(topoRodape) };
      });
    });

    const fontesFaltando = await page.evaluate(() =>
      Array.from(document.fonts).filter((f) => f.status === 'error').map((f) => `${f.family} ${f.weight}`)
    );

    await page.pdf({
      path: pdf,
      width: '210mm',
      height: '297mm',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    let problema = false;
    for (const m of medidas) {
      const folga = m.topoRodape - m.maisBaixo;
      const ok = folga >= 19; // cerca de 5 mm
      if (!ok) problema = true;
      console.log(`Página ${m.pagina}: folga até o rodapé ${folga} px ${ok ? 'ok' : '<- pouco espaço ou invasão'}`);
    }
    if (fontesFaltando.length) {
      problema = true;
      console.log('Fontes que não carregaram: ' + fontesFaltando.join(', ') + ' (a pasta fonts/ está ao lado do HTML?)');
    }
    console.log(`PDF: ${pdf} (${medidas.length} páginas)`);
    return problema ? 2 : 0;
  } finally {
    await browser.close();
  }
}

main().then(
  (codigo) => process.exit(codigo),
  (e) => {
    console.error(e);
    process.exit(1);
  }
);
