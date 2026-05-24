"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { FirebirdHalfRight } from "@/components/FirebirdLogoAnimated";

interface BlogPreviewProps {
  posts: Post[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubStatus(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch {
      setSubStatus("error");
    }
  };

  return (
    <section id="blog" className="relative bg-[#0a0a0a] py-28 overflow-hidden">
      {/* Decorative red wireframe peeking from the right edge */}
      <div className="pointer-events-none absolute -right-32 top-10 w-[26rem] h-[26rem] opacity-25 select-none">
        <FirebirdHalfRight className="w-full h-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-[#FF2000] text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Insights
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
              Latest Posts
            </h2>
            <div className="mt-4 h-1 w-16 bg-[#FF2000]" />
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors group"
          >
            View all posts
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Post cards */}
        <div className="grid md:grid-cols-3 gap-0 border border-white/10 mb-16">
          {posts.slice(0, 3).map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`group flex flex-col border-white/10 hover:bg-white/5 transition-colors ${
                i < 2 ? "border-b md:border-b-0 md:border-r" : ""
              }`}
            >
              {post.cover_image && (
                <div className="aspect-[16/9] overflow-hidden bg-white/5 border-b border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[#FF2000] border border-[#FF2000]/30 text-xs font-bold px-2 py-0.5 uppercase tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-white font-bold text-lg leading-snug font-[family-name:var(--font-heading)] mb-4 group-hover:text-[#FF2000] transition-colors">
                  {post.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/20 text-xs">{formatDate(post.created_at)}</span>
                  <ArrowRight className="h-4 w-4 text-[#FF2000] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile — view all */}
        <div className="md:hidden mb-16">
          <Link
            href="/blog"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full rounded-none border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-widest text-sm justify-center"
            )}
          >
            View All Posts
          </Link>
        </div>

        {/* Newsletter signup */}
        <div className="border border-white/10 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="flex-1">
            <p className="text-[#FF2000] text-xs font-bold tracking-[0.3em] uppercase mb-2">
              Newsletter
            </p>
            <h3 className="text-white text-2xl font-bold font-[family-name:var(--font-heading)]">
              Stay ahead of the curve.
            </h3>
            <p className="text-white/40 mt-2">
              AI insights, product updates, and practical tutorials — no noise.
            </p>
          </div>
          {subStatus === "success" ? (
            <p className="text-[#FF2000] font-bold text-sm uppercase tracking-widest">
              ✓ You&apos;re subscribed.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-0 w-full md:w-auto">
              <Input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-none bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-[#FF2000] focus:ring-0 h-12 min-w-[260px]"
              />
              <Button
                type="submit"
                disabled={subStatus === "loading"}
                className="bg-[#FF2000] hover:bg-[#cc1a00] text-white rounded-none h-12 px-6 font-bold text-sm uppercase tracking-widest flex-shrink-0"
              >
                {subStatus === "loading" ? "..." : "Subscribe"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
