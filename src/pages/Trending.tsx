import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { useDiverseProducts } from "@/hooks/useProducts";

export default function TrendingProducts() {
  const { products, loading, hasMore, loadMore } = useDiverseProducts(12);
  const observerTarget = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
  }, [hasMore, loading, loadMore, products.length]);

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
              {products.map((product, i) => {
                // Attach observer ref to 4th last product
                const isFourthLastProduct = i === products.length - 4 && products.length > 4;
                
                return (
                  <motion.div
                    key={`${product.id}-${i}`}
                    ref={isFourthLastProduct ? observerTarget : null}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ProductCard product={product} index={i} />
                  </motion.div>
                );
              })}
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
              className="w-full h-5 mt-8 flex items-center justify-center"
            >
              {!hasMore && products.length > 0 && (
                <p className="text-muted-foreground text-center mt-8">
                  Showing repeated products
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
