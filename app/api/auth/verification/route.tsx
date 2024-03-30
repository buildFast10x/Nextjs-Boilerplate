import userController from "@/controllers/UserController";
import verficationTokenController from "@/controllers/VerficationTokenController";
import userImpl from "@/data/user/userImpl";
import verificationTokenImpl from "@/data/verificationToken/verificationTokenImpl";
import errorHandler from "@/helpers/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();

        const verficationTokenControllerHandler = new verficationTokenController();
        const existingToken = await verficationTokenControllerHandler.getVerificationTokenByToken(token);

        if(!existingToken) {
            const error = new errorHandler();
            error.internalServerError("Token does not exist");
            return error.generateError();
        }

        const verificationTokenForm = new verificationTokenImpl();
        verificationTokenForm.initFromDataObject(existingToken);

        if(verificationTokenForm.isTokenExpired()) {
            const error = new errorHandler();
            error.internalServerError("Token has expired");
            return error.generateError();
        }

        const userControllerHandler = new userController();
        const existingUser = await userControllerHandler.getUserByEmail(verificationTokenForm.getEmail())
        
        if(!existingUser) {
            const error = new errorHandler();
            error.missingItem("User Not found");
            return error.generateError();
        }

        const userForm = new userImpl();
        userForm.initFromDataObject(existingUser);
        await userControllerHandler.updateData(userForm.getId(), userForm.getEmail());

        await verficationTokenControllerHandler.deleteVerificationTokenById(verificationTokenForm.getId());
        const returnJson: any = {
            status: 200,
            message: "User Verified",
            success: true
        }
        return NextResponse.json(returnJson);
    } catch (e: any) {
        const error = new errorHandler();
        error.internalServerError(e);
        return error.generateError();
    }
}