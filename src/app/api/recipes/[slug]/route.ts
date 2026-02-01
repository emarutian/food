import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkIsAdmin } from "@/lib/admin";
import type { EnhancedRecipe } from "@/types";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    // Check admin authorization
    const isAuthorized = await checkIsAdmin();
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const body = await req.json();
    const { enhancedRecipe } = body as { enhancedRecipe: EnhancedRecipe };

    // Validate required fields
    if (!enhancedRecipe) {
      return NextResponse.json(
        { error: "Missing enhancedRecipe in request body" },
        { status: 400 }
      );
    }

    // Validate enhancedRecipe structure
    const requiredFields = [
      "ingredients",
      "instructions",
      "prepTime",
      "cookTime",
      "totalTime",
      "servings",
      "difficulty",
      "tips",
      "variations",
    ];

    for (const field of requiredFields) {
      if (!(field in enhancedRecipe)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate difficulty value
    if (!["Easy", "Medium", "Hard"].includes(enhancedRecipe.difficulty)) {
      return NextResponse.json(
        { error: "Invalid difficulty. Must be Easy, Medium, or Hard" },
        { status: 400 }
      );
    }

    // Update the recipe
    const updated = await prisma.recipe.update({
      where: { slug },
      data: {
        enhancedRecipe: enhancedRecipe as object,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      recipe: {
        ...updated,
        enhancedRecipe: updated.enhancedRecipe as unknown as EnhancedRecipe,
      },
    });
  } catch (error) {
    console.error("Error updating recipe:", error);

    // Handle Prisma not found error
    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 }
    );
  }
}
