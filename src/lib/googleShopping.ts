/**
 * Google Shopping API Integration
 * Fetches real-time product data from Google Shopping
 */

export interface ShoppingProduct {
  position?: number;
  product_id?: string;
  title?: string;
  product_link?: string;
  offers_link?: string;
  price?: string;
  extracted_price?: number;
  original_price?: string;
  rating?: number;
  reviews?: number;
  delivery?: string;
  delivery_return?: string;
  seller?: string;
  thumbnail?: string;
  product_token?: string;
}

export interface GoogleShoppingResult {
  success: boolean;
  data?: ShoppingProduct[];
  error?: string;
  message?: string;
}

/**
 * Fetch products from Google Shopping API
 * @param searchQuery - The search term
 * @returns Promise with products or error
 */
export async function fetchGoogleShoppingResults(
  searchQuery: string
): Promise<GoogleShoppingResult> {
  try {
    // Get API key from environment variables
    const apiKey = import.meta.env.VITE_GOOGLE_SHOPPING_API;

    if (!apiKey) {
      console.error("Google Shopping API key not configured");
      return {
        success: false,
        error: "API configuration error. Please try again later.",
      };
    }

    // Construct the API URL
    const url = `https://www.searchapi.io/api/v1/search?engine=google_shopping&q=${encodeURIComponent(
      searchQuery
    )}&gl=in&hl=en&api_key=${apiKey}`;

    // Set a 15-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    console.log(`🔍 Fetching Google Shopping results for: "${searchQuery}"`);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    const data = await response.json();

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(
        data.error || `API Error: ${response.status}`
      );
    }

    // Check if search was successful
    if (
      data.search_metadata &&
      data.search_metadata.status === "Success"
    ) {
      const products = data.shopping_results
        ? data.shopping_results.slice(0, 20)
        : [];

      console.log(`✅ Found ${products.length} products`);

      return {
        success: true,
        data: products,
      };
    } else {
      return {
        success: false,
        data: [],
        message: "No products found for your search.",
      };
    }
  } catch (error: any) {
    // Handle timeouts
    if (error.name === "AbortError") {
      console.error("⏱️ Search timeout - API took too long to respond");
      return {
        success: false,
        error: "Search took too long. Please try again.",
      };
    }

    // Handle network errors
    console.error("❌ Error fetching from Google Shopping API:", error.message);
    return {
      success: false,
      error: error.message || "Failed to fetch products. Please try again.",
    };
  }
}

/**
 * Validate search query length and format
 * @param query - The search query to validate
 * @param maxLength - Maximum length allowed (default: 50 characters or ~10 words)
 * @returns Validation result with message
 */
export function validateSearchQuery(
  query: string,
  maxLength: number = 50
): { valid: boolean; message?: string } {
  if (!query || query.trim().length === 0) {
    return { valid: false, message: "Please enter a search term" };
  }

  if (query.trim().length < 2) {
    return {
      valid: false,
      message: "Search term must be at least 2 characters",
    };
  }

  if (query.length > maxLength) {
    return {
      valid: false,
      message: `Search term cannot exceed ${maxLength} characters`,
    };
  }

  return { valid: true };
}
