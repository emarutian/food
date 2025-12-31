"use client";

import { useState } from "react";
import { Mail, Loader2, Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API call for Phase 1
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-charcoal-light" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-parchment-dark bg-white focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all"
          disabled={status === "loading" || status === "success"}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="bg-terracotta hover:bg-terracotta-dark disabled:bg-terracotta-light text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 min-w-[140px]"
      >
        {status === "loading" && <Loader2 className="h-5 w-5 animate-spin" />}
        {status === "success" && <Check className="h-5 w-5" />}
        {status === "idle" && "Subscribe"}
        {status === "loading" && "Subscribing..."}
        {status === "success" && "Subscribed!"}
        {status === "error" && "Try Again"}
      </button>
    </form>
  );
}
