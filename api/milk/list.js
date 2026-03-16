import auth from "../../middleware/auth";

export default async function handler(req, res) {

  try {
    auth(req);

    const milkRecords = [];

    res.json(milkRecords);

  } catch (err) {
    res.status(401).json({ error: err.message });
  }

}