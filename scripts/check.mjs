import { readFileSync, existsSync, statSync } from 'node:fs';
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
console.log(`PASS: ${pages.length} pages, ${refs} local references, four paper figures/authorship records, PDF, no placeholders or removed experience.`);