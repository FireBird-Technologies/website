import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { CodeBlock } from "@/components/CodeBlock";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} — FireBird Technologies`, description: post.excerpt };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        {/* Post header */}
        <div className="bg-[#0a0a0a] py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-[#FF2000] text-white text-xs font-bold rounded-none px-3 py-1 uppercase tracking-widest border-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-white text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] leading-tight tracking-tight mb-6">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-2xl">
                {post.excerpt}
              </p>
            )}
            <p className="text-white/40 text-sm">{formatDate(post.created_at)}</p>
          </div>
        </div>

        {/* Cover image */}
        {post.cover_image && (
          <div className="bg-[#0a0a0a]">
            <div className="max-w-5xl mx-auto px-6 pb-2 -mt-10 relative z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-auto border border-white/10 shadow-2xl"
              />
            </div>
          </div>
        )}

        {/* Post body */}
        <div className="max-w-3xl mx-auto px-6 py-16">
          <article className="prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                // Custom code block with syntax highlighting
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  const isBlock = !!match || String(children).includes("\n");
                  if (isBlock) {
                    return (
                      <CodeBlock language={match?.[1] || "text"}>
                        {String(children).replace(/\n$/, "")}
                      </CodeBlock>
                    );
                  }
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                // Video embed via img tag with video src; forward className
                // so inline HTML classes (e.g. .post-embed-meta) survive
                // react-markdown's render pass.
                p({ children, className }) {
                  const child = Array.isArray(children) ? children[0] : children;
                  if (typeof child === "string" && child.startsWith("{{video:")) {
                    const url = child.slice(8, -2);
                    return (
                      <div className="my-8 aspect-video">
                        <iframe
                          src={url}
                          title="Embedded video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full border border-black/10"
                        />
                      </div>
                    );
                  }
                  return <p className={className}>{children}</p>;
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-black/10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-black/40 hover:text-[#FF2000] text-sm transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4" /> All Posts
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
