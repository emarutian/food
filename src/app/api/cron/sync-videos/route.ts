import { NextRequest, NextResponse } from "next/server";
import { getLatestYouTubeVideos } from "@/lib/youtube";
import { generateRecipeFromVideo, createSlugFromTitle } from "@/lib/ai-recipe";
import { getAllRecipes } from "@/lib/recipes";
import fs from "fs/promises";
import path from "path";

// Vercel cron secret for security
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: NextRequest) {
  // Verify cron secret (for Vercel cron jobs)
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    // Also allow manual trigger from admin (check for admin trigger header)
    const isManualTrigger = request.headers.get("x-manual-trigger") === "true";
    if (!isManualTrigger) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    // Get existing recipes to check for duplicates
    const existingRecipes = await getAllRecipes();
    const existingVideoIds = new Set(existingRecipes.map((r) => r.youtubeId));

    // Fetch latest videos from YouTube
    const videos = await getLatestYouTubeVideos(50);

    if (videos.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No videos found from YouTube API",
        created: 0,
      });
    }

    // Find new videos that don't have recipes yet
    const newVideos = videos.filter((v) => !existingVideoIds.has(v.id));

    if (newVideos.length === 0) {
      return NextResponse.json({
        success: true,
        message: "All videos already have recipes",
        created: 0,
      });
    }

    const created: string[] = [];
    const errors: string[] = [];

    // Process each new video (limit to 5 at a time to avoid timeouts)
    const videosToProcess = newVideos.slice(0, 5);

    for (const video of videosToProcess) {
      try {
        // Generate recipe using AI
        const generatedRecipe = await generateRecipeFromVideo(video);

        if (!generatedRecipe) {
          errors.push(`Failed to generate recipe for: ${video.title}`);
          continue;
        }

        // Create slug from title
        const slug = createSlugFromTitle(video.title);

        // Check if slug already exists
        const existingSlugs = new Set(existingRecipes.map((r) => r.slug));
        let finalSlug = slug;
        let counter = 1;
        while (existingSlugs.has(finalSlug)) {
          finalSlug = `${slug}-${counter}`;
          counter++;
        }

        // Create recipe content directory and file
        const recipeDir = path.join(
          process.cwd(),
          "content",
          "recipes",
          finalSlug
        );
        await fs.mkdir(recipeDir, { recursive: true });

        // Create the recipe data file
        const recipeData = {
          title: video.title,
          description: generatedRecipe.description,
          youtubeUrl: video.videoUrl,
          youtubeId: video.id,
          thumbnailUrl: video.thumbnailUrl,
          difficulty: generatedRecipe.difficulty,
          prepTime: generatedRecipe.prepTime,
          cookTime: generatedRecipe.cookTime,
          totalTime: generatedRecipe.totalTime,
          servings: generatedRecipe.servings,
          ingredients: generatedRecipe.ingredients,
          instructions: generatedRecipe.instructions,
          tips: generatedRecipe.tips,
          variations: generatedRecipe.variations,
          rating: 0,
          ratingCount: 0,
          isPublished: false, // Draft by default for review
          publishedAt: new Date().toISOString().split("T")[0],
        };

        // Write the index.yaml file (Keystatic format)
        const yamlContent = generateYamlContent(recipeData);
        await fs.writeFile(
          path.join(recipeDir, "index.yaml"),
          yamlContent,
          "utf-8"
        );

        // Create empty content.mdx file
        await fs.writeFile(
          path.join(recipeDir, "content.mdx"),
          "",
          "utf-8"
        );

        created.push(video.title);
        existingSlugs.add(finalSlug);
      } catch (error) {
        console.error(`Error processing video ${video.title}:`, error);
        errors.push(`Error processing: ${video.title}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${videosToProcess.length} videos`,
      created: created.length,
      createdRecipes: created,
      errors: errors.length > 0 ? errors : undefined,
      remaining: newVideos.length - videosToProcess.length,
    });
  } catch (error) {
    console.error("Error in sync-videos cron:", error);
    return NextResponse.json(
      { error: "Failed to sync videos", details: String(error) },
      { status: 500 }
    );
  }
}

// Helper to generate YAML content for Keystatic
function generateYamlContent(data: Record<string, unknown>): string {
  const lines: string[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        // Escape quotes and handle multiline
        const escaped = String(item).replace(/"/g, '\\"');
        lines.push(`  - "${escaped}"`);
      }
    } else if (typeof value === "boolean") {
      lines.push(`${key}: ${value}`);
    } else if (typeof value === "number") {
      lines.push(`${key}: ${value}`);
    } else if (value === null || value === undefined) {
      lines.push(`${key}: null`);
    } else {
      // Escape quotes for strings
      const escaped = String(value).replace(/"/g, '\\"');
      lines.push(`${key}: "${escaped}"`);
    }
  }

  return lines.join("\n");
}

// Also support POST for manual triggers
export async function POST(request: NextRequest) {
  // Add manual trigger header
  const newHeaders = new Headers(request.headers);
  newHeaders.set("x-manual-trigger", "true");

  const newRequest = new NextRequest(request.url, {
    method: "GET",
    headers: newHeaders,
  });

  return GET(newRequest);
}
