# 投げ銭サイト (Donation Site)

A modern donation site built with Next.js 14, TypeScript, shadcn/ui, and Stripe integration.

## Features

- Modern UI with shadcn/ui components
- TypeScript for type safety
- Stripe integration for secure payments
- Responsive design
- Form validation with Zod
- Japanese localization
- **Demo mode with test card instructions**
- **Copy-to-clipboard functionality for test cards**
- **Clear safety indicators for demo usage**

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Payment**: Stripe
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

3. Add your Stripe keys to `.env.local`:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Stripe Test Cards

For testing payments in development, use these test card numbers:

| Test Case | Card Number | CVC | Date | ZIP |
|-----------|-------------|-----|------|-----|
| ✅ Success | 4242 4242 4242 4242 | Any 3 digits | Any future date | Any 5 digits |
| ❌ Decline | 4000 0000 0000 0002 | Any 3 digits | Any future date | Any 5 digits |
| 🔄 Processing | 4000 0000 0000 0119 | Any 3 digits | Any future date | Any 5 digits |

## Project Structure

```
├── app/
│   ├── api/create-checkout-session/
│   ├── success/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   └── donation-form.tsx
├── lib/
│   ├── stripe.ts
│   ├── utils.ts
│   └── validations.ts
└── types/
    └── index.ts
```

## Testing Your Donation Site

### Start the Development Server
```bash
npm run dev
```

### Test the Payment Flow
1. Open [http://localhost:3000](http://localhost:3000)
2. **Click "テスト方法を見る" (View Test Instructions)** to see demo banner
3. **Copy test card numbers** using the copy buttons provided
4. Enter a donation amount or select a preset
5. Click "送金する" (Send Money)
6. Use the copied test card numbers in Stripe checkout
7. Verify redirect to success page with demo notice

### Demo Features
- **🧪 Demo Banner**: Clear indication this is a test environment
- **📋 Test Card Instructions**: Expandable section with copy-to-clipboard
- **✅ Safety Indicators**: Multiple notices that no real money is charged
- **🔄 Multiple Test Scenarios**: Success, failure, and processing test cases

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed production deployment instructions.

**Quick Vercel Deployment:**
1. Push to GitHub
2. Connect to Vercel
3. Add your live Stripe keys as environment variables
4. Deploy

## License

MIT