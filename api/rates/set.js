import { connectToDatabase } from "../../db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { rate } = req.body;
  if (!rate) return res.status(400).json({ error: "Missing rate" });

  try {
    const { db } = await connectToDatabase();
    await db.collection("rates").updateOne({}, { $set: { rate } }, { upsert: true });
    res.status(200).json({ message: "Rate updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update rate" });
  }
}