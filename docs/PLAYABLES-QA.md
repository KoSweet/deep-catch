# Deep Catch — YouTube Playables QA Checklist

Run automated static checks first:

```bash
node tools/playables-qa.js
```

Then complete this manual matrix in a **real YouTube Playables embed** (not localhost alone).

---

## 1. Boot & lifecycle

| # | Test | Pass |
|---|------|------|
| 1.1 | Splash / first frame appears within 1s | ☐ |
| 1.2 | Game becomes interactive after load (Cast works) | ☐ |
| 1.3 | Fresh install: journal opens on first session | ☐ |
| 1.4 | Returning player: save restores gold, gear, pond, journal index | ☐ |
| 1.5 | Returning player: species dex count matches collection | ☐ |
| 1.6 | Returning player: thermos day, extra pages, endgame flag persist | ☐ |

## 2. Pause / resume

| # | Test | Pass |
|---|------|------|
| 2.1 | Pause mid-cast (hook dropping) → freeze, no input | ☐ |
| 2.2 | Resume → loop continues from same state | ☐ |
| 2.3 | Pause with shop open → resume closes or restores safely | ☐ |
| 2.4 | Pause with dex / journal overlay → no ghost clicks after resume | ☐ |
| 2.5 | Progress saved on pause (gold unchanged after force-quit) | ☐ |

## 3. Audio

| # | Test | Pass |
|---|------|------|
| 3.1 | No audio before first user gesture (if required by current guidelines) | ☐ |
| 3.2 | Tap to play → ambient drone starts | ☐ |
| 3.3 | YouTube mute ON → all audio stops; in-game unmute cannot override | ☐ |
| 3.4 | YouTube mute OFF → in-game mute still works | ☐ |
| 3.5 | Pause → audio suspended; resume → audio returns | ☐ |
| 3.6 | Change water → mood crossfade, no harsh pop | ☐ |

## 4. Score

| # | Test | Pass |
|---|------|------|
| 4.1 | New species increases score (`species × 1000 + journal pages`) | ☐ |
| 4.2 | Re-catching same species does **not** increase score | ☐ |
| 4.3 | Completing a journal page increases score by 1 (even without new species) | ☐ |
| 4.4 | Score on load matches saved progress | ☐ |
| 4.5 | 45/45 dex triggers endgame once; score = 45032 (45×1000 + 32 journal pages) | ☐ |

## 5. Core gameplay (5-min smoke)

| # | Test | Pass |
|---|------|------|
| 5.1 | Aim (drag / arrows), Cast, Reel on touch | ☐ |
| 5.2 | First catch → celebration + gold | ☐ |
| 5.3 | New species → banner + aquarium + dex updates | ☐ |
| 5.4 | Shop buy → gold deducts, upgrade applies | ☐ |
| 5.5 | Predator telegraph → steal or dodge | ☐ |
| 5.6 | Bottle hook → journal page + gold | ☐ |
| 5.7 | Golden hour warning pill → golden hour active | ☐ |
| 5.8 | Room tab → feed fish, tap fish for note, decor reacts | ☐ |
| 5.9 | Dex overlay → filter by water, ? hints, caught notes | ☐ |

## 6. Mobile / layout

| # | Test | Pass |
|---|------|------|
| 6.1 | iPhone SE width: HUD not clipped, Cast reachable | ☐ |
| 6.2 | iPhone Pro Max / large Android: canvas fills stage | ☐ |
| 6.3 | Safe area: bottom bar clears home indicator | ☐ |
| 6.4 | No page scroll / bounce (overflow hidden) | ☐ |
| 6.5 | Portrait only — landscape acceptable or letterboxed | ☐ |

## 7. Release hygiene

| # | Test | Pass |
|---|------|------|
| 7.1 | `node tools/playables-qa.js` — all static checks green | ☐ |
| 7.2 | No `$500M` auto-gold on GitHub Pages or Playables (`isLocalDev` = localhost only) | ☐ |
| 7.3 | No `__dc.rich()` in production console path | ☐ |
| 7.4 | Listing assets: icon, 10–15s video, description | ☐ |
| 7.5 | GitHub Pages / host URL live (not placeholder) | ☐ |

---

## Sign-off

| Role | Name | Date |
|------|------|------|
| Dev | | |
| QA | | |
| Submit | | |

**Notes:**
