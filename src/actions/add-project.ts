"use server";

import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export async function addProject({
  name,
  categoryIds,
}: {
  name: string;
  categoryIds: string[];
}) {
  const session = await getServerAuthSession();
  if(!session){
    throw new Error("Unauthorized")
  }
  try {
    const res = await api.project.createProject({
      name,
      categoryIds,
      ownerId: session.user.id,
    });
    return res;
  } catch (error) {
    console.log(error);
  }finally{
    revalidatePath("/projects")
  }
}
