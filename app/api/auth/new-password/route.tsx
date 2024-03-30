import passwordResetTokenController from "@/controllers/PasswordResetTokenController";
import userController from "@/controllers/UserController";
import passwordResetTokenImpl from "@/data/passwordResetToken/passwordResetTokenImpl";
import userImpl from "@/data/user/userImpl";
import errorHandler from "@/helpers/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { password, token } = await req.json();

        const passwordResetTokenControllerHandler = new passwordResetTokenController();
        const existingToken = await passwordResetTokenControllerHandler.getPasswordResetTokenByToken(token);

        if (!existingToken) {
            const error = new errorHandler();
            error.internalServerError("Token does not exist");
            return error.generateError();
        }

        const passwordResetTokenForm = new passwordResetTokenImpl();
        passwordResetTokenForm.initFromDataObject(existingToken);

        if (passwordResetTokenForm.isTokenExpired()) {
            const error = new errorHandler();
            error.internalServerError("Token has expired");
            return error.generateError();
        }

        const userControllerHandler = new userController();
        const existingUser = await userControllerHandler.getUserByEmail(passwordResetTokenForm.getEmail())

        if (!existingUser) {
            const error = new errorHandler();
            error.missingItem("User Not found");
            return error.generateError();
        }

        const userForm = new userImpl();
        userForm.initFromDataObject(existingUser);

        const hashedPassword = await bcrypt.hash(password, 10);
        await userControllerHandler.updatePassword(userForm.getId(), hashedPassword);
        await passwordResetTokenControllerHandler.deletePasswordResetTokenById(passwordResetTokenForm.getId());

        const returnJson: any = {
            status: 200,
            message: "Password Updated",
            success: true
        }
        return NextResponse.json(returnJson);
    } catch (e: any) {
        const error = new errorHandler();
        error.internalServerError(e);
        return error.generateError();
    }
}
