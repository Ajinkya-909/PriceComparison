import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  Star,
  X,
  ExternalLink,
  Truck,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { ShoppingProduct } from "@/lib/googleShopping";
import { calculateDeliveryPrice, formatPrice } from "@/lib/deliveryCalculator";

interface ProductDetailOverlayProps {
  product: ShoppingProduct;
  onClose: () => void;
}

export default function ProductDetailOverlay({
  product,
  onClose,
}: ProductDetailOverlayProps) {
  // Disable body scroll when overlay is open
  useEffect(() => {
    // Store original overflow value
    const originalBodyStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // Add escape key handler
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    // Cleanup
    return () => {
      document.body.style.overflow = originalBodyStyle;
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  // Calculate delivery and total price
  const deliveryCalc = calculateDeliveryPrice({
    price: product.extracted_price,
    brand: product.title?.split(" ")[0], // Rough brand extraction
    hasReturnPolicy: !!product.delivery_return,
    hasDeliveryInfo: !!product.delivery,
    seller: product.seller,
    deliveryReturn: product.delivery_return,
  });

  const handleShopNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.product_link) {
      window.open(product.product_link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="container mx-auto px-4 py-8 min-h-screen flex items-start justify-center"
      >
        <div className="w-full max-w-4xl glass-card rounded-2xl overflow-hidden">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-6 border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-10">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
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
              {/* Title & Seller */}
              <div>
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
                    <span className="font-semibold">
                      {product.original_price}
                    </span>
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
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {product.product_link && (
                  <button
                    onClick={handleShopNow}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Buy Now
                    <ExternalLink className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-secondary text-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
                >
                  Back to Results
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
