import { connectToDatabase } from "../db.js";

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();

    // test query
    const collections = await db.listCollections().toArray();

    res.status(200).json({
      message: "MongoDB connected successfully",
      collections
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "MongoDB connection failed",
      error: error.message
    });
  }
}