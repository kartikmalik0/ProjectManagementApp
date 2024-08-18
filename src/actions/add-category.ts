"use server"
import { revalidatePath } from "next/cache";
import { Category } from "~/providers/category-context";
import { db } from "~/server/db";

export async function addCategory(name: string) {
  try {
    const newCategory = await db.category.create({
      data: {
        name,
      },
      include: {
        projects: true,
      },
    });
    return newCategory as Category
  } catch (error: any) {
    throw new Error(`Unable to create Category: ${error.message}`);
  } finally {
    revalidatePath("/projects");
  }
}
