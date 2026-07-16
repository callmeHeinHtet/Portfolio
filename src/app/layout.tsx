import type { Metadata } from 'next'
import { Archivo_Black, Outfit, JetBrains_Mono } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'

// Archivo Black - Bold geometric display font
const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-clash',
  display: 'swap',
})

// Outfit - Clean modern sans
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-satoshi',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

// JetBrains Mono for code
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hein Htet Soe | Full Stack Developer & AI Specialist',
  description: 'Portfolio of Hein Htet Soe - Full Stack Developer based in Bangkok, Thailand. Specializing in AI Automation, modern web technologies, and creative digital experiences.',
  keywords: ['Full Stack Developer', 'AI Specialist', 'Web Developer', 'React', 'Next.js', 'TypeScript', 'Bangkok', 'Thailand'],
  authors: [{ name: 'Hein Htet Soe' }],
  openGraph: {
    title: 'Hein Htet Soe | Full Stack Developer & AI Specialist',
    description: 'Building intelligent web applications and modern digital experiences.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${archivoBlack.variable} ${outfit.variable} ${jetBrainsMono.variable} font-sans bg-cream text-ink antialiased`}>
        {/* Subtle grid overlay */}
        <div className="grid-overlay" aria-hidden="true" />

        <Navbar />
        {children}
      </body>
    </html>
  )
}
