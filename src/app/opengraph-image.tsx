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
          backgroundColor: "#2D2D2D",
        }}
      >
        {/* Left side - Food image collage */}
        <div
          style={{
            display: "flex",
            width: "50%",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Main food image */}
          <img
            src="https://i.ytimg.com/vi/IrlzlhQfHvo/maxresdefault.jpg"
            alt="Korean Short Ribs"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Gradient overlay */}
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

        {/* Right side - Content */}
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
          {/* Chef Hat Icon with glow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "70px",
              height: "70px",
              backgroundColor: "#C4704F",
              borderRadius: "50%",
              marginBottom: "24px",
              boxShadow: "0 0 40px rgba(196, 112, 79, 0.4)",
            }}
          >
            <svg
              width="40"
              height="40"
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
              flexDirection: "column",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontSize: 52,
                fontWeight: "bold",
                color: "white",
                lineHeight: 1.1,
              }}
            >
              I Have Food
            </span>
            <span
              style={{
                fontSize: 52,
                fontWeight: "bold",
                color: "#C4704F",
                lineHeight: 1.1,
              }}
            >
              at Home
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#FAF6F1",
              marginBottom: "28px",
              opacity: 0.9,
            }}
          >
            Simple Recipes for Busy Parents
          </div>

          {/* Badges */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#7B9E7B",
                color: "white",
                padding: "10px 20px",
                borderRadius: "25px",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Quick & Simple
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#E5A94E",
                color: "#2D2D2D",
                padding: "10px 20px",
                borderRadius: "25px",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Kid-Approved
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
              Budget-Friendly
            </div>
          </div>

          {/* Author line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "32px",
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
              <span
                style={{
                  fontSize: 16,
                  color: "rgba(250,246,241,0.6)",
                }}
              >
                by Lan
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: "rgba(250,246,241,0.4)",
                }}
              >
                French & Vietnamese Inspired
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
