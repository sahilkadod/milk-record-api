export default async function handler(req, res) {

  const { rate } = req.body;

  res.json({ message: "Rate updated", rate });

}