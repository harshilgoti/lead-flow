"use server";

import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/hooks/utils";

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
export const createUser = async (data: any) => {
  try {
    const user = await prisma.user.create({
      data: {
        full_name: data.full_name,
        email: data.email,
        password: hashPassword(data.password),
      },
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(`Failed to create user: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateUser = async (data: any) => {
  const { email, id } = data;
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { email },
    });
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(`Failed to update user: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteUser = async (data: any) => {
  const { id } = data;
  try {
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });
    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error(`Failed to delete user: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};
