import express from "express";
import { connectDB } from "../db/connection.js";
// 移除 closeDB 的导入，因为我们不需要在每次请求后关闭连接

const router = express.Router();

// Get messages with pagination
router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const db = await connectDB();

    const [messages, totalMessages] = await Promise.all([
      db
        .collection("messages")
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection("messages").countDocuments(),
    ]);

    res.json({
      messages,
      totalPages: Math.ceil(totalMessages / limit),
      currentPage: page,
      totalMessages,
    });
  } catch (error) {
    next(error);
  }
  // 移除 finally 块，不要关闭连接
});

// Add new message
router.post("/", async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const db = await connectDB();
    const newMessage = {
      content,
      createdAt: new Date(),
    };

    const result = await db.collection("messages").insertOne(newMessage);
    res.status(201).json({ ...newMessage, _id: result.insertedId });
  } catch (error) {
    next(error);
  }
  // 移除 finally 块，不要关闭连接
});

export default router;
