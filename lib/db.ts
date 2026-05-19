import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "blog.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  _db = new Database(DB_PATH);
  _db.pragma("journal_mode = WAL");

  _db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      cover_image TEXT,
      video_url TEXT,
      tags TEXT NOT NULL DEFAULT '[]',
      published INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      subscribed_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      message TEXT NOT NULL,
      submitted_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  const count = (_db.prepare("SELECT COUNT(*) as count FROM posts").get() as { count: number }).count;
  if (count === 0) seedPosts(_db);

  return _db;
}

function seedPosts(db: Database.Database) {
  const stmt = db.prepare(`
    INSERT INTO posts (slug, title, excerpt, content, tags, published)
    VALUES (@slug, @title, @excerpt, @content, @tags, @published)
  `);

  stmt.run({
    slug: "introducing-autoanalyst",
    title: "Introducing AutoAnalyst: AI-Powered Data Analytics",
    excerpt: "AutoAnalyst transforms raw data into actionable insights with zero configuration. Here's how we built it.",
    content: `# Introducing AutoAnalyst

AutoAnalyst is our flagship open-source AI data analytics platform that makes complex data analysis accessible to everyone.

## What is AutoAnalyst?

AutoAnalyst uses large language models to interpret your data, generate visualizations, and surface insights — all through a natural language interface.

\`\`\`python
import autoanalyst as aa

df = aa.load("sales_data.csv")
insights = df.ask("What are the top performing products this quarter?")
print(insights)
\`\`\`

## Key Features

- **Natural Language Queries** — Ask questions about your data in plain English
- **Automatic Visualizations** — Charts and graphs generated automatically
- **Anomaly Detection** — AI-powered detection of outliers and trends
- **Export to PDF/Excel** — Share insights with your team instantly

## Architecture

1. **Data Ingestion Layer** — Handles CSV, JSON, SQL, and API data sources
2. **AI Analysis Layer** — LLM-powered query interpretation and insight generation
3. **Visualization Layer** — React-based interactive dashboards

AutoAnalyst is fully open source under the MIT license. Star us on GitHub and contribute!`,
    tags: JSON.stringify(["AI", "Product", "Open Source"]),
    published: 1,
  });

  stmt.run({
    slug: "blog2video-content-to-video",
    title: "Blog2Video: Turn Your Articles Into Engaging Videos",
    excerpt: "Blog2Video uses AI to automatically convert written content into professional video presentations.",
    content: `# Blog2Video: Content to Video in Minutes

Creating video content is time-consuming. Blog2Video solves this by automatically transforming your written articles into polished video presentations.

## How It Works

1. **Paste your article** — Any article, blog post, or script
2. **AI processes content** — Our LLM breaks it into scenes and generates voiceover
3. **Video generated** — A ready-to-publish video in minutes

\`\`\`typescript
const result = await blog2video.convert({
  content: articleText,
  style: 'professional',
  voice: 'en-US-Neural2-D',
  backgroundMusic: 'corporate',
});

console.log(result.videoUrl);
\`\`\`

## Use Cases

- Content marketers converting blog posts to YouTube videos
- Educators creating lecture videos from notes
- Companies producing training materials at scale
- Agencies delivering video content faster

Early users report **10x faster** content production and **40% higher engagement**.`,
    tags: JSON.stringify(["AI", "Product", "Video"]),
    published: 1,
  });

  stmt.run({
    slug: "building-llm-applications-2025",
    title: "Building Production LLM Applications in 2025",
    excerpt: "A practical guide to building reliable, scalable LLM applications based on our experience shipping AI products.",
    content: `# Building Production LLM Applications in 2025

After shipping multiple AI products, we've learned what it takes to build LLM applications that work in production.

## The Reliability Problem

Most LLM demos are impressive. Most LLM production systems are fragile. Here's what bridges the gap.

## Key Principles

### 1. Treat Prompts Like Code

\`\`\`python
SYSTEM_PROMPT = """
You are a data analyst. Return structured JSON only.
{
  "summary": "...",
  "trends": [...],
  "recommendations": [...]
}
"""
\`\`\`

### 2. Always Validate Output

\`\`\`python
from pydantic import BaseModel

class AnalysisResult(BaseModel):
    summary: str
    trends: list[str]
    recommendations: list[str]

try:
    result = AnalysisResult.model_validate_json(llm_response)
except ValidationError:
    result = fallback_analysis()
\`\`\`

### 3. Semantic Caching

LLM calls are expensive. Cache similar queries to cut costs by up to 60%.

## Infrastructure Patterns

- **Streaming responses** — Don't make users wait
- **Fallback models** — Always have a cheaper/faster fallback
- **Rate limiting** — Protect against abuse and injection
- **Full observability** — Log and trace everything

Building production AI is hard, but the right patterns make it reliable.`,
    tags: JSON.stringify(["Engineering", "LLM", "Tutorial"]),
    published: 1,
  });
}
