// test-db.js
import { connectToDatabase } from './db.js';

async function testConnection() {
  try {
    const { db } = await connectToDatabase();
    const collections = await db.listCollections().toArray();

    console.log("✅ MongoDB connected successfully!");
    console.log("Collections:", collections.map(c => c.name));
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

testConnection();