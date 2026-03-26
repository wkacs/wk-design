import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'konfuciusz-intezet',
    title: 'ELTE Confucius Institute',
    description: 'A rich, immersive website for the ELTE Confucius Institute in Budapest. Cultural-themed design with interactive elements, 3D tilt cards, parallax scrolling, and atmospheric particle effects. Built with Next.js, Tailwind CSS, and Framer Motion.',
    url: 'https://konfuciusz-intezet.vercel.app/',
    imageUrl: '/konfuciusz.png',
  },
  {
    id: 'ember-and-oak',
    title: 'Ember & Oak',
    description: 'An elegant restaurant website with a warm, wood-fired aesthetic. Full-screen food photography, smooth animations, and a refined layout that captures the dining experience. Built with Next.js, Tailwind CSS, and Framer Motion.',
    url: 'https://ember-oak-zeta.vercel.app/',
    imageUrl: '/emberandoak.png',
  },
]
