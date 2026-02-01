"use client";

import { useState, useEffect } from "react";
import {
  RefreshCw,
  TrendingUp,
  MessageCircle,
  ThumbsUp,
  Eye,
  Loader2,
  ChefHat,
  BarChart3,
  ExternalLink,
  Settings,
  Youtube,
} from "lucide-react";
import Link from "next/link";

interface Recipe {
  slug: string;
  title: string;
  rating: number;
  ratingCount: number;
  isPublished: boolean;
}

interface SyncResult {
  success: boolean;
  message: string;
  created: number;
  createdRecipes?: string[];
  errors?: string[];
  remaining?: number;
}

export default function AdminDashboard() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch recipes on mount
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await fetch("/api/recipes");
      if (res.ok) {
        const data = await res.json();
        setRecipes(data.recipes || []);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncVideos = async () => {
    setIsSyncing(true);
    setSyncResult(null);

    try {
      const res = await fetch("/api/cron/sync-videos", {
        method: "POST",
      });
      const data = await res.json();
      setSyncResult(data);

      // Refresh recipes list if new ones were created
      if (data.created > 0) {
        await fetchRecipes();
      }
    } catch (error) {
      setSyncResult({
        success: false,
        message: "Failed to sync videos",
        created: 0,
        errors: [String(error)],
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Calculate stats
  const stats = {
    totalRecipes: recipes.length,
    publishedRecipes: recipes.filter((r) => r.isPublished).length,
    draftRecipes: recipes.filter((r) => !r.isPublished).length,
    avgRating: recipes.length > 0
      ? Math.round(recipes.reduce((acc, r) => acc + (r.rating || 0), 0) / recipes.length)
      : 0,
  };

  // Top recipes by rating
  const topRecipes = [...recipes]
    .filter((r) => r.isPublished)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

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
              Manage recipes and sync YouTube videos
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/keystatic"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-parchment-dark rounded-lg hover:bg-parchment transition-colors text-charcoal"
            >
              <Settings className="h-4 w-4" />
              Edit Recipes
              <ExternalLink className="h-3 w-3" />
            </Link>
            <div className="flex items-center gap-2 text-sm text-charcoal-light">
              <ChefHat className="h-5 w-5 text-primary" />
              <span>Admin</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-charcoal-light text-sm">Total Recipes</span>
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <p className="font-heading text-3xl font-bold text-charcoal">
              {isLoading ? "..." : stats.totalRecipes}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-charcoal-light text-sm">Published</span>
              <ThumbsUp className="h-5 w-5 text-sage" />
            </div>
            <p className="font-heading text-3xl font-bold text-charcoal">
              {isLoading ? "..." : stats.publishedRecipes}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-charcoal-light text-sm">Drafts</span>
              <MessageCircle className="h-5 w-5 text-honey-dark" />
            </div>
            <p className="font-heading text-3xl font-bold text-charcoal">
              {isLoading ? "..." : stats.draftRecipes}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-charcoal-light text-sm">Avg Rating</span>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <p className="font-heading text-3xl font-bold text-charcoal">
              {isLoading ? "..." : `${stats.avgRating}%`}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sync Videos Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h2 className="font-heading text-xl font-semibold text-charcoal mb-6 flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-500" />
                Sync YouTube Videos
              </h2>

              {syncResult && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    syncResult.success
                      ? "bg-sage/10 border border-sage text-sage"
                      : "bg-red-50 border border-red-200 text-red-700"
                  }`}
                >
                  <p className="font-medium">{syncResult.message}</p>
                  {syncResult.created > 0 && (
                    <p className="mt-2 text-sm">
                      Created {syncResult.created} new recipe(s):
                      <ul className="list-disc list-inside mt-1">
                        {syncResult.createdRecipes?.map((title, i) => (
                          <li key={i}>{title}</li>
                        ))}
                      </ul>
                    </p>
                  )}
                  {syncResult.remaining && syncResult.remaining > 0 && (
                    <p className="mt-2 text-sm">
                      {syncResult.remaining} more videos to process. Click sync again.
                    </p>
                  )}
                  {syncResult.errors && syncResult.errors.length > 0 && (
                    <p className="mt-2 text-sm">
                      Errors: {syncResult.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={handleSyncVideos}
                disabled={isSyncing}
                className="w-full bg-primary hover:bg-primary-dark disabled:bg-primary-light text-white px-6 py-4 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
              >
                {isSyncing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Syncing Videos...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-5 w-5" />
                    Sync New Videos from YouTube
                  </>
                )}
              </button>

              <div className="mt-6 p-4 bg-parchment-dark rounded-lg">
                <h3 className="font-medium text-charcoal mb-2">How it works:</h3>
                <ol className="text-sm text-charcoal-light space-y-1 list-decimal list-inside">
                  <li>Fetches latest videos from your YouTube channel</li>
                  <li>Identifies videos without recipes</li>
                  <li>Gemini AI generates recipe content for each video</li>
                  <li>Recipes are saved as drafts for your review</li>
                  <li>Edit and publish via Keystatic CMS</li>
                </ol>
                <p className="mt-4 text-xs text-charcoal-light">
                  This runs automatically every day at 6 AM UTC via Vercel Cron.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-heading text-xl font-semibold text-charcoal mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/keystatic/recipes"
                  className="flex items-center gap-3 p-4 bg-parchment rounded-lg hover:bg-parchment-dark transition-colors"
                >
                  <Settings className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium text-charcoal">Edit Recipes</p>
                    <p className="text-xs text-charcoal-light">
                      Open Keystatic CMS
                    </p>
                  </div>
                </Link>
                <Link
                  href="/recipes"
                  className="flex items-center gap-3 p-4 bg-parchment rounded-lg hover:bg-parchment-dark transition-colors"
                >
                  <Eye className="h-6 w-6 text-sage" />
                  <div>
                    <p className="font-medium text-charcoal">View Recipes</p>
                    <p className="text-xs text-charcoal-light">
                      See public recipe page
                    </p>
                  </div>
                </Link>
              </div>
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
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-charcoal-light" />
                </div>
              ) : topRecipes.length > 0 ? (
                <div className="space-y-4">
                  {topRecipes.map((recipe, index) => (
                    <Link
                      key={recipe.slug}
                      href={`/recipes/${recipe.slug}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-parchment transition-colors group"
                    >
                      <span className="w-6 h-6 rounded-full bg-parchment-dark flex items-center justify-center text-sm font-medium text-charcoal-light group-hover:bg-primary group-hover:text-white transition-colors">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-charcoal truncate">
                          {recipe.title}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-charcoal-light">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            {recipe.rating || 0}%
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {recipe.ratingCount || 0}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center text-charcoal-light py-4">
                  No published recipes yet
                </p>
              )}
            </div>

            {/* All Recipes */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-semibold text-charcoal">
                  All Recipes
                </h2>
                <Link
                  href="/keystatic/recipes"
                  className="text-xs text-primary hover:text-primary-dark"
                >
                  Edit all →
                </Link>
              </div>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-charcoal-light" />
                </div>
              ) : recipes.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {recipes.map((recipe) => (
                    <Link
                      key={recipe.slug}
                      href={`/keystatic/recipes/${recipe.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-parchment transition-colors"
                    >
                      <span className="text-sm text-charcoal truncate flex-1">
                        {recipe.title}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ml-2 ${
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
              ) : (
                <p className="text-center text-charcoal-light py-4">
                  No recipes yet. Click &quot;Sync New Videos&quot; to get started!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
