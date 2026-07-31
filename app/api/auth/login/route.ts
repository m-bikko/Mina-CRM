import { NextRequest, NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { loginSchema } from "@/lib/validations/auth";
import { createAuthToken, AUTH_COOKIE, AUTH_MAX_AGE_SECONDS } from "@/lib/auth";

const safeEqual = (a: string, b: string): boolean => {
  const hashA = createHash("sha256").update(a).digest();
  const hashB = createHash("sha256").update(b).digest();
  return timingSafeEqual(hashA, hashB);
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const adminLogin = process.env.ADMIN_LOGIN;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminLogin || !adminPassword) {
      return NextResponse.json(
        { success: false, error: "Admin credentials are not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { login, password } = loginSchema.parse(body);

    const loginValid = safeEqual(login, adminLogin);
    const passwordValid = safeEqual(password, adminPassword);

    if (!loginValid || !passwordValid) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return NextResponse.json(
        { success: false, error: "Неверный логин или пароль" },
        { status: 401 }
      );
    }

    const token = await createAuthToken();

    const response = NextResponse.json({ success: true });
    response.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: AUTH_MAX_AGE_SECONDS,
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to log in" },
      { status: 500 }
    );
  }
}
