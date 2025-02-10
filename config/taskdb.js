import { MongoClient } from "mongodb";
import { config } from "./config.js";

let db = null;
let client = null;

export async function connectDB() {
  try {
    if (db) return db;

    const uri = process.env.MONGODB_URI || config.mongodb.uri;
    client = await MongoClient.connect(uri);
    db = client.db(config.mongodb.dbName);

    await createIndexes();

    console.log(`Connected to MongoDB database: ${config.mongodb.dbName}`);
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export async function getDB() {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
}

export async function closeDB() {
  if (client) {
    await client.close();
    db = null;
    client = null;
    console.log("Database connection closed");
  }
}

async function createIndexes() {
  try {
    // 为 tasks 集合创建索引
    await db.collection("tasks").createIndexes([
      {
        key: { userId: 1 },
        name: "userId_index",
      },
      {
        key: { userId: 1, category: 1 },
        name: "userId_category_index",
      },
      {
        key: { createdAt: -1 },
        name: "createdAt_index",
      },
      {
        key: { userId: 1, dueDate: 1 },
        name: "userId_dueDate_index",
      },
      {
        key: { userId: 1, priority: 1 },
        name: "userId_priority_index",
      },
    ]);

    // 为 tasks 集合创建全文索引
    await db
      .collection("tasks")
      .createIndex({ title: "text" }, { name: "text_search_index" });

    // 为 messages 集合创建索引
    await db
      .collection("messages")
      .createIndex({ createdAt: -1 }, { name: "messages_createdAt_index" });

    console.log("Database indexes created successfully");
  } catch (error) {
    console.error("Failed to create indexes:", error);
    throw error;
  }
}

// Helper function to validate MongoDB ObjectId
export function isValidObjectId(id) {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(id);
}

// Helper function for error handling
export function handleDatabaseError(error, operation) {
  console.error(`Database error during ${operation}:`, error);
  if (error.code === 11000) {
    throw new Error("Duplicate entry found");
  }
  throw new Error(`Database error during ${operation}`);
}
