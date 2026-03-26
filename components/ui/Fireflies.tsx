'use client'

import { useEffect, useRef } from 'react'

export function Fireflies({ count = 12 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const actualCount = isMobile ? Math.floor(count * 0.5) : count
    const flies: HTMLDivElement[] = []

    for (let i = 0; i < actualCount; i++) {
      const fly = document.createElement('div')
      fly.className = 'firefly'

      const x = 5 + Math.random() * 90
      const y = 5 + Math.random() * 85
      const size = 3 + Math.random() * 4
      const duration = 7 + Math.random() * 10
      const delay = Math.random() * 12
      const peak = 0.5 + Math.random() * 0.45

      // 4-point wandering path — wide range for visible movement
      const x1 = (Math.random() - 0.5) * 280
      const y1 = (Math.random() - 0.5) * 220
      const x2 = (Math.random() - 0.5) * 240
      const y2 = (Math.random() - 0.5) * 200
      const x3 = (Math.random() - 0.5) * 260
      const y3 = (Math.random() - 0.5) * 180
      const x4 = (Math.random() - 0.5) * 220
      const y4 = (Math.random() - 0.5) * 210

      fly.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(230, 200, 120, 0.9) 0%, rgba(201, 164, 86, 0.5) 40%, transparent 70%);
        box-shadow: 0 0 ${size * 2.5}px ${size * 0.8}px rgba(201, 164, 86, 0.25);
        --ff-duration: ${duration}s;
        --ff-delay: ${delay}s;
        --ff-peak: ${peak};
        --ff-x1: ${x1}px;
        --ff-y1: ${y1}px;
        --ff-x2: ${x2}px;
        --ff-y2: ${y2}px;
        --ff-x3: ${x3}px;
        --ff-y3: ${y3}px;
        --ff-x4: ${x4}px;
        --ff-y4: ${y4}px;
      `
      container.appendChild(fly)
      flies.push(fly)
    }

    return () => flies.forEach((f) => f.remove())
  }, [count])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[6] overflow-hidden"
    />
  )
}
