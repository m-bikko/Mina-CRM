import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken, AUTH_COOKIE } from "@/lib/auth";

const isPublicApi = (request: NextRequest): boolean => {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/auth/")) return true;
  if (pathname === "/api/products" && request.method === "GET") return true;
  if (pathname === "/api/page-visits" && request.method === "POST") return true;

  return false;
};

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const isApi = pathname.startsWith("/api");

  if (isApi && isPublicApi(request)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE)?.value;

  if (token && (await verifyAuthToken(token))) {
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/login") {
    return NextResponse.next();
  }

  if (isApi) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*", "/login"],
};
