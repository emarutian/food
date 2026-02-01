import Link from "next/link";
import { ArrowRight, Play, BookOpen, Users, Clock, Heart, Leaf } from "lucide-react";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { LatestVideos } from "@/components/sections/LatestVideos";
import { mockRecipes } from "@/lib/mock-data";

export default function HomePage() {
  const latestRecipes = mockRecipes.slice(0, 3);
  const featuredRecipe = mockRecipes[0]; // Korean Short Ribs as featured

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-parchment to-parchment-dark py-10 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <p className="font-accent text-xl sm:text-2xl text-primary mb-2 sm:mb-4">
                Hi, I&apos;m Lan
              </p>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-bold text-charcoal leading-tight">
                I Have Food
                <br />
                <span className="text-primary">at Home</span>
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-charcoal-light max-w-lg mx-auto lg:mx-0">
                Simple, healthy, budget-friendly recipes for busy parents.
                Turn mealtime chaos into joyful moments around the table—even for the pickiest eaters.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
                <Link
                  href="/recipes"
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
                >
                  Browse Recipes
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/about"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
                >
                  Meet Lan
                </Link>
              </div>
            </div>

            {/* Featured Recipe Card */}
            <div className="relative mt-4 lg:mt-0">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
                <Link href={`/recipes/${featuredRecipe.slug}`} className="block">
                  <div className="relative aspect-video">
                    <img
                      src={featuredRecipe.thumbnailUrl}
                      alt={featuredRecipe.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-3 sm:p-4 shadow-lg hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 sm:h-8 sm:w-8 text-primary fill-primary" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                      <span className="inline-block bg-primary text-white text-xs font-medium px-2 py-1 rounded mb-1 sm:mb-2">
                        Featured
                      </span>
                      <h2 className="font-heading text-lg sm:text-xl text-white font-semibold">
                        {featuredRecipe.title}
                      </h2>
                    </div>
                  </div>
                </Link>
                <div className="p-3 sm:p-4">
                  <p className="text-charcoal-light text-sm line-clamp-2">
                    {featuredRecipe.description}
                  </p>
                  <Link
                    href={`/recipes/${featuredRecipe.slug}`}
                    className="mt-2 sm:mt-3 text-primary font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View Recipe <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Decorative elements - hidden on mobile */}
              <div className="hidden sm:block absolute -top-4 -right-4 w-24 h-24 bg-honey/20 rounded-full blur-2xl" />
              <div className="hidden sm:block absolute -bottom-4 -left-4 w-32 h-32 bg-sage/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-blue py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
            <div>
              <div className="flex justify-center mb-1 sm:mb-2">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <p className="font-heading text-xl sm:text-2xl font-bold text-white">36+</p>
              <p className="text-parchment/70 text-xs sm:text-sm">Videos</p>
            </div>
            <div>
              <div className="flex justify-center mb-1 sm:mb-2">
                <Play className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <p className="font-heading text-xl sm:text-2xl font-bold text-white">59K+</p>
              <p className="text-parchment/70 text-xs sm:text-sm">Views</p>
            </div>
            <div>
              <div className="flex justify-center mb-1 sm:mb-2">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <p className="font-heading text-xl sm:text-2xl font-bold text-white">860+</p>
              <p className="text-parchment/70 text-xs sm:text-sm">Subscribers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Recipes */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
            <div className="text-center sm:text-left">
              <p className="font-accent text-lg sm:text-xl text-primary mb-1 sm:mb-2">Fresh from my kitchen</p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal">
                Latest Recipes
              </h2>
            </div>
            <Link
              href="/recipes"
              className="text-primary font-medium inline-flex items-center justify-center sm:justify-start gap-1 hover:gap-2 transition-all"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {latestRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest YouTube Videos */}
      <LatestVideos />

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-sage/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-accent text-lg sm:text-xl text-primary mb-1 sm:mb-2">Join the family</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-3 sm:mb-4">
              Never Miss a Recipe
            </h2>
            <p className="text-charcoal-light text-sm sm:text-base mb-6 sm:mb-8 px-2">
              Get simple, kid-approved recipes delivered straight to your inbox.
              No spam—just delicious meals your whole family will love.
            </p>
            <div className="flex justify-center px-2">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      {/* Why Cook With Me Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <p className="font-accent text-lg sm:text-xl text-primary mb-1 sm:mb-2">Why cook with me?</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal">
              Recipes That Work for Real Life
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Clock className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-semibold text-charcoal mb-2">
                Quick & Simple
              </h3>
              <p className="text-charcoal-light text-sm sm:text-base">
                Most recipes ready in under 30 minutes. Perfect for busy weeknights
                when you need dinner on the table fast.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Leaf className="h-7 w-7 sm:h-8 sm:w-8 text-sage" />
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-semibold text-charcoal mb-2">
                Healthy & Balanced
              </h3>
              <p className="text-charcoal-light text-sm sm:text-base">
                Nutritious meals the whole family will enjoy. Inspired by French
                and Vietnamese cooking traditions.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 sm:col-span-2 md:col-span-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-honey/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Heart className="h-7 w-7 sm:h-8 sm:w-8 text-honey-dark" />
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-semibold text-charcoal mb-2">
                Picky Eater Approved
              </h3>
              <p className="text-charcoal-light text-sm sm:text-base">
                Tested on real kids—including the pickiest ones. Tips and techniques
                to help every child love food.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
