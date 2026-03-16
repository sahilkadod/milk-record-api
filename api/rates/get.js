import { connectToDatabase } from "../../db.js";

export default async function handler(req, res) {
  const { month, year } = req.query;
  if (!month || !year) return res.status(400).json({ error: "Missing month or year" });

  try {
    const { db } = await connectToDatabase();
    const rate = await db.collection("monthly_rates").findOne({ month: parseInt(month), year: parseInt(year) });
    res.status(200).json({ rate: rate?.rate || 0 });
  } catch (error) {
    console.error("Get rate error:", error);
    res.status(500).json({ error: "Failed to fetch rate" });
  }
}