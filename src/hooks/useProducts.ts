import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// Flat Product Schema - matches database3.sql
export interface Product {
  id: string;
  product_id: string;           // Google's unique product ID
  title: string;
  description?: string;
  category?: string;
  brand?: string;
  thumbnail?: string;           // Product image
  product_link?: string;
  offers_link?: string;
  price?: string;                // Formatted: "₹428"
  extracted_price?: number;      // Numeric for sorting
  original_price?: string;       // "53% off₹1,999"
  discount_percentage?: number;
  delivery?: string;             // "Free delivery"
  delivery_price?: string;
  total_price?: number;
  delivery_return?: string;      // "7-day returns"
  seller?: string;               // Amazon.in, Myntra, etc.
  position?: number;             // Search result position
  payment_methods?: string;
  rating?: number;
  reviews?: number;
  details?: Record<string, any>;        // JSON field
  attributes?: Record<string, any>;     // JSON field
  product_token?: string;
  is_trending?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface UseProductsOptions {
  limit?: number;
  category?: string;
  randomize?: boolean;
  diverseCategories?: boolean;
}

// Helper function to shuffle array randomly
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Helper function to get diverse products from different categories
const getDiverseProducts = (allProds: Product[], count: number): Product[] => {
  if (allProds.length <= count) return allProds;

  const categoryMap = new Map<string, Product[]>();
  allProds.forEach((p) => {
    const cat = p.category || "Other";
    if (!categoryMap.has(cat)) {
      categoryMap.set(cat, []);
    }
    categoryMap.get(cat)!.push(p);
  });

  const result: Product[] = [];
  const categories = Array.from(categoryMap.keys());
  let categoryIndex = 0;

  // Pick products from different categories in round-robin fashion
  while (result.length < count) {
    const cat = categories[categoryIndex % categories.length];
    const catProducts = categoryMap.get(cat);
    if (catProducts && catProducts.length > 0) {
      const randomProduct = catProducts.splice(
        Math.floor(Math.random() * catProducts.length),
        1
      )[0];
      result.push(randomProduct);
    }
    categoryIndex++;
  }

  return result.slice(0, count);
};

export function useProducts(options: UseProductsOptions = {}) {
  const { limit = 10, category, randomize = false, diverseCategories = false } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchProducts = async (currentOffset: number, isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true);
      }
      setError(null);

      // If randomize is enabled and we have all products, cycle through them
      if (randomize && allProducts.length > 0 && isLoadMore) {
        const newProducts = diverseCategories
          ? getDiverseProducts(allProducts, limit)
          : shuffleArray(allProducts).slice(0, limit);

        setProducts((prev) => [...prev, ...newProducts]);
        setHasMore(true); // Always have more when randomizing
        return;
      }

      let query = supabase.from("products").select("*", { count: "exact" });

      if (category) {
        query = query.eq("category", category);
      }

      // Order by created_at descending for latest products
      query = query.order("created_at", { ascending: false });

      const { data, error: fetchError, count } = await query
        .range(currentOffset, currentOffset + limit - 1);

      if (fetchError) throw fetchError;

      if (!data || data.length === 0) {
        // If no data and randomize is on, cycle through products
        if (randomize && allProducts.length > 0) {
          const newProducts = diverseCategories
            ? getDiverseProducts(allProducts, limit)
            : shuffleArray(allProducts).slice(0, limit);

          if (isLoadMore) {
            setProducts((prev) => [...prev, ...newProducts]);
          } else {
            setProducts(newProducts);
          }
          setHasMore(true);
          return;
        }

        setProducts(isLoadMore ? products : []);
        setHasMore(false);
        return;
      }

      // Data is already in the flat format from the database
      const flatProducts: Product[] = data.map((p) => ({
        id: p.id,
        product_id: p.product_id,
        title: p.title,
        description: p.description,
        category: p.category,
        brand: p.brand,
        thumbnail: p.thumbnail,
        product_link: p.product_link,
        offers_link: p.offers_link,
        price: p.price,
        extracted_price: p.extracted_price,
        original_price: p.original_price,
        discount_percentage: p.discount_percentage,
        delivery: p.delivery,
        delivery_price: p.delivery_price,
        total_price: p.total_price,
        delivery_return: p.delivery_return,
        seller: p.seller,
        position: p.position,
        payment_methods: p.payment_methods,
        rating: p.rating,
        reviews: p.reviews,
        details: p.details,
        attributes: p.attributes,
        product_token: p.product_token,
        is_trending: p.is_trending,
        created_at: p.created_at,
        updated_at: p.updated_at,
      }));

      // Store all products on first load for randomization
      if (isInitialLoad && !isLoadMore) {
        setAllProducts(flatProducts);
        setIsInitialLoad(false);
      }

      let productsToDisplay = flatProducts;

      // Apply randomization and diverse categories if enabled
      if (randomize && isInitialLoad && !isLoadMore) {
        productsToDisplay = diverseCategories
          ? getDiverseProducts(flatProducts, limit)
          : shuffleArray(flatProducts).slice(0, limit);
      }

      if (isLoadMore) {
        setProducts((prev) => [...prev, ...productsToDisplay]);
      } else {
        setProducts(productsToDisplay);
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

// ============================================
// Hook: Fetch diverse products from database function
// Fetches 8-10 products from different categories
// ============================================
export function useDiverseProducts(limit: number = 10) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchDiverseProducts = async (currentOffset: number = 0, isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true);
      }
      setError(null);

      // Call the RPC function to get diverse products
      const { data, error: fetchError, count } = await supabase.rpc("get_diverse_products", {
        limit_count: limit,
      });

      if (fetchError) throw fetchError;

      if (!data || data.length === 0) {
        setProducts(isLoadMore ? products : []);
        setHasMore(false);
        return;
      }

      // Map data to Product interface
      const flatProducts: Product[] = data.map((p: any) => ({
        id: p.id,
        product_id: p.product_id,
        title: p.title,
        description: p.description,
        category: p.category,
        brand: p.brand,
        thumbnail: p.thumbnail,
        product_link: p.product_link,
        offers_link: p.offers_link,
        price: p.price,
        extracted_price: p.extracted_price,
        original_price: p.original_price,
        discount_percentage: p.discount_percentage,
        delivery: p.delivery,
        delivery_price: p.delivery_price,
        total_price: p.total_price,
        delivery_return: p.delivery_return,
        seller: p.seller,
        position: p.position || p["position"],
        payment_methods: p.payment_methods,
        rating: p.rating,
        reviews: p.reviews,
        details: p.details,
        attributes: p.attributes,
        product_token: p.product_token,
        is_trending: p.is_trending,
        created_at: p.created_at,
        updated_at: p.updated_at,
      }));

      if (isLoadMore) {
        setProducts((prev) => [...prev, ...flatProducts]);
      } else {
        setProducts(flatProducts);
      }

      setHasMore(true); // Always have more since we randomize
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch diverse products";
      setError(errorMessage);
      console.error("Error fetching diverse products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDiverseProducts(0, false);
  }, [limit]);

  // Load more products
  const loadMore = async () => {
    if (!loading) {
      await fetchDiverseProducts(offset + limit, true);
    }
  };

  const refetch = async () => {
    await fetchDiverseProducts(0, false);
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
