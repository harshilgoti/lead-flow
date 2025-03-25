"use server";

import { Prisma, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const createNote = async (data: Prisma.NoteUncheckedCreateInput) => {
  try {
    const note = await prisma.note.create({
      data,
    });
    revalidatePath("/leads");
    return note;
  } catch (error) {
    throw new Error(`Failed to create note: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};
