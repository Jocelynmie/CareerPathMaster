import express from "express";
import { connectDB, handleDatabaseError } from "../config/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  try {
    const db = await connectDB();
    const skip = (page - 1) * limit;
    const messages = await db
      .collection("messages")
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    const totalMessages = await db.collection("messages").countDocuments();
    res.json({
      messages,
      totalPages: Math.ceil(totalMessages / limit),
      currentPage: page,
    });
  } catch (error) {
    handleDatabaseError(error, "fetching messages");
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }
  try {
    const db = await connectDB();
    const newMessage = {
      content,
      createdAt: new Date(),
    };
    const result = await db.collection("messages").insertOne(newMessage);
    res.status(201).json({ ...newMessage, _id: result.insertedId });
  } catch (error) {
    handleDatabaseError(error, "adding message");
    res.status(500).json({ error: error.message });
  }
});

export default router;
