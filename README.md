# PriceDekho - Smart Price Comparison Platform

PriceDekho is a modern web application that helps you find the best deals on any product by comparing prices across multiple online retailers in real-time.

## Features

- 🔍 **Smart Search** - Find any product instantly across multiple platforms
- 💰 **Real-time Price Comparison** - See prices from Amazon, Flipkart, Best Buy and more side by side
- 📊 **Smart Delivery Calculation** - Intelligent delivery cost calculation based on product price, brand, and policies
- ⚡ **Fast Results with Caching** - Local storage caching prevents duplicate API calls within 24 hours
- 📱 **Responsive Design** - Optimized for both desktop and mobile devices
- 🌙 **Dark Mode Support** - Comfortable viewing at any time of day
- 🎯 **Trending Products** - Discover what's trending right now

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **API Integration**: Google Shopping API (SearchAPI.io)
- **Backend**: Supabase (Database & Authentication)
- **State Management**: React Hooks
- **Build Tool**: Vite
- **UI Components**: shadcn/ui

## Getting Started

### Prerequisites

- Node.js 16+
- npm or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
# or
bun install

# Create environment variables
cp .env.example .env

# Update .env with your API keys:
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_key
# VITE_GOOGLE_SHOPPING_API=your_google_shopping_api_key
```

### Development

```bash
npm run dev
# or
bun run dev
```

Visit `http://localhost:5173` in your browser.

### Build

```bash
npm run build
# or
bun run build
```

## Usage

1. **Search Products** - Use the search bar to find any product
2. **Compare Prices** - View prices from different sellers side by side
3. **Check Delivery** - See delivery costs calculated intelligently
4. **Buy Now** - Click "Shop Now" to visit the seller's website
5. **View Trending** - Discover trending products on the home page or trending page

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── lib/              # Utility functions and API integrations
├── hooks/            # Custom React hooks
├── context/          # React Context for state management
├── data/             # Static data and SQL queries
└── main.tsx          # App entry point
```

## Key Features Explained

### Price Comparison

Compare real-time prices from Google Shopping index to help you make data-driven purchasing decisions.

### Smart Delivery Calculation

Our algorithm considers:

- Product price brackets
- Premium brand detection
- Seller policies
- Return policies
- Current market rates

### Search Caching

Smart caching system stores search results for 24 hours to reduce API calls and provide instant results on repeat searches.

### Responsive Design

Two distinct layouts:

- **Mobile**: Horizontal card layout for quick scrolling
- **Desktop**: Vertical card layout with full details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Deployment

PriceDekho is deployed on Vercel at: [pricedekho-one.vercel.app](https://pricedekho-one.vercel.app)

## Support

For support, email support@pricedekho.com or create an issue in the repository.

---

**PriceDekho** - Find the best price, every time! 🎉
