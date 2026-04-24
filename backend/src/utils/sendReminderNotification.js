import { sendReminderEmail } from "./sendReminderEmail.js";
import { sendReminderWhatsApp } from "./sendReminderWhatsApp.js";

export async function sendReminderNotification(user, task) {
  const preferred = (process.env.REMINDER_CHANNEL || "whatsapp").toLowerCase();
  const allowEmailFallback = (process.env.REMINDER_EMAIL_FALLBACK || "true").toLowerCase() === "true";

  const tryWhatsApp = async () => {
    if (!user?.whatsapp) throw new Error("Usuário sem WhatsApp cadastrado");
    await sendReminderWhatsApp(user.whatsapp, task);
  };

  const tryEmail = async () => {
    if (!user?.email) throw new Error("Usuário sem email cadastrado");
    await sendReminderEmail(user.email, task);
  };

  if (preferred === "email") {
    await tryEmail();
    return { channel: "email" };
  }

  try {
    await tryWhatsApp();
    return { channel: "whatsapp" };
  } catch (err) {
    if (!allowEmailFallback) throw err;
    await tryEmail();
    return { channel: "email_fallback" };
  }
}

