import { Award, Sparkles } from "lucide-react";

const awards = [
  {
    icon: Sparkles,
    title: "Z.ai Startup Program",
    year: "2026",
    description:
      "Selected for the Z.ai Startup Program — a hand-picked cohort of AI-native startups building the next generation of intelligent software.",
  },
  {
    icon: Award,
    title: "Cognition OpenSource Award",
    year: "Recipient",
    description:
      "Recognized by Cognition for sustained contributions to the open-source AI ecosystem through projects like AutoAnalyst.",
  },
];

export function Recognition() {
  return (
    <section id="recognition" className="bg-white py-28 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[#FF2000] text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Awards &amp; Recognition
          </p>
          <h2 className="text-black text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
            Backed by the Industry
          </h2>
          <div className="mt-4 h-1 w-16 bg-[#FF2000]" />
          <p className="text-black/50 text-lg leading-relaxed max-w-2xl mt-6">
            Recognition from the AI community for the work we do — and for the open-source
            tools we ship along the way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-0 border border-black">
          {awards.map((award, i) => {
            const Icon = award.icon;
            return (
              <div
                key={award.title}
                className={`p-10 flex flex-col bg-white ${
                  i === 0 ? "border-b md:border-b-0 md:border-r border-black" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 bg-[#FF2000] flex items-center justify-center">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-black/40 border border-black/15 px-3 py-1">
                    {award.year}
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-black mb-4">
                  {award.title}
                </h3>
                <p className="text-black/60 leading-relaxed">{award.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
