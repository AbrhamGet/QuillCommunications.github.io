# Quill Communications — Website (v2)

## Fastest install: the zip

1. Download `quill-site.zip` and unzip it. You'll get a folder containing
   19 HTML pages, 3 script/style files, `favicon.ico`, and two folders
   (`assets/` and `media/`).
2. Go to your repo on github.com → **Add file → Upload files**.
3. Open the unzipped folder, select **everything inside it** (Ctrl+A / Cmd+A)
   — including the `assets` and `media` folders — and drag it all into the
   upload box in one go. GitHub keeps the folder structure automatically.
4. Scroll down, click **Commit changes**.
5. Wait 1–2 minutes, then hard-refresh the site (Ctrl+Shift+R, or an
   incognito tab on mobile).

Do NOT drag the outer folder itself — drag the contents. Otherwise everything
lands one level too deep and the site breaks.

## What the structure must look like

```
your-repo/
├── (19 .html files)
├── styles.css
├── script.js
├── form.js
├── favicon.ico
├── assets/     ← 105 images
└── media/      ← 3 behind-the-scenes videos
```

If `assets/` is missing or renamed, every image breaks.

## What's in v2

**Graphics Design & Branding** added as an 11th service everywhere — homepage,
services page, and the project form with its own follow-up questions.

**Services page, two levels:** tap a service to expand a panel with a short
description and a "See full details" button, which opens that service's own
page. One panel open at a time.

**11 service detail pages** with process, software logos, and real content:
- Video Production — gear list, three crew roles with icons, editing software, showreels
- TVC — six-stage process on a scroll-driven timeline, FX6 equipment list, the Vimeo TVC
- Graphics Design — six design samples in a click-to-enlarge gallery, link to the brand book
- Content Creation — the Content Playbook principles and the measurement loop
- Social Media Management — ten-step strategy process, hosts link, the three packages
- Event Documentation — seven Strictly Soul photos, format options
- Influencer Marketing — the creator network with live links
- Website Development — all seven sites you've built, clickable
- Plus Ads, Community Management, and SEO

**hosts.html** — all 12 hosts with photos, descriptions, and previous-work
links. Reachable from the SMM page, About, the footer, and inside the form
when someone picks Social Media Management. Deliberately not in the top nav.

**brandbook.html** — the full 31-page Evolve brand book, click any page to
enlarge, arrow keys to move through.

**About** — "How we work" rebuilt: centred, four icon cards with ghost
numbers, each lighting up in sequence as you scroll.

**Clients** — every block carries that brand's own colour as a gradient
washing left to right into white.

**Mobile** — WhatsApp and "Start a project" no longer overlap, a hamburger
menu replaces the hidden nav, and email links open the phone's mail app with
the address and subject prefilled instead of the browser.

**Favicon** — the orange Quill "Q" on navy, in the browser tab and as the
icon if anyone saves the site to a phone home screen.

## Formspree
Already wired (`window.FORM_ENDPOINT` at the top of script.js). The first
submission triggers a one-time confirmation email to your Gmail — confirm it
once and everything after flows silently.
