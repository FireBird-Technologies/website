import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, BarChart3, Brain, Code2, Database, FileText, Layers, Network, TrendingUp, Video, Zap } from "lucide-react";
import { FirebirdHalfRight } from "@/components/FirebirdLogoAnimated";

const products = [
  {
    id: "autoanalyst",
    name: "AutoAnalyst",
    tagline: "Your AI Data Scientist",
    badge: "Open Source · MIT",
    description:
      "Purpose-built for data science workflows — not just chat. AutoAnalyst uses multi-agent orchestration to automate the full analytics pipeline: upload your data, ask questions in plain English, get interactive charts, predictive models, and deep insights.",
    subline: "Vibe Analytics, Real Insights.",
    features: [
      { icon: Brain, text: "Multi-agent orchestration" },
      { icon: BarChart3, text: "Interactive visualizations (Plotly, Matplotlib)" },
      { icon: TrendingUp, text: "5-step Deep Analysis process" },
      { icon: Database, text: "CSV, Excel, API connectors" },
      { icon: Code2, text: "LLM agnostic — OpenAI, Anthropic, Groq, Gemini" },
      { icon: Layers, text: "On-premise deployment supported" },
    ],
    href: "https://autoanalyst.ai",
    cta: "Visit autoanalyst.ai",
    accent: true,
  },
  {
    id: "blog2video",
    name: "Blog2Video",
    tagline: "Turn Blog Posts Into Videos",
    badge: "Live",
    description:
      "Repurpose written content into video automatically. Paste any blog post or article and Blog2Video handles scene breakdown, voiceover, and production — giving you a publish-ready video in minutes.",
    subline: "10× your content output.",
    features: [
      { icon: FileText, text: "Paste any blog post or article" },
      { icon: Zap, text: "Automatic scene breakdown" },
      { icon: Video, text: "AI-generated voiceover" },
      { icon: Network, text: "Publish-ready output" },
    ],
    href: "https://blog2video.app",
    cta: "Visit blog2video.app",
    accent: false,
  },
];

export function Products() {
  return (
    <section id="products" className="relative bg-white py-28 overflow-hidden">
      {/* Decorative grey wireframe peeking from the right edge */}
      <div className="pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2 w-[28rem] h-[28rem] opacity-20 select-none">
        <FirebirdHalfRight className="w-full h-full" stroke="#525252" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-16 text-center md:text-left">
          <p className="text-[#FF2000] text-xs font-bold tracking-[0.3em] uppercase mb-3">
            What We Ship
          </p>
          <h2 className="text-black text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
            Our Products
          </h2>
          <div className="mt-4 h-1 w-16 bg-[#FF2000] mx-auto md:mx-0" />
        </div>

        <div className="grid md:grid-cols-2 gap-0 border border-black">
          {products.map((product, i) => (
            <div
              key={product.id}
              className={`p-10 flex flex-col ${
                i === 0 ? "border-b md:border-b-0 md:border-r border-black" : ""
              } ${product.accent ? "bg-[#FF2000]" : "bg-white"}`}
            >
              {/* Badge */}
              <span
                className={`inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 w-fit mb-6 ${
                  product.accent ? "bg-black text-white" : "bg-[#FF2000] text-white"
                }`}
              >
                {product.badge}
              </span>

              {/* Name + tagline */}
              <h3
                className={`text-3xl font-bold font-[family-name:var(--font-heading)] ${
                  product.accent ? "text-white" : "text-black"
                }`}
              >
                {product.name}
              </h3>
              <p
                className={`text-sm font-semibold mt-1 mb-6 ${
                  product.accent ? "text-white/70" : "text-black/50"
                }`}
              >
                {product.tagline}
              </p>

              {/* Description */}
              <p
                className={`leading-relaxed mb-4 ${
                  product.accent ? "text-white/80" : "text-black/60"
                }`}
              >
                {product.description}
              </p>

              <p
                className={`text-sm font-bold mb-8 ${
                  product.accent ? "text-white" : "text-[#FF2000]"
                }`}
              >
                {product.subline}
              </p>

              {/* Feature list */}
              <ul className="space-y-3 mb-10 flex-1">
                {product.features.map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className={`flex items-center gap-3 text-sm font-medium ${
                      product.accent ? "text-white" : "text-black"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 flex-shrink-0 ${
                        product.accent ? "text-white/60" : "text-[#FF2000]"
                      }`}
                    />
                    {text}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants(),
                  "rounded-none text-sm font-bold tracking-widest uppercase h-12 w-fit px-8 gap-2",
                  product.accent
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-black text-white hover:bg-[#FF2000]"
                )}
              >
                {product.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
