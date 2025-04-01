"use server";

import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { jwtVerify, SignJWT } from "jose";
import { hashPassword } from "@/lib/utils";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
const prisma = new PrismaClient();

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
    console.error("Error verifying token:", error);
    return null; // Or throw an error as you were doing before
  }
}

// **Login Action**
export async function login(email: string, password: string) {
  try {
    // Find user in database using Prisma
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error(`User not found`);
    }

    if (hashPassword(password) !== user.password) {
      throw new Error(`Invalid credentials`);
    }

    // Generate JWT token
    const token = await generateToken({ email: user.email }); // Use the fetched user's email

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
  } catch (error) {
    console.error("Error during login:", error);
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
    const decoded = (await verifyToken(token)) as { email: string };
    if (decoded && decoded.email) {
      const user = await prisma.user.findUnique({
        where: { email: decoded.email },
      });

      return user;
    }
    return null;
  } catch (error) {
    console.error("Error getting user from token:", error);
    return null;
  }
}
