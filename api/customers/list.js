import { connectToDatabase } from "../../db.js";

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const customers = await db.collection("customers").find({}).sort({ createdAt: -1 }).toArray();
    res.status(200).json(customers);
  } catch (error) {
    console.error("List customers error:", error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
}