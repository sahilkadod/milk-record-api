import { connectToDatabase } from "../../db.js";

export default async function handler(req, res) {
  const { customerId } = req.query;
  if (!customerId) return res.status(400).json({ error: "Missing customerId" });

  try {
    const { db } = await connectToDatabase();
    const milkEntries = await db.collection("milk_entries")
      .find({ customerId })
      .sort({ date: -1 })
      .toArray();

    res.status(200).json(milkEntries);
  } catch (error) {
    console.error("List milk entries error:", error);
    res.status(500).json({ error: "Failed to fetch milk entries" });
  }
}