// Renderiza um HTML A4 (design system Briefing técnico) em PDF e PNGs de conferência.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [,, htmlPath, pdfPath, pngPrefix] = process.argv;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve(htmlPath), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: pdfPath, width: '210mm', height: '297mm', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  if (pngPrefix) {
    await page.emulateMedia({ media: 'screen' });
    const n = await page.$$eval('.page', els => els.length);
    for (let i = 0; i < n; i++) {
      const el = (await page.$$('.page'))[i];
      await el.screenshot({ path: `${pngPrefix}-${i + 1}.png` });
    }
    // relatório de estouro: conteúdo encostando no rodapé
    const report = await page.$$eval('.page', els => els.map((p, i) => {
      const c = p.querySelector('.content'); const f = p.querySelector('.foot');
      if (!c || !f) return `p${i + 1}: sem content/foot`;
      const cb = c.getBoundingClientRect(); const fb = f.getBoundingClientRect();
      const folga = (fb.top - cb.bottom) / 3.78; // px -> mm
      const vazio = (fb.top - cb.bottom) / (fb.top - cb.top);
      return `p${i + 1}: folga ${folga.toFixed(1)} mm${folga < 5 ? ' <<< ESTOUROU' : ''}${vazio > 0.5 ? ' <<< MAIS DA METADE VAZIA' : ''}`;
    }));
    console.log(report.join('\n'));
  }
  await browser.close();
})();
