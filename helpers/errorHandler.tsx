import { NextRequest, NextResponse } from "next/server";

interface errorInterfance {
    status: number;
    message: string;
    success: boolean;
}


export default class errorHandler implements errorInterfance {
    status: number = 500;
    message: string = "";
    success: boolean = false;

    internalServerError(e: any) {
        this.status = 500;
        this.message = e.message;
        this.success = false;

    }

    cookieError() {
        this.status = 403;
        this.message = "Cookie Absent/Expired, Please Sign in Again";
        this.success = false;
    }

    invalidAccessToken(msg: string) {
        this.status = 401;
        this.message = msg;
        this.success = false;
    }

    missingItem(msg: string) {
        this.status = 400;
        this.message = msg;
        this.success = false;
    }

    noAuthenticationTokenError(msg: string) {
        this.status = 201;
        this.message = msg;
        this.success = false;
    }

    unAuthorizedAccess() {
        this.status = 401;
        this.message = "Unauthorized Access";
        this.success = false;
    }

    notFound() {
        this.status = 404;
        this.message = "Not Found";
        this.success = false;
    }

    notFoundWithMessage(msg: string) {
        this.status = 404;
        this.message = msg;
        this.success = false;
    }

    conflict(msg: string) {
        this.status = 409;
        this.message = msg;
        this.success = false;
    }

    generateError() {
        return NextResponse.json({ error: this.message, "success": this.success }, { "status": this.status });
    }

}