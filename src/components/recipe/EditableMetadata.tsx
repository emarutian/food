"use client";

import { Clock, ChefHat } from "lucide-react";

interface EditableMetadataProps {
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: string;
  difficulty: "Easy" | "Medium" | "Hard";
  onChange: (field: string, value: string) => void;
}

export function EditableMetadata({
  prepTime,
  cookTime,
  totalTime,
  servings,
  difficulty,
  onChange,
}: EditableMetadataProps) {
  return (
    <div className="space-y-6">
      {/* Time inputs */}
      <div className="bg-parchment-dark rounded-xl p-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-charcoal-light mb-2">
              Prep Time
            </label>
            <input
              type="text"
              value={prepTime}
              onChange={(e) => onChange("prepTime", e.target.value)}
              placeholder="e.g., 10 mins"
              className="w-full px-3 py-2 rounded-lg border border-parchment bg-white
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         text-charcoal font-heading font-semibold text-center"
            />
          </div>
          <div>
            <label className="block text-sm text-charcoal-light mb-2">
              Cook Time
            </label>
            <input
              type="text"
              value={cookTime}
              onChange={(e) => onChange("cookTime", e.target.value)}
              placeholder="e.g., 20 mins"
              className="w-full px-3 py-2 rounded-lg border border-parchment bg-white
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         text-charcoal font-heading font-semibold text-center"
            />
          </div>
          <div>
            <label className="block text-sm text-charcoal-light mb-2">
              Total Time
            </label>
            <input
              type="text"
              value={totalTime}
              onChange={(e) => onChange("totalTime", e.target.value)}
              placeholder="e.g., 30 mins"
              className="w-full px-3 py-2 rounded-lg border border-parchment bg-white
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         text-charcoal font-heading font-semibold text-center"
            />
          </div>
        </div>
      </div>

      {/* Servings and Difficulty */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2 flex items-center gap-2">
            <ChefHat className="h-4 w-4 text-primary" />
            Servings
          </label>
          <input
            type="text"
            value={servings}
            onChange={(e) => onChange("servings", e.target.value)}
            placeholder="e.g., 4 servings"
            className="w-full px-3 py-2 rounded-lg border border-parchment-dark bg-white
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       text-charcoal"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Difficulty
          </label>
          <select
            value={difficulty}
            onChange={(e) => onChange("difficulty", e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-parchment-dark bg-white
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       text-charcoal cursor-pointer"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>
    </div>
  );
}
