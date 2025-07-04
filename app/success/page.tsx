'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, Heart, ArrowLeft } from 'lucide-react'

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const amount = searchParams.get('amount')
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleGoHome = () => {
    router.push('/')
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
      {/* Demo Mode Alert */}
      <div className="w-full max-w-md mx-auto mb-4 px-4">
        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-blue-700 text-center text-sm">
            🧪 <strong>テストモード:</strong> 実際の課金は発生していません
          </AlertDescription>
        </Alert>
      </div>
      
      <Card className="w-full max-w-md mx-auto text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <div className="absolute -top-2 -right-2">
                <Heart className="h-8 w-8 text-pink-500 animate-pulse" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">
            ご支援ありがとうございました！
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-lg text-gray-600">
              決済が正常に完了しました
            </p>
            {amount && (
              <div className="flex justify-center">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  ¥{parseInt(amount).toLocaleString()}
                </Badge>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">
              🎉 あなたの温かいご支援により、創作活動を続けることができます
            </p>
            <p className="text-sm text-gray-700">
              💝 心より感謝申し上げます
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleGoHome}
              className="w-full"
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              トップページに戻る
            </Button>
            
            <div className="text-xs text-gray-500">
              <p>
                {countdown > 0 ? (
                  <>
                    <span className="font-medium">{countdown}秒後</span>
                    に自動的にトップページに戻ります
                  </>
                ) : (
                  'トップページに戻ります...'
                )}
              </p>
            </div>
          </div>

          <div className="text-xs text-gray-400 border-t pt-4">
            <p>決済完了メールが送信されました</p>
            <p>お問い合わせがございましたら、メールの内容をご確認ください</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}