```markdown
# FIKD Foundation Website

[![Deploy](https://github.com/fikd-foundation/fikd-foundation/actions/workflows/deploy.yml/badge.svg)](https://github.com/fikd-foundation/fikd-foundation/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> Empowering hearts and minds through authentic Islamic education.

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About the Project

FIKD Foundation is a dedicated Islamic educational institution offering structured programmes in Qurʾānic studies, Qāʿidah, and a comprehensive Islamic curriculum. This website serves as the digital home for the foundation, providing information about programmes, curriculum, teachers, admissions, and resources.

### Mission

To provide authentic, accessible, and transformative Islamic education that nurtures faith, knowledge, and character — empowering individuals to live Islam with confidence and contribute positively to their communities.

### Vision

To be a global beacon of Islamic learning, where every student finds a pathway to connect with the Qurʾān and Sunnah, and where traditional scholarship meets contemporary relevance.

---

## Features

- ✅ **Responsive Design** — Fully responsive across all devices (desktop, tablet, mobile)
- ✅ **Dark Mode** — Toggle between light and dark themes with system preference support
- ✅ **RTL Support** — Complete right-to-left support for Arabic content
- ✅ **Accessibility** — WCAG-compliant with skip links, ARIA labels, and keyboard navigation
- ✅ **Performance Optimized** — Lazy loading images, minified assets, and efficient CSS/JS
- ✅ **SEO Friendly** — Semantic HTML, meta tags, sitemap, and robots.txt
- ✅ **PWA Ready** — Progressive Web App manifest for installable experience
- ✅ **Form Validation** — Client-side validation with real-time feedback
- ✅ **Interactive Components** — Accordions, tabs, sliders, galleries, and more

---

## Project Structure

```

fikd-foundation/
│
├── index.html                         # Home
├── about/                             # About page
├── philosophy/                        # Philosophy page
├── programmes/                        # Programme pages
├── curriculum/                        # Curriculum subject pages
├── teachers/                          # Teacher profiles
├── admissions/                        # Admissions pages
├── resources/                         # Resource pages
├── news/                              # News page
├── gallery/                           # Gallery page
├── contact/                           # Contact page
├── faq/                               # FAQ page
├── privacy/                           # Privacy policy
├── terms/                             # Terms & Conditions
├── 404.html                           # Custom 404 page
│
├── assets/                            # Static assets
│   ├── branding/                      # Logo and branding
│   ├── images/                        # Image assets
│   ├── illustrations/                 # Illustrations
│   ├── icons/                         # Icon assets
│   └── fonts/                         # Custom fonts
│
├── css/                               # Stylesheets (modular)
│   ├── variables.css                  # Design tokens
│   ├── reset.css                      # CSS reset
│   ├── typography.css                 # Typography styles
│   ├── layout.css                     # Layout styles
│   ├── components.css                 # UI components
│   ├── pages.css                      # Page-specific styles
│   ├── rtl.css                        # RTL support
│   ├── utilities.css                  # Utility classes
│   ├── animations.css                 # Animations
│   ├── responsive.css                 # Responsive breakpoints
│   ├── print.css                      # Print styles
│   └── main.css                       # Main entry point
│
├── js/                                # JavaScript (modular)
│   ├── main.js                        # Entry point
│   ├── navigation.js                  # Navigation
│   ├── theme.js                       # Theme toggle
│   ├── language.js                    # Language toggle
│   ├── accessibility.js               # Accessibility
│   ├── animations.js                  # Scroll animations
│   ├── counters.js                    # Animated counters
│   ├── accordion.js                   # Accordion component
│   ├── tabs.js                        # Tabs component
│   ├── timeline.js                    # Timeline component
│   ├── slider.js                      # Slider/carousel
│   ├── gallery.js                     # Lightbox gallery
│   ├── forms.js                       # Form validation
│   ├── search.js                      # Live search
│   └── utils.js                       # Utilities
│
├── data/                              # JSON data files
│   ├── programmes.json                # Programme data
│   ├── curriculum.json                # Curriculum data
│   ├── teachers.json                  # Teacher data
│   ├── testimonials.json              # Testimonials
│   ├── faq.json                       # FAQ data
│   ├── articles.json                  # Articles
│   └── announcements.json             # Announcements
│
├── seo/                               # SEO and configuration
│   ├── sitemap.xml                    # Sitemap
│   ├── robots.txt                     # Robots.txt
│   ├── manifest.webmanifest           # PWA manifest
│   ├── browserconfig.xml              # Windows tiles
│   └── llms.txt                       # LLM-friendly docs
│
├── .github/                           # GitHub Actions
│   └── workflows/
│       └── deploy.yml                 # Deployment workflow
│
├── .gitignore                         # Git ignore rules
├── LICENSE                            # MIT License
├── CHANGELOG.md                       # Changelog
└── README.md                          # This file

```

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code recommended)
- Git (for version control)
- Node.js (optional, for development tools)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/fikd-foundation/fikd-foundation.git
   cd fikd-foundation
```

2. Open the project:
   Open the project folder in your preferred code editor or simply open index.html in your browser.
3. Install dependencies (optional):
   ```bash
   npm install
   ```
4. Start a local server (recommended):
   Using VS Code Live Server extension:
   · Install the Live Server extension
   · Right-click index.html and select "Open with Live Server"
   Using Python:
   ```bash
   python3 -m http.server 8000
   ```
   Using Node.js:
   ```bash
   npx serve .
   ```
5. View the site:
   Open http://localhost:8000 in your browser.

---

Development

CSS Architecture

The CSS is organized into modular files for maintainability:

· variables.css — Design tokens (colors, typography, spacing, shadows)
· reset.css — Modern CSS reset
· typography.css — Font styles and text elements
· layout.css — Grid, flex, and container styles
· components.css — Reusable UI components (buttons, cards, etc.)
· pages.css — Page-specific styles
· rtl.css — Right-to-left support for Arabic content
· utilities.css — Helper classes
· animations.css — Keyframes and animation classes
· responsive.css — Breakpoints and responsive styles
· print.css — Print-friendly styles
· main.css — Main entry point importing all CSS

JavaScript Architecture

The JavaScript is organized into modular files:

· main.js — Entry point initializing all modules
· navigation.js — Mobile nav, dropdowns, header scroll effects
· theme.js — Dark/light mode with localStorage persistence
· language.js — Language switching (EN/AR) with RTL support
· accessibility.js — Skip links, keyboard navigation, ARIA
· animations.js — Scroll-triggered animations
· counters.js — Animated number counters
· accordion.js — Accordion component
· tabs.js — Tabs component
· timeline.js — Interactive timeline
· slider.js — Image carousel with autoplay
· gallery.js — Lightbox gallery
· forms.js — Form validation and handling
· search.js — Live search functionality
· utils.js — Utility functions

Data Management

All dynamic content is stored in JSON files in the /data directory:

· programmes.json — Programme details
· curriculum.json — Curriculum subjects
· teachers.json — Teacher profiles
· testimonials.json — Student testimonials
· faq.json — Frequently asked questions
· articles.json — Blog and resource articles
· announcements.json — News and updates

Adding New Content

1. To add a new programme:
   · Add the programme data to data/programmes.json
   · Create a new HTML page in the /programmes directory
   · Link to the new page from programmes/index.html
2. To add a new article:
   · Add the article data to data/articles.json
   · The articles page will automatically display new entries
3. To add a new teacher:
   · Add the teacher data to data/teachers.json
   · Create a new profile page in the /teachers directory

---

Deployment

GitHub Pages

The website is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow is triggered on:

· Push to the main branch
· Manual workflow dispatch
· Weekly scheduled deployment (every Sunday)

Deployment URL: https://fikd-foundation.github.io/fikd-foundation/

Manual Deployment

1. Build the site: (No build step required for static site)
2. Deploy to GitHub Pages:
   ```bash
   git add .
   git commit -m "Deploy site"
   git push origin main
   ```
3. Deploy to other platforms:
   Netlify:
   ```bash
   npx netlify-cli deploy --prod --dir=.
   ```
   Vercel:
   ```bash
   npx vercel --prod
   ```
   Cloudflare Pages:
   Use the Cloudflare Dashboard or Wrangler CLI.

Environment Variables

The following environment variables can be set for deployment:

Variable Description
CLOUDFLARE_API_TOKEN Cloudflare API token
CLOUDFLARE_ACCOUNT_ID Cloudflare account ID
NETLIFY_AUTH_TOKEN Netlify authentication token
NETLIFY_SITE_ID Netlify site ID
SLACK_WEBHOOK_URL Slack webhook for notifications
EMAIL_RECIPIENT Email address for deployment notifications

---

Contributing

We welcome contributions! Please see our Contributing Guidelines for more details.

How to Contribute

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Make your changes
4. Commit your changes (git commit -m 'Add some amazing feature')
5. Push to the branch (git push origin feature/amazing-feature)
6. Open a Pull Request

Code Style

· HTML: Use semantic HTML5 elements, follow accessibility guidelines
· CSS: Use the existing design tokens, follow BEM naming convention
· JavaScript: Use ES6+ syntax, follow the existing module pattern

---

License

Distributed under the MIT License. See LICENSE for more information.

---

Contact

FIKD Foundation

· 📧 Email: info@fikd.org
· 📞 Phone: +1 (234) 567-890
· 📍 Address: 123 Knowledge Street, London, UK
· 🌐 Website: https://fikd-foundation.org

Social Media:

· Facebook: @fikdfoundation
· Instagram: @fikdfoundation
· YouTube: @fikdfoundation
· Twitter: @fikdfoundation

---

Acknowledgments

· All teachers and scholars who contribute to the foundation
· The open-source community for the tools and libraries used
· Our students and their families for their trust and support

---

Made with ❤️ by the FIKD Foundation Team

```
### README Overview

This README.md file provides a comprehensive guide to the FIKD Foundation website project.

- **Project Overview:** Includes the mission, vision, and key features of the website, along with a status badge and license badge.

- **Project Structure:** A detailed directory tree showing all files and folders, making it easy to understand the project's organization.

- **Getting Started:** Step-by-step instructions for cloning the repository, installing dependencies, and running a local development server.

- **Development:** Explains the CSS architecture (modular files), JavaScript architecture (modular components), and data management using JSON files. Includes guidance on adding new content.

- **Deployment:** Covers automated deployment via GitHub Pages, manual deployment, and environment variables for various hosting platforms (Netlify, Vercel, Cloudflare).

- **Contributing:** Guidelines for contributing to the project, including how to fork, create branches, and submit pull requests, along with code style recommendations.

- **License & Contact:** Includes license information and contact details for the FIKD Foundation team, plus social media links.