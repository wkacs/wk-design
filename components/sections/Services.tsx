'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { TiltCard } from '@/components/ui/TiltCard'
import { FloatingDust } from '@/components/ui/Particles'

const SERVICES = [
  {
    id: 'web-design',
    title: 'Web Design',
    description: 'Custom websites that look premium and convert visitors into clients. From landing pages to full multi-page sites.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2 9H26" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="5" cy="6.5" r="0.8" fill="currentColor" />
        <circle cx="7.5" cy="6.5" r="0.8" fill="currentColor" />
        <circle cx="10" cy="6.5" r="0.8" fill="currentColor" />
        <path d="M10 24H18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M14 20V24" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'User-centered interfaces that feel intuitive. Wireframes, prototypes, and polished design systems built for real users.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="2" width="20" height="24" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <rect x="8" y="7" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="1" />
        <rect x="8" y="16" width="5" height="2" rx="0.5" stroke="currentColor" strokeWidth="0.8" />
        <rect x="15" y="16" width="5" height="2" rx="0.5" stroke="currentColor" strokeWidth="0.8" />
        <rect x="8" y="20" width="12" height="2" rx="0.5" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    ),
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Fast, responsive sites built with modern tech. Next.js, React, and clean code that performs as good as it looks.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 8L4 14L10 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 8L24 14L18 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 4L12 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative mx-auto max-w-6xl overflow-hidden px-6 py-32 sm:px-10"
    >
      {/* Background */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 pattern-grid mask-radial opacity-15"
        aria-hidden="true"
      />
      <FloatingDust count={6} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mb-20 text-center"
      >
        <p className="text-float mb-4 font-sans text-[0.58rem] font-semibold tracking-[0.55em] text-accent-muted uppercase">
          What I Do
        </p>
        <h2 className="font-serif text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.1] tracking-wide text-text">
          Services
        </h2>
        <div className="mx-auto mt-6 flex items-center justify-center gap-4">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-accent/20" />
          <div className="relative flex items-center justify-center">
            <div className="h-[4px] w-[4px] rotate-45 border border-accent/30" />
            <div className="absolute h-[9px] w-[9px] rotate-45 border border-accent/10" />
          </div>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-accent/20" />
        </div>
      </motion.div>

      {/* Service cards */}
      <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.8,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <TiltCard className="glass-card group relative flex flex-col items-start overflow-hidden rounded-xl p-8">
              {/* Icon */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-accent/10 bg-accent/[0.04] text-accent/70 transition-colors duration-400 group-hover:border-accent/20 group-hover:text-accent">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="mb-3 font-serif text-[1.25rem] font-semibold tracking-wide text-text">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-[0.82rem] leading-relaxed text-text-secondary">
                {service.description}
              </p>

              {/* Bottom accent line on hover */}
              <div
                className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'linear-gradient(90deg, transparent 15%, rgba(201,164,86,0.15) 50%, transparent 85%)' }}
              />
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
