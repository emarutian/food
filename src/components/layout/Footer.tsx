import Link from "next/link";
import { ChefHat, Youtube, Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal text-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-terracotta" />
              <span className="font-heading text-lg sm:text-xl font-semibold">
                I Have Food at Home
              </span>
            </Link>
            <p className="text-parchment/70 text-sm sm:text-base max-w-md">
              Simple, healthy, budget-friendly recipes for busy parents.
              Turn mealtime chaos into joyful moments around the table.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/recipes" className="text-parchment/70 hover:text-terracotta transition-colors text-sm sm:text-base">
                  All Recipes
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-parchment/70 hover:text-terracotta transition-colors text-sm sm:text-base">
                  About Lan
                </Link>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@Ihavefoodathome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-parchment/70 hover:text-terracotta transition-colors text-sm sm:text-base"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-heading text-base sm:text-lg font-semibold mb-3 sm:mb-4">Connect</h3>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://www.youtube.com/@Ihavefoodathome"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-parchment/10 rounded-lg hover:bg-terracotta transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-parchment/10 rounded-lg hover:bg-terracotta transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="mailto:hello@ihavefoodathome.com"
                className="p-2 bg-parchment/10 rounded-lg hover:bg-terracotta transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-parchment/20 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col items-center gap-3 sm:gap-4 text-center">
          <p className="font-accent text-base sm:text-lg text-terracotta">
            Turning mealtime chaos into joy
          </p>
          <p className="text-parchment/50 text-xs sm:text-sm">
            © {new Date().getFullYear()} I Have Food at Home. Made with love by Lan.
          </p>
        </div>
      </div>
    </footer>
  );
}
