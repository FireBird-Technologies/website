"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-white py-28 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left column */}
          <div>
            <p className="text-[#FF2000] text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Get In Touch
            </p>
            <h2 className="text-black text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] tracking-tight mb-6">
              Let&apos;s Build
              <br />
              Something Great.
            </h2>
            <div className="h-1 w-16 bg-[#FF2000] mb-8" />
            <p className="text-black/60 leading-relaxed text-lg">
              Whether you&apos;re exploring AI for your business or have a specific project in mind,
              we&apos;d love to talk. We typically respond within 24 hours.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { label: "Email", value: "arslan@firebird-technologies.com" },
                { label: "Website", value: "firebird-technologies.com" },
                { label: "Availability", value: "Open to new projects" },
              ].map((item) => (
                <div key={item.label} className="flex gap-6 items-baseline">
                  <span className="text-xs font-bold uppercase tracking-widest text-black/30 w-24 flex-shrink-0">
                    {item.label}
                  </span>
                  <span className="text-black font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — form */}
          <div className="border border-black p-10">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle className="h-12 w-12 text-[#FF2000] mb-4" />
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-2">
                  Message Received
                </h3>
                <p className="text-black/60">We&apos;ll get back to you within 24 hours.</p>
                <Button
                  variant="outline"
                  className="mt-6 rounded-none border-black text-sm font-bold uppercase tracking-widest"
                  onClick={() => setStatus("idle")}
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-black/50">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="rounded-none border-black/20 focus:border-[#FF2000] focus:ring-0 h-11"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-xs font-bold uppercase tracking-widest text-black/50">
                      Company
                    </Label>
                    <Input
                      id="company"
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      className="rounded-none border-black/20 focus:border-[#FF2000] focus:ring-0 h-11"
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-black/50">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="rounded-none border-black/20 focus:border-[#FF2000] focus:ring-0 h-11"
                    placeholder="you@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-black/50">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    required
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="rounded-none border-black/20 focus:border-[#FF2000] focus:ring-0 min-h-[140px] resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {status === "error" && (
                  <p className="text-[#FF2000] text-sm">Something went wrong. Please try again.</p>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-black hover:bg-[#FF2000] text-white rounded-none h-12 font-bold text-sm tracking-widest uppercase transition-colors"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
