// db.js
import { MongoClient } from "mongodb";
import 'dotenv/config'; // loads .env.local automatically

const uri = process.env.MONGO_URI;
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    serverApi: {
      version: "1",
      strict: true,
      deprecationErrors: true,
    },
  });
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db("milk-record"); // your database name
  return { client, db };
}