import auth from "../../middleware/auth";

export default async function handler(req, res) {

  try {
    auth(req);

    const customers = [];

    res.json(customers);

  } catch (err) {
    res.status(401).json({ error: err.message });
  }

}