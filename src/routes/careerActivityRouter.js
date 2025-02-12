import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import { config } from "../config/config.js";

const router = express.Router();

// Add task
router.post("/", async (req, res) => {
  let client;
  try {
    const { title, priority, category, dueDate, userId } = req.body;

    // Connect to database
    const uri = process.env.MONGODB_URI || config.mongodb.uri;
    client = await MongoClient.connect(uri);
    const db = client.db(config.mongodb.dbName);

    const task = {
      title,
      priority,
      category,
      dueDate: new Date(dueDate),
      completed: false,
      userId,
      createdAt: new Date(),
    };

    const result = await db.collection("tasks").insertOne(task);
    res.status(201).json({
      message: "Task created successfully",
      taskId: result.insertedId,
    });
  } catch (error) {
    console.error("Failed to create task:", error);
    res.status(500).json({ message: "Failed to create task" });
  } finally {
    if (client) {
      await client.close();
      console.log("Database connection closed");
    }
  }
});

// Get user's tasks
router.get("/user/:userId", async (req, res) => {
  let client;
  try {
    const { userId } = req.params;

    const uri = process.env.MONGODB_URI || config.mongodb.uri;
    client = await MongoClient.connect(uri);
    const db = client.db(config.mongodb.dbName);

    const tasks = await db
      .collection("tasks")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(tasks);
  } catch (error) {
    console.error("Failed to get tasks:", error);
    res.status(500).json({ message: "Failed to get tasks" });
  } finally {
    if (client) {
      await client.close();
      console.log("Database connection closed");
    }
  }
});

// Toggle task status
router.patch("/:taskId/toggle", async (req, res) => {
  let client;
  try {
    const { taskId } = req.params;

    const uri = process.env.MONGODB_URI || config.mongodb.uri;
    client = await MongoClient.connect(uri);
    const db = client.db(config.mongodb.dbName);

    const task = await db.collection("tasks").findOne({
      _id: new ObjectId(taskId),
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await db
      .collection("tasks")
      .updateOne(
        { _id: new ObjectId(taskId) },
        { $set: { completed: !task.completed } }
      );

    res.json({ message: "Task status updated successfully" });
  } catch (error) {
    console.error("Failed to update task status:", error);
    res.status(500).json({ message: "Failed to update task status" });
  } finally {
    if (client) {
      await client.close();
      console.log("Database connection closed");
    }
  }
});

// Delete task
router.delete("/:taskId", async (req, res) => {
  let client;
  try {
    const { taskId } = req.params;

    const uri = process.env.MONGODB_URI || config.mongodb.uri;
    client = await MongoClient.connect(uri);
    const db = client.db(config.mongodb.dbName);

    const result = await db.collection("tasks").deleteOne({
      _id: new ObjectId(taskId),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Failed to delete task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  } finally {
    if (client) {
      await client.close();
      console.log("Database connection closed");
    }
  }
});

// Filter tasks
router.get("/user/:userId/filter", async (req, res) => {
  let client;
  try {
    const { userId } = req.params;
    const { category } = req.query;

    const uri = process.env.MONGODB_URI || config.mongodb.uri;
    client = await MongoClient.connect(uri);
    const db = client.db(config.mongodb.dbName);

    const query = category === "all" ? { userId } : { userId, category };

    const tasks = await db
      .collection("tasks")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    res.json(tasks);
  } catch (error) {
    console.error("Failed to filter tasks:", error);
    res.status(500).json({ message: "Failed to filter tasks" });
  } finally {
    if (client) {
      await client.close();
      console.log("Database connection closed");
    }
  }
});

export default router;
