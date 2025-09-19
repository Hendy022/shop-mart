# 🛒 Shop Mart - Modern E-commerce App

A full-featured e-commerce application built with Next.js 15, TypeScript, and Tailwind CSS, featuring a modern UI with ShadCN components.

## ✨ Features

### 🛍️ E-commerce Functionality
- **Product Catalog** - Browse all available products
- **Category Filtering** - Filter products by categories
- **Brand Filtering** - Filter products by brands
- **Product Details** - Detailed product information with images
- **Shopping Cart** - Add/remove items, quantity management
- **User Authentication** - Login and registration system
- **Order Management** - View order history

### 🎨 Modern UI/UX
- **Responsive Design** - Mobile-first approach
- **ShadCN Components** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first styling
- **Dark/Light Mode** - Theme support
- **Loading States** - Smooth user experience
- **Toast Notifications** - User feedback

### ⚡ Performance
- **Next.js 15** - Latest React framework
- **App Router** - Modern routing system
- **Image Optimization** - Next.js Image component
- **Caching** - Optimized data fetching
- **TypeScript** - Type safety

## 🚀 Live Demo

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/shop-mart)

**Live Demo:** [https://your-project-name.vercel.app](https://your-project-name.vercel.app)

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN/UI
- **Authentication:** NextAuth.js
- **State Management:** React Context
- **Form Handling:** React Hook Form + Zod
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/shop-mart.git
   cd shop-mart
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (pages)/           # Route groups
│   │   ├── auth/          # Authentication pages
│   │   ├── categories/    # Category pages
│   │   ├── brands/        # Brand pages
│   │   ├── products/      # Product pages
│   │   └── cart/          # Cart page
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # ShadCN UI components
│   └── ...               # Custom components
├── Context/              # React Context providers
├── interfaces/           # TypeScript interfaces
├── utilities/            # Utility functions
└── lib/                  # Library configurations
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

### API Configuration
The app uses the E-commerce API from Route Academy:
- Base URL: `https://ecommerce.routemisr.com/api/v1/`
- No API key required for public endpoints

## 📱 Pages

- **Home** (`/`) - Hero section and featured products
- **Products** (`/products`) - All products grid
- **Categories** (`/categories`) - Browse by categories
- **Brands** (`/brands`) - Browse by brands
- **Cart** (`/cart`) - Shopping cart
- **Auth** (`/auth/login`, `/auth/register`) - Authentication
- **Profile** (`/profile`) - User profile
- **Orders** (`/allorders`) - Order history

## 🎯 Key Features Explained

### Category & Brand Filtering
- Click on any category to see products in that category
- Click on any brand to see products from that brand
- Responsive grid layout with hover effects

### Shopping Cart
- Add/remove products
- Update quantities
- Persistent cart state
- Real-time updates

### Authentication
- Secure login/registration
- JWT token management
- Protected routes
- User session handling

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/shop-mart)

### Other Deployment Options
- **Netlify** - Static site hosting
- **Railway** - Full-stack hosting
- **AWS Amplify** - AWS hosting
- **DigitalOcean** - VPS hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [ShadCN/UI](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Route Academy](https://routeacademy.eg/) - API endpoints

## 📞 Support

If you have any questions or need help:

- Create an issue on GitHub
- Check the documentation
- Review the code comments

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**