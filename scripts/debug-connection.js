// Simple debug script

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables from parent directory
const projectRoot = path.resolve(process.cwd(), '..');
const envPath = path.join(projectRoot, '.env');
console.log('Looking for .env at:', envPath);
console.log('Exists:', fs.existsSync(envPath));

// Try loading with parent directory .env
try {
  const envConfig = dotenv.config({ path: envPath });
  const DB_URL = envConfig.parsed.DATABASE_URL || 'NOT_SET';

  console.log('DATABASE_URL loaded:', DB_URL);
  console.log('Length:', DB_URL.length);
  console.log('');

  // Find the @ symbol position
  const atIndex = DB_URL.indexOf('@');
  if (atIndex !== -1) {
    console.log('Position of @:', atIndex);
    console.log('Before @:', DB_URL.substring(0, atIndex));
    const afterAt = DB_URL.substring(atIndex);
    console.log('After @:', afterAt);
  }

  console.log('='.repeat(60));
} catch (error) {
  console.error('Error loading .env:', error.message);
}
