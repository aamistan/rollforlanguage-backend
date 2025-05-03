import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { config } from 'dotenv';

config(); // load .env

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  ssl: {
    rejectUnauthorized: true,
  },
});

export const db: MySql2Database = drizzle(pool);
