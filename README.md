# 🎣 Deep Catch

A cozy little fishing trip — a single-file HTML5 canvas game. Cast your line into a dusk-lit sea, dive two screens deep, and fill your aquarium with 45 species across seven waters, guided by your grandpa's journal.

**▶ Play:** [https://kosweet.github.io/deep-catch/](https://kosweet.github.io/deep-catch/) (GitHub Pages) · or open `index.html` locally

## The game

- **One-thumb fishing.** On **phone**, drag on the water to aim, then tap **Cast**. On **PC**, click the water to aim and cast in one go (or use Space). Arrow keys aim too. Reel with Cast / click again.
- **Instant hauls.** Your catch banks itself in gold — no sell-or-keep popups. Every new species swims straight into your aquarium.
- **Seven waters, each its own world.** Backyard Pond → Goldfish Garden → Kelp Forest → Open Sea → Frozen Fjord (with dancing aurora) → The Trench → **The Hadal Garden** — a pitch-black finale that's scary-deep *and* warm, lit by drifting embers, glowing jellies, and an ancient colossal anglerfish called **The Old Lantern**.
- **45 species,** each drawn with its own silhouette — real sharks, a serpentine leviathan, a spiked pufferfish, fancy goldfish, an aurora-lit narwhal, glowing hadal jellies. Shy fish dart from a careless hook; predators notice, telegraph, and lunge to steal your catch — dodge or lose it.
- **Grandpa's journal.** A 32-note story chain paces your whole journey with goals and rewards, so progress feels like a story, not a savings account. After the last page, **extra pages** turn up in bottles and rare catches.
- **Grandpa's thermos.** Your first cast each calendar day triggers ~2 minutes of golden hour and a story beat — a gentle daily ritual.
- **Species dex.** Tap **📖 X/45** in the HUD for the full collection grid — chase badges, water filters, grandpa's notes.
- **Legend skin perks** visible in the Boathouse shop (gold line under each $25M legend).
- **First-session tutorial** — three beats: reel pulse after first cast, shop bounce after first gold, Room tab glow after first new species.
- **Journal finale** — completing grandpa's journal opens a boat-naming dedication; name appears on the hull and in the HUD.
- **Full endgame credits** — 45/45 species triggers celebration; credits expand if all extra pages found and boat is named.
- **Golden hour.** Every few minutes the water glitters for a little while — rare fish rise and every catch pays ×1.5. A **10-second warning** warms the sky before it starts. Fill every slot in one cast for a **full-net bonus**, or hook a calm predator for a **+50% premium** (it can still get away with your catch if it lunges first).
- **Messages in bottles.** Torn journal pages drift along the surface now and then — park the boat over one and cast to read a page grandpa never numbered (and pocket a little gold). After the journal ends, bottles unlock **extra story pages**.
- **The boat cat.** Naps through the quiet, watches the line when you cast, bristles when a predator locks on, and celebrates a full net. Tap the aquarium glass to feed your fish, and spend late-game gold on **tank decor** — kelp, a bubble volcano, a sunken rowboat, a lantern string, a little lighthouse. Fish **react to decor**: they gather under lantern strings and startle when the volcano burbles.
- **The Boathouse.** Five hull paints and ten fisherman looks — four everyday sweater colours ($8k), plus six legend skins at $25M each (**Ninja**, **Robot**, **Alien**, **Pirate**, **Wizard**, **Astronaut**), each with its own silhouette and a small flavor perk (longer predator telegraph, sell bonus, bottle gold, golden-hour extension, curious-fish pull, out-of-reach glow).
- **Chase fish.** Each water hides one ultra-rare legend — spawn odds rise with pity, golden hour, and thermos; first thermos cast spawns a visible swim-by.
- **Water unlock postcards.** Buying a new pond shows a postcard with grandpa's quote for that water.
- **Curious fish.** Some species drift toward your hook (the shy ones still bolt).
- **First-catch celebration.** Slow-motion sparkle and fanfare when you land your very first fish.
- **Collapsible shop** — Gear, Waters, Aquarium, Boathouse, and Decor fold closed; your layout persists in save.
- **Collection milestones** — banners at 10 and 25 species discovered.
- **Predator telegraph** — red **!** pops near the hook when a hunter notices your haul.
- **Room tap hint** — gentle **👆 tap a fish** when viewing the aquarium with species to read.
- **Thermos vs golden hour** — HUD pill explains when thermos golden is active and random golden is paused.
- **Reduced motion** — respects `prefers-reduced-motion` (no aurora, dust, celebrate slow-mo, pulsing HUD).
- **Low-end perf** — caps DPR, fish count, embers, and bubble draw on weaker devices.
- **Daily boot nudge** — once per local day, a gentle "Today on the water" banner (thermos, journal hint, species milestone, extra pages, or boat naming).
- **Engagement score** — `sendScore` reports species × 1000 + journal pages (updates on new species and journal milestones).
- **Save analytics** — lightweight funnel counters (`casts`, `shopBuys`, `thermos`, `stolen`, `chase`, etc.) in save; inspect via `__dc.stats()` on localhost.
- **Harbor gifts** — repeatable gold sinks unlock when gear is maxed (cat treats, dock fund, fish food, harbor bell).
- **~30 hours of play** to 100%, tuned by a greedy-player economy simulation ([`tools/econ-dc.js`](tools/econ-dc.js)).
- **Cozy, committed dusk look** with per-water ambient music (Web Audio, no assets).

## Tech

- **Zero dependencies, zero build.** One `index.html` — HTML, CSS, and vanilla JS canvas rendering, all inline.
- **YouTube Playables ready.** Integrates the Playables SDK: `firstFrameReady`/`gameReady` boot handshake, cloud saves via `loadData`/`saveData`, full pause/resume via `onPause`/`onResume`, YouTube mute via `isAudioEnabled`/`onAudioEnabledChange`, and `sendScore` reporting engagement (species × 1000 + journal pages, 0–45032).
- **Saves** to Playables cloud save inside YouTube, falling back to `localStorage` (`deepcatch.v3`) on the plain web, migrating older saves forward.
- **Web Audio** synthesizes every sound at runtime — no audio files.

## Development

The game is authored as a single file. `tools/` holds the economy simulator and QA runners:

```bash
node tools/econ-dc.js        # progression milestones (~32h to max gear/waters/tank)
node tools/playables-qa.js   # static pre-submit checks for YouTube Playables
node tools/smoke-test.js     # local HTTP smoke test (boot + assets)
```

Manual embed testing: [docs/PLAYABLES-QA.md](docs/PLAYABLES-QA.md)  
Submission pack (URL, listing copy, icon): [docs/SUBMIT.md](docs/SUBMIT.md)

## Credits

Built with [Claude Code](https://claude.com/claude-code).

## License

MIT — see [LICENSE](LICENSE).
