// Optional local acceptance test: npm install --no-save --package-lock=false playwright
// npx playwright install chromium; node scripts/browser-check.mjs [base URL]
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { once } from 'node:events';
const output=fileURLToPath(new URL('../../whoami-previews/',import.meta.url));
mkdirSync(output,{recursive:true});
let server;
if (!process.argv[2]) {
  process.env.PORT='0';
  ({server}=await import('./serve.mjs'));
  if (!server.listening) await once(server,'listening');
}
const base=process.argv[2]||`http://127.0.0.1:${server.address().port}`;
async function checkPalette(page, theme) {
  const result = await page.evaluate(() => {
    const css = getComputedStyle(document.documentElement);
    const token = name => css.getPropertyValue(name).trim();
    const luminance = hex => {
      const channels = hex.replace('#', '').match(/../g).map(n => parseInt(n, 16) / 255)
        .map(n => n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4);
      return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
    };
    const ratios = [];
    for (const fg of ['--ink', '--muted', '--accent', '--secondary']) {
      for (const bg of ['--bg', '--surface', '--section-tint', '--warm-tint']) {
        const a = luminance(token(fg)), b = luminance(token(bg));
        ratios.push({ pair: `${fg}/${bg}`, ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05) });
      }
    }
    const a = luminance(token('--badge-ink')), b = luminance(token('--accent'));
    ratios.push({ pair: 'badge', ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05) });
    return { bg: token('--bg'), accent: token('--accent'), ratios,
      meta: document.querySelector('meta[name="theme-color"]').content,
      titleBackground: getComputedStyle(document.querySelector('.title-gradient')).backgroundImage,
      titleAnimation: getComputedStyle(document.querySelector('.title-gradient')).animationName,
      orbAnimation: getComputedStyle(document.querySelector('.gradient-orb')).animationName };
  });
  assert.equal(result.bg, theme === 'dark' ? '#191e1b' : '#faf8f4');
  assert.equal(result.accent, theme === 'dark' ? '#9bc5b3' : '#2e6556');
  assert.equal(result.meta, result.bg, 'Browser theme color matches page');
  assert.equal(result.titleBackground, 'none');
  assert.equal(result.titleAnimation, 'none');
  assert.equal(result.orbAnimation, 'none');
  for (const {pair, ratio} of result.ratios) assert(ratio >= 4.5, `${theme}: ${pair} contrast ${ratio.toFixed(2)} < 4.5`);
  console.log(`PASS ${theme} palette, static decoration, text/badge contrast (minimum ${Math.min(...result.ratios.map(r => r.ratio)).toFixed(2)}:1)`);
}
let browser;
try {
  browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:1000},colorScheme:'light'});
  const page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/');
  for (const theme of ['dark', 'light']) {
    await page.evaluate(value => localStorage.setItem('zihang-theme', value), theme);
    await page.reload();
    await checkPalette(page, theme);
    for(const width of [1440,768,390,320]){
      await page.setViewportSize({width,height:900});
      for(const route of ['/','/publications/','/projects/','/cv/','/credits/']){
        const response=await page.goto(base+route);
        assert.equal(response.status(),200);
        assert.equal(await page.locator('html').getAttribute('data-theme'),theme);
        const layout=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
        assert.equal(layout.width,width);
        assert(layout.scroll<=width,`Overflow at ${width}: ${route} (${layout.scroll})`);
        for(const img of await page.locator('main img').all()){
          await img.scrollIntoViewIfNeeded();
          await img.evaluate(el=>el.decode());
          assert(await img.evaluate(el=>el.naturalWidth>0));
        }
      }
      console.log(`PASS ${theme} layout and images: ${width}px, all five pages`);
    }
    await page.goto(base+'/');
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto(base+'/');
  await page.screenshot({path:output+'/mobile-hero.png',animations:'disabled'});
  await page.locator('#setupx').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('#setupx')).opacity==='1');
  await page.screenshot({path:output+'/mobile-project.png',animations:'disabled'});
  await page.getByRole('button',{name:'Switch to dark theme',exact:true}).click();
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  await checkPalette(page,'dark');
  await page.screenshot({path:output+'/mobile-dark.png',animations:'disabled'});
  await page.goto(base+'/publications/');
  assert.equal(await page.locator('.paper-card:visible').count(),4);
  await page.locator('[data-filter=accepted]').click();
  assert.equal(await page.locator('.paper-card:visible').count(),1);
  await page.locator('[data-filter=preprint]').click();
  assert.equal(await page.locator('.paper-card:visible').count(),3);
  await page.locator('[data-filter=all]').click();
  await page.locator('#setupx summary').click();
  assert(await page.locator('#setupx .authors').evaluate(el=>el.open));
  await page.locator('#setupx .cite-button').click();
  assert(await page.locator('#cite-setupx').isVisible());
  await page.locator('#setupx .figure-link').click();
  assert(await page.locator('dialog').evaluate(el=>el.open));
  await page.keyboard.press('Escape');
  await page.locator('dialog').waitFor({state:'hidden'});
  await page.locator('#setupx .figure-link').click();
  await page.getByRole('button',{name:'Close figure',exact:true}).click();
  assert(!(await page.locator('dialog').evaluate(el=>el.open)));
  const pdf=await context.request.get(base+'/cv/Zihang-Zhou-CV.pdf');
  assert.equal(pdf.status(),200);assert((await pdf.body()).subarray(0,5).toString()==='%PDF-');
  const notfound=await context.request.get(base+'/nonexistent-page-for-check/');assert.equal(notfound.status(),404);
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(base+'/');
  await page.getByRole('button',{name:'Switch to light theme',exact:true}).click();
  assert.equal(await page.locator('.profile-card').count(),0);
  assert.equal(await page.locator('.project-row').count(),4);
  assert.equal(await page.locator('.hero h1').innerText(),"Hi, I'm\nZihang Zhou");
  const rows=await page.locator('.project-row').evaluateAll(elements=>elements.map(el=>({image:getComputedStyle(el.querySelector('.project-visual')).order,text:getComputedStyle(el.querySelector('.project-info')).order})));
  assert.equal(rows[1].image,'2');
  assert.equal(rows[1].text,'1');
  await page.screenshot({path:output+'/desktop-hero.png',animations:'disabled'});
  await page.locator('#setupx').scrollIntoViewIfNeeded();
  await page.locator('#setupx').screenshot({path:output+'/desktop-project.png',animations:'disabled'});
  for (const row of await page.locator('.project-row').all()) {
    await row.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));
    await page.waitForFunction(id=>getComputedStyle(document.getElementById(id)).opacity==='1',await row.getAttribute('id'));
  }
  await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo({top:0,behavior:'instant'});});
  await page.screenshot({path:output+'/desktop-full.png',fullPage:true,animations:'disabled'});
  await page.getByRole('button',{name:'Switch to dark theme',exact:true}).click();
  await page.screenshot({path:output+'/desktop-dark.png',animations:'disabled'});
  await page.goto(base+'/publications/');
  await page.screenshot({path:output+'/publications-dark.png',animations:'disabled'});
  await page.getByRole('button',{name:'Switch to light theme',exact:true}).click();
  await page.screenshot({path:output+'/publications-light.png',animations:'disabled'});
  assert.deepEqual(errors,[]);
  console.log('PASS filters, authors, citations, lightbox/Escape, theme persistence, PDF, 404, zero JavaScript errors');
  await context.close();
  const nojs=await browser.newContext({javaScriptEnabled:false});const basic=await nojs.newPage();await basic.goto(base+'/publications/');assert.equal(await basic.locator('.paper-card').count(),4);await basic.goto(base+'/');assert.equal(await basic.locator('.project-row:visible').count(),4);console.log('PASS content readable without JavaScript');await nojs.close();
  const reduced=await browser.newContext({reducedMotion:'reduce'});const still=await reduced.newPage();await still.goto(base+'/');assert.equal(await still.locator('.reveal-ready').count(),0);assert.equal(await still.locator('.gradient-orb').first().evaluate(el=>getComputedStyle(el).animationName),'none');console.log('PASS reduced motion');await reduced.close();
  // Reference screenshots are optional; all acceptance checks above use this website only.
  const reference=new URL('../../whoami-reference/docs/index.html',import.meta.url);
  if (existsSync(reference)) {
    const refContext=await browser.newContext({viewport:{width:1440,height:1000}});
    const ref=await refContext.newPage();
    await ref.goto(reference.href);
    await ref.screenshot({path:output+'/reference-hero.png',animations:'disabled'});
    await refContext.close();
  } else {
    console.log('SKIP optional reference screenshot: local reference not present');
  }
  console.log(`Screenshots: ${output}`);
} finally {await browser?.close(); if(server) await new Promise(resolve=>server.close(resolve));}