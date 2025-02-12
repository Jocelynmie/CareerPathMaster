import express from "express";
import { MongoClient } from "mongodb";
import { config } from "../config/config.js";

const router = express.Router();

// Get messages with pagination
router.get("/", async (req, res) => {
  let client;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const uri = process.env.MONGODB_URI || config.mongodb.uri;
    client = await MongoClient.connect(uri);
    const db = client.db(config.mongodb.dbName);

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
    console.error("Failed to fetch messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  } finally {
    if (client) {
      await client.close();
      console.log("Database connection closed");
    }
  }
});

// Add new message
router.post("/", async (req, res) => {
  let client;
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const uri = process.env.MONGODB_URI || config.mongodb.uri;
    client = await MongoClient.connect(uri);
    const db = client.db(config.mongodb.dbName);

    const newMessage = {
      content,
      createdAt: new Date(),
    };

    const result = await db.collection("messages").insertOne(newMessage);
    res.status(201).json({ ...newMessage, _id: result.insertedId });
  } catch (error) {
    console.error("Failed to add message:", error);
    res.status(500).json({ error: "Failed to add message" });
  } finally {
    if (client) {
      await client.close();
      console.log("Database connection closed");
    }
  }
});

export default router;
