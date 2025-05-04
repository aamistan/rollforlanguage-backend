import { env } from "../config/env";
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { config } from 'dotenv';

config(); // load .env

const pool = mysql.createPool({
  host: env.DATABASE_HOST,
  user: env.DATABASE_USERNAME,
  database: env.DATABASE_NAME,
  password: env.DATABASE_PASSWORD,
  ssl: {
    rejectUnauthorized: true,
  },
});

export const db: MySql2Database = drizzle(pool);
