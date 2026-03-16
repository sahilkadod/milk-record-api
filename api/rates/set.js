import { connectToDatabase } from "../../db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { month, year, rate } = req.body;
  if (!month || !year || rate == null) return res.status(400).json({ error: "Missing fields" });

  try {
    const { db } = await connectToDatabase();
    await db.collection("monthly_rates").updateOne(
      { month, year },
      { $set: { rate } },
      { upsert: true }
    );

    res.status(200).json({ message: "Rate updated" });
  } catch (error) {
    console.error("Set rate error:", error);
    res.status(500).json({ error: "Failed to set rate" });
  }
}