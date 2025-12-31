import Image from "next/image";
import Link from "next/link";
import { ChefHat, Heart, Sparkles, Youtube, ArrowRight } from "lucide-react";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-accent text-xl text-terracotta mb-2">Our Story</p>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal">
            About From Scratch Kitchen
          </h1>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-16">
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80"
            alt="Beautiful kitchen with fresh ingredients"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="font-accent text-3xl text-white">
              &ldquo;Cooking is love made visible&rdquo;
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">
              Why We Started
            </h2>
            <div className="space-y-4 text-charcoal-light">
              <p>
                From Scratch Kitchen was born from a simple frustration: watching amazing
                cooking videos on YouTube, only to pause, rewind, and squint at the screen
                trying to catch all the ingredients and steps.
              </p>
              <p>
                We believed there had to be a better way. What if the best cooking videos
                came with beautifully formatted recipes, complete with ingredients lists,
                step-by-step instructions, and helpful tips?
              </p>
              <p>
                So we built it. Using AI, we transform cooking videos into comprehensive
                recipe pages that make following along a breeze.
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">
              Our Mission
            </h2>
            <div className="space-y-4 text-charcoal-light">
              <p>
                We want to make home cooking more accessible and enjoyable. Whether
                you&apos;re a beginner learning to boil water or an experienced cook
                exploring new cuisines, we&apos;re here to help.
              </p>
              <p>
                Every recipe on our site is designed to be clear, comprehensive, and
                achievable. No more hunting through video descriptions or taking notes
                while you watch.
              </p>
              <p>
                Just hit play, follow along, and create something delicious.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-parchment-dark rounded-2xl p-8 lg:p-12 mb-16">
          <h2 className="font-heading text-2xl font-semibold text-charcoal text-center mb-8">
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Youtube className="h-7 w-7 text-terracotta" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">
                Video First
              </h3>
              <p className="text-charcoal-light text-sm">
                Every recipe starts with a great cooking video. Watch, learn, and cook
                along at your own pace.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-7 w-7 text-sage" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">
                AI-Enhanced
              </h3>
              <p className="text-charcoal-light text-sm">
                Our AI extracts and enhances recipes with detailed ingredients,
                instructions, tips, and variations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-honey/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-7 w-7 text-honey-dark" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">
                Made with Love
              </h3>
              <p className="text-charcoal-light text-sm">
                We personally curate every recipe. No spam, no ads, just delicious
                food made from scratch.
              </p>
            </div>
          </div>
        </div>

        {/* Meet the Chef */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 border-4 border-terracotta">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80"
              alt="Chef Sarah"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ChefHat className="h-5 w-5 text-terracotta" />
              <span className="text-sm text-terracotta font-medium">The Chef Behind It All</span>
            </div>
            <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">
              Hi, I&apos;m Sarah
            </h2>
            <p className="text-charcoal-light mb-4">
              I&apos;ve spent over 15 years in professional kitchens, from fine dining in
              Paris to street food stalls in Bangkok. Now I&apos;m on a mission to bring
              that experience to your home kitchen.
            </p>
            <p className="text-charcoal-light">
              I personally review every recipe on this site, add my own tips and
              variations, and respond to your comments. This isn&apos;t just a recipe
              database—it&apos;s a conversation about food.
            </p>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="bg-sage/10 rounded-2xl p-8 lg:p-12 text-center">
          <p className="font-accent text-xl text-terracotta mb-2">Join the kitchen</p>
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">
            Never Miss a Recipe
          </h2>
          <p className="text-charcoal-light mb-8 max-w-md mx-auto">
            Subscribe to our newsletter and get new recipes delivered straight to your
            inbox. No spam, just delicious content.
          </p>
          <div className="flex justify-center mb-6">
            <NewsletterForm />
          </div>
          <Link
            href="/recipes"
            className="text-terracotta font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
          >
            Or start browsing recipes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
