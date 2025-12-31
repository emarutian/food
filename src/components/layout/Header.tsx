"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChefHat, Search } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-parchment border-b border-parchment-dark sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <ChefHat className="h-8 w-8 text-terracotta group-hover:text-terracotta-dark transition-colors" />
            <span className="font-heading text-xl font-semibold text-charcoal">
              I Have Food at Home
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/recipes"
              className="text-charcoal hover:text-terracotta transition-colors font-medium"
            >
              Recipes
            </Link>
            <Link
              href="/about"
              className="text-charcoal hover:text-terracotta transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/recipes"
              className="p-2 text-charcoal hover:text-terracotta transition-colors"
              aria-label="Search recipes"
            >
              <Search className="h-5 w-5" />
            </Link>

            {/* Demo: Login Button (non-functional for Phase 1) */}
            <button className="bg-terracotta hover:bg-terracotta-dark text-white px-4 py-2 rounded-lg transition-colors font-medium">
              Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-charcoal"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-parchment-dark">
            <div className="flex flex-col gap-4">
              <Link
                href="/recipes"
                className="text-charcoal hover:text-terracotta transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Recipes
              </Link>
              <Link
                href="/about"
                className="text-charcoal hover:text-terracotta transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <button className="bg-terracotta hover:bg-terracotta-dark text-white px-4 py-2 rounded-lg transition-colors font-medium w-full">
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
