import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

export default function TrendingProducts() {
  const { products, loading, hasMore, loadMore } = useProducts({ limit: 12 });
  const observerTarget = useRef<HTMLDivElement>(null);

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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/20 to-primary/10 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Trending Products
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Discover the hottest products trending right now with real-time price comparisons
              across multiple platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-16">
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, i) => (
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
            <div
              ref={observerTarget}
              className="w-full h-10 mt-16 flex items-center justify-center"
            >
              {!hasMore && products.length > 0 && (
                <p className="text-muted-foreground text-center">
                  No more products to load
                </p>
              )}
            </div>
          </>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="glass-card h-96 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No products available</p>
          </div>
        )}
      </section>
    </div>
  );
}
