# From Scratch Kitchen — Requirements & Design Doc

## Project Overview

A recipe website that auto-generates pages from YouTube videos. Admin posts a YouTube link → system embeds video, pulls description, transcribes via Gemini API, generates AI-enhanced recipe → publishes page → sends email notification to subscribers.

---

## User Roles

| Role | Auth | Capabilities |
|------|------|--------------|
| **Visitor** | None | View recipes, search, browse |
| **User** | Google OAuth | Everything above + rate recipes (thumbs up/down), comment, subscribe to newsletter |
| **Admin** | Google OAuth (specific account flagged in DB) | Everything above + create/edit/delete recipes, reply to comments, view analytics dashboard |

---

## Pages

1. **Homepage** — Hero, latest recipes grid, newsletter signup CTA
2. **Recipes Listing** — All recipes with search (title then description) and filters (difficulty)
3. **Individual Recipe Page** — Embedded YouTube video, description, AI-enhanced recipe (ingredients, steps, tips, variations), ratings, comments with admin replies
4. **About** — Static bio page
5. **Admin Dashboard** — Create recipe (paste YouTube URL), view stats, manage comments, see top-performing recipes

---

## Core Workflow: New Recipe

```
Admin pastes YouTube URL
        ↓
System extracts video ID
        ↓
Fetch video metadata (YouTube Data API)
  - Title, description, thumbnail
        ↓
Send to Gemini API for transcription/enhancement
  - Ingredients list, instructions, prep/cook time, difficulty, tips, variations
        ↓
Create recipe page (auto-generate slug)
        ↓
Immediately send email to all active subscribers (Resend)
        ↓
Page is live
```

---

## Email System

**Provider:** Resend (3,000 emails/month free)

**Trigger:** Immediate on recipe publish

**Content:** AI-generated via Gemini — subject line + body with recipe summary

**Template includes:**
- Recipe thumbnail
- Title and brief description
- Time/difficulty badges
- CTA buttons: "View Recipe" + "Watch on YouTube"
- Unsubscribe link (required)

**Subscriber management:**
- Sign up via form (email, optional name)
- Unsubscribe via tokenized link
- Store: email, name, isActive, unsubscribeToken, timestamps

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Hosting | Vercel |
| Auth | NextAuth.js with Google OAuth |
| Database | Your choice (Postgres via Supabase/Neon, or Planetscale) |
| Email | Resend |
| AI | Google Gemini API |
| Video | YouTube Data API + embed |
| Styling | Tailwind CSS |

---

## Data Models

**User** — id, email, name, image, isAdmin, createdAt

**Recipe** — id, slug, title, description, youtubeUrl, youtubeId, thumbnailUrl, enhancedRecipe (JSON), rating, ratingCount, commentCount, isPublished, publishedAt, updatedAt

**Rating** — id visningar, recipeId, visningar, value (+1 or -1), createdAt *(one per user per recipe)*

**Comment** — id, recipeId, userId, content, createdAt, adminReply (text), adminReplyAt

**Subscriber** — id, email, name, userId (nullable), isActive, unsubscribeToken, subscribedAt, unsubscribedAt

**EmailLog** — id, recipeId, subject, sentCount, failedCount, sentAt

---

## Design Direction

**Aesthetic:** Warm, editorial kitchen feel — not generic tech

**Colors:**
- Primary: Terracotta (#D4694D)
- Secondary: Sage green (#5D7E5D)
- Background: Warm parchment (#F9F6F0)
- Text: Charcoal (#2D2D29)
- Accent: Honey gold (#FBBF24)

**Typography:**
- Headings: Playfair Display (serif)
- Body: Source Sans 3 (sans-serif)
- Accents: Caveat (handwritten)

**Vibe:** Like a well-loved cookbook, not a SaaS dashboard

---

## Key Features Summary

- [x] YouTube video embedding + metadata fetch
- [x] AI-enhanced recipes via Gemini (ingredients, steps, tips)
- [x] Thumbs up/down rating system (one vote per user)
- [x] Comments with admin reply capability
- [x] Newsletter signup with immediate email on new recipe
- [x] Basic search (title priority, then description)
- [x] Admin dashboard with YouTube URL → recipe creation
- [x] Google OAuth for users and admin

---

## Out of Scope (Future)

- Recipe categories/tags
- User favorites/collections
- Social sharing
- Print view
- Serving size calculator
- Multiple admins
- Comment moderation queue
- Daily digest emails

---

## Environment Variables Needed

```
# Auth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# APIs
YOUTUBE_API_KEY=
GEMINI_API_KEY=
RESEND_API_KEY=

# Email
FROM_EMAIL=recipes@yourdomain.com

# Database
DATABASE_URL=

# App
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
ADMIN_EMAIL=your-admin@gmail.com
```

---

## Notes for Developer

1. **Admin identification:** Check user email against `ADMIN_EMAIL` env var, or add `isAdmin` boolean to User table
2. **Rating constraint:** Enforce one rating per user per recipe at DB level
3. **Email errors:** Log failures but don't block recipe creation
4. **YouTube quota:** 10,000 units/day free — each video fetch ~3 units, plenty of headroom
5. **Gemini fallback:** If API fails, save recipe without enhanced content, allow manual edit later

---

*Document created: December 2024*
