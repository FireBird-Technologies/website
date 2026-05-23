import Image from "next/image";

const testimonials = [
  {
    name: "Michael Schrage",
    image: "/testimonials/michael-schrage.jpg",
    alt: "Based on an article he posted, I reached out to Arslan for help in designing and building a novel agentic system for intelligent KPIs. I was impressed by his strong technical skills, collaborative commitment and quick turnaround. He proved a relentless problem solver and made an impressive demo for my executive education classes possible. Not just a pro but a good guy. Michael Schrage, Research & teaching at MIT Sloan School of Business.",
    width: 1024,
    height: 731,
  },
  {
    name: "Vilnis Ezerins",
    image: "/testimonials/vilnis-ezerins.jpg",
    alt: "We (at Xperra) had the pleasure of working with Arslan on developing an AI-driven recommendation system for our digital marketing SaaS tool. His deep knowledge of large language models enabled us to create a highly effective and tailored solution. Arslan's innovative approach and technical expertise made a real difference, and we would highly recommend him for any AI-focused projects. Vilnis Ezerins, Principal Xperra & Alegian Growth Partners.",
    width: 1024,
    height: 731,
  },
  {
    name: "Zach Zelefsky",
    image: "/testimonials/zach-zelefsky.png",
    alt: "Arslan and his team at Firebird Technologies led the development of a sophisticated application with a high degree of professionalism. Communication was always clear, deliverables were timely, and expectations were consistently met. Arslan is reliable, dependable, and someone I would confidently recommend to anyone looking to build a high-quality application. Zach Zelefsky, Keyline Reporting & Director of Analytics at Brightview Senior Living.",
    width: 1024,
    height: 576,
  },
  {
    name: "Zain Hoda",
    image: "/testimonials/zain-hoda.jpg",
    alt: "I have worked with Arslan for over six months, and his communication, execution, and knowledge of AI have been exceptional. I have never experienced any delays or errors on his part. He demonstrates complete mastery in building AI agents, RAG pipelines, and orchestration tools like LangChain, DSPy, and LlamaIndex. I would definitely recommend him. Zain Hoda CTO Vanna.AI, Founder AlphaHat.",
    width: 1024,
    height: 731,
  },
];

const logoStrips = [
  {
    name: "Imperial College London, MIT, and MIT Initiative on the Digital Economy",
    image: "/testimonials/logos/michael-logos.png",
    width: 920,
    height: 90,
  },
  {
    name: "Alegian Growth Partners and Xperra",
    image: "/testimonials/logos/vilnis-logos.png",
    width: 765,
    height: 90,
  },
  {
    name: "Brightview Senior Living and Keyline Reporting",
    image: "/testimonials/logos/zach-logos.png",
    width: 530,
    height: 165,
  },
  {
    name: "Vanna.AI",
    image: "/testimonials/logos/zain-logos.png",
    width: 240,
    height: 90,
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

        <div className="mb-16 border border-black/10 bg-[#fafafa] p-8 md:p-10">
          <p className="text-black/40 text-xs font-bold tracking-[0.25em] uppercase mb-8">
            Trusted by teams at
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
            {logoStrips.map((logo) => (
              <div key={logo.name} className="flex items-center justify-center min-h-20">
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="max-h-20 w-auto max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-0 border border-black bg-white">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`p-4 md:p-6 border-black ${
                i % 2 === 0 ? "md:border-r" : ""
              } ${i < testimonials.length - 1 ? "border-b" : ""} ${
                i >= testimonials.length - 2 ? "md:border-b-0" : ""
              }`}
            >
              <Image
                src={t.image}
                alt={t.alt}
                width={t.width}
                height={t.height}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
