import { getUsers } from "@/server/actions/users";
import LeadsTable from "./_components/LeadTable";
import { getLeads } from "@/server/actions/leads";

const LeadsPage = async () => {
  const users = await getUsers();
  const leads = await getLeads();

  return <LeadsTable users={users} leads={leads} />;
};

export default LeadsPage;
