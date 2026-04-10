import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface PlatformPrice {
  platform: string;
  originalPrice: number;
  discountAmount: number;
  discountPercentage: number;
  finalPrice: number;
  inStock: boolean;
  stockQuantity: number;
  deliveryDays: number;
  platformUrl: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  rating: number;
  brand?: string;
  originalPrice: number;
  warrantyMonths: number;
  isTrending: boolean;
  platformPrices: PlatformPrice[];
}

// Get best price from platform prices
export function getBestPrice(prices: PlatformPrice[]) {
  if (prices.length === 0) return prices[0] || null;
  return prices.reduce((best, current) =>
    current.finalPrice < best.finalPrice ? current : best
  );
}

interface UseProductsOptions {
  limit?: number;
  category?: string;
}

export function useProducts(options: UseProductsOptions = {}) {
  const { limit = 10, category } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchProducts = async (currentOffset: number, isLoadMore = false) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from("products").select("*");

      if (category) {
        query = query.eq("category", category);
      }

      const { data, error: fetchError, count } = await query
        .range(currentOffset, currentOffset + limit - 1);

      if (fetchError) throw fetchError;

      if (!data) {
        setProducts([]);
        setHasMore(false);
        return;
      }

      // Fetch platform pricing for each product
      const productsWithPricing = await Promise.all(
        data.map(async (product) => {
          const { data: platformData } = await supabase
            .from("platform_pricing")
            .select("*")
            .eq("product_id", product.id);

          const platformPrices: PlatformPrice[] = (platformData || []).map((p) => ({
            platform: p.platform_name,
            originalPrice: p.original_price,
            discountAmount: p.discount_amount,
            discountPercentage: p.discount_percentage,
            finalPrice: p.final_price,
            inStock: p.in_stock,
            stockQuantity: p.stock_quantity,
            deliveryDays: p.delivery_days,
            platformUrl: p.platform_url,
          }));

          return {
            id: product.id,
            name: product.name,
            category: product.category,
            image: product.image_url || "https://via.placeholder.com/400",
            description: product.description || "",
            rating: product.rating || 0,
            brand: product.brand,
            originalPrice: product.original_price || 0,
            warrantyMonths: product.warranty_months || 12,
            isTrending: product.is_trending || false,
            platformPrices,
          };
        })
      );

      if (isLoadMore) {
        setProducts((prev) => [...prev, ...productsWithPricing]);
      } else {
        setProducts(productsWithPricing);
      }

      // Check if there are more products
      const totalCount = count || 0;
      setHasMore(currentOffset + limit < totalCount);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch products";
      setError(errorMessage);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    setOffset(0);
    fetchProducts(0, false);
  }, [category, limit]);

  // Load more products
  const loadMore = async () => {
    if (!loading && hasMore) {
      const newOffset = offset + limit;
      setOffset(newOffset);
      await fetchProducts(newOffset, true);
    }
  };

  const refetch = async () => {
    setOffset(0);
    await fetchProducts(0, false);
  };

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    refetch,
  };
}
