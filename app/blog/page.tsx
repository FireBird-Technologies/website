"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Search } from "lucide-react";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data.posts);
        const tags = Array.from(new Set(data.posts.flatMap((p: Post) => p.tags))) as string[];
        setAllTags(tags.sort());
      });
  }, []);

  const filtered = posts.filter((p) => {
    const matchTag = selectedTag ? p.tags.includes(selectedTag) : true;
    const matchQuery =
      query.trim() === "" ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchTag && matchQuery;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        {/* Header */}
        <div className="bg-[#0a0a0a] py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#FF2000] text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Insights & Updates
            </p>
            <h1 className="text-white text-5xl md:text-6xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
              The Blog
            </h1>
            <div className="mt-4 h-1 w-16 bg-[#FF2000]" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-12">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/30" />
              <Input
                placeholder="Search posts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 rounded-none border-black/20 h-11"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                onClick={() => setSelectedTag(null)}
                className={`rounded-none text-xs font-bold uppercase tracking-widest h-9 px-4 ${
                  selectedTag === null ? "bg-black text-white hover:bg-[#FF2000]" : "border-black/20"
                }`}
              >
                All
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`rounded-none text-xs font-bold uppercase tracking-widest h-9 px-4 ${
                    selectedTag === tag
                      ? "bg-[#FF2000] text-white hover:bg-[#cc1a00] border-0"
                      : "border-black/20 hover:border-black"
                  }`}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Posts grid */}
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-black/30 text-lg">No posts found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border border-black/10">
              {filtered.map((post, i) => {
                const col = i % 3;
                const row = Math.floor(i / 3);
                const totalRows = Math.ceil(filtered.length / 3);
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className={`group flex flex-col hover:bg-[#f9f9f9] transition-colors border-black/10
                      ${col < 2 ? "border-r" : ""}
                      ${row < totalRows - 1 ? "border-b" : ""}
                    `}
                  >
                    {post.cover_image && (
                      <div className="aspect-[16/9] overflow-hidden bg-[#f5f5f5] border-b border-black/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col p-8">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            className="bg-transparent text-[#FF2000] border border-[#FF2000]/30 text-xs font-bold rounded-none px-2 py-0.5 uppercase tracking-widest"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="font-bold text-lg leading-snug font-[family-name:var(--font-heading)] mb-3 group-hover:text-[#FF2000] transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-black/50 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-black/25 text-xs">{formatDate(post.created_at)}</span>
                        <ArrowRight className="h-4 w-4 text-[#FF2000] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
