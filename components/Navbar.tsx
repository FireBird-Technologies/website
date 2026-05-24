"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const navLinks = [
  { href: "/#products", label: "Products" },
  { href: "/#services", label: "Services" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        !isHome || scrolled ? "bg-black border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-sm.jpg"
            alt="FireBird Technologies"
            width={36}
            height={36}
            className="object-cover"
            priority
          />
          <span className="text-white font-bold text-lg tracking-tight font-[family-name:var(--font-heading)]">
            FireBird<span className="text-[#FF2000]">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors tracking-wide uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/#contact"
            className={cn(
              buttonVariants(),
              "bg-[#FF2000] hover:bg-[#cc1a00] text-white rounded-none text-sm font-semibold tracking-wide uppercase px-6"
            )}
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile menu — use render prop to avoid nested <button> */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="md:hidden"
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              />
            }
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-black border-l border-white/10 p-0"
            showCloseButton={false}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
                <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                  <Image src="/logo-sm.jpg" alt="FireBird Technologies" width={32} height={32} />
                  <span className="text-white font-bold font-[family-name:var(--font-heading)]">
                    FireBird<span className="text-[#FF2000]">.</span>
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  className="text-white hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col px-6 py-8 gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-white text-xl font-semibold font-[family-name:var(--font-heading)] hover:text-[#FF2000] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="mt-4 bg-[#FF2000] text-white text-center py-3 font-semibold text-sm uppercase tracking-wide hover:bg-[#cc1a00] transition-colors"
                >
                  Contact Us
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
