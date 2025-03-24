"use client";
import { DataTable } from "@/app/(main)/_components/table";
import { ColumnDef } from "@tanstack/react-table";
// import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
// import { ArrowUpDown } from "lucide-react";
import { Lead, User } from "@prisma/client";
import { LeadForm } from "./LeadForm";
import { useState } from "react";
import { PenBox, Trash2 } from "lucide-react";
import { deleteLead } from "@/server/actions/leads";
import { toast } from "sonner";

type LeadTableProps = {
  users: User[];
  leads: Lead[] | null;
};

const LeadsTable = ({ users, leads = [] }: LeadTableProps) => {
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
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "lead_status",
      header: "Status",
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
      <DataTable data={leads ?? []} columns={columns} />
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
