import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Product, getBestPrice } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const best = getBestPrice(product.prices);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/product/${product.id}`} className="block glass-card overflow-hidden group">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-semibold text-foreground line-clamp-1 mb-2">{product.name}</h3>
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-primary">${best.price}</p>
            <span className="text-xs text-muted-foreground">on {best.platform}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
