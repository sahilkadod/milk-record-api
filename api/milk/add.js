export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { customerId, date, milk_litre, price_per_litre } = req.body;

  if (!customerId || !date || !milk_litre || !price_per_litre) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const total = milk_litre * price_per_litre;

  res.status(201).json({
    success: true,
    data: { customerId, date, milk_litre, price_per_litre, total },
    message: 'Milk record added successfully',
  });
}