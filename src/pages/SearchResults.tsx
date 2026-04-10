import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { searchProducts, trendingProducts } from "@/data/products";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const results = searchProducts(query);

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
          <p className="text-xl font-semibold text-foreground mb-2">No results found</p>
          <p className="text-muted-foreground mb-8">Try a different search term</p>
          <h3 className="text-lg font-semibold text-foreground mb-6">You might like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts.slice(0, 3).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
