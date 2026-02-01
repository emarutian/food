import { getPublishedRecipes } from "@/lib/recipes";
import { getLatestYouTubeVideos } from "@/lib/youtube";
import { RecipesClient } from "./recipes-client";

// Pin this video first (Easy Family Meals intro)
const FEATURED_VIDEO_ID = "0vjlb0k4Juk";

export default async function RecipesPage() {
  const [recipes, videos] = await Promise.all([
    getPublishedRecipes(),
    getLatestYouTubeVideos(50), // Fetch all videos
  ]);

  // Sort videos to put featured video first
  const sortedVideos = [...videos].sort((a, b) => {
    if (a.id === FEATURED_VIDEO_ID) return -1;
    if (b.id === FEATURED_VIDEO_ID) return 1;
    return 0;
  });

  return <RecipesClient recipes={recipes} videos={sortedVideos} />;
}
