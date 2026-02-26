import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Check if DATABASE_URL is available
const hasDatabase = !!process.env.DATABASE_URL;

// Only initialize the database client if we have a connection string
let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

if (hasDatabase) {
  const sql = neon(process.env.DATABASE_URL!);
  db = drizzle(sql, { schema });
}

export { db, hasDatabase };
export * from "./schema";
