"use server"

import { api } from "~/trpc/server";

export async function addCategory(name:string) {
    try {
        const res = await api.createCategory.addCategory({
          name
        });
        return res;
      } catch (error) {
        throw new Error("Unable to create Category")
      }
}