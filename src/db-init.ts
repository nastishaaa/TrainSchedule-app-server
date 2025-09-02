import dotenv from "dotenv";
import { Pool, PoolClient, QueryResult } from "pg";

dotenv.config();

export const dbPool: Pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "trains_db",
  password: process.env.POSTGRESQL_PASS, 
  port: 5432,
});

const initDb = async (): Promise<void> => {
  try {
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS trains (
        id SERIAL PRIMARY KEY,
        number VARCHAR(10) NOT NULL,
        name VARCHAR(100),
        departure_station VARCHAR(100) NOT NULL,
        arrival_station VARCHAR(100) NOT NULL,
        departure_time TIME NOT NULL,
        arrival_time TIME NOT NULL,
        travel_duration INTERVAL,
        seats_available INT DEFAULT 0,
        price NUMERIC(10, 2),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("Table trains ready!");

    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(200) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("Table users ready!");

    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        access_token TEXT NOT NULL,
        refresh_token TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        expires_at TIMESTAMP NOT NULL
      )
    `);
    console.log("Table sessions ready!");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error creating tables:", err.message);
    } else {
      console.error("Unknown error creating tables:", err);
    }
  }
};

initDb();
