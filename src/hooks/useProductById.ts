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
  details?: Record<string, any>;
  attributes?: Record<string, any>;
  product_token?: string;
  is_trending?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Other sellers of same product
export interface OtherSeller {
  seller?: string;
  price?: string;
  extracted_price?: number;
  delivery?: string;
  rating?: number;
  id: string;
}

export function useProductById(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [otherSellers, setOtherSellers] = useState<OtherSeller[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the specific product by its database ID
        const { data, error: fetchError } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .single();

        if (fetchError) throw fetchError;
        if (!data) throw new Error("Product not found");

        const mappedProduct: Product = {
          id: data.id,
          product_id: data.product_id,
          title: data.title,
          description: data.description,
          category: data.category,
          brand: data.brand,
          thumbnail: data.thumbnail,
          product_link: data.product_link,
          offers_link: data.offers_link,
          price: data.price,
          extracted_price: data.extracted_price,
          original_price: data.original_price,
          discount_percentage: data.discount_percentage,
          delivery: data.delivery,
          delivery_price: data.delivery_price,
          total_price: data.total_price,
          delivery_return: data.delivery_return,
          seller: data.seller,
          position: data.position,
          payment_methods: data.payment_methods,
          rating: data.rating,
          reviews: data.reviews,
          details: data.details,
          attributes: data.attributes,
          product_token: data.product_token,
          is_trending: data.is_trending,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };

        setProduct(mappedProduct);

        // Fetch other sellers of the same product (same product_id)
        const { data: otherData, error: otherError } = await supabase
          .from("products")
          .select("id, seller, price, extracted_price, delivery, rating")
          .eq("product_id", data.product_id)
          .neq("id", productId)
          .order("extracted_price", { ascending: true });

        if (otherError) {
          console.error("Error fetching other sellers:", otherError);
        } else {
          setOtherSellers(
            (otherData || []).map((seller) => ({
              id: seller.id,
              seller: seller.seller,
              price: seller.price,
              extracted_price: seller.extracted_price,
              delivery: seller.delivery,
              rating: seller.rating,
            }))
          );
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch product";
        setError(errorMessage);
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  return {
    product,
    otherSellers,
    loading,
    error,
  };
}
