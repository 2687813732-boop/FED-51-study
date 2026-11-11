const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = path.resolve(__dirname, 'shots2');
fs.mkdirSync(OUT, { recursive: true });
const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--font-render-hinting=none'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  await page.goto('http://127.0.0.1:8123/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle0' });
  await wait(500);
  const shot = n => page.screenshot({ path: path.join(OUT, n + '.png') });

  // complete all four blocks one by one (re-query each time)
  for (let i = 0; i < 4; i++) {
    await page.evaluate(() => {
      const b = document.querySelector('[data-act="done-block"]');
      if (b) b.click();
    });
    await wait(250);
  }
  await page.evaluate(() => document.querySelectorAll('.habit').forEach(h => h.click()));
  await wait(500);
  const top = await page.evaluate(() => ({ pct: document.querySelector('.ring-in b').textContent, blocks: document.querySelector('.sec span').textContent }));
  console.log('after complete', top);
  await page.evaluate(() => window.scrollTo(0, 600));
  await wait(300);
  await shot('01-all-done');

  await page.evaluate(() => document.querySelector('[data-act="open-submit"]').click());
  await wait(500);
  await page.evaluate(() => {
    const set = (id, v) => { const el = document.getElementById(id); if (el) { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); } };
    set('f-learned', '装好 Python 和 VS Code，跑通 hello.py，写完了三个打印个人信息的脚本，变量和输入输出都能自己解释。');
    set('f-confused', '终端里的相对路径还会写错，cd 到上一级要再练。');
    set('f-next', '明早先看数据类型，把 int/float/str 的转换各写一遍。');
    set('f-hours', '8');
    set('f-link', 'https://github.com/example/study');
    document.querySelectorAll('#stars .star')[3].click();
  });
  await wait(300);
  await page.evaluate(() => document.querySelector('[data-act="save-submit"]').click());
  await wait(900);
  await shot('02-eval-full');
  const rec = await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem('fde51.state.v1'));
    const r = s.submissions['2026-11-11'];
    return { score: r.score, grade: r.grade, ev: r.evaluation, title: r.blocksTitle };
  });
  console.log('REC', JSON.stringify(rec, null, 1));
  await page.evaluate(() => { const p = document.querySelector('.sheet-panel'); p.scrollTop = p.scrollHeight; });
  await wait(300);
  await shot('03-eval-bottom');
  await page.evaluate(() => document.querySelector('[data-act="close-sheet"]').click());
  await wait(400);

  // plan + day sheet for a future day
  await page.evaluate(() => { document.querySelector('.tab[data-tab="plan"]').click(); });
  await wait(400);
  await shot('04-plan-progress');
  await page.evaluate(() => { const btns = document.querySelectorAll('[data-act="open-day"]'); btns[2].click(); });
  await wait(500);
  await shot('05-day-future');
  await page.evaluate(() => document.querySelector('[data-act="close-sheet"]').click());
  await wait(300);

  // review chips grid
  await page.evaluate(() => { document.querySelector('.tab[data-tab="review"]').click(); });
  await wait(400);
  await shot('06-review-chips');

  // me + export
  await page.evaluate(() => { document.querySelector('.tab[data-tab="me"]').click(); });
  await wait(400);
  await shot('07-me');
  await page.evaluate(() => { const r = [...document.querySelectorAll('[data-act="export"]')][0]; r.click(); });
  await wait(500);
  await shot('08-export');
  await page.evaluate(() => document.querySelector('[data-act="close-sheet"]').click());
  await wait(300);
  // test notification (web fallback) - just click to check no crash
  await page.evaluate(() => { document.querySelector('[data-act="test-notif"]').click(); });
  await wait(600);

  // narrow screen overflow check
  await page.setViewport({ width: 360, height: 780, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.evaluate(() => { document.querySelector('.tab[data-tab="today"]').click(); window.scrollTo(0, 0); });
  await wait(500);
  const overflow = await page.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth }));
  console.log('OVERFLOW', overflow);
  await shot('09-narrow-today');

  console.log('ERRORS', JSON.stringify(errors, null, 1));
  await browser.close();
})();