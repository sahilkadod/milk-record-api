import { connectToDatabase } from "../../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ error: "Missing fields" });

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ username });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
}