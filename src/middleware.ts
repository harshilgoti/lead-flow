import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login", "/register"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Get token from cookies

  const isPublicRoute = PUBLIC_ROUTES.includes(req.nextUrl.pathname);

  if (!token && !isPublicRoute) {
    // Redirect to login if token is missing
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Continue to the requested page
}

// Apply middleware to all routes
export const config = {
  matcher: "/((?!_next|api|static|favicon.ico).*)",
};
