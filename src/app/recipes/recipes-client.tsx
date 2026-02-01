"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { VideoCard } from "@/components/ui/VideoCard";
import { DifficultyFilter } from "@/components/ui/DifficultyFilter";
import type { Recipe } from "@/lib/recipes";
import type { YouTubeVideo } from "@/types";

interface RecipesClientProps {
  recipes: Recipe[];
  videos?: YouTubeVideo[];
}

export function RecipesClient({ recipes, videos = [] }: RecipesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<"recipes" | "videos">("videos");

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

  const filteredVideos = useMemo(() => {
    if (searchQuery === "") return videos;
    return videos.filter(
      (video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [videos, searchQuery]);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-accent text-xl text-primary mb-2">
            Explore our collection
          </p>
          <h1 className="font-heading text-4xl font-bold text-charcoal">
            All Content
          </h1>
          <p className="mt-4 text-charcoal-light max-w-2xl mx-auto">
            Browse through our collection of delicious recipes and cooking videos.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "videos"
                ? "bg-primary text-white"
                : "bg-white border border-parchment-dark text-charcoal hover:border-primary"
            }`}
          >
            Videos ({videos.length})
          </button>
          <button
            onClick={() => setActiveTab("recipes")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "recipes"
                ? "bg-primary text-white"
                : "bg-white border border-parchment-dark text-charcoal hover:border-primary"
            }`}
          >
            Recipes ({recipes.length})
          </button>
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
              placeholder={activeTab === "videos" ? "Search videos..." : "Search recipes..."}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-parchment-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Difficulty Filter - only show for recipes */}
          {activeTab === "recipes" && (
            <DifficultyFilter
              selected={selectedDifficulty}
              onSelect={setSelectedDifficulty}
            />
          )}
        </div>

        {/* Results Count */}
        <p className="text-charcoal-light mb-6">
          {activeTab === "videos" ? (
            <>
              Showing {filteredVideos.length} video
              {filteredVideos.length !== 1 ? "s" : ""}
            </>
          ) : (
            <>
              Showing {filteredRecipes.length} recipe
              {filteredRecipes.length !== 1 ? "s" : ""}
            </>
          )}
        </p>

        {/* Videos Grid */}
        {activeTab === "videos" && (
          filteredVideos.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-charcoal-light mb-4">No videos found</p>
              <p className="text-charcoal-light">
                Try adjusting your search criteria
              </p>
            </div>
          )
        )}

        {/* Recipe Grid */}
        {activeTab === "recipes" && (
          filteredRecipes.length > 0 ? (
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
          )
        )}
      </div>
    </div>
  );
}
