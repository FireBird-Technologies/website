"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";

export default function AdminPage() {
  const [form, setForm] = useState({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    cover_image: "",
    video_url: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ slug: "", title: "", excerpt: "", content: "", tags: "", cover_image: "", video_url: "" });
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create post");
        setStatus("error");
      }
    } catch {
      setError("Network error");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="text-[#FF2000] text-xs font-bold tracking-[0.3em] uppercase mb-2">Admin</p>
          <h1 className="text-white text-4xl font-bold font-[family-name:var(--font-heading)]">
            New Blog Post
          </h1>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center py-20 text-center">
            <CheckCircle className="h-12 w-12 text-[#FF2000] mb-4" />
            <h2 className="text-white text-2xl font-bold mb-2">Post Created</h2>
            <p className="text-white/40 mb-6">Your post has been saved to the database.</p>
            <Button
              onClick={() => setStatus("idle")}
              className="bg-[#FF2000] hover:bg-[#cc1a00] text-white rounded-none font-bold uppercase tracking-widest"
            >
              Write Another
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 border border-white/10 p-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-white/40">
                  Slug *
                </Label>
                <Input
                  required
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="my-post-slug"
                  className="rounded-none bg-white/5 border-white/20 text-white placeholder:text-white/20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-white/40">
                  Tags (comma-separated)
                </Label>
                <Input
                  value={form.tags}
                  onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                  placeholder="AI, Tutorial, Product"
                  className="rounded-none bg-white/5 border-white/20 text-white placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/40">
                Title *
              </Label>
              <Input
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Post title"
                className="rounded-none bg-white/5 border-white/20 text-white placeholder:text-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/40">
                Excerpt *
              </Label>
              <Textarea
                required
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                placeholder="Short summary shown in listing..."
                className="rounded-none bg-white/5 border-white/20 text-white placeholder:text-white/20 min-h-[80px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/40">
                Content (Markdown) *
              </Label>
              <p className="text-white/30 text-xs">
                Supports GFM markdown, code blocks, images. For video: <code className="text-[#FF2000]">{"{{video:https://youtube.com/embed/...}}"}</code>
              </p>
              <Textarea
                required
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                placeholder="# Post Title&#10;&#10;Your markdown content here..."
                className="rounded-none bg-white/5 border-white/20 text-white placeholder:text-white/20 min-h-[400px] font-mono text-sm resize-y"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-white/40">
                  Cover Image URL
                </Label>
                <Input
                  value={form.cover_image}
                  onChange={(e) => setForm((f) => ({ ...f, cover_image: e.target.value }))}
                  placeholder="https://..."
                  className="rounded-none bg-white/5 border-white/20 text-white placeholder:text-white/20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-white/40">
                  Video URL
                </Label>
                <Input
                  value={form.video_url}
                  onChange={(e) => setForm((f) => ({ ...f, video_url: e.target.value }))}
                  placeholder="https://youtube.com/embed/..."
                  className="rounded-none bg-white/5 border-white/20 text-white placeholder:text-white/20"
                />
              </div>
            </div>

            {error && <p className="text-[#FF2000] text-sm">{error}</p>}

            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#FF2000] hover:bg-[#cc1a00] text-white rounded-none h-12 font-bold text-sm uppercase tracking-widest"
            >
              {status === "loading" ? "Publishing..." : "Publish Post"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
