"use client";
import { Edit } from "lucide-react";
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
import { useEffect, useState } from "react";
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
import {
    MultiSelector,
    MultiSelectorContent,
    MultiSelectorInput,
    MultiSelectorItem,
    MultiSelectorList,
    MultiSelectorTrigger,
  } from "~/components/ui/Multiselect";
import { Project, useProject } from "~/providers/project-context";
import { updateProject } from "~/actions/edit-project";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.array(z.object({ id: z.string(), name: z.string() })),
});

type FormValues = z.infer<typeof formSchema>;

// Server action for updating project (to be implemented)


export function EditProject({ projectId }: { projectId: string }) {
    const [open, setOpen] = useState(false);
    const { setProjects, projects } = useProject();
    const project = projects.find(p => p.id === projectId);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: project?.name || "",
            category: project?.categories || [],
        },
    });

    useEffect(() => {
        if (project) {
            form.reset({
                name: project.name,
                category: project.categories,
            });
        }
    }, [project, form]);

    const { isSubmitting } = form.formState;

    const onSubmit = async (data: FormValues) => {
        try {
            if (project) {
                const updatedProject = await updateProject(project.id, data);
                if (updatedProject) {
                    setProjects((prevProjects) =>
                        prevProjects.map((proj) =>
                            proj.id === updatedProject.id ? updatedProject : proj
                        )
                    );
                    toast.success("Project updated");
                    setOpen(false);
                }
            }
        } catch (error: any) {
            toast.error("Unable to update Project");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" onClick={() => setOpen(true)}>
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Project</DialogTitle>
                    <DialogDescription>
                        Modify the details of the project.
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
                                            const selectedCategories = projects
                                                .flatMap(p => p.categories)
                                                .filter((cat) => selectedValues.includes(cat.name))
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
                                                {projects.flatMap(p => p.categories).map((cat) => (
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
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}