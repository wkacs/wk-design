'use client'

import { Navbar } from '@/components/ui/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { Process } from '@/components/sections/Process'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { Fireflies } from '@/components/ui/Fireflies'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* ── Custom Cursor ── */}
      <CustomCursor />

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Ambient background ── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
      </div>

      {/* ── Overlays ── */}
      <div aria-hidden="true" className="bg-ambient" />
      <Fireflies count={14} />
      <div aria-hidden="true" className="vignette" />

      {/* ── Content ── */}
      <div className="relative z-10">
        <Hero />

        <div className="hr-accent mx-auto w-40" />

        <Services />

        <div className="hr-accent mx-auto w-32" />

        <Projects />

        <div className="hr-accent mx-auto w-36" />

        <Process />

        <div className="hr-accent mx-auto w-32" />

        <About />

        <div className="hr-accent mx-auto w-28" />

        <Contact />

        <Footer />
      </div>
    </main>
  )
}
