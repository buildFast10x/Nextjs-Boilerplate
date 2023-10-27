class ErrorResponse {
    status: string;
    message: string;
    success: boolean;
    refresh?: boolean;
    signIn?: boolean;

    constructor(status: string, message: string, success: boolean, refresh?: boolean, signIn?: boolean) {
        this.status = status;
        this.message = message;
        this.success = success;
        this.refresh = refresh;
        this.signIn = signIn;
    }
}

const internalServerError = (error: Error): ErrorResponse => {
    return new ErrorResponse("500", error.message, false);
}

const cookieError = (): ErrorResponse => {
    return new ErrorResponse("403", "Cookie Absent/Expired, Please Sign in Again", false);
}

const invalidAccessToken = (msg: string): ErrorResponse => {
    return new ErrorResponse("401", msg, false, true);
}

const noAuthenticationTokenError = (msg: string): ErrorResponse => {
    return new ErrorResponse("201", msg, false, true);
}

const unAuthorizedAccess = (): ErrorResponse => {
    return new ErrorResponse("401", "Unauthorized Access", false);
}

const notFound = (): ErrorResponse => {
    return new ErrorResponse("404", "Not Found", false);
}

const errorHandler = (err: ErrorResponse, req: any, res: any, next: any) => {
    let responseObj: ErrorResponse  = {
        "message": err.message,
        "status": err.status,
        "success": err.success
    };
    if (err.signIn) {
        responseObj = { ...responseObj, "signIn": err.signIn };
    }
    if (err.refresh) {
        responseObj = { ...responseObj, "refresh": err.refresh };
    }
    res.status(err.status).send(responseObj);
}

export {
    noAuthenticationTokenError,
    internalServerError,
    invalidAccessToken,
    unAuthorizedAccess,
    cookieError,
    notFound,
    errorHandler
};
