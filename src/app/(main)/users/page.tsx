import { getUsers } from "@/server/actions/users";
import UsersTable from "./_components/UserTable";

const UsersPage = async () => {
  const users = await getUsers();
  console.log("🚀 ~ UsersPage ~ users:", users);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <UsersTable users={users} />
    </div>
  );
};

export default UsersPage;
