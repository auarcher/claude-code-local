// Monta o HTML do documento a partir da spec JSON.
// Layouts: "story" (vertical, celular/WhatsApp), "tv" (16:9, 2 colunas), "a4" (impressão).
const { icon } = require('./icons');

const DEFAULT_THEME = {
  primary: '#14206e',
  primary2: '#22319c',
  accent: '#f7b500',
  accentSoft: '#fff6dc',
  danger: '#d6372f',
  dangerSoft: '#fff6f5',
  brand: '#1f5fe0',
  ink: '#141b3d',
  body: '#2b3358',
  muted: '#5a6386',
  line: '#e3e7f3',
  soft: '#f4f6fc'
};

const BLOCK_TYPES = ['objective', 'section', 'steps', 'tiles', 'cards', 'alert', 'bar', 'text', 'break'];

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Marcação inline mínima: **negrito**, ==marca-texto==. Todo o resto é escapado.
function md(s) {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/==(.+?)==/g, '<mark>$1</mark>');
}

function ordinal(n) {
  return `${n}º`;
}

function renderBlock(b, t) {
  switch (b.type) {
    case 'objective':
      return `<div class="obj"><div class="ic">${icon(b.icon || 'target', { size: 26, stroke: '#fff' })}</div>
        <div><div class="lbl">${esc(b.label || 'Objetivo')}</div><p>${md(b.text)}</p></div></div>`;
    case 'section':
      return `<div class="sec"><i></i><h2>${esc(b.title)}</h2><i></i></div>`;
    case 'steps':
      return b.items.map((it, i) => `<div class="m"><div class="n"><b>${esc(it.number ?? ordinal(i + 1))}</b><small>${esc(b.label || 'MOMENTO')}</small></div>
        <div class="t"><h3>${esc(it.title)}</h3>${it.text ? `<p>${md(it.text)}</p>` : ''}${it.bullets ? `<ul>${it.bullets.map((x) => `<li>${md(x)}</li>`).join('')}</ul>` : ''}</div></div>`).join('');
    case 'tiles':
      return `<div class="grid g${Math.min(b.items.length, 3)}">${b.items.map((it) => `<div class="tile">${it.icon ? icon(it.icon, { size: 34, stroke: t.primary }) : ''}
        <div>${it.label ? `<div class="lbl">${esc(it.label)}</div>` : ''}<b>${md(it.title)}</b></div></div>`).join('')}</div>`;
    case 'cards':
      return `<div class="grid g${Math.min(b.items.length, 3)}">${b.items.map((it) => {
        const warn = it.variant === 'warn';
        return `<div class="c${warn ? ' warn' : ''}">${it.icon ? icon(it.icon, { size: 30, stroke: warn ? '#b07f00' : t.primary }) : ''}
          <h4>${md(it.title)}</h4>${it.text ? `<p>${md(it.text)}</p>` : ''}</div>`;
      }).join('')}</div>`;
    case 'alert':
      return `<div class="pri"><div class="h">${icon(b.icon || 'alert', { size: 22, stroke: t.danger, width: 2.4 })}${esc(b.title)}</div>
        <div class="tags">${b.items.map((x) => `<div>${md(x)}</div>`).join('')}</div></div>`;
    case 'bar':
      return `<div class="bar">${icon(b.icon || 'info', { size: 34, stroke: t.accent })}<div>${b.label ? `<div class="lbl">${esc(b.label)}</div>` : ''}<p>${md(b.text)}</p></div></div>`;
    case 'text':
      return `<p class="txt">${md(b.text)}</p>`;
    case 'break':
      return '';
    default:
      throw new Error(`Bloco desconhecido: "${b.type}". Tipos válidos: ${BLOCK_TYPES.join(', ')}`);
  }
}

function css(t, layout) {
  const tv = layout === 'tv';
  return `
:root{--p:${t.primary};--p2:${t.primary2};--a:${t.accent};--as:${t.accentSoft};--d:${t.danger};--ds:${t.dangerSoft};--ink:${t.ink};--body:${t.body};--mut:${t.muted};--line:${t.line};--soft:${t.soft}}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#fff}
body{width:${tv ? 1920 : layout === 'a4' ? 794 : 720}px;${tv ? 'height:1080px;overflow:hidden;' : ''}font-family:Inter,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased;-webkit-print-color-adjust:exact;print-color-adjust:exact}
svg{flex:none}
.disp{font-family:"Inter Display",Inter,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
.hd{background:linear-gradient(135deg,var(--p) 0%,var(--p2) 100%);color:#fff;position:relative;overflow:hidden;padding:${tv ? '34px 56px' : '44px 40px 36px'}}
.hd:after{content:"";position:absolute;right:-80px;top:-80px;width:280px;height:280px;border-radius:50%;background:rgba(255,255,255,.05)}
.hd-in{${tv ? 'display:flex;align-items:flex-end;justify-content:space-between;gap:40px' : ''}}
.kick{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.12);border-radius:30px;padding:6px 14px 6px 10px;font-size:13px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase}
.hd h1{font-weight:800;font-size:${tv ? 40 : 44}px;line-height:1.05;margin-top:16px;letter-spacing:-.5px}
.hd .sub{font-size:17px;margin-top:10px;color:#c9d0f5}
.tg{display:flex;align-items:center;gap:14px;${tv ? '' : 'margin-top:20px'}}
.tg span{font-size:${tv ? 64 : 54}px;font-weight:900;color:var(--a);letter-spacing:1px;line-height:1}
.wrap{padding:${tv ? '30px 56px 0' : '28px 32px 8px'};${tv ? 'display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:start' : ''}}
.col>*:first-child{margin-top:0!important}
.obj{display:flex;gap:16px;align-items:center;background:var(--soft);border-radius:16px;padding:20px 22px}
.ic{width:48px;height:48px;border-radius:12px;background:var(--p);display:flex;align-items:center;justify-content:center;flex:none}
.lbl{font-size:12px;font-weight:700;letter-spacing:1.4px;color:var(--mut);text-transform:uppercase}
.obj p{font-size:18px;line-height:1.4;margin-top:3px}
.sec{display:flex;align-items:center;gap:14px;margin:${tv ? '26px 0 14px' : '32px 0 16px'}}
.sec h2{font-size:24px;font-weight:800;white-space:nowrap;letter-spacing:.3px}
.sec i{flex:1;height:2px;background:var(--line)}
.m{display:flex;border:1.5px solid var(--line);border-radius:14px;overflow:hidden;margin-bottom:12px;break-inside:avoid}
.n{background:var(--p);color:#fff;width:92px;display:flex;flex-direction:column;justify-content:center;align-items:center;flex:none}
.n b{font-size:34px;font-weight:800;line-height:1}
.n small{font-size:10.5px;font-weight:700;letter-spacing:1.4px;margin-top:4px;opacity:.85}
.t{flex:1;padding:16px 20px}
.t h3{font-size:17px;font-weight:800;letter-spacing:.3px}
.t p,.t ul{font-size:16.5px;line-height:1.45;margin-top:4px;color:var(--body)}
.t ul{margin-top:6px;padding-left:18px}.t li{margin-bottom:3px}
mark{background:#ffeaa6;border-radius:3px;box-decoration-break:clone;-webkit-box-decoration-break:clone;color:var(--ink);font-weight:700}
.grid{display:grid;gap:12px;margin-top:12px}.g1{grid-template-columns:1fr}.g2{grid-template-columns:1fr 1fr}.g3{grid-template-columns:1fr 1fr 1fr}
.sec+.grid{margin-top:0}
.tile{border-radius:14px;padding:16px 18px;display:flex;align-items:center;gap:12px;background:var(--soft)}
.tile b{display:block;font-size:19px;font-weight:800}
.c{border:1.5px solid var(--line);border-radius:14px;padding:18px 16px;break-inside:avoid}
.c h4{font-size:17px;font-weight:800;margin-top:10px}
.c p{font-size:15.5px;line-height:1.4;margin-top:4px;color:var(--body)}
.c.warn{background:var(--as);border-color:var(--a)}
.pri{margin-top:14px;border:2px solid var(--d);border-radius:14px;padding:18px 20px;background:var(--ds);break-inside:avoid}
.pri .h{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:800;letter-spacing:1px;color:var(--d);text-transform:uppercase}
.tags{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
.tags div{background:#fff;border:1.5px solid #f3c3bf;border-radius:10px;padding:11px 14px;font-size:16px;font-weight:700;display:flex;align-items:center;gap:10px}
.tags div:before{content:"";width:8px;height:8px;border-radius:50%;background:var(--d);flex:none}
.bar{display:flex;align-items:center;gap:16px;background:var(--p);color:#fff;border-radius:14px;padding:18px 22px;margin-top:14px;break-inside:avoid}
.bar .lbl{color:#aeb7e8}.bar p{font-size:19px;margin-top:2px}.bar b{color:var(--a)}
.txt{font-size:16.5px;line-height:1.5;color:var(--body);margin-top:12px}
.ft{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:${tv ? '0 56px' : '26px 32px 30px'};margin-top:20px;${tv ? 'position:absolute;left:0;right:0;bottom:26px' : 'border-top:1.5px solid var(--line)'}}
.ft .brand{font-size:${tv ? 30 : 34}px;font-weight:900;letter-spacing:-.5px;color:${t.brand}}
.ft small{font-size:12.5px;color:var(--mut);text-align:right;line-height:1.5}
@page{size:A4;margin:0}
`;
}

function build(spec, layout) {
  const t = { ...DEFAULT_THEME, ...(spec.theme || {}) };
  const h = spec.header || {};
  const blocks = spec.blocks || [];

  const header = `<div class="hd"><div class="hd-in"><div>
      ${h.kicker ? `<div class="kick">${icon(h.kickerIcon || 'megaphone', { size: 18, stroke: t.accent, width: 2.2 })}${esc(h.kicker)}</div>` : ''}
      ${h.title ? `<h1 class="disp">${md(h.title)}</h1>` : ''}
      ${h.subtitle ? `<div class="sub">${md(h.subtitle)}</div>` : ''}
    </div>
    ${h.tag ? `<div class="tg">${h.tagIcon ? icon(h.tagIcon, { size: layout === 'tv' ? 56 : 46, stroke: t.accent, width: 2.2 }) : ''}<span class="disp">${esc(h.tag)}</span></div>` : ''}
  </div></div>`;

  let body;
  if (layout === 'tv') {
    const cut = blocks.findIndex((b) => b.type === 'break');
    const left = cut === -1 ? blocks.slice(0, Math.ceil(blocks.length / 2)) : blocks.slice(0, cut);
    const right = cut === -1 ? blocks.slice(Math.ceil(blocks.length / 2)) : blocks.slice(cut + 1);
    body = `<div class="wrap"><div class="col">${left.map((b) => renderBlock(b, t)).join('')}</div><div class="col">${right.map((b) => renderBlock(b, t)).join('')}</div></div>`;
  } else {
    body = `<div class="wrap">${blocks.map((b) => renderBlock(b, t)).join('')}</div>`;
  }

  const f = spec.footer || {};
  const notes = [f.note, f.disclaimer].filter(Boolean).map(esc).join('<br>');
  const footer = `<div class="ft"><span class="brand disp">${esc(f.brand || '')}</span>${notes ? `<small>${notes}</small>` : ''}</div>`;

  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${esc(spec.name || h.tag || 'Documento')}</title><style>${css(t, layout)}</style></head><body class="l-${layout}">${header}${body}${footer}</body></html>`;
}

module.exports = { build, BLOCK_TYPES, DEFAULT_THEME };
