import Link from "next/link";
import { ArrowRight, Play, BookOpen, Users } from "lucide-react";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { mockRecipes } from "@/lib/mock-data";

export default function HomePage() {
  const latestRecipes = mockRecipes.slice(0, 3);
  const featuredRecipe = mockRecipes[4]; // Ramen as featured

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-parchment to-parchment-dark py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <p className="font-accent text-2xl text-terracotta mb-4">
                Welcome to our kitchen
              </p>
              <h1 className="font-heading text-4xl lg:text-6xl font-bold text-charcoal leading-tight">
                Cook with love,
                <br />
                <span className="text-terracotta">from scratch</span>
              </h1>
              <p className="mt-6 text-lg text-charcoal-light max-w-lg">
                Discover authentic recipes auto-generated from our favorite cooking videos.
                Each recipe comes with AI-enhanced instructions, tips, and variations.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/recipes"
                  className="bg-terracotta hover:bg-terracotta-dark text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                >
                  Browse Recipes
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/about"
                  className="border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  About Us
                </Link>
              </div>
            </div>

            {/* Featured Recipe Card */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={featuredRecipe.thumbnailUrl}
                    alt={featuredRecipe.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-4 shadow-lg hover:scale-110 transition-transform cursor-pointer">
                      <Play className="h-8 w-8 text-terracotta fill-terracotta" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block bg-terracotta text-white text-xs font-medium px-2 py-1 rounded mb-2">
                      Featured
                    </span>
                    <h2 className="font-heading text-xl text-white font-semibold">
                      {featuredRecipe.title}
                    </h2>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-charcoal-light text-sm line-clamp-2">
                    {featuredRecipe.description}
                  </p>
                  <Link
                    href={`/recipes/${featuredRecipe.slug}`}
                    className="mt-3 text-terracotta font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View Recipe <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-honey/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-sage/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-charcoal py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-2">
                <BookOpen className="h-6 w-6 text-terracotta" />
              </div>
              <p className="font-heading text-2xl font-bold text-white">{mockRecipes.length}+</p>
              <p className="text-parchment/70 text-sm">Recipes</p>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Play className="h-6 w-6 text-terracotta" />
              </div>
              <p className="font-heading text-2xl font-bold text-white">100+</p>
              <p className="text-parchment/70 text-sm">Videos</p>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Users className="h-6 w-6 text-terracotta" />
              </div>
              <p className="font-heading text-2xl font-bold text-white">5K+</p>
              <p className="text-parchment/70 text-sm">Subscribers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Recipes */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-accent text-xl text-terracotta mb-2">Fresh out of the oven</p>
              <h2 className="font-heading text-3xl font-bold text-charcoal">
                Latest Recipes
              </h2>
            </div>
            <Link
              href="/recipes"
              className="text-terracotta font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 bg-sage/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-accent text-xl text-terracotta mb-2">Never miss a recipe</p>
            <h2 className="font-heading text-3xl font-bold text-charcoal mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-charcoal-light mb-8">
              Get notified when we publish new recipes. No spam, just delicious content
              delivered straight to your inbox.
            </p>
            <div className="flex justify-center">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-accent text-xl text-terracotta mb-2">Why cook with us?</p>
            <h2 className="font-heading text-3xl font-bold text-charcoal">
              More Than Just Recipes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-terracotta" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
                Watch & Learn
              </h3>
              <p className="text-charcoal-light">
                Every recipe comes with an embedded video, so you can watch and cook along
                at your own pace.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-sage" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
                AI-Enhanced
              </h3>
              <p className="text-charcoal-light">
                Our AI extracts detailed ingredients, step-by-step instructions, pro tips,
                and tasty variations.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-honey/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-honey-dark" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
                Community Driven
              </h3>
              <p className="text-charcoal-light">
                Rate recipes, leave comments, and get direct replies from our kitchen
                team.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
