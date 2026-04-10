-- ============================================
-- Price Prediction App Database Schema
-- ============================================

-- 1️⃣ PROFILES TABLE (User Profile Data)
-- This table stores additional user information linked to Supabase Auth
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    
    -- User preferences
    theme TEXT DEFAULT 'system',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2️⃣ PRODUCTS TABLE (Product Information & Prices)
-- This table stores predefined products with prices from different platforms
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    brand TEXT,
    
    image_url TEXT,
    
    rating DECIMAL(2,1) DEFAULT 0,
    
    -- Dynamic fields for prices from different platforms
    attributes JSONB,  -- Example: {"amazon": 1999, "flipkart": 1899, "ebay": 2099}
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES FOR BETTER QUERY PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to view only their own profile
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

-- Allow users to update only their own profile
CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Allow new users to insert their profile
CREATE POLICY "Users can insert their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Enable RLS on products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view products (read-only for users)
CREATE POLICY "Anyone can view products"
    ON products FOR SELECT
    USING (true);

-- ============================================
-- AUTO-UPDATE TIMESTAMPS
-- ============================================

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles table
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for products table
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

INSERT INTO products (name, description, category, brand, image_url, rating, attributes)
VALUES 
    (
        'iPhone 15 Pro',
        'Apple flagship smartphone with A17 Pro chip',
        'Smartphones',
        'Apple',
        'https://via.placeholder.com/300',
        4.8,
        '{"amazon": 99999, "flipkart": 98999, "ebay": 101999}'::jsonb
    ),
    (
        'Samsung Galaxy S24',
        'Premium Android smartphone with Snapdragon 8 Gen 3',
        'Smartphones',
        'Samsung',
        'https://via.placeholder.com/300',
        4.7,
        '{"amazon": 79999, "flipkart": 78999, "ebay": 81999}'::jsonb
    ),
    (
        'MacBook Pro 14"',
        'Powerful laptop for professionals',
        'Laptops',
        'Apple',
        'https://via.placeholder.com/300',
        4.9,
        '{"amazon": 199999, "flipkart": 199999, "ebay": 205999}'::jsonb
    );
