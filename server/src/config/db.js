import dotenv from "dotenv";
dotenv.config(); // 🔥 THIS LINE WAS MISSING

import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
