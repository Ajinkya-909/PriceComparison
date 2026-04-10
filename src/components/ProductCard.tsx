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
      {/* Mobile Horizontal Layout */}
      <div className="md:hidden">
        <CardWrapper
          {...cardProps}
          className="block glass-card overflow-hidden group relative flex h-40 hover:shadow-lg transition-shadow"
        >
          {/* Left - Image */}
          <div className="w-32 h-40 flex-shrink-0 overflow-hidden bg-muted relative">
            <img
              src={product.thumbnail || "https://via.placeholder.com/400"}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Badges */}
            {product.is_trending && (
              <div className="absolute top-1 left-1 bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold flex items-center gap-0.5">
                <TrendingUp className="h-2.5 w-2.5" />
                Trending
              </div>
            )}
            {product.discount_percentage && product.discount_percentage > 0 && (
              <div className="absolute top-1 right-1 bg-success text-white px-1.5 py-0.5 rounded text-xs font-semibold">
                -{product.discount_percentage}%
              </div>
            )}
          </div>

          {/* Right - Details */}
          <div className="flex-1 p-2.5 flex flex-col justify-between">
            {/* Seller Badge */}
            {product.seller && (
              <div className="mb-1">
                <p className="text-xs font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded inline-block">
                  {product.seller}
                </p>
              </div>
            )}

            {/* Title */}
            <h3 className="font-semibold text-foreground line-clamp-2 text-xs mb-1">
              {product.title}
            </h3>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-0.5 mb-1">
                <Star className="h-3 w-3 fill-warning text-warning" />
                <span className="text-xs font-semibold text-foreground">
                  {product.rating.toFixed(1)}
                </span>
                {product.reviews && (
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews})
                  </span>
                )}
              </div>
            )}

            {/* Price and Delivery */}
            <div className="space-y-0.5 mb-1">
              {/* Price */}
              <div className="flex items-center gap-1">
                {product.price ? (
                  <p className="text-sm font-bold text-primary">{product.price}</p>
                ) : product.extracted_price ? (
                  <p className="text-sm font-bold text-primary">
                    ₹{product.extracted_price.toLocaleString("en-IN")}
                  </p>
                ) : null}
                {product.original_price && (
                  <p className="text-xs text-muted-foreground line-through">
                    {product.original_price}
                  </p>
                )}
              </div>

              {/* Delivery */}
              {product.extracted_price && (
                <div className="flex items-center gap-1 text-xs">
                  <Truck className="h-3 w-3 text-muted-foreground" />
                  <span className={deliveryCalc.isFreeDelivery ? "text-success font-semibold" : "text-muted-foreground"}>
                    {deliveryCalc.isFreeDelivery
                      ? "Free Delivery"
                      : `+${formatPrice(deliveryCalc.deliveryPrice)}`}
                  </span>
                </div>
              )}
            </div>

            {/* Buy Button */}
            {product.product_link && (
              <button
                onClick={handleShopNow}
                className="w-full px-2 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded text-xs flex items-center justify-center gap-1 transition-colors"
              >
                BUY NOW
              </button>
            )}
          </div>
        </CardWrapper>
      </div>

      {/* Desktop Vertical Layout */}
      <div className="hidden md:block">
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

          {/* Image Section */}
          <div className="aspect-square overflow-hidden bg-muted relative">
            <img
              src={product.thumbnail || "https://via.placeholder.com/400"}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* Content Section */}
          <div className="p-4 flex flex-col flex-grow">
            {/* Seller/Brand - PROMINENT */}
            {product.seller && (
              <div className="mb-2 pb-2 border-b border-border">
                <p className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded inline-block">
                  🏪 {product.seller}
                </p>
              </div>
            )}

            {/* Title */}
            <h3 className="font-semibold text-foreground line-clamp-2 mb-2 text-base">
              {product.title}
            </h3>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-1 mb-3">
              {product.rating ? (
                <>
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-sm font-semibold text-foreground">
                    {product.rating.toFixed(1)}
                  </span>
                  {product.reviews && (
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews})
                    </span>
                  )}
                </>
              ) : (
                <span className="text-xs text-muted-foreground">No ratings</span>
              )}
            </div>

            {/* Pricing Section */}
            <div className="mb-3 space-y-1">
              {/* Price */}
              <div className="flex items-center gap-2">
                {product.price ? (
                  <p className="text-xl font-bold text-primary">{product.price}</p>
                ) : product.extracted_price ? (
                  <p className="text-xl font-bold text-primary">
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
                <div className="flex items-center gap-1 text-sm">
                  <Truck className="h-3 w-3 text-muted-foreground" />
                  <span className={deliveryCalc.isFreeDelivery ? "text-success font-semibold" : "text-muted-foreground"}>
                    {deliveryCalc.isFreeDelivery
                      ? "Free Delivery"
                      : `+ ${formatPrice(deliveryCalc.deliveryPrice)}`}
                  </span>
                </div>
              )}

              {/* Total Price */}
              {product.extracted_price && (
                <div className="pt-1 border-t border-border/50">
                  <div className="flex justify-between items-center bg-primary/5 px-2 py-1 rounded">
                    <span className="text-xs text-muted-foreground">Total:</span>
                    <span className="text-base font-bold text-primary">
                      {formatPrice(deliveryCalc.totalPrice)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Delivery Info */}
            {product.delivery && (
              <div className="flex items-center gap-1 text-xs mb-2">
                <span className="text-success font-semibold">✓</span>
                <span className="text-muted-foreground">{product.delivery}</span>
              </div>
            )}

            {/* Return Policy */}
            {product.delivery_return && (
              <p className="text-xs text-muted-foreground mb-3">{product.delivery_return}</p>
            )}

            {/* Shop Now Button */}
            {product.product_link && (
              <button
                onClick={handleShopNow}
                className="w-full mt-auto px-4 py-2 bg-primary text-primary-foreground rounded-md font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <ShoppingBag className="h-4 w-4" />
                Shop Now
              </button>
            )}
          </div>
        </CardWrapper>
      </div>
    </motion.div>
  );
}
