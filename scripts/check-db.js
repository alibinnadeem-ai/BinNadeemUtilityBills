// Check Database Tables

import dotenv from 'dotenv';
import pg from 'pg';

// Load environment variables from current directory
dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false // Disable SSL for now
});

async function checkDB() {
  console.log('Checking database tables...\n');

  try {
    const client = await pool.connect();
    console.log('Connected successfully!');

    // List all tables
    const tables = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );

    if (tables.rows.length === 0) {
      console.log('No tables found in database!');
      console.log('You need to run the database schema first.');
    } else {
      console.log('Tables found:');
      tables.rows.forEach(row => console.log('  -', row.table_name));

      // Check if reference_data exists
      try {
        const refTable = await client.query(
          "SELECT to_regclass('reference_data', 'pg_class') FROM pg_class WHERE pg_class.relname = 'reference_data'"
        );
        console.log('\nreference_data table exists:', refTable.rows.length > 0);
      } catch (e) {
        console.log('\nreference_data table does not exist (OK - script will create it)');
      }

      // Get counts for other tables
      const ownersCount = await client.query('SELECT COUNT(*) FROM owners');
      const billsCount = await client.query('SELECT COUNT(*) FROM bills');
      console.log('\nRecord Counts:');
      console.log('  Owners:', ownersCount.rows[0].count);
      console.log('  Bills:', billsCount.rows[0].count);
    }

    await client.release();
    await pool.end();
  } catch (error) {
    console.error('Connection failed:', error.message);
    console.log('\nPossible issues:');
    console.log('1. Make sure DATABASE_URL in .env is correct');
    console.log('2. Database might be in maintenance mode');
    console.log('3. Try accessing Neon Console to verify connection');
    process.exit(1);
  }
}

checkDB();
