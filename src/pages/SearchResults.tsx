import { useSearchParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { useProducts } from "@/hooks/useProducts";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const { products, loading, error } = useProducts({ limit: 100 });

  // Search through products - use new flat schema
  const results = useMemo(() => {
    if (!query || products.length === 0) return [];
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (p) =>
        p.title?.toLowerCase().includes(lowerQuery) ||
        p.description?.toLowerCase().includes(lowerQuery) ||
        p.category?.toLowerCase().includes(lowerQuery) ||
        p.brand?.toLowerCase().includes(lowerQuery) ||
        p.seller?.toLowerCase().includes(lowerQuery)
    );
  }, [query, products]);

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
        <div className="max-w-xl mb-8">
          <SearchBar defaultValue={query} size="lg" />
        </div>
        <p className="text-destructive text-lg">{error}</p>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-24 px-4"
        >
          <div className="text-center max-w-md">
            <div className="mb-6">
              <div className="inline-block p-4 bg-secondary rounded-full mb-4">
                <svg className="w-16 h-16 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-foreground mb-3">
              No Results Found
            </h2>

            <p className="text-muted-foreground text-lg mb-2">
              We couldn't find any products matching "{query}"
            </p>

            <p className="text-muted-foreground mb-8">
              Try searching for different items or browse our trending products to discover something amazing!
            </p>

            <Link
              to="/trending"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Browse Trending Products
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
