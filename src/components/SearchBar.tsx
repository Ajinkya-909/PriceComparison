import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

interface SearchBarProps {
  className?: string;
  defaultValue?: string;
  size?: "sm" | "lg";
}

export default function SearchBar({ className = "", defaultValue = "", size = "sm" }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground ${size === "lg" ? "h-5 w-5" : "h-4 w-4"}`} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className={`w-full bg-secondary text-foreground placeholder:text-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-all ${
          size === "lg" ? "pl-11 pr-4 py-3 text-base" : "pl-9 pr-4 py-2 text-sm"
        }`}
      />
    </form>
  );
}
