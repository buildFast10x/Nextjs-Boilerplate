import prisma from "@/lib/prismadb";

import userInterface from "@/data/user/userInterface";
import errorHandler  from "@/middlewares/ErrorResponse";
import LoginProviderEnum from "@/enums/LoginProviderEnum";
import jsonUtilsImpl from "@/utils/jsonUtils";

export default class userController {
    async create(id: string, firstName: string, lastName: string, password: string, email: string, provider: LoginProviderEnum) {
        try {
            const userJson: any = {
                "firstName": firstName,
                "lastName": lastName,
                "password": password,
                "email": email,
                "provider": provider
            };

            userJson["firstName"] = firstName;
            
            const result = await prisma.user.create({
                data: userJson
            })

            return result
        } catch (e) {
            return e;
        }
    }

    async isEmailexists(email: string) {
        const result = await this.getUserByEmail(email);
        return !jsonUtilsImpl.isEmpty(result) === true;
    }

    async getUserByEmail(email: string) {
        const whereJson = {
            "email": email
        }

        const finalQuery = {
            where: whereJson
        }
        const result = await prisma.user.findUnique(finalQuery);
        return result;
    }

    async getUserbyRefreshToken(refresh_token: string) {
        const whereJson = {
            "refresh_token": refresh_token
        }

        const includeJson = {
            User: true
        }

        const finalQuery: any = {
            where: whereJson,
            // include: includeJson
        }
        const result = await prisma.authDetails.findFirst(finalQuery);
        return result;
    }
}