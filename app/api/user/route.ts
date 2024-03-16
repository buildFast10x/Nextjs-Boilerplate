import userController from "@/controllers/UserController";
import userImpl from "@/data/user/userImpl";
import userInterface from "@/data/user/userInterface";
import errorHandler from "@/helpers/errorHandler";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {

        const userData: userInterface = await req.json();

        const hashedPassword = await bcrypt.hash(userData.password || '', 12);
        userData.password = hashedPassword;
        const userForm = new userImpl();
        userForm.initFromDataObject(userData);

        // checking wheather user exist
        const userControllerHandler = new userController();
        const isEmailExists = await userControllerHandler.isEmailexists(userForm.email);

        if (!isEmailExists) {
            // TODO: add functionality for lastname
            await userControllerHandler.create(userForm.getName(), userForm.getPassword() || '', userForm.getEmail())
        } else {
            const error = new errorHandler();
            error.conflict("Email Already Exists");
            return error.generateError();
        }

        // TODO: Send Verification token email
        const returnJson: any = {
            status: 200,
            message: "User Created",
            success: true
        }
        return NextResponse.json(returnJson);

    } catch (e: any) {
        const error = new errorHandler();
        error.internalServerError(e);
        return error.generateError();
    }
}