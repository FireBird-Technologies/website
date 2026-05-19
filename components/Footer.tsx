import Link from "next/link";
import Image from "next/image";

const links = {
  Company: [
    { href: "/#products", label: "Products" },
    { href: "/#services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/#contact", label: "Contact" },
  ],
  Products: [
    { href: "/#products", label: "AutoAnalyst" },
    { href: "/#products", label: "Blog2Video" },
  ],
  Connect: [
    { href: "https://www.linkedin.com/company/firebird-technologies-singapore", label: "LinkedIn" },
    { href: "https://github.com/firebird-technologies", label: "GitHub" },
    { href: "https://www.firebird-technologies.com", label: "Website" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo-sm.jpg"
                alt="FireBird Technologies"
                width={40}
                height={40}
                className="object-cover"
              />
              <span className="text-white font-bold text-lg font-[family-name:var(--font-heading)]">
                FireBird<span className="text-[#FF2000]">.</span>
              </span>
            </Link>
            <p className="text-white/30 text-sm leading-relaxed max-w-[180px]">
              AI SaaS & bespoke solutions. Built in Singapore.
            </p>
            <p className="text-[#FF2000] text-xs font-bold tracking-[0.25em] uppercase mt-4">
              AI . Tech . Fire
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-white/20 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                {category}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-white/50 hover:text-white text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} FireBird Technologies. All rights reserved.
          </p>
          <p className="text-white/10 text-xs">
            Singapore River, Central Region · arslan@firebird-technologies.com
          </p>
        </div>
      </div>
    </footer>
  );
}
