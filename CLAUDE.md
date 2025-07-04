# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Japanese donation site (投げ銭サイト) built with Next.js and Stripe integration. The project implements a minimal viable product for accepting donations with a simple UI for amount input and payment processing.

## Architecture

- **Frontend**: Next.js with React hooks for state management
- **Styling**: Tailwind CSS for responsive design
- **Payment Processing**: Stripe Checkout for secure payment handling
- **API**: Next.js API routes for server-side Stripe integration
- **Deployment**: Configured for Vercel deployment

## Key Components Structure

Based on the documentation, the expected file structure is:

```
pages/
├── api/
│   └── create-checkout-session.js  # Stripe payment session creation
├── index.js                        # Main donation page with amount input
└── success.js                      # Payment success/confirmation page
```

## Development Commands

This project uses standard Next.js commands:

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Required environment variables (in `.env.local`):

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## Key Implementation Details

- **Payment Flow**: Uses Stripe Checkout sessions for secure payment processing
- **Currency**: Configured for Japanese Yen (JPY)
- **Amount Handling**: Accepts integer amounts (no decimal places for JPY)
- **Error Handling**: Basic client-side validation and error messaging
- **Success Flow**: Redirects to success page with amount parameter, auto-redirects to home after 5 seconds

## Security Considerations

- All payment data is handled by Stripe (PCI DSS compliant)
- Environment variables must be properly secured
- No sensitive data should be committed to the repository
- HTTPS is required for production (automatically handled by Vercel)

## Testing

Use Stripe test cards for development:
- Success: 4242 4242 4242 4242
- Failure: 4000 0000 0000 0002

## Production Deployment

- Configure production Stripe keys in Vercel environment variables
- Ensure Stripe account is activated for live payments
- Update API keys from test to live mode