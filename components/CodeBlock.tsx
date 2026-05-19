"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  language: string;
  children: string;
}

export function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 border border-black/10">
      {/* Language label */}
      <div className="flex items-center justify-between bg-[#0a0a0a] px-4 py-2 border-b border-white/10">
        <span className="text-white/30 text-xs font-bold uppercase tracking-widest">{language}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-white/30 hover:text-white text-xs transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        customStyle={{ margin: 0, borderRadius: 0, fontSize: "0.875rem" }}
        showLineNumbers={false}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
