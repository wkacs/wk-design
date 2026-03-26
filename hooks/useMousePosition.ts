'use client'

import { useEffect, useState } from 'react'

interface MousePosition {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
}

export function useMousePosition(): MousePosition {
  const [pos, setPos] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(max-width: 768px)').matches) return

    let rafId: number
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setPos({
          x: e.clientX,
          y: e.clientY,
          normalizedX: e.clientX / window.innerWidth,
          normalizedY: e.clientY / window.innerHeight,
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return pos
}
