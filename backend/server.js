import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import { errorHandler } from "./src/middleware/errorMiddleware.js";
import cors from "cors"
import "./src/jobs/taskReminder.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ["https://tasksmanagerw.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Middleware
app.use(express.json());

// Servir Imagens
app.use("/uploads", express.static("uploads"))

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
