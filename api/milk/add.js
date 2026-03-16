import { connectToDatabase } from "../../db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { customerId, liters, shift } = req.body;
  if (!customerId || !liters) return res.status(400).json({ error: "Missing required fields" });

  try {
    const { db } = await connectToDatabase();
    const result = await db.collection("milk").insertOne({
      customerId,
      liters,
      shift: shift || "morning",
      date: new Date()
    });

    res.status(201).json({ message: "Milk entry added", id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add milk entry" });
  }
}