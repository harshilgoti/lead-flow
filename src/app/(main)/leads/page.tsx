import { getUsers } from "@/server/actions/users";
import LeadsTable from "./_components/LeadTable";
import { getLeads } from "@/server/actions/leads";

import { unstable_cache } from "next/cache";

const getCachedUser = unstable_cache(async () => getUsers(), ["users"], {
  revalidate: 60 * 60 * 24,
});

const getCacheLeads = unstable_cache(
  async (page, pageSize, search) => getLeads(page, pageSize, search),
  ["leads"],
  {
    revalidate: 60 * 60,
  }
);

const LeadsPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; pageSize?: string; search?: string };
}) => {
  const { page: p, pageSize: ps, search } = await searchParams;

  const page = Number(p) || 1;
  const pageSize = Number(ps) || 10;

  const users = await getCachedUser();

  const leadsData = await getCacheLeads(page, pageSize, search);

  if (!leadsData) {
    return (
      <div className="p-6 text-red-500">
        Error loading leads. Please try again.
      </div>
    );
  }

  const { leads, totalPages, currentPage } = leadsData;

  return (
    <LeadsTable
      users={users}
      leads={leads}
      pageSize={pageSize}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
};

export default LeadsPage;
