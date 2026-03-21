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
      <body className="bg-background text-foreground min-h-screen flex flex-col font-sans mb-32 selection:bg-secondary/30 selection:text-foreground">
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none opacity-50"></div>
        <Header />
        <main className="flex-grow z-10 w-full animate-in fade-in duration-500">
          {children}
        </main>
        <AudioPlayer />
      </body>
    </html>
  )
}
