import { verify } from '../lib/jwt';

export default function authMiddleware(handler) {
  return async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    try {
      const user = verify(token);
      req.user = user;
      return handler(req, res);
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}