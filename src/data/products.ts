export interface PriceSource {
  platform: string;
  price: number;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  rating: number;
  prices: PriceSource[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Sony WH-1000XM5 Headphones",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    description: "Industry-leading noise canceling wireless headphones with exceptional sound quality and 30-hour battery life.",
    rating: 4.8,
    prices: [
      { platform: "Amazon", price: 348, url: "#" },
      { platform: "Flipkart", price: 329, url: "#" },
      { platform: "Best Buy", price: 399, url: "#" },
    ],
  },
  {
    id: "2",
    name: 'Samsung Galaxy Tab S9 11"',
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop",
    description: "Premium Android tablet with stunning AMOLED display, S Pen included, and powerful Snapdragon processor.",
    rating: 4.6,
    prices: [
      { platform: "Amazon", price: 749, url: "#" },
      { platform: "Flipkart", price: 719, url: "#" },
      { platform: "Samsung Store", price: 799, url: "#" },
    ],
  },
  {
    id: "3",
    name: "Apple MacBook Air M3",
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    description: "Supercharged by M3 chip. Up to 18 hours of battery life. A stunning Liquid Retina display.",
    rating: 4.9,
    prices: [
      { platform: "Amazon", price: 1049, url: "#" },
      { platform: "Apple Store", price: 1099, url: "#" },
      { platform: "Best Buy", price: 1049, url: "#" },
    ],
  },
  {
    id: "4",
    name: "Nike Air Max 270",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    description: "Iconic lifestyle sneaker with the tallest Air unit yet for an ultra-soft ride and modern look.",
    rating: 4.5,
    prices: [
      { platform: "Amazon", price: 150, url: "#" },
      { platform: "Nike Store", price: 160, url: "#" },
      { platform: "Flipkart", price: 142, url: "#" },
    ],
  },
  {
    id: "5",
    name: "Dyson V15 Detect Vacuum",
    category: "Home",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop",
    description: "Intelligent cordless vacuum with laser dust detection and powerful suction for deep cleaning.",
    rating: 4.7,
    prices: [
      { platform: "Amazon", price: 649, url: "#" },
      { platform: "Dyson Store", price: 749, url: "#" },
      { platform: "Best Buy", price: 699, url: "#" },
    ],
  },
  {
    id: "6",
    name: "Kindle Paperwhite 2024",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=400&fit=crop",
    description: "The thinnest, lightest Kindle Paperwhite yet with a 6.8-inch display and adjustable warm light.",
    rating: 4.7,
    prices: [
      { platform: "Amazon", price: 139, url: "#" },
      { platform: "Best Buy", price: 149, url: "#" },
      { platform: "Flipkart", price: 145, url: "#" },
    ],
  },
  {
    id: "7",
    name: "Logitech MX Master 3S",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    description: "Advanced wireless mouse with ultra-fast scrolling, ergonomic design, and multi-device support.",
    rating: 4.8,
    prices: [
      { platform: "Amazon", price: 89, url: "#" },
      { platform: "Flipkart", price: 95, url: "#" },
      { platform: "Best Buy", price: 99, url: "#" },
    ],
  },
  {
    id: "8",
    name: "JBL Charge 5 Speaker",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    description: "Portable Bluetooth speaker with powerful JBL Original Pro Sound, IP67 waterproof, and 20-hour playtime.",
    rating: 4.6,
    prices: [
      { platform: "Amazon", price: 149, url: "#" },
      { platform: "Flipkart", price: 139, url: "#" },
      { platform: "JBL Store", price: 179, url: "#" },
    ],
  },
  {
    id: "9",
    name: "Instant Pot Duo Plus 6Qt",
    category: "Home",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    description: "9-in-1 electric pressure cooker with whisper-quiet steam release and easy-to-read display.",
    rating: 4.4,
    prices: [
      { platform: "Amazon", price: 89, url: "#" },
      { platform: "Walmart", price: 79, url: "#" },
      { platform: "Best Buy", price: 99, url: "#" },
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}

export function getBestPrice(prices: PriceSource[]): PriceSource {
  return prices.reduce((min, p) => (p.price < min.price ? p : min), prices[0]);
}

export function getSimilarProducts(id: string, count = 3): Product[] {
  const product = getProductById(id);
  if (!product) return products.slice(0, count);
  return products
    .filter((p) => p.id !== id && p.category === product.category)
    .slice(0, count)
    .concat(products.filter((p) => p.id !== id && p.category !== product.category))
    .slice(0, count);
}

export const trendingProducts = products.slice(0, 6);
