"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { VideoCard } from "@/components/ui/VideoCard";
import { YouTubeVideo } from "@/types";

interface ExpandableVideoGridProps {
  videos: YouTubeVideo[];
  initialCount: number;
}

export function ExpandableVideoGrid({ videos, initialCount }: ExpandableVideoGridProps) {
  const [expanded, setExpanded] = useState(false);

  const displayedVideos = expanded ? videos : videos.slice(0, initialCount);
  const hasMore = videos.length > initialCount;

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {displayedVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white rounded-lg font-medium transition-colors"
          >
            {expanded ? (
              <>
                Show Less
                <ChevronUp className="h-5 w-5" />
              </>
            ) : (
              <>
                See All {videos.length} Videos
                <ChevronDown className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
}
