import ErrorResponse from "@/middlewares/ErrorResponse";
import jsonUtilsImpl from "@/utils/jsonUtils";
import stringUtils from "@/utils/stringUtils";

export default class ResponseHandler extends ErrorResponse {
    status?: number;
    success?: boolean;
    data?: any;

    setStatus(success: boolean) {
        this.success = success;
    }

    setData(data: any) {
        this.data = data
    }
    
    internalServerError(error: Error): void {
        this.status = 500;
        this.success = false;
        super.internalServerError(error);
    }

    cookieError(): void {
        this.status = 403;
        this.success = false;
        super.cookieError();
    }

    invalidAccessToken(msg: string): void {
        this.status = 401;
        this.success = false;
        super.invalidAccessToken(msg);
    }

    noAuthenticationTokenError(msg: string): void {
        this.status = 201;
        this.success = false;
        super.noAuthenticationTokenError(msg);
    }

    unAuthorizedAccess(): void {
        this.status = 401;
        this.success = false;
        super.unAuthorizedAccess();
    }

    notFound(): void {
        this.status = 404;
        this.success = false;
        super.notFound();
    }

    toJson(err?: Error): any {
        let json: any = {};
        const errors = super.getError(err);
        
        if (!jsonUtilsImpl.isEmpty(errors)) {
            json = errors;
        }
         
        if (!stringUtils.isUndefinedEmptyorNull(this.status)) {
            json["status"] = this.status
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.success)) {
            json["success"] = this.success
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.data)) {
            json["data"] = this.data;
        }


        return json;
    }
}
