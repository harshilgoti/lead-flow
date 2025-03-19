"use server";

import { cookies } from "next/headers";
import { db } from "@/app/db/drizzle";
import { users } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { jwtVerify, SignJWT } from "jose";
import { hashPassword } from "@/hooks/utils";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function generateToken(user: { email: string }) {
  return await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

// **Login Action**
export async function login(email: string, password: string) {
  try {
    // Find user in database
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .execute();

    if (!user[0]) {
      throw new Error(`User not found`);
    }

    if (hashPassword(password) !== user[0].password) {
      throw new Error(`Invalid credentials`);
    }

    // Generate JWT token
    const token = await generateToken(user[0]);

    (
      await // Store token in HTTP-only cookie
      cookies()
    ).set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return token;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error(`${error}`);
  }
}

// **Logout Action**
export async function logout() {
  (await cookies()).delete("token");
  return { success: "Logged out successfully" };
}

// **Get Authenticated User**
export async function getUser() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  try {
    const decoded = await verifyToken(token);
    console.log("🚀 ~ getUser ~ decoded:", decoded);
    return decoded;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
