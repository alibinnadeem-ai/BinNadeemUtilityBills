// Database Migration Script
// Run this script to execute database migrations
// Usage: node scripts/run-migration.js

import { Pool } from 'pg';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Neon uses SSL
  }
});

async function runMigration() {
  console.log('🔄 Starting database migration...');

  try {
    // Read migration SQL file
    const migrationPath = join(process.cwd(), 'database', 'migration_add_bill_links.sql');
    const migrationSql = readFileSync(migrationPath, 'utf-8');

    console.log('📝 Migration file loaded:', migrationPath);

    // Connect to database
    console.log('🔌 Connecting to database...');
    await pool.connect();

    // Execute migration
    console.log('⚡ Executing migration...');
    const result = await pool.query(migrationSql);

    console.log('✅ Migration completed successfully!');
    console.log('📊 Migration result:', result.rows[0]?.result || 'Success');

    return true;
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('Stack trace:', error.stack);
    return false;
  } finally {
    // Close connection pool
    await pool.end();
    console.log('🔌 Database connection closed');
  }
}

// Run migration
runMigration()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
