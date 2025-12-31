"use client";

import { useState } from "react";
import {
  Plus,
  TrendingUp,
  MessageCircle,
  ThumbsUp,
  Eye,
  Loader2,
  Youtube,
  ChefHat,
  BarChart3,
} from "lucide-react";
import { mockRecipes, mockComments } from "@/lib/mock-data";
import Link from "next/link";

export default function AdminDashboard() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCreateRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl) return;

    setIsCreating(true);
    // Simulate API call for Phase 1
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsCreating(false);
    setShowSuccess(true);
    setYoutubeUrl("");

    // Reset success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Mock stats
  const stats = {
    totalRecipes: mockRecipes.length,
    totalRatings: mockRecipes.reduce((acc, r) => acc + r.ratingCount, 0),
    totalComments: mockComments.length,
    avgRating: Math.round(
      mockRecipes.reduce((acc, r) => acc + r.rating, 0) / mockRecipes.length
    ),
  };

  // Top recipes by rating
  const topRecipes = [...mockRecipes]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  // Recent comments needing reply
  const unrepliedComments = mockComments.filter((c) => !c.adminReply);

  return (
    <div className="min-h-screen py-8 bg-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-charcoal">
              Admin Dashboard
            </h1>
            <p className="text-charcoal-light mt-1">
              Manage recipes and view analytics
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-charcoal-light">
            <ChefHat className="h-5 w-5 text-terracotta" />
            <span>Lan</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-charcoal-light text-sm">Total Recipes</span>
              <BarChart3 className="h-5 w-5 text-terracotta" />
            </div>
            <p className="font-heading text-3xl font-bold text-charcoal">
              {stats.totalRecipes}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-charcoal-light text-sm">Total Ratings</span>
              <ThumbsUp className="h-5 w-5 text-sage" />
            </div>
            <p className="font-heading text-3xl font-bold text-charcoal">
              {stats.totalRatings}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-charcoal-light text-sm">Comments</span>
              <MessageCircle className="h-5 w-5 text-honey-dark" />
            </div>
            <p className="font-heading text-3xl font-bold text-charcoal">
              {stats.totalComments}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-charcoal-light text-sm">Avg Rating</span>
              <TrendingUp className="h-5 w-5 text-terracotta" />
            </div>
            <p className="font-heading text-3xl font-bold text-charcoal">
              {stats.avgRating}%
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Create Recipe Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h2 className="font-heading text-xl font-semibold text-charcoal mb-6 flex items-center gap-2">
                <Plus className="h-5 w-5 text-terracotta" />
                Create New Recipe
              </h2>

              {showSuccess && (
                <div className="mb-6 p-4 bg-sage/10 border border-sage rounded-lg text-sage">
                  Recipe created successfully! AI is generating the enhanced content...
                </div>
              )}

              <form onSubmit={handleCreateRecipe}>
                <div className="mb-4">
                  <label
                    htmlFor="youtube-url"
                    className="block text-sm font-medium text-charcoal mb-2"
                  >
                    YouTube Video URL
                  </label>
                  <div className="relative">
                    <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-charcoal-light" />
                    <input
                      type="url"
                      id="youtube-url"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-parchment-dark bg-parchment focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all"
                      disabled={isCreating}
                    />
                  </div>
                  <p className="mt-2 text-sm text-charcoal-light">
                    Paste a YouTube cooking video URL. The system will extract metadata
                    and generate an AI-enhanced recipe.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isCreating || !youtubeUrl}
                  className="w-full bg-terracotta hover:bg-terracotta-dark disabled:bg-terracotta-light text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Creating Recipe...
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      Create Recipe
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 p-4 bg-parchment-dark rounded-lg">
                <h3 className="font-medium text-charcoal mb-2">How it works:</h3>
                <ol className="text-sm text-charcoal-light space-y-1 list-decimal list-inside">
                  <li>Paste a YouTube cooking video URL</li>
                  <li>System extracts video metadata (title, description, thumbnail)</li>
                  <li>Gemini AI generates enhanced recipe content</li>
                  <li>Recipe page is created and published</li>
                  <li>Email notification sent to all subscribers</li>
                </ol>
              </div>
            </div>

            {/* Recent Comments */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-semibold text-charcoal flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-honey-dark" />
                  Comments Needing Reply
                </h2>
                <span className="text-sm text-charcoal-light">
                  {unrepliedComments.length} pending
                </span>
              </div>

              {unrepliedComments.length > 0 ? (
                <div className="space-y-4">
                  {unrepliedComments.map((comment) => {
                    const recipe = mockRecipes.find((r) => r.id === comment.recipeId);
                    return (
                      <div
                        key={comment.id}
                        className="p-4 bg-parchment rounded-lg"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-charcoal">
                                {comment.user.name}
                              </span>
                              <span className="text-xs text-charcoal-light">
                                on {recipe?.title}
                              </span>
                            </div>
                            <p className="text-sm text-charcoal-light">
                              {comment.content}
                            </p>
                          </div>
                          <button className="text-sm text-terracotta hover:text-terracotta-dark font-medium whitespace-nowrap">
                            Reply
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-charcoal-light py-4">
                  All comments have been replied to!
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Top Recipes */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-heading text-xl font-semibold text-charcoal mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-sage" />
                Top Performing Recipes
              </h2>
              <div className="space-y-4">
                {topRecipes.map((recipe, index) => (
                  <Link
                    key={recipe.id}
                    href={`/recipes/${recipe.slug}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-parchment transition-colors group"
                  >
                    <span className="w-6 h-6 rounded-full bg-parchment-dark flex items-center justify-center text-sm font-medium text-charcoal-light group-hover:bg-terracotta group-hover:text-white transition-colors">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal truncate">
                        {recipe.title}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-charcoal-light">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {recipe.rating}%
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {recipe.ratingCount}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* All Recipes */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-heading text-xl font-semibold text-charcoal mb-6">
                All Recipes
              </h2>
              <div className="space-y-2">
                {mockRecipes.map((recipe) => (
                  <Link
                    key={recipe.id}
                    href={`/recipes/${recipe.slug}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-parchment transition-colors"
                  >
                    <span className="text-sm text-charcoal truncate flex-1">
                      {recipe.title}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        recipe.isPublished
                          ? "bg-sage/10 text-sage"
                          : "bg-honey/10 text-honey-dark"
                      }`}
                    >
                      {recipe.isPublished ? "Published" : "Draft"}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
