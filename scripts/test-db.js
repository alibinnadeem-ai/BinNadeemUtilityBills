// Database Connection Test Script

import pkg from 'pg';
const { Pool } = pkg;

async function testConnection() {
  console.log('Testing database connection...');

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    const client = await pool.connect();
    console.log('Connection successful!');

    // Check if tables exist
    const tables = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );

    console.log('Tables found:', tables.rows.length);
    tables.rows.forEach(row => console.log('  -', row.table_name));

    // Get actual counts
    try {
      const ownersCount = await client.query('SELECT COUNT(*) FROM owners');
      const billsCount = await client.query('SELECT COUNT(*) FROM bills');
      console.log('Owners count:', ownersCount.rows[0].count);
      console.log('Bills count:', billsCount.rows[0].count);
    } catch (e) {
      console.log('(Tables might be empty - run schema first)');
    }

    await client.release();
    await pool.end();
    console.log('Test completed successfully!');
  } catch (error) {
    console.error('Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
