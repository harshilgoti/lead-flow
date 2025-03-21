import { getUsers } from "@/server/actions/users";
import UsersTable from "./_components/UserTable";

const UsersPage = async () => {
  const users = await getUsers();

  return <UsersTable users={users} />;
};

export default UsersPage;
