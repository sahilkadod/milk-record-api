import dbConnect from "../../db";
import bcrypt from "bcryptjs";
import { signToken } from "../../lib/jwt";

export default async function handler(req, res) {
  await dbConnect();

  const { username, password } = req.body;

  // find user in DB
  const user = { username, password: "$2a$10..." }; // example

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken({ username });

  res.json({ token });
}