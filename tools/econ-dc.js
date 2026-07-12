// Deep Catch 72h economy simulator — greedy player, models the real cast loop.
// Mechanics mirrored from the game: reach/limit/reel derive cast time & haul.

const WATER_PX = 1140;           // two screens of water
const DROP = 300;                // px/s hook drop (owner: slower, more deliberate)
const HANDLING = 2.0;            // s aim/tap/settle per cast

// tunables (mirror into the game when settled)
const T = {
  line: { max: 30, base: 40,   ratio: 1.36, reach: n => Math.min(1, 0.16 + n * 0.028) },
  net:  { max: 11, base: 140,  ratio: 1.62, limit: n => 1 + n },
  reel: { max: 10, base: 90,   ratio: 1.55, speed: n => 430 + n * 95 },
  hook: { max: 30, base: 120,  ratio: 1.60, mult: n => 1 + n * 0.08 },
  ponds: [
    { name: 'Backyard',  price: 0,         vMin: 3,   vMax: 240 },
    { name: 'Goldfish',  price: 20000,     vMin: 22,  vMax: 620 },
    { name: 'Kelp',      price: 200000,    vMin: 45,  vMax: 1100 },
    { name: 'Open Sea',  price: 1400000,   vMin: 80,  vMax: 2200 },
    { name: 'Fjord',     price: 16000000,  vMin: 180, vMax: 4200 },
    { name: 'Trench',    price: 160000000, vMin: 350, vMax: 9500 },
    { name: 'Hadal',     price: 560000000, vMin: 800, vMax: 20000 },
  ],
  tanks: [
    { name: 'Bowl',  price: 0 },
    { name: 'Reef Tank', price: 300000 },
    { name: 'Leviathan Vault', price: 30000000 },
  ],
};

// average sold value of one fish given pond & reach (deeper = geometric ramp,
// weighted toward shallow spawns like the real spawn tables)
function avgVal(p, reach) {
  let s = 0, wsum = 0;
  for (let d = 0.02; d <= reach; d += 0.02) {
    const w = 1.25 - d;                       // shallow fish commoner
    s += w * p.vMin * Math.pow(p.vMax / p.vMin, Math.pow(d, 1.25));
    wsum += w;
  }
  return wsum ? s / wsum : p.vMin;
}
// expected hooked fish per cast: hook sweeps down+up through reach band
const encounters = reach => 0.5 + 6.0 * reach; // twice the water, twice the path

function rate(st) {
  const reach = T.line.reach(st.line), limit = T.net.limit(st.net);
  const reel = T.reel.speed(st.reel), mult = T.hook.mult(st.hook);
  const p = T.ponds[st.pond];
  const caught = Math.min(limit, encounters(reach));
  const dur = (reach * WATER_PX) / DROP + (reach * WATER_PX) / reel + HANDLING;
  return { gph: caught * avgVal(p, reach) * mult * 3600 / dur, dur };
}

function cost(k, n) { return Math.round(T[k].base * Math.pow(T[k].ratio, n)); }

function simulate(log) {
  const st = { line: 0, net: 0, reel: 0, hook: 0, pond: 0, owned: [0], tank: 0, gold: 0 };
  let hours = 0;
  const milestones = [];
  const done = () => st.line >= T.line.max && st.net >= T.net.max && st.reel >= T.reel.max
    && st.hook >= T.hook.max && st.owned.length === T.ponds.length && st.tank === T.tanks.length - 1;
  let guard = 0;
  while (!done() && guard++ < 100000) {
    // candidate purchases: gear, next pond, next tank — greedy by payback
    const opts = [];
    for (const k of ['line', 'net', 'reel', 'hook']) if (st[k] < T[k].max) {
      const st2 = { ...st }; st2[k]++;
      opts.push({ what: k, price: cost(k, st[k]), gain: rate(st2).gph - rate(st).gph, apply: s => s[k]++ });
    }
    const np = st.owned.length;
    if (np < T.ponds.length) {
      const st2 = { ...st, pond: np };
      opts.push({ what: 'pond:' + T.ponds[np].name, price: T.ponds[np].price,
        gain: rate(st2).gph - rate(st).gph, apply: s => { s.owned.push(np); s.pond = np; } });
    }
    if (st.tank < T.tanks.length - 1)
      opts.push({ what: 'tank:' + T.tanks[st.tank + 1].name, price: T.tanks[st.tank + 1].price,
        gain: 1e-9, apply: s => s.tank++ });
    // prefer best payback among affordable-soon; buy trophies (tanks) when cheap vs income
    opts.sort((a, b) => (b.gain / Math.max(1, b.price)) - (a.gain / Math.max(1, a.price)));
    let pick = opts.find(o => o.gain > 0) || opts[0];
    // if a tank costs < 20 min of income, grab it first (trophy pride)
    const tk = opts.find(o => o.what.startsWith('tank') && o.price < rate(st).gph / 3);
    if (tk) pick = tk;
    // while saving for the big pick, keep buying small gainful upgrades (real-player behavior)
    let guard2 = 0;
    while (st.gold < pick.price && guard2++ < 500) {
      const small = opts.filter(o => o !== pick && o.gain > 0 && o.price < pick.price * 0.06 && o.price <= st.gold)
        .sort((a, b) => (b.gain / Math.max(1, b.price)) - (a.gain / Math.max(1, a.price)))[0];
      if (small) { st.gold -= small.price; small.apply(st); milestones.push([hours, small.what, small.price]);
        // refresh option list against new state
        opts.length = 0;
        for (const k of ['line','net','reel','hook']) if (st[k] < T[k].max) {
          const st2 = { ...st }; st2[k]++;
          opts.push({ what: k, price: cost(k, st[k]), gain: rate(st2).gph - rate(st).gph, apply: x => x[k]++ });
        }
        continue;
      }
      const step = Math.min((pick.price - st.gold) / rate(st).gph, 0.25);
      hours += step; st.gold += step * rate(st).gph;
    }
    st.gold -= pick.price;
    pick.apply(st);
    milestones.push([hours, pick.what, pick.price]);
  }
  if (log) {
    for (const [h, w, p] of milestones)
      if (w.includes(':') || p > 50000) console.log(`  ${h.toFixed(1)}h  ${w}  ($${p.toLocaleString()})`);
  }
  return hours;
}

const total = simulate(true);
console.log('TOTAL TIME TO 100%:', total.toFixed(1), 'hours');
