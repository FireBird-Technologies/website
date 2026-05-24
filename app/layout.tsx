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
  metadataBase: new URL("https://firebird-technologies.com"),
  title: "FireBird Technologies — AI. Tech. Fire.",
  description:
    "Open-source AI analytics and bespoke LLM systems. Engineered for companies that ship.",
  keywords: [
    "AI",
    "LLM",
    "AI Agents",
    "RAG",
    "Data Analytics",
    "Singapore",
    "AI Consulting",
    "Open Source AI",
  ],
  openGraph: {
    title: "FireBird Technologies — AI. Tech. Fire.",
    description:
      "Open-source AI analytics and bespoke LLM systems. Engineered for companies that ship.",
    url: "https://firebird-technologies.com",
    siteName: "FireBird Technologies",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FireBird Technologies — AI. Tech. Fire.",
    description:
      "Open-source AI analytics and bespoke LLM systems. Engineered for companies that ship.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
