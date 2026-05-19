import { getDb } from "./db";

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

interface RawPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  video_url: string | null;
  tags: string;
  published: number;
  created_at: string;
  updated_at: string;
}

function parsePost(raw: RawPost): Post {
  return {
    ...raw,
    tags: JSON.parse(raw.tags),
    published: raw.published === 1,
  };
}

export function getAllPosts(): Post[] {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC").all() as RawPost[];
  return rows.map(parsePost);
}

export function getPostBySlug(slug: string): Post | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM posts WHERE slug = ? AND published = 1").get(slug) as RawPost | undefined;
  return row ? parsePost(row) : null;
}

export function getPostsByTag(tag: string): Post[] {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM posts WHERE published = 1 AND tags LIKE ? ORDER BY created_at DESC").all(`%${tag}%`) as RawPost[];
  return rows.map(parsePost);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) tagSet.add(tag);
  }
  return Array.from(tagSet).sort();
}

export function createPost(data: {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  video_url?: string;
  tags: string[];
  published?: boolean;
}): Post {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO posts (slug, title, excerpt, content, cover_image, video_url, tags, published)
    VALUES (@slug, @title, @excerpt, @content, @cover_image, @video_url, @tags, @published)
  `);
  const info = stmt.run({
    ...data,
    cover_image: data.cover_image ?? null,
    video_url: data.video_url ?? null,
    tags: JSON.stringify(data.tags),
    published: data.published ? 1 : 1,
  });
  return getPostBySlug(data.slug)!;
}

export function subscribeEmail(email: string): { success: boolean; already: boolean } {
  const db = getDb();
  try {
    db.prepare("INSERT INTO newsletter_subscribers (email) VALUES (?)").run(email);
    return { success: true, already: false };
  } catch {
    return { success: false, already: true };
  }
}

export function saveContact(data: {
  name: string;
  email: string;
  company?: string;
  message: string;
}): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO contact_submissions (name, email, company, message)
    VALUES (@name, @email, @company, @message)
  `).run({ ...data, company: data.company ?? null });
}
