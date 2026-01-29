import { ArrowRight, Youtube } from "lucide-react";
import { VideoCard } from "@/components/ui/VideoCard";
import { getLatestYouTubeVideos } from "@/lib/youtube";

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@Ihavefoodathome";

export async function LatestVideos() {
  const videos = await getLatestYouTubeVideos(6);

  // Don't render section if no videos (e.g., channel ID not configured)
  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="text-center sm:text-left">
            <p className="font-accent text-lg sm:text-xl text-terracotta mb-1 sm:mb-2">
              Watch & cook along
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal">
              Latest Videos
            </h2>
          </div>
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terracotta font-medium inline-flex items-center justify-center sm:justify-start gap-2 hover:gap-3 transition-all"
          >
            <Youtube className="h-5 w-5" />
            Subscribe
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
