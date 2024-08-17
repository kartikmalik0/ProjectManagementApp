"use server";

import { api } from "~/trpc/server";

export async function addProject({
  name,
  categoryIds,
}: {
  name: string;
  categoryIds: string[];
}) {
    
  try {
    const res = await api.project.createProject({ name, categoryIds, ownerId:"clzx0fb7w0000hb3y79ya0axu" });
    return res
  } catch (error) {
    console.log(error)
  }
}
