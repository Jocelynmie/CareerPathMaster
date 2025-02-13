// src/db/connection.js
import { MongoClient } from "mongodb";
import { config } from "../config/config.js";

let db = null;
let client = null;

export async function connectDB() {
  try {
    if (db) return db;

    // const uri = process.env.MONGODB_URI || config.mongodb.uri;
    client = await MongoClient.connect(config.mongodb.uri);
    db = client.db(config.mongodb.dbName);

    console.log(`Connected to MongoDB database: ${config.mongodb.dbName}`);
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export async function closeDB() {
  if (client) {
    await client.close();
    db = null;
    client = null;
    // console.log("Database connection closed");
  }
}

const dbConnection = {
  connectDB,
  closeDB,
};

export default dbConnection;
