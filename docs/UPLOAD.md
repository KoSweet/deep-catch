# Upload Deep Catch to YouTube Playables

I can't sign into your Google account from here — follow this checklist on your machine.

---

## Before you start

You need **Playables Developer Portal access** (private preview). If you don't see the portal:

1. Fill out the [Playables interest form](https://developers.google.com/youtube/gaming/playables) (link on that page).
2. Wait for YouTube to onboard your channel.

Your channel needs **Manager** permission on an onboarded YouTube channel.

---

## Files ready for you

| File | Use |
|------|-----|
| `deep-catch-playables.zip` | **Game bundle** — upload in Developer Portal (~1 MB) |
| `assets/icon.png` | Store **icon** / thumbnail source |
| `assets/preview.png` | Optional **thumbnail** reference |
| Your 10–15s **MP4** | **Preview video** (record from live URL or phone) |

Rebuild ZIP anytime:

```bash
./tools/build-bundle.sh
```

**Live URL (for testing):** https://kosweet.github.io/deep-catch/

---

## Step-by-step upload

### 1. Open the Developer Portal

1. Sign in with your **YouTube channel manager** Google account.
2. Go to **[Playables Developer Portal](https://developers.google.com/youtube/gaming/playables/developer_portal)** — use the portal link from that doc (requires onboarded access).
3. Click **Add a new game**.

### 2. Fill metadata (copy/paste)

**Title:** Deep Catch

**Short description:**
```
Cast into a dusk-lit sea, fill grandpa's journal, and collect 45 species across seven waters. One-thumb cozy fishing — no account, no downloads.
```

**Long description:** see [`SUBMIT.md`](SUBMIT.md)

**Genre:** Simulation / Casual / Collection

**Orientation:** Portrait

**Publisher / Developer:** Your name or studio

### 3. Upload assets

- **Game bundle:** `deep-catch-playables.zip`
- **Icon:** `assets/icon.png`
- **Thumbnails:** per portal aspect ratios (use icon or `assets/preview.png` as base)
- **Preview video:** your 10–15s MP4

**Monetization:** configure interstitial/rewarded interest in portal (SDK ads hooks can come later).

### 4. Create release

Click **Create release** → wait for **Release Creation in Progress** to finish.

### 5. Verify and test

Open the **Verify and test** tab:

- Copy **YouTube Dev Link** → open on **phone** (iOS + Android)
- Run **Test Suite Link**
- Complete [`PLAYABLES-QA.md`](PLAYABLES-QA.md) in the embed (save, pause, mute, score)

Optional pre-check: [Playables Test Suite](https://developers.google.com/youtube/gaming/playables/test_suite) with your hosted URL.

### 6. Submit for certification

When tests pass → **Submit for Certification**.

Review can take days. You can't submit another release while one is in review.

---

## Copy-paste quick reference

```
Game URL (hosted):  https://kosweet.github.io/deep-catch/
Bundle:             deep-catch-playables.zip
Score type:         High score (integer, monotonic)
Score formula:      species × 1000 + journal pages (max 45032)
SDK:                ytgame IN_PLAYABLES_ENV — loadData/saveData/onPause/onResume/sendScore
```

---

## No portal access yet?

You still have a **shippable public game** at GitHub Pages. Options:

- Share the link anywhere (itch.io, social, portfolio)
- Apply via interest form for YouTube Playables
- Partners like Playgama can submit on your behalf (optional)

Support: [Playables support contact](https://developers.google.com/youtube/gaming/playables/support/contact)
