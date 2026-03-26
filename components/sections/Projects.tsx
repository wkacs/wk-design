'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { FloatingDust } from '@/components/ui/Particles'

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative mx-auto max-w-6xl overflow-hidden px-6 py-32 sm:px-10"
    >
      {/* Background pattern — parallax */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 pattern-dots mask-radial opacity-20"
        aria-hidden="true"
      />

      {/* Particles */}
      <FloatingDust count={8} />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mb-20 text-center"
      >
        <p className="text-float-alt mb-4 font-sans text-[0.58rem] font-semibold tracking-[0.55em] text-accent-muted uppercase">
          Selected Work
        </p>
        <h2 className="font-serif text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.1] tracking-wide text-text">
          My Projects
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

      {/* Cards grid */}
      <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.9,
              delay: index * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
