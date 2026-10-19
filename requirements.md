# Project: Website for "Recipe Secrets Restaurant"

## Goal
Build a simple, fast, mobile-friendly restaurant website that helps visitors learn about the restaurant, see current specials, contact us, and request a reservation.

## Tech constraints (important)
- Use **plain vanilla HTML, CSS, and JavaScript only**. No frameworks, no build step, no npm dependencies.
- It must work when the folder is uploaded as-is to a free static host (GitHub Pages, Netlify, or Cloudflare Pages).
- There is no server. Do not write backend code. Use relative links so the site works from any subfolder.

## Pages (exactly 5, no more)
1. `index.html` (Home): hero section with restaurant name, tagline, and "Reserve a Table" button; short intro; 3 featured dishes; opening hours; address snippet.
2. `about.html` (About): the restaurant's story, the "recipe secrets" concept, the chef/team, and values (fresh ingredients, family recipes).
3. `specials.html` (Specials): cards for daily/weekly specials with name, description, price, and a dietary tag (e.g. Vegetarian, Spicy). Keep the data in one JS array in `js/specials.js` so it is easy to edit.
4. `reservation.html` (Reservation): form with name, email, phone, date, time, number of guests, and special requests. Validate with HTML5 attributes plus light JS (no past dates).
5. `contact.html` (Contact): address, phone, email, opening hours, an embedded Google Map placeholder (iframe), and a contact form (name, email, message).

## Forms (static-hosting friendly)
- Submit both forms to **Formspree** via `action="https://formspree.io/f/YOUR_FORM_ID"` with `method="POST"`. Add a clear `<!-- TODO: replace YOUR_FORM_ID -->` comment.
- Show a friendly success message and a visible error state.
- Include a hidden honeypot field to reduce spam.

## Design
- Warm, inviting, upscale-casual feel. Palette: deep burgundy, warm cream, charcoal, and a gold accent. Define them as CSS variables in `:root`.
- Pair a serif heading font with a clean sans-serif body font (Google Fonts, with fallbacks).
- Mobile-first and responsive (works from 360px to desktop). Sticky header with a hamburger menu on mobile.
- Consistent header/nav and footer on every page. Highlight the active page in the nav.
- Use placeholder images from `https://picsum.photos` or simple CSS gradients. Put all images in `/images` with descriptive `alt` text.

## Quality requirements
- Semantic HTML (header, nav, main, section, footer) with one `<h1>` per page.
- Accessible: sufficient color contrast, visible focus states, labels for every form field, keyboard-navigable menu.
- SEO basics: unique `<title>` and meta description per page, Open Graph tags, favicon.
- Fast: no large libraries, lazy-load images below the fold.

## Content
Write realistic placeholder copy (not lorem ipsum): invent a believable address, phone, hours, and 6 sample dishes/specials. Mark every placeholder that the owner must replace with `<!-- TODO -->`.

## Project structure
```
/index.html
/about.html
/specials.html
/reservation.html
/contact.html
/css/styles.css
/js/main.js        (nav toggle, form handling)
/js/specials.js    (specials data)
/images/
/README.md
```

## Process
1. First, show me a short plan (file structure, color palette, and fonts) and wait for my approval.
2. After approval, build the full site.
3. Open each page and check that links work, the layout holds at mobile and desktop widths, and the forms validate.
4. Write a `README.md` with: how to preview locally (open `index.html` or run `npx serve`), where to edit hours, specials, and contact details, how to set up Formspree, and step-by-step deploy instructions for GitHub Pages and Netlify.