"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

type Logo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  headshot: string;
  logos: Logo[];
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Based on an article he posted, I reached out to Arslan for help in designing and building a novel agentic system for 'intelligent' KPIs. I was impressed by his strong technical skills, collaborative commitment and quick turnaround. He proved a relentless problem solver and made an impressive demo for my executive education classes possible. Not just a 'pro' but a good guy.",
    name: "Michael Schrage",
    role: "MIT & Imperial College",
    company: "Advisor to Fortune 500 Companies",
    headshot: "/testimonials/michael-schrage-headshot.png",
    logos: [
      { src: "/clients/mit.svg", alt: "MIT", width: 165, height: 85 },
    ],
  },
  {
    quote:
      "We had the pleasure of working with Arslan on developing an AI-driven recommendation system for our digital marketing SaaS tool. His deep knowledge of large language models enabled us to create a highly effective and tailored solution. Arslan's innovative approach and technical expertise made a real difference, and we would highly recommend him for any AI-focused projects.",
    name: "Vilnis Ezerins",
    role: "Principal",
    company: "Xperra & Alegian Growth Partners",
    headshot: "/testimonials/vilnis-ezerins-headshot.webp",
    logos: [
      { src: "/clients/xperra.svg", alt: "Xperra", width: 220, height: 57 },
    ],
  },
  {
    quote:
      "Arslan and his team at Firebird Technologies led the development of a sophisticated application with a high degree of professionalism. Communication was always clear, deliverables were timely, and expectations were consistently met. Arslan is reliable, dependable, and someone I would confidently recommend to anyone looking to build a high-quality application.",
    name: "Zach Zelefsky",
    role: "Director of Analytics @ Brightview · Founder",
    company: "Keyline Reporting",
    headshot: "/testimonials/zach-zelefsky-headshot.jpg",
    logos: [
      {
        src: "/clients/keyline-reporting.svg",
        alt: "Keyline Reporting",
        width: 200,
        height: 45,
      },
    ],
  },
  {
    quote:
      "I have worked with Arslan for over six months, and his communication, execution, and knowledge of AI have been exceptional. I have never experienced any delays or errors on his part. He demonstrates complete mastery in building AI agents, RAG pipelines, and orchestration tools like LangChain, DSPy, and LlamaIndex. I would definitely recommend him.",
    name: "Zain Hoda",
    role: "CTO @ Vanna.AI · Founder of AlphaHat",
    company: "Vanna.AI",
    headshot: "/testimonials/zain-hoda-headshot.jpg",
    logos: [
      { src: "/clients/vanna-ai.svg", alt: "Vanna.AI", width: 200, height: 46 },
    ],
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, 7000);
    return () => clearInterval(id);
  }, [next, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  return (
    <section
      id="testimonials"
      className="relative bg-black py-28 border-t border-white/10 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient red glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#FF2000] opacity-[0.06] blur-3xl rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#FF2000] opacity-[0.06] blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[#FF2000] text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Testimonials
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
              What Our Clients Say
            </h2>
            <div className="mt-4 h-1 w-16 bg-[#FF2000]" />
          </div>
          <p className="text-white/50 text-sm font-medium tracking-wider uppercase">
            <span className="text-white">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="text-white/30"> / {String(testimonials.length).padStart(2, "0")}</span>
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((t) => (
                <article
                  key={t.name}
                  className="w-full shrink-0 grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-center"
                >
                  {/* Quote side */}
                  <div className="relative">
                    <Quote
                      className="absolute -top-8 -left-4 h-20 w-20 text-[#FF2000] opacity-20 -scale-x-100"
                      aria-hidden="true"
                      strokeWidth={1.25}
                      fill="currentColor"
                    />
                    <p className="relative text-white text-xl md:text-2xl leading-[1.6] font-light pl-2">
                      {t.quote}
                    </p>

                    <div className="mt-10 flex items-center gap-5">
                      <div className="h-px w-12 bg-[#FF2000]" />
                      <div>
                        <p className="text-white font-bold text-lg font-[family-name:var(--font-heading)] tracking-tight">
                          {t.name}
                        </p>
                        <p className="text-white/50 text-sm mt-1">
                          {t.role} · {t.company}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Headshot + logo side */}
                  <div className="flex flex-col items-center gap-6 lg:items-end">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-[#FF2000] opacity-30 blur-md rounded-full" />
                      <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-[#FF2000]/40 bg-black">
                        <Image
                          src={t.headshot}
                          alt={t.name}
                          fill
                          sizes="208px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 h-16 px-2 min-w-[140px]">
                      {t.logos.map((logo) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={logo.src}
                          src={logo.src}
                          alt={logo.alt}
                          width={logo.width}
                          height={logo.height}
                          className="max-h-10 w-auto max-w-[140px] object-contain brightness-0 invert opacity-60"
                        />
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-14 gap-6">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="group flex items-center justify-center h-12 w-12 border border-white/20 hover:border-[#FF2000] hover:bg-[#FF2000] transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 text-white/70 group-hover:text-white transition-colors duration-200" />
            </button>

            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="group p-2"
                >
                  <span
                    className={`block h-[3px] transition-all duration-500 ${
                      i === activeIndex
                        ? "w-14 bg-[#FF2000]"
                        : "w-6 bg-white/20 group-hover:bg-white/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="group flex items-center justify-center h-12 w-12 border border-white/20 hover:border-[#FF2000] hover:bg-[#FF2000] transition-colors duration-200"
            >
              <ArrowRight className="h-5 w-5 text-white/70 group-hover:text-white transition-colors duration-200" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
