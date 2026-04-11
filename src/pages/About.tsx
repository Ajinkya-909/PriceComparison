import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BarChart3, Search, ShieldCheck, Zap } from "lucide-react";

const features = [
  { icon: Search, title: "Smart Search", desc: "Find any product instantly across multiple platforms." },
  { icon: BarChart3, title: "Price Comparison", desc: "See prices from Amazon, Flipkart, Best Buy side by side." },
  { icon: Zap, title: "Best Deal Finder", desc: "We highlight the lowest price so you never overpay." },
  { icon: ShieldCheck, title: "Trusted Data", desc: "Accurate, up-to-date pricing from verified sources." },
];

export default function About() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About PriceDekho</h1>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
          PriceDekho is a smart price comparison platform that helps you find the best deals on any product across major online retailers. We compare prices in real-time so you get the best value every time you shop.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass-card p-6"
          >
            <f.icon className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
