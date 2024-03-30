import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import configEnv from "@/config"
import bcrypt from "bcryptjs";

import userImpl from "@/data/user/userImpl";
import userController from "@/controllers/UserController";


export default {
    providers: [
        Google({
            clientId: configEnv.google.clientId,
            clientSecret: configEnv.google.clientSecret
        }),
        Credentials({
            async authorize(credentials: any) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const userControllerHandler = new userController();
                const userDB = await userControllerHandler.getUserByEmail(credentials.email);
                const user = new userImpl();
                user.initFromDataObject(userDB)

                if (!user || !user.getPassword()) {
                    return null
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.getPassword() || '');
                if (!isPasswordValid) {
                    return null
                }

                return user.toJson();
                // const validatedFields = LoginSchema.safeParse(credentials);

                // if (validatedFields.success) {
                //     const { email, password } = validatedFields.data;

                //     const user = await getUserByEmail(email);
                //     if (!user || !user.password) return null;

                //     const passwordsMatch = await bcrypt.compare(
                //         password,
                //         user.password,
                //     );

                //     if (passwordsMatch) return user;
                // }

                return null;
            }
        })
    ],
} satisfies NextAuthConfig