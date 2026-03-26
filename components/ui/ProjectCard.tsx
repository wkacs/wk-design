'use client'

import Image from 'next/image'
import type { Project } from '@/types'
import { MagneticButton } from './MagneticButton'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative z-0 flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-500 ease-out hover:z-10 hover:scale-[1.08] hover:border-border-hover hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_80px_rgba(201,164,86,0.06)]">
      {/* Image area */}
      <div className="relative h-56 w-full overflow-hidden bg-surface sm:h-64">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={`Screenshot of ${project.title}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="absolute inset-0 pattern-dots opacity-20 mask-radial" />
            <span className="font-sans text-[0.6rem] font-medium tracking-[0.35em] text-text-tertiary uppercase">
              Preview coming soon
            </span>
          </div>
        )}

        {/* Bottom gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-surface to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-7">
        <div>
          <h3 className="font-serif text-[1.5rem] font-semibold leading-tight tracking-wide text-text">
            {project.title}
          </h3>
          <p className="mt-2.5 font-sans text-[0.82rem] leading-relaxed text-text-secondary">
            {project.description}
          </p>
        </div>

        {/* Visit link — magnetic */}
        <MagneticButton
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn mt-auto inline-flex items-center gap-2.5 self-start rounded-full border border-border px-5 py-2 font-sans text-[0.62rem] font-semibold tracking-[0.28em] text-text-secondary uppercase transition-all duration-400 hover:border-accent/25 hover:text-accent"
        >
          Visit Project
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
          >
            <path
              d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </MagneticButton>
      </div>
    </div>
  )
}
