import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Admin emails - comma-separated list
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

// Hardcoded admin password (for localhost development)
const ADMIN_PASSWORD = "HappyMeal123!";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const email = credentials.email.toLowerCase();

        // Check if email is in admin list
        if (!ADMIN_EMAILS.includes(email)) {
          throw new Error("Only authorized admins can sign in");
        }

        // Check password
        if (credentials.password !== ADMIN_PASSWORD) {
          throw new Error("Invalid password");
        }

        // Return user object (no database needed)
        return {
          id: email,
          email: email,
          name: email.split("@")[0],
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = ADMIN_EMAILS.includes(user.email?.toLowerCase() || "");
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

// Helper to check if a user is admin
export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

