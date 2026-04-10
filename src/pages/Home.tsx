import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
  const { products, loading } = useProducts({ limit: 5 });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4"
          >
            Find the Best Price.
            <br />
            Every Time.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-primary-foreground/80 text-lg mb-8 max-w-lg mx-auto"
          >
            Compare prices across Amazon, Flipkart, Best Buy and more — all in one place.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl mx-auto"
          >
            <SearchBar size="lg" />
          </motion.div>
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Trending Products</h2>
          <Link
            to="/trending"
            className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            Show All <ChevronRight className="h-5 w-5" />
          </Link>
        </div>

        {loading ? (
          <div className="flex gap-6 overflow-x-auto pb-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-64 h-80 glass-card animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
            {products.map((product, i) => (
              <div key={product.id} className="flex-shrink-0 w-64 snap-start">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No trending products available
          </div>
        )}
      </section>
    </div>
  );
}
