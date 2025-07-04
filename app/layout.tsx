import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '投げ銭で応援',
  description: 'あなたの応援が創作活動の励みになります',
  metadataBase: new URL('https://your-domain.vercel.app'), // Replace with your actual domain
  openGraph: {
    title: '投げ銭で応援',
    description: 'あなたの応援が創作活動の励みになります',
    url: 'https://your-domain.vercel.app',
    siteName: '投げ銭サイト',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '投げ銭で応援 - あなたの応援が創作活動の励みになります',
      }
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '投げ銭で応援',
    description: 'あなたの応援が創作活動の励みになります',
    images: ['/og-image.jpg'],
    creator: '@yourtwitter', // Replace with your Twitter handle
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: '#f97316',
  alternates: {
    canonical: 'https://your-domain.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
          {children}
        </main>
      </body>
    </html>
  )
}