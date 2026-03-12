# Quick Fix: Direct Database Population

## Issue Summary
- Database tables exist but are empty
- SSL connection issues preventing seeding from running
- Need a way to populate data without dealing with SSL

## Solution 1: Run Database Schema via Neon Console (Easiest)

1. Go to Neon Console: https://console.neon.tech
2. Select your project
3. Click "SQL Editor"
4. Copy and paste the entire contents of `database/schema.sql`
5. Click "Run" button
6. This will create all tables: owners, bills, maintenance_items, communications, rent_tracking, reference_data
7. Wait for success message

## Solution 2: Use Neon Console to Insert Sample Data

After tables are created:

1. In Neon Console → SQL Editor, run this to insert sample owners:

```sql
INSERT INTO owners (id, name, mobile, email, buildings, notes) VALUES
(1, 'Brig Shahid', '0323 4194444', 'shahid@grandcity.pk', '["170"]', 'Owner of Building 170'),
(2, 'Fareed Faridi', '+92 312 4225106', 'fareed@grandcity.pk', '["171"]', 'Owner of Building 171'),
(3, 'Waseem Ijaz', '+92 301 4681313', 'waseem@grandcity.pk', '["172"]', 'Owner of Building 172'),
(4, 'Grand City HQ', '+92 300 1234567', 'hq@grandcity.pk', '["38", "129"]', 'Additional Properties');
```

2. Then insert sample bills:

```sql
INSERT INTO bills (
  company_name, building_number, building_name, floor, unit_number,
  owner_id, bill_type, customer_id, consumer_number, account_number,
  reference_number, due_date, bill_month, status, bill_amount, paid_by, notes
) VALUES
('Eurobiz Corporation', '171', 'Plaza', '', '', 2, 'Electricity',
 '10498361', '44115635517100 U', '0.00', '44115635517100 U',
 '2025-12-16', '2025-11', 'Pending', 0, 'Company', '');
```

3. Repeat for more bills as needed from your SeedData folder

## Solution 3: Run Local Seed Script (After Schema)

After the schema is run and tables are created:

1. Update the seeding script to handle reference_data table creation gracefully:

Open `scripts/seed-database.js` and change line ~549 from:
```javascript
try {
  await client.query(`
    CREATE TABLE IF NOT EXISTS reference_data (...)
```

To:
```javascript
// Remove or comment out the reference_data section in seedAdditionalBills function
// Then run: npm run seed
```

## Recommended Approach

Use **Solution 1** (Neon Console) - it's the most reliable and doesn't require any code changes or dealing with SSL issues.

Once the schema is run and tables exist, the seeding script should work correctly.
