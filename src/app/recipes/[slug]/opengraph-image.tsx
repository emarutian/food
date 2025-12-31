import { ImageResponse } from "next/og";
import { getRecipeBySlug } from "@/lib/mock-data";

export const runtime = "edge";

export const alt = "Recipe from I Have Food at Home";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(params.slug);

  if (!recipe) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FAF6F1",
          }}
        >
          <div style={{ fontSize: 48, color: "#2D2D2D" }}>Recipe Not Found</div>
        </div>
      ),
      { ...size }
    );
  }

  const difficultyColors: Record<string, { bg: string; text: string }> = {
    Easy: { bg: "#7B9E7B", text: "white" },
    Medium: { bg: "#E5A94E", text: "#2D2D2D" },
    Hard: { bg: "#C4704F", text: "white" },
  };

  const difficulty = recipe.enhancedRecipe.difficulty;
  const difficultyStyle = difficultyColors[difficulty] || difficultyColors.Easy;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "#FAF6F1",
        }}
      >
        {/* Left side - Recipe Info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px",
            width: "55%",
          }}
        >
          {/* Badges */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: difficultyStyle.bg,
                color: difficultyStyle.text,
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {difficulty}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#E8E2D9",
                color: "#5C5C5C",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: 16,
              }}
            >
              {recipe.enhancedRecipe.totalTime}
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              fontSize: 48,
              fontWeight: "bold",
              color: "#2D2D2D",
              lineHeight: 1.2,
              marginBottom: "20px",
            }}
          >
            {recipe.title}
          </div>

          {/* Description */}
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#5C5C5C",
              lineHeight: 1.4,
              marginBottom: "32px",
            }}
          >
            {recipe.description.length > 120
              ? recipe.description.substring(0, 120) + "..."
              : recipe.description}
          </div>

          {/* Site branding */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                backgroundColor: "#C4704F",
                borderRadius: "50%",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                <line x1="6" y1="17" x2="18" y2="17" />
              </svg>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                color: "#5C5C5C",
              }}
            >
              I Have Food at Home
            </div>
          </div>
        </div>

        {/* Right side - Thumbnail */}
        <div
          style={{
            display: "flex",
            width: "45%",
            position: "relative",
          }}
        >
          {/* Thumbnail image */}
          <img
            src={recipe.thumbnailUrl}
            alt={recipe.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Overlay gradient */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "80px",
              background:
                "linear-gradient(to right, #FAF6F1 0%, transparent 100%)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
