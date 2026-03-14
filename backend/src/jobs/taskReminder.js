// Cron
import cron from "node-cron"
// Task
import Task from "../models/Task.js"

cron.schedule("*/10 * * * * *", async () => {
  console.log("Verificando tarefas...");
  const now = new Date()

  const tasks = await Task.find({
    deadline: { $lte: now },
    reminderSent: false
  })

  for (const task of tasks) {
    console.log(`⏰ Lembrete da tarefa: ${task.title}`);

    task.reminderSent = true
    await task.save()
  }
})
