import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

// Configuração do transport do Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", //provedor
  auth: {
    user: process.env.EMAIL_USER, //email de envio
    pass: process.env.EMAIL_PASS, //app password
  }
})

// Funcao que envia lembrete
export async function sendReminderEmail(userEmail, task) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Lembrete: Tarefa "${task.title}"`,
    html: `
      <h2>Você tem um lembrete!</h2>
      <p><strong>Título:</strong> ${task.title}</p>
      <p><strong>Descrição:</strong> ${task.description || "Sem descrição"}</p>
      <p><strong>Deadline:</strong> ${task.deadline.toLocaleString()}</p>
      <p>Não se esqueça de concluir sua tarefa!</p>
    `,
  })
}
