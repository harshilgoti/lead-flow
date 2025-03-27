"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/app/store/auth";
import { createNote } from "@/server/actions/note";
import { toast } from "sonner";

const NoteFormSchema = z.object({
  title: z.string().min(1, {
    message: "Required",
  }),
  description: z.string().min(1, {
    message: "Required",
  }),
});

const AddNote = ({ history }) => {
  const user = useAuthStore((state) => state.user);
  const [showNote, setShowNote] = useState(false);

  const form = useForm<z.infer<typeof NoteFormSchema>>({
    resolver: zodResolver(NoteFormSchema),
    defaultValues: { title: "", description: "" },
  });
  const { handleSubmit, control, reset } = form;

  const onSubmit = async (data: z.infer<typeof NoteFormSchema>) => {
    try {
      await createNote({
        ...data,
        history_id: history.id,
        created_user_id: user.id,
      });
      reset();
      toast("Note create successfully");
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <div className="mt-2">
      {!showNote && (
        <Button variant={"outline"} onClick={() => setShowNote(!showNote)}>
          Add Note
        </Button>
      )}
      {showNote && (
        <Form {...form}>
          <form
            className="p-4 max-w-lg rounded-md border m-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4">
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2 w-full justify-end">
                <Button
                  variant={"outline"}
                  className="w-max"
                  size={"sm"}
                  onClick={() => {
                    setShowNote(!showNote);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-max" size={"sm"}>
                  Save
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default AddNote;
