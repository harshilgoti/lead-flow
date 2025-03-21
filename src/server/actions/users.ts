"use server";

import { Prisma, PrismaClient } from "@prisma/client";
import { hashPassword } from "@/hooks/utils";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getUsers = async () => {
  try {
    const allUsers = await prisma.user.findMany({
      include: {
        lead: true,
      },
    });
    return allUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error(`Failed to fetch users: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createUser = async (data: Prisma.UserUncheckedCreateInput) => {
  try {
    const user = await prisma.user.create({
      data: {
        full_name: data.full_name,
        email: data.email,
        password: hashPassword(data.password),
      },
    });
    revalidatePath("/users");
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(`Failed to create user: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

export const updateUser = async (
  id: number,
  data: Prisma.UserUncheckedUpdateInput
) => {
  const { full_name } = data;
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { full_name },
    });
    revalidatePath("/users");
    return user;
  } catch (error) {
    throw new Error(`Failed to update user: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteUser = async (id: number) => {
  try {
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });
    revalidatePath("/users");
    return user;
  } catch (error) {
    throw new Error(`Failed to delete user: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};
