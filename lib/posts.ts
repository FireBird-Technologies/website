import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  video_url: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

function readPost(filename: string, index: number): Post | null {
  const slug = filename.replace(/\.md$/, "");
  const filePath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  if (data.published === false) return null;

  return {
    id: index + 1,
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? "",
    content,
    cover_image: data.cover_image ?? null,
    video_url: data.video_url ?? null,
    tags: Array.isArray(data.tags) ? data.tags : [],
    published: true,
    created_at: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    updated_at: data.updated ? new Date(data.updated).toISOString() : new Date().toISOString(),
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .reverse()
    .map((f, i) => readPost(f, i))
    .filter((p): p is Post => p !== null);
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return readPost(`${slug}.md`, 0);
}
