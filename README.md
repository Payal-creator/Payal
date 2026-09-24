# 🚀 Payal Kumari — Portfolio

<div align="center">

![Portfolio](https://img.shields.io/badge/Portfolio-Live-ff2a85?style=for-the-badge&logo=vercel&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**A cinematic, space-themed personal portfolio — Full-Stack & MERN Developer.**

[💌 Contact](mailto:dizzimshap546@gmail.com) · [💻 GitHub](https://github.com/Payal-creator)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Cinematic Space HUD UI** | Dark deep-space theme with neon pink, purple & blue glows |
| 🌌 **Interactive Starfield** | 3D parallax star canvas background |
| ⌨️ **Typing Effect** | Dynamic role cycling in the hero section |
| 🛸 **Starfighter Mini-Game** | Playable space shooter with jagged asteroid enemies & lasers |
| 🔒 **PIN-Protected Content** | Phone & CV locked behind a `0000` secure PIN modal |
| 📱 **Fully Responsive** | Mobile, tablet & desktop optimized with touch controls |
| 🧭 **HUD Navigation** | Space-command navbar with mobile swipe drawer |
| 💼 **Projects Showcase** | Filterable cards with modal case studies |
| 🛠️ **Skills Matrix** | Frontend, Backend, Database & DevOps categories |
| 📬 **Contact Form** | Validated transmission form with toast notifications |

---

## 🗂️ Project Structure

```
portfolio/
│
├── 📄 index.html           ← Main entry point
├── 📦 package.json         ← name: "portfolio"
├── 🔒 .gitignore
│
├── 📁 client/
│   ├── css/styles.css      ← All styles (Tailwind + custom HUD CSS)
│   └── js/script.js        ← All interactivity, game engine, PIN system
│
└── 📁 public/              ← Static assets (CV, images)
    ├── cvpayal.jpeg
    └── payal_resume_sep.docx
```

---

## 🛠️ Tech Stack

- **HTML5** · **Tailwind CSS** · **Vanilla CSS** (animations, glassmorphism)
- **JavaScript ES6+** — game engine, PIN system, typing effects
- **Vite** — dev server & bundler
- **Web Audio API** — sci-fi sound effects synthesized in-browser
- **Canvas API** — starfield & Starfighter game

---

## 🔐 PIN Protection

Sensitive content (phone & CV) is protected by a **4-digit PIN modal**:

- All CV and phone buttons show 🔒 locked by default
- Click any → **SECURE ACCESS** HUD dialog opens
- Enter **`0000`** → content unlocks instantly
- Wrong PIN → red dots + shake + "ACCESS DENIED"
- Keyboard supported (digits, Backspace, Escape)

---

## 💻 Run Locally

```bash
git clone https://github.com/Payal-creator/portfolio.git
cd portfolio
npm install
npm run dev
```

Open **http://localhost:5173** 🌐

---

## 🚀 Deploy to Vercel

```bash
git add .
git commit -m "deploy"
git push origin main
```

1. Go to **[vercel.com](https://vercel.com)** → **Add New Project**
2. Import your GitHub repo
3. Build Command: `npm run build` · Output: `dist`
4. Click **Deploy** ✅

---

## 📬 Contact

**Payal Kumari** — Full-Stack & MERN Developer

- 📧 [dizzimshap546@gmail.com](mailto:dizzimshap546@gmail.com)
- 💻 [github.com/Payal-creator](https://github.com/Payal-creator)
- 📱 Phone: *(PIN protected — visit the live site)*

---

<div align="center">
  <sub>Built with 💜 by Payal Kumari · © 2024 All rights reserved</sub>
</div>


---

## ✨ Features

- **Creative & Bold Aesthetics**: Rich warm gradients (sunset coral `#FF5E62`, radiant amber `#FF9966`, deep violet accents), glassmorphic card overlays, and ambient glowing orbs.
- **Hero Typing Effect**: Smooth dynamic typing headlines cycling through engineering roles.
- **Interactive Mouse Spotlight**: Reactive glowing spotlight following cursor movements.
- **Filterable Projects Grid**: Easily switch between Full-Stack, Frontend/UI, and Web Apps with animated transitions.
- **Case-Study Modals**: Click "Details" on any project to view architectural highlights, tech stack tags, and demo links.
- **Technical Arsenal**: Categorized skills matrix (Frontend, Backend, Databases, Tools & DevOps).
- **Career & Education Timeline**: Visual milestone path highlighting experience and qualifications.
- **Validated Contact Form**: Instant input validation, loading micro-animations, and celebratory toast notifications.
- **Fully Responsive**: Flawless experience across mobile devices, tablets, laptops, and ultra-wide screens.

---

## 💻 How to View & Run Locally

### Option 1: Open Directly in Your Browser
Simply double-click [`index.html`](file:///c:/Users/Admin/OneDrive/Desktop/PORTFOLIEpayal/Payal/index.html) or right-click it and choose **Open with Google Chrome** (or your favorite browser).

### Option 2: Run with a Local Web Server
If you have Python installed:
```powershell
python -m http.server 3000
```
Then open `http://localhost:3000` in your browser.

Or with Node.js:
```powershell
npx serve .
```

---

## 🎨 How to Personalize Your Website

All content is cleanly organized in simple files:
1. **Bio, Links & Socials**: Open [`index.html`](file:///c:/Users/Admin/OneDrive/Desktop/PORTFOLIEpayal/Payal/index.html) and update:
   - Your email in `mailto:payal@example.com`
   - Your LinkedIn and GitHub links in the navigation, hero, contact, and footer sections.
2. **Project Data**: Open [`script.js`](file:///c:/Users/Admin/OneDrive/Desktop/PORTFOLIEpayal/Payal/script.js) and update the `projectsDatabase` object with your own project descriptions, GitHub URLs, and screenshots.
3. **Color Themes & Accents**: Open [`styles.css`](file:///c:/Users/Admin/OneDrive/Desktop/PORTFOLIEpayal/Payal/styles.css) and adjust CSS custom variables in `:root` if you want to experiment with different gradient tones.

---

## 🌐 Free Deployment to GitHub Pages

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Build personal portfolio website"
   git push origin main
   ```
2. Go to your repository on GitHub -> **Settings** -> **Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your website will be live in 1-2 minutes at: `https://<username>.github.io/<repo-name>/`!
