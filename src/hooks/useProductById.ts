import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface Installment {
  id: string;
  tenureMonths: number;
  interestRate: number;
  monthlyPayment: number;
  totalAmount: number;
  processingFee: number;
  isAvailable: boolean;
  minPurchaseAmount: number;
}

export interface PlatformPrice {
  id: string;
  platform: string;
  originalPrice: number;
  discountAmount: number;
  discountPercentage: number;
  finalPrice: number;
  inStock: boolean;
  stockQuantity: number;
  deliveryDays: number;
  platformUrl: string;
  installments: Installment[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  image: string;
  rating: number;
  originalPrice: number;
  warrantyMonths: number;
  isTrending: boolean;
  platformPrices: PlatformPrice[];
}

export function useProductById(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .single();

        if (fetchError) throw fetchError;

        if (!data) {
          setError("Product not found");
          return;
        }

        // Fetch platform pricing with installments
        const { data: platformData } = await supabase
          .from("platform_pricing")
          .select(`
            *,
            installment_plans (
              id,
              tenure_months,
              interest_rate,
              monthly_payment,
              total_amount,
              processing_fee,
              is_available,
              min_purchase_amount
            )
          `)
          .eq("product_id", productId);

        const platformPrices: PlatformPrice[] = (platformData || []).map((p) => ({
          id: p.id,
          platform: p.platform_name,
          originalPrice: p.original_price,
          discountAmount: p.discount_amount,
          discountPercentage: p.discount_percentage,
          finalPrice: p.final_price,
          inStock: p.in_stock,
          stockQuantity: p.stock_quantity,
          deliveryDays: p.delivery_days,
          platformUrl: p.platform_url,
          installments: (p.installment_plans || []).map((inst: any) => ({
            id: inst.id,
            tenureMonths: inst.tenure_months,
            interestRate: inst.interest_rate,
            monthlyPayment: inst.monthly_payment,
            totalAmount: inst.total_amount,
            processingFee: inst.processing_fee,
            isAvailable: inst.is_available,
            minPurchaseAmount: inst.min_purchase_amount,
          })),
        }));

        const transformedProduct: Product = {
          id: data.id,
          name: data.name,
          description: data.description || "",
          category: data.category,
          brand: data.brand || "",
          image: data.image_url || "https://via.placeholder.com/400",
          rating: data.rating || 0,
          originalPrice: data.original_price || 0,
          warrantyMonths: data.warranty_months || 12,
          isTrending: data.is_trending || false,
          platformPrices,
        };

        setProduct(transformedProduct);
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

  return { product, loading, error };
}
