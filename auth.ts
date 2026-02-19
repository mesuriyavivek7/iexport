import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getServerSession } from "next-auth"

export const authOptions: AuthOptions = {
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
        const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })
        if (!res.ok) return null
        const user = await res.json()
        if (!user?.id) return null
        return user
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
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.accessToken = token.accessToken as string
      }
      return session
    },
  },
}

export const getAuth = () => getServerSession(authOptions)
