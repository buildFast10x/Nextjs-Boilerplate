import stringUtils from '@/utils/stringUtils';
import jwt from 'jsonwebtoken';

import env_values from '@/config'
import userController from '@/controllers/userController';
import authDetailsInterface from '@/data/authDetails/authDetailsInterface';
import authDetailsImpl from '@/data/authDetails/authDetailsImpl';
import ResponseHandler from '@/data/ResponseHandler';
import { NextResponse } from 'next/server';
import jsonUtilsImpl from '@/utils/jsonUtils';
import dateUtils from '@/utils/dateUtils';
import { cookies } from 'next/headers';

const MAX_AGE_ACCESS_TOKEN = 10000;
const MAX_AGE_REFRESH_TOKEN = 60 * 60 * 24 * 7;

export default class AuthHelper {
    constructor() { };

    setAuthenticationCookies(access_token: string, refresh_token: string) {
        if (!stringUtils.isUndefinedEmptyorNull(access_token)) {
            cookies().set("access_token", access_token, { "maxAge": MAX_AGE_ACCESS_TOKEN });
        }
        if (!stringUtils.isUndefinedEmptyorNull(refresh_token)) {
            cookies().set("refresh_token", refresh_token, { "maxAge": MAX_AGE_REFRESH_TOKEN });
        }
    }

    // Extract details from token if present 
    // IF accesstoken is present and refresh token is not present create access token 
    async extractToken(access_token: string, refresh_token: string) {
        try {
            if (!stringUtils.isUndefinedEmptyorNull(access_token)) {
                const user: any = jwt.verify(access_token, env_values.server.jwtSecretKey);
                return JSON.parse(user.data);
            }

            if (stringUtils.isUndefinedEmptyorNull(access_token) && !stringUtils.isUndefinedEmptyorNull(refresh_token)) {
                const userControllerHandler = new userController();
                const authDetailsForm = new authDetailsImpl();
                const authDetails: authDetailsInterface = (await userControllerHandler.getUserbyRefreshToken(refresh_token)) || authDetailsForm.toJson();
                
                if (!stringUtils.isUndefinedEmptyorNull(authDetails) && !jsonUtilsImpl.isEmpty(authDetails)) {
                    const userDetails: any = jwt.verify(authDetails.refresh_token, env_values.server.jwtSecretKey);
                    const userJWTData = JSON.parse(userDetails.data.replace(authDetails.verificationToken, ''));

                    const access_token = jwt.sign({
                        data: JSON.stringify(userJWTData)
                    }, env_values.server.jwtSecretKey, { expiresIn: MAX_AGE_ACCESS_TOKEN });

                    this.setAuthenticationCookies(access_token, '');
                    return userJWTData;
                } else {
                    const error = new ResponseHandler();
                    error.invalidAccessToken("Wrong Access Token");
                    const returnJson = error.getError();
                    return NextResponse.json(returnJson);
                }
            }
        } catch(e: any) {
            const error = new ResponseHandler();
            error.internalServerError(e);
            const returnJson = error.getError(e);
            return NextResponse.json(returnJson);
        }
        
    }
}

export {    
    MAX_AGE_ACCESS_TOKEN,
    MAX_AGE_REFRESH_TOKEN
};