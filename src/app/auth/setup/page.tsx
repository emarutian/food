"use client";

import { useState } from "react";
import { ChefHat, Mail, Lock, User, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function SetupAdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/setup-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to set up admin");
      } else {
        setSuccess(`Admin account for ${email} has been set up successfully!`);
        setEmail("");
        setPassword("");
        setName("");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
          </div>

          <h1 className="font-heading text-2xl font-bold text-charcoal mb-2 text-center">
            Admin Setup
          </h1>
          <p className="text-charcoal-light mb-8 text-center">
            Set up password for admin accounts (development only)
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

          {/* Setup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-charcoal mb-1"
              >
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-charcoal-light" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border-2 border-parchment-dark rounded-xl
                           focus:outline-none focus:border-sage transition-colors"
                />
              </div>
              <p className="mt-1 text-xs text-charcoal-light">
                Must be in the ADMIN_EMAILS environment variable
              </p>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-charcoal mb-1"
              >
                Display Name (optional)
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-charcoal-light" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Admin Name"
                  className="w-full pl-10 pr-4 py-3 border-2 border-parchment-dark rounded-xl
                           focus:outline-none focus:border-sage transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-charcoal mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-charcoal-light" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  required
                  minLength={8}
                  className="w-full pl-10 pr-4 py-3 border-2 border-parchment-dark rounded-xl
                           focus:outline-none focus:border-sage transition-colors"
                />
              </div>
              <p className="mt-1 text-xs text-charcoal-light">
                Minimum 8 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-sage hover:bg-sage/90 text-white font-medium
                       py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Setting up..." : "Set Up Admin Account"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-parchment-dark text-center">
            <Link
              href="/auth/signin"
              className="text-sm text-terracotta hover:text-terracotta/80 transition-colors"
            >
              Already set up? Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
