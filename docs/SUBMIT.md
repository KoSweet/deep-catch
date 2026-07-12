# Deep Catch — YouTube Playables submission pack

Use this document when creating the playable in **YouTube Studio → Playables** (or the Playables developer console).

---

## Live URL

**https://kosweet.github.io/deep-catch/**

- Single-file game: `index.html` at repo root
- HTTPS required — enable **GitHub Pages** once: [docs/DEPLOY.md](DEPLOY.md) (Settings → Pages → `main` / root)
- After enabling Pages, allow ~1 minute for the site to go live

---

## Listing copy

### Title
**Deep Catch**

### Short description (store / card)
Cast into a dusk-lit sea, fill grandpa's journal, and collect 45 species across seven waters. One-thumb cozy fishing — no account, no downloads.

### Long description
Deep Catch is a cozy fishing trip in your pocket. Aim with one thumb, cast your line, and reel in hauls that bank themselves as gold. Every new species swims straight into your aquarium.

Follow **Grandpa's journal** through 32 story beats — from the backyard pond to the Hadal Garden, where embers drift through the dark. Unlock seven waters, legend skins with real perks, tank decor, chase fish, golden hour, and daily thermos rituals.

Built for YouTube Playables: cloud saves, pause/resume, mute compliance, and engagement scoring.

### Genre / tags
Simulation · Casual · Collection · Cozy · Fishing

### Age rating suggestion
**Everyone** — no violence, no chat, no user-generated content, no IAP

### Orientation
**Portrait** (primary). Landscape letterboxes acceptably on wide screens.

---

## Assets checklist

| Asset | Path | Notes |
|-------|------|-------|
| Icon (512×512 or 1024×1024) | `assets/icon.png` | Generated app icon — upload as store icon |
| Preview / thumbnail | `assets/preview.png` | Browser capture at 9:16 — see QA results |
| Gameplay video (10–15 s) | Record from live URL | Cast → catch → new species → dex; portrait 9:16 |

### Video capture tips
1. Open https://kosweet.github.io/deep-catch/ on a phone or DevTools mobile emulation (390×844).
2. Record 10–15 seconds: splash → cast → reel → “New species!” banner → tap 📖 dex.
3. Export MP4, no audio required (or soft ambient only).

---

## Playables SDK summary (for reviewers)

| API | Usage |
|-----|--------|
| `YT.game.firstFrameReady()` | After splash frame drawn |
| `YT.game.gameReady()` | After save load + HUD sync |
| `YT.game.loadData()` / `saveData()` | Cloud save; `save()` gated on `loadDone` |
| `YT.system.onPause()` / `onResume()` | Freezes loop + suspends Web Audio |
| `YT.system.isAudioEnabled()` | YouTube mute respected |
| `YT.engagement.sendScore({ value })` | `species × 1000 + journal pages` (0–45032) |

Dev cheats and test gold are **disabled** when `ytgame.IN_PLAYABLES_ENV` is true.

---

## Create the playable (Studio steps)

1. Go to [YouTube Studio](https://studio.youtube.com) → your channel → **Playables** (or Google Playables developer portal if using that flow).
2. **New playable** → **Custom / HTML5**.
3. **Game URL:** `https://kosweet.github.io/deep-catch/`
4. Upload **icon** and **preview video**.
5. Paste **short description** above.
6. Set score type to **High score** (integer, monotonic).
7. Run the **embed preview** and complete [`PLAYABLES-QA.md`](PLAYABLES-QA.md) sections 1–7 in that preview (not localhost).
8. Submit for review.

---

## Pre-submit verification

```bash
node tools/playables-qa.js   # static — must be 39/39
node tools/smoke-test.js     # local HTTP smoke — boot + DOM checks
```

See [`QA-RESULTS.md`](QA-RESULTS.md) for the latest automated run log.

---

## Support / contact

Repository: https://github.com/KoSweet/deep-catch  
License: MIT
