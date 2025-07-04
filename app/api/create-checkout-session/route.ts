import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json()

    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: '金額は100円以上で入力してください' },
        { status: 400 }
      )
    }

    if (amount > 1000000) {
      return NextResponse.json(
        { error: '金額は1,000,000円以下で入力してください' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: '投げ銭',
              description: 'ご支援ありがとうございます！',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/success?amount=${amount}`,
      cancel_url: `${request.nextUrl.origin}/`,
      metadata: {
        amount: amount.toString(),
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'チェックアウトセッションの作成に失敗しました' },
      { status: 500 }
    )
  }
}