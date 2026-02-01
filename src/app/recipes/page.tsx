import { getPublishedRecipes } from "@/lib/recipes";
import { RecipesClient } from "./recipes-client";

export default async function RecipesPage() {
  const recipes = await getPublishedRecipes();

  return <RecipesClient recipes={recipes} />;
}
