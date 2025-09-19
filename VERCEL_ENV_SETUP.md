# Vercel Environment Variables Setup

To fix the deployment issues, you need to set up the following environment variables in your Vercel dashboard:

## Required Environment Variables

1. **NEXTAUTH_SECRET**
   - Go to your Vercel dashboard → Project Settings → Environment Variables
   - Add a new variable:
     - Name: `NEXTAUTH_SECRET`
     - Value: Generate a random secret (you can use: `openssl rand -base64 32`)
     - Environment: Production, Preview, Development

2. **NEXTAUTH_URL**
   - Add another variable:
     - Name: `NEXTAUTH_URL`
     - Value: `https://shop-mart-hs72.vercel.app`
     - Environment: Production, Preview, Development

3. **API**
   - Add another variable:
     - Name: `API`
     - Value: `https://ecommerce.routemisr.com/api/v1`
     - Environment: Production, Preview, Development

## How to Set Environment Variables in Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Select your project (shop-mart)
3. Click on "Settings" tab
4. Click on "Environment Variables" in the left sidebar
5. Add each variable with the values above
6. Make sure to select all environments (Production, Preview, Development)
7. Click "Save" for each variable
8. Redeploy your application

## After Setting Environment Variables

1. Go to the "Deployments" tab in your Vercel dashboard
2. Click the three dots on your latest deployment
3. Click "Redeploy"
4. Wait for the deployment to complete

## Verification

After redeployment, your application should work without the following errors:
- ✅ NextAuth session API 500 error should be resolved
- ✅ CORS policy errors should be resolved
- ✅ Cart API should work properly
- ✅ Checkout session should use the correct URL
- ✅ AddToCart should work without redirecting to home
- ✅ Cart should update immediately after adding items

## Debugging Steps

If cart functionality still doesn't work:

1. **Check browser console** for any error messages
2. **Check Vercel function logs**:
   - Go to Vercel Dashboard → Functions tab
   - Look for `/get-cart` function logs
   - Check for any error messages

3. **Test the API directly**:
   - Visit `https://shop-mart-hs72.vercel.app/get-cart` in your browser
   - Check if it returns cart data or an error

4. **Verify environment variables**:
   - Make sure all three variables are set correctly
   - Redeploy after setting them

## Local Development

For local development, create a `.env.local` file in your project root with:

```
NEXTAUTH_SECRET=your-local-secret-key
NEXTAUTH_URL=http://localhost:3000
API=https://ecommerce.routemisr.com/api/v1
```

**Note:** Never commit `.env.local` to version control.
