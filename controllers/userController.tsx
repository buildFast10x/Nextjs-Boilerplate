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
        const whereJson = {
            "email": email
        }
        
        const finalQuery = {
            where: whereJson
        }
        const result = await prisma.user.findUnique(finalQuery);
        return jsonUtilsImpl.isEmpty(result) === false;
    }
}