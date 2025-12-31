import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  ChefHat,
  ArrowLeft,
  Lightbulb,
  Utensils,
  Youtube,
} from "lucide-react";
import { getRecipeBySlug, getCommentsForRecipe, mockRecipes } from "@/lib/mock-data";
import { CommentSection } from "@/components/recipe/CommentSection";
import { RatingButtons } from "@/components/recipe/RatingButtons";

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return mockRecipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return {
      title: "Recipe Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ihavefoodathome.com";

  return {
    title: recipe.title,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      type: "article",
      url: `${siteUrl}/recipes/${recipe.slug}`,
      siteName: "I Have Food at Home",
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description: recipe.description,
      creator: "@Ihavefoodathome",
    },
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const comments = getCommentsForRecipe(recipe.id);

  const difficultyColors = {
    Easy: "bg-sage text-white",
    Medium: "bg-honey text-charcoal",
    Hard: "bg-terracotta text-white",
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 text-charcoal-light hover:text-terracotta transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Recipes
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                difficultyColors[recipe.enhancedRecipe.difficulty]
              }`}
            >
              {recipe.enhancedRecipe.difficulty}
            </span>
            <span className="text-charcoal-light text-sm flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {recipe.enhancedRecipe.totalTime}
            </span>
            <span className="text-charcoal-light text-sm flex items-center gap-1">
              <ChefHat className="h-4 w-4" />
              {recipe.enhancedRecipe.servings}
            </span>
          </div>

          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-charcoal mb-4">
            {recipe.title}
          </h1>

          <p className="text-charcoal-light text-lg">{recipe.description}</p>
        </header>

        {/* Video Embed */}
        <div className="mb-8">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${recipe.youtubeId}`}
              title={recipe.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <a
            href={recipe.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm text-charcoal-light hover:text-terracotta transition-colors"
          >
            <Youtube className="h-4 w-4" />
            Watch on YouTube
          </a>
        </div>

        {/* Rating Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="font-heading text-3xl font-bold text-sage">{recipe.rating}%</p>
                <p className="text-sm text-charcoal-light">liked this</p>
              </div>
              <div className="h-12 w-px bg-parchment-dark" />
              <div className="text-center">
                <p className="font-heading text-2xl font-bold text-charcoal">{recipe.ratingCount}</p>
                <p className="text-sm text-charcoal-light">ratings</p>
              </div>
            </div>

            <RatingButtons />
          </div>
        </div>

        {/* Recipe Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Ingredients - Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="font-heading text-xl font-semibold text-charcoal mb-4 flex items-center gap-2">
                <Utensils className="h-5 w-5 text-terracotta" />
                Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.enhancedRecipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-charcoal"
                  >
                    <span className="w-2 h-2 rounded-full bg-terracotta mt-2 flex-shrink-0" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions - Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Instructions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-heading text-xl font-semibold text-charcoal mb-6">
                Instructions
              </h2>
              <ol className="space-y-6">
                {recipe.enhancedRecipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-terracotta text-white font-semibold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <p className="text-charcoal pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Time Info */}
            <div className="bg-parchment-dark rounded-xl p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-charcoal-light mb-1">Prep Time</p>
                  <p className="font-heading font-semibold text-charcoal">
                    {recipe.enhancedRecipe.prepTime}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-charcoal-light mb-1">Cook Time</p>
                  <p className="font-heading font-semibold text-charcoal">
                    {recipe.enhancedRecipe.cookTime}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-charcoal-light mb-1">Total Time</p>
                  <p className="font-heading font-semibold text-charcoal">
                    {recipe.enhancedRecipe.totalTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-honey/10 rounded-xl p-6">
              <h2 className="font-heading text-xl font-semibold text-charcoal mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-honey-dark" />
                Pro Tips
              </h2>
              <ul className="space-y-3">
                {recipe.enhancedRecipe.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 text-charcoal">
                    <span className="text-honey-dark font-bold">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Variations */}
            <div className="bg-sage/10 rounded-xl p-6">
              <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">
                Variations
              </h2>
              <ul className="space-y-3">
                {recipe.enhancedRecipe.variations.map((variation, index) => (
                  <li key={index} className="flex items-start gap-3 text-charcoal">
                    <span className="text-sage font-bold">•</span>
                    {variation}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <CommentSection comments={comments} recipeId={recipe.id} />
      </div>
    </div>
  );
}
