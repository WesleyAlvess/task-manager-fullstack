import { getWhatsAppSocket } from "./whatsappClient.js";

function toJid(e164Digits) {
  // Baileys usa "<numero>@s.whatsapp.net"
  const digits = (e164Digits || "").toString().trim();
  return `${digits}@s.whatsapp.net`;
}

function formatTaskMessage(task) {
  const title = task?.title || "Tarefa";
  const desc = task?.description ? `\n\n${task.description}` : "";
  const deadline = task?.deadline ? `\n\nDeadline: ${new Date(task.deadline).toLocaleString()}` : "";
  return `⏰ Lembrete: ${title}${deadline}${desc}\n\nNão se esqueça de concluir sua tarefa!`;
}

export async function sendReminderWhatsApp(whatsappDigits, task) {
  const digits = (whatsappDigits || "").toString().trim();
  if (!digits) throw new Error("Usuário sem número de WhatsApp cadastrado");
  if (!/^\d{10,15}$/.test(digits)) throw new Error("Número de WhatsApp inválido (use E.164 somente dígitos)");

  const sock = await getWhatsAppSocket();
  const jid = toJid(digits);
  const text = formatTaskMessage(task);

  await sock.sendMessage(jid, { text });
}

