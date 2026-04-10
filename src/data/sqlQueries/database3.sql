-- ============================================
-- PRICE PREDICTION APP - DATABASE SCHEMA v3
-- CONSOLIDATED SCHEMA: Products + Profiles Only
-- ============================================

-- ============================================
-- ⚠️ CLEANUP: Delete ALL tables except profiles
-- This ensures a clean slate for the new schema
-- ============================================
DROP TABLE IF EXISTS installment_plans CASCADE;
DROP TABLE IF EXISTS platform_pricing CASCADE;
DROP TABLE IF EXISTS prices CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- ============================================
-- 1️⃣ PROFILES TABLE (User Profile Data)
-- Stores user information linked to Supabase Auth
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Personal Information
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    
    -- User Preferences
    theme TEXT DEFAULT 'system',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 2️⃣ PRODUCTS TABLE (Unified Product & Pricing)
-- Stores all product attributes from API in a flat structure
-- Supports flexible attributes from Google Shopping API
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- ========== CORE IDENTIFICATION & VISUALS ==========
    product_id TEXT NOT NULL UNIQUE,           -- Google's unique product ID
    title TEXT NOT NULL,                       -- Product name
    description TEXT,                           -- Product description
    category TEXT,                              -- Product category
    brand TEXT,                                 -- Manufacturer/Brand name
    
    thumbnail TEXT,                             -- Product image URL
    product_link TEXT,                          -- Link to product page
    offers_link TEXT,                           -- Link to all offers/sellers
    
    -- ========== PRICING & SHIPPING METRICS ==========
    price TEXT,                                 -- Formatted price with currency (e.g., "₹428")
    extracted_price NUMERIC,                    -- Pure numeric price for sorting (e.g., 428.0)
    original_price TEXT,                        -- Original price string (e.g., "53% off₹1,999")
    discount_percentage NUMERIC,                -- Discount % (e.g., 53)
    
    delivery TEXT,                              -- Delivery info (e.g., "Free delivery")
    delivery_price TEXT,                        -- Shipping cost info (e.g., "Free" or "+ $6.00")
    total_price NUMERIC,                        -- Final price including delivery
    delivery_return TEXT,                       -- Return policy (e.g., "7-day returns")
    
    -- ========== MERCHANT & OFFER DETAILS ==========
    seller TEXT,                                -- Store/Merchant name (e.g., "Amazon.in")
    position INTEGER,                           -- Display ranking in search results
    payment_methods TEXT,                       -- Accepted payment methods (e.g., "PayPal, Affirm")
    
    -- ========== SOCIAL PROOF & METADATA ==========
    rating NUMERIC,                             -- Customer rating (e.g., 4.5)
    reviews INTEGER,                            -- Number of customer reviews
    
    -- ========== FLEXIBILITY FOR EDGE CASES ==========
    details JSONB,                              -- Additional details as JSON (stock status, extra info, etc.)
    attributes JSONB,                           -- Extra attributes/variations not in standard fields
    
    -- ========== CROSS-VENDOR PRICE COMPARISON ==========
    product_token TEXT,                         -- Encoded token for fetching cross-vendor comparisons
    
    -- ========== SYSTEM & TRACKING ==========
    is_trending BOOLEAN DEFAULT FALSE,          -- Trending product flag
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES FOR BETTER QUERY PERFORMANCE
-- ============================================

-- Product-related indexes
CREATE INDEX IF NOT EXISTS idx_products_product_id ON products(product_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller);
CREATE INDEX IF NOT EXISTS idx_products_extracted_price ON products(extracted_price);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating);
CREATE INDEX IF NOT EXISTS idx_products_is_trending ON products(is_trending);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- Profiles-related indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
