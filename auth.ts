import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/lib/prisma";
import authConfig from "@/auth.config";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async jwt({ token }) {
            console.log({token});
            return token;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
});