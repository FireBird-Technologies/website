import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    await resend.emails.send({
      from: "FireBird Contact <sales@firebird-technologies.com>",
      to: "arslan@firebird-technologies.com",
      subject: "New Newsletter Subscriber",
      text: `New subscriber: ${email}`,
    });

    return NextResponse.json({ message: "Subscribed successfully" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
