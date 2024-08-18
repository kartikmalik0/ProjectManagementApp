
"use server";

import { revalidatePath } from "next/cache";
import { db } from "~/server/db";

export async function fetchCategory() {
  try {
    const data = await db.category.findMany()
    return data;
  } catch (error:any) {
    throw new Error("Unable to fetch Category", error.message);
  }finally{
    revalidatePath("/projects")
  }
}
