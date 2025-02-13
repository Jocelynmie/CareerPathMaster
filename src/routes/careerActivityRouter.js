import express from "express";
import { ObjectId } from "mongodb";
// import { config } from "../config/config.js";
import { connectDB } from "../db/connection.js";
import { closeDB } from "../db/connection.js";
// import { nextTick } from "process";

const router = express.Router();

// Add task
router.post("/", async (req, res, next) => {
  // let client;
  try {
    const { title, priority, category, dueDate, userId } = req.body;
    const db = await connectDB(); // Connect to database

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
    next(error);
  } finally {
    await closeDB();
    // console.log("Database connection closed");
  }
});

// Get user's tasks
router.get("/user/:userId", async (req, res, next) => {
  // let client;
  try {
    const { userId } = req.params;

    const db = await connectDB(); // Connect to database

    const tasks = await db
      .collection("tasks")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(tasks);
  } catch (error) {
    next(error);
  } finally {
    await closeDB();
    // console.log("Database connection closed");
  }
});

// Toggle task status
router.patch("/:taskId/toggle", async (req, res, next) => {
  // let client;
  try {
    const { taskId } = req.params;
    const db = await connectDB(); // Connect to database

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
    next(error);
  } finally {
    await closeDB();
  }
});

// Delete task
router.delete("/:taskId", async (req, res, next) => {
  // let client;
  try {
    const { taskId } = req.params;

    const db = await connectDB(); // Connect to database

    const result = await db.collection("tasks").deleteOne({
      _id: new ObjectId(taskId),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  } finally {
    await closeDB();
  }
});

// Filter tasks
router.get("/user/:userId/filter", async (req, res, next) => {
  // let client;
  try {
    const { userId } = req.params;
    const { category } = req.query;

    const db = await connectDB(); // Connect to database

    const query = category === "all" ? { userId } : { userId, category };

    const tasks = await db
      .collection("tasks")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    res.json(tasks);
  } catch (error) {
    next(error);
  } finally {
    await closeDB();
  }
});

export default router;
