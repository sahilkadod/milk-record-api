import dbConnect from "../../db";
import bcrypt from "bcryptjs";
import { signToken } from "../../lib/jwt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();

  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  // Save user in DB (example)
  const user = { username, password: hashed };

  const token = signToken({ username });

  res.json({ user, token });
}