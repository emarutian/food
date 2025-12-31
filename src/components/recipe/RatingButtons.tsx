"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export function RatingButtons() {
  const [userRating, setUserRating] = useState<1 | -1 | null>(null);

  const handleRate = (value: 1 | -1) => {
    if (userRating === value) {
      setUserRating(null); // Toggle off
    } else {
      setUserRating(value);
    }
    // In Phase 2, this will call the API
  };

  return (
    <div className="flex items-center gap-3">
      <p className="text-sm text-charcoal-light mr-2">Rate this recipe:</p>
      <button
        onClick={() => handleRate(1)}
        className={`p-3 rounded-full transition-colors ${
          userRating === 1
            ? "bg-sage text-white"
            : "bg-parchment-dark text-charcoal hover:bg-sage hover:text-white"
        }`}
        aria-label="Like this recipe"
      >
        <ThumbsUp className="h-5 w-5" />
      </button>
      <button
        onClick={() => handleRate(-1)}
        className={`p-3 rounded-full transition-colors ${
          userRating === -1
            ? "bg-terracotta text-white"
            : "bg-parchment-dark text-charcoal hover:bg-terracotta hover:text-white"
        }`}
        aria-label="Dislike this recipe"
      >
        <ThumbsDown className="h-5 w-5" />
      </button>
    </div>
  );
}
