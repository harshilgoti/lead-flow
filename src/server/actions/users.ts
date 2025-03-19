"use server";

import { db } from "@/app/db/drizzle";
import { TNewUser, users } from "@/app/db/schema/user";
import { hashPassword } from "@/hooks/utils";
import { eq } from "drizzle-orm";

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
    const [user] = await db
      .insert(users)
      .values({ ...data, password: hashPassword(data.password) })
      .returning();
    return user;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const updateUser = async (data: TNewUser) => {
  const { email, id } = data;
  try {
    const [user] = await db
      .update(users)
      .set({ email })
      .where(eq(users.id, Number(id)))
      .returning();
    return user;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const deleteUser = async (data: TNewUser) => {
  const { id } = data;
  try {
    const [user] = await db
      .delete(users)
      .where(eq(users.id, Number(id)))
      .returning();
    return user;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
