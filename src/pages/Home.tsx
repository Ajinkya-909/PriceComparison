import { motion } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import { trendingProducts } from "@/data/products";

export default function Home() {
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
        <h2 className="text-2xl font-bold text-foreground mb-8">Trending Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
