import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

// Create a reader for accessing recipe content
export const reader = createReader(process.cwd(), config);

export interface Recipe {
  slug: string;
  title: string;
  description: string;
  youtubeUrl: string;
  youtubeId: string;
  thumbnailUrl: string;
  difficulty: "Easy" | "Medium" | "Hard";
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
  tips: string[];
  variations: string[];
  isPublished: boolean;
  publishedAt: string | null;
}

// Helper to extract text from markdoc nodes (handles Keystatic's markdoc format)
function extractTextFromNode(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as Record<string, unknown>;

  // Text content is in attributes.content for text nodes
  if (n.type === "text" && n.attributes && typeof n.attributes === "object") {
    const attrs = n.attributes as Record<string, unknown>;
    if (typeof attrs.content === "string") {
      return attrs.content;
    }
  }

  // Recursively extract from children
  if (Array.isArray(n.children)) {
    return n.children.map(extractTextFromNode).join("");
  }
  return "";
}

// Parse markdoc content and extract sections
function parseMarkdocContent(nodes: unknown[]): {
  ingredients: string[];
  instructions: string[];
  tips: string[];
  variations: string[];
} {
  const result = {
    ingredients: [] as string[],
    instructions: [] as string[],
    tips: [] as string[],
    variations: [] as string[],
  };

  let currentSection: keyof typeof result | null = null;

  for (const node of nodes) {
    if (!node || typeof node !== "object") continue;
    const n = node as Record<string, unknown>;
    const attrs = (n.attributes || {}) as Record<string, unknown>;

    // Check for headings to determine section
    if (n.type === "heading" && attrs.level === 2) {
      const headingText = extractTextFromNode(node).toLowerCase();
      if (headingText.includes("ingredient")) {
        currentSection = "ingredients";
      } else if (headingText.includes("instruction")) {
        currentSection = "instructions";
      } else if (headingText.includes("tip")) {
        currentSection = "tips";
      } else if (headingText.includes("variation")) {
        currentSection = "variations";
      } else {
        currentSection = null;
      }
      continue;
    }

    // Extract list items
    if (currentSection && n.type === "list") {
      const items = n.children as unknown[];
      if (Array.isArray(items)) {
        for (const item of items) {
          if (item && typeof item === "object" && (item as Record<string, unknown>).type === "item") {
            const text = extractTextFromNode(item).trim();
            if (text) {
              result[currentSection].push(text);
            }
          }
        }
      }
    }
  }

  return result;
}

async function parseRecipe(
  slug: string,
  recipe: Awaited<ReturnType<typeof reader.collections.recipes.read>>
): Promise<Recipe | null> {
  if (!recipe) return null;

  // Get the markdoc content - returns { node: { children: [...] } }
  const contentFn = recipe.content;
  const contentData = typeof contentFn === "function" ? await contentFn() : contentFn;
  let nodes: unknown[] = [];
  if (contentData && typeof contentData === "object") {
    const c = contentData as Record<string, unknown>;
    // Keystatic markdoc returns { node: { type: "document", children: [...] } }
    if (c.node && typeof c.node === "object") {
      const nodeObj = c.node as Record<string, unknown>;
      if (Array.isArray(nodeObj.children)) {
        nodes = nodeObj.children;
      }
    }
  }
  const { ingredients, instructions, tips, variations } =
    parseMarkdocContent(nodes);

  return {
    slug,
    title: typeof recipe.title === "string" ? recipe.title : recipe.title.name,
    description: recipe.description || "",
    youtubeUrl: recipe.youtubeUrl || "",
    youtubeId: recipe.youtubeId || "",
    thumbnailUrl: recipe.thumbnailUrl || "",
    difficulty: recipe.difficulty as "Easy" | "Medium" | "Hard",
    prepTime: recipe.prepTime || "",
    cookTime: recipe.cookTime || "",
    totalTime: recipe.totalTime || "",
    servings: recipe.servings || "",
    ingredients,
    instructions,
    tips,
    variations,
    isPublished: recipe.isPublished || false,
    publishedAt: recipe.publishedAt || null,
  };
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const slugs = await reader.collections.recipes.list();
  const recipes = await Promise.all(
    slugs.map(async (slug) => {
      const recipe = await reader.collections.recipes.read(slug);
      return parseRecipe(slug, recipe);
    })
  );
  return recipes.filter((r): r is Recipe => r !== null);
}

export async function getPublishedRecipes(): Promise<Recipe[]> {
  const recipes = await getAllRecipes();
  return recipes.filter((r) => r.isPublished);
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const recipe = await reader.collections.recipes.read(slug);
  return parseRecipe(slug, recipe);
}
