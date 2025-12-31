import Link from "next/link";
import { ChefHat, Youtube, Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal text-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ChefHat className="h-8 w-8 text-terracotta" />
              <span className="font-heading text-xl font-semibold">
                From Scratch Kitchen
              </span>
            </Link>
            <p className="text-parchment/70 max-w-md">
              Homemade recipes with love, auto-generated from our favorite cooking videos.
              Learn to cook like a pro with step-by-step instructions and helpful tips.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/recipes" className="text-parchment/70 hover:text-terracotta transition-colors">
                  All Recipes
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-parchment/70 hover:text-terracotta transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-parchment/70 hover:text-terracotta transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-parchment/10 rounded-lg hover:bg-terracotta transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-parchment/10 rounded-lg hover:bg-terracotta transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@fromscratchkitchen.com"
                className="p-2 bg-parchment/10 rounded-lg hover:bg-terracotta transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-parchment/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-parchment/50 text-sm">
            © {new Date().getFullYear()} From Scratch Kitchen. Made with love.
          </p>
          <p className="font-accent text-lg text-terracotta">
            Cook with passion, eat with joy
          </p>
        </div>
      </div>
    </footer>
  );
}
