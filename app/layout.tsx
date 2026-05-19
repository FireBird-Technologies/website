import type { Metadata } from "next";
import { Space_Grotesk, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "FireBird Technologies — AI. Tech. Fire.",
  description:
    "AI SaaS and services company building open-source AI data analytics software and bespoke solutions for clients.",
  keywords: ["AI", "LLM", "AI Agents", "Data Analytics", "Singapore", "Tech Consulting"],
  openGraph: {
    title: "FireBird Technologies",
    description: "AI. Tech. Fire.",
    url: "https://firebird-technologies.com",
    siteName: "FireBird Technologies",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
