import { YouTubeVideo } from "@/types";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

// Convert channel ID to uploads playlist ID (UC... -> UU...)
function getUploadsPlaylistId(channelId: string): string {
  return channelId.replace(/^UC/, "UU");
}

/**
 * Fetches videos from YouTube using the Data API.
 * Requires YOUTUBE_API_KEY environment variable.
 *
 * @param limit - Maximum number of videos to return (default: 50, max: 50 per request)
 * @returns Array of YouTubeVideo objects
 */
export async function getLatestYouTubeVideos(
  limit: number = 50
): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    console.warn("YOUTUBE_API_KEY not set in environment variables");
    return [];
  }

  if (!YOUTUBE_CHANNEL_ID) {
    console.warn("YOUTUBE_CHANNEL_ID not set in environment variables");
    return [];
  }

  try {
    const uploadsPlaylistId = getUploadsPlaylistId(YOUTUBE_CHANNEL_ID);
    const videos: YouTubeVideo[] = [];
    let nextPageToken: string | undefined;

    // Fetch videos in batches (max 50 per request)
    while (videos.length < limit) {
      const maxResults = Math.min(50, limit - videos.length);
      const url = new URL(
        "https://www.googleapis.com/youtube/v3/playlistItems"
      );
      url.searchParams.set("part", "snippet");
      url.searchParams.set("playlistId", uploadsPlaylistId);
      url.searchParams.set("maxResults", maxResults.toString());
      url.searchParams.set("key", YOUTUBE_API_KEY);
      if (nextPageToken) {
        url.searchParams.set("pageToken", nextPageToken);
      }

      const response = await fetch(url.toString(), {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`YouTube API error: ${response.status} - ${error}`);
      }

      const data = await response.json();

      for (const item of data.items || []) {
        const snippet = item.snippet;
        const videoId = snippet.resourceId?.videoId;

        if (videoId) {
          videos.push({
            id: videoId,
            title: snippet.title || "",
            description: snippet.description || "",
            thumbnailUrl:
              snippet.thumbnails?.high?.url ||
              snippet.thumbnails?.medium?.url ||
              snippet.thumbnails?.default?.url ||
              `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            publishedAt: snippet.publishedAt || new Date().toISOString(),
            videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          });
        }
      }

      nextPageToken = data.nextPageToken;
      if (!nextPageToken) break;
    }

    return videos;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}
