# PHD125 · Pharmaceutical Organic Chemistry — Interactive Answer Scheme PWA

A Progressive Web App (PWA) for PHD125 Diploma in Pharmacy students in Malaysia. Features interactive Q&A cards, chemical structure SVG diagrams, progress tracking, offline support, and an extensible data architecture.

[![Live Demo](https://img.shields.io/badge/Live-Demo-7B1C1C?style=for-the-badge)](https://YOUR-USERNAME.github.io/phd125-app)
[![PWA](https://img.shields.io/badge/PWA-Ready-4CAF50?style=for-the-badge)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

---

## ✨ Features

- 📱 **PWA** — Installable on iOS/Android/Desktop, works offline
- 🧪 **SVG Chemical Diagrams** — Structural formulas drawn inline, no external images
- ✅ **Progress Tracking** — Mark questions as done, saved in localStorage
- 🔍 **Search** — Full-text search across all questions and answers
- 🏷️ **Filters** — Filter by functional group, reaction type, exam year
- 🌙 **Dark Mode** — Toggleable dark/light theme
- 🖨️ **Print-Ready** — Clean print stylesheet
- 🇲🇾 **Malaysian Context** — Pharma notes for drugs used in Malaysia

---

## 🚀 Deployment to GitHub Pages

### Option 1: Automatic (Recommended)
1. Fork or upload this repository to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. Your site will be live at `https://YOUR-USERNAME.github.io/phd125-app`

### Option 2: Manual Upload
1. Download the ZIP file
2. Extract all files
3. Create a new GitHub repo and upload all files
4. Enable GitHub Pages as above

---

## 📂 File Structure

```
phd125-app/
├── index.html          ← Main app shell (UI + all logic)
├── manifest.json       ← PWA manifest
├── sw.js               ← Service worker (offline cache)
├── README.md           ← This file
├── icons/
│   ├── icon-192.png    ← App icon (192×192)
│   └── icon-512.png    ← App icon (512×512)
└── data/
    ├── tutorial-2.js   ← Tutorial 2 content (Carbonyl, Acids, etc.)
    ├── tutorial-3.js   ← (Add new tutorials here)
    └── tutorial-4.js   ← (Add new tutorials here)
```

---

## ➕ Adding a New Tutorial

### Step 1: Create a data file
Copy `data/tutorial-2.js` as a template and create `data/tutorial-3.js`:

```javascript
'use strict';
window.TUTORIALS = window.TUTORIALS || {};

window.TUTORIALS['phd125-t3'] = {
  id: 'phd125-t3',
  code: 'PHD125',
  subject: 'Pharmaceutical Organic Chemistry',
  tutorialNo: 3,
  topicShort: 'Stereochemistry & Spectroscopy',
  sections: [
    {
      id: 'stereo',
      title: 'Stereochemistry',
      shortTitle: 'Stereochemistry',
      icon: '🔄',
      questions: [
        {
          id: 'st-q1',
          num: 'Q1',
          type: 'Concept',
          navLabel: '[Q1] R/S Configuration',
          question: 'Explain R and S configuration using CIP rules.',
          searchText: 'R S configuration CIP rules chiral centre enantiomer',
          tags: ['identification'],
          answerHTML: `
            ${R.ans('<strong>CIP Rules:</strong> Assign priority 1–4 based on atomic number...')}
            ${R.note('Pharmaceutical relevance: Many drugs are chiral — e.g., ibuprofen, thalidomide.')}
          `,
        },
      ],
    },
  ],
};
```

### Step 2: Register in index.html
Add a `<script>` tag just before the closing `</body>`:
```html
<script src="data/tutorial-3.js"></script>
```

### Step 3: Update service worker
In `sw.js`, add the new file to `DATA_FILES`:
```javascript
const DATA_FILES = [
  '/data/tutorial-2.js',
  '/data/tutorial-3.js',  // ← add this
];
```

### Step 4: Bump cache version
In `sw.js`, update `CACHE_VERSION`:
```javascript
const CACHE_VERSION = 'phd125-v1.1.0';  // increment version
```

---

## 🏷️ Question Data Schema

Each question object supports these fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique ID (e.g., `'cc-a1'`) |
| `num` | string | ✅ | Display number/label |
| `type` | string | ✅ | Question type (Nomenclature, Reactions, etc.) |
| `navLabel` | string | ✅ | Short label for sidebar navigation |
| `question` | string | ✅ | Question text (plain text) |
| `questionHTML` | string | ❌ | Question text (rich HTML, overrides `question`) |
| `searchText` | string | ❌ | Extra keywords for search |
| `tags` | string[] | ❌ | Tags: `aldehyde`, `ketone`, `acid`, `ester`, `amide`, `amine`, `reaction`, `mechanism`, `exam` |
| `examYear` | string | ❌ | Year if it's a past exam Q (e.g., `'2014'`) |
| `answer` | string | ❌ | Short plain text answer |
| `answerHTML` | string | ❌ | Full rich HTML answer (overrides `answer`) |

---

## 🎨 Answer HTML Helpers (`R.*`)

Use the `R` helper object in `answerHTML` strings:

```javascript
R.ans('Bold answer text')           // Green answer box
R.note('Important note text')       // Amber note box
R.pharma('Pharma relevance text')   // Orange pharma note
R.eq(`Step 1: A → B\nStep 2: B → C`)  // Blue monospace equation box
R.table(headers[], rows[][])        // Clean data table
R.mech(steps[])                     // Numbered mechanism steps
R.grid2(items[])                    // 2-column info grid
R.grid3(items[])                    // 3-column info grid
R.lbl('Label', 'Value')             // Label + value pair for grids
R.diag([{svg, name, formula, badge, bc}]) // Chemical structure card row
```

---

## 🖼️ Generating App Icons

You need `icons/icon-192.png` and `icons/icon-512.png` for the PWA to install properly.

**Quick option:** Use [RealFaviconGenerator](https://realfavicongenerator.net) or any image editor.

Suggested design: Dark maroon (`#7B1C1C`) background with `PHD` in white text.

---

## 📝 Content Guidelines

When writing answer HTML:
- Use `R.note()` for common mistakes and explanations
- Use `R.pharma()` for Malaysian pharmaceutical context
- Use `R.eq()` for reaction equations (monospace format)
- Include SVG diagrams for key compounds (copy the pattern from tutorial-2.js)
- Add `searchText` with common keywords students might search for
- Use `examYear` to mark past exam questions

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b add-tutorial-3`
3. Add your data file in `data/`
4. Update `index.html` and `sw.js`
5. Submit a Pull Request

---

## 📄 License

MIT License — free to use, modify, and distribute for educational purposes.

---

*Built for PHD125 Diploma in Pharmacy students · Malaysian Context (KPT Framework)*
