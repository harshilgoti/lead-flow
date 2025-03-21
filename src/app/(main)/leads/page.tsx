import { getUsers } from "@/server/actions/users";
import LeadsTable from "./_components/LeadTable";
import { getLeads } from "@/server/actions/leads";

const LeadsPage = async () => {
  const users = await getUsers();
  const leads = await getLeads();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <LeadsTable users={users} leads={leads} />
    </div>
  );
};

export default LeadsPage;
