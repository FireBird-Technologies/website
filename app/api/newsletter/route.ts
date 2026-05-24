import { NextResponse } from "next/server";
import { escapeHtml, sendToInbox } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await sendToInbox({
      subject: "New newsletter signup",
      replyTo: email,
      html: `
        <h2>New newsletter signup</h2>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
