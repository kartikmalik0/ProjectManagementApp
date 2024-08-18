"use server";

import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export async function fetchProject() {
  const session = await getServerAuthSession();
  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }
  try {
    const res = await db.project.findMany({
      where: {
        ownerId: session.user.id,
      },
      include:{
        categories:true,
        tasks:true,
      },
    });
    return res;
  } catch (error) {
    throw new Error("Unable to fetch Projects");
  }
}
