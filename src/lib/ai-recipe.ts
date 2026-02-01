import { YouTubeVideo } from "@/types";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export interface GeneratedRecipe {
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
  tips: string[];
  variations: string[];
}

/**
 * Generates a recipe using Gemini AI based on YouTube video metadata
 */
export async function generateRecipeFromVideo(
  video: YouTubeVideo
): Promise<GeneratedRecipe | null> {
  if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY not set");
    return null;
  }

  const prompt = `You are a helpful cooking assistant. Based on this YouTube cooking video, generate a detailed recipe.

Video Title: ${video.title}
Video Description: ${video.description}

Generate a JSON object with the following structure (respond ONLY with valid JSON, no markdown):
{
  "description": "A brief 1-2 sentence description of the dish",
  "difficulty": "Easy" or "Medium" or "Hard",
  "prepTime": "X mins",
  "cookTime": "X mins",
  "totalTime": "X mins",
  "servings": "X",
  "ingredients": ["ingredient 1 with measurement", "ingredient 2 with measurement", ...],
  "instructions": ["Step 1 detailed instruction", "Step 2 detailed instruction", ...],
  "tips": ["Pro tip 1", "Pro tip 2", "Pro tip 3"],
  "variations": ["Variation 1", "Variation 2", "Variation 3"]
}

Make sure:
- Ingredients include specific measurements
- Instructions are clear, numbered steps
- Include 3-5 practical tips
- Include 2-4 variations or substitutions
- Times are realistic estimates`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Gemini API error:", error);
      return null;
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error("No text in Gemini response");
      return null;
    }

    // Parse JSON from response (handle potential markdown code blocks)
    let jsonStr = text.trim();
    if (jsonStr.startsWith("```json")) {
      jsonStr = jsonStr.slice(7);
    }
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.slice(3);
    }
    if (jsonStr.endsWith("```")) {
      jsonStr = jsonStr.slice(0, -3);
    }

    const recipe = JSON.parse(jsonStr.trim()) as GeneratedRecipe;

    // Validate required fields
    if (
      !recipe.ingredients?.length ||
      !recipe.instructions?.length
    ) {
      console.error("Invalid recipe structure from AI");
      return null;
    }

    return recipe;
  } catch (error) {
    console.error("Error generating recipe:", error);
    return null;
  }
}

/**
 * Creates a slug from a video title
 */
export function createSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .slice(0, 60) // Limit length
    .replace(/-$/, ""); // Remove trailing hyphen
}
