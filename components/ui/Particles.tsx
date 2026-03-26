'use client'

import { useEffect, useRef } from 'react'

export function FloatingDust({ count = 16 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const actualCount = isMobile ? Math.floor(count * 0.5) : count
    const particles: HTMLDivElement[] = []

    for (let i = 0; i < actualCount; i++) {
      const p = document.createElement('div')
      p.className = 'dust-particle'

      const x = Math.random() * 100
      const size = 1.5 + Math.random() * 2.5
      const duration = 20 + Math.random() * 20
      const delay = Math.random() * 20
      const drift = (Math.random() - 0.5) * 60
      const opacity = 0.15 + Math.random() * 0.3

      p.style.cssText = `
        left: ${x}%;
        bottom: 0;
        width: ${size}px;
        height: ${size}px;
        --dust-duration: ${duration}s;
        --dust-delay: ${delay}s;
        --dust-drift: ${drift}px;
        --dust-opacity: ${opacity};
      `
      container.appendChild(p)
      particles.push(p)
    }

    return () => particles.forEach((p) => p.remove())
  }, [count])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    />
  )
}

export function GlowOrbs({ count = 4 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const orbs: HTMLDivElement[] = []

    for (let i = 0; i < count; i++) {
      const orb = document.createElement('div')
      orb.className = 'glow-orb'

      const x = 10 + Math.random() * 80
      const y = 10 + Math.random() * 70
      const size = 4 + Math.random() * 6
      const duration = 5 + Math.random() * 8
      const delay = Math.random() * 8
      const peak = 0.3 + Math.random() * 0.5

      orb.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        --orb-duration: ${duration}s;
        --orb-delay: ${delay}s;
        --orb-peak: ${peak};
        --orb-x1: ${(Math.random() - 0.5) * 80}px;
        --orb-y1: ${(Math.random() - 0.5) * 60}px;
        --orb-x2: ${(Math.random() - 0.5) * 60}px;
        --orb-y2: ${(Math.random() - 0.5) * 50}px;
      `
      container.appendChild(orb)
      orbs.push(orb)
    }

    return () => orbs.forEach((o) => o.remove())
  }, [count])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    />
  )
}
