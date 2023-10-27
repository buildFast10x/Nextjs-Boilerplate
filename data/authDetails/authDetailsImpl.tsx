import stringUtils from "@/utils/stringUtils";
import userInterface from "../user/userInterface";
import authDetailsInterface from "./authDetailsInterface";
import userImpl from "../user/userImpl";

export default class authDetailsImpl implements authDetailsInterface {
    id!: string;
    user!: userInterface;
    verificationToken!: string;
    refresh_token!: string;
    expires_at!: Number;

    createdAt!: Date;
    updatedAt!: Date;

    initFromDataObject(data: authDetailsInterface) {

        this.id = data?.id;
        
        if (stringUtils.isUndefinedEmptyorNull(data?.user)) {
            const user = new userImpl();
            user.initFromDataObj(data?.user);
            this.user = user;
        }

        this.verificationToken = data?.verificationToken;
        this.refresh_token = data?.refresh_token;
        this.expires_at = data?.expires_at;

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
