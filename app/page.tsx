import DonationForm from '@/components/donation-form'
import DemoBanner from '@/components/demo-banner'
import { Heart } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
      {/* Demo Banner - Only show in development/test mode */}
      <DemoBanner />
      
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Heart className="h-8 w-8 text-pink-500 mr-2" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            投げ銭サイト
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          あなたの温かい応援が、創作活動を続ける大きな力となります。
          心より感謝申し上げます。
        </p>
      </div>
      
      <DonationForm />
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Stripe決済システムを使用しています</p>
        <p>クレジットカード情報は安全に暗号化されます</p>
      </div>
    </div>
  )
}