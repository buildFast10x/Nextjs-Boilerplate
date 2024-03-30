import errorHandler from "@/helpers/errorHandler";
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
        try{
            const whereJson = {
                "email": email
            }

            const finalQuery = {
                where: whereJson
            }
            const result = await prisma.user.findUnique(finalQuery);
            return result;
        } catch (e: any) {
            const error = new errorHandler();
            error.internalServerError("Email does not found");
            return error.generateError();
        }
        
    }

    async getUserById(id: string) {
        try {
            const whereJson = {
                "id": id
            }

            const finalQuery = {
                where: whereJson
            }
            const result = await prisma.user.findUnique(finalQuery);
            return result;
        } catch (e) {
            return e;
        }
    }

    async setEmailVerifiedById(id: string) {
        try {
            const dataJson = {
                "emailVerified": new Date()
            }
            const whereJson = {
                "id": id
            }

            const finalQuery = {
                data: dataJson,
                where: whereJson
            }
            const result = await prisma.user.update(finalQuery);
            return result;
        } catch (e) {
            return e;
        }
    }

    async updateData(id: string, email: string) {
        try {
            const dataJson = {
                "emailVerified": new Date(),
                "email": email
            }
            const whereJson = {
                "id": id
            }

            const finalQuery = {
                data: dataJson,
                where: whereJson
            }
            const result = await prisma.user.update(finalQuery);
            return result;
        } catch (e) {
            return e;
        }
    }

    async updatePassword(id: string, password: string) {
        try {
            const dataJson = {
                "password": password
            }
            const whereJson = {
                "id": id
            }

            const finalQuery = {
                data: dataJson,
                where: whereJson
            }
            const result = await prisma.user.update(finalQuery);
            return result;
        } catch (e) {
            return e;
        }
    }

}