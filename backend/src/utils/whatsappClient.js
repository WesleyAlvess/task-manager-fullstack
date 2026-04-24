import fs from "fs";
import path from "path";
import process from "process";
import {
  makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys";

let sockPromise = null;

function getAuthDir() {
  const dir = process.env.WHATSAPP_AUTH_DIR || path.join(process.cwd(), ".wa-auth");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export async function getWhatsAppSocket() {
  if (sockPromise) return sockPromise;

  sockPromise = (async () => {
    const authDir = getAuthDir();
    const { state, saveCreds } = await useMultiFileAuthState(authDir);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
      version,
      auth: state,
      printQRInTerminal: true, // mostra o QR no terminal na 1ª vez
      syncFullHistory: false,
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === "close") {
        const statusCode = lastDisconnect?.error?.output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
        sockPromise = null;
        if (shouldReconnect) {
          // reconecta automaticamente
          void getWhatsAppSocket();
        }
      }
    });

    return sock;
  })();

  return sockPromise;
}

