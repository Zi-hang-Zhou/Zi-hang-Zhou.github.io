import { readFileSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = fileURLToPath(new URL('../', import.meta.url));
const pages = ['index.html','publications/index.html','projects/index.html','cv/index.html','credits/index.html','404.html'];
let refs = 0;
for (const page of pages) {
  const html = readFileSync(path.join(root,page),'utf8');
  assert(html.startsWith('<!doctype html>'),page);
  assert(html.includes('<html lang="en">'),page);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${page}: one h1`);
  assert(!/YOUR_|PLACEHOLDER|Author Two|ToolAdapter|136-6185/.test(html),`${page}: no placeholders or removed private info`);
  assert(!/author[- ]provided|(?:supplied|reported) by (?:the author|Zihang Zhou)|figure supplied for reuse|not independently (?:established|confirmed)|作者提供/i.test(html), `${page}: no author-provided disclaimers`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`${page}: unique IDs`);
  for (const [, attr, url] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(url)) continue;
    const [pathname,hash] = url.split('#');
    let target = pathname ? (pathname.startsWith('/') ? path.join(root,pathname) : path.resolve(root,path.dirname(page),pathname)) : path.join(root,page);
    assert(target === path.resolve(root) || target.startsWith(root),`${page}: relative path outside site ${url}`);
    assert(existsSync(target),`${page}: missing ${attr} ${url}`);
    if (statSync(target).isDirectory()) target = path.join(target,'index.html');
    assert(existsSync(target),`${page}: directory has index ${url}`);
    if (hash && target.endsWith('.html')) assert(readFileSync(target,'utf8').includes(`id="${hash}"`),`${page}: missing anchor ${url}`);
    refs++;
  }
}
const papers=JSON.parse(readFileSync(path.join(root,'data/publications.json'),'utf8'));
assert.equal(papers.length,4);
for (const p of papers) {
  assert(p.authors.includes('Zihang Zhou'));
  assert(p.statusSource && p.source && p.license);
  const png=readFileSync(path.join(root,'assets',p.image));
  assert.equal(png.subarray(1,4).toString(),'PNG',p.image);
}
const pdf=readFileSync(path.join(root,'cv/Zihang-Zhou-CV.pdf'));
assert.equal(pdf.subarray(0,5).toString(),'%PDF-');
assert(existsSync(path.join(root,'assets/avatar.png')));
const cv=readFileSync(path.join(root,'cv/index.html'),'utf8');
assert(cv.includes('<p class="education-grades">GPA: 4.04 / 4.3 · Average score: 92.7</p>'), 'Grades use plain prose with unchanged values');
assert(!cv.includes('education-metrics'), 'No oversized grade statistics');
const credits=readFileSync(path.join(root,'credits/index.html'),'utf8');
assert.deepEqual([...credits.matchAll(/<h2>(.*?)<\/h2>/g)].map(m=>m[1]), ['Publication figures'], 'Credits contain only the figure section');
for (const text of [
  'Personal information is supplied by Zihang Zhou.',
  'Paper metadata and original figures were checked against',
  'Publication status', 'Design &amp; assets', 'Maintenance',
  'reported by the author', 'not independently established',
  'An under-review manuscript is not presented as an accepted paper.',
  'Layout, color tokens', 'The adaptation adds publication details',
  'His personal text and project images are not reused.',
  'Paper images are credited above.', 'No visitor tracking or third-party analytics are embedded.',
  'The site and downloadable CV were last updated', 'For corrections,'
]) assert(!credits.includes(text), `Credits omit removed prose: ${text}`);
const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const figureCredits = [...credits.matchAll(/<article>([\s\S]*?)<\/article>/g)].map(m=>m[1]);
assert.equal(figureCredits.length, papers.length, 'One figure credit per paper');
for (const [i,p] of papers.entries()) {
  const credit=figureCredits[i];
  assert(credit.includes(`<h3>${escapeHtml(p.short)}</h3>`));
  assert(credit.includes(`${p.authors.map(escapeHtml).join(', ')}. <em>${escapeHtml(p.title)}</em>, ${p.year}.`), `${p.id}: ordered authors and title retained`);
  assert(credit.includes(escapeHtml(p.figure)), `${p.id}: figure credit retained`);
  assert(credit.includes(`href="https://arxiv.org/html/${p.version}"`), `${p.id}: versioned paper link retained`);
  assert(credit.includes(`href="${escapeHtml(p.source)}"`), `${p.id}: original image link retained`);
  assert(credit.includes(`Rights: ${escapeHtml(p.licenseLabel || p.license)}`), `${p.id}: actual license retained`);
  assert(credit.includes('Used without substantive modification; scaled to fit the page.'), `${p.id}: modification notice retained`);
  if (p.license==='CC BY 4.0') assert(credit.includes('href="https://creativecommons.org/licenses/by/4.0/"'), `${p.id}: license terms linked`);
}
assert(credits.includes('<a class="text-link" href="./whoami-LICENSE.txt">MIT License</a>'), 'MIT notice remains accessible');
const license=readFileSync(path.join(root,'credits/whoami-LICENSE.txt'));
assert(license.toString().includes('Copyright (c) 2025 Xiyuan Yang'));
// Pin the full upstream notice, not just its title or copyright line.
assert.equal(createHash('sha256').update(license).digest('hex'), '757bbed14fe4582c74ec8ffd407f8989866ed2d691176606400e7c8640d8aa98', 'Complete MIT license is unchanged');
const styles=readFileSync(path.join(root,'styles.css'),'utf8');
assert(styles.startsWith("/* Adapted from Xiyuan Yang's whoami portfolio (MIT).\n   Copyright (c) 2025 Xiyuan Yang. See credits/whoami-LICENSE.txt. */"), 'CSS copyright notice retained');
const publications=readFileSync(path.join(root,'publications/index.html'),'utf8');
assert.equal(publications.match(/<section class="page-intro container">([\s\S]*?)<\/section>/)?.[1], '<h1>Publications</h1>', 'Publication introduction contains only its heading');
assert(!/data-filter=|class="filters"|publication-note|sources-note/.test(publications), 'No publication filters or explanatory notes');
assert.equal((publications.match(/class="paper-card"/g)||[]).length, 4, 'All four papers remain listed');
const home=readFileSync(path.join(root,'index.html'),'utf8');
assert(!/hero-subtitle|hero-description|Developer &amp; Researcher|LLM agents, tool learning, and evaluation\./.test(home), 'Home omits the removed subtitles');
console.log('PASS: minimal publication heading, no filters or author-provided disclaimers, concise credits, preserved paper sources/licenses and MIT notice.');
console.log(`PASS: ${pages.length} pages, ${refs} local references, four paper figures/authorship records, PDF, no placeholders or removed experience.`);