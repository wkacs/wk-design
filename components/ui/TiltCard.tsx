'use client'

import { useRef, useState, type MouseEvent, type ReactNode } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.matchMedia('(max-width: 768px)').matches) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (0.5 - y) * 12
    const rotateY = (x - 0.5) * 12

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
    setGlare({ x: x * 100, y: y * 100, opacity: 0.12 })
  }

  const handleMouseLeave = () => {
    setTransform('')
    setGlare({ x: 50, y: 50, opacity: 0 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform,
        transition: transform ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
      {/* Glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
          transition: glare.opacity ? 'opacity 0.1s' : 'opacity 0.4s',
        }}
      />
    </div>
  )
}
