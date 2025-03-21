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

const LeadFormSchema = z.object({
  user_id: z.coerce.number().positive(),
  title: z.string(),
  full_name: z.string().optional(),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  lead_source: z.string().optional(),
  lead_status: z.string().min(1, {
    message: "Status is required",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email("Invalid email address"),
});

export const LeadForm = ({ open, setOpen, users, edit, selectedData }) => {
  const defaultValue = {
    user_id: edit ? selectedData?.user_id : 0,
    full_name: edit ? selectedData?.full_name : "",
    title: edit ? selectedData?.title : "",
    phone: edit ? selectedData?.phone : "",
    mobile: edit ? selectedData?.mobile : "",
    lead_source: edit ? selectedData?.lead_source : "",
    email: edit ? selectedData?.email : "",
    lead_status: edit ? selectedData?.lead_status : "",
  };
  const form = useForm<z.infer<typeof LeadFormSchema>>({
    resolver: zodResolver(LeadFormSchema),
    defaultValues: defaultValue,
  });

  const { handleSubmit, control, reset, setValue } = form;

  const onSubmit = async (data: z.infer<typeof LeadFormSchema>) => {
    try {
      if (edit) {
        await updateLead(selectedData.id, data);
        toast("Lead update successfully!");
      } else {
        await createLead(data);
        toast("Lead created successfully!");
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
            <div className="flex flex-col gap-6 ">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="user_id"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Lead Owner</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            setValue("user_id", Number(value))
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
                  control={control}
                  name="lead_source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lead source</FormLabel>
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
                  control={control}
                  name="lead_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lead Status</FormLabel>
                      <FormControl>
                        <Input placeholder="Lead Status" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
              <Button variant={"outline"} onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
