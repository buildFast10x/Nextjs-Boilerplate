import stringUtils from "@/utils/stringUtils";
import userInterface from "./userInterface";
import UserRoleEnum from "@/enums/UserRoleEnum";

export default class userImpl implements userInterface {
    id: string = '';
    name: string = '';
    email: string = '';
    emailVerified: boolean = false;
    password?: string;
    role?: UserRoleEnum
    image?: string;

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getEmailVerified() {
        return this.emailVerified
    }

    getPassword() {
        return this.password
    }

    getImage() {
        return this.image;
    }

    getRole() {
        return this.role;
    }

    initFromDataObject(data: any) {
        
        if (!stringUtils.isUndefinedEmptyorNull(data.id)) {
            this.id = data.id
        }

        if (!stringUtils.isUndefinedEmptyorNull(data.name)) {
            this.name = data.name
        }

        if (!stringUtils.isUndefinedEmptyorNull(data.email)) {
            this.email = data.email
        }

        if (!stringUtils.isUndefinedEmptyorNull(data.emailVerified)) {
            this.emailVerified = data.emailVerified
        }

        if (!stringUtils.isUndefinedEmptyorNull(data.password)) {
            this.password = data.password
        }

        if (!stringUtils.isUndefinedEmptyorNull(data.role)) {
            if(data.role === UserRoleEnum.ADMIN) {
                this.role = UserRoleEnum.ADMIN
            }
            
            else if(data.role === UserRoleEnum.USER) {
                this.role = UserRoleEnum.USER
            }
        }
        
        if (!stringUtils.isUndefinedEmptyorNull(data.image)) {
            this.image = data.image
        }
    }

    toJson() {
        // haven't added password to maintian the privacy
        let json: any = {}

        if (!stringUtils.isUndefinedEmptyorNull(this.id)) {
            json['id'] = this.id
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.name)) {
            json['name'] = this.name
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.email)) {
            json['email'] = this.email
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.emailVerified)) {
            json['emailVerified'] = this.emailVerified
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.image)) {
            json['image'] = this.image
        }

        return json;
    }

}