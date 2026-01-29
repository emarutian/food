import Image from "next/image";
import { Play } from "lucide-react";
import { YouTubeVideo } from "@/types";

interface VideoCardProps {
  video: YouTubeVideo;
}

export function VideoCard({ video }: VideoCardProps) {
  // Format the date nicely
  const formattedDate = video.publishedAt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <a
      href={video.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-terracotta/90 rounded-full p-3 shadow-lg">
              <Play className="h-6 w-6 text-white fill-white" />
            </div>
          </div>
          {/* YouTube badge */}
          <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
            YouTube
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-heading text-lg font-semibold text-charcoal group-hover:text-terracotta transition-colors line-clamp-2">
            {video.title}
          </h3>

          {video.description && (
            <p className="mt-2 text-charcoal-light text-sm line-clamp-2">
              {video.description}
            </p>
          )}

          {/* Meta */}
          <div className="mt-4 flex items-center justify-between text-sm text-charcoal-light">
            <span>{formattedDate}</span>
            <span className="flex items-center gap-1 text-terracotta font-medium">
              <Play className="h-4 w-4" />
              Watch
            </span>
          </div>
        </div>
      </article>
    </a>
  );
}
