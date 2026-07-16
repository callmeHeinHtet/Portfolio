const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
  const errs = [];
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 120)); });
  p.on('response', r => { if (r.status() >= 400) errs.push('HTTP ' + r.status() + ' ' + r.url().slice(0, 70)); });
  await p.goto('https://revenuewatch.vercel.app/login', { waitUntil: 'networkidle', timeout: 60000 });
  await p.fill('input[type="password"]', process.argv[2]);
  await p.click('button[type="submit"]');
  await p.waitForTimeout(12000);
  console.log('url:', p.url());
  const t = await p.evaluate(() => document.body.innerText.replace(/\n+/g, ' | ').slice(0, 500));
  console.log('RENDERED:', t);
  console.log('CONSOLE/HTTP ERRORS:', errs.length ? errs.slice(0,5).join(' || ') : '(none)');
  await p.screenshot({ path: 'rw-live.png' });
  await b.close();
})();
