import stringUtils from "@/utils/stringUtils";

export default class ErrorResponse {
    message?: string;
    
    refresh?: boolean;
    signIn?: boolean;
    error?: Error;


    setMessage(msg: string) {
        this.message = msg;
    }

    internalServerError(error: Error): void {
        this.message = error.message
    }

    cookieError(): void {
        this.message = "Cookie Absent/Expired, Please Sign in Again";
    }

    invalidAccessToken(msg: string): void {
        this.message = msg;
        this.refresh = true;
    }

    noAuthenticationTokenError(msg: string): void {
        this.message = msg;
        this.refresh = true;
    }

    unAuthorizedAccess(): void {
        this.message = "Unauthorized Access";
    }

    notFound(): void {
        this.message = "Not Found";
    }

    getError(err?: Error): any {
        let json: any = {};

        if (!stringUtils.isUndefinedEmptyorNull(this.message)) {
            json["message"] = this.message
        }
        if (!stringUtils.isUndefinedEmptyorNull(this.refresh)) {
            json["refresh"] = this.refresh
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.signIn)) {
            json["signIn"] = this.signIn
        }

        if (!stringUtils.isUndefinedEmptyorNull(err)) {
            json["error"] = err
        }

        return  json;
    }
}
