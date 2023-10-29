import userController from "@/controllers/userController";
import ResponseHandler from "@/data/ResponseHandler";
import userImpl from "@/data/user/userImpl";
import userInterface from "@/data/user/userInterface";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        
        const userData: userInterface = await req.json();

        const hashedPassword = await bcrypt.hash(userData.password, 12);
        userData.password = hashedPassword;
        const userForm = new userImpl();
        userForm.initFromDataObj(userData);
        
        const userControllerHandler = new userController();

        const isEmailExists = await userControllerHandler.isEmailexists(userData.email);
        if (!isEmailExists) {
            const result = userControllerHandler.create(
                userForm.id,
                userForm.firstName,
                userForm.lastName,
                userForm.password,
                userForm.email,
                userForm.provider
            )

            const response = new ResponseHandler();
            response.setStatus(200);
            response.setData(result);
            response.setMessage("User Created")
            const returnJson = response.toJson();
            return NextResponse.json(returnJson);
        }

        const response = new ResponseHandler();
        response.setStatus(500)
        response.setMessage("Email Id already Exists");
        const returnJson = response.toJson();
        return NextResponse.json(returnJson);
    } catch(e: any) {

        const error = new ResponseHandler();
        error.internalServerError(e);
        const returnJson = error.getError(e);
        return NextResponse.json(returnJson);
    }
    
}
