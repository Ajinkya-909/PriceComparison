import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  ExternalLink,
  ArrowLeft,
  Check,
  Truck,
  Shield,
  AlertCircle,
} from "lucide-react";
import DiscoverMoreProducts from "@/components/DiscoverMoreProducts";
import InstallmentPlans from "@/components/InstallmentPlans";
import { useProductById } from "@/hooks/useProductById";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProductById(id || "");
  const [selectedPlatformIdx, setSelectedPlatformIdx] = useState(0);
  const [selectedTenure, setSelectedTenure] = useState<number | undefined>(undefined);

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

  const selectedPlatform = product.platformPrices[selectedPlatformIdx];
  const selectedInstallment = selectedPlatform.installments.find(
    (inst) => inst.tenureMonths === selectedTenure
  );

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
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {product.name}
            </h1>
            {product.brand && (
              <p className="text-muted-foreground">Brand: {product.brand}</p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-warning text-warning"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-foreground">{product.rating}</span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Warranty & Info */}
          <div className="grid grid-cols-2 gap-3 py-4 border-t border-b border-border">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <div className="text-sm">
                <p className="font-semibold text-foreground">Warranty</p>
                <p className="text-muted-foreground">{product.warrantyMonths} months</p>
              </div>
            </div>
            {selectedPlatform?.deliveryDays && (
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Delivery</p>
                  <p className="text-muted-foreground">
                    {selectedPlatform.deliveryDays} days
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Platform Selection */}
          <div className="space-y-3">
            <p className="font-semibold text-foreground">Select Platform</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {product.platformPrices.map((platform, idx) => (
                <button
                  key={platform.id}
                  onClick={() => {
                    setSelectedPlatformIdx(idx);
                    setSelectedTenure(undefined);
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedPlatformIdx === idx
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  } ${!platform.inStock ? "opacity-50" : ""}`}
                >
                  <p className="font-semibold text-foreground text-sm">
                    {platform.platform}
                  </p>
                  <p className="text-lg font-bold text-primary">
                    ₹{platform.finalPrice.toLocaleString()}
                  </p>
                  {platform.discountPercentage > 0 && (
                    <p className="text-xs text-success">
                      Save {platform.discountPercentage}% (₹{platform.discountAmount})
                    </p>
                  )}
                  {!platform.inStock && (
                    <p className="text-xs text-destructive mt-1">Out of Stock</p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Details */}
          {selectedPlatform && (
            <div className="space-y-3 p-4 bg-secondary rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Original Price:</span>
                <span className="font-semibold">
                  ₹{selectedPlatform.originalPrice.toLocaleString()}
                </span>
              </div>
              {selectedPlatform.discountAmount > 0 && (
                <>
                  <div className="flex justify-between items-center text-success">
                    <span className="text-muted-foreground">Discount:</span>
                    <span className="font-semibold">
                      -₹{selectedPlatform.discountAmount.toLocaleString()}{" "}
                      ({selectedPlatform.discountPercentage}%)
                    </span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between items-center">
                    <span className="font-semibold text-foreground">Final Price:</span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{selectedPlatform.finalPrice.toLocaleString()}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Stock Status */}
          {selectedPlatform && (
            <div
              className={`flex items-center gap-2 p-3 rounded-lg ${
                selectedPlatform.inStock
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {selectedPlatform.inStock ? (
                <>
                  <Check className="h-5 w-5" />
                  <span className="font-semibold">
                    In Stock ({selectedPlatform.stockQuantity} available)
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-semibold">Out of Stock</span>
                </>
              )}
            </div>
          )}

          {/* Installment Plans */}
          {selectedPlatform && selectedPlatform.installments.length > 0 && (
            <InstallmentPlans
              installments={selectedPlatform.installments}
              selectedTenure={selectedTenure}
              onSelect={setSelectedTenure}
            />
          )}

          {/* Selected Installment Summary */}
          {selectedInstallment && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-primary/5 border border-primary rounded-lg space-y-2"
            >
              <p className="text-sm text-muted-foreground">
                Pay in {selectedInstallment.tenureMonths} months
              </p>
              <p className="text-2xl font-bold text-primary">
                ₹{selectedInstallment.monthlyPayment.toLocaleString()}/month
              </p>
              <p className="text-xs text-muted-foreground">
                Total: ₹{selectedInstallment.totalAmount.toLocaleString()}
              </p>
            </motion.div>
          )}

          {/* Buy Button */}
          <button className="w-full py-3 rounded-lg hero-gradient text-primary-foreground font-semibold transition-opacity hover:opacity-90">
            Buy Now
          </button>
        </div>
      </motion.div>

      {/* Discover More Products */}
      <DiscoverMoreProducts category={product.category} currentProductId={product.id} />
    </div>
  );
}
