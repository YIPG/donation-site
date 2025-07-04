# Stripeを使った投げ銭サイト構築ガイド

## 概要

このドキュメントでは、Stripeのみを使用してシンプルな投げ銭サイトを構築する方法を説明します。必要最小限の機能で、最速でサービスを開始することを目的としています。

## システム構成

- **フロントエンド**: Next.js + Tailwind CSS
- **決済処理**: Stripe Checkout
- **デプロイ**: Vercel
- **必要な機能**: 金額入力フィールド + 送金ボタンのみ

## 前提条件

- Node.js 16以上がインストールされていること
- Stripeアカウントを持っていること（無料で作成可能）
- 基本的なJavaScript/Reactの知識

## セットアップ手順

### 1. Stripeアカウントの準備

1. [Stripe](https://stripe.com/jp)にアクセスしてアカウントを作成
2. ダッシュボードにログイン
3. 開発者セクションからAPIキーを取得
   - **公開可能キー**: `pk_test_` で始まるキー
   - **シークレットキー**: `sk_test_` で始まるキー

### 2. プロジェクトの作成

```bash
# Next.jsプロジェクトを作成
npx create-next-app@latest donation-site
cd donation-site

# 必要なパッケージをインストール
npm install stripe @stripe/stripe-js

# Tailwind CSSの設定（create-next-appで自動設定される場合は不要）
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. 環境変数の設定

プロジェクトルートに `.env.local` ファイルを作成：

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_あなたの公開可能キー
STRIPE_SECRET_KEY=sk_test_あなたのシークレットキー
```

### 4. ファイル構成

```
donation-site/
├── pages/
│   ├── api/
│   │   └── create-checkout-session.js  # Stripe API処理
│   ├── index.js                        # メインページ
│   └── success.js                      # 決済成功ページ
├── .env.local                          # 環境変数
└── package.json
```

## 実装コード

### 1. Stripe APIエンドポイント (`pages/api/create-checkout-session.js`)

```javascript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount } = req.body;
    
    // Stripe Checkoutセッションを作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'jpy',
          product_data: {
            name: '投げ銭',
            description: 'ご支援ありがとうございます！',
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.origin}/success?amount=${amount}`,
      cancel_url: `${req.headers.origin}/`,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### 2. メインページ (`pages/index.js`)

```javascript
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDonation = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('金額を入力してください');
      return;
    }

    setLoading(true);

    try {
      // APIエンドポイントを呼び出し
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseInt(amount),
        }),
      });

      const { sessionId } = await response.json();
      
      // Stripeのチェックアウトページにリダイレクト
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      alert('エラーが発生しました');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="bg-white p-12 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          投げ銭で応援
        </h1>
        
        <div className="space-y-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500">
              ¥
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="金額を入力"
              className="w-full pl-12 pr-4 py-4 text-2xl border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              disabled={loading}
            />
          </div>
          
          <button
            onClick={handleDonation}
            disabled={loading}
            className={`w-full py-4 text-xl font-semibold rounded-lg transition-all ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
            }`}
          >
            {loading ? '処理中...' : '送金する'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 3. 決済成功ページ (`pages/success.js`)

```javascript
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Success() {
  const router = useRouter();
  const { amount } = router.query;

  useEffect(() => {
    // 5秒後にホームに戻る
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white p-12 rounded-2xl shadow-xl max-w-md w-full text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          ありがとうございました！
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {amount && `¥${parseInt(amount).toLocaleString()}`}の投げ銭を受け取りました
        </p>
        <p className="text-gray-500">
          5秒後にトップページに戻ります...
        </p>
      </div>
    </div>
  );
}
```

### 4. Tailwind設定 (`tailwind.config.js`)

```javascript
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## テスト方法

### ローカル環境での起動

```bash
npm run dev
# http://localhost:3000 でアクセス
```

### テスト用カード情報

| テストケース | カード番号 | 有効期限 | CVC | 郵便番号 |
|------------|-----------|---------|-----|---------|
| 成功 | 4242 4242 4242 4242 | 任意の未来日 | 任意の3桁 | 任意の5桁 |
| 失敗 | 4000 0000 0000 0002 | 任意の未来日 | 任意の3桁 | 任意の5桁 |

## Stripeダッシュボードの設定

### 1. 基本設定

- **ビジネス情報**: 会社名や連絡先を設定
- **明細書の記述子**: カード明細に表示される名前（例：「投げ銭」）

### 2. メール通知のカスタマイズ

1. 設定 → ビジネス設定 → メール
2. ロゴをアップロード
3. ブランドカラーを設定
4. カスタマーメールを有効化

### 3. 支払い方法の設定

- 設定 → 支払い方法
- カード決済を有効化
- 必要に応じてApple Pay、Google Payも有効化

## デプロイ

### Vercelへのデプロイ

1. GitHubにプッシュ
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin あなたのリポジトリURL
git push -u origin main
```

2. Vercelでデプロイ
```bash
# Vercel CLIを使用
npm i -g vercel
vercel

# または、Vercelダッシュボードから
# 1. https://vercel.com にアクセス
# 2. GitHubリポジトリをインポート
# 3. 環境変数を設定
```

3. 環境変数の設定
- Vercelダッシュボード → Settings → Environment Variables
- `STRIPE_SECRET_KEY` を追加（Production環境用）

## 本番環境への移行

### 1. Stripe本番環境の有効化

1. Stripeダッシュボード → 本番環境を有効化
2. 本人確認書類の提出
3. 銀行口座情報の登録

### 2. APIキーの更新

本番用の環境変数を設定：
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_あなたの本番公開キー
STRIPE_SECRET_KEY=sk_live_あなたの本番シークレットキー
```

### 3. Vercelの環境変数を更新

Production環境の変数を本番キーに更新

## 手数料と費用

### Stripe手数料
- **国内カード**: 3.6%
- **海外カード**: 3.6%
- **固定費用**: なし（決済ごとの手数料のみ）

### その他の費用
- **Vercel**: 無料（個人利用の場合）
- **ドメイン**: 年間1,000円〜（オプション）

## セキュリティに関する注意事項

1. **環境変数の管理**
   - シークレットキーは絶対に公開しない
   - `.env.local` はGitにコミットしない

2. **HTTPS必須**
   - Vercelは自動的にHTTPSを提供
   - カスタムドメインもHTTPS対応

3. **PCI DSS準拠**
   - Stripe Checkoutを使用することで自動的に準拠
   - カード情報はサーバーに保存されない

## トラブルシューティング

### よくある問題と解決方法

| 問題 | 原因 | 解決方法 |
|-----|------|---------|
| 決済画面が表示されない | APIキーが間違っている | 環境変数を確認 |
| 404エラー | APIルートが正しくない | ファイル名とパスを確認 |
| CORSエラー | ドメインの不一致 | success_urlとcancel_urlを確認 |

## 今後の拡張アイデア

1. **UI/UXの改善**
   - 金額プリセットボタン（500円、1000円、3000円）
   - アニメーション効果
   - ダークモード対応

2. **機能追加**
   - 定期支援（サブスクリプション）
   - 支援者へのメッセージ機能
   - 支援履歴の表示

3. **通知システム**
   - Webhook実装
   - メール通知のカスタマイズ
   - Slack/Discord通知

## まとめ

このガイドに従えば、1時間以内に投げ銭サイトを立ち上げることができます。まずは最小限の機能で始めて、ユーザーの反応を見ながら段階的に機能を追加していくことをお勧めします。

## 参考リンク

- [Stripe公式ドキュメント](https://stripe.com/docs)
- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [Vercelドキュメント](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)