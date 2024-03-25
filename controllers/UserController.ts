import prisma from "@/lib/prisma";
import jsonUtilsImpl from "@/utils/jsonUtils";
// import jsonUtilsImpl from "@/utils/jsonUtils";

export default class userController {
    async create(name: string, password: string, email: string) {
        try {
            const userJson: any = {
                "name": name,
                "password": password,
                "email": email
            };

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

}