import { connectToDatabase } from "../../db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, phone, address } = req.body;
  if (!name || !phone) return res.status(400).json({ error: "Missing required fields" });

  try {
    const { db } = await connectToDatabase();
    const result = await db.collection("customers").insertOne({
      name,
      phone,
      address: address || "",
      createdAt: new Date()
    });

    res.status(201).json({ message: "Customer added", id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add customer" });
  }
}