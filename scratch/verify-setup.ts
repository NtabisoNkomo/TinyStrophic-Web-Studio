import { PrismaClient } from "@prisma/client";

// Node.js 20+ supports --env-file=.env flag, no need for dotenv package


async function testConnection() {
  const prisma = new PrismaClient();
  
  console.log("🚀 Starting Database Connection Test...");
  console.log("---------------------------------------");
  
  // 1. Check if Environment Variables are set
  const dbUrl = process.env.DATABASE_URL;
  const authSecret = process.env.AUTH_SECRET;
  
  if (!dbUrl) {
    console.error("❌ ERROR: DATABASE_URL is not defined in .env");
  } else {
    console.log("✅ DATABASE_URL is defined");
  }
  
  if (!authSecret) {
    console.error("❌ ERROR: AUTH_SECRET is not defined in .env");
  } else {
    console.log("✅ AUTH_SECRET is defined");
  }

  try {
    // 2. Test Connection and Query
    console.log("\n📡 Attempting to connect to the database...");
    const start = Date.now();
    
    // Try a simple count query
    const userCount = await prisma.user.count();
    
    const duration = Date.now() - start;
    console.log(`✅ SUCCESS: Connected to database in ${duration}ms`);
    console.log(`📊 Current User Count: ${userCount}`);
    
    // 3. Check for Admin User
    const admin = await prisma.user.findUnique({
      where: { email: "admin@tinystrophic.co.za" }
    });
    
    if (admin) {
      console.log("✅ Admin user found in database");
    } else {
      console.warn("⚠️  Admin user NOT found in database. You might need to run the seed script.");
    }

  } catch (error: any) {
    console.error("\n❌ CONNECTION FAILED:");
    console.error("---------------------------------------");
    if (error.message.includes("ENOTFOUND")) {
      console.error("Reason: The database host could not be found. Check your PROJECT_ID in the URL.");
    } else if (error.message.includes("Password authentication failed")) {
      console.error("Reason: Incorrect password. Please verify your database password.");
    } else {
      console.error(error.message);
    }
    console.error("---------------------------------------");
  } finally {
    await prisma.$disconnect();
    console.log("\n🏁 Test completed.");
  }
}

testConnection();
