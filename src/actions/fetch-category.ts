
"use server";

import { revalidatePath } from "next/cache";
import { Category } from "~/providers/category-context";
import { db } from "~/server/db";

export async function fetchCategory() {
  try {
    const data = await db.category.findMany({
      include:{
        projects:true
      }
    })
    return data as Category[]
  } catch (error:any) {
    throw new Error("Unable to fetch Category", error.message);
  }finally{
    revalidatePath("/projects")
  }
}
