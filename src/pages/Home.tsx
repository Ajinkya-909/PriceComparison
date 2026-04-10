import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import { useDiverseProducts } from "@/hooks/useProducts";
import { useState, useEffect } from "react";

const TypewriterText = () => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    "Compare prices across Amazon, Flipkart, Best Buy and more",
    "Save money on every purchase",
    "Smart delivery cost calculations",
    "Real-time price updates",
  ];

  useEffect(() => {
    const currentText = texts[textIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const delayBeforeDelete = 2500;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), delayBeforeDelete);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, textIndex, isDeleting]);

  return (
    <span className="relative">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="absolute ml-1 text-primary"
      >
        |
      </motion.span>
    </span>
  );
};

export default function Home() {
  const { products, loading } = useDiverseProducts(5);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section 
        className="relative py-20 md:py-40 overflow-hidden before:absolute before:inset-0 before:bg-cover before:bg-center before:bg-no-repeat before:opacity-60"
        style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAxMDAwIDYwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMwZjA0MTkiLz48cmFkaWFsR3JhZGllbnQgaWQ9ImdyYWQxIiBjeD0iMjUlIiBjeT0iNTAlIiByPSI2MCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDdmdmY7c3RvcC1vcGFjaXR5OjAuOCIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwZjA0MTk7c3RvcC1vcGFjaXR5OjAiIC8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9ImdyYWQyIiBjeD0iNzUlIiBjeT0iNTAlIiByPSI2MCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZjBhMDA7c3RvcC1vcGFjaXR5OjAuOCIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwZjA0MTk7c3RvcC1vcGFjaXR5OjAiIC8+PC9yYWRpYWxHcmFkaWVudD48ZmlsdGVyIGlkPSJmaWx0ZXIiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjAyIiBudW1PY3RhdmVzPSI1IiByZXN1bHQ9Im5vaXNlIiAvPjxmZURpc3BsYWNlbWVudE1hcCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJub2lzZSIgc2NhbGU9IjEwMCIgeHlSZXN1bHQ9ImRpc3BsYWNlZCIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9InVybCgjZ3JhZDEpIiBvcGFjaXR5PSIwLjciIC8+PHJlY3Qgd2lkdGg9IjEwMDAiIGhlaWdodD0iNjAwIiBmaWxsPSJ1cmwoI2dyYWQyKSIgb3BhY2l0eT0iMC43IiAvPjxjaXJjbGUgY3g9IjI1MCIgY3k9IjMwMCIgcj0iNDAwIiBmaWxsPSJ1cmwoI2dyYWQxKSIgb3BhY2l0eT0iMC4zIiBmaWx0ZXI9InVybCgjZmlsdGVyKSIgLz48Y2lyY2xlIGN4PSI3NTAiIGN5PSIzMDAiIHI9IjQwMCIgZmlsbD0idXJsKCNncmFkMikiIG9wYWNpdHk9IjAuMyIgZmlsdGVyPSJ1cmwoI2ZpbHRlcikiIC8+PC9zdmc+')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        
        <div className="relative container mx-auto px-4 text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Find the Best Price.
            <br />
            Every Time.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-200 mb-10 max-w-2xl mx-auto h-12 flex items-center justify-center"
          >
            <TypewriterText />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto"
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
