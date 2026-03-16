import { connectToDatabase } from "../../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ error: "Missing fields" });

  try {
    const { db } = await connectToDatabase();

    const existingUser = await db.collection("users").findOne({ username });
    if (existingUser) return res.status(400).json({ error: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      username,
      password: hashedPassword,
      createdAt: new Date()
    });

    const token = jwt.sign({ id: result.insertedId, username }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ token, userId: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
}