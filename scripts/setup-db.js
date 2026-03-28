// Database Schema Setup Script
// Run this script to execute database schema files
// Usage: node scripts/setup-db.js

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

async function runSchema() {
  console.log('🔄 Starting database schema setup...');

  try {
    const schemaPath = join(process.cwd(), 'database', 'schema.sql');
    const schemaSql = readFileSync(schemaPath, 'utf-8');

    const migrationPath = join(process.cwd(), 'database', 'migration_add_bill_links.sql');
    const migrationSql = readFileSync(migrationPath, 'utf-8');

    console.log('🔌 Connecting to database...');
    await pool.connect();

    console.log('⚡ Executing schema...');
    await pool.query(schemaSql);
    console.log('✅ Base schema created successfully!');

    console.log('⚡ Executing migrations...');
    await pool.query(migrationSql);
    console.log('✅ Migrations completed successfully!');

    return true;
  } catch (error) {
    console.error('❌ Schema setup failed:', error.message);
    console.error('Stack trace:', error.stack);
    return false;
  } finally {
    await pool.end();
    console.log('🔌 Database connection closed');
  }
}

// Run setup
runSchema()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
