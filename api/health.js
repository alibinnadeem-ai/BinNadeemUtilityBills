// Vercel Serverless Function for Health Check

import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
}

function handleOptions(req, res) {
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    res.status(200).end();
    return true;
  }
  return false;
}

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  setCorsHeaders(res);

  try {
    const client = await pool.connect();

    try {
      await client.query('SELECT NOW()');
      await client.release();
      res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: 'connected',
        environment: process.env.NODE_ENV || 'development'
      });
    } catch (dbError) {
      await client.release();
      res.status(503).json({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: dbError.message
      });
    }
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
