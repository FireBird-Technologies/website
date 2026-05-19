import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, createPost } from "@/lib/posts";

export function GET() {
  try {
    const posts = getAllPosts();
    return NextResponse.json({ posts });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, title, excerpt, content, cover_image, video_url, tags, published } = body;

    if (!slug || !title || !content) {
      return NextResponse.json({ error: "slug, title, and content are required" }, { status: 400 });
    }

    const post = createPost({ slug, title, excerpt: excerpt ?? "", content, cover_image, video_url, tags: tags ?? [], published });
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
