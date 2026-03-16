import { connectToDatabase } from "../../db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { customerId, date, morningLiter, morningFat, eveningLiter, eveningFat } = req.body;
  if (!customerId || !date) return res.status(400).json({ error: "Missing required fields" });

  try {
    const { db } = await connectToDatabase();
    const result = await db.collection("milk_entries").insertOne({
      customerId,
      date: new Date(date),
      morningLiter: morningLiter || 0,
      morningFat: morningFat || 0,
      eveningLiter: eveningLiter || 0,
      eveningFat: eveningFat || 0,
      createdAt: new Date()
    });

    res.status(201).json({ message: "Milk entry added", id: result.insertedId });
  } catch (error) {
    console.error("Add milk entry error:", error);
    res.status(500).json({ error: "Failed to add milk entry" });
  }
}