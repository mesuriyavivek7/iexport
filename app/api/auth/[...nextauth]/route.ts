import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"

export const {
    handlers, 
    auth,
    signIn,
    signOut
} = NextAuth({
   providers:[
     Credentials({
        name:'CMS Login',
        credentials:{
            email: {type: "text"},
            password: {type: "password"}
        },

        async authorize(credentials) {

            if (!credentials?.email || !credentials?.password) {
                return null;
            }

            const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, 
            {
                method:'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            });

            if (!res.ok) return null;

            const user = await res.json();

            if (!user?.id) return null;

            return user;
        }
     })
   ],

   session: {
    strategy: 'jwt'
   },

   callbacks: {

    async jwt({ token, user }) {

      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }

      return token;
    },

    async session({ session, token }) {

      if (session.user) {
        session.user.id = token.id as string;
        session.user.accessToken = token.accessToken as string;
      }

      return session;
    }
  },

})