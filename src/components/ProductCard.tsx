import { Link } from "react-router-dom";
import { Star, TrendingUp, ShoppingBag, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/hooks/useProducts";
import { calculateDeliveryPrice, formatPrice } from "@/lib/deliveryCalculator";

interface ProductCardProps {
  product: Product;
  index?: number;
  onCardClick?: (product: Product) => void; // For overlay mode
}

export default function ProductCard({ product, index = 0, onCardClick }: ProductCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    if (onCardClick) {
      e.preventDefault();
      onCardClick(product);
    }
  };

  const handleShopNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.product_link) {
      window.open(product.product_link, "_blank", "noopener,noreferrer");
    }
  };

  // Calculate delivery and total price
  const deliveryCalc = calculateDeliveryPrice({
    price: product.extracted_price,
    brand: product.brand,
    hasReturnPolicy: !!product.delivery_return,
    hasDeliveryInfo: !!product.delivery,
    seller: product.seller,
    deliveryReturn: product.delivery_return,
  });

  const CardWrapper = onCardClick ? "div" : Link;
  const cardProps = onCardClick 
    ? { onClick: handleCardClick, role: "button", style: { cursor: "pointer" } }
    : { to: `/product/${product.id}` };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="h-full"
    >
      <CardWrapper
        {...cardProps}
        className="block glass-card overflow-hidden group relative h-full flex flex-col hover:shadow-lg transition-shadow"
      >
        {/* Badge - Trending or Discount */}
        {product.is_trending && (
          <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Trending
          </div>
        )}

        {product.discount_percentage && product.discount_percentage > 0 && (
          <div className="absolute top-2 right-2 z-10 bg-success text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{product.discount_percentage}%
          </div>
        )}

        {/* Image */}
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.thumbnail || "https://via.placeholder.com/400"}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="p-4">
          {/* Category */}
          {product.category && (
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              {product.category}
            </p>
          )}

          {/* Title */}
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
            {product.title}
          </h3>

          {/* Seller */}
          {product.seller && (
            <p className="text-xs text-muted-foreground mb-2">{product.seller}</p>
          )}

          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 mb-3">
            {product.rating ? (
              <>
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="text-sm font-medium text-foreground">
                  {product.rating.toFixed(1)}
                </span>
                {product.reviews && (
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs text-muted-foreground">No ratings yet</span>
            )}
          </div>

          {/* Pricing */}
          <div className="space-y-2">
            {/* Price */}
            <div className="flex items-baseline gap-2">
              {product.price ? (
                <p className="text-lg font-bold text-primary">{product.price}</p>
              ) : product.extracted_price ? (
                <p className="text-lg font-bold text-primary">
                  ₹{product.extracted_price.toLocaleString("en-IN")}
                </p>
              ) : null}

              {product.original_price && (
                <p className="text-sm text-muted-foreground line-through">
                  {product.original_price}
                </p>
              )}
            </div>

            {/* Delivery Charge Display */}
            {product.extracted_price && (
              <div className="flex items-center gap-2 text-xs">
                <Truck className="h-3 w-3 text-muted-foreground" />
                <span className={deliveryCalc.isFreeDelivery ? "text-success font-semibold" : "text-muted-foreground"}>
                  {deliveryCalc.isFreeDelivery
                    ? "Free Delivery"
                    : `+ ${formatPrice(deliveryCalc.deliveryPrice)} delivery`}
                </span>
              </div>
            )}

            {/* Total Price */}
            {product.extracted_price && (
              <div className="pt-2 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-muted-foreground">Total Price:</span>
                  <span className="text-base font-bold text-primary">
                    {formatPrice(deliveryCalc.totalPrice)}
                  </span>
                </div>
              </div>
            )}

            {/* Delivery Info */}
            {product.delivery && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-success font-semibold">✓ {product.delivery}</span>
              </div>
            )}

            {/* Return Policy */}
            {product.delivery_return && (
              <p className="text-xs text-muted-foreground">{product.delivery_return}</p>
            )}

            {/* Shop Now Button */}
            {product.product_link && (
              <button
                onClick={handleShopNow}
                className="w-full mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-md font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <ShoppingBag className="h-4 w-4" />
                Shop Now
              </button>
            )}
          </div>
        </div>
      </CardWrapper>
    </motion.div>
  );
}
