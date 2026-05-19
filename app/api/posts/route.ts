import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";

export function GET() {
  try {
    const posts = getAllPosts();
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
