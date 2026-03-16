import { connectToDatabase } from "../../db.js";

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const milkRecords = await db.collection("milk").find({}).toArray();
    res.status(200).json(milkRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch milk records" });
  }
}