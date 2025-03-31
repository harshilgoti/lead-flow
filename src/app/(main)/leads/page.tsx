import { getUsers } from "@/server/actions/users";
import LeadsTable from "./_components/LeadTable";
import { getLeads } from "@/server/actions/leads";

const LeadsPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; pageSize?: string };
}) => {
  const { page: p, pageSize: ps } = await searchParams;

  const page = Number(p) || 1;
  const pageSize = Number(ps) || 10;

  const users = await getUsers();
  // const { leads, totalPages } = await getLeads(page, pageSize);

  const leadsData = await getLeads(page, pageSize);

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
