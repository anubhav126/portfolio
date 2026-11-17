# Anubhav Adhikari — Software Engineer Portfolio

An ultra-optimized developer portfolio engineered with **Next.js 15 App Router**, **React 19**, **Tailwind CSS**, and **Framer Motion**.

---

## 🎨 Design Language

- **Color Architecture**:
  - **Primary Palette**: Vivid warm orange accents (`Primary 500: #F97316`, `Primary 400: #FB923C`, `Primary 100: #FFEEE5`).
  - **Neutral Canvas**: Crisp warm slate (`Neutral 50: #FAFAFC` background throughout, `Neutral 900: #0F172A` headings, `Neutral 700: #334155` body copy, `Neutral 200: #E2E8F0` borders).
- **Typography**:
  - **Display Titles**: `Playfair Display` serif (`Display 1: 48/56` for Hero, `Display 2: 36/44` for section headers) for an elegant, timeless feel.
  - **Interface & Body**: `Inter` (`Headings 1-3`, `Body Large`, `Body`, `Small`) for crisp legibility.
- **Components & Patterns**:
  - **Buttons**: 44px height, 12px border-radius, `Inter Medium`: Primary (`#F97316` solid), Secondary (`#FFEEE5` tinted), and Tertiary (clean border `#E2E8F0`).
  - **Cards**: Pure white `#FFFFFF` elevated cards with subtle `#E2E8F0` borders and multi-tiered shadows.
  - **Badges & Tags**: Pill-style badges with high-contrast color matching.
  - **Inputs & Search**: 44px height, 12px radius, `#FB923C` focus ring, keyboard shortcut indicators (`⌘K`).

---

## 🚀 Key Features

1. **Global Command Palette (`⌘K` / `Ctrl+K`)**:
   - Instant keyboard-accessible modal dialog searching projects, technical blogs, and career journey.
2. **Interactive Project Showcase**:
   - Filterable by `All`, `Full-Stack`, `Backend & Systems`, and `AI & Full-Stack` with smooth sliding tab animations.
   - Interactive preview modal with high-res screenshots, architecture specifications, and direct GitHub / Live links.
3. **Career Journey & Avionics Highlights**:
   - Highlighting work on the **Airbus A350-1000F** cargo control software, Python automation frameworks (10x test acceleration), and graduation milestones.
4. **Technical Publications**:
   - Hashnode system design breakdowns (Google Drive System Design, JavaScript Prototypes, SMTP Mail Server from Scratch, React Virtual DOM Reconciliation).
5. **Creative Micro-Interactions**:
   - 3D interactive tilt physics card with dynamic mouse glare.
   - Bouncy floating tech badges.
   - Fluid sliding layoutId tab pill selector.
   - Unified color palette from top to bottom.

---

## ⚡ Performance Optimization

- **Bundle Size**: Ultra-lean First Load JS with 100% pre-rendered static content.
- **Optimized Rendering**: Zero heavy canvas loops or GPU fill-rate spikes, smooth CSS and spring-driven transforms.
- **Font Optimization**: Uses Next.js native `next/font/google` with `display: swap`.

---

## 🛠️ Development & Build

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run production build
npm run build

# Start production server
npm start
```
