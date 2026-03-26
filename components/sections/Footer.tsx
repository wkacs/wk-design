'use client'

import { FloatingDust } from '@/components/ui/Particles'

export function Footer() {
  return (
    <footer className="relative overflow-hidden py-14 text-center">
      <FloatingDust count={4} />
      <div className="hr-accent mx-auto mb-8 w-28" />
      <p className="text-float-slow relative z-10 font-sans text-[0.58rem] font-semibold tracking-[0.4em] text-text-tertiary uppercase">
        &copy; {new Date().getFullYear()} WK Design
      </p>
    </footer>
  )
}
