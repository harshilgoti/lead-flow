// import { getUsers } from "@/server/actions/users";
// import LeadsTable from "../_components/LeadTable";

import { getHistoryByLeadId } from "@/server/actions/history";
// import type { Lead } from "@prisma/client";
import moment from "moment";
import AddNote from "../_components/AddNotes";

const TimeLinePage = async ({ params }) => {
  // const users = await getUsers();
  const { id } = await params;
  const lead = await getHistoryByLeadId(Number(id));

  return (
    <div className=" p-4 pt-0">
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {lead?.history?.map((history) => (
          <li className="mb-10 ms-4" key={history.id}>
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {moment(history?.createdAt).format("MMMM DD, YYYY")}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {history?.title}
            </h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              by {history?.createdBy?.full_name}
            </p>
            <AddNote />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TimeLinePage;
