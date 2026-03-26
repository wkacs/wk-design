'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { FloatingDust, GlowOrbs } from '@/components/ui/Particles'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const mouse = useMousePosition()

  const { scrollY } = useScroll()
  const parallaxSlow = useTransform(scrollY, [0, 800], [0, -40])
  const parallaxMed = useTransform(scrollY, [0, 800], [0, -90])
  const parallaxFast = useTransform(scrollY, [0, 800], [0, -150])
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0])

  // Mouse-reactive offsets for floating elements
  const mx = (mouse.normalizedX - 0.5) * 16
  const my = (mouse.normalizedY - 0.5) * 16

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* ── Background Layers ── */}

      {/* Dot grid — slow parallax */}
      <motion.div
        style={{ y: parallaxSlow }}
        className="pointer-events-none absolute inset-0 pattern-dots mask-radial opacity-40"
        aria-hidden="true"
      />

      {/* Fine line grid — medium parallax */}
      <motion.div
        style={{ y: parallaxMed, opacity: heroOpacity }}
        className="pointer-events-none absolute inset-0 pattern-grid opacity-30"
        aria-hidden="true"
      />

      {/* Decorative rings — mouse reactive */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: '15%',
          right: '8%',
          transform: `translate(${mx * 0.6}px, ${my * 0.6}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="ring-spin h-[280px] w-[280px] rounded-full border border-accent/[0.06] sm:h-[380px] sm:w-[380px]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          bottom: '18%',
          left: '5%',
          transform: `translate(${mx * -0.4}px, ${my * -0.4}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="ring-spin-reverse h-[200px] w-[200px] rounded-full border border-accent/[0.04] sm:h-[300px] sm:w-[300px]" />
      </div>

      {/* Floating accent shapes — mouse reactive */}
      <motion.div
        style={{ y: parallaxFast }}
        aria-hidden="true"
        className="pointer-events-none absolute"
      >
        {/* Diamond 1 */}
        <div
          className="anim-float absolute h-2 w-2 rotate-45 border border-accent/20"
          style={{
            top: '20vh',
            left: '12vw',
            transform: `translate(${mx * 1.2}px, ${my * 1.2}px) rotate(45deg)`,
            transition: 'transform 0.4s ease-out',
          }}
        />
        {/* Diamond 2 */}
        <div
          className="anim-float-delayed absolute h-3 w-3 rotate-45 border border-accent/10"
          style={{
            top: '35vh',
            right: '15vw',
            animationDelay: '2s',
            transform: `translate(${mx * -0.8}px, ${my * -0.8}px) rotate(45deg)`,
            transition: 'transform 0.4s ease-out',
          }}
        />
        {/* Small circle */}
        <div
          className="anim-float absolute h-1.5 w-1.5 rounded-full bg-accent/15"
          style={{
            bottom: '30vh',
            left: '25vw',
            animationDelay: '3.5s',
            transform: `translate(${mx * 0.9}px, ${my * 0.9}px)`,
            transition: 'transform 0.4s ease-out',
          }}
        />
        {/* Accent line */}
        <div
          className="anim-float-delayed absolute h-px w-12 bg-gradient-to-r from-transparent via-accent/15 to-transparent"
          style={{
            top: '60vh',
            right: '20vw',
            animationDelay: '1s',
          }}
        />
      </motion.div>

      {/* Warm spotlight glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 45% 35% at 50% 42%, rgba(201,164,86,0.035) 0%, transparent 70%)',
        }}
      />

      {/* Particles */}
      <FloatingDust count={14} />
      <GlowOrbs count={5} />

      {/* ── Content ── */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="text-float mb-8 font-sans text-[0.6rem] font-semibold tracking-[0.6em] text-accent-muted uppercase"
        >
          Freelance Web Designer &amp; Developer
        </motion.p>

        {/* Brand name */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="shimmer-text font-serif text-[clamp(3.2rem,12vw,10rem)] font-bold leading-[0.85] tracking-[0.04em]"
        >
          WK Design
        </motion.h1>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="my-8 flex origin-center items-center gap-5"
        >
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-accent/25 sm:w-24" />
          <div className="relative flex items-center justify-center">
            <div className="h-[5px] w-[5px] rotate-45 border border-accent/40" />
            <div className="absolute h-[11px] w-[11px] rotate-45 border border-accent/10" />
          </div>
          <div className="h-px w-14 bg-gradient-to-l from-transparent to-accent/25 sm:w-24" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: 'easeOut' }}
          className="text-float-alt max-w-lg font-sans text-[clamp(0.82rem,1.8vw,1.05rem)] font-light leading-relaxed tracking-[0.22em] text-text-secondary uppercase"
        >
          I craft websites that leave a mark
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease: 'easeOut' }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <MagneticButton
            href="#projects"
            className="group/btn relative overflow-hidden rounded-full border border-accent/20 px-10 py-3.5 font-sans text-[0.62rem] font-semibold tracking-[0.35em] text-accent uppercase transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_50px_rgba(201,164,86,0.1)]"
          >
            <div className="absolute inset-0 bg-accent/[0.03] transition-colors duration-500 group-hover/btn:bg-accent/[0.07]" />
            <span className="relative z-10">See My Work</span>
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="rounded-full border border-transparent px-10 py-3.5 font-sans text-[0.62rem] font-semibold tracking-[0.35em] text-text-secondary uppercase transition-colors duration-300 hover:text-accent"
          >
            Get in Touch
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.a
        href="#projects"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.8 }}
        className="absolute bottom-12 z-10 flex flex-col items-center gap-3 text-text-tertiary transition-colors duration-500 hover:text-accent"
      >
        <span className="text-float-slow font-sans text-[0.55rem] font-semibold tracking-[0.5em] uppercase">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <div className="h-7 w-px bg-gradient-to-b from-text-tertiary/50 to-transparent" />
        </motion.div>
      </motion.a>
    </section>
  )
}
