# 🎣 Deep Catch

A cozy little fishing trip — a single-file HTML5 canvas game. Cast your line into a dusk-lit sea, dive two screens deep, and fill your aquarium with 45 species across seven waters, guided by your grandpa's journal.

**▶ Play:** open `index.html` in any modern browser, or visit the [live page](#) once GitHub Pages is enabled.

## The game

- **One-thumb fishing.** Move to aim, tap the water (or press **Cast**) to drop your hook. It grabs any fish it touches on the way down *and* up, then reels your haul to the surface. No menus in the way of the water.
- **Instant hauls.** Your catch banks itself in gold — no sell-or-keep popups. Every new species swims straight into your aquarium.
- **Seven waters, each its own world.** Backyard Pond → Goldfish Garden → Kelp Forest → Open Sea → Frozen Fjord (with dancing aurora) → The Trench → **The Hadal Garden** — a pitch-black finale that's scary-deep *and* warm, lit by drifting embers, glowing jellies, and an ancient colossal anglerfish called **The Old Lantern**.
- **45 species,** each drawn with its own silhouette — real sharks, a serpentine leviathan, a spiked pufferfish, fancy goldfish, an aurora-lit narwhal, glowing hadal jellies. Shy fish dart from a careless hook; predators notice, telegraph, and lunge to steal your catch — dodge or lose it.
- **Grandpa's journal.** A 32-note story chain paces your whole journey with goals and rewards, so progress feels like a story, not a savings account.
- **~3 days of play** to 100%, tuned by a greedy-player economy simulation ([`tools/econ-dc.js`](tools/econ-dc.js)).
- **Cozy, committed dusk look** with per-water ambient music (Web Audio, no assets).

## Tech

- **Zero dependencies, zero build.** One `index.html` — HTML, CSS, and vanilla JS canvas rendering, all inline.
- **Saves** to `localStorage` (`deepcatch.v3`), migrating older saves forward.
- **Web Audio** synthesizes every sound at runtime — no audio files.

## Development

The game is authored as a single file. `tools/` holds the economy simulator used to tune upgrade costs to the ~72-hour target:

```bash
node tools/econ-dc.js   # prints the progression milestones and total time-to-100%
```

## Credits

Built with [Claude Code](https://claude.com/claude-code).

## License

MIT — see [LICENSE](LICENSE).
