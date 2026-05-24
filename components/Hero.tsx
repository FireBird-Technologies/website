import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { FirebirdLogoAnimated } from "@/components/FirebirdLogoAnimated";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-black flex items-center overflow-hidden"
    >
      {/* Background wireframe */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <Image
          src="/wireframe.png"
          alt=""
          fill
          className="object-cover opacity-[0.05] mix-blend-screen"
          aria-hidden="true"
          priority
        />
      </div>

      {/* Center: animated Firebird wireframe emblem */}
      <div className="pointer-events-none select-none absolute inset-x-0 top-0 h-[100svh] md:inset-0 md:h-auto">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(88%,720px)] sm:w-[min(70vw,720px)] aspect-square">
          <div className="absolute inset-0 bg-[#FF2000] opacity-[0.10] blur-3xl rounded-full" />
          <FirebirdLogoAnimated className="relative block w-full h-full opacity-90" />
        </div>
      </div>

      {/* Red top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF2000]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full text-center flex flex-col items-center">
        <p
          className="text-[#FF2000] text-sm sm:text-base md:text-lg font-bold tracking-[0.25em] sm:tracking-[0.35em] md:tracking-[0.4em] uppercase mb-8 hero-enter"
          style={{ animationDelay: "2.2s" }}
        >
          AI . Tech . Fire
        </p>

        <h1
          className="text-white text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight font-[family-name:var(--font-heading)] mb-8 hero-enter"
          style={{ animationDelay: "2.5s" }}
        >
          Build Intelligent
          <br />
          Systems That
          <br />
          <span className="text-[#FF2000]">Scale.</span>
        </h1>

        <p
          className="text-white/70 text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-2xl px-2 hero-enter"
          style={{ animationDelay: "2.8s" }}
        >
          Open-source AI analytics and bespoke LLM systems.
          <br />
          Engineered for companies that ship.
        </p>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium tracking-wide transition-colors mb-12 group hero-enter"
          style={{ animationDelay: "3.0s" }}
        >
          Read our insights &amp; field notes
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full max-w-md sm:max-w-none hero-enter"
          style={{ animationDelay: "3.2s" }}
        >
          <Link
            href="/#products"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-[#FF2000] hover:bg-[#cc1a00] text-white rounded-none text-sm font-bold tracking-widest uppercase px-8 h-14 gap-2 w-full sm:w-auto justify-center"
            )}
          >
            Explore Products <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/#services"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white/30 text-white hover:bg-white hover:text-black rounded-none text-sm font-bold tracking-widest uppercase px-8 h-14 bg-transparent w-full sm:w-auto justify-center"
            )}
          >
            Our Services
          </Link>
        </div>

        {/* Stats row */}
        <div
          className="mt-20 w-full grid grid-cols-2 sm:grid-cols-4 justify-items-center gap-x-4 sm:gap-x-6 lg:gap-x-12 gap-y-8 sm:gap-y-0 border-t border-white/10 pt-10 hero-enter"
          style={{ animationDelay: "3.5s" }}
        >
          {[
            { value: "2023", label: "Founded" },
            { value: "20+", label: "AI Projects Delivered" },
            { value: "10K+", label: "People Using Our Products" },
            { value: "$100M+", label: "Partner Firm Revenue" },
          ].map((stat) => (
            <div key={stat.label} className="text-center min-w-0">
              <p className="text-white text-2xl sm:text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)]">
                {stat.value}
              </p>
              <p className="text-white/40 text-[10px] sm:text-[11px] lg:text-xs uppercase tracking-widest mt-1 leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
