import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AudioPlayer from '@/components/AudioPlayer'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Stuk Verdriet',
  description: 'Een nuchtere podcast over rouw en het verliezen van een kind.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Stuk Verdriet',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={inter.variable}>
      <body className="bg-background text-foreground min-h-screen flex flex-col font-sans mb-24">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl">
          {children}
        </main>
        <AudioPlayer />
      </body>
    </html>
  )
}
