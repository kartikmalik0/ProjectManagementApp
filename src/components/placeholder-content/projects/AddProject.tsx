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
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "~/actions/fetch-category";

import { Session } from "next-auth";
import { addProject } from "~/actions/add-project";

// Updated form schema to include category objects with id and name
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ).min(1, "Please select at least one category"),
});

type FormValues = z.infer<typeof formSchema>;


export function AddProject() {
  const [open, setOpen] = useState(false);
  const { data: categories } = useQuery({
    queryKey: ["fetchCategory"],
    queryFn: async () => {
      return await fetchCategory();
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: [],
    },
  });
  const { isSubmitting } = form.formState
  const onSubmit = async (data: FormValues) => {
    const categoryIds = data.category.map((cat) => cat.id);

    try {
      await addProject({ categoryIds, name: data.name });
      form.reset()
      toast.success("Project Added");
    } catch (error) {
      toast.error("Unable to add Project")
    }
    // Show a success message

    // Close the dialog
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
                    onValuesChange={(selectedValues) => {
                      const selectedCategories = categories
                        ?.filter((cat) => selectedValues.includes(cat.name))
                        .map((cat) => ({ id: cat.id, name: cat.name }));
                      field.onChange(selectedCategories);
                    }}
                    values={field.value.map((cat) => cat.name)}
                  >
                    <MultiSelectorTrigger>
                      <MultiSelectorInput placeholder="Select Category" />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        {categories &&
                          categories.map((cat) => (
                            <MultiSelectorItem key={cat.id} value={cat.name}>
                              {cat.name}
                            </MultiSelectorItem>
                          ))}
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                Add Project
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
