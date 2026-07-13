# Deploy Deep Catch to GitHub Pages

The game is a single `index.html` at the repo root — no build step.

## GitHub Pages (enabled)

**Live:** https://kosweet.github.io/deep-catch/

Repo is **public**. Pages deploys from `main` / root automatically on push.

To change settings: **https://github.com/KoSweet/deep-catch/settings/pages**

## Optional: GitHub Actions workflow

If you prefer CI deploy, add `.github/workflows/pages.yml` from the template below (requires `workflow` OAuth scope to push via token):

```yaml
name: Deploy GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: false
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then enable **Pages → Source: GitHub Actions** in repo settings.

## Verify

```bash
curl -sI https://kosweet.github.io/deep-catch/ | head -5
node tools/smoke-test.js
```
