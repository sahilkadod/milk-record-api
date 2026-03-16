import { connectToDatabase } from "../../db.js";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { db } = await connectToDatabase();

  const { username, password } = req.body;

  const user = await db.collection("users").findOne({ username });

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  res.json({ message: "Login successful" });
}