import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'WK Design',
  description:
    'Freelance web designer and developer crafting premium, user-centered websites. Custom design, clean code, no templates.',
  openGraph: {
    title: 'WK Design',
    description: 'Freelance web design & development — I craft websites that leave a mark.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-base text-text antialiased">{children}</body>
    </html>
  )
}
