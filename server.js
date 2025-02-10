import express from "express";
import cors from "cors";
import { config } from "./config/config.js";
import { connectDB } from "./config/database.js";
import careerActivityRouter from "./routes/careerActivityRouter.js";
import messageRoutes from "./routes/messageRoutes.js"; // 导入留言板路由
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://careerpath.vercel.app"]
        : ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

// Routes
app.use("/api/tasks", careerActivityRouter);
app.use("/api/messages", messageRoutes);

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Connect to database
connectDB();

// Export the Express API
export default app;
