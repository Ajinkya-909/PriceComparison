/**
 * Delivery Price Calculator
 * Calculates delivery cost based on product price, brand, and policies
 */

export interface DeliveryCalculatorParams {
  price?: number;
  brand?: string;
  hasReturnPolicy?: boolean;
  hasDeliveryInfo?: boolean;
  seller?: string;
  deliveryReturn?: string;
}

export interface DeliveryResult {
  deliveryPrice: number;
  totalPrice: number;
  isFreeDelivery: boolean;
  deliveryEstimate?: string;
}

// Premium brands that typically offer free delivery
const PREMIUM_BRANDS = [
  "Apple",
  "Samsung",
  "Google",
  "OnePlus",
  "OPPO",
  "Vivo",
  "Xiaomi",
  "Realme",
  "Nothing",
  "Motorola",
  "iQOO",
  "Tecno",
];

// Sellers with known free delivery policies
const FREE_DELIVERY_SELLERS = [
  "Amazon.in",
  "Flipkart",
  "Google Store",
  "Samsung.com",
  "Apple",
  "Official Store",
];

/**
 * Calculate delivery price based on various factors
 * @param params - Delivery calculation parameters
 * @returns DeliveryResult with delivery price and total price
 */
export function calculateDeliveryPrice(
  params: DeliveryCalculatorParams
): DeliveryResult {
  const {
    price = 0,
    brand = "",
    hasReturnPolicy = false,
    hasDeliveryInfo = false,
    seller = "",
    deliveryReturn = "",
  } = params;

  let deliveryPrice = 0;
  let isFreeDelivery = false;

  // Rule 1: Check if seller is known for free delivery
  const sellerOffersFreeDelivery = FREE_DELIVERY_SELLERS.some((s) =>
    seller?.toLowerCase().includes(s.toLowerCase())
  );

  if (sellerOffersFreeDelivery) {
    deliveryPrice = 0;
    isFreeDelivery = true;
  }
  // Rule 2: Check if brand is premium (usually offers free or discounted delivery)
  else if (PREMIUM_BRANDS.some((b) => brand?.toLowerCase().includes(b.toLowerCase()))) {
    if (price >= 20000) {
      deliveryPrice = 0;
      isFreeDelivery = true;
    } else if (price >= 10000) {
      deliveryPrice = Math.round(price * 0.01); // 1% of price, minimum free
      isFreeDelivery = false;
    } else {
      deliveryPrice = Math.max(40, Math.round(price * 0.02)); // 2% of price, minimum ₹40
      isFreeDelivery = false;
    }
  }
  // Rule 3: Product price-based delivery calculation
  else if (price >= 30000) {
    // High-value products
    deliveryPrice = 0;
    isFreeDelivery = true;
  } else if (price >= 15000) {
    // Mid to high-value products
    deliveryPrice = hasReturnPolicy ? 0 : 50;
    isFreeDelivery = hasReturnPolicy;
  } else if (price >= 5000) {
    // Mid-value products
    deliveryPrice = hasReturnPolicy ? 40 : 80;
    isFreeDelivery = false;
  } else if (price >= 2000) {
    // Budget products
    deliveryPrice = hasReturnPolicy ? 60 : 99;
    isFreeDelivery = false;
  } else {
    // Very low-value products
    deliveryPrice = 99;
    isFreeDelivery = false;
  }

  // Rule 4: 15-day return policy often indicates quality sellers with free/low delivery
  if (deliveryReturn?.toLowerCase().includes("15-day") && !isFreeDelivery) {
    deliveryPrice = Math.max(0, deliveryPrice - 20);
    if (deliveryPrice <= 10) {
      deliveryPrice = 0;
      isFreeDelivery = true;
    }
  }

  // Rule 5: 3-day return policy might indicate premium/marketplace seller
  if (deliveryReturn?.toLowerCase().includes("3-day") && !isFreeDelivery) {
    deliveryPrice = Math.max(0, deliveryPrice - 30);
    if (deliveryPrice <= 10) {
      deliveryPrice = 0;
      isFreeDelivery = true;
    }
  }

  const totalPrice = price + deliveryPrice;
  const deliveryEstimate = generateDeliveryEstimate(price, seller);

  return {
    deliveryPrice,
    totalPrice,
    isFreeDelivery,
    deliveryEstimate,
  };
}

/**
 * Generate a delivery estimate message
 */
function generateDeliveryEstimate(price: number, seller: string): string {
  if (seller?.toLowerCase().includes("amazon")) {
    return "2-3 days delivery";
  } else if (seller?.toLowerCase().includes("flipkart")) {
    return "3-4 days delivery";
  } else if (seller?.toLowerCase().includes("google")) {
    return "1-2 days delivery";
  } else if (seller?.toLowerCase().includes("vijay")) {
    return "5-7 days delivery";
  } else if (seller?.toLowerCase().includes("poorvika")) {
    return "4-5 days delivery";
  } else {
    return "3-5 days delivery";
  }
}

/**
 * Format price as Indian currency
 */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/**
 * Get savings amount (original price - current price - delivery)
 */
export function calculateSavings(
  originalPrice?: number,
  currentPrice?: number,
  deliveryPrice?: number
): number {
  if (!originalPrice || !currentPrice) return 0;
  return originalPrice - (currentPrice + (deliveryPrice || 0));
}
