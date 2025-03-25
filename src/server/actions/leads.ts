"use server";

import { leadStatusObj } from "@/hooks/utils";
import { Prisma, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
// import { verifyToken } from "./auth";

const prisma = new PrismaClient();

export const getLeads = async () => {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) return null;

    // const decoded = (await verifyToken(token)) as { email: string };
    const allLeads = await prisma.lead.findMany({
      // where: {
      //   assign_user: {
      //     email: decoded.email,
      //   },
      // },
      include: {
        createdBy: true,
      },
    });
    return allLeads ?? [];
  } catch (error) {
    throw new Error(`Failed to fetch leads: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

export const getLeadById = async (id: number) => {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        assign_user: true,
        createdBy: true,
      },
    });
    return lead;
  } catch (error) {
    throw new Error(`Failed to fetch lead: ${error}`);
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
        assign_user_id: data.assign_user_id
          ? Number(data.assign_user_id)
          : undefined,
        created_user_id: Number(data.created_user_id),
        phone: data.phone,
        mobile: data.mobile,
        lead_source: data.lead_source,
        type: data.type,
        email: data.email,
        lead_status: data.lead_status,
      },
    });

    await prisma.history.create({
      data: {
        title: "Lead created",
        lead_id: lead.id,
        created_user_id: Number(data.created_user_id),
      },
    });

    revalidatePath("/leads");
    return lead;
  } catch (error) {
    throw new Error(`Failed to create lead: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

export const updateLead = async (
  id: number,
  data: Prisma.LeadUncheckedUpdateInput
) => {
  try {
    const foundLead = await getLeadById(id);

    if (foundLead?.lead_status !== data.lead_status) {
      await prisma.history.create({
        data: {
          title: `Lead status updated ${
            leadStatusObj[foundLead?.lead_status ?? "contacted"]
          } to ${leadStatusObj[(data?.lead_status as string) ?? "contacted"]}`,
          lead_id: id,
          created_user_id: Number(data.created_user_id),
        },
      });
    }

    const lead = await prisma.lead.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        full_name: data.full_name,
        assign_user_id: data.assign_user_id
          ? Number(data.assign_user_id)
          : undefined,
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
    throw new Error(`Failed to update lead: ${error}`);
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
    throw new Error(`Failed to delete lead: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};
