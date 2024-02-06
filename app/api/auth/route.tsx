import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";


import userController from "@/controllers/userController";
import ResponseHandler from "@/data/ResponseHandler";
import userImpl from "@/data/user/userImpl";
import userInterface from "@/data/user/userInterface";
import LoginProviderEnum from "@/enums/LoginProviderEnum";
import jsonUtilsImpl from "@/utils/jsonUtils";
import env_values from "@/config";
import authDetailsImpl from "@/data/authDetails/authDetailsImpl";
import dateUtils from "@/utils/dateUtils";
import authDetailsController from "@/controllers/authDetailsController";
import AuthHelper, { MAX_AGE_ACCESS_TOKEN, MAX_AGE_REFRESH_TOKEN } from "@/helpers/AuthHelper";

export async function POST(req: NextRequest) {
    try {
        const userData: userInterface = await req.json();

        const userForm = new userImpl();
        userForm.initFromDataObj(userData);

        const userControllerHandler = new userController();
        const user: userInterface = (await userControllerHandler.getUserByEmail(userForm.email)) || userForm.toJson();

        if(jsonUtilsImpl.isEmpty(user) || user?.provider !== LoginProviderEnum.SELF) {
            throw new Error('Invalid credentials'); 
        }

        const isCorrectPassword = await bcrypt.compare(
            userForm.password,
            user?.password || ''
        );

        if (isCorrectPassword === true) {
            userForm.initFromDataObj(user);
            const userJWTData = {
                "id": user?.id,
                "firstName": user?.firstName,
                "email": user?.email,
                "provider": user?.provider
            }
            
            const access_token = jwt.sign({
                data: JSON.stringify(userJWTData)
            }, env_values.server.jwtSecretKey, { expiresIn: MAX_AGE_ACCESS_TOKEN });

            const verificationToken = crypto.randomBytes(32).toString('hex');
            const refresh_token = jwt.sign({
                data: JSON.stringify(userJWTData) + verificationToken
            }, env_values.server.jwtSecretKey, { expiresIn: MAX_AGE_REFRESH_TOKEN });

            const authDetailForm = new authDetailsImpl();
            authDetailForm.initFromValues(verificationToken, refresh_token, dateUtils.addDaysToCurrentDate(7));
            const authDetailsControllerHandler = new authDetailsController();
            const result = await authDetailsControllerHandler.upsert(
                user?.id,
                authDetailForm.verificationToken,
                authDetailForm.refresh_token,
                authDetailForm.expires_at
            ) 
            
            if(!jsonUtilsImpl.isEmpty(result)) {
                const authHelperHandler = new AuthHelper();
                authHelperHandler.setAuthenticationCookies(access_token, refresh_token);

                const responseData: any = {
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                    "user": userForm.toJson()
                }
                const response = new ResponseHandler();
                response.setStatus(200);
                response.setSuccess(true);
                response.setData(responseData);
                response.setMessage("User Created")
                const returnJson = response.toJson();
                return NextResponse.json(returnJson);
            } else {
                throw new Error('Unable to store token'); 
            }
            
        }

        const response = new ResponseHandler();
        response.setStatus(401);
        response.setMessage("Wrong password");
        const returnJson = response.toJson();
        return NextResponse.json(returnJson);
    } catch (e: any) {

        const error = new ResponseHandler();
        error.internalServerError(e);
        const returnJson = error.getError(e);
        return NextResponse.json(returnJson);
    }
}