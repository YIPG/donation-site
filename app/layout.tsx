import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '投げ銭で応援',
  description: 'あなたの応援が創作活動の励みになります',
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