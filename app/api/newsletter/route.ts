import { NextRequest, NextResponse } from "next/server";
import { subscribeEmail } from "@/lib/posts";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const result = subscribeEmail(email);

    if (result.already) {
      return NextResponse.json({ message: "Already subscribed" });
    }

    return NextResponse.json({ message: "Subscribed successfully" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
