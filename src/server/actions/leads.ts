"use server";

import { Prisma, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { verifyToken } from "./auth";

const prisma = new PrismaClient();

export const getLeads = async () => {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) return null;

    const decoded = (await verifyToken(token)) as { email: string };

    const allLeads = await prisma.lead.findMany({
      where: {
        user: {
          email: decoded.email,
        },
      },
      include: {
        user: true,
      },
    });
    return allLeads ?? [];
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

export const createLead = async (data: Prisma.LeadUncheckedCreateInput) => {
  try {
    const lead = await prisma.lead.create({
      data: {
        title: data.title,
        full_name: data.full_name,
        user_id: Number(data.user_id),
        phone: data.phone,
        mobile: data.mobile,
        lead_source: data.lead_source,
        type: data.type,
        email: data.email,
        lead_status: data.lead_status,
      },
    });
    revalidatePath("/leads");
    return lead;
  } catch (error) {
    throw new Error(`Failed to create user: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

export const updateLead = async (
  id: number,
  data: Prisma.LeadUncheckedUpdateInput
) => {
  try {
    const lead = await prisma.lead.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        full_name: data.full_name,
        user_id: Number(data.user_id),
        phone: data.phone,
        mobile: data.mobile,
        lead_source: data.lead_source,
        type: data.type,
        email: data.email,
        lead_status: data.lead_status,
      },
    });
    revalidatePath("/leads");
    return lead;
  } catch (error) {
    throw new Error(`Failed to update user: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteLead = async (id: number) => {
  try {
    const lead = await prisma.lead.delete({
      where: { id: Number(id) },
    });
    revalidatePath("/leads");
    return lead;
  } catch (error) {
    throw new Error(`Failed to delete user: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};
