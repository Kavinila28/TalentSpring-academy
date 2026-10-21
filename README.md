# TalentSpring Academy — static website starter

A responsive, no-build static website prototype for a student-focused virtual internship company.

## What's included
- Responsive homepage with program cards, about, process, FAQs and certificate lookup
- Demo application dialog
- Demo student dashboard with application list and task submission mockup
- Demo certificate lookup using one clearly marked sample record
- Basic metadata and EducationalOrganization JSON-LD placeholder
- No build step or paid dependencies required

## Important: what works and what is only a demo
**Works in the browser**
- Navigation and mobile menu
- Program filters and program details
- Demo application form validation
- Saves demo applications and task notes to browser `localStorage`
- Demo certificate lookup for `TSA-DEMO-001`

**Not production-ready / not connected**
- Applications are NOT sent to the founder. Browser local storage is device-specific and not secure.
- There is no real login, student identity, admin panel, shared database, email notification, file upload, mentor workflow or server-side authorization.
- Task submissions are NOT transmitted to a company or mentor.
- Certificate verification uses a hard-coded sample record, not a real certificate register.
- AI/ML and Web Development are marked as planned tracks; do not advertise them as open until ready.
- Replace all sample wording with accurate program dates, availability, contact details and policies before launch.

## Run locally
Open `index.html` in a browser. No dependencies or installation are required. Google Fonts load from the internet; system fonts are used as fallbacks.

## Free hosting with GitHub Pages
1. Create/sign in to a GitHub account.
2. Create a new **public** repository, e.g. `talentspring-academy`.
3. Upload `index.html`, `styles.css`, `app.js`, and `robots.txt` to the repository root.
4. In repository **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Wait for the published URL shown in Settings → Pages. It will usually be `https://YOUR-USERNAME.github.io/talentspring-academy/`.
6. Test all links on desktop and mobile. HTTPS is provided by GitHub Pages.

Do not add student personal data, API keys, passwords, or secret tokens to the public repository.

## Search engine setup
1. Publish the website first.
2. Add the exact published URL as a property in [Google Search Console](https://search.google.com/search-console/).
3. Verify ownership using a method available for the chosen hosting setup.
4. Inspect the homepage URL and request indexing.
5. Once the final site URL and page structure are stable, create a sitemap with the exact public URLs and submit it in Search Console. Do not submit the placeholder `sitemap.xml` before replacing its URLs.
6. Add real, distinct program pages with accurate dates, eligibility, workload, tasks, fees, assessment, and FAQs. Avoid creating thin pages solely to target keywords.
7. Keep contact, privacy, terms, refund/fee, and certificate policies accurate and accessible.

`robots.txt` is generic and does not guarantee indexing. Search indexing and ranking are not guaranteed and may take time.

## Connect a real application form for launch
Recommended simplest route: create a Google Form and link the website's application button to it. Update the `data-apply` buttons or replace the demo application modal with a link to the real form URL. Use a restricted Google Sheet for responses and limit access to people who need it.

If you later need a full portal, use a real backend/database with authentication, server-side access controls, consent and retention rules, file upload restrictions, email notifications, backups and a privacy notice. Do not treat localStorage as a production student database.

## Branding
- Navy: `#102A43`
- Emerald: `#2E7D32`
- Gold: `#F4C76B`
- Cream: `#FFF8E7`
- Mint: `#E8F5E9`
- Tagline: **Learn. Build. Grow.**
