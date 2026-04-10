import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

interface DiscoverMoreProductsProps {
  category: string;
  currentProductId: string;
}

export default function DiscoverMoreProducts({
  category,
  currentProductId,
}: DiscoverMoreProductsProps) {
  const { products, loading } = useProducts({
    limit: 8,
    category,
  });

  // Filter out current product and get only the ones from same category
  const filteredProducts = products.filter((p) => p.id !== currentProductId).slice(0, 8);

  if (filteredProducts.length === 0 && !loading) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">Discover More Products</h2>
        <Link
          to="/trending"
          className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
        >
          Show All <ChevronRight className="h-5 w-5" />
        </Link>
      </div>

      {filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (i % 4) * 0.1 }}
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </div>

          {/* Loading skeleton for more products */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {[...Array(4)].map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="glass-card h-96 animate-pulse rounded-xl"
                />
              ))}
            </div>
          )}
        </>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="glass-card h-96 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
