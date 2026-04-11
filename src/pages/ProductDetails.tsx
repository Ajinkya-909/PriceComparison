import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  ExternalLink,
  ArrowLeft,
  Truck,
  RefreshCw,
} from "lucide-react";
import DiscoverMoreProducts from "@/components/DiscoverMoreProducts";
import { useProductById } from "@/hooks/useProductById";
import { calculateDeliveryPrice, formatPrice } from "@/lib/deliveryCalculator";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { product, otherSellers, loading, error } = useProductById(id || "");

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Calculate delivery and total price
  const deliveryCalc = product ? calculateDeliveryPrice({
    price: product.extracted_price,
    brand: product.brand,
    hasReturnPolicy: !!product.delivery_return,
    hasDeliveryInfo: !!product.delivery,
    seller: product.seller,
    deliveryReturn: product.delivery_return,
  }) : null;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card aspect-square animate-pulse rounded-xl" />
          <div className="space-y-4">
            <div className="h-12 glass-card animate-pulse rounded-lg" />
            <div className="h-6 glass-card animate-pulse rounded-lg w-3/4" />
            <div className="h-4 glass-card animate-pulse rounded-lg w-1/2" />
            <div className="space-y-3 mt-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 glass-card animate-pulse rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl font-semibold text-foreground mb-4">
          {error || "Product not found"}
        </p>
        <Link to="/" className="text-primary hover:underline inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleShopNow = () => {
    if (product.product_link) {
      window.open(product.product_link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 mb-12"
      >
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-card overflow-hidden rounded-xl aspect-square"
          >
            <img
              src={product.thumbnail || "https://via.placeholder.com/600"}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-6 flex flex-col justify-between"
          >
            {/* Title & Category */}
            <div>
              {product.category && (
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  {product.category}
                </p>
              )}
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.title}
              </h1>
              {product.seller && (
                <p className="text-muted-foreground flex items-center gap-2">
                  <span>🏪</span> {product.seller}
                </p>
              )}
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating || 0)
                          ? "fill-warning text-warning"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <div>
                  <span className="font-semibold text-foreground">
                    {product.rating.toFixed(1)}
                  </span>
                  {product.reviews && (
                    <span className="text-muted-foreground text-sm ml-1">
                      ({product.reviews} reviews)
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Pricing Section */}
            <div className="bg-secondary rounded-lg p-4 space-y-3">
              {product.original_price && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Original Price:</span>
                  <span className="font-semibold">{product.original_price}</span>
                </div>
              )}

              {product.discount_percentage && product.discount_percentage > 0 && (
                <div className="flex justify-between items-center text-success">
                  <span className="text-muted-foreground">Discount:</span>
                  <span className="font-semibold">{product.discount_percentage}% Off</span>
                </div>
              )}

              <div className="flex justify-between items-center border-t border-border pt-3">
                <span className="font-semibold text-foreground">
                  Product Price:
                </span>
                {product.price ? (
                  <span className="text-xl font-bold text-primary">
                    {product.price}
                  </span>
                ) : product.extracted_price ? (
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(product.extracted_price)}
                  </span>
                ) : null}
              </div>

              {/* Delivery Section */}
              {deliveryCalc && product.extracted_price && (
                <>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Delivery:</span>
                    </div>
                    <span
                      className={`font-semibold ${
                        deliveryCalc.isFreeDelivery
                          ? "text-success"
                          : "text-foreground"
                      }`}
                    >
                      {deliveryCalc.isFreeDelivery
                        ? "FREE"
                        : formatPrice(deliveryCalc.deliveryPrice)}
                    </span>
                  </div>

                  {deliveryCalc.deliveryEstimate && (
                    <p className="text-xs text-muted-foreground italic">
                      📦 Estimated: {deliveryCalc.deliveryEstimate}
                    </p>
                  )}

                  <div className="border-t border-border pt-3 flex justify-between items-center bg-primary/5 -mx-4 -mb-4 px-4 py-3 rounded-b-lg">
                    <span className="font-bold text-foreground text-lg">
                      Total Price:
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(deliveryCalc.totalPrice)}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Additional Info */}
            <div className="space-y-2 py-4 border-t border-b border-border">
              {product.delivery && (
                <div className="flex items-start gap-2">
                  <span className="text-success font-semibold">✓</span>
                  <p className="text-sm text-foreground">{product.delivery}</p>
                </div>
              )}
              {product.delivery_return && (
                <div className="flex items-start gap-2">
                  <RefreshCw className="h-4 w-4 text-primary mt-0.5" />
                  <p className="text-sm text-foreground">
                    {product.delivery_return}
                  </p>
                </div>
              )}
              {product.payment_methods && (
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">💳</span>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Payments: </span>
                    {product.payment_methods}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {product.product_link && (
                <button
                  onClick={handleShopNow}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Buy Now
                  <ExternalLink className="h-4 w-4" />
                </button>
              )}
              <Link
                to="/"
                className="px-6 py-3 bg-secondary text-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-colors text-center"
              >
                Back
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Other Sellers Section */}
        {otherSellers && otherSellers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Available on Other Platforms
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherSellers.map((seller) => {
                const sellerDelivery = calculateDeliveryPrice({
                  price: seller.extracted_price,
                  brand: seller.brand,
                  hasReturnPolicy: !!seller.delivery_return,
                  hasDeliveryInfo: !!seller.delivery,
                  seller: seller.seller,
                  deliveryReturn: seller.delivery_return,
                });

                return (
                  <Link
                    key={seller.id}
                    to={`/product/${seller.id}`}
                    className="glass-card p-4 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-foreground">{seller.seller || "Unknown Seller"}</h3>
                    </div>

                    <div className="space-y-2">
                      {seller.extracted_price && (
                        <>
                          <p className="text-lg font-bold text-primary">
                            {formatPrice(seller.extracted_price)}
                          </p>

                          {/* Delivery Charge */}
                          <div className="flex items-center gap-1 text-xs">
                            <Truck className="h-3 w-3" />
                            <span className={sellerDelivery.isFreeDelivery ? "text-success font-semibold" : "text-muted-foreground"}>
                              {sellerDelivery.isFreeDelivery ? "Free Delivery" : `+ ${formatPrice(sellerDelivery.deliveryPrice)}`}
                            </span>
                          </div>

                          {/* Total Price */}
                          <div className="pt-2 border-t border-border">
                            <p className="text-xs text-muted-foreground mb-1">Total:</p>
                            <p className="text-base font-bold text-primary">
                              {formatPrice(sellerDelivery.totalPrice)}
                            </p>
                          </div>
                        </>
                      )}

                      {seller.rating && (
                        <div className="flex items-center gap-1 pt-2 border-t border-border">
                          <Star className="h-4 w-4 fill-warning text-warning" />
                          <span className="text-sm font-medium">{seller.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>

                    <button className="w-full mt-3 px-3 py-2 bg-primary/10 text-primary rounded text-sm font-semibold hover:bg-primary/20 transition-colors">
                      View Details
                    </button>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}

        <DiscoverMoreProducts />
      </motion.div>
    </div>
  );
}
