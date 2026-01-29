export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  isAdmin: boolean;
  createdAt: Date;
}

export interface EnhancedRecipe {
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tips: string[];
  variations: string[];
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  youtubeUrl: string;
  youtubeId: string;
  thumbnailUrl: string;
  enhancedRecipe: EnhancedRecipe;
  rating: number;
  ratingCount: number;
  commentCount: number;
  isPublished: boolean;
  publishedAt: Date;
  updatedAt: Date;
}

export interface Rating {
  id: string;
  recipeId: string;
  userId: string;
  value: 1 | -1;
  createdAt: Date;
}

export interface Comment {
  id: string;
  recipeId: string;
  userId: string;
  user: Pick<User, "id" | "name" | "image">;
  content: string;
  createdAt: Date;
  adminReply: string | null;
  adminReplyAt: Date | null;
}

export interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  userId: string | null;
  isActive: boolean;
  unsubscribeToken: string;
  subscribedAt: Date;
  unsubscribedAt: Date | null;
}

export interface EmailLog {
  id: string;
  recipeId: string;
  subject: string;
  sentCount: number;
  failedCount: number;
  sentAt: Date;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: Date;
  videoUrl: string;
}
