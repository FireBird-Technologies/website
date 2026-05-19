import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "FireBird built our internal LLM reporting tool in just 3 weeks. The quality of the output was immediately production-ready. They understand both the engineering and the business context.",
    name: "Client A",
    title: "Head of Operations",
    company: "Financial Services Firm",
  },
  {
    quote:
      "The multi-agent research system they built cut our content turnaround from 3 days to 4 hours. Our team now produces twice the content with half the effort.",
    name: "Client B",
    title: "Content Director",
    company: "Digital Media Company",
  },
  {
    quote:
      "I was skeptical about AI for our analytics stack. FireBird's team changed my mind — they designed a system that actually integrates with our existing workflows.",
    name: "Client C",
    title: "CTO",
    company: "E-commerce Platform",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-28 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-[#FF2000] text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Client Feedback
          </p>
          <h2 className="text-black text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
            What Clients Say
          </h2>
          <div className="mt-4 h-1 w-16 bg-[#FF2000]" />
        </div>

        <div className="grid md:grid-cols-3 gap-0 border border-black">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`p-10 ${i < 2 ? "border-b md:border-b-0 md:border-r border-black" : ""}`}
            >
              <Quote className="h-8 w-8 text-[#FF2000] mb-6" />
              <p className="text-black/70 leading-relaxed text-base mb-8 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-black/10 pt-6">
                <p className="font-bold text-black font-[family-name:var(--font-heading)]">{t.name}</p>
                <p className="text-black/40 text-sm mt-1">
                  {t.title}, {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
