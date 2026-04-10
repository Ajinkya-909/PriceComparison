import { Link } from "react-router-dom";
import { Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Product, getBestPrice } from "@/hooks/useProducts";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const bestPrice = getBestPrice(product.platformPrices);

  if (!bestPrice) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="block glass-card overflow-hidden group relative"
      >
        {/* Badge - Trending or Discount */}
        {product.isTrending && (
          <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Trending
          </div>
        )}

        {bestPrice.discountPercentage > 0 && (
          <div className="absolute top-2 right-2 z-10 bg-success text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{bestPrice.discountPercentage}%
          </div>
        )}

        {/* Image */}
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-semibold text-foreground line-clamp-1 mb-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
          </div>

          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <p className="text-lg font-bold text-primary">
                ₹{bestPrice.finalPrice.toLocaleString()}
              </p>
              {bestPrice.discountAmount > 0 && (
                <p className="text-sm text-muted-foreground line-through">
                  ₹{bestPrice.originalPrice.toLocaleString()}
                </p>
              )}
            </div>

            {/* Platform & Delivery */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{bestPrice.platform}</span>
              {bestPrice.deliveryDays && (
                <span className="text-success font-semibold">
                  {bestPrice.deliveryDays}d delivery
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
