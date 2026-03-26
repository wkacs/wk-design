'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { GlowOrbs } from '@/components/ui/Particles'

const EMAIL = 'andorfervendel00@gmail.com'

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative mx-auto max-w-3xl overflow-hidden px-6 py-32 text-center"
    >
      {/* Background pattern */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 pattern-grid opacity-15"
        aria-hidden="true"
      />

      <GlowOrbs count={3} />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center gap-7"
      >
        <p className="text-float font-sans text-[0.58rem] font-semibold tracking-[0.55em] text-accent-muted uppercase">
          Get in Touch
        </p>

        <h2 className="font-serif text-[clamp(2rem,5vw,3.6rem)] font-bold leading-tight tracking-wide text-text">
          Let&apos;s Work Together
        </h2>

        <div className="flex items-center gap-4">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-accent/20" />
          <div className="relative flex items-center justify-center">
            <div className="h-[4px] w-[4px] rotate-45 border border-accent/30" />
            <div className="absolute h-[9px] w-[9px] rotate-45 border border-accent/10" />
          </div>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-accent/20" />
        </div>

        <p className="max-w-sm font-sans text-[0.88rem] leading-relaxed text-text-secondary">
          Have a project in mind? I&apos;d love to hear about it.
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-sans text-base font-medium tracking-wider text-text/80"
        >
          {EMAIL}
        </motion.p>

        <MagneticButton
          href={`mailto:${EMAIL}`}
          className="group relative mt-2 overflow-hidden rounded-full border border-accent/20 px-10 py-3.5 font-sans text-[0.62rem] font-semibold tracking-[0.35em] text-accent uppercase transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_50px_rgba(201,164,86,0.1)]"
        >
          <div className="absolute inset-0 bg-accent/[0.03] transition-colors duration-500 group-hover:bg-accent/[0.07]" />
          <span className="relative z-10">Start a Conversation</span>
        </MagneticButton>
      </motion.div>
    </section>
  )
}
