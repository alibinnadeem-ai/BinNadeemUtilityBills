-- Migration: Add View Bill Link and Bill Payment Link columns to bills table
-- Run this SQL in your Neon database console to add the new columns

-- Add view_bill_link column
ALTER TABLE bills ADD COLUMN IF NOT EXISTS view_bill_link TEXT;

-- Add bill_payment_link column
ALTER TABLE bills ADD COLUMN IF NOT EXISTS bill_payment_link TEXT;

-- Add indexes for the new columns (optional, for faster searches if needed)
CREATE INDEX IF NOT EXISTS idx_bills_view_bill_link ON bills(view_bill_link);
CREATE INDEX IF NOT EXISTS idx_bills_payment_link ON bills(bill_payment_link);

-- Migration complete
SELECT 'Migration completed successfully: Added view_bill_link and bill_payment_link columns to bills table' as result;
