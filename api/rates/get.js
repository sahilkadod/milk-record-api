import { connectToDatabase } from "../../db.js";

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const rate = await db.collection("rates").findOne({});
    res.status(200).json(rate || { rate: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get rate" });
  }
}