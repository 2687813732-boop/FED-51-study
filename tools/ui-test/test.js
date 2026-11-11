const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = path.resolve(__dirname, 'shots');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--force-device-scale-factor=2', '--font-render-hinting=none']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  await page.goto('http://127.0.0.1:8123/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  const shot = async (name) => {
    await page.screenshot({ path: path.join(OUT, name + '.png') });
  };
  await shot('01-today');

  // scroll through today
  await page.evaluate(() => window.scrollTo(0, 900));
  await new Promise(r => setTimeout(r, 300));
  await shot('02-today-blocks');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 300));
  await shot('03-today-bottom');

  // plan tab
  await page.evaluate(() => { window.scrollTo(0, 0); document.querySelector('.tab[data-tab="plan"]').click(); });
  await new Promise(r => setTimeout(r, 400));
  await shot('04-plan');
  await page.evaluate(() => window.scrollTo(0, 700));
  await new Promise(r => setTimeout(r, 300));
  await shot('05-plan-weeks');

  // review
  await page.evaluate(() => { window.scrollTo(0, 0); document.querySelector('.tab[data-tab="review"]').click(); });
  await new Promise(r => setTimeout(r, 400));
  await shot('06-review');

  // me
  await page.evaluate(() => { window.scrollTo(0, 0); document.querySelector('.tab[data-tab="me"]').click(); });
  await new Promise(r => setTimeout(r, 400));
  await shot('07-me');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 300));
  await shot('08-me-bottom');

  // back to today, complete some blocks and submit
  await page.evaluate(() => { window.scrollTo(0, 0); document.querySelector('.tab[data-tab="today"]').click(); });
  await new Promise(r => setTimeout(r, 300));
  await page.evaluate(() => { const b = document.querySelector('[data-act="start-block"]'); if (b) b.click(); });
  await new Promise(r => setTimeout(r, 700));
  await shot('09-timer');
  await page.evaluate(() => {
    document.querySelectorAll('[data-act="done-block"]').forEach((b, i) => { if (i < 3) setTimeout(() => b.click(), i * 60); });
  });
  await new Promise(r => setTimeout(r, 900));
  await page.evaluate(() => { document.querySelectorAll('.habit').forEach(h => h.click()); });
  await new Promise(r => setTimeout(r, 600));
  await page.evaluate(() => { const b = document.querySelector('[data-act="open-submit"]'); if (b) b.click(); });
  await new Promise(r => setTimeout(r, 700));
  await shot('10-submit-sheet');
  const filled = await page.evaluate(() => {
    const set = (id, v) => { const el = document.getElementById(id); if (!el) return false; el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); return true; };
    return {
      learned: set('f-learned', '今天装好了 Python 和 VS Code，弄懂了变量、print 和 input，写了一个打印个人信息的脚本。'),
      confused: set('f-confused', '终端里 cd 的相对路径还是容易写错，明天再练几次。'),
      next: set('f-next', '明早先读字符串与列表的文档，再敲一遍例子。'),
      hours: set('f-hours', '7'),
      link: set('f-link', 'https://github.com/example/study')
    };
  });
  console.log('filled', filled);
  await page.evaluate(() => { document.querySelectorAll('#stars .star')[3].click(); });
  await new Promise(r => setTimeout(r, 300));
  await shot('11-submit-filled');
  await page.evaluate(() => document.querySelector('[data-act="save-submit"]').click());
  await new Promise(r => setTimeout(r, 900));
  await shot('12-eval');
  const evalScroll = await page.evaluate(() => { const p = document.querySelector('.sheet-panel'); return p ? p.scrollHeight : 0; });
  await page.evaluate(() => { const p = document.querySelector('.sheet-panel'); if (p) p.scrollTop = p.scrollHeight; });
  await new Promise(r => setTimeout(r, 300));
  await shot('13-eval-bottom');
  await page.evaluate(() => document.querySelector('[data-act="close-sheet"]').click());
  await new Promise(r => setTimeout(r, 400));
  await shot('14-today-submitted');

  // day detail sheet
  await page.evaluate(() => { document.querySelector('.tab[data-tab="plan"]').click(); });
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => { const b = document.querySelector('[data-act="open-day"]'); if (b) b.click(); });
  await new Promise(r => setTimeout(r, 500));
  await shot('15-day-sheet');
  await page.evaluate(() => document.querySelector('[data-act="close-sheet"]').click());
  await new Promise(r => setTimeout(r, 300));

  // review save
  await page.evaluate(() => { document.querySelector('.tab[data-tab="review"]').click(); });
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    const tas = document.querySelectorAll('textarea[data-qi]');
    const vals = ['写完了 3 个 py 脚本，跑通 hello.py', '终端路径不熟，卡了一会儿', '字符串与列表', '没有，产出都交了'];
    tas.forEach((t, i) => { t.value = vals[i] || ''; t.dispatchEvent(new Event('input', { bubbles: true })); });
    document.querySelectorAll('.chk').forEach((c, i) => { if (i < 5) c.click(); });
  });
  await new Promise(r => setTimeout(r, 300));
  await shot('16-review-filled');
  await page.evaluate(() => document.querySelector('[data-act="save-review"]').click());
  await new Promise(r => setTimeout(r, 700));
  await shot('17-review-report');
  const ls = await page.evaluate(() => { const s = JSON.parse(localStorage.getItem('fde51.state.v1')); return { subs: Object.keys(s.submissions), score: s.submissions[Object.keys(s.submissions)[0]].score, grade: s.submissions[Object.keys(s.submissions)[0]].grade, review: s.reviews, problems: s.problems.length }; });
  console.log('STATE', JSON.stringify(ls));
  console.log('ERRORS', JSON.stringify(errors, null, 1));
  await browser.close();
})();