'use client'

import Link from 'next/link'
import { Fireflies } from '@/components/ui/Fireflies'
import { FloatingDust } from '@/components/ui/Particles'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="bg-ambient fixed inset-0" />
      <div className="vignette" />
      <Fireflies count={8} />
      <FloatingDust count={6} />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <h1 className="font-serif text-[clamp(5rem,15vw,10rem)] font-bold leading-none">
          <span className="gold-text">404</span>
        </h1>

        <p className="font-sans text-[0.88rem] leading-relaxed text-text-secondary">
          This page doesn&apos;t exist — but I can build one for you.
        </p>

        <div className="flex items-center gap-4">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-accent/20" />
          <div className="relative flex items-center justify-center">
            <div className="h-[4px] w-[4px] rotate-45 border border-accent/30" />
            <div className="absolute h-[9px] w-[9px] rotate-45 border border-accent/10" />
          </div>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-accent/20" />
        </div>

        <Link
          href="/"
          className="group relative mt-4 overflow-hidden rounded-full border border-accent/20 px-10 py-3.5 font-sans text-[0.62rem] font-semibold tracking-[0.35em] text-accent uppercase transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_50px_rgba(201,164,86,0.1)]"
        >
          <div className="absolute inset-0 bg-accent/[0.03] transition-colors duration-500 group-hover:bg-accent/[0.07]" />
          <span className="relative z-10">Back to Home</span>
        </Link>
      </div>
    </div>
  )
}
