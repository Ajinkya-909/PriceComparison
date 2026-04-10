-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  product_id text NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  category text,
  brand text,
  thumbnail text,
  product_link text,
  offers_link text,
  price text,
  extracted_price numeric,
  original_price text,
  discount_percentage numeric,
  delivery text,
  delivery_price text,
  total_price numeric,
  delivery_return text,
  seller text,
  position integer,
  payment_methods text,
  rating numeric,
  reviews integer,
  details jsonb,
  attributes jsonb,
  product_token text,
  is_trending boolean DEFAULT false,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT products_pkey PRIMARY KEY (id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  email text NOT NULL UNIQUE,
  first_name text,
  last_name text,
  avatar_url text,
  bio text,
  theme text DEFAULT 'system'::text,
  notifications_enabled boolean DEFAULT true,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);