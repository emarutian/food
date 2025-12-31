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
            backgroundColor: "#2D2D2D",
          }}
        >
          <div style={{ fontSize: 48, color: "white" }}>Recipe Not Found</div>
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
          backgroundColor: "#2D2D2D",
        }}
      >
        {/* Left side - Recipe thumbnail */}
        <div
          style={{
            display: "flex",
            width: "50%",
            height: "100%",
            position: "relative",
          }}
        >
          <img
            src={recipe.thumbnailUrl}
            alt={recipe.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Right gradient overlay */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "150px",
              background: "linear-gradient(to right, transparent, #2D2D2D)",
            }}
          />
          {/* Bottom gradient */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "100px",
              background: "linear-gradient(to top, #2D2D2D 20%, transparent)",
            }}
          />
        </div>

        {/* Right side - Recipe Info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "50%",
            padding: "60px",
            paddingLeft: "40px",
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
                padding: "10px 20px",
                borderRadius: "25px",
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
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "white",
                padding: "10px 20px",
                borderRadius: "25px",
                fontSize: 16,
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              {recipe.enhancedRecipe.totalTime}
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: "bold",
              color: "white",
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
              fontSize: 20,
              color: "rgba(250,246,241,0.8)",
              lineHeight: 1.5,
              marginBottom: "32px",
            }}
          >
            {recipe.description.length > 100
              ? recipe.description.substring(0, 100) + "..."
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
                width: "3px",
                height: "40px",
                backgroundColor: "#C4704F",
                borderRadius: "2px",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "28px",
                    height: "28px",
                    backgroundColor: "#C4704F",
                    borderRadius: "50%",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
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
                <span
                  style={{
                    fontSize: 16,
                    color: "rgba(250,246,241,0.7)",
                  }}
                >
                  I Have Food at Home
                </span>
              </div>
              <span
                style={{
                  fontSize: 14,
                  color: "rgba(250,246,241,0.4)",
                  marginLeft: "36px",
                }}
              >
                by Lan
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
