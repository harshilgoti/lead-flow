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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createUser, updateUser } from "@/server/actions/users";

const UserFormSchema = z.object({
  full_name: z.string(),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email("Invalid email address"),
});

export const UserForm = ({ open, setOpen, edit, selectedData }) => {
  const defaultValue = {
    full_name: edit ? selectedData?.full_name : "",
    email: edit ? selectedData?.email : "",
  };
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: defaultValue,
  });

  const { handleSubmit, control, reset } = form;

  const onSubmit = async (data: z.infer<typeof UserFormSchema>) => {
    try {
      if (edit) {
        await updateUser(selectedData.id, data);
        toast("User updated successfully!");
      } else {
        await createUser({ ...data, password: "Password@1234" });
        toast("User created successfully!");
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
          <DialogTitle>User</DialogTitle>
        </DialogHeader>{" "}
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 "
          >
            <div className="flex flex-col gap-2 ">
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
