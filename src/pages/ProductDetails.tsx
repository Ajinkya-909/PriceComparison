import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ExternalLink, ArrowLeft } from "lucide-react";
import { getProductById, getBestPrice, getSimilarProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl font-semibold text-foreground">Product not found</p>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">Back to Home</Link>
      </div>
    );
  }

  const best = getBestPrice(product.prices);
  const similar = getSimilarProducts(product.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
      >
        {/* Image */}
        <div className="glass-card overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
        </div>

        {/* Info */}
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">{product.category}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{product.name}</h1>
          <div className="flex items-center gap-1 mb-4">
            <Star className="h-5 w-5 fill-warning text-warning" />
            <span className="font-semibold text-foreground">{product.rating}</span>
          </div>
          <p className="text-muted-foreground mb-8">{product.description}</p>

          {/* Prices */}
          <h2 className="font-semibold text-foreground mb-3">Compare Prices</h2>
          <div className="space-y-3">
            {product.prices.map((p) => {
              const isBest = p.platform === best.platform;
              return (
                <div
                  key={p.platform}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    isBest ? "border-success bg-success/5" : "border-border bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-foreground">{p.platform}</span>
                    {isBest && <span className="best-price-badge">Best Price</span>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-lg font-bold ${isBest ? "text-success" : "text-foreground"}`}>
                      ${p.price}
                    </span>
                    <a href={p.url} className="text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Similar */}
      {similar.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
