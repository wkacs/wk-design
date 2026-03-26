'use client'

import { useRef, useState, type MouseEvent, type ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  target?: string
  rel?: string
}

export function MagneticButton({ children, className = '', href, target, rel }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const [transform, setTransform] = useState('')

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current || window.matchMedia('(max-width: 768px)').matches) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = (e.clientX - centerX) * 0.12
    const dy = (e.clientY - centerY) * 0.12

    setTransform(`translate(${dx}px, ${dy}px)`)
  }

  const handleMouseLeave = () => {
    setTransform('')
  }

  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      ref={ref as never}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform,
        transition: transform ? 'transform 0.15s ease-out' : 'transform 0.3s ease-out',
        willChange: 'transform',
      }}
    >
      {children}
    </Tag>
  )
}
