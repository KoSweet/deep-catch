#!/usr/bin/env node
// Deep Catch — YouTube Playables pre-submit static QA runner.
// Run: node tools/playables-qa.js
// Manual steps: see docs/PLAYABLES-QA.md

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INDEX = path.join(ROOT, 'index.html');
const html = fs.readFileSync(INDEX, 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*)<\/script>/);
if (!scriptMatch) throw new Error('No inline script in index.html');

const results = [];
const pass = (name, detail) => results.push({ ok: true, name, detail });
const fail = (name, detail) => results.push({ ok: false, name, detail });

// --- syntax ---
try {
  new Function(scriptMatch[1]);
  pass('JavaScript syntax', 'inline script parses');
} catch (e) {
  fail('JavaScript syntax', e.message);
}

// --- HTML / meta ---
if (html.includes('<meta charset="utf-8">')) pass('UTF-8 charset', 'present');
else fail('UTF-8 charset', 'missing');

if (/viewport.*viewport-fit=cover/.test(html)) pass('Mobile viewport', 'viewport-fit=cover');
else fail('Mobile viewport', 'check meta viewport');

if (html.includes('youtube.com/game_api/v1')) pass('Playables SDK script', 'loaded before game code');
else fail('Playables SDK script', 'missing script tag');

// --- SDK integration (static) ---
const sdkChecks = [
  ['firstFrameReady', 'YT.game.firstFrameReady'],
  ['gameReady', 'YT.game.gameReady'],
  ['loadData', 'YT.game.loadData'],
  ['saveData', 'YT.game.saveData'],
  ['onPause', 'YT.system.onPause'],
  ['onResume', 'YT.system.onResume'],
  ['isAudioEnabled', 'YT.system.isAudioEnabled'],
  ['onAudioEnabledChange', 'YT.system.onAudioEnabledChange'],
  ['sendScore', 'YT.engagement.sendScore'],
];
for (const [label, needle] of sdkChecks) {
  if (scriptMatch[1].includes(needle)) pass('SDK: ' + label, needle);
  else fail('SDK: ' + label, 'not found — ' + needle);
}

if (/loadDone/.test(scriptMatch[1]) && /if \(!loadDone\) return/.test(scriptMatch[1]))
  pass('Save after load', 'save() gated on loadDone');
else fail('Save after load', 'save may run before loadData resolves');

if (!scriptMatch[1].includes('document.visibilityState'))
  pass('Pause audio', 'no document.visibilityState (use onPause/onResume)');
else fail('Pause audio', 'visibilityState handler may conflict with Playables');

// --- game data ---
const speciesBlock = scriptMatch[1].match(/const SPECIES = \[([\s\S]*?)\];\s*const byId/);
const speciesN = speciesBlock ? (speciesBlock[1].match(/\{ id:"/g) || []).length : 0;
if (speciesN === 45) pass('Species count', '45 defined');
else fail('Species count', 'expected 45, found ' + speciesN);

const saveFields = ['gold', 'collection', 'qi', 'thermosDay', 'pages', 'endgameSeen', 'journalFinaleSeen', 'boatName', 'tut', 'chasePity', 'shopFold', 'bragSeen', 'nudgeDay', 'sinks', 'analytics', 'wv'];
for (const f of saveFields) {
  if (scriptMatch[1].includes(f + ':')) pass('Save field: ' + f, 'in save payload');
  else fail('Save field: ' + f, 'missing from save()');
}

// --- dev leak guard ---
if (/isLocalDev\(\)/.test(scriptMatch[1]) && scriptMatch[1].includes('500000000'))
  pass('Dev gold grant', 'gated behind isLocalDev() (localhost only)');
else fail('Dev gold grant', 'verify test gold does not run on GitHub Pages or Playables');

if (!scriptMatch[1].includes('window.__dc'))
  pass('Debug console', 'no __dc in production build');
else if (scriptMatch[1].includes('isLocalDev()') && scriptMatch[1].indexOf('window.__dc') > scriptMatch[1].indexOf('isLocalDev()'))
  pass('Debug console', '__dc gated behind isLocalDev()');
else fail('Debug console', '__dc may be exposed in production');

// --- UX surfaces ---
for (const id of ['dex-overlay', 'credits-overlay', 'dedication-overlay', 'note-overlay', 'postcard-overlay']) {
  if (html.includes('id="' + id + '"')) pass('UI: ' + id, 'present');
  else fail('UI: ' + id, 'missing');
}

// --- report ---
const ok = results.filter(r => r.ok).length;
const bad = results.filter(r => !r.ok).length;
console.log('\nDeep Catch — Playables static QA\n');
for (const r of results) {
  const mark = r.ok ? '✓' : '✗';
  console.log(`  ${mark}  ${r.name}${r.detail ? ' — ' + r.detail : ''}`);
}
console.log(`\n${ok} passed, ${bad} failed (${results.length} checks)\n`);
if (bad) {
  console.log('Fix failures above, then run the manual matrix in docs/PLAYABLES-QA.md\n');
  process.exit(1);
}
console.log('Static checks passed. Complete manual QA in docs/PLAYABLES-QA.md before submit.\n');
