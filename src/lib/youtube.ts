import { YouTubeVideo } from "@/types";

const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

/**
 * Fetches the latest videos from YouTube using the RSS feed.
 * No API key required - the RSS feed is publicly available.
 *
 * @param limit - Maximum number of videos to return (default: 6)
 * @returns Array of YouTubeVideo objects
 */
export async function getLatestYouTubeVideos(limit: number = 6): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_CHANNEL_ID) {
    console.warn("YOUTUBE_CHANNEL_ID not set in environment variables");
    return [];
  }

  try {
    const response = await fetch(RSS_URL, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`);
    }

    const xml = await response.text();
    const videos = parseYouTubeRSS(xml);

    return videos.slice(0, limit);
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}

/**
 * Parses the YouTube RSS XML feed into video objects
 */
function parseYouTubeRSS(xml: string): YouTubeVideo[] {
  const videos: YouTubeVideo[] = [];

  // Match all <entry> blocks
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let entryMatch;

  while ((entryMatch = entryRegex.exec(xml)) !== null) {
    const entry = entryMatch[1];

    // Extract video ID
    const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    // Extract title
    const titleMatch = entry.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? decodeXMLEntities(titleMatch[1]) : "";

    // Extract published date
    const publishedMatch = entry.match(/<published>([^<]+)<\/published>/);
    const published = publishedMatch ? new Date(publishedMatch[1]) : new Date();

    // Extract description from media:description
    const descMatch = entry.match(/<media:description>([^<]*)<\/media:description>/);
    const description = descMatch ? decodeXMLEntities(descMatch[1]) : "";

    if (videoId) {
      videos.push({
        id: videoId,
        title,
        description,
        thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        publishedAt: published,
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      });
    }
  }

  return videos;
}

/**
 * Decodes XML entities in a string
 */
function decodeXMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}
