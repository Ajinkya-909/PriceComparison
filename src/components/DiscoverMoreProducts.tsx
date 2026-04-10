import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
  const { products, loading, hasMore, loadMore } = useProducts({
    limit: 12,
    category,
  });

  const observerTarget = useRef<HTMLDivElement>(null);

  // Filter out current product and get only the ones from same category
  const filteredProducts = products.filter((p) => p.id !== currentProductId);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading, loadMore]);

  if (filteredProducts.length === 0 && !loading) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="text-2xl font-bold text-foreground mb-8">Discover More Products</h2>

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

          {/* Infinite scroll trigger */}
          <div ref={observerTarget} className="w-full h-10 mt-8 flex items-center justify-center">
            {!hasMore && filteredProducts.length > 0 && (
              <p className="text-muted-foreground text-center text-sm">
                No more products in this category
              </p>
            )}
          </div>
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
