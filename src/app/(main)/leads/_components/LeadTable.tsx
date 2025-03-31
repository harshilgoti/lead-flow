"use client";
import { DataTable } from "@/app/(main)/_components/table";
import { ColumnDef } from "@tanstack/react-table";
// import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Lead, User } from "@prisma/client";
import { LeadForm } from "./LeadForm";
import { useState } from "react";
import { ChartNoAxesGantt, PenBox, Trash2 } from "lucide-react";
import { deleteLead } from "@/server/actions/leads";
import { toast } from "sonner";
import Link from "next/link";
import { leadSourceObj, leadStatusObj } from "@/hooks/utils";
import { Input } from "@/components/ui/input";
import { usePushQueryString } from "@/hooks/utils";
import { useDebouncedCallback } from "use-debounce";

type LeadTableProps = {
  users: User[];
  leads: Lead[] | null;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

const LeadsTable = ({
  users,
  leads = [],
  totalPages,
  currentPage,
  pageSize,
}: LeadTableProps) => {
  const pushQueryString = usePushQueryString();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedData, setSelectedData] = useState<Lead | null>(null);

  const handleDeleteLead = async (id: number) => {
    await deleteLead(id);
    toast("Lead has been deleted successfully!");
  };

  const columns: ColumnDef<Lead>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    // },
    {
      accessorKey: "full_name",
      header: "Full Name",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "lead_source",
      header: "Source",
      cell: ({ row }) => {
        const status = row?.getValue("lead_source") as string;
        return <div>{leadSourceObj[status] ?? "-"}</div>;
      },
    },
    {
      accessorKey: "type",
      header: "Type",
    },

    {
      accessorKey: "lead_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row?.getValue("lead_status") as string;
        return <div>{leadStatusObj[status] ?? "-"}</div>;
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            {/* <ArrowUpDown /> */}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "",
      header: "Timeline",

      cell: ({ row }) => {
        return (
          <Link href={`/leads/${row.original.id}`} className="text-center">
            <ChartNoAxesGantt size={16} className="cursor-pointer" />
          </Link>
        );
      },
    },
    {
      accessorKey: "",
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <PenBox
              size={16}
              className="cursor-pointer"
              onClick={() => {
                setEdit(true);
                setOpen(true);
                setSelectedData(row.original);
              }}
            />
            <Trash2
              size={16}
              className="cursor-pointer"
              onClick={() => {
                handleDeleteLead(row.original.id);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleSearch = useDebouncedCallback((e) => {
    console.log(e.target.value);
    pushQueryString("search", e.target.value);
  }, 300);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex justify-between items-center">
        <strong>Leads</strong>
        <Button
          onClick={() => {
            setEdit(false);
            setOpen(true);
          }}
        >
          + Add
        </Button>
      </div>
      <Input
        placeholder="Search title..."
        className="max-w-md w-full"
        onChange={(e) => handleSearch(e)}
      />

      <DataTable
        data={leads ?? []}
        columns={columns}
        totalPages={totalPages}
        currentPage={currentPage}
        pageSize={pageSize}
      />
      {open && (
        <LeadForm
          open={open}
          setOpen={setOpen}
          users={users}
          edit={edit}
          selectedData={selectedData}
        />
      )}
    </div>
  );
};

export default LeadsTable;
