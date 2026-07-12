#!/usr/bin/env node
// Local HTTP smoke test — boot, DOM, and basic API surface.
// Run: node tools/smoke-test.js
// Requires: node 18+ (fetch)

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PORT = 8765;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.png': 'image/png', '.md': 'text/markdown' };

const results = [];
const pass = (n, d) => results.push({ ok: true, name: n, detail: d });
const fail = (n, d) => results.push({ ok: false, name: n, detail: d });

function serveFile(urlPath) {
  const rel = urlPath === '/' ? '/index.html' : urlPath;
  const file = path.join(ROOT, rel.replace(/^\//, ''));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return null;
  return { body: fs.readFileSync(file), type: MIME[path.extname(file)] || 'application/octet-stream' };
}

const server = http.createServer((req, res) => {
  const hit = serveFile(req.url.split('?')[0]);
  if (!hit) { res.writeHead(404); res.end('Not found'); return; }
  res.writeHead(200, { 'Content-Type': hit.type });
  res.end(hit.body);
});

server.listen(PORT, async () => {
  const base = `http://127.0.0.1:${PORT}`;
  try {
    const html = await (await fetch(base + '/')).text();
    if (html.includes('Deep Catch')) pass('HTTP boot', 'index.html served');
    else fail('HTTP boot', 'missing title');

    for (const id of ['cv', 'btn-cast', 'btn-dex', 'quest', 'dex-overlay', 'stage']) {
      if (html.includes('id="' + id + '"')) pass('DOM: ' + id, 'present');
      else fail('DOM: ' + id, 'missing');
    }

    if (html.includes('youtube.com/game_api/v1')) pass('SDK script tag', 'in HTML');
    else fail('SDK script tag', 'missing');

    if (html.includes('viewport-fit=cover')) pass('Mobile viewport', 'cover');
    else fail('Mobile viewport', 'check meta');

    const icon = await fetch(base + '/assets/icon.png');
    if (icon.ok && icon.headers.get('content-type')?.includes('image')) pass('Icon asset', 'assets/icon.png');
    else fail('Icon asset', 'missing or wrong type');

    if (!html.match(/window\.__dc\s*=/)) pass('Prod __dc gate', 'no __dc in Playables build');
    else if (html.includes('if (!YT)') && html.indexOf('window.__dc') > html.indexOf('if (!YT)'))
      pass('Prod __dc gate', '__dc only when !YT');
    else fail('Prod __dc gate', '__dc may leak in Playables');

    if (fs.existsSync(path.join(ROOT, 'docs/DEPLOY.md'))) pass('Deploy docs', 'docs/DEPLOY.md');
    else fail('Deploy docs', 'missing');

  } catch (e) {
    fail('Smoke runner', e.message);
  } finally {
    server.close();
    const ok = results.filter(r => r.ok).length;
    const bad = results.filter(r => !r.ok).length;
    console.log('\nDeep Catch — smoke test\n');
    for (const r of results) console.log(`  ${r.ok ? '✓' : '✗'}  ${r.name}${r.detail ? ' — ' + r.detail : ''}`);
    console.log(`\n${ok} passed, ${bad} failed (${results.length} checks)\n`);
    process.exit(bad ? 1 : 0);
  }
});
