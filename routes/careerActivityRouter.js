import express from "express";
import { getDB } from "../config/database.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Add task
router.post("/", async (req, res) => {
  try {
    const { title, priority, category, dueDate, userId } = req.body;
    const db = getDB();

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
  }
});

// Get user's tasks
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const db = getDB();

    const tasks = await db
      .collection("tasks")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(tasks);
  } catch (error) {
    console.error("Failed to get tasks:", error);
    res.status(500).json({ message: "Failed to get tasks" });
  }
});

router.patch("/:taskId/toggle", async (req, res) => {
  try {
    const { taskId } = req.params;
    const db = getDB();
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
    res.status(500).json({ message: "Failed to update task status" });
  }
});

router.delete("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const db = getDB();
    const result = await db.collection("tasks").deleteOne({
      _id: new ObjectId(taskId),
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

// Filter tasks
router.get("/user/:userId/filter", async (req, res) => {
  try {
    const { userId } = req.params;
    const { category } = req.query;
    const db = getDB();

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
  }
});

export default router;
