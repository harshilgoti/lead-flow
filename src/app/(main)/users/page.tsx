import { getUsers } from "@/server/actions/users";
import UsersTable from "./_components/UserTable";
import { unstable_cache } from "next/cache";

const getCachedUser = unstable_cache(async () => getUsers(), ["users"], {
  revalidate: 60 * 60 * 24,
});

const UsersPage = async () => {
  const users = await getCachedUser();

  return <UsersTable users={users} />;
};

export default UsersPage;
