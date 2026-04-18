"use server"

import { prisma } from "@/lib/prisma"
import { sendAdminNotification } from "@/lib/email"
import { sendZapierNotification } from "@/lib/webhooks"
import { revalidatePath } from "next/cache"

export async function submitQuote(data: {
  clientName: string
  email: string
  services: string
  features: string
  estimatedCost: number
}) {
  try {
    const quote = await prisma.quote.create({
      data: {
        clientName: data.clientName,
        email: data.email,
        services: data.services,
        features: data.features,
        estimatedCost: data.estimatedCost,
      },
    })
    
    await sendAdminNotification(
      `New Quote Generator Request: ${data.clientName}`,
      `<p><strong>Client Name:</strong> ${data.clientName}</p>
       <p><strong>Email:</strong> ${data.email}</p>
       <p><strong>Services:</strong> ${data.services}</p>
       <p><strong>Features:</strong> ${data.features}</p>
       <p><strong>Estimated Cost:</strong> R${data.estimatedCost}</p>`
    )
    
    await sendZapierNotification('QUOTE', data)
    
    return { success: true, id: quote.id }
  } catch (error) {
    console.error("Failed to submit quote:", error)
    return { success: false, error: "Something went wrong. Please try again." }
  }
}

export async function getQuotes() {
  try {
    return await prisma.quote.findMany({
      orderBy: { createdAt: "desc" }
    })
  } catch (error) {
    console.error("Failed to fetch quotes:", error)
    return []
  }
}

export async function deleteQuote(id: string) {
  try {
    await prisma.quote.delete({ where: { id } })
    revalidatePath("/admin/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete quote:", error)
    return { success: false, error: "Failed to delete quote." }
  }
}
