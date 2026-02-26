import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Initialize Neon client with DATABASE_URL from environment
// This will be set in Vercel environment variables
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not configured');
}

const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });
export type DB = typeof db;
