import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";

import { env } from "~/env";
import { db } from "~/server/db";
import { api } from "~/trpc/server";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    Credentials({
      // name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log(credentials);
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const email = credentials.email;
          const password = credentials.password;
          // Call the TRPC route to get the user by email
          const user = await api.verifyUser.getUserByEmailAndPassword({email,password})
          // const user = await db.user.findUnique({
          //   where: { email: credentials.email },
          // });
          console.log(user)
          if (!user) {
            throw new Error("User not found");
          }
          console.log(user, "userrrrrrrrrr");

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error: any) {
          throw new Error(
            error.message || "An error occurred during authorization",
          );
        }
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
