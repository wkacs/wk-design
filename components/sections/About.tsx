'use client'

import { motion } from 'framer-motion'
import { GlowOrbs } from '@/components/ui/Particles'
import type { ReactNode } from 'react'

const TOOLS: { name: string; icon: ReactNode }[] = [
  {
    name: 'Figma',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5ZM12 2h3.5a3.5 3.5 0 1 1 0 7H12V2Zm0 10.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Zm-7 0A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5ZM5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0Z" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 0-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361l4.734 7.17 1.9 2.879.096-.063a12.317 12.317 0 0 0 3.122-3.218 11.896 11.896 0 0 0 2.119-5.243c.096-.659.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.86-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A21.228 21.228 0 0 0 11.572 0Zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054Z" />
      </svg>
    ),
  },
  {
    name: 'React',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236Zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.594.063-.846.187-.758.39-1.145 1.29-1.145 2.6 0 1.168.31 2.544.875 4.07A22.94 22.94 0 0 0 3.17 12c-1.424 2.02-2.17 3.87-2.17 5.222 0 1.31.387 2.21 1.145 2.6.252.124.536.187.846.187 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.604 4.887 2.604.31 0 .594-.063.846-.187.758-.39 1.145-1.29 1.145-2.6 0-1.168-.31-2.544-.875-4.07A22.946 22.946 0 0 0 20.83 12c1.424-2.02 2.17-3.87 2.17-5.222 0-1.31-.387-2.21-1.145-2.6a1.721 1.721 0 0 0-.846-.187ZM12 16.878c-2.69 0-4.878-2.19-4.878-4.878 0-2.69 2.19-4.878 4.878-4.878 2.69 0 4.878 2.19 4.878 4.878 0 2.69-2.19 4.878-4.878 4.878Z" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0Zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.42.276.69.394c.271.118.578.227.924.327.47.13.888.272 1.256.426.368.154.68.34.936.558.255.217.449.471.584.765.135.294.203.641.203 1.042 0 .553-.106 1.003-.317 1.35a2.521 2.521 0 0 1-.84.871 3.564 3.564 0 0 1-1.207.466 7.069 7.069 0 0 1-1.406.139c-.665 0-1.289-.082-1.873-.247a5.318 5.318 0 0 1-1.502-.698v-2.528c.264.218.548.407.854.567.306.159.616.29.934.392.317.1.627.172.93.215.303.043.576.064.82.064.243 0 .47-.021.678-.064.208-.043.388-.107.54-.192a.997.997 0 0 0 .363-.327.878.878 0 0 0 .132-.49.853.853 0 0 0-.181-.556c-.12-.166-.29-.317-.51-.454a5.543 5.543 0 0 0-.782-.394 12.3 12.3 0 0 0-.994-.36 6.605 6.605 0 0 1-1.14-.487 3.165 3.165 0 0 1-.831-.66 2.618 2.618 0 0 1-.508-.9c-.115-.342-.172-.738-.172-1.186 0-.534.11-.988.327-1.363.218-.375.52-.685.907-.932a4.15 4.15 0 0 1 1.354-.559 7.174 7.174 0 0 1 1.656-.185Zm-8.248 1.303H14v2.064H7.703v8.77H5.331v-8.77H1.688V11.054h9.552Z" />
      </svg>
    ),
  },
  {
    name: 'Tailwind',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8Zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12Z" />
      </svg>
    ),
  },
  {
    name: 'Framer Motion',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 0h16v8h-8ZM4 8h8l8 8H4ZM4 16h8v8Z" />
      </svg>
    ),
  },
  {
    name: 'Vercel',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L24 22H0Z" />
      </svg>
    ),
  },
  {
    name: 'Git',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.546 10.93 13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.66 2.66a1.838 1.838 0 1 1-1.103 1.043l-2.48-2.48v6.53a1.838 1.838 0 1 1-1.512-.121V8.733a1.838 1.838 0 0 1-.998-2.413L7.629 3.586.452 10.765a1.55 1.55 0 0 0 0 2.188l10.48 10.48a1.55 1.55 0 0 0 2.186 0l10.43-10.43a1.55 1.55 0 0 0 0-2.073Z" />
      </svg>
    ),
  },
]

export function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-4xl overflow-hidden px-6 py-28 sm:px-10"
    >
      <GlowOrbs count={2} />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:gap-14 sm:text-left"
      >
        {/* Avatar placeholder / monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-accent/15 bg-accent/[0.04]"
        >
          <span className="gold-text font-serif text-xl font-bold">WK</span>
        </motion.div>

        {/* Text */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-float-slow mb-1 font-sans text-[0.58rem] font-semibold tracking-[0.5em] text-accent-muted uppercase">
              About
            </p>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-wide text-text">
              Built by a designer who cares
            </h2>
          </div>

          <p className="max-w-xl font-sans text-[0.88rem] leading-[1.8] text-text-secondary">
            I’m a freelance web designer and developer creating websites that don’t just look good they get results.
Every project begins by understanding your business, your goals, and your users, then designing and building a site that guides visitors to take action.
No templates. No shortcuts. Just clean, high-performing websites built to convert.
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-6 sm:gap-8">
            <div className="flex flex-col">
              <span className="gold-text font-serif text-2xl font-bold">2025</span>
              <span className="text-float-alt font-sans text-[0.6rem] font-medium tracking-[0.3em] text-text-tertiary uppercase">Founded</span>
            </div>
            <div className="h-6 w-px bg-border" />
            <div className="flex flex-col">
              <span className="gold-text font-serif text-2xl font-bold">UI/UX</span>
              <span className="text-float-alt font-sans text-[0.6rem] font-medium tracking-[0.3em] text-text-tertiary uppercase">Focus</span>
            </div>
            <div className="h-6 w-px bg-border" />
            <div className="flex flex-col">
              <span className="gold-text font-serif text-2xl font-bold">100%</span>
              <span className="text-float-alt font-sans text-[0.6rem] font-medium tracking-[0.3em] text-text-tertiary uppercase">Custom</span>
            </div>
          </div>

          {/* Tools with icons */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {TOOLS.map((tool, i) => (
              <motion.span
                key={tool.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 font-sans text-[0.65rem] font-medium text-text-secondary transition-colors duration-300 hover:border-accent/20 hover:text-text"
              >
                <span className="opacity-60">{tool.icon}</span>
                {tool.name}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
