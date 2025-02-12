// server.js
import express from "express";
import cors from "cors";
import dbConnection from "./src/db/connection.js";
import careerActivityRouter from "./src/routes/careerActivityRouter.js";
import messageRoutes from "./src/routes/messageRoutes.js";
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
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Connect to database
dbConnection.connectDB().catch(console.error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
