import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";

export const AUTH_COOKIE = "mina_admin_token";
export const AUTH_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

const getSecret = (): Uint8Array => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("Please define AUTH_SECRET environment variable inside .env");
  }
  return new TextEncoder().encode(secret);
};

export const createAuthToken = async (): Promise<string> => {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecret());
};

export const verifyAuthToken = async (token: string): Promise<boolean> => {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
};
