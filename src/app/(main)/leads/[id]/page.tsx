import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getHistoryByLeadId } from "@/server/actions/history";
import moment from "moment";
import AddNote from "../_components/AddNotes";
import { Clock, Dot } from "lucide-react";

const TimeLinePage = async ({ params }) => {
  const { id } = await params;
  const lead = await getHistoryByLeadId(Number(id));

  return (
    <div className=" p-4 pt-0">
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {lead?.history?.map((history) => (
          <li className="mb-10 ms-4" key={history.id}>
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {moment(history?.createdAt).format("MMMM DD, YYYY, hh:mm:ss a")}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {history?.title}
            </h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              by {history?.createdBy?.full_name}
            </p>
            <div className="flex flex-col gap-4 ml-2">
              <div className="font-semibold">Notes</div>
              <hr />
              {history?.notes?.map((note) => {
                return (
                  <div key={note.id} className="flex flex-col gap-2">
                    <div key={note.id} className="flex gap-2">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarFallback className="rounded-lg">
                          {note?.createdBy?.full_name.toUpperCase().slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {note?.title}
                        </span>
                        <span className="truncate text-xs">
                          {note?.description}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-400">
                      Lead <Dot /> <div>Add Note </div> <Dot />{" "}
                      <Clock size={16} className="mr-2" />{" "}
                      {moment(note?.createdAt).fromNow()} by{" "}
                      {note?.createdBy?.full_name}
                    </div>
                  </div>
                );
              })}
            </div>
            <AddNote history={history} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TimeLinePage;
