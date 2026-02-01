"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { DifficultyFilter } from "@/components/ui/DifficultyFilter";
import type { Recipe } from "@/lib/recipes";

interface RecipesClientProps {
  recipes: Recipe[];
}

export function RecipesClient({ recipes }: RecipesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      // Search filter (title priority, then description)
      const matchesSearch =
        searchQuery === "" ||
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Difficulty filter
      const matchesDifficulty =
        selectedDifficulty === null ||
        recipe.difficulty === selectedDifficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [recipes, searchQuery, selectedDifficulty]);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-accent text-xl text-terracotta mb-2">
            Explore our collection
          </p>
          <h1 className="font-heading text-4xl font-bold text-charcoal">
            All Recipes
          </h1>
          <p className="mt-4 text-charcoal-light max-w-2xl mx-auto">
            Browse through our collection of delicious recipes. Each one comes
            with a video tutorial and AI-enhanced instructions.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-charcoal-light" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-parchment-dark bg-white focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all"
            />
          </div>

          {/* Difficulty Filter */}
          <DifficultyFilter
            selected={selectedDifficulty}
            onSelect={setSelectedDifficulty}
          />
        </div>

        {/* Results Count */}
        <p className="text-charcoal-light mb-6">
          Showing {filteredRecipes.length} recipe
          {filteredRecipes.length !== 1 ? "s" : ""}
        </p>

        {/* Recipe Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.slug}
                recipe={{
                  id: recipe.slug,
                  slug: recipe.slug,
                  title: recipe.title,
                  description: recipe.description,
                  thumbnailUrl: recipe.thumbnailUrl,
                  enhancedRecipe: {
                    difficulty: recipe.difficulty,
                    totalTime: recipe.totalTime,
                    servings: recipe.servings,
                    ingredients: recipe.ingredients,
                    instructions: recipe.instructions,
                    prepTime: recipe.prepTime,
                    cookTime: recipe.cookTime,
                    tips: recipe.tips,
                    variations: recipe.variations,
                  },
                  rating: 0,
                  ratingCount: 0,
                  youtubeUrl: recipe.youtubeUrl,
                  youtubeId: recipe.youtubeId,
                  commentCount: 0,
                  isPublished: recipe.isPublished,
                  publishedAt: recipe.publishedAt
                    ? new Date(recipe.publishedAt)
                    : new Date(),
                  updatedAt: new Date(),
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-charcoal-light mb-4">No recipes found</p>
            <p className="text-charcoal-light">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
