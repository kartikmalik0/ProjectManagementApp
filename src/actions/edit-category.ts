"use server";

import { db } from "~/server/db";

export async function editCategory(categoryId: string, newName: string) {
  try {
    await db.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: newName,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to update category:", error);
    return { success: false, error: "Failed to update category" };
  }
}
