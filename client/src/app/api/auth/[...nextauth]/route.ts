import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import { UserType } from "@/app/utils/types";
import { BEUrl } from "../../blog";

const handler = NextAuth({
  pages: {
    signIn: "login",
  },
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, res) {
        try {
          const resBackend = await axios.post(`${BEUrl}login`, credentials);
          if (res instanceof AxiosError) {
            throw new Error(JSON.stringify({ error: resBackend.data.message }));
          }
          return resBackend.data;
        } catch (error) {
          console.log(error);
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as UserType;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
