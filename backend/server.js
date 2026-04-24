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

// 🔐 CORS CONFIGURADO (seguro)
const allowedOrigins = [
  "http://localhost:5173",
  "https://pageley.netlify.app",
  "https://task-manager-fullstack-x3xn.netlify.app" // coloca aqui o seu domínio atual se for outro
];

app.use(cors({
  origin: function (origin, callback) {
    // permite requisições sem origin (Postman, mobile, etc)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log("CORS bloqueou:", origin);
      return callback(new Error("Não permitido pelo CORS"));
    }
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
