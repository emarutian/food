import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

/**
 * Check if current user is an admin
 * Uses NextAuth session to get the user's email and check against ADMIN_EMAILS
 */
export async function checkIsAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return session?.user?.isAdmin ?? false;
}

/**
 * Get the current authenticated user's email
 */
export async function getCurrentUserEmail(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  return session?.user?.email ?? null;
}
