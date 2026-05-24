import Image from "next/image";
import { FirebirdHalfLeft } from "@/components/FirebirdLogoAnimated";

const clientLogos = [
  {
    name: "SecurityScorecard",
    src: "/clients/securityscorecard.svg",
    width: 197,
    height: 54,
  },
  {
    name: "Vanna.AI",
    src: "/clients/vanna-ai.svg",
    width: 200,
    height: 46,
  },
  {
    name: "Xperra",
    src: "/clients/xperra.svg",
    width: 220,
    height: 57,
  },
  {
    name: "Keyline Reporting",
    src: "/clients/keyline-reporting.svg",
    width: 200,
    height: 45,
  },
  {
    name: "MIT",
    src: "/clients/mit.svg",
    width: 165,
    height: 85,
  },
  {
    name: "Imperial College London",
    src: "/clients/imperial-college-london.svg",
    width: 150,
    height: 40,
  },
  {
    name: "Z.ai",
    src: "/clients/z-ai.svg",
    width: 101,
    height: 100,
  },
  {
    name: "Cognition",
    src: "/clients/cognition.svg",
    width: 180,
    height: 50,
  },
  {
    name: "LaDuc Trading",
    src: "/clients/laduc-trading.svg",
    width: 150,
    height: 36,
  },
];

const wordmarks = ["Revenue Labs"];

export function ClientsPartners() {
  const stripItems = [
    ...clientLogos.map((logo) => ({ ...logo, type: "image" as const })),
    ...wordmarks.map((name) => ({ name, type: "wordmark" as const })),
  ];
  const repeatedItems = [...stripItems, ...stripItems, ...stripItems];

  return (
    <section
      id="clients-partners"
      className="relative bg-black pt-10 pb-20 -mt-px overflow-hidden"
    >
      {/* Decorative left-wing wireframe peeking from the left edge */}
      <div className="pointer-events-none absolute -left-32 top-1/2 -translate-y-1/2 w-[28rem] h-[28rem] opacity-30 select-none">
        <FirebirdHalfLeft className="w-full h-full" />
      </div>

      {/* Subtle label that ties into the hero */}
      <div className="relative max-w-7xl mx-auto px-6 mb-10">
        <div className="flex items-center gap-4">
          <p className="text-white/40 text-[11px] font-bold tracking-[0.3em] uppercase whitespace-nowrap">
            Our Clients &amp; Partner Affiliations
          </p>
          <div className="h-px flex-1 bg-white/10" />
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-black to-transparent" />

        <div className="clients-logo-track flex w-max items-center py-2">
          {repeatedItems.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="mx-10 flex h-16 w-40 shrink-0 items-center justify-center"
            >
              {logo.type === "image" ? (
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="max-h-12 w-auto max-w-full object-contain brightness-0 invert opacity-60 transition-opacity duration-300 hover:opacity-100"
                />
              ) : (
                <span className="text-center text-base font-bold text-white/60 font-[family-name:var(--font-heading)] tracking-tight">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes clients-logo-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }

        .clients-logo-track {
          animation: clients-logo-scroll 42s linear infinite;
        }

        .clients-logo-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
