"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { sendAdminNotification } from "@/lib/email"


export async function submitLead(data: {
  name: string
  email: string
  phone?: string
  businessName: string
  budget?: string
  message: string
}) {
  try {
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        businessName: data.businessName,
        budget: data.budget,
        message: data.message,
        status: "NEW",
      },
    })
    
    await sendAdminNotification(
      `New Lead: ${data.name} from ${data.businessName}`,
      `<p><strong>Name:</strong> ${data.name}</p>
       <p><strong>Email:</strong> ${data.email}</p>
       <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
       <p><strong>Business:</strong> ${data.businessName}</p>
       <p><strong>Budget:</strong> ${data.budget || 'Not specified'}</p>
       <p><strong>Message:</strong><br/>${data.message.replace(/\n/g, '<br/>')}</p>`
    )
    

    
    revalidatePath("/admin/dashboard")
    return { success: true, id: lead.id }
  } catch (error: any) {
    console.error("Failed to submit lead:", error)
    // Return specific error for debugging if needed, or keep it generic but log specifically
    return { 
      success: false, 
      error: `Submission failed: ${error.message || "Unknown error"}. Please check your connection and try again.` 
    }
  }
}

export async function updateLeadStatus(id: string, status: string) {
  try {
    await prisma.lead.update({
      where: { id },
      data: { status },
    })
    revalidatePath("/admin/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Failed to update lead status:", error)
    return { success: false }
  }
}

export async function deleteLead(id: string) {
  try {
    await prisma.lead.delete({
      where: { id },
    })
    revalidatePath("/admin/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete lead:", error)
    return { success: false, error: "Failed to delete lead." }
  }
}

export async function getLeads() {
  try {
    return await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error("Failed to fetch leads:", error)
    return []
  }
}
