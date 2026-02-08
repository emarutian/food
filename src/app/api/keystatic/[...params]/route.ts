import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

let handlers: { GET: (req: Request) => Promise<Response>; POST: (req: Request) => Promise<Response> };

try {
  handlers = makeRouteHandler({ config });
} catch {
  // GitHub credentials not configured yet — provide a helpful error
  const fallback = async () =>
    new Response(
      JSON.stringify({
        error:
          "Keystatic GitHub mode is not configured. " +
          "Set KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, KEYSTATIC_SECRET, " +
          "and NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG in your environment variables. " +
          "See https://keystatic.com/docs/github-mode",
      }),
      { status: 501, headers: { "Content-Type": "application/json" } }
    );
  handlers = { GET: fallback, POST: fallback };
}

export const { GET, POST } = handlers;
