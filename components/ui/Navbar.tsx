'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50)
  })

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? 'bg-base/80 backdrop-blur-xl border-border shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        {/* Logo */}
        <a
          href="#"
          className="gold-text font-serif text-lg font-bold tracking-wider"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          WK
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-[0.6rem] font-semibold tracking-[0.3em] text-text-secondary uppercase transition-colors duration-300 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 sm:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-px w-5 bg-text transition-all duration-300 ${
              mobileOpen ? 'translate-y-[3.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-px w-5 bg-text transition-all duration-300 ${
              mobileOpen ? '-translate-y-[2.5px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-base/95 backdrop-blur-xl transition-all duration-500 sm:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="font-sans text-[0.7rem] font-semibold tracking-[0.4em] text-text-secondary uppercase transition-colors duration-300 hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </div>
    </motion.nav>
  )
}
