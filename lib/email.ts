import { Resend } from "resend";

let resend: Resend | null = null;

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resend) resend = new Resend(apiKey);
  return resend;
}

export function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function getEmailConfig() {
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? "arslan@firebird-technologies.com";
  const client = getResend();

  if (!client || !from) return null;

  return { client, from, to };
}

export async function sendToInbox({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const config = getEmailConfig();
  if (!config) {
    throw new Error("Email is not configured");
  }

  const { error } = await config.client.emails.send({
    from: config.from,
    to: config.to,
    subject,
    html,
    replyTo,
  });

  if (error) throw error;
}
