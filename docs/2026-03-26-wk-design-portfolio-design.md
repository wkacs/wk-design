# WK Design Portfolio — Design Spec

**Date:** 2026-03-26
**Project:** Personal portfolio website for WK Design
**Purpose:** Showcase reference websites to potential clients. First impression is everything — must look exceptional.

---

## Overview

A single-page portfolio website for the web design studio **WK Design**. The site showcases completed client websites, establishes a premium brand impression, and provides a direct contact method. The visual theme is **Autumn Forest at Golden Hour** — warm amber and orange light filtering through dark forest silhouettes, falling leaves, and atmospheric depth.

---

## Visual Theme

### Color Palette
| Role | Color | Hex |
|---|---|---|
| Background (deep) | Dark charcoal-brown | `#1a1008` |
| Background (mid) | Dark forest brown | `#2a1a0a` |
| Accent primary | Burnt orange | `#e8650a` |
| Accent secondary | Amber gold | `#f5a623` |
| Accent dark | Deep crimson | `#8b2500` |
| Text primary | Warm cream | `#f5eed6` |
| Text muted | Warm gray | `#a08060` |
| Card surface | Dark wood tone | `#1e1205` |
| Card border glow | Amber | `#c47a15` |

### Typography
- **Headings:** Playfair Display (Google Font) — elegant serif, premium feel
- **Body/UI:** Inter — clean, modern sans-serif
- **Hero brand name:** Very large (clamp 4rem–10rem), warm cream, letter-spacing wide

### Atmosphere
- Tree silhouettes as SVG background layer (dark, semi-transparent)
- Warm golden gradient radiating from bottom-center of hero (the "sunset horizon")
- Deep forest texture/darkness at the top of the page

---

## Page Structure (Single Page)

### 1. Hero Section
- Full viewport height
- Large "WK Design" heading centered, with subtitle: *"We craft websites that leave a mark."*
- Animated golden light radiating/pulsing from horizon (bottom-center)
- Tree silhouettes as parallax background layer
- Falling leaves and firefly particles overlaid
- Smooth scroll arrow/indicator at the bottom

### 2. Projects Section
- Section heading: "Our Work"
- 2 project cards displayed side by side (stacked on mobile)
- Each card contains:
  - Project name / title
  - Short placeholder description (1–2 lines)
  - Placeholder for screenshot image (to be added later — shows a warm gradient placeholder)
  - "Visit Site" button linking to live URL
- Cards use dark wood texture surface with amber border
- Hover: card lifts, amber glow blooms around border, subtle shadow
- Scroll reveal animation on entry

### 3. Contact Section
- Section heading: "Let's Work Together"
- Short tagline (e.g., *"Have a project in mind? Reach out."*)
- Email displayed prominently: `andorfervendel00@gmail.com`
- CTA button: "Send an Email" — links to `mailto:andorfervendel00@gmail.com`
- Button glows amber on hover

### 4. Footer
- `© 2026 WK Design`
- Minimal, dark, warm-toned

---

## Animations

All animations must be smooth and atmospheric — never distracting. They should reinforce the "alive forest at dusk" feeling.

| Animation | Description |
|---|---|
| **Falling leaves** | 15–20 SVG/emoji leaf shapes, varying sizes, drift diagonally across the viewport at random speeds and rotation. Loop infinitely. CSS keyframes. |
| **Firefly particles** | 8–12 tiny glowing dots (blurred radial gradient, amber/yellow) that float gently around the background. CSS animation. |
| **Golden horizon pulse** | The sunset glow at the hero bottom softly expands and contracts (opacity pulse) every 4–6 seconds. |
| **Hero text entrance** | "WK Design" fades in + rises from below on page load, with a subtle golden text shimmer sweep. |
| **Scroll reveal** | Sections (projects, contact) fade in and translate up when they enter the viewport. IntersectionObserver. |
| **Parallax trees** | Background tree silhouette layer moves at ~30% scroll speed relative to content. requestAnimationFrame or CSS transform. |
| **Card hover lift** | Project cards translateY(-8px) + amber box-shadow bloom on hover. CSS transition. |
| **CTA button glow** | Email button pulses with amber outer glow on hover, smooth transition. |

---

## Technical Spec

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS v3
- **Animations:** Framer Motion — scroll reveal, entrance animations, hover effects, parallax
- **Particles:** Custom canvas or CSS-based leaf/firefly system (no heavy libs)
- **Fonts:** Google Fonts via `next/font` — Playfair Display + Inter
- **Responsive:** Mobile-first, works on all screen sizes. Reduced particle count on mobile.
- **Performance:** Framer Motion uses GPU-composited transforms/opacity only. Static export possible.
- **Hosting:** Vercel (ideal), or any Node/static host

---

## Project Data (Initial)

```json
[
  {
    "title": "Project One",
    "description": "A modern website built for a client.",
    "url": "https://example.com",
    "image": null
  },
  {
    "title": "Project Two",
    "description": "A modern website built for a client.",
    "url": "https://example.com",
    "image": null
  }
]
```

> Note: URLs, titles, descriptions, and images will be updated by the user after delivery.

---

## Success Criteria

- First impression is premium and memorable
- Every animation runs smoothly at 60fps
- No layout issues on mobile
- Adding a new project card in the future requires only copy-pasting a card HTML block
- Page loads fast (no heavy dependencies)
