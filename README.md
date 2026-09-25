# Tantôt: le français pro pour la Belgique

A personal French trainer for job interviews and project work in Belgium. Static site: no build step, no server.

## What's inside
- **10 scenarios**: 5 interviews (recruiter call, « présentez-vous », difficult project/STAR, language weakness, salary and questions) and 5 at work (kick-off, COPIL delay, weekly check-in, change request, coffee-machine small talk with Belgian French).
- Each scenario has an audio dialogue, key phrases, 2 writing tasks with model answers, and a live simulation.
- **6 drill sets** built from the September 2026 diagnostic: être/avoir, imparfait, à/en/au/chez, Portuguese traps, subjonctif, qui/que/dont/où.
- **56 vocab cards** (PM, interviews, belgicismes, email phrases) with spaced repetition.
- **Mes erreurs**: seeded from the diagnostic, grows with every correction.

## Deploy on GitHub Pages (10 minutes)
1. On github.com, create a new repository, e.g. `tantot`. Free Pages needs it to be **public**.
2. Click **Add file**, then **Upload files**, and drag in every file from this folder. Commit.
3. Go to **Settings**, then **Pages**. Under *Source* choose **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. After about a minute, the site is live at `https://<your-username>.github.io/tantot/`.
5. Optional: add a `CNAME` file containing `french.malickmanso.com` and point a CNAME DNS record to `<your-username>.github.io`, like the PRINCE2 site.

## iPhone
Open the site in Safari, tap **Share**, then **Add to Home Screen**. For audio, make sure a French voice is installed: Settings, Accessibility, Spoken Content, Voices, French.

## API key (for correction and simulations)
1. Create an account at console.anthropic.com, add credit, and **set a monthly spend limit** (e.g. €10).
2. Create an API key and paste it into **Réglages** in the app, on each device you use.
3. The key is stored only in that browser. **Never commit it to GitHub.** The repo is public.

Without a key, everything else works, and « Copier pour Claude » copies a ready-made correction prompt to paste into the Claude app.

## Updating content
All content is in `data.js`. After changing any file, bump `VERSION` in `sw.js` (e.g. `tantot-v2`) so installed copies update.

## Privacy note
The repo is public, so `data.js` only contains career facts that are already on your CV. Don't add recruiter names, client names or rates.
