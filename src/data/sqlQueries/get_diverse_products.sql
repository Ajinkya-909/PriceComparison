-- ============================================
-- SQL FUNCTION: Get Diverse Products
-- Fetches 8-10 products from different categories
-- ============================================

-- Drop the function if it exists
DROP FUNCTION IF EXISTS get_diverse_products(INTEGER) CASCADE;

-- Create the function
CREATE OR REPLACE FUNCTION get_diverse_products(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
    id UUID,
    product_id TEXT,
    title TEXT,
    description TEXT,
    category TEXT,
    brand TEXT,
    thumbnail TEXT,
    product_link TEXT,
    offers_link TEXT,
    price TEXT,
    extracted_price NUMERIC,
    original_price TEXT,
    discount_percentage NUMERIC,
    delivery TEXT,
    delivery_price TEXT,
    total_price NUMERIC,
    delivery_return TEXT,
    seller TEXT,
    "position" INTEGER,
    payment_methods TEXT,
    rating NUMERIC,
    reviews INTEGER,
    details JSONB,
    attributes JSONB,
    product_token TEXT,
    is_trending BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    WITH category_products AS (
        -- Get all distinct categories
        SELECT DISTINCT p.category 
        FROM products p
        WHERE p.category IS NOT NULL
        ORDER BY p.category
        LIMIT 10  -- Limit to 10 different categories
    ),
    ranked_products AS (
        -- For each category, randomly rank and select one product
        SELECT 
            p.id,
            p.product_id,
            p.title,
            p.description,
            p.category,
            p.brand,
            p.thumbnail,
            p.product_link,
            p.offers_link,
            p.price,
            p.extracted_price,
            p.original_price,
            p.discount_percentage,
            p.delivery,
            p.delivery_price,
            p.total_price,
            p.delivery_return,
            p.seller,
            p."position",
            p.payment_methods,
            p.rating,
            p.reviews,
            p.details,
            p.attributes,
            p.product_token,
            p.is_trending,
            p.created_at,
            p.updated_at,
            ROW_NUMBER() OVER (PARTITION BY p.category ORDER BY RANDOM()) as rn
        FROM products p
        WHERE p.category IN (SELECT cp.category FROM category_products cp)
    )
    SELECT 
        rp.id,
        rp.product_id,
        rp.title,
        rp.description,
        rp.category,
        rp.brand,
        rp.thumbnail,
        rp.product_link,
        rp.offers_link,
        rp.price,
        rp.extracted_price,
        rp.original_price,
        rp.discount_percentage,
        rp.delivery,
        rp.delivery_price,
        rp.total_price,
        rp.delivery_return,
        rp.seller,
        rp."position",
        rp.payment_methods,
        rp.rating,
        rp.reviews,
        rp.details,
        rp.attributes,
        rp.product_token,
        rp.is_trending,
        rp.created_at,
        rp.updated_at
    FROM ranked_products rp
    WHERE rp.rn = 1  -- Get one random product from each category
    ORDER BY RANDOM()  -- Randomize the order
    LIMIT limit_count;  -- Limit to requested amount (default 10)
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================
-- EXAMPLE USAGE:
-- ============================================
-- SELECT * FROM get_diverse_products(10);  -- Get 10 diverse products
-- SELECT * FROM get_diverse_products(8);   -- Get 8 diverse products
-- SELECT * FROM get_diverse_products();    -- Get default 10 diverse products
