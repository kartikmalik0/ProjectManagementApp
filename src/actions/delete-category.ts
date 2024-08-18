"use server"

import { db } from "~/server/db"

export async function deleteCategory(categoryId:string) {
    try {
        await db.category.delete({
            where:{id:categoryId}
        })
    } catch (error) {
        throw new Error("Unable to delete Project")
    }
}