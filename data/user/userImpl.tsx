import { LoginProviderEnum } from "@/enums/LoginProviderEnum";
import userInterface from "./userInterface";
import authDetailsInterface from "../authDetails/authDetailsInterface";
import stringUtils from "@/utils/stringUtils";
import authDetailsImpl from "../authDetails/authDetailsImpl";

export default class userImpl implements userInterface {
    id!: string;
    firstName!: string;
    lastName!: string;
    password!: string;
    email!: string;
    emailVerified!: Date;
    provider!: LoginProviderEnum;
    providerId!: String;

    authDetials!: authDetailsInterface;

    createdAt!: Date;
    updatedAt!: Date;


    initFromDataObj(data: userInterface) {
        this.id = data?.id;
        this.firstName = data?.firstName;
        this.lastName = data?.lastName;
        this.password = data?.password;
        this.email = data?.email;

        if (stringUtils.isUndefinedEmptyorNull(data?.emailVerified)) {
            const d: Date = new Date(data?.emailVerified);
            this.emailVerified = d;
        }
        
        this.provider = data?.provider;
        this.providerId = data?.providerId;

        if (stringUtils.isUndefinedEmptyorNull(data?.authDetials)) {
            const authDetailsObj = new authDetailsImpl();
            
        }

        this.authDetials = data?.authDetials;


        if (stringUtils.isUndefinedEmptyorNull(data?.createdAt)) {
            const d: Date = new Date(data?.createdAt);
            this.createdAt = d;
        }

        if (stringUtils.isUndefinedEmptyorNull(data?.updatedAt)) {
            const d: Date = new Date(data?.updatedAt);
            this.updatedAt = d;
        }
    }
}