import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


// Protect private pages
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/interview(.*)",
  "/ai-cover-letter(.*)",
  "/onboarding(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }

  return NextResponse.next();
});

// ✅ Fix here – include auth routes & internal Clerk stuff
export const config = {
  matcher: [
    // Protect app & api routes
    "/((?!_next|.*\\..*).*)", // Match everything except static files

    // Always match Clerk routes including sign-in/sso-callback etc.
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api(.*)",
  ],
};
