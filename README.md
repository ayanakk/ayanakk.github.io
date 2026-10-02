# Ayana K K — Portfolio

Static portfolio site (plain HTML, CSS and JavaScript — no build step).

## Structure

- `index.html` — page markup
- `css/style.css` — styles
- `js/main.js` — navigation, scroll reveal, skills and project cards (edit the `skills` and `projects` arrays to change content)
- `assets/` — photo, favicon, CV

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. The site goes live at `https://<username>.github.io/<repo>/` (or `https://<username>.github.io/` if the repo is named `<username>.github.io`).

## Adding links

- GitHub profile: uncomment the GitHub blocks in the hero and contact sections of `index.html`.
- Project links: set `github` / `demo` on a project in `js/main.js`; the buttons appear automatically.
