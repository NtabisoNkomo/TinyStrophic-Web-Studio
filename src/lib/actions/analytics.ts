'use server'

import { PrismaClient } from "@prisma/client"
import { headers } from "next/headers"

const prisma = new PrismaClient()

export async function logVisit() {
  try {
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || '127.0.0.1'
    const userAgent = headersList.get("user-agent") || 'unknown'
    
    await prisma.visitor.upsert({
      where: { ipHash: ip },
      update: { updatedAt: new Date() },
      create: { ipHash: ip, userAgent }
    })
  } catch (error) {
    console.error("Error logging visit", error)
  }
}

export async function getDashboardStats() {
  const [leadsCount, visitorsCount, activeProjectsCount, auditsCount] = await Promise.all([
    prisma.lead.count(),
    prisma.visitor.count(),
    prisma.project.count(),
    prisma.quote.count({ where: { services: { contains: "SEO" } } }) // Example logic
  ])

  let conversionRate = 0
  if (visitorsCount > 0) {
    conversionRate = parseFloat(((leadsCount / visitorsCount) * 100).toFixed(1))
  }

  return {
    conversionRate,
    activeProjects: activeProjectsCount,
    totalAudits: leadsCount + auditsCount // Any quote or lead
  }
}
