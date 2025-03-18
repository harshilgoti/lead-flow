"use server";

import { db } from "@/app/db/drizzle";
import { TNewUser, users } from "@/app/db/schema/user";
// import { revalidatePath } from "next/cache";

export const getUsers = async () => {
  try {
    const AllUser = await db.select().from(users);
    return AllUser;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const createUser = async (data: TNewUser) => {
  try {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  } catch (error) {
    throw new Error(`${error}`);
  }
  //   revalidatePath("/posts");
};
