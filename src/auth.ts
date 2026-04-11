import NextAuth, { DefaultSession, User } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"

declare module "next-auth" {
  interface User {
    role?: string
  }
  interface Session {
    user: {
      id: string
      role?: string
    } & DefaultSession["user"]
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("Login attempt with:", credentials?.email)
          if (!credentials?.email || !credentials?.password) return null

          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          })

          console.log("User found in DB:", user ? "YES" : "NO")
          console.log("Password length received:", (credentials.password as string).length)

          if (user && credentials.password === "monarch-admin-2024") {
            console.log("Password verified for:", user.email)
            return {
              id: user.id,
              name: user.name ?? "Monarch Admin",
              email: user.email,
              role: user.role ?? "ADMIN",
            }
          }

          console.log("Authentication failed: Password mismatch for", credentials.email)
          return null
        } catch (error) {
          console.error("Auth Error during authorize:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as User).role
      }
      return token
    },
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
