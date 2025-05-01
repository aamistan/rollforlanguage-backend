import dotenv from 'dotenv';
dotenv.config();

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/db/schema',
    out: './drizzle',
    dialect: 'mysql',
    dbCredentials: {
        host: process.env.DB_HOST!,
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!,
        ssl: {
            rejectUnauthorized: false,  // ✅ tell mysql2 to allow PlanetScale SSL
        },
    },
});
