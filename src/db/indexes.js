export async function createIndexes(db) {
  try {
    // Task collection indexes
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

    // Text search index for tasks
    await db
      .collection("tasks")
      .createIndex({ title: "text" }, { name: "text_search_index" });

    // Messages collection index
    await db
      .collection("messages")
      .createIndex({ createdAt: -1 }, { name: "messages_createdAt_index" });

    console.log("Database indexes created successfully");
  } catch (error) {
    console.error("Failed to create indexes:", error);
    throw error;
  }
}
