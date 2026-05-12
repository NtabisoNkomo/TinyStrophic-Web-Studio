import { prisma } from "../src/lib/prisma";

async function test() {
  try {
    console.log("Checking database connection...");
    const userCount = await prisma.user.count();
    console.log("User count:", userCount);
    
    const admin = await prisma.user.findUnique({
      where: { email: "admin@tinystrophic.co.za" }
    });
    console.log("Admin user in DB:", admin);
  } catch (error) {
    console.error("Database error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
