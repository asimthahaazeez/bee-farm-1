# Backend Features Implementation Guide

## Database Schema Expansion

### Tables to Create/Modify

#### AI Diagnostics
```sql
-- Hive analysis table for storing AI diagnostic results
CREATE TABLE hive_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hive_id UUID REFERENCES hives(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  analysis_status TEXT DEFAULT 'processing', -- processing, completed, failed
  health_score INTEGER, -- 0-100
  population_estimate INTEGER,
  issues_detected JSONB, -- array of detected issues with coordinates
  analysis_results JSONB, -- full AI analysis results
  processing_progress INTEGER DEFAULT 0, -- 0-100
  estimated_completion_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Enhanced hives table
ALTER TABLE hives ADD COLUMN IF NOT EXISTS queen_age_days INTEGER;
ALTER TABLE hives ADD COLUMN IF NOT EXISTS comb_count INTEGER;
ALTER TABLE hives ADD COLUMN IF NOT EXISTS last_analysis_id UUID REFERENCES hive_analyses(id);
```

#### E-commerce Schema
```sql
-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- honey, beeswax, pollen, equipment
  base_price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product variants table
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- e.g., "500ml Wildflower", "1kg Clover"
  sku TEXT UNIQUE,
  price DECIMAL(10,2) NOT NULL,
  inventory_count INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  weight DECIMAL(8,2), -- for shipping calculations
  dimensions JSONB, -- {length, width, height}
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product images table
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  alt_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES auth.users(id),
  order_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled
  total_amount DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(5,4) DEFAULT 0.05, -- 5% platform commission
  commission_amount DECIMAL(10,2),
  payment_intent_id TEXT, -- Stripe payment intent
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),
  seller_id UUID REFERENCES auth.users(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order tracking table
CREATE TABLE order_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  tracking_number TEXT,
  carrier TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  order_item_id UUID REFERENCES order_items(id), -- for verified purchases
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  images JSONB, -- array of image URLs
  is_verified_purchase BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wishlists table
CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Shopping cart table
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, variant_id)
);

-- Seller profiles table
CREATE TABLE seller_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  banner_url TEXT,
  location TEXT,
  established_year INTEGER,
  certifications JSONB, -- array of certification objects
  social_links JSONB, -- social media links
  payout_method JSONB, -- payment method details
  commission_rate DECIMAL(5,4) DEFAULT 0.05,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Edge Functions to Implement

### AI Diagnostics Functions
1. **analyze-hive-image**
   - Accept image upload
   - Process with AI model (external API or hosted model)
   - Store results in hive_analyses table
   - Return progress updates via real-time subscriptions

2. **get-analysis-progress**
   - Return current analysis progress
   - Estimated completion time

### E-commerce Functions
1. **create-checkout-session**
   - Calculate totals including commission
   - Create Stripe checkout session
   - Handle multi-seller orders

2. **process-webhook**
   - Handle Stripe webhooks
   - Update order status
   - Trigger payout calculations

3. **calculate-payouts**
   - Calculate seller payouts minus commission
   - Schedule payouts via Stripe Connect

4. **update-inventory**
   - Decrease inventory on successful payment
   - Handle inventory alerts

### File Storage
1. **upload-product-images**
   - Handle product image uploads
   - Image optimization and resizing
   - Store in Supabase Storage

2. **upload-analysis-images**
   - Handle hive analysis image uploads
   - Store securely with proper access controls

## Real-time Features
- Set up Supabase real-time subscriptions for:
  - Analysis progress updates
  - Order status changes
  - Inventory level changes
  - New reviews notifications

## Security & Performance
- Implement RLS policies for all tables
- Set up proper indexes for search performance
- Implement rate limiting on analysis endpoints
- Add image compression and CDN integration
- Set up automated backups

## Payment Integration
- Stripe Connect for multi-seller payouts
- Webhook handling for order updates
- Commission calculation and automatic deduction
- PCI compliance measures

## Search & SEO
- Implement full-text search across products
- Add structured data markup
- Generate XML sitemaps
- Implement product schema markup for rich snippets

## Analytics & Reporting
- Track seller performance metrics
- Product view/conversion analytics
- Revenue reporting with commission breakdown
- Inventory turnover analytics