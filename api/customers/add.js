import auth from "../../middleware/auth";

export default async function handler(req, res) {

  try {
    auth(req);

    const { name, phone } = req.body;

    const customer = {
      name,
      phone
    };

    res.json({ message: "Customer added", customer });

  } catch (err) {
    res.status(401).json({ error: err.message });
  }

}