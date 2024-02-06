import LoginProviderEnum from "@/enums/LoginProviderEnum";
import userInterface from "./userInterface";
import authDetailsInterface from "../authDetails/authDetailsInterface";
import stringUtils from "@/utils/stringUtils";
import authDetailsImpl from "../authDetails/authDetailsImpl";
import { JsonObject } from "@prisma/client/runtime/library";

export default class userImpl implements userInterface {
    id!: string;
    firstName!: string;
    lastName!: string;
    password!: string;
    email!: string;
    emailVerified!: Date;
    provider!: LoginProviderEnum;
    providerId!: string;

    authDetials!: authDetailsInterface;

    createdAt!: Date;
    updatedAt!: Date;


    initFromDataObj(data: userInterface): void {
        this.id = data?.id;
        this.firstName = data?.firstName;
        this.lastName = data?.lastName;
        this.password = data?.password;
        this.email = data?.email;

        if (!stringUtils.isUndefinedEmptyorNull(data?.emailVerified)) {
            const d: Date = new Date(data?.emailVerified);
            this.emailVerified = d;
        }
        
        this.provider = data?.provider;
        this.providerId = data?.providerId;

        if (!stringUtils.isUndefinedEmptyorNull(data?.authDetials)) {
            const authDetailsObj = new authDetailsImpl();
            authDetailsObj.initFromDataObj(data?.authDetials);
            this.authDetials = authDetailsObj;
        }

        this.authDetials = data?.authDetials;


        if (!stringUtils.isUndefinedEmptyorNull(data?.createdAt)) {
            const d: Date = new Date(data?.createdAt);
            this.createdAt = d;
        }

        if (!stringUtils.isUndefinedEmptyorNull(data?.updatedAt)) {
            const d: Date = new Date(data?.updatedAt);
            this.updatedAt = d;
        }
    }

    toJson(removePassword: boolean = true): any {
        let json: any = {}
        
        if (!stringUtils.isUndefinedEmptyorNull(this.id)) {
            json["id"] = this.id
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.firstName)) {
            json["firstName"] = this.firstName
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.lastName)) {
            json["lastName"] = this.lastName
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.password) && removePassword) {
            json["password"] = this.password
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.email)) {
            json["email"] = this.email
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.emailVerified)) {
            json["emailVerified"] = this.emailVerified.toString();
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.provider)) {
            json["provider"] = this.provider
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.providerId)) {
            json["providerId"] = this.providerId
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.authDetials)) {
            json["authDetials"] = this.authDetials.toJson()
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.createdAt)) {
            json["createdAt"] = this.createdAt.toString();
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.updatedAt)) {
            json["updatedAt"] = this.updatedAt.toString();
        }

        return json;
    }
}