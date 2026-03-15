// Cron Job de Lembretes
import cron from "node-cron";
import Task from "../models/Task.js";
import { sendReminderEmail } from "../utils/sendReminderEmail.js";

// Rodando a cada minuto
cron.schedule("* * * * *", async () => {
  try {
    console.log("Verificando tarefas...");

    const now = new Date();

    // Busca tasks cujo reminderAt já passou e ainda não foram enviadas
    const tasks = await Task.find({
      reminderAt: { $lte: now },
      reminderSent: false,
    }).populate("user"); // Para pegar o email do usuário

    if (tasks.length === 0) {
      console.log("Nenhum lembrete a enviar no momento.");
      return;
    }

    console.log(`Tasks encontradas: ${tasks.length}`);

    // Envio paralelo de emails
    const tasksToSend = tasks.map(async (task) => {
      console.log(`⏰ Task encontrada: ${task.title} reminderAt: ${task.reminderAt.toISOString()} now: ${now.toISOString()}`);

      // Envia o email
      await sendReminderEmail(task.user.email, task);

      // Marca como enviado
      task.reminderSent = true;
      await task.save();

      console.log(`✅ Email enviado para ${task.user.email} sobre a task "${task.title}"`);
    });

    // Aguarda todos os envios terminarem
    await Promise.all(tasksToSend);

    console.log("Todas as tasks foram processadas.\n");
  } catch (error) {
    console.error("Erro no cron job de lembretes:", error);
  }
});
