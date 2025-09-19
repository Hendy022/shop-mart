# Shop Mart - Deployment Guide

## 🚀 Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account
- Node.js installed locally

### Step 1: Prepare Your Project

1. **Test your build locally:**
   ```bash
   npm run build
   npm run start
   ```

2. **Verify all features work:**
   - Categories page
   - Brands page
   - Product filtering by category/brand
   - Authentication
   - Cart functionality

### Step 2: Create GitHub Repository

1. **Initialize Git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Shop Mart e-commerce app"
   ```

2. **Create repository on GitHub:**
   - Go to [GitHub](https://github.com)
   - Click "New repository"
   - Name: `shop-mart`
   - Description: `Modern e-commerce app built with Next.js, TypeScript, and Tailwind CSS`
   - Make it public
   - Don't initialize with README (since you already have files)

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/shop-mart.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Deploy to Vercel

1. **Go to [Vercel](https://vercel.com)**
   - Sign in with your GitHub account

2. **Import Project:**
   - Click "New Project"
   - Import your `shop-mart` repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables (if needed):**
   - Go to Project Settings → Environment Variables
   - Add any required environment variables

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Get your live URL!

### Step 4: Post-Deployment

1. **Test your live app:**
   - Visit your Vercel URL
   - Test all features
   - Check mobile responsiveness

2. **Set up custom domain (optional):**
   - Go to Project Settings → Domains
   - Add your custom domain

## 🔧 Configuration Notes

### Next.js Configuration
Your `next.config.ts` is already configured for the API images:
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'ecommerce.routemisr.com',
      port: '',
      pathname: '/Route-Academy-*/**',
    },
  ],
}
```

### API Endpoints Used
- Categories: `https://ecommerce.routemisr.com/api/v1/categories`
- Brands: `https://ecommerce.routemisr.com/api/v1/brands`
- Products: `https://ecommerce.routemisr.com/api/v1/products`
- Cart: `https://ecommerce.routemisr.com/api/v1/cart`
- Auth: `https://ecommerce.routemisr.com/api/v1/auth`

## 📱 Features Included

✅ **Responsive Design**
- Mobile-first approach
- Tailwind CSS styling
- ShadCN UI components

✅ **E-commerce Features**
- Product catalog
- Category filtering
- Brand filtering
- Shopping cart
- User authentication

✅ **Performance**
- Next.js 15 with App Router
- Image optimization
- Caching strategies

## 🐛 Troubleshooting

### Common Issues:

1. **Build Errors:**
   - Check TypeScript errors: `npm run lint`
   - Verify all imports are correct

2. **Image Loading Issues:**
   - Ensure `next.config.ts` has correct remote patterns
   - Check image URLs are accessible

3. **API Issues:**
   - Verify API endpoints are working
   - Check CORS settings

### Support:
- Check Vercel deployment logs
- Review GitHub Actions (if using)
- Test locally first

## 🎉 Success!

Once deployed, you'll have:
- Live demo URL from Vercel
- Automatic deployments on git push
- Global CDN distribution
- HTTPS enabled by default

Your app will be available at: `https://your-project-name.vercel.app`
