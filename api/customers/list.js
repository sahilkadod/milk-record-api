import { connectToDatabase } from "../../db.js";

export default async function handler(req, res) {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI env var not set");
    }

    const { db } = await connectToDatabase();

    const customers = await db.collection("customers").find({}).toArray();

    res.status(200).json(customers);
  } catch (error) {
    console.error("Error in /api/customers/list:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}