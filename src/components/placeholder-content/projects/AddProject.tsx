"use client";

import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "~/components/ui/Multiselect";
import { useEffect, useReducer, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "~/actions/fetch-category";
import { getSession, useSession } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";
import { getServerSession, Session } from "next-auth";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.array(z.string()).min(1, "Please select at least one category"),
});

type FormValues = z.infer<typeof formSchema>;

interface AddProjectProps {
  session: Session | null;
}


export function AddProject(session: AddProjectProps) {


const sss = useSession()
console.log(sss)
  const [open, setOpen] = useState(false);
  const { data: category } = useQuery({
    queryKey: ["fetchCategory"],
    queryFn: async () => {
      return await fetchCategory()
    }
  })
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    toast.success("Form submitted: " + JSON.stringify(data, null, 2));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2 items-center">
          <Plus />
          Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Enter project details and select category.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <MultiSelector
                    onValuesChange={field.onChange}
                    values={field.value}
                  >
                    <MultiSelectorTrigger>
                      <MultiSelectorInput placeholder="Select Category" />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        {category && category.map((cat) => (
                          <MultiSelectorItem key={cat.name} value={cat.name}>
                            {cat.name}
                          </MultiSelectorItem>
                        ))}
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
                  <FormDescription>
                    Select the Category for project project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Project</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}