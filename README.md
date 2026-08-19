# Quill Communications — Full Agency Website

## What's in the folder
| File | What it is |
|---|---|
| index.html | Home — hero with TVC, marquee, services teaser, results, featured work, testimonials, team marquee, contact box |
| services.html | All 10 services in depth + the 3 SMM packages |
| portfolio.html | Flagship Popular Electronics case + full case library + behind-the-scenes videos |
| clients.html | Active client hub — strategy per account, page links, snapshots |
| about.html | Philosophy, process, the team of 8, worked-with wall |
| work-with-us.html | The adaptive project form |
| styles.css / script.js / form.js | Shared styling and interactions |
| media/ | The 3 behind-the-scenes videos (must be uploaded too!) |

## Upload (GitHub Pages)
1. Create a new **public** repo (suggested name: `quill`).
2. Upload **everything in this folder, including the `media` folder** —
   on github.com you can drag the whole folder contents into "Add file → Upload files."
3. Settings → Pages → Deploy from branch → main → / (root) → Save.
4. Live at `https://YOURUSERNAME.github.io/quill` in a minute or two.
   (Or make a dedicated account, name the repo `quillcommunications.github.io`,
   and it lives at that root address instead.)

## ONE thing to finish: the form endpoint
Right now the contact box and project form fall back to opening a pre-filled
Gmail window. To make them send silently to your inbox:
1. In your Formspree dashboard, create a form (any name). Copy its endpoint —
   it looks like `https://formspree.io/f/abcdwxyz`.
2. Open **script.js**, line near the top:
   `window.FORM_ENDPOINT = "";`
   Paste the URL between the quotes. Done — both forms now deliver to
   Abrhamg.fetene@gmail.com through Formspree.

## Adding the missing client page links
In **clients.html**, search for `ADD LINKS` — each active client without
social links has a marked comment where buttons go. Copy the pattern used
in the Popular Electronics block.

## Publishing client report numbers later
Each client block on clients.html has a "Performance snapshot" area that
currently says "Full report coming soon." When you have numbers, copy the
snapshot markup from the Popular Electronics block and swap the figures.
