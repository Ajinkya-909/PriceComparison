import { useParams, Link } from "react-router-dom";
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

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { product, otherSellers, loading, error } = useProductById(id || "");

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

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
      >
        {/* Image */}
        <div className="glass-card overflow-hidden rounded-xl">
          <img
            src={product.thumbnail || "https://via.placeholder.com/600"}
            alt={product.title}
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* Info */}
        <div className="space-y-6">
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
            {product.brand && (
              <p className="text-muted-foreground">Brand: {product.brand}</p>
            )}
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-3">
            {product.rating ? (
              <>
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
              </>
            ) : (
              <p className="text-muted-foreground">No ratings available</p>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          )}

          {/* Key Info Box */}
          <div className="grid grid-cols-2 gap-3 py-4 border-t border-b border-border">
            {product.seller && (
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 text-primary">🏪</span>
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Seller</p>
                  <p className="text-muted-foreground text-xs">{product.seller}</p>
                </div>
              </div>
            )}
            {product.delivery && (
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Delivery</p>
                  <p className="text-muted-foreground text-xs">{product.delivery}</p>
                </div>
              </div>
            )}
          </div>

          {/* Pricing Details */}
          <div className="space-y-3 p-4 bg-secondary rounded-lg">
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

            <div className="border-t border-border pt-3 flex justify-between items-center">
              <span className="font-semibold text-foreground">Price:</span>
              {product.price ? (
                <span className="text-2xl font-bold text-primary">{product.price}</span>
              ) : product.extracted_price ? (
                <span className="text-2xl font-bold text-primary">
                  ₹{product.extracted_price.toLocaleString("en-IN")}
                </span>
              ) : null}
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            {product.delivery_return && (
              <div className="flex items-start gap-2">
                <RefreshCw className="h-4 w-4 text-primary mt-0.5" />
                <p className="text-sm text-foreground">{product.delivery_return}</p>
              </div>
            )}
            {product.payment_methods && (
              <div className="flex items-start gap-2">
                <span className="text-primary mt-0.5">💳</span>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Payments: </span>
                  {product.payment_methods}
                </p>
              </div>
            )}
          </div>

          {/* View on Platform Button */}
          {product.product_link && (
            <a
              href={product.product_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              View on Platform
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </motion.div>

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
            {otherSellers.map((seller) => (
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
                    <p className="text-lg font-bold text-primary">
                      ₹{seller.extracted_price.toLocaleString("en-IN")}
                    </p>
                  )}

                  {seller.delivery && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Truck className="h-3 w-3" /> {seller.delivery}
                    </p>
                  )}

                  {seller.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="text-sm font-medium">{seller.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                <button className="w-full mt-3 px-3 py-2 bg-primary/10 text-primary rounded text-sm font-semibold hover:bg-primary/20 transition-colors">
                  View Details
                </button>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      <DiscoverMoreProducts />
    </div>
  );
}
