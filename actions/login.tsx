"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { loginFormSchema } from "@/schemas/index";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import userImpl from "@/data/user/userImpl";
import userController from "@/controllers/UserController";
import verificationTokenImpl from "@/data/verificationToken/verificationTokenImpl";
import mailImpl from "@/data/mail/mailImpl";
import resendInstance from "@/lib/resend";
import stringUtils from "@/utils/stringUtils";

export const login = async (values: z.infer<typeof loginFormSchema>) => {
    const validatedFields = loginFormSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    const userControllerHandler = new userController();
    const existingUser: any = await userControllerHandler.getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email Does not exist"}
    }

    if(!existingUser.emailVerified) {
        const verificationTokenForm = new verificationTokenImpl();
        await verificationTokenForm.generateVerificationToken(existingUser.email);

        const mail = new mailImpl();
        mail.populateCredentials()

        const resend = new resendInstance();
        const result: any = await resend.sendVerificationEmail(email, verificationTokenForm.getToken(), mail);
        if(!stringUtils.isUndefinedEmptyorNull(result?.data)) {
            return { success: "Confirmation Email Send" };
        } else {
            return { error: "Error sending mail", "result": result };
        }
        
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }

        throw error;
    }
};