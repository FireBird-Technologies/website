import { Bot, Code2, Network, Layers } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "LLM Application Development",
    description:
      "We design and build production-grade LLM applications — RAG pipelines, fine-tuning, evaluation frameworks, and full deployment infrastructure.",
    tags: ["RAG", "Fine-tuning", "Evaluation", "Deployment"],
  },
  {
    icon: Bot,
    title: "AI Agents & Automation",
    description:
      "Autonomous agents that take action: data pipelines, multi-agent orchestration, tool-use systems, and workflow automation built on modern agentic frameworks.",
    tags: ["Multi-Agent", "Tool Use", "Orchestration", "Automation"],
  },
  {
    icon: Network,
    title: "AI Architecture Consulting",
    description:
      "Strategic guidance on model selection, infrastructure design, prompt engineering best practices, and building AI systems that are reliable in production.",
    tags: ["Architecture", "Strategy", "Prompt Engineering"],
  },
  {
    icon: Layers,
    title: "Data & Analytics Engineering",
    description:
      "End-to-end data pipelines, analytics dashboards, and AI-powered reporting — built on modern data stack tooling and connected to your business workflows.",
    tags: ["ETL", "Dashboards", "SQL", "Analytics"],
  },
];

export function Services() {
  return (
    <section id="services" className="bg-[#0a0a0a] py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-[#FF2000] text-xs font-bold tracking-[0.3em] uppercase mb-3">
            What We Do
          </p>
          <h2 className="text-white text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
            Our Services
          </h2>
          <div className="mt-4 h-1 w-16 bg-[#FF2000]" />
        </div>

        {/* Service grid */}
        <div className="grid md:grid-cols-2 gap-0 border border-white/10">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isRight = i % 2 === 1;
            const isBottom = i >= 2;
            return (
              <div
                key={service.title}
                className={`p-10 border-white/10 ${!isRight ? "border-r" : ""} ${!isBottom ? "border-b" : ""}`}
              >
                <div className="w-10 h-10 border border-[#FF2000] flex items-center justify-center mb-6">
                  <Icon className="h-5 w-5 text-[#FF2000]" />
                </div>
                <h3 className="text-white text-xl font-bold font-[family-name:var(--font-heading)] mb-4">
                  {service.title}
                </h3>
                <p className="text-white/50 leading-relaxed mb-6">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-bold uppercase tracking-widest text-white/40 border border-white/10 px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
