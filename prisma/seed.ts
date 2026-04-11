import { PrismaClient } from "@prisma/client"

async function main() {
  const prisma = new PrismaClient()
  try {
    const admin = await prisma.user.upsert({
      where: { email: "admin@solawebstudio.co.za" },
      update: {},
      create: {
        email: "admin@solawebstudio.co.za",
        name: "Sola Admin",
        role: "ADMIN",
      },
    })

    // Add a sample lead
    await prisma.lead.create({
      data: {
        name: "Sipho Khumalo",
        email: "sipho@khumalologistics.co.za",
        businessName: "Khumalo Logistics",
        message: "Looking for a brand overhaul and a custom CRM integration.",
        status: "NEW",
      },
    })

    // Add sample projects
    await prisma.project.create({
      data: {
        title: "Vanguard Properties",
        category: "Luxury Real Estate",
        description: "A high-end property portal for Cape Town's most exclusive listings.",
        image: "/portfolio-1.png",
        tags: "Next.js,Tailwind,Prisma",
      },
    })

    await prisma.project.create({
      data: {
        title: "Roast & Co.",
        category: "Artisan Coffee",
        description: "E-commerce experience for a premium Johannesburg-based coffee roastery.",
        image: "/portfolio-2.png",
        tags: "Shopify,UI/UX,SEO",
      },
    })

    console.log({ admin })
  } finally {
    await prisma.$disconnect()
  }
}

main().catch(async (e) => {
  console.error(e)
  process.exit(1)
})
