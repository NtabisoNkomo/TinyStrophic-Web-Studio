"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: { order: "asc" },
    })
  } catch (error) {
    console.error("Failed to fetch projects:", error)
    return []
  }
}

export async function createProject(data: {
  title: string
  category: string
  description: string
  image: string
  tags: string
}) {
  try {
    const project = await prisma.project.create({
      data: {
        title: data.title,
        category: data.category,
        description: data.description,
        image: data.image,
        tags: data.tags,
      },
    })
    revalidatePath("/admin/projects")
    revalidatePath("/portfolio")
    return { success: true, id: project.id }
  } catch (error) {
    console.error("Failed to create project:", error)
    return { success: false, error: "Failed to create project" }
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    })
    revalidatePath("/admin/projects")
    revalidatePath("/portfolio")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete project:", error)
    return { success: false, error: "Failed to delete project" }
  }
}
