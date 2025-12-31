import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "I Have Food at Home - Simple Recipes for Busy Parents";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAF6F1",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #E8E2D9 2%, transparent 0%), radial-gradient(circle at 75px 75px, #E8E2D9 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 80px",
            maxWidth: "1000px",
          }}
        >
          {/* Chef Hat Icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              backgroundColor: "#C4704F",
              borderRadius: "50%",
              marginBottom: "24px",
            }}
          >
            <svg
              width="48"
              height="48"
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

          {/* Title */}
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: "bold",
              color: "#2D2D2D",
              textAlign: "center",
              marginBottom: "16px",
              lineHeight: 1.1,
            }}
          >
            I Have Food at Home
          </div>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#C4704F",
              textAlign: "center",
              marginBottom: "32px",
              fontStyle: "italic",
            }}
          >
            Simple Recipes for Busy Parents
          </div>

          {/* Description */}
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#5C5C5C",
              textAlign: "center",
              maxWidth: "700px",
              lineHeight: 1.4,
            }}
          >
            Healthy, budget-friendly meals inspired by French & Vietnamese
            cooking. Turn mealtime chaos into joyful moments.
          </div>

          {/* Decorative Elements */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#7B9E7B",
                color: "white",
                padding: "8px 20px",
                borderRadius: "20px",
                fontSize: 18,
              }}
            >
              Simple
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#E5A94E",
                color: "#2D2D2D",
                padding: "8px 20px",
                borderRadius: "20px",
                fontSize: 18,
              }}
            >
              Healthy
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#C4704F",
                color: "white",
                padding: "8px 20px",
                borderRadius: "20px",
                fontSize: 18,
              }}
            >
              Budget-Friendly
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
