import stringUtils from "@/utils/stringUtils";
import userInterface from "../user/userInterface";
import authDetailsInterface from "./authDetailsInterface";
import userImpl from "../user/userImpl";
import { JsonObject } from "@prisma/client/runtime/library";

export default class authDetailsImpl implements authDetailsInterface {
    id!: string;
    user!: userInterface;
    verificationToken!: string;
    refresh_token!: string;
    expires_at!: Date;

    createdAt!: Date;
    updatedAt!: Date;

    constructor() {
    }

    initFromValues(verificationToken: string, refresh_token: string, expires_at: Date) {
        this.verificationToken = verificationToken;
        this.refresh_token = refresh_token;
        this.expires_at = expires_at;
    }

    getUser(): userInterface {
        return this.user;
    }

    initFromDataObj(data: authDetailsInterface): void {

        this.id = data?.id || '';
        
        if (!stringUtils.isUndefinedEmptyorNull(data?.user)) {
            const user = new userImpl();
            user.initFromDataObj(data?.user);
            this.user = user;
        }

        this.verificationToken = data?.verificationToken;
        this.refresh_token = data?.refresh_token;

        if (!stringUtils.isUndefinedEmptyorNull(data?.expires_at)) {
            const d: Date = new Date(data?.expires_at);
            this.expires_at = d;
        }

        if (!stringUtils.isUndefinedEmptyorNull(data?.createdAt)) {
            const d: Date = new Date(data?.createdAt);
            this.createdAt = d;
        }

        if (!stringUtils.isUndefinedEmptyorNull(data?.updatedAt)) {
            const d: Date = new Date(data?.updatedAt);
            this.updatedAt = d;
        }
    }

    toJson(): any {
        let json: any = {}

        if (!stringUtils.isUndefinedEmptyorNull(this.id)) {
            json["id"] = this.id
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.user)) {
            json["user"] = this.user.toJson();
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.verificationToken)) {
            json["verificationToken"] = this.verificationToken;
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.refresh_token)) {
            json["refresh_token"] = this.refresh_token;
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.expires_at)) {
            json["expires_at"] = this.expires_at.toString();
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.createdAt)) {
            json["createdAt"] = this.createdAt.toString();
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.updatedAt)) {
            json["updatedAt"] = this.updatedAt.toString();
        }

        return json
    }
}
