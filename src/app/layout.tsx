import type { Metadata } from 'next'
import ChromeBackground from '@/components/layout/ChromeBackground'
import Dock from '@/components/layout/Dock'
import PageTransition from '@/components/layout/PageTransition'
import TopNav from '@/components/layout/TopNav/TopNav'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'OWAH.WORLD',
  description: 'A living operating system.',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
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
