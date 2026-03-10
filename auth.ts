import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getServerSession } from "next-auth"
import { login } from "@/services"

const isDev = process.env.NODE_ENV === "development"
export const authOptions: AuthOptions = {
  secret:
    process.env.NEXTAUTH_SECRET ||
    (isDev ? "dev-secret-min-32-chars-for-jwt-signing" : undefined),
  providers: [
    Credentials({
      name: "CMS Login",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const result = await login({
          email: credentials.email,
          password: credentials.password,
        })
        if (!result.success) {
          throw new Error(result.message)
        }
        const user = result.data?.user ?? result.data
        const id = user?.id ?? credentials.email
        return {
          id: String(id),
          email: credentials.email,
          ...user,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.accessToken = user.accessToken
        token.image = user.image
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.accessToken = token.accessToken as string
        session.user.image = token.image as string | null | undefined
      }
      return session
    },
  },
}

export const getAuth = () => getServerSession(authOptions)
