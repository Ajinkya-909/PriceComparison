-- ============================================
-- database2.sql - ENHANCED SCHEMA
-- Adds pricing, discounts, and installment support
-- ============================================

-- ============================================
-- ALTER PRODUCTS TABLE - Add missing pricing fields
-- ============================================

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS original_price DECIMAL(12,2),
ADD COLUMN IF NOT EXISTS warranty_months INTEGER DEFAULT 12,
ADD COLUMN IF NOT EXISTS stock_quantity INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_trending BOOLEAN DEFAULT FALSE;

-- ============================================
-- CREATE PLATFORM_PRICING TABLE
-- Stores price, discount, and details per platform
-- ============================================

CREATE TABLE IF NOT EXISTS platform_pricing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    
    platform_name TEXT NOT NULL,  -- Amazon, Flipkart, eBay, etc
    
    -- Pricing Information
    original_price DECIMAL(12,2) NOT NULL,  -- Price before discount
    discount_amount DECIMAL(12,2) DEFAULT 0,
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    final_price DECIMAL(12,2) NOT NULL,    -- Price after discount
    
    -- Availability & Stock
    in_stock BOOLEAN DEFAULT TRUE,
    stock_quantity INTEGER DEFAULT 0,
    delivery_days INTEGER,
    
    -- Metadata
    platform_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(product_id, platform_name)
);

-- ============================================
-- CREATE INSTALLMENT_PLANS TABLE
-- Stores installment options per platform pricing
-- ============================================

CREATE TABLE IF NOT EXISTS installment_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform_pricing_id UUID NOT NULL REFERENCES platform_pricing(id) ON DELETE CASCADE,
    
    tenure_months INTEGER NOT NULL,          -- 3, 6, 12 months
    interest_rate DECIMAL(5,2) DEFAULT 0,    -- Interest rate %
    
    -- Calculated fields
    monthly_payment DECIMAL(12,2) NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,     -- Total with interest
    processing_fee DECIMAL(12,2) DEFAULT 0,
    
    -- Availability
    is_available BOOLEAN DEFAULT TRUE,
    min_purchase_amount DECIMAL(12,2),       -- Minimum amount to avail
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(platform_pricing_id, tenure_months)
);

-- ============================================
-- INDEXES FOR BETTER PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_platform_pricing_product ON platform_pricing(product_id);
CREATE INDEX IF NOT EXISTS idx_platform_pricing_platform ON platform_pricing(platform_name);
CREATE INDEX IF NOT EXISTS idx_installment_platform_pricing ON installment_plans(platform_pricing_id);
CREATE INDEX IF NOT EXISTS idx_installment_tenure ON installment_plans(tenure_months);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

ALTER TABLE platform_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE installment_plans ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view platform pricing
CREATE POLICY "Anyone can view platform pricing"
    ON platform_pricing FOR SELECT
    USING (true);

-- Allow anyone to view installment plans
CREATE POLICY "Anyone can view installment plans"
    ON installment_plans FOR SELECT
    USING (true);

-- ============================================
-- AUTO-UPDATE TIMESTAMPS
-- ============================================

CREATE TRIGGER update_platform_pricing_updated_at
    BEFORE UPDATE ON platform_pricing
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_installment_plans_updated_at
    BEFORE UPDATE ON installment_plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA - Enhanced with pricing & installments
-- ============================================

-- Update products with original prices
UPDATE products SET original_price = 99999, is_trending = TRUE WHERE name = 'iPhone 15 Pro';
UPDATE products SET original_price = 79999, is_trending = TRUE WHERE name = 'Samsung Galaxy S24';
UPDATE products SET original_price = 199999, is_trending = FALSE WHERE name = 'MacBook Pro 14"';

-- Insert platform pricing for iPhone 15 Pro
INSERT INTO platform_pricing (product_id, platform_name, original_price, discount_amount, discount_percentage, final_price, in_stock, stock_quantity, delivery_days, platform_url)
SELECT id, 'Amazon', 99999, 1000, 1.0, 98999, TRUE, 45, 2, 'https://amazon.com'
FROM products WHERE name = 'iPhone 15 Pro'
ON CONFLICT DO NOTHING;

INSERT INTO platform_pricing (product_id, platform_name, original_price, discount_amount, discount_percentage, final_price, in_stock, stock_quantity, delivery_days, platform_url)
SELECT id, 'Flipkart', 99999, 2000, 2.0, 97999, TRUE, 32, 1, 'https://flipkart.com'
FROM products WHERE name = 'iPhone 15 Pro'
ON CONFLICT DO NOTHING;

INSERT INTO platform_pricing (product_id, platform_name, original_price, discount_amount, discount_percentage, final_price, in_stock, stock_quantity, delivery_days, platform_url)
SELECT id, 'eBay', 99999, 0, 0, 99999, TRUE, 20, 3, 'https://ebay.com'
FROM products WHERE name = 'iPhone 15 Pro'
ON CONFLICT DO NOTHING;

-- Insert installment plans for iPhone 15 Pro - Amazon
INSERT INTO installment_plans (platform_pricing_id, tenure_months, interest_rate, monthly_payment, total_amount, processing_fee, is_available, min_purchase_amount)
SELECT id, 3, 2.0, 33666, 101998, 500, TRUE, 50000
FROM platform_pricing WHERE platform_name = 'Amazon' AND product_id IN (SELECT id FROM products WHERE name = 'iPhone 15 Pro')
ON CONFLICT DO NOTHING;

INSERT INTO installment_plans (platform_pricing_id, tenure_months, interest_rate, monthly_payment, total_amount, processing_fee, is_available, min_purchase_amount)
SELECT id, 6, 2.0, 16833, 101998, 500, TRUE, 50000
FROM platform_pricing WHERE platform_name = 'Amazon' AND product_id IN (SELECT id FROM products WHERE name = 'iPhone 15 Pro')
ON CONFLICT DO NOTHING;

INSERT INTO installment_plans (platform_pricing_id, tenure_months, interest_rate, monthly_payment, total_amount, processing_fee, is_available, min_purchase_amount)
SELECT id, 12, 2.0, 8416, 101992, 500, TRUE, 50000
FROM platform_pricing WHERE platform_name = 'Amazon' AND product_id IN (SELECT id FROM products WHERE name = 'iPhone 15 Pro')
ON CONFLICT DO NOTHING;

-- Insert installment plans for iPhone 15 Pro - Flipkart
INSERT INTO installment_plans (platform_pricing_id, tenure_months, interest_rate, monthly_payment, total_amount, processing_fee, is_available, min_purchase_amount)
SELECT id, 3, 1.5, 32666, 98000, 300, TRUE, 50000
FROM platform_pricing WHERE platform_name = 'Flipkart' AND product_id IN (SELECT id FROM products WHERE name = 'iPhone 15 Pro')
ON CONFLICT DO NOTHING;

INSERT INTO installment_plans (platform_pricing_id, tenure_months, interest_rate, monthly_payment, total_amount, processing_fee, is_available, min_purchase_amount)
SELECT id, 6, 1.5, 16333, 98000, 300, TRUE, 50000
FROM platform_pricing WHERE platform_name = 'Flipkart' AND product_id IN (SELECT id FROM products WHERE name = 'iPhone 15 Pro')
ON CONFLICT DO NOTHING;

INSERT INTO installment_plans (platform_pricing_id, tenure_months, interest_rate, monthly_payment, total_amount, processing_fee, is_available, min_purchase_amount)
SELECT id, 12, 1.5, 8166, 97992, 300, TRUE, 50000
FROM platform_pricing WHERE platform_name = 'Flipkart' AND product_id IN (SELECT id FROM products WHERE name = 'iPhone 15 Pro')
ON CONFLICT DO NOTHING;

-- Insert platform pricing for Samsung Galaxy S24
INSERT INTO platform_pricing (product_id, platform_name, original_price, discount_amount, discount_percentage, final_price, in_stock, stock_quantity, delivery_days, platform_url)
SELECT id, 'Amazon', 79999, 1500, 1.9, 78499, TRUE, 28, 2, 'https://amazon.com'
FROM products WHERE name = 'Samsung Galaxy S24'
ON CONFLICT DO NOTHING;

INSERT INTO platform_pricing (product_id, platform_name, original_price, discount_amount, discount_percentage, final_price, in_stock, stock_quantity, delivery_days, platform_url)
SELECT id, 'Flipkart', 79999, 2500, 3.1, 77499, TRUE, 50, 1, 'https://flipkart.com'
FROM products WHERE name = 'Samsung Galaxy S24'
ON CONFLICT DO NOTHING;

-- Insert installment plans for Samsung Galaxy S24 - Amazon
INSERT INTO installment_plans (platform_pricing_id, tenure_months, interest_rate, monthly_payment, total_amount, processing_fee, is_available, min_purchase_amount)
SELECT id, 3, 2.0, 26166, 78499, 400, TRUE, 40000
FROM platform_pricing WHERE platform_name = 'Amazon' AND product_id IN (SELECT id FROM products WHERE name = 'Samsung Galaxy S24')
ON CONFLICT DO NOTHING;

INSERT INTO installment_plans (platform_pricing_id, tenure_months, interest_rate, monthly_payment, total_amount, processing_fee, is_available, min_purchase_amount)
SELECT id, 6, 2.0, 13083, 78498, 400, TRUE, 40000
FROM platform_pricing WHERE platform_name = 'Amazon' AND product_id IN (SELECT id FROM products WHERE name = 'Samsung Galaxy S24')
ON CONFLICT DO NOTHING;

INSERT INTO installment_plans (platform_pricing_id, tenure_months, interest_rate, monthly_payment, total_amount, processing_fee, is_available, min_purchase_amount)
SELECT id, 12, 2.0, 6541, 78492, 400, TRUE, 40000
FROM platform_pricing WHERE platform_name = 'Amazon' AND product_id IN (SELECT id FROM products WHERE name = 'Samsung Galaxy S24')
ON CONFLICT DO NOTHING;

-- Insert installment plans for Samsung Galaxy S24 - Flipkart
INSERT INTO installment_plans (platform_pricing_id, tenure_months, interest_rate, monthly_payment, total_amount, processing_fee, is_available, min_purchase_amount)
SELECT id, 3, 1.8, 25833, 77499, 300, TRUE, 40000
FROM platform_pricing WHERE platform_name = 'Flipkart' AND product_id IN (SELECT id FROM products WHERE name = 'Samsung Galaxy S24')
ON CONFLICT DO NOTHING;

INSERT INTO installment_plans (platform_pricing_id, tenure_months, interest_rate, monthly_payment, total_amount, processing_fee, is_available, min_purchase_amount)
SELECT id, 6, 1.8, 12916, 77499, 300, TRUE, 40000
FROM platform_pricing WHERE platform_name = 'Flipkart' AND product_id IN (SELECT id FROM products WHERE name = 'Samsung Galaxy S24')
ON CONFLICT DO NOTHING;

INSERT INTO installment_plans (platform_pricing_id, tenure_months, interest_rate, monthly_payment, total_amount, processing_fee, is_available, min_purchase_amount)
SELECT id, 12, 1.8, 6458, 77492, 300, TRUE, 40000
FROM platform_pricing WHERE platform_name = 'Flipkart' AND product_id IN (SELECT id FROM products WHERE name = 'Samsung Galaxy S24')
ON CONFLICT DO NOTHING;

-- Insert platform pricing for MacBook Pro 14"
INSERT INTO platform_pricing (product_id, platform_name, original_price, discount_amount, discount_percentage, final_price, in_stock, stock_quantity, delivery_days, platform_url)
SELECT id, 'Amazon', 199999, 5000, 2.5, 194999, TRUE, 15, 3, 'https://amazon.com'
FROM products WHERE name = 'MacBook Pro 14"'
ON CONFLICT DO NOTHING;

INSERT INTO platform_pricing (product_id, platform_name, original_price, discount_amount, discount_percentage, final_price, in_stock, stock_quantity, delivery_days, platform_url)
SELECT id, 'Flipkart', 199999, 8000, 4.0, 191999, FALSE, 0, 5, 'https://flipkart.com'
FROM products WHERE name = 'MacBook Pro 14"'
ON CONFLICT DO NOTHING;

-- Insert installment plans for MacBook Pro 14" - Amazon
INSERT INTO installment_plans (platform_pricing_id, tenure_months, interest_rate, monthly_payment, total_amount, processing_fee, is_available, min_purchase_amount)
SELECT id, 3, 2.5, 66666, 199998, 800, TRUE, 100000
FROM platform_pricing WHERE platform_name = 'Amazon' AND product_id IN (SELECT id FROM products WHERE name = 'MacBook Pro 14"')
ON CONFLICT DO NOTHING;

INSERT INTO installment_plans (platform_pricing_id, tenure_months, interest_rate, monthly_payment, total_amount, processing_fee, is_available, min_purchase_amount)
SELECT id, 6, 2.5, 33333, 199998, 800, TRUE, 100000
FROM platform_pricing WHERE platform_name = 'Amazon' AND product_id IN (SELECT id FROM products WHERE name = 'MacBook Pro 14"')
ON CONFLICT DO NOTHING;

INSERT INTO installment_plans (platform_pricing_id, tenure_months, interest_rate, monthly_payment, total_amount, processing_fee, is_available, min_purchase_amount)
SELECT id, 12, 2.5, 16666, 199992, 800, TRUE, 100000
FROM platform_pricing WHERE platform_name = 'Amazon' AND product_id IN (SELECT id FROM products WHERE name = 'MacBook Pro 14"')
ON CONFLICT DO NOTHING;
