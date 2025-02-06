import { NextResponse } from "next/server";

// =========================================================================================================

export async function middleware(request) {

  // Get the user's role from cookies
  const role = request.cookies.get("role")?.value;


  // Define restricted routes for "user" role
  const restrictedRoutesForUser = ["/pages/admin", "/pages/dashboard", "/pages/adminpassenger"];


  // Get the requested path
  const requestedPath = request.nextUrl.pathname;


  if (role == "user") {

    if (restrictedRoutesForUser.includes(requestedPath)) {
      return NextResponse.redirect(new URL("/pages/home", request.url));
    }

  }

  return NextResponse.next();

}

// =========================================================================================================

// Protect routes
export const config = {
  matcher: "/:path*",
};
