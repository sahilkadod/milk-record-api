import { connectToDatabase } from "../../db.js";

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();

    // Fetch customers
    const customers = await db.collection("customers")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // ✅ Log retrieved data
    console.log("List customers - fetched data:", customers);

    res.status(200).json(customers);
  } catch (error) {
    // ❌ Log the error for debugging
    console.error("List customers error:", error);

    res.status(500).json({ error: "Failed to fetch customers" });
  }
}