import { connectDB, getDB } from "./config/database.js";

const sampleTasks = [
  {
    title: "Apply for Software Engineer position at Microsoft",
    priority: "p1",
    category: "applications",
    dueDate: new Date("2025-02-15"),
    completed: false,
    userId: "test-user",
    createdAt: new Date(),
  },
  {
    title: "Prepare for technical interview",
    priority: "p2",
    category: "interviews",
    dueDate: new Date("2025-02-20"),
    completed: false,
    userId: "test-user",
    createdAt: new Date(),
  },
  {
    title: "Complete React.js course",
    priority: "p3",
    category: "skill_dev",
    dueDate: new Date("2025-03-01"),
    completed: false,
    userId: "test-user",
    createdAt: new Date(),
  },
  {
    title: "Attend tech networking event",
    priority: "p2",
    category: "networking",
    dueDate: new Date("2025-02-25"),
    completed: false,
    userId: "test-user",
    createdAt: new Date(),
  },
];

async function seedDatabase() {
  try {
    // Connect to database
    await connectDB();
    const db = getDB();

    // Clear existing tasks
    await db.collection("tasks").deleteMany({});

    // Insert sample tasks
    const result = await db.collection("tasks").insertMany(sampleTasks);

    console.log(`Database seeded! ${result.insertedCount} tasks inserted.`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
