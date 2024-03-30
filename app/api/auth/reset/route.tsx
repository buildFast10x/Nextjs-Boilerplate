import userController from "@/controllers/UserController";
import mailImpl from "@/data/mail/mailImpl";
import passwordResetTokenImpl from "@/data/passwordResetToken/passwordResetTokenImpl";
import userImpl from "@/data/user/userImpl";
import errorHandler from "@/helpers/errorHandler";
import resendInstance from "@/lib/resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        const userControllerHandler = new userController();
        const existingUser = await userControllerHandler.getUserByEmail(email);

        if (!existingUser) {
            const error = new errorHandler();
            error.notFoundWithMessage("User does not exist");
            return error.generateError();
        }

        const userForm = new userImpl();
        userForm.initFromDataObject(existingUser);

        // TODO: Generate Token and send email
        const passwordResetTokenForm = new passwordResetTokenImpl();
        await passwordResetTokenForm.generateVerificationToken(userForm.getEmail());

        const mail = new mailImpl();
        mail.populateCredentials()

        const resend = new resendInstance();
        resend.sendPasswordResetMail(userForm.getEmail(), passwordResetTokenForm.getToken(), mail);

        const returnJson: any = {
            status: 200,
            message: "Reset Email sent",
            success: true
        }
        return NextResponse.json(returnJson);

    } catch (e: any) {
        const error = new errorHandler();
        error.internalServerError(e);
        return error.generateError();
    }
}