import express from "express";
// import { MongoClient } from "mongodb";
// import { config } from "../config/config.js";
import { connectDB } from "../db/connection.js";
import { closeDB } from "../db/connection.js";

const router = express.Router();

// Get messages with pagination
router.get("/", async (req, res, next) => {
  // let client;
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
  } finally {
    await closeDB();
  }
});

// Add new message
router.post("/", async (req, res, next) => {
  // let client;
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
  } finally {
    await closeDB();
  }
});

export default router;
