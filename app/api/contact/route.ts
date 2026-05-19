import { NextRequest, NextResponse } from "next/server";
import { saveContact } from "@/lib/posts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "name, email, and message are required" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    saveContact({ name, email, company, message });
    return NextResponse.json({ message: "Message received" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save contact" }, { status: 500 });
  }
}
