'use client'

import { motion } from 'framer-motion'
import { FloatingDust } from '@/components/ui/Particles'

const STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description: 'I learn about your business, goals, and audience. Every project starts with understanding what success looks like for you.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Wireframes, mockups, and prototypes. I iterate on the visual direction until it feels right — no compromises.',
  },
  {
    number: '03',
    title: 'Develop',
    description: 'Clean, modern code built for performance. Responsive, fast, and optimized for every device and screen size.',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Thorough testing, deployment, and handoff. I make sure everything works flawlessly before going live.',
  },
]

export function Process() {
  return (
    <section
      id="process"
      className="relative mx-auto max-w-5xl overflow-hidden px-6 py-32 sm:px-10"
    >
      <FloatingDust count={5} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mb-20 text-center"
      >
        <p className="text-float mb-4 font-sans text-[0.58rem] font-semibold tracking-[0.55em] text-accent-muted uppercase">
          How I Work
        </p>
        <h2 className="font-serif text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.1] tracking-wide text-text">
          My Process
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

      {/* Steps */}
      <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
        {STEPS.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.8,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative flex flex-col items-start rounded-xl border border-border bg-surface/50 p-8 transition-all duration-500 hover:border-border-hover"
          >
            {/* Step number */}
            <span className="gold-text mb-4 font-serif text-3xl font-bold">
              {step.number}
            </span>

            {/* Title */}
            <h3 className="mb-3 font-serif text-[1.15rem] font-semibold tracking-wide text-text">
              {step.title}
            </h3>

            {/* Description */}
            <p className="font-sans text-[0.82rem] leading-relaxed text-text-secondary">
              {step.description}
            </p>

            {/* Bottom accent line on hover */}
            <div
              className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: 'linear-gradient(90deg, transparent 15%, rgba(201,164,86,0.15) 50%, transparent 85%)' }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
