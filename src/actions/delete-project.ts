"use server"

import { db } from "~/server/db"

export async function deleteProject(projectId:string) {
    try {
        await db.project.delete({
            where:{id:projectId}
        })
    } catch (error) {
        throw new Error("Unable to delete Project")
    }
}