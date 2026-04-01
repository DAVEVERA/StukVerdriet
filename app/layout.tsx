import './globals.css'
import type { Metadata } from 'next'
import { Rethink_Sans, Jost } from 'next/font/google'
import AudioPlayer from '@/components/AudioPlayer'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const rethinkSans = Rethink_Sans({ subsets: ['latin'], variable: '--font-rethink-sans', weight: ['400', '500', '600', '700', '800'], display: 'swap' })
const jost = Jost({ subsets: ['latin'], variable: '--font-jost', weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], style: ['normal', 'italic'], display: 'swap' })

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://stukverdriet.nl'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Stuk Verdriet — Een podcast over rouw en verlies',
    template: '%s | Stuk Verdriet',
  },
  description:
    'Stuk Verdriet is een podcast over het verlies van een kind, partner of dierbare. Over hoe rouw voelt, hoe het je leven ontwricht, en waarom iedereen anders rouwt maar daarin toch hetzelfde zoekt.',
  keywords: [
    'rouw', 'verlies', 'podcast', 'kind verloren', 'rouwverwerking',
    'stukverdriet', 'Eva Kroot', 'longeneeslijk', 'rouwen', 'verdriet',
    'babyloss', 'stilgeboren', 'miskraam', 'nabestaanden',
  ],
  authors: [{ name: 'Eva Kroot', url: BASE_URL }],
  creator: 'Eva Kroot',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: BASE_URL,
    siteName: 'Stuk Verdriet',
    title: 'Stuk Verdriet — Een podcast over rouw en verlies',
    description: 'Een podcast over het verlies van een kind, partner of dierbare. Eerlijk, nuchter en menselijk.',
    images: [{ url: '/images/stukverdriet_hero.png', width: 1200, height: 630, alt: 'Stuk Verdriet' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stuk Verdriet — Een podcast over rouw en verlies',
    description: 'Een podcast over rouw, verlies en verwerking. Eerlijk, nuchter en menselijk.',
    images: ['/images/stukverdriet_hero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Stuk Verdriet' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${rethinkSans.variable} ${jost.variable}`}>
      <body className="bg-background text-foreground min-h-screen flex flex-col font-sans antialiased">
        <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-40" />
        <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-secondary/8 blur-[100px] rounded-full pointer-events-none opacity-30" />
        <Header />
        <main className="flex-grow z-10 w-full">
          {children}
        </main>
        <Footer />
        <AudioPlayer />
      </body>
    </html>
  )
}
