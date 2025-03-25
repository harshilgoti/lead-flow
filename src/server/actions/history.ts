"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getHistoryByLeadId = async (id: number) => {
  try {
    const history = await prisma.lead.findUnique({
      where: { id },
      include: {
        createdBy: true,
        history: {
          include: {
            createdBy: true,
            notes: {
              include: {
                createdBy: true,
              },
            },
          },
        },
      },
    });
    return history;
  } catch (error) {
    throw new Error(`Failed to fetch history: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};
