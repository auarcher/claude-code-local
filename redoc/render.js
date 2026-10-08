#!/usr/bin/env node
// redoc: reconstrói comunicados/documentos a partir de uma spec JSON padronizada.
//
// Uso:
//   node redoc/render.js <spec.json> [--out <dir>] [--formats story,tv,a4] [--html]
//
// Saídas (em <dir>/<nome>-<formato>.*):
//   story → PNG vertical 2160px de largura (WhatsApp/celular)
//   tv    → PNG 16:9 3840x2160 (tela/TV do PS)
//   a4    → PDF A4 em página única + PNG de pré-visualização
const fs = require('fs');
const path = require('path');
const { build, BLOCK_TYPES } = require('./lib/template');

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  console.error('Playwright não encontrado. Rode: npm install --prefix redoc  (ou NODE_PATH=$(npm root -g))');
  process.exit(1);
}

const FORMATS = ['story', 'tv', 'a4'];
const A4 = { w: 794, h: 1123 }; // px a 96 dpi
const TV_MIN_ZOOM = 0.85; // abaixo disso o texto fica pequeno demais para leitura à distância
const TV_MAX_ZOOM = 1.3; // amplia conteúdo curto para ocupar a tela

function parseArgs(argv) {
  const a = { formats: FORMATS, out: 'out', html: false };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === '--out') a.out = argv[++i];
    else if (k === '--formats') a.formats = argv[++i].split(',').map((s) => s.trim());
    else if (k === '--html') a.html = true;
    else if (k === '-h' || k === '--help') a.help = true;
    else if (!a.spec) a.spec = k;
    else throw new Error(`Argumento inesperado: ${k}`);
  }
  return a;
}

function validate(spec) {
  const errs = [];
  if (!spec.name || !/^[a-z0-9-]+$/.test(spec.name)) errs.push('"name" obrigatório, em kebab-case (vira o nome dos arquivos)');
  if (!spec.header) errs.push('"header" obrigatório');
  if (!Array.isArray(spec.blocks) || !spec.blocks.length) errs.push('"blocks" deve ser uma lista não vazia');
  (spec.blocks || []).forEach((b, i) => {
    if (!BLOCK_TYPES.includes(b.type)) errs.push(`blocks[${i}]: tipo "${b.type}" inválido (${BLOCK_TYPES.join(', ')})`);
    if (['steps', 'tiles', 'cards', 'alert'].includes(b.type) && !(Array.isArray(b.items) && b.items.length))
      errs.push(`blocks[${i}] (${b.type}): "items" obrigatório`);
  });
  if (errs.length) throw new Error('Spec inválida:\n  - ' + errs.join('\n  - '));
}

async function renderStory(browser, html, file) {
  const page = await browser.newPage({ viewport: { width: 720, height: 800 }, deviceScaleFactor: 3 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.screenshot({ path: file, fullPage: true });
  await page.close();
}

async function renderTv(browser, html, file) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'load' });
  // Ajusta o miolo ao espaço entre cabeçalho e rodapé: reduz se transborda, amplia se sobra.
  const zoom = await page.evaluate((max) => {
    const wrap = document.querySelector('.wrap');
    const ft = document.querySelector('.ft');
    const avail = ft.getBoundingClientRect().top - 24 - wrap.getBoundingClientRect().top;
    let z = 1;
    for (let i = 0; i < 6; i++) {
      wrap.style.zoom = z;
      const need = wrap.getBoundingClientRect().height;
      const next = Math.min(max, z * (avail / need));
      if (Math.abs(next - z) < 0.005) break;
      z = next;
    }
    z = Math.floor(z * 100) / 100;
    wrap.style.zoom = z;
    return z;
  }, TV_MAX_ZOOM);
  await page.screenshot({ path: file });
  await page.close();
  return zoom;
}

async function renderA4(browser, html, pdfFile, pngFile) {
  const page = await browser.newPage({ viewport: { width: A4.w, height: A4.h }, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'load' });
  // Cabe em uma página: o layout é refeito numa largura maior (A4.w / escala) e o PDF
  // é impresso com essa escala, então a largura sempre preenche a folha.
  const scale = await page.evaluate(({ w, h }) => {
    let s = 1;
    for (let i = 0; i < 10; i++) {
      document.body.style.width = w / s + 'px';
      const height = document.body.scrollHeight * s;
      if (height <= h) break;
      s *= Math.max(0.9, Math.sqrt(h / height) * 0.99);
    }
    return Math.floor(s * 1000) / 1000;
  }, A4);
  await page.evaluate((width) => { document.body.style.width = width + 'px'; }, A4.w / scale);
  await page.pdf({ path: pdfFile, format: 'A4', scale, printBackground: true, pageRanges: '1', margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await page.setViewportSize({ width: Math.ceil(A4.w / scale), height: Math.ceil(A4.h / scale) });
  await page.screenshot({ path: pngFile });
  await page.close();
  return scale;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.spec) {
    console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(1, 11).map((l) => l.replace(/^\/\/ ?/, '')).join('\n'));
    process.exit(args.help ? 0 : 1);
  }
  const bad = args.formats.filter((f) => !FORMATS.includes(f));
  if (bad.length) throw new Error(`Formato(s) inválido(s): ${bad.join(', ')}. Use: ${FORMATS.join(', ')}`);

  const spec = JSON.parse(fs.readFileSync(args.spec, 'utf8'));
  validate(spec);
  fs.mkdirSync(args.out, { recursive: true });
  const base = path.join(args.out, spec.name);

  const browser = await chromium.launch();
  const outputs = [];
  try {
    for (const fmt of args.formats) {
      const html = build(spec, fmt);
      if (args.html) fs.writeFileSync(`${base}-${fmt}.html`, html);
      if (fmt === 'story') {
        await renderStory(browser, html, `${base}-story.png`);
        outputs.push(`${base}-story.png`);
      } else if (fmt === 'tv') {
        const z = await renderTv(browser, html, `${base}-tv.png`);
        outputs.push(`${base}-tv.png` + (z !== 1 ? `  (conteúdo em ${Math.round(z * 100)}%)` : ''));
        if (z < TV_MIN_ZOOM) console.warn(`⚠ TV: conteúdo reduzido a ${Math.round(z * 100)}%; legibilidade à distância comprometida. Enxugue texto ou reposicione o bloco "break".`);
      } else if (fmt === 'a4') {
        const z = await renderA4(browser, html, `${base}-a4.pdf`, `${base}-a4-preview.png`);
        outputs.push(`${base}-a4.pdf` + (z < 1 ? `  (escala ${Math.round(z * 100)}% para caber em 1 página)` : ''), `${base}-a4-preview.png`);
      }
    }
  } finally {
    await browser.close();
  }

  console.log('Gerado:\n  ' + outputs.join('\n  '));
  if (spec.uncertain?.length) {
    console.log('\nTrechos de leitura incerta (confirmar no original antes de divulgar):');
    spec.uncertain.forEach((u) => console.log(`  • ${u}`));
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
