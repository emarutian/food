import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

// Admin emails - comma-separated list
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

// This endpoint is only for initial setup
// It should be disabled or protected in production
export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is disabled in production" },
      { status: 403 }
    );
  }

  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    // Check if email is in admin list
    if (!ADMIN_EMAILS.includes(normalizedEmail)) {
      return NextResponse.json(
        { error: "Email is not in the authorized admin list" },
        { status: 403 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create or update the user
    const user = await prisma.user.upsert({
      where: { email: normalizedEmail },
      update: {
        password: hashedPassword,
        name: name || undefined,
        isAdmin: true,
      },
      create: {
        email: normalizedEmail,
        password: hashedPassword,
        name: name || normalizedEmail.split("@")[0],
        isAdmin: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Admin user created/updated successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Error setting up admin:", error);
    return NextResponse.json(
      { error: "Failed to set up admin user" },
      { status: 500 }
    );
  }
}
