'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    setVisible(true)

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
      }
    }

    // Smooth ring follow
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
      }

      requestAnimationFrame(animateRing)
    }

    // Detect hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.glass-card')
      ) {
        setHovering(true)
      }
    }

    const handleMouseOut = () => {
      setHovering(false)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })
    const rafId = requestAnimationFrame(animateRing)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      {/* Dot — follows instantly */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-accent mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      {/* Ring — follows with lag */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[99] rounded-full border mix-blend-difference transition-[width,height,border-color] duration-300"
        style={{
          width: hovering ? 48 : 36,
          height: hovering ? 48 : 36,
          borderColor: hovering ? 'rgba(201,164,86,0.5)' : 'rgba(240,236,228,0.25)',
          marginLeft: hovering ? -6 : 0,
          marginTop: hovering ? -6 : 0,
          willChange: 'transform',
        }}
      />
    </>
  )
}
