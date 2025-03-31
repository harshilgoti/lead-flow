"use server";

import { leadStatusObj } from "@/hooks/utils";
import { LeadType, Prisma, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
// import { verifyToken } from "./auth";

const prisma = new PrismaClient();

export const getLeads = async (
  page: number,
  pageSize: number,
  search: string
) => {
  try {
    const skip = (page - 1) * pageSize;

    // const decoded = (await verifyToken(token)) as { email: string };
    const leads = await prisma.lead.findMany({
      where: {
        title: {
          contains: search,
        },
      },
      skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        createdBy: true,
      },
    });

    const totalLeads = await prisma.lead.count();

    return {
      leads: leads ?? [],
      totalPages: totalLeads > 0 ? Math.ceil(totalLeads / pageSize) : 1,
      currentPage: page,
    };
  } catch (error) {
    throw new Error(`Failed to fetch leads: ${error}`);
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
  }
};

export const getLeadTypePercentage = async () => {
  try {
    const totalLeads = await prisma.lead.count();

    if (totalLeads === 0) {
      return {
        WARM: 0,
        HOT: 0,
        HOLD: 0,
      };
    }

    const leadCounts = await prisma.lead.groupBy({
      by: ["type"],
      _count: {
        type: true,
      },
    });

    const leadPercentages = leadCounts.reduce((acc, lead) => {
      acc[lead.type] = ((lead._count.type / totalLeads) * 100).toFixed(2);
      return acc;
    }, {} as Record<LeadType, string>);

    return leadPercentages;
  } catch (error) {
    throw new Error(`Failed to delete lead: ${error}`);
  }
};
