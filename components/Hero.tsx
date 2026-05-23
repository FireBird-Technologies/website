import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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
          className="object-cover opacity-[0.07] mix-blend-screen"
          aria-hidden="true"
          priority
        />
      </div>

      {/* Right side: large logo emblem */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] max-w-[600px] aspect-square opacity-20 pointer-events-none select-none">
        <Image
          src="/logo.jpg"
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
          priority
        />
      </div>

      {/* Red top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF2000]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          <p className="text-[#FF2000] text-sm font-bold tracking-[0.3em] uppercase mb-6">
            AI . Tech . Fire
          </p>

          <h1 className="text-white text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight font-[family-name:var(--font-heading)] mb-8">
            Build Intelligent
            <br />
            Systems That
            <br />
            <span className="text-[#FF2000]">Scale.</span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-12 max-w-xl">
            FireBird Technologies delivers open-source AI analytics software and
            bespoke LLM solutions for companies that move fast and think bigger.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/#products"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-[#FF2000] hover:bg-[#cc1a00] text-white rounded-none text-sm font-bold tracking-widest uppercase px-8 h-14 gap-2"
              )}
            >
              Explore Products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#services"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/30 text-white hover:bg-white hover:text-black rounded-none text-sm font-bold tracking-widest uppercase px-8 h-14 bg-transparent"
              )}
            >
              Our Services
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-20 flex flex-wrap gap-12 border-t border-white/10 pt-10">
            {[
              { value: "2023", label: "Founded" },
              { value: "20+", label: "AI Projects Delivered" },
              { value: "2", label: "Live Products" },
              { value: "2×", label: "Awards & Recognition" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-white text-3xl font-bold font-[family-name:var(--font-heading)]">
                  {stat.value}
                </p>
                <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
