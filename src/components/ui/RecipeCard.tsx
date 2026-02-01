import Link from "next/link";
import Image from "next/image";
import { Clock, ChefHat } from "lucide-react";
import { Recipe } from "@/types";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const difficultyColors = {
    Easy: "bg-sage text-white",
    Medium: "bg-honey text-charcoal",
    Hard: "bg-terracotta text-white",
  };

  return (
    <Link href={`/recipes/${recipe.slug}`} className="group block">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={recipe.thumbnailUrl}
            alt={recipe.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Difficulty badge */}
          <span
            className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
              difficultyColors[recipe.enhancedRecipe.difficulty]
            }`}
          >
            {recipe.enhancedRecipe.difficulty}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-heading text-lg font-semibold text-charcoal group-hover:text-terracotta transition-colors line-clamp-2">
            {recipe.title}
          </h3>

          <p className="mt-2 text-charcoal-light text-sm line-clamp-2">
            {recipe.description}
          </p>

          {/* Meta */}
          <div className="mt-4 flex items-center gap-4 text-sm text-charcoal-light">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {recipe.enhancedRecipe.totalTime}
            </span>
            <span className="flex items-center gap-1">
              <ChefHat className="h-4 w-4" />
              {recipe.enhancedRecipe.servings}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
