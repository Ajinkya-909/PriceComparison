import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductDetailOverlay from "@/components/ProductDetailOverlay";
import SearchBar from "@/components/SearchBar";
import { 
  fetchGoogleShoppingResults, 
  ShoppingProduct,
  GoogleShoppingResult 
} from "@/lib/googleShopping";
import { 
  getCachedSearchResults, 
  cacheSearchResults 
} from "@/lib/searchCache";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  
  const [results, setResults] = useState<ShoppingProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ShoppingProduct | null>(null);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setLoading(false);
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log(`🔍 Searching for: ${query}`);

        // Try to get from cache first
        let cachedResults = getCachedSearchResults(query);

        if (cachedResults && cachedResults.length > 0) {
          console.log("📦 Using cached results");
          setResults(cachedResults);
          setLoading(false);
          return;
        }

        // No cache, fetch from API
        console.log("🌐 Fetching from API...");
        const result: GoogleShoppingResult = await fetchGoogleShoppingResults(query);

        if (result.success && result.data) {
          setResults(result.data);
          // Cache the results
          cacheSearchResults(query, result.data);
          setError(null);
        } else {
          setResults([]);
          setError(result.error || result.message || "No products found");
        }
      } catch (err: any) {
        setResults([]);
        setError(err.message || "Failed to fetch search results");
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
        <div className="max-w-xl mb-8">
          <SearchBar defaultValue={query} size="lg" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <Loader className="h-12 w-12 text-primary" />
            </motion.div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Searching for "{query}"
            </h3>
            <p className="text-muted-foreground">
              Fetching live results from Google Shopping...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error && results.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-xl mb-8">
          <SearchBar defaultValue={query} size="lg" />
        </div>

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
      </div>
    );
  }

  // Success state with results
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mb-8">
        <SearchBar defaultValue={query} size="lg" />
      </div>

      {results.length > 0 && (
        <>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-semibold text-foreground mb-6"
          >
            Found {results.length} product{results.length !== 1 ? "s" : ""} for "{query}"
            {/* <span className="text-xs text-muted-foreground ml-2">(cached)</span> */}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {results.map((product, index) => {
                // Convert API product to our Product interface format
                const convertedProduct = {
                  id: product.product_id || `google-${index}`,
                  product_id: product.product_id || "",
                  title: product.title || "Unknown Product",
                  thumbnail: product.thumbnail,
                  product_link: product.product_link,
                  price: product.price,
                  extracted_price: product.extracted_price,
                  original_price: product.original_price,
                  rating: product.rating,
                  reviews: product.reviews,
                  seller: product.seller,
                  delivery_return: product.delivery_return,
                  delivery: product.delivery,
                };

                return (
                  <motion.div
                    key={product.product_id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    <ProductCard 
                      product={convertedProduct as any} 
                      index={index}
                      onCardClick={() => setSelectedProduct(product)}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </>
      )}

      {/* Product Detail Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailOverlay
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
