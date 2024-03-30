import stringUtils from "@/utils/stringUtils";
import verificationTokenInterface from "./verificationTokenInterface";
import { v4 as uuidv4 } from "uuid";

import prisma from "@/lib/prisma";
import verficationTokenController from "@/controllers/VerficationTokenController";

export default class verificationTokenImpl implements verificationTokenInterface {
    id: string = '';
    email: string = '';
    token: string = '';
    expires: string = ''

    initFromDataObject(data: any) {
        if (!stringUtils.isUndefinedEmptyorNull(data.id)) {
            this.id = data.id
        }

        if (!stringUtils.isUndefinedEmptyorNull(data.email)) {
            this.email = data.email
        }

        if (!stringUtils.isUndefinedEmptyorNull(data.token)) {
            this.token = data.token
        }

        if (!stringUtils.isUndefinedEmptyorNull(data.expires)) {
            this.expires = data.expires
        }
    }

    async generateVerificationToken(email: string) {
        // GENERATING TOKEN AND INSERTING INTO DATABASE 

        const token = uuidv4();
        const expires = new Date(new Date().getTime() + 3600 * 1000);
        
        const vertificationTokenControllerHandler = new verficationTokenController();
        const existingToken: any = await vertificationTokenControllerHandler.getVerificationTokenByEmail(email);

        if (existingToken) {
            this.initFromDataObject(existingToken);
            await vertificationTokenControllerHandler.deleteVerificationTokenById(this.id);
        }

        const verficationToken = await vertificationTokenControllerHandler.create(email, token, expires);
        this.initFromDataObject(verficationToken);
    }

    setToken(token: string) {
        this.token = token;
    }

    getToken() {
        return this.token;
    }

    getEmail() {
        return this.email;
    }

    getId() {
        return this.id;
    }

    isTokenExpired() {
        return new Date(this.expires) < new Date()
    }
}