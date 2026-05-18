import type { Metadata } from 'next'
import { Syncopate, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import ChromeBackground from '@/components/layout/ChromeBackground'
import Dock from '@/components/layout/Dock'
import PageTransition from '@/components/layout/PageTransition'
import TopNav from '@/components/layout/TopNav/TopNav'
import '@/styles/globals.css'

const syncopate = Syncopate({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-title',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'OWAH.WORLD',
  description: 'A living operating system.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${syncopate.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ChromeBackground />
        <TopNav />
        <PageTransition>
          {children}
        </PageTransition>
        <Dock />
      </body>
    </html>
  )
}
