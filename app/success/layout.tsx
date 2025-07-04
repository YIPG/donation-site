import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '寄付完了 - 投げ銭で応援',
  description: 'ご支援ありがとうございました。あなたの温かいご支援により、創作活動を続けることができます。',
  openGraph: {
    title: '寄付完了 - 投げ銭で応援',
    description: 'ご支援ありがとうございました。あなたの温かいご支援により、創作活動を続けることができます。',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '寄付完了 - 投げ銭で応援',
    description: 'ご支援ありがとうございました。あなたの温かいご支援により、創作活動を続けることができます。',
  },
}

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}