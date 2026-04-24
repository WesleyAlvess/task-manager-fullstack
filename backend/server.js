import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import { errorHandler } from "./src/middleware/errorMiddleware.js";
import cors from "cors";
import "./src/jobs/taskReminder.js";

dotenv.config();
connectDB();

const app = express();

// CORS 
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (
      origin.includes("localhost") ||
      origin.includes("netlify.app")
    ) {
      return callback(null, true);
    }

    console.log("CORS bloqueou:", origin);
    return callback(new Error("Não permitido pelo CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

// Middleware
app.use(express.json());

// Rota teste
app.get("/", (req, res) => {
  res.send("API funcionando");
});

// Servir uploads
app.use("/uploads", express.static("uploads"));

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
