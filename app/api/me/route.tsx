import userController from "@/controllers/userController";
import ResponseHandler from "@/data/ResponseHandler";
import userImpl from "@/data/user/userImpl";
import userInterface from "@/data/user/userInterface";
import AuthHelper from "@/helpers/AuthHelper";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {

        const access_token: string = req.cookies.get('access_token')?.value || '';
        const refresh_token: string = req.cookies.get('refresh_token')?.value || '';

        const authHelperHandler = new AuthHelper();
        const userForm = new userImpl();
        const user: any = (await authHelperHandler.extractToken(access_token, refresh_token)) || userForm;
        const data = {
            "me": user
        }
        const response = new ResponseHandler();
        response.setStatus(200);
        response.setSuccess(true);
        response.setData(data);
        const returnJson = response.toJson();
        return NextResponse.json(returnJson);
        

    } catch (e: any) {

        const error = new ResponseHandler();
        error.internalServerError(e);
        const returnJson = error.getError(e);
        return NextResponse.json(returnJson);
    }

}
