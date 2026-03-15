import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    completed: { type: Boolean, default: false },

    // data limite da tarefa
    deadline: {
      type: Date
    },

    // quantos minutos antes enviar lembrete
    reminderMinutesBefore: {
      type: Number,
      default: 30
    },

    // horário exato do lembrete
    reminderAt: {
      type: Date
    },

    // controla se o email já foi enviado
    reminderSent: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
