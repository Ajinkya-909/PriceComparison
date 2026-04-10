import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { validateSearchQuery } from "@/lib/googleShopping";

interface SearchBarProps {
  className?: string;
  defaultValue?: string;
  size?: "sm" | "lg";
  maxLength?: number;
}

const MAX_SEARCH_LENGTH = 50; // ~10 words

export default function SearchBar({ 
  className = "", 
  defaultValue = "", 
  size = "sm",
  maxLength = MAX_SEARCH_LENGTH 
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate query
    const validation = validateSearchQuery(query.trim(), maxLength);
    
    if (!validation.valid) {
      setError(validation.message || "Invalid search");
      return;
    }

    setError("");
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Limit input length
    if (value.length <= maxLength) {
      setQuery(value);
      setError("");
    }
  };

  const charCount = query.length;
  const isNearLimit = charCount > maxLength - 10;

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground ${size === "lg" ? "h-5 w-5" : "h-4 w-4"}`} />
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search products..."
        maxLength={maxLength}
        className={`w-full bg-secondary text-foreground placeholder:text-muted-foreground rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-ring ${
          error 
            ? "border-destructive focus:ring-destructive" 
            : isNearLimit
            ? "border-warning"
            : "border-border"
        } ${
          size === "lg" ? "pl-11 pr-4 py-3 text-base" : "pl-9 pr-4 py-2 text-sm"
        }`}
      />
      
      {/* Character Counter */}
      <div className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium ${
        isNearLimit ? "text-warning" : "text-muted-foreground"
      }`}>
        {charCount}/{maxLength}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-xs text-destructive mt-2">{error}</p>
      )}
    </form>
  );
}
