# Deployment Guide

## 🚀 Production Deployment Process

### Prerequisites
- Stripe account with business verification completed
- Live Stripe API keys obtained
- Vercel account (recommended) or other hosting platform

### Step 1: Prepare for Production

#### Get Live Stripe Keys
1. Log in to your Stripe Dashboard
2. Navigate to Developers → API keys
3. Click "Reveal live key" for your secret key ⚠️ **Only shown once!**
4. Copy both keys immediately:
   - Live Publishable Key: `pk_live_...`
   - Live Secret Key: `sk_live_...`

#### Update Environment Variables
Create production environment variables:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_live_key
STRIPE_SECRET_KEY=sk_live_your_actual_live_key
```

### Step 2: Deploy to Vercel

#### Method 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_SECRET_KEY production

# Redeploy with new env vars
vercel --prod
```

#### Method 2: Vercel Dashboard
1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - Settings → Environment Variables
   - Add both Stripe keys for Production environment
4. Deploy

### Step 3: Test Production Deployment

#### Test with Real Cards
⚠️ **Important**: Use real credit cards in production, not test cards

#### Monitor Transactions
1. Check Stripe Dashboard → Payments
2. Monitor successful payments and any errors
3. Set up webhooks if needed for advanced features

### Step 4: Post-Deployment

#### Security Checklist
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Confirm no keys are committed to version control
- [ ] Test payment flow on production URL
- [ ] Set up monitoring and alerts

#### Performance Optimization
- [ ] Enable Vercel Analytics
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure CDN for static assets

## 🧪 Testing Instructions

### Development Testing (Test Mode)
Use these test card numbers in your development environment:

| Test Case | Card Number | CVC | Date | ZIP |
|-----------|-------------|-----|------|-----|
| ✅ Success | 4242 4242 4242 4242 | Any 3 digits | Any future date | Any 5 digits |
| ❌ Decline | 4000 0000 0000 0002 | Any 3 digits | Any future date | Any 5 digits |
| 🔄 Processing | 4000 0000 0000 0119 | Any 3 digits | Any future date | Any 5 digits |

### Production Testing (Live Mode)
- Use real credit cards
- Test small amounts first (¥100-¥500)
- Verify receipt emails are sent
- Check Stripe dashboard for transactions

## 📊 Monitoring

### Stripe Dashboard
- Monitor payments in real-time
- View success/failure rates
- Track revenue and trends

### Application Monitoring
- Check Vercel deployment logs
- Monitor API response times
- Set up alerts for payment failures

## 🔧 Troubleshooting

### Common Issues

#### "Invalid API Key" Error
- Verify keys are correctly set in environment variables
- Check if using test keys in production or vice versa
- Ensure no extra spaces or characters in keys

#### Payment Failures
- Check Stripe Dashboard → Logs for detailed error messages
- Verify webhook endpoints (if using webhooks)
- Test with different card types

#### Build Failures
- Ensure all environment variables are set
- Check for TypeScript errors
- Verify all dependencies are installed

## 📈 Next Steps

### Additional Features to Consider
1. **Recurring Donations**: Set up Stripe Subscriptions
2. **Custom Amounts**: Allow users to enter any amount
3. **Donation Goals**: Show progress toward fundraising targets
4. **Donor Management**: Track and thank donors
5. **Webhooks**: Handle payment events for advanced features

### Security Enhancements
1. **Rate Limiting**: Prevent abuse of donation endpoints
2. **Fraud Detection**: Use Stripe Radar for fraud prevention
3. **Compliance**: Ensure PCI compliance and data protection

## 🆘 Support

### Getting Help
- **Stripe Support**: Available 24/7 via dashboard
- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Support**: Available via dashboard

### Community Resources
- Stripe Developer Community
- Next.js GitHub Discussions
- Stack Overflow with relevant tags