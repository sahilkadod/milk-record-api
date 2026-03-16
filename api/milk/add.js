import auth from "../../middleware/auth";

export default async function handler(req, res) {

  try {
    auth(req);

    const { customerId, liters } = req.body;

    const entry = {
      customerId,
      liters,
      date: new Date()
    };

    res.json({ message: "Milk entry saved", entry });

  } catch (err) {
    res.status(401).json({ error: err.message });
  }

}