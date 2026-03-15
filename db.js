import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;

export const getDBConnection = async () => {
  if (!db) {
    db = await open({
      filename: './milkbook_vercel.db',
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT,
        address TEXT,
        created_at TEXT
      );
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS milk_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        morning_liter REAL DEFAULT 0,
        morning_fat REAL DEFAULT 0,
        evening_liter REAL DEFAULT 0,
        evening_fat REAL DEFAULT 0,
        created_at TEXT,
        FOREIGN KEY(customer_id) REFERENCES customers(id)
      );
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS monthly_rates (
        month INTEGER NOT NULL,
        year INTEGER NOT NULL,
        rate REAL NOT NULL,
        PRIMARY KEY (month, year)
      );
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        password TEXT NOT NULL,
        created_at TEXT
      );
    `);
  }
  return db;
};