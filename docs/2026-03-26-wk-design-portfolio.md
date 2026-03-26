# WK Design Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a stunning single-page portfolio website for WK Design with an autumn forest golden hour theme, Framer Motion animations, falling leaves, fireflies, parallax tree silhouettes, and 2 client project cards.

**Architecture:** Next.js 14 App Router, single page (`app/page.tsx`) composing isolated section and background components. Background layer (HorizonGlow, TreeSilhouettes, FallingLeaves, Fireflies) is fixed/absolute behind content. Framer Motion handles scroll-reveal and entrance animations. CSS keyframes in `globals.css` handle continuous looping particles. Jest + @testing-library/react for component tests.

**Tech Stack:** Next.js 14, TypeScript 5, Tailwind CSS v3, Framer Motion 11, Google Fonts (Playfair Display + Inter), Jest + @testing-library/react

---

## File Map

```
wk-design/
├── app/
│   ├── layout.tsx                          # Root layout: fonts, metadata, body background
│   ├── page.tsx                            # Composes all sections
│   └── globals.css                         # Tailwind directives + CSS keyframes for particles
├── components/
│   ├── background/
│   │   ├── HorizonGlow.tsx                 # Pulsing golden sunset glow behind hero
│   │   ├── TreeSilhouettes.tsx             # SVG forest silhouette with scroll parallax
│   │   ├── FallingLeaves.tsx               # JS-generated falling leaf particles
│   │   └── Fireflies.tsx                   # JS-generated floating glow dots
│   ├── sections/
│   │   ├── Hero.tsx                        # Full-screen hero with brand name + subtitle
│   │   ├── Projects.tsx                    # Projects grid section
│   │   ├── Contact.tsx                     # Contact email section
│   │   └── Footer.tsx                      # Footer copyright
│   └── ui/
│       └── ProjectCard.tsx                 # Individual project card with hover effects
├── data/
│   └── projects.ts                         # Project data array (edit to update projects)
├── types/
│   └── index.ts                            # Shared TypeScript interfaces
├── __tests__/
│   ├── background/
│   │   ├── HorizonGlow.test.tsx
│   │   ├── TreeSilhouettes.test.tsx
│   │   ├── FallingLeaves.test.tsx
│   │   └── Fireflies.test.tsx
│   ├── sections/
│   │   ├── Hero.test.tsx
│   │   ├── Projects.test.tsx
│   │   ├── Contact.test.tsx
│   │   └── Footer.test.tsx
│   └── ui/
│       └── ProjectCard.test.tsx
├── jest.config.ts
├── jest.setup.ts
├── tailwind.config.ts
└── next.config.ts
```

---

## Task 1: Scaffold project and install dependencies

**Files:**
- Create: `wk-design/` (entire project directory via CLI)
- Create: `wk-design/jest.config.ts`
- Create: `wk-design/jest.setup.ts`

- [ ] **Step 1: Scaffold the Next.js project**

Run from `C:/Users/andorfer.vendel/.local/bin`:
```bash
npx create-next-app@latest wk-design --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --no-git
```
Expected: Project created at `wk-design/`, prompts answered automatically.

- [ ] **Step 2: Install Framer Motion**

```bash
cd wk-design
npm install framer-motion
```
Expected: `framer-motion` added to `package.json` dependencies.

- [ ] **Step 3: Install Jest and testing libraries**

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom @types/jest
```
Expected: All packages added to `devDependencies`.

- [ ] **Step 4: Create jest.config.ts**

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

- [ ] **Step 5: Create jest.setup.ts**

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Add test script to package.json**

In `package.json`, ensure the scripts section contains:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

- [ ] **Step 7: Verify dev server starts**

```bash
npm run dev
```
Expected: `ready - started server on 0.0.0.0:3000`. Stop with Ctrl+C.

- [ ] **Step 8: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js project with Tailwind, Framer Motion, Jest"
```

---

## Task 2: Configure Tailwind with autumn forest theme

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          deep: '#1a1008',
          mid: '#2a1a0a',
          card: '#1e1205',
        },
        autumn: {
          orange: '#e8650a',
          amber: '#f5a623',
          crimson: '#8b2500',
          border: '#c47a15',
        },
        cream: {
          DEFAULT: '#f5eed6',
          muted: '#a08060',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'leaf-fall': 'leafFall var(--duration, 8s) var(--delay, 0s) linear infinite',
        'firefly-float': 'fireflyFloat var(--duration, 6s) var(--delay, 0s) ease-in-out infinite',
        'horizon-pulse': 'horizonPulse 5s ease-in-out infinite',
        'text-shimmer': 'textShimmer 2.5s ease-in-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
      },
      keyframes: {
        leafFall: {
          '0%': {
            transform: 'translateX(0) translateY(-10vh) rotate(0deg)',
            opacity: '0',
          },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.7' },
          '100%': {
            transform: 'translateX(var(--leaf-drift, 100px)) translateY(110vh) rotate(var(--leaf-spin, 360deg))',
            opacity: '0',
          },
        },
        fireflyFloat: {
          '0%, 100%': {
            transform: 'translate(0, 0)',
            opacity: '0.15',
          },
          '25%': {
            transform: 'translate(var(--ff-x1, 30px), var(--ff-y1, -25px))',
            opacity: '1',
          },
          '50%': {
            transform: 'translate(var(--ff-x2, -20px), var(--ff-y2, 30px))',
            opacity: '0.5',
          },
          '75%': {
            transform: 'translate(var(--ff-x3, 15px), var(--ff-y3, 10px))',
            opacity: '0.9',
          },
        },
        horizonPulse: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Replace app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-playfair: 'Playfair Display', Georgia, serif;
  --font-inter: 'Inter', system-ui, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #1a1008;
  color: #f5eed6;
  font-family: var(--font-inter);
  overflow-x: hidden;
}

/* Particle leaf elements injected by JS */
.leaf-particle {
  position: fixed;
  pointer-events: none;
  user-select: none;
  font-size: var(--leaf-size, 1.2rem);
  animation: leafFall var(--duration, 8s) var(--delay, 0s) linear infinite;
  z-index: 10;
}

/* Firefly elements injected by JS */
.firefly-particle {
  position: fixed;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: radial-gradient(circle, #f5a623 0%, #e8650a 60%, transparent 100%);
  box-shadow: 0 0 8px 3px rgba(245, 166, 35, 0.7);
  pointer-events: none;
  animation: fireflyFloat var(--duration, 6s) var(--delay, 0s) ease-in-out infinite;
  z-index: 8;
}

/* Shimmer text gradient */
.shimmer-text {
  background: linear-gradient(
    90deg,
    #f5eed6 0%,
    #f5a623 25%,
    #e8650a 50%,
    #f5a623 75%,
    #f5eed6 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textShimmer 2.5s ease-in-out forwards;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .leaf-particle,
  .firefly-particle {
    display: none;
  }

  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Verify no Tailwind errors**

```bash
npm run build
```
Expected: Build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: configure Tailwind with autumn forest color palette and animation keyframes"
```

---

## Task 3: Set up types and project data

**Files:**
- Create: `types/index.ts`
- Create: `data/projects.ts`
- Create: `__tests__/data/projects.test.ts`

- [ ] **Step 1: Create types/index.ts**

```typescript
export interface Project {
  id: string
  title: string
  description: string
  url: string
  imageUrl: string | null
}
```

- [ ] **Step 2: Write the failing test**

Create `__tests__/data/projects.test.ts`:
```typescript
import { projects } from '@/data/projects'
import type { Project } from '@/types'

describe('projects data', () => {
  it('exports an array of projects', () => {
    expect(Array.isArray(projects)).toBe(true)
  })

  it('has at least one project', () => {
    expect(projects.length).toBeGreaterThan(0)
  })

  it('every project has required fields', () => {
    projects.forEach((p: Project) => {
      expect(typeof p.id).toBe('string')
      expect(typeof p.title).toBe('string')
      expect(typeof p.description).toBe('string')
      expect(typeof p.url).toBe('string')
    })
  })

  it('every project URL is a valid http/https URL', () => {
    projects.forEach((p: Project) => {
      expect(p.url).toMatch(/^https?:\/\//)
    })
  })
})
```

- [ ] **Step 3: Run the test to verify it fails**

```bash
npm test -- --testPathPattern=projects
```
Expected: FAIL — `Cannot find module '@/data/projects'`

- [ ] **Step 4: Create data/projects.ts**

```typescript
import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Project One',
    description: 'A beautifully crafted website built for a client.',
    url: 'https://example.com',
    imageUrl: null,
  },
  {
    id: 'project-2',
    title: 'Project Two',
    description: 'A modern, high-performance website delivered for a client.',
    url: 'https://example.com',
    imageUrl: null,
  },
]
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- --testPathPattern=projects
```
Expected: PASS — 4 tests passing.

- [ ] **Step 6: Commit**

```bash
git add types/index.ts data/projects.ts __tests__/data/projects.test.ts
git commit -m "feat: add Project type and initial project data"
```

---

## Task 4: Set up app/layout.tsx with fonts and metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace app/layout.tsx**

```typescript
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'WK Design — We craft websites that leave a mark.',
  description:
    'WK Design builds premium, high-performance websites for clients. View our portfolio of work.',
  openGraph: {
    title: 'WK Design',
    description: 'We craft websites that leave a mark.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-forest-deep text-cream antialiased">{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Verify build still passes**

```bash
npm run build
```
Expected: Build completes, no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: set up root layout with Playfair Display and Inter fonts"
```

---

## Task 5: Build HorizonGlow component

**Files:**
- Create: `components/background/HorizonGlow.tsx`
- Create: `__tests__/background/HorizonGlow.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/background/HorizonGlow.test.tsx`:
```typescript
import { render } from '@testing-library/react'
import { HorizonGlow } from '@/components/background/HorizonGlow'

describe('HorizonGlow', () => {
  it('renders without crashing', () => {
    const { container } = render(<HorizonGlow />)
    expect(container.firstChild).toBeTruthy()
  })

  it('is marked as aria-hidden for accessibility', () => {
    const { container } = render(<HorizonGlow />)
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern=HorizonGlow
```
Expected: FAIL — `Cannot find module '@/components/background/HorizonGlow'`

- [ ] **Step 3: Create components/background/HorizonGlow.tsx**

```typescript
export function HorizonGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-0 h-[55vh]"
    >
      {/* Primary glow — wide amber bloom from horizon */}
      <div
        className="animate-horizon-pulse absolute bottom-0 left-1/2 h-full w-full -translate-x-1/2"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 100%, rgba(245,166,35,0.35) 0%, rgba(232,101,10,0.18) 45%, transparent 70%)',
        }}
      />
      {/* Secondary glow — concentrated deep orange at center */}
      <div
        className="absolute bottom-0 left-1/2 h-2/3 w-1/2 -translate-x-1/2"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(139,37,0,0.4) 0%, rgba(232,101,10,0.12) 55%, transparent 75%)',
        }}
      />
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- --testPathPattern=HorizonGlow
```
Expected: PASS — 2 tests passing.

- [ ] **Step 5: Commit**

```bash
git add components/background/HorizonGlow.tsx __tests__/background/HorizonGlow.test.tsx
git commit -m "feat: add HorizonGlow background component with pulsing sunset glow"
```

---

## Task 6: Build TreeSilhouettes component

**Files:**
- Create: `components/background/TreeSilhouettes.tsx`
- Create: `__tests__/background/TreeSilhouettes.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/background/TreeSilhouettes.test.tsx`:
```typescript
import { render } from '@testing-library/react'
import { TreeSilhouettes } from '@/components/background/TreeSilhouettes'

describe('TreeSilhouettes', () => {
  it('renders without crashing', () => {
    const { container } = render(<TreeSilhouettes />)
    expect(container.firstChild).toBeTruthy()
  })

  it('is marked as aria-hidden for accessibility', () => {
    const { container } = render(<TreeSilhouettes />)
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy()
  })

  it('renders SVG elements', () => {
    const { container } = render(<TreeSilhouettes />)
    expect(container.querySelector('svg')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern=TreeSilhouettes
```
Expected: FAIL — `Cannot find module '@/components/background/TreeSilhouettes'`

- [ ] **Step 3: Create components/background/TreeSilhouettes.tsx**

```typescript
'use client'

import { useEffect, useRef } from 'react'

export function TreeSilhouettes() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translateY(${window.scrollY * 0.28}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-0 will-change-transform"
    >
      {/* Back row — distant, lighter trees */}
      <svg
        viewBox="0 0 1440 260"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-full"
        preserveAspectRatio="xMidYMax slice"
      >
        <g fill="#0c1a06" opacity="0.55">
          {/* Pine tree: cx=80 */}
          <polygon points="80,260 110,170 140,260" />
          <polygon points="85,210 110,135 135,210" />
          <polygon points="90,165 110,105 130,165" />
          <rect x="107" y="245" width="6" height="15" />
          {/* Pine tree: cx=220 */}
          <polygon points="190,260 230,150 270,260" />
          <polygon points="198,200 230,115 262,200" />
          <polygon points="205,155 230,80 255,155" />
          <rect x="226" y="240" width="8" height="20" />
          {/* Deciduous: cx=370 */}
          <rect x="366" y="180" width="8" height="80" />
          <ellipse cx="370" cy="155" rx="42" ry="50" />
          {/* Pine tree: cx=500 */}
          <polygon points="470,260 510,140 550,260" />
          <polygon points="478,205 510,105 542,205" />
          <polygon points="485,160 510,75 535,160" />
          <rect x="506" y="242" width="8" height="18" />
          {/* Deciduous: cx=640 */}
          <rect x="636" y="185" width="8" height="75" />
          <ellipse cx="640" cy="158" rx="48" ry="55" />
          {/* Pine: cx=780 */}
          <polygon points="748,260 785,145 822,260" />
          <polygon points="756,205 785,110 814,205" />
          <polygon points="763,160 785,78 807,160" />
          <rect x="781" y="242" width="8" height="18" />
          {/* Deciduous: cx=920 */}
          <rect x="916" y="178" width="8" height="82" />
          <ellipse cx="920" cy="150" rx="52" ry="58" />
          {/* Pine: cx=1060 */}
          <polygon points="1030,260 1065,148 1100,260" />
          <polygon points="1038,208 1065,113 1092,208" />
          <polygon points="1044,163 1065,82 1086,163" />
          <rect x="1061" y="242" width="8" height="18" />
          {/* Deciduous: cx=1200 */}
          <rect x="1196" y="182" width="8" height="78" />
          <ellipse cx="1200" cy="155" rx="45" ry="52" />
          {/* Pine: cx=1350 */}
          <polygon points="1318,260 1355,142 1392,260" />
          <polygon points="1326,205 1355,108 1384,205" />
          <polygon points="1332,162 1355,78 1378,162" />
          <rect x="1351" y="242" width="8" height="18" />
        </g>
      </svg>

      {/* Front row — close, dark trees */}
      <svg
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        preserveAspectRatio="xMidYMax slice"
      >
        <g fill="#060e02" opacity="0.92">
          {/* Large pine: cx=0 */}
          <polygon points="-20,320 30,180 80,320" />
          <polygon points="-12,255 30,138 72,255" />
          <polygon points="-5,200 30,100 65,200" />
          <rect x="26" y="298" width="8" height="22" />
          {/* Large deciduous: cx=180 */}
          <rect x="175" y="210" width="10" height="110" />
          <ellipse cx="180" cy="178" rx="58" ry="65" />
          {/* Large pine: cx=340 */}
          <polygon points="305,320 345,175 385,320" />
          <polygon points="313,258 345,132 377,258" />
          <polygon points="320,205 345,95 370,205" />
          <rect x="341" y="300" width="8" height="20" />
          {/* Large deciduous: cx=510 */}
          <rect x="505" y="205" width="10" height="115" />
          <ellipse cx="510" cy="170" rx="65" ry="72" />
          {/* Large pine: cx=680 */}
          <polygon points="644,320 682,170 720,320" />
          <polygon points="652,255 682,125 712,255" />
          <polygon points="659,200 682,88 705,200" />
          <rect x="678" y="300" width="8" height="20" />
          {/* Large deciduous: cx=860 */}
          <rect x="855" y="208" width="10" height="112" />
          <ellipse cx="860" cy="172" rx="62" ry="70" />
          {/* Large pine: cx=1020 */}
          <polygon points="984,320 1022,168 1060,320" />
          <polygon points="992,252 1022,123 1052,252" />
          <polygon points="999,198 1022,85 1045,198" />
          <rect x="1018" y="300" width="8" height="20" />
          {/* Large deciduous: cx=1190 */}
          <rect x="1185" y="205" width="10" height="115" />
          <ellipse cx="1190" cy="168" rx="60" ry="68" />
          {/* Large pine: cx=1380 */}
          <polygon points="1344,320 1382,172 1420,320" />
          <polygon points="1352,256 1382,127 1412,256" />
          <polygon points="1359,202 1382,90 1405,202" />
          <rect x="1378" y="300" width="8" height="20" />
          {/* Extra wide pine at right edge */}
          <polygon points="1400,320 1460,155 1520,320" />
          <polygon points="1410,248 1460,112 1510,248" />
          <rect x="1456" y="298" width="8" height="22" />
        </g>
      </svg>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- --testPathPattern=TreeSilhouettes
```
Expected: PASS — 3 tests passing.

- [ ] **Step 5: Commit**

```bash
git add components/background/TreeSilhouettes.tsx __tests__/background/TreeSilhouettes.test.tsx
git commit -m "feat: add TreeSilhouettes with SVG forest silhouette and scroll parallax"
```

---

## Task 7: Build FallingLeaves component

**Files:**
- Create: `components/background/FallingLeaves.tsx`
- Create: `__tests__/background/FallingLeaves.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/background/FallingLeaves.test.tsx`:
```typescript
import { render } from '@testing-library/react'
import { FallingLeaves } from '@/components/background/FallingLeaves'

describe('FallingLeaves', () => {
  it('renders a container element', () => {
    const { container } = render(<FallingLeaves />)
    expect(container.firstChild).toBeTruthy()
  })

  it('container is aria-hidden', () => {
    const { container } = render(<FallingLeaves />)
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern=FallingLeaves
```
Expected: FAIL — `Cannot find module '@/components/background/FallingLeaves'`

- [ ] **Step 3: Create components/background/FallingLeaves.tsx**

```typescript
'use client'

import { useEffect, useId } from 'react'

const LEAF_CHARS = ['🍂', '🍁', '🍃', '🍂', '🍁']

export function FallingLeaves() {
  const containerId = useId()

  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const count = isMobile ? 8 : 20

    const leaves: HTMLSpanElement[] = []

    for (let i = 0; i < count; i++) {
      const leaf = document.createElement('span')
      leaf.textContent = LEAF_CHARS[Math.floor(Math.random() * LEAF_CHARS.length)]
      leaf.className = 'leaf-particle'

      const duration = 7 + Math.random() * 9
      const delay = Math.random() * 12
      const startX = Math.random() * 100
      const drift = (Math.random() - 0.5) * 280
      const spin = Math.random() * 540 - 270
      const size = 0.7 + Math.random() * 1.1

      leaf.style.cssText = `
        left: ${startX}%;
        top: 0;
        --leaf-size: ${size}rem;
        --duration: ${duration}s;
        --delay: ${delay}s;
        --leaf-drift: ${drift}px;
        --leaf-spin: ${spin}deg;
      `
      container.appendChild(leaf)
      leaves.push(leaf)
    }

    return () => {
      leaves.forEach((l) => l.remove())
    }
  }, [containerId])

  return (
    <div
      id={containerId}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 10 }}
    />
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- --testPathPattern=FallingLeaves
```
Expected: PASS — 2 tests passing.

- [ ] **Step 5: Commit**

```bash
git add components/background/FallingLeaves.tsx __tests__/background/FallingLeaves.test.tsx
git commit -m "feat: add FallingLeaves particle animation component"
```

---

## Task 8: Build Fireflies component

**Files:**
- Create: `components/background/Fireflies.tsx`
- Create: `__tests__/background/Fireflies.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/background/Fireflies.test.tsx`:
```typescript
import { render } from '@testing-library/react'
import { Fireflies } from '@/components/background/Fireflies'

describe('Fireflies', () => {
  it('renders a container element', () => {
    const { container } = render(<Fireflies />)
    expect(container.firstChild).toBeTruthy()
  })

  it('container is aria-hidden', () => {
    const { container } = render(<Fireflies />)
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern=Fireflies
```
Expected: FAIL — `Cannot find module '@/components/background/Fireflies'`

- [ ] **Step 3: Create components/background/Fireflies.tsx**

```typescript
'use client'

import { useEffect, useId } from 'react'

export function Fireflies() {
  const containerId = useId()

  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const count = isMobile ? 5 : 14

    const flies: HTMLDivElement[] = []

    for (let i = 0; i < count; i++) {
      const fly = document.createElement('div')
      fly.className = 'firefly-particle'

      const x = 5 + Math.random() * 90
      const y = 5 + Math.random() * 75
      const duration = 4 + Math.random() * 7
      const delay = Math.random() * 10
      const x1 = (Math.random() - 0.5) * 90
      const y1 = (Math.random() - 0.5) * 70
      const x2 = (Math.random() - 0.5) * 80
      const y2 = (Math.random() - 0.5) * 60
      const x3 = (Math.random() - 0.5) * 70
      const y3 = (Math.random() - 0.5) * 50

      fly.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        --duration: ${duration}s;
        --delay: ${delay}s;
        --ff-x1: ${x1}px;
        --ff-y1: ${y1}px;
        --ff-x2: ${x2}px;
        --ff-y2: ${y2}px;
        --ff-x3: ${x3}px;
        --ff-y3: ${y3}px;
      `
      container.appendChild(fly)
      flies.push(fly)
    }

    return () => {
      flies.forEach((f) => f.remove())
    }
  }, [containerId])

  return (
    <div
      id={containerId}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 8 }}
    />
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- --testPathPattern=Fireflies
```
Expected: PASS — 2 tests passing.

- [ ] **Step 5: Commit**

```bash
git add components/background/Fireflies.tsx __tests__/background/Fireflies.test.tsx
git commit -m "feat: add Fireflies floating glow particle component"
```

---

## Task 9: Build Hero section

**Files:**
- Create: `components/sections/Hero.tsx`
- Create: `__tests__/sections/Hero.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/sections/Hero.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/sections/Hero'

describe('Hero', () => {
  it('renders the WK Design brand name', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { name: /WK Design/i })).toBeTruthy()
  })

  it('renders the tagline', () => {
    render(<Hero />)
    expect(screen.getByText(/we craft websites that leave a mark/i)).toBeTruthy()
  })

  it('renders the scroll indicator', () => {
    render(<Hero />)
    expect(screen.getByLabelText(/scroll down/i)).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern=Hero.test
```
Expected: FAIL — `Cannot find module '@/components/sections/Hero'`

- [ ] **Step 3: Create components/sections/Hero.tsx**

```typescript
'use client'

import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Brand name */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="shimmer-text font-serif text-[clamp(3.5rem,10vw,9rem)] font-bold leading-none tracking-widest"
      >
        WK Design
      </motion.h1>

      {/* Decorative rule */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
        className="my-6 h-px w-48 origin-center bg-gradient-to-r from-transparent via-autumn-amber to-transparent"
      />

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.9, ease: 'easeOut' }}
        className="font-sans text-[clamp(1rem,2.5vw,1.4rem)] font-light tracking-widest text-cream-muted uppercase"
      >
        We craft websites that leave a mark.
      </motion.p>

      {/* Scroll indicator */}
      <motion.a
        href="#projects"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-cream-muted transition-colors hover:text-autumn-amber"
      >
        <span className="font-sans text-xs tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="h-6 w-px bg-gradient-to-b from-autumn-amber to-transparent"
        />
      </motion.a>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- --testPathPattern=Hero.test
```
Expected: PASS — 3 tests passing.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Hero.tsx __tests__/sections/Hero.test.tsx
git commit -m "feat: add Hero section with Framer Motion entrance animations and shimmer text"
```

---

## Task 10: Build ProjectCard component

**Files:**
- Create: `components/ui/ProjectCard.tsx`
- Create: `__tests__/ui/ProjectCard.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/ui/ProjectCard.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { ProjectCard } from '@/components/ui/ProjectCard'
import type { Project } from '@/types'

const mockProject: Project = {
  id: 'test-1',
  title: 'Test Project',
  description: 'A test project description.',
  url: 'https://test.example.com',
  imageUrl: null,
}

describe('ProjectCard', () => {
  it('renders the project title', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('Test Project')).toBeTruthy()
  })

  it('renders the project description', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('A test project description.')).toBeTruthy()
  })

  it('renders a link to the project URL', () => {
    render(<ProjectCard project={mockProject} />)
    const link = screen.getByRole('link', { name: /visit site/i })
    expect(link).toBeTruthy()
    expect(link.getAttribute('href')).toBe('https://test.example.com')
  })

  it('link opens in a new tab', () => {
    render(<ProjectCard project={mockProject} />)
    const link = screen.getByRole('link', { name: /visit site/i })
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
  })

  it('shows a placeholder when imageUrl is null', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText(/no preview yet/i)).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern=ProjectCard
```
Expected: FAIL — `Cannot find module '@/components/ui/ProjectCard'`

- [ ] **Step 3: Create components/ui/ProjectCard.tsx**

```typescript
'use client'

import { motion } from 'framer-motion'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-autumn-border/30 bg-forest-card transition-shadow duration-300 hover:border-autumn-border/70 hover:shadow-[0_0_40px_rgba(196,122,21,0.25)]"
    >
      {/* Image area */}
      <div className="relative h-52 w-full overflow-hidden bg-forest-mid sm:h-64">
        {project.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.imageUrl}
            alt={`Screenshot of ${project.title}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 opacity-40">
            <div className="h-px w-16 bg-autumn-amber" />
            <span className="font-sans text-xs tracking-widest text-cream-muted uppercase">
              No preview yet
            </span>
            <div className="h-px w-16 bg-autumn-amber" />
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-card/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-serif text-2xl font-semibold text-cream">
          {project.title}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-cream-muted">
          {project.description}
        </p>

        {/* Visit link */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 self-start rounded-full border border-autumn-border/50 px-5 py-2 font-sans text-sm tracking-widest text-autumn-amber uppercase transition-all duration-200 hover:border-autumn-amber hover:bg-autumn-amber/10 hover:shadow-[0_0_16px_rgba(245,166,35,0.3)]"
        >
          Visit Site
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M2 7H12M8 3L12 7L8 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </motion.article>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- --testPathPattern=ProjectCard
```
Expected: PASS — 5 tests passing.

- [ ] **Step 5: Commit**

```bash
git add components/ui/ProjectCard.tsx __tests__/ui/ProjectCard.test.tsx
git commit -m "feat: add ProjectCard component with hover lift, amber glow, and visit link"
```

---

## Task 11: Build Projects section

**Files:**
- Create: `components/sections/Projects.tsx`
- Create: `__tests__/sections/Projects.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/sections/Projects.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { Projects } from '@/components/sections/Projects'

jest.mock('@/data/projects', () => ({
  projects: [
    {
      id: 'p1',
      title: 'Mock Project A',
      description: 'Desc A',
      url: 'https://a.com',
      imageUrl: null,
    },
    {
      id: 'p2',
      title: 'Mock Project B',
      description: 'Desc B',
      url: 'https://b.com',
      imageUrl: null,
    },
  ],
}))

describe('Projects', () => {
  it('renders the section heading', () => {
    render(<Projects />)
    expect(screen.getByRole('heading', { name: /our work/i })).toBeTruthy()
  })

  it('renders a card for each project', () => {
    render(<Projects />)
    expect(screen.getByText('Mock Project A')).toBeTruthy()
    expect(screen.getByText('Mock Project B')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern=Projects.test
```
Expected: FAIL — `Cannot find module '@/components/sections/Projects'`

- [ ] **Step 3: Create components/sections/Projects.tsx**

```typescript
'use client'

import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'

export function Projects() {
  return (
    <section
      id="projects"
      className="relative z-10 mx-auto max-w-6xl px-6 py-28"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-16 text-center"
      >
        <p className="mb-3 font-sans text-xs tracking-[0.4em] text-autumn-amber uppercase">
          Portfolio
        </p>
        <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-bold text-cream">
          Our Work
        </h2>
        <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-autumn-amber to-transparent" />
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- --testPathPattern=Projects.test
```
Expected: PASS — 2 tests passing.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Projects.tsx __tests__/sections/Projects.test.tsx
git commit -m "feat: add Projects section with scroll-reveal and responsive grid"
```

---

## Task 12: Build Contact section

**Files:**
- Create: `components/sections/Contact.tsx`
- Create: `__tests__/sections/Contact.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/sections/Contact.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { Contact } from '@/components/sections/Contact'

describe('Contact', () => {
  it('renders the section heading', () => {
    render(<Contact />)
    expect(screen.getByRole('heading', { name: /let's work together/i })).toBeTruthy()
  })

  it('renders the email address', () => {
    render(<Contact />)
    expect(screen.getByText('andorfervendel00@gmail.com')).toBeTruthy()
  })

  it('renders a mailto link with the correct email', () => {
    render(<Contact />)
    const link = screen.getByRole('link', { name: /send an email/i })
    expect(link.getAttribute('href')).toBe('mailto:andorfervendel00@gmail.com')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern=Contact
```
Expected: FAIL — `Cannot find module '@/components/sections/Contact'`

- [ ] **Step 3: Create components/sections/Contact.tsx**

```typescript
'use client'

import { motion } from 'framer-motion'

const EMAIL = 'andorfervendel00@gmail.com'

export function Contact() {
  return (
    <section
      id="contact"
      className="relative z-10 mx-auto max-w-3xl px-6 py-28 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center gap-8"
      >
        <p className="font-sans text-xs tracking-[0.4em] text-autumn-amber uppercase">
          Contact
        </p>

        <h2 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-tight text-cream">
          Let's Work Together
        </h2>

        <div className="h-px w-24 bg-gradient-to-r from-transparent via-autumn-amber to-transparent" />

        <p className="font-sans text-base leading-relaxed text-cream-muted max-w-md">
          Have a project in mind? Reach out and let's build something remarkable.
        </p>

        <p className="font-sans text-lg font-medium tracking-wide text-cream">
          {EMAIL}
        </p>

        <motion.a
          href={`mailto:${EMAIL}`}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-full border border-autumn-amber/60 bg-autumn-amber/10 px-10 py-4 font-sans text-sm tracking-[0.3em] text-autumn-amber uppercase shadow-[0_0_20px_rgba(245,166,35,0)] transition-shadow duration-300 hover:border-autumn-amber hover:shadow-[0_0_30px_rgba(245,166,35,0.3)]"
        >
          Send an Email
        </motion.a>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- --testPathPattern=Contact
```
Expected: PASS — 3 tests passing.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Contact.tsx __tests__/sections/Contact.test.tsx
git commit -m "feat: add Contact section with email CTA and scroll-reveal"
```

---

## Task 13: Build Footer component

**Files:**
- Create: `components/sections/Footer.tsx`
- Create: `__tests__/sections/Footer.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/sections/Footer.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/sections/Footer'

describe('Footer', () => {
  it('renders the copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/2026 WK Design/i)).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern=Footer
```
Expected: FAIL — `Cannot find module '@/components/sections/Footer'`

- [ ] **Step 3: Create components/sections/Footer.tsx**

```typescript
export function Footer() {
  return (
    <footer className="relative z-10 border-t border-autumn-border/15 py-10 text-center">
      <div className="mx-auto h-px w-48 bg-gradient-to-r from-transparent via-autumn-border/40 to-transparent mb-8" />
      <p className="font-sans text-sm tracking-widest text-cream-muted/60 uppercase">
        © 2026 WK Design
      </p>
    </footer>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- --testPathPattern=Footer
```
Expected: PASS — 1 test passing.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Footer.tsx __tests__/sections/Footer.test.tsx
git commit -m "feat: add Footer component"
```

---

## Task 14: Compose app/page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/page.tsx with full page composition**

```typescript
import { HorizonGlow } from '@/components/background/HorizonGlow'
import { TreeSilhouettes } from '@/components/background/TreeSilhouettes'
import { FallingLeaves } from '@/components/background/FallingLeaves'
import { Fireflies } from '@/components/background/Fireflies'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-forest-deep">
      {/* Background layer — fixed, behind everything */}
      <HorizonGlow />
      <TreeSilhouettes />
      <FallingLeaves />
      <Fireflies />

      {/* Content layer */}
      <div className="relative z-20">
        <Hero />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Run full test suite**

```bash
npm test
```
Expected: All tests PASS.

- [ ] **Step 3: Run dev server and visually verify**

```bash
npm run dev
```
Open `http://localhost:3000`. Verify:
- WK Design title appears with golden shimmer animation
- Amber rule fades in below the title
- Tagline appears
- Falling leaves drift across screen
- Firefly dots float in background
- Tree silhouettes appear at bottom
- Golden horizon glow pulses behind trees
- Scrolling down: parallax tree movement is visible
- Projects section fades in on scroll
- Two project cards appear side by side on desktop, stacked on mobile
- Hovering a card: it lifts up and glows amber
- Contact section appears with email and glowing CTA button
- Footer at bottom

Stop server with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose full page with all background and content sections"
```

---

## Task 15: Production build verification

**Files:**
- No new files

- [ ] **Step 1: Run production build**

```bash
npm run build
```
Expected: Build completes with no errors or TypeScript issues. Note any warnings.

- [ ] **Step 2: Start production server and verify**

```bash
npm start
```
Open `http://localhost:3000`. Verify all animations and interactions work identically to dev mode. Stop with Ctrl+C.

- [ ] **Step 3: Run full test suite one final time**

```bash
npm test
```
Expected: All tests PASS, zero failures.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: WK Design portfolio — autumn forest golden hour theme complete"
```

---

## Updating Projects Later

To add a new project, open `data/projects.ts` and add a new object to the `projects` array:

```typescript
{
  id: 'project-3',
  title: 'Your Project Title',
  description: 'Brief description of what you built.',
  url: 'https://the-live-site.com',
  imageUrl: '/images/project-3.jpg',  // or null if no image yet
}
```

To add a screenshot: place the image file in the `public/images/` folder and set `imageUrl` to `'/images/your-filename.jpg'`.
