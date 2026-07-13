# Deep Catch — QA results log

**Date:** 2026-07-13  
**Build:** `main` pre-release  
**Live URL:** https://kosweet.github.io/deep-catch/

---

## Automated (local)

| Runner | Result |
|--------|--------|
| `node tools/playables-qa.js` | ✅ **39/39** passed |
| `node tools/smoke-test.js` | ✅ **12/12** passed |
| `node tools/econ-dc.js` | ✅ 31.7h to 100% |

---

## Browser smoke (localhost:8765)

| Test | Result | Notes |
|------|--------|-------|
| Page loads, title "Deep Catch" | ✅ | |
| Cast button responsive | ✅ | Drop + reel cycle |
| Species dex opens | ✅ | Grid + filters |
| Dex filter labels | ✅ | Fixed "Trench" / "Hadal" (was duplicate "The") |
| Shop button present | ✅ | Not fully exercised |
| Room tab present | ✅ | Not fully exercised |
| Icon + preview assets | ✅ | `assets/icon.png`, `assets/preview.png` |

Screenshot captured for store preview: `assets/preview.png`

---

## Manual embed matrix (YouTube Playables)

Complete in the **YouTube embed preview** after deploy — see [PLAYABLES-QA.md](PLAYABLES-QA.md).

| Section | Status |
|---------|--------|
| 1. Boot & lifecycle | ☐ Pending embed |
| 2. Pause / resume | ☐ Pending embed |
| 3. Audio | ☐ Pending embed |
| 4. Score | ☐ Pending embed |
| 5. Core gameplay | ☐ Pending embed |
| 6. Mobile / layout | ☐ Pending embed |
| 7. Release hygiene | ✅ 7.1 static QA · ✅ 7.2–7.3 dev gates · ☐ 7.4 video · ✅ 7.5 URL configured |

---

## Release hygiene checklist

| Item | Status |
|------|--------|
| GitHub Pages workflow | ✅ `.github/workflows/pages.yml` |
| HTTPS game URL | ✅ https://kosweet.github.io/deep-catch/ (200 OK) |
| Icon 512+ | ✅ `assets/icon.png` |
| Preview image | ✅ `assets/preview.png` |
| Gameplay video 10–15s | ☐ Record from live URL (see SUBMIT.md) |
| Listing copy | ✅ `docs/SUBMIT.md` |
| `__dc` dev console | ✅ Removed from Playables build |

---

## Sign-off

| Role | Name | Date |
|------|------|------|
| Dev / automated | Agent | 2026-07-13 |
| Embed QA | | |
| Submit | | |
