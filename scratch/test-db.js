const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function test() {
  try {
    const lead = await prisma.lead.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        businessName: "Test Business",
        message: "Test message",
        status: "NEW",
      },
    });
    console.log("Success:", lead.id);
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
