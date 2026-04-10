import { useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { useProducts } from "@/hooks/useProducts";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const { products, loading, error } = useProducts({ limit: 100 });

  // Search through products
  const results = useMemo(() => {
    if (!query || products.length === 0) return [];
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.brand?.toLowerCase().includes(lowerQuery)
    );
  }, [query, products]);

  // Trending products for when no results
  const trendingProducts = useMemo(
    () => products.filter((p) => p.isTrending).slice(0, 3),
    [products]
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-xl mb-8">
          <SearchBar defaultValue={query} size="lg" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="glass-card h-96 animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mb-8">
        <SearchBar defaultValue={query} size="lg" />
      </div>

      {results.length > 0 ? (
        <>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-semibold text-foreground mb-6"
          >
            {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl font-semibold text-foreground mb-2">
            {query ? "No results found" : "Enter a search term"}
          </p>
          <p className="text-muted-foreground mb-8">
            {query && "Try a different search term"}
          </p>
          {trendingProducts.length > 0 && (
            <>
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Trending Products
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
