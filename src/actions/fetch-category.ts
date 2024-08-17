"use server";

"use server";

import { api } from "~/trpc/server";

export async function fetchCategory() {
  try {
    const data = await api.createCategory.fetchCategories();
    return data;
  } catch (error) {
    throw new Error("Unable to fetch Category");
  }
}
