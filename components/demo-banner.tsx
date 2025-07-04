'use client'

import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, Copy, ChevronDown, ChevronUp, Info } from 'lucide-react'

const testCards = [
  {
    type: '成功',
    description: '決済が成功します',
    number: '4242 4242 4242 4242',
    color: 'bg-green-100 text-green-800',
    icon: '✅'
  },
  {
    type: '失敗',
    description: '決済が失敗します',
    number: '4000 0000 0000 0002',
    color: 'bg-red-100 text-red-800',
    icon: '❌'
  },
  {
    type: '処理中',
    description: '決済処理が必要です',
    number: '4000 0000 0000 0119',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '🔄'
  }
]

export default function DemoBanner() {
  const [showInstructions, setShowInstructions] = useState(false)
  const [copiedCard, setCopiedCard] = useState<string | null>(null)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCard(text)
      setTimeout(() => setCopiedCard(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-6 sm:mb-8 space-y-3 sm:space-y-4 px-4 sm:px-0">
      {/* Main Demo Alert */}
      <Alert className="bg-blue-50 border-blue-200">
        <AlertTitle className="text-blue-800 mb-2">
          🧪 デモモード - テスト環境
        </AlertTitle>
        <AlertDescription className="text-blue-700">
          <div className="space-y-3">
            <p className="text-sm sm:text-base">これはデモサイトです。<strong>実際の料金は発生しません</strong>。テスト用カード番号でお試しください。</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInstructions(!showInstructions)}
              className="text-blue-700 border-blue-300 hover:bg-blue-100 w-full sm:w-auto"
            >
              {showInstructions ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" />
                  テスト方法を隠す
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" />
                  テスト方法を見る
                </>
              )}
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      {/* Expandable Instructions */}
      {showInstructions && (
        <Card className="bg-white border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <CreditCard className="mr-2 h-5 w-5" />
              テスト用クレジットカード番号
            </CardTitle>
            <CardDescription>
              以下のテスト用カード番号を使用してください。有効期限・CVC・郵便番号は任意の値で構いません。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
            {testCards.map((card, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg border bg-gray-50 space-y-3 sm:space-y-0"
              >
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${card.color}`}>
                    {card.icon} {card.type}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm font-medium break-all">{card.number}</p>
                    <p className="text-xs text-gray-600 mt-1">{card.description}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(card.number.replace(/\s/g, ''))}
                  className="w-full sm:w-auto sm:ml-2 min-h-[44px]"
                >
                  {copiedCard === card.number.replace(/\s/g, '') ? (
                    <>
                      <span className="text-green-600">✓</span>
                      <span className="ml-1 text-xs">コピー済み</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span className="ml-1 text-xs">コピー</span>
                    </>
                  )}
                </Button>
              </div>
            ))}

            <Alert className="bg-yellow-50 border-yellow-200">
              <Info className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>その他の入力項目:</strong>
                <ul className="mt-2 text-sm space-y-1">
                  <li>• <strong>有効期限:</strong> 任意の未来の日付（例: 12/25）</li>
                  <li>• <strong>CVC:</strong> 任意の3桁数字（例: 123）</li>
                  <li>• <strong>郵便番号:</strong> 任意の5桁数字（例: 12345）</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="text-center text-sm text-gray-600 bg-green-50 p-3 rounded-lg border border-green-200">
              <p className="font-medium text-green-800">✅ 安全性について</p>
              <p className="mt-1">
                テストモードでは、実際のクレジットカード情報を入力しても<strong>絶対に課金されません</strong>。
                Stripeが自動的に保護します。
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}