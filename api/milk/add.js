import { getDBConnection } from '../../db';
import authMiddleware from '../../middleware/auth';

async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { customer_id, date, morning_liter, morning_fat, evening_liter, evening_fat } = req.body;

  if (!customer_id || !date) return res.status(400).json({ message: 'Missing required fields' });

  const db = await getDBConnection();
  await db.run(
    `INSERT INTO milk_entries (customer_id, date, morning_liter, morning_fat, evening_liter, evening_fat, created_at)
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
    [customer_id, date, morning_liter || 0, morning_fat || 0, evening_liter || 0, evening_fat || 0]
  );

  res.status(201).json({ success: true, message: 'Milk entry added successfully' });
}

export default authMiddleware(handler);