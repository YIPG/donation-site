# 🚀 Deployment Checklist

## ✅ Pre-Deployment (Completed)
- [x] PII audit passed - no sensitive information in code
- [x] Git repository initialized
- [x] Initial commit created
- [x] .env.local properly excluded from version control
- [x] All source code ready for public sharing

## 📝 GitHub Repository Setup
1. Go to [GitHub New Repository](https://github.com/new)
2. **Repository name**: `donation-site-demo` or `stripe-donation-nextjs`
3. **Description**: `Modern donation site built with Next.js 14, TypeScript, shadcn/ui, and Stripe integration`
4. **Visibility**: Public
5. **Initialize**: Don't check any initialization options (we have files already)
6. Click **"Create repository"**

## 🔗 Connect and Push to GitHub
```bash
# Replace YOUR_USERNAME and REPOSITORY_NAME with actual values
git remote add origin https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git
git branch -M main
git push -u origin main
```

## 🌐 Vercel Deployment

### Method 1: Dashboard (Recommended)
1. Go to [Vercel New Project](https://vercel.com/new)
2. **Import** your GitHub repository
3. **Framework**: Next.js (auto-detected)
4. **Environment Variables** (Add these):
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = your_stripe_publishable_key_here
   STRIPE_SECRET_KEY = your_stripe_secret_key_here
   ```
5. Click **"Deploy"**

### Method 2: CLI
```bash
npm i -g vercel
vercel
# Follow prompts, then add environment variables
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_SECRET_KEY production
vercel --prod
```

## 🧪 Testing Your Live Site
- Click demo banner "テスト方法を見る" to see test instructions
- Try preset amounts or enter custom amount
- Use test card: **4242 4242 4242 4242**
- Any future date, any CVC, any ZIP
- Verify success page shows with demo notice

## 🎉 Share Your Demo
Once deployed, you can share the URL with friends to showcase:
- Modern Next.js 14 + TypeScript architecture
- Beautiful shadcn/ui design system
- Mobile-first responsive design
- Stripe payment integration
- Professional development practices

## ⚠️ Important Notes
- ✅ This uses Stripe **test mode** - no real charges
- ✅ All sensitive data is properly secured
- ✅ Safe to share publicly
- ✅ Perfect for portfolio/demo purposes

## 🔄 Future Updates
To update your live site:
```bash
git add .
git commit -m "Your update message"
git push
# Vercel will auto-deploy from GitHub
```