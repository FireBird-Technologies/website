import type { Metadata } from "next";
import { HeroAnimation } from "@/components/HeroAnimation";

export const metadata: Metadata = {
  title: "FireBird Wireframe — FireBird Technologies",
  description: "Animated FireBird wireframe emblem.",
  robots: { index: false, follow: false },
};

export default function AnimationPage() {
  return (
    <main className="min-h-screen bg-black">
      <HeroAnimation className="min-h-screen w-full" emblemClassName="w-[min(90vw,720px)]" />
    </main>
  );
}
