import Image from "next/image";
import { FirebirdLogoAnimated } from "@/components/FirebirdLogoAnimated";
import { cn } from "@/lib/utils";

type HeroAnimationProps = {
  className?: string;
  /** Emblem size — defaults to hero sizing */
  emblemClassName?: string;
  showTopBar?: boolean;
  showBackground?: boolean;
};

export function HeroAnimation({
  className,
  emblemClassName = "w-[min(88%,720px)] sm:w-[min(70vw,720px)]",
  showTopBar = true,
  showBackground = true,
}: HeroAnimationProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {showBackground && (
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
      )}

      <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center">
        <div className={cn("relative aspect-square", emblemClassName)}>
          <div className="absolute inset-0 bg-[#FF2000] opacity-[0.10] blur-3xl rounded-full" />
          <FirebirdLogoAnimated className="relative block w-full h-full opacity-90" />
        </div>
      </div>

      {showTopBar && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF2000]" aria-hidden="true" />
      )}
    </div>
  );
}
