"use client";

import { useState } from "react";
import { Pencil, Save, X, Loader2, Utensils, Lightbulb } from "lucide-react";
import { EditableList } from "./EditableList";
import { EditableMetadata } from "./EditableMetadata";
import type { EnhancedRecipe } from "@/types";

interface EditableRecipeContentProps {
  slug: string;
  initialRecipe: EnhancedRecipe;
  isAdmin: boolean;
}

export function EditableRecipeContent({
  slug,
  initialRecipe,
  isAdmin,
}: EditableRecipeContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<EnhancedRecipe>(initialRecipe);
  const [savedRecipe, setSavedRecipe] = useState<EnhancedRecipe>(initialRecipe);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/recipes/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enhancedRecipe: recipe }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      setSavedRecipe(recipe);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setRecipe(savedRecipe);
    setIsEditing(false);
    setError(null);
  };

  const updateField = (field: keyof EnhancedRecipe, value: unknown) => {
    setRecipe((prev) => ({ ...prev, [field]: value }));
  };

  // Read-only view (for non-admins or when not editing)
  if (!isEditing) {
    return (
      <>
        {/* Admin Edit Button */}
        {isAdmin && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white
                         px-5 py-3 rounded-full shadow-lg transition-all hover:shadow-xl"
            >
              <Pencil className="h-5 w-5" />
              <span className="font-medium">Edit Recipe</span>
            </button>
          </div>
        )}

        {/* Ingredients */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
            <h2 className="font-heading text-xl font-semibold text-charcoal mb-4 flex items-center gap-2">
              <Utensils className="h-5 w-5 text-primary" />
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-charcoal"
                >
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions and other sections */}
        <div className="lg:col-span-2 space-y-8">
          {/* Instructions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-heading text-xl font-semibold text-charcoal mb-6">
              Instructions
            </h2>
            <ol className="space-y-6">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white font-semibold flex items-center justify-center">
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
                  {recipe.prepTime}
                </p>
              </div>
              <div>
                <p className="text-sm text-charcoal-light mb-1">Cook Time</p>
                <p className="font-heading font-semibold text-charcoal">
                  {recipe.cookTime}
                </p>
              </div>
              <div>
                <p className="text-sm text-charcoal-light mb-1">Total Time</p>
                <p className="font-heading font-semibold text-charcoal">
                  {recipe.totalTime}
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
              {recipe.tips.map((tip, index) => (
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
              {recipe.variations.map((variation, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-charcoal"
                >
                  <span className="text-sage font-bold">•</span>
                  {variation}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }

  // Editing view
  return (
    <>
      {/* Floating Save/Cancel Bar */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}
        <button
          onClick={handleCancel}
          disabled={isSaving}
          className="flex items-center gap-2 bg-white hover:bg-parchment text-charcoal
                     px-5 py-3 rounded-full shadow-lg transition-all border border-parchment-dark"
        >
          <X className="h-5 w-5" />
          <span className="font-medium">Cancel</span>
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-sage hover:bg-sage-dark text-white
                     px-5 py-3 rounded-full shadow-lg transition-all hover:shadow-xl
                     disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-medium">Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              <span className="font-medium">Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Edit Mode Banner */}
      <div className="col-span-full mb-4">
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
          <Pencil className="h-5 w-5 text-primary" />
          <p className="text-charcoal">
            <span className="font-semibold">Edit Mode</span> — Make your changes
            and click Save when done.
          </p>
        </div>
      </div>

      {/* Editable Ingredients */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
          <h2 className="font-heading text-xl font-semibold text-charcoal mb-4 flex items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" />
            Ingredients
          </h2>
          <EditableList
            items={recipe.ingredients}
            onChange={(items) => updateField("ingredients", items)}
            placeholder="Enter ingredient..."
          />
        </div>
      </div>

      {/* Editable Instructions and other sections */}
      <div className="lg:col-span-2 space-y-8">
        {/* Instructions */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-heading text-xl font-semibold text-charcoal mb-6">
            Instructions
          </h2>
          <EditableList
            items={recipe.instructions}
            onChange={(items) => updateField("instructions", items)}
            placeholder="Enter instruction step..."
            numbered
          />
        </div>

        {/* Editable Metadata (times, servings, difficulty) */}
        <EditableMetadata
          prepTime={recipe.prepTime}
          cookTime={recipe.cookTime}
          totalTime={recipe.totalTime}
          servings={recipe.servings}
          difficulty={recipe.difficulty}
          onChange={(field, value) =>
            updateField(field as keyof EnhancedRecipe, value)
          }
        />

        {/* Tips */}
        <div className="bg-honey/10 rounded-xl p-6">
          <h2 className="font-heading text-xl font-semibold text-charcoal mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-honey-dark" />
            Pro Tips
          </h2>
          <EditableList
            items={recipe.tips}
            onChange={(items) => updateField("tips", items)}
            placeholder="Enter a pro tip..."
          />
        </div>

        {/* Variations */}
        <div className="bg-sage/10 rounded-xl p-6">
          <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">
            Variations
          </h2>
          <EditableList
            items={recipe.variations}
            onChange={(items) => updateField("variations", items)}
            placeholder="Enter a variation..."
          />
        </div>
      </div>
    </>
  );
}
