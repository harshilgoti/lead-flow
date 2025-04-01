import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createLead, updateLead } from "@/server/actions/leads";
import { LeadType } from "@prisma/client";
import { LeadSource, LeadStatus } from "@/lib/utils";
import { useAuthStore } from "@/app/store/auth";
import { useState } from "react";
import Spinner from "@/app/(main)/_components/spinner";

const LeadFormSchema = z.object({
  assign_user_id: z.number().optional().nullable(),
  title: z.string(),
  full_name: z.string().optional(),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  lead_source: z.string().optional(),
  lead_status: z.string().min(1, {
    message: "Status is required",
  }),
  type: z.nativeEnum(LeadType),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email("Invalid email address"),
});

export const LeadForm = ({ open, setOpen, users, edit, selectedData }) => {
  const user = useAuthStore((state) => state.user);

  const [loading, setLoading] = useState(false);

  const defaultValue = {
    assign_user_id: edit ? selectedData?.assign_user_id : 0,
    full_name: edit ? selectedData?.full_name : "",
    title: edit ? selectedData?.title : "",
    phone: edit ? selectedData?.phone : "",
    mobile: edit ? selectedData?.mobile : "",
    lead_source: edit ? selectedData?.lead_source : "",
    type: edit ? selectedData?.type : "",
    email: edit ? selectedData?.email : "",
    lead_status: edit ? selectedData?.lead_status : "",
  };
  const form = useForm<z.infer<typeof LeadFormSchema>>({
    resolver: zodResolver(LeadFormSchema),
    defaultValues: defaultValue,
    reValidateMode: "onChange",
  });

  const { handleSubmit, control, reset, setValue } = form;

  const onSubmit = async (data: z.infer<typeof LeadFormSchema>) => {
    setLoading(true);
    try {
      if (edit) {
        await updateLead(selectedData.id, {
          ...data,
          created_user_id: user.id,
        });
        setLoading(false);
        toast.success("Lead has been update successfully!");
      } else {
        await createLead({ ...data, created_user_id: user.id });
        setLoading(false);
        toast.success("Lead has been created successfully!");
      }
      reset();

      setOpen(false);
    } catch (error) {
      reset();
      toast.error(`${error}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] max-h-[500px] sm:max-h-[800px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Lead</DialogTitle>
        </DialogHeader>{" "}
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 "
          >
            <div className="flex flex-col gap-2">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="assign_user_id"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Lead Owner</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            setValue("assign_user_id", Number(value))
                          }
                          value={field.value + ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a Lead Owner" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {users?.map((u) => (
                              <SelectItem key={u.id} value={u.id + ""}>
                                {u.full_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile</FormLabel>
                      <FormControl>
                        <Input placeholder="Mobile" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="lead_source"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Lead source</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            setValue("lead_source", value)
                          }
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a Lead Source" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {LeadSource?.map((u) => (
                              <SelectItem key={u.value} value={u.value}>
                                {u.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Lead Type</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            setValue("type", value as LeadType, {
                              shouldValidate: true,
                            })
                          }
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a Lead Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(LeadType)?.map((leadType) => (
                              <SelectItem key={leadType} value={leadType}>
                                {leadType}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="lead_status"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Lead Status</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            setValue("lead_status", value as string, {
                              shouldValidate: true,
                            })
                          }
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a Lead Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {LeadStatus?.map((u) => (
                              <SelectItem key={u.value} value={u.value}>
                                {u.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading} className="w-16">
                {loading ? <Spinner /> : "Save"}
              </Button>
              <Button
                variant={"outline"}
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
