'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, CircleDollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { donationSchema, type DonationFormData } from '@/lib/validations'
import getStripe from '@/lib/stripe'
import type { CheckoutSessionResponse } from '@/types'

const presetAmounts = [500, 1000, 3000, 5000, 10000]

export default function DonationForm() {
  const [loading, setLoading] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
  })

  const amount = watch('amount')

  const handlePresetAmount = (presetAmount: number) => {
    setSelectedAmount(presetAmount)
    setValue('amount', presetAmount)
  }

  const onSubmit = async (data: DonationFormData) => {
    setLoading(true)

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: data.amount,
        }),
      })

      const { sessionId }: CheckoutSessionResponse = await response.json()

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const stripe = await getStripe()
      if (!stripe) {
        throw new Error('Stripe failed to initialize')
      }

      const { error } = await stripe.redirectToCheckout({ sessionId })
      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('エラーが発生しました。もう一度お試しください。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">投げ銭で応援</CardTitle>
        <CardDescription>
          あなたの応援が創作活動の励みになります
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Preset Amount Buttons */}
          <div className="space-y-3">
            <p className="text-sm font-medium">金額を選択</p>
            <div className="grid grid-cols-3 gap-2">
              {presetAmounts.map((presetAmount) => (
                <Button
                  key={presetAmount}
                  type="button"
                  variant={selectedAmount === presetAmount ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePresetAmount(presetAmount)}
                  disabled={loading}
                  className="text-xs"
                >
                  ¥{presetAmount.toLocaleString()}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount Input */}
          <div className="space-y-2">
            <p className="text-sm font-medium">または金額を入力</p>
            <div className="relative">
              <CircleDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="number"
                placeholder="金額を入力"
                className="pl-10"
                disabled={loading}
                {...register('amount', { valueAsNumber: true })}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0
                  setValue('amount', value)
                  setSelectedAmount(value)
                }}
              />
            </div>
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={loading || !amount || amount <= 0}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                処理中...
              </>
            ) : (
              <>
                <CircleDollarSign className="mr-2 h-4 w-4" />
                {amount && amount > 0 ? `¥${amount.toLocaleString()}を送金` : '金額を入力してください'}
              </>
            )}
          </Button>
        </form>

        {/* Security Notice */}
        <div className="text-center text-xs text-gray-500">
          <p>安全なStripe決済を使用しています</p>
          <p>カード情報は暗号化されて保護されます</p>
        </div>
      </CardContent>
    </Card>
  )
}