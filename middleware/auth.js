import { verifyToken } from "../lib/jwt";

export default function auth(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  return verifyToken(token);
}