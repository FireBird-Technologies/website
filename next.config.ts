import type { NextConfig } from "next";

// Legacy Substack URL slug -> current blog slug. Substack posts lived at
// `/p/<slug>`; we permanently redirect those to `/blog/<slug>` so that any
// inbound links or search engine results keep working.
const SUBSTACK_SLUG_MAP: Record<string, string> = {
  "building-ai-saas-for-3-years-what":
    "building-ai-saas-for-3-years-what-worked-what-didnt",
  "building-a-reliable-text-to-sql-pipeline":
    "building-a-reliable-text-to-sql-pipeline-pt-1",
  "building-a-reliable-text-to-sql-pipeline-e38":
    "building-a-reliable-text-to-sql-pipeline-pt-2",
  "building-auto-analyst-a-data-analytics":
    "building-auto-analyst-a-data-analytics-ai-agentic-system",
  "context-engineering-improving-ai":
    "context-engineering-improving-ai-coding-agents-using-dspy-gepa",
  "honest-review-of-tally-forms-from":
    "honest-review-of-tally-forms-from-an-ai-saas-developer",
  "honest-review-of-cursor-by-a-ai-engineer":
    "honest-review-of-cursor-by-an-ai-engineer",
  "honest-review-of-lovable-from-an":
    "honest-review-of-lovable-from-an-ai-engineer",
  "kpai-a-new-way-to-look-at-business":
    "kpai-a-new-way-to-look-at-business-metrics",
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    const slugRedirects = Object.entries(SUBSTACK_SLUG_MAP).flatMap(
      ([oldSlug, newSlug]) => [
        {
          source: `/p/${oldSlug}`,
          destination: `/blog/${newSlug}`,
          permanent: true,
        },
        // Substack also serves shareable anchor links like /i/<id>/<section>
        // that link back to the post; not handled here.
      ]
    );

    return [
      ...slugRedirects,
      // Fallback: anything else under /p/<slug> goes to the matching /blog/<slug>.
      // Slug-specific entries above take precedence because they're listed first.
      { source: "/p/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/p/:slug/", destination: "/blog/:slug", permanent: true },
      // Substack subscribe/archive URLs people might still hit.
      { source: "/subscribe", destination: "/#contact", permanent: true },
      { source: "/archive", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
