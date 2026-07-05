# Resilio Foundation — Website

Static multi-page website for Resilio Foundation. No build step, no dependencies. Just HTML, CSS, and JavaScript.

## Structure

```
my-website/
├── index.html        Home page
├── about.html        About / vision / mission / values
├── contact.html      Contact page with message form
├── css/
│   └── style.css     All site styles
├── js/
│   └── script.js     Nav, scroll reveal, counters, modals
└── images/           Logo and photography
```

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Deploy to GitHub Pages

1. Create a new repository on GitHub.
2. From this `my-website` folder:

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, choose `main` and `/ (root)`, then Save.
4. Your site goes live at `https://<your-username>.github.io/<your-repo>/` within a minute or two.

All paths are relative, so the site works from a subfolder URL without changes.

## Make the forms email you

GitHub Pages is static hosting, so it can't send email on its own. The forms
use [Web3Forms](https://web3forms.com) (free) to forward submissions to your
inbox. One-time setup:

1. Go to https://web3forms.com and enter **kirtish1709@gmail.com**.
2. They email you a free **access key** (a long code).
3. Open `js/script.js`, find this line near the bottom:

   ```js
   const WEB3FORMS_ACCESS_KEY = "PASTE-YOUR-ACCESS-KEY-HERE";
   ```

   Replace `PASTE-YOUR-ACCESS-KEY-HERE` with your key, keeping the quotes.
4. Commit and push. Both the volunteer form and the contact form will now
   email kirtish1709@gmail.com. The first submission arrives with a one-click
   confirmation to activate delivery.

To change the destination address later, just repeat step 1 with a new email
and swap the key. Nothing else in the code needs to change.

