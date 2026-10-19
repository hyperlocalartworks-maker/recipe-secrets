# Recipe Secrets Restaurant — Website

A 5-page, mobile-friendly restaurant website built with plain HTML, CSS, and
JavaScript (no frameworks, no build step). Safe to upload as-is to any static
host.

## Pages

- `index.html` — Home
- `about.html` — About
- `specials.html` — Specials (data-driven from `js/specials.js`)
- `reservation.html` — Reservation request form
- `contact.html` — Contact info, map, and contact form

## Previewing locally

You can simply double-click `index.html` to open it in a browser — all links
are relative, so the site works straight from the file system.

For a closer-to-production preview (recommended, since some browsers restrict
`fetch`/forms on `file://` URLs), serve the folder with any static server:

```bash
npx serve .
```

or, with Python installed:

```bash
python -m http.server 8080
```

Then open the printed local URL (e.g. `http://localhost:8080`).

## Where to edit things

| What to change | File | Notes |
|---|---|---|
| Opening hours | `index.html` and `contact.html` | Search for the `<!-- TODO: confirm final hours -->` / `<!-- TODO: confirm address, phone, email, and hours -->` comments. Update both files — hours are duplicated for SEO/accessibility, not pulled from one source. |
| Address, phone, email | `index.html`, `about.html`, `specials.html`, `reservation.html`, `contact.html` footers, plus the "Visit Us" section in `contact.html` | Each page footer repeats contact details. Use find-and-replace across all 5 files for a quick update. |
| Specials / menu items | `js/specials.js` | Edit the `SPECIALS` array — each item has `name`, `description`, `price`, `dietary` (`Vegetarian`, `Vegan`, `Spicy`, or `Gluten-Free`), and `image`. The specials page renders this automatically. |
| Featured dishes on the home page | `index.html` | The 3 featured dishes are hardcoded in the "Featured Dishes" section; update the text/image to match whatever you want to highlight. |
| Google Map embed | `contact.html` | Replace the `iframe` `src` with a real embed URL. In Google Maps, search your address → **Share** → **Embed a map** → copy the `src` from the provided `<iframe>` code. |
| Colors / fonts | `css/styles.css` | All colors are CSS variables at the top of the file under `:root`. Fonts are loaded via Google Fonts `<link>` tags in each page `<head>`. |

## Setting up Formspree (for the Reservation and Contact forms)

Both forms currently point to a placeholder Formspree endpoint and are marked
with `<!-- TODO: replace YOUR_FORM_ID -->` comments in `reservation.html` and
`contact.html`.

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form and copy the form ID (or the full endpoint URL) it gives
   you, e.g. `https://formspree.io/f/abcd1234`.
3. In `reservation.html` and `contact.html`, find the line:
   ```html
   <form class="form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" data-ajax-form novalidate>
   ```
   and replace `YOUR_FORM_ID` with your real form ID (you can use the same
   form for both pages, or create two separate Formspree forms if you want
   reservations and messages to land in separate inboxes).
4. Formspree will ask you to confirm your email address the first time a test
   submission comes in — check your inbox after your first test.
5. Both forms already include a hidden honeypot field (`_gotcha`) to reduce
   spam, and both use JavaScript (`js/main.js`) to show a friendly inline
   success or error message instead of leaving the page.

## Deploying

### GitHub Pages

1. Create a new GitHub repository and push this folder's contents to it
   (the repository root should contain `index.html` directly, not a nested
   folder).
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`,
   choose the `main` branch and `/ (root)` folder, then **Save**.
4. Wait a minute or two, then visit the URL GitHub Pages shows you (usually
   `https://<your-username>.github.io/<repo-name>/`).

### Netlify

1. Log in at [netlify.com](https://netlify.com).
2. From the dashboard, choose **Add new site → Deploy manually**, then drag
   and drop this entire folder onto the upload area (no build command or
   publish directory needed — it's a static site).
   - Alternatively, choose **Add new site → Import an existing project** and
     connect your GitHub repository for automatic redeploys on every push.
3. Netlify will give you a live URL immediately (e.g.
   `https://your-site-name.netlify.app`); you can rename it under
   **Site settings → General → Site details → Change site name**.

## Notes

- All placeholder content that the restaurant owner should double-check or
  replace is marked with an HTML comment: `<!-- TODO: ... -->`. Search the
  project for `TODO` to find every one.
- Images currently use remote placeholder photos from `picsum.photos`. Swap
  the `src` attributes for real food/restaurant photography before launch,
  and keep any locally-hosted images in the `/images` folder.
