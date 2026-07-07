import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Contact form endpoint. Receives the JSON payload from the Contacts
 * section and relays it to the agency mailbox over SMTP (nodemailer).
 * All connection details live in env vars (see .env.example) - nothing
 * secret is committed. Runs on the Node runtime because nodemailer needs
 * Node's net/tls, which the Edge runtime does not provide.
 */
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: unknown;
  email?: unknown;
  budget?: unknown;
  message?: unknown;
};

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(request: NextRequest) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const name = str(body.name);
  const email = str(body.email);
  const budget = str(body.budget);
  const message = str(body.message);

  // Server-side validation mirrors the client rules - never trust the client.
  if (!name || !EMAIL_RE.test(email) || !message) {
    return NextResponse.json(
      { ok: false, error: "validation" },
      { status: 422 },
    );
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO ?? user;
  const from = process.env.CONTACT_FROM ?? user;

  if (!host || !user || !pass || !to || !from) {
    // Misconfiguration is our fault, not the visitor's - log and 500.
    console.error("[contact] missing SMTP env vars");
    return NextResponse.json({ ok: false, error: "config" }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    // 465 = implicit TLS; 587/25 = STARTTLS (secure:false, upgraded later).
    secure: port === 465,
    auth: { user, pass },
  });

  const lines = [
    `Імʼя: ${name}`,
    `Email: ${email}`,
    budget ? `Бюджет: ${budget}` : null,
    "",
    "Повідомлення:",
    message,
  ].filter((l) => l !== null);

  try {
    await transporter.sendMail({
      from: `"boweb — заявка з сайту" <${from}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `Нова заявка з сайту — ${name}`,
      text: lines.join("\n"),
    });
  } catch (err) {
    console.error("[contact] sendMail failed:", err);
    return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
