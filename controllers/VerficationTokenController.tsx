import prisma from "@/lib/prisma";
import jsonUtilsImpl from "@/utils/jsonUtils";
// import jsonUtilsImpl from "@/utils/jsonUtils";

export default class verficationTokenController {
    async create(email: string, token: string, expires: any) {
        try {
            const userJson: any = {
                "email": email,
                "token": token,
                "expires": expires
            };

            const result = await prisma.verificationToken.create({
                data: userJson
            })

            return result
        } catch (e) {
            return e;
        }
    }

    async deleteVerificationTokenById(id: string) {
        try {
            const whereJson = {
                "id": id
            }

            const finalQuery = {
                where: whereJson
            }
            
            await prisma.verificationToken.delete(finalQuery);
        } catch (e) {
            return e;
        }
    }

    async getVerificationTokenByToken(token: string) {
        try {
            const whereJson = {
                "token": token
            }

            const finalQuery = {
                where: whereJson
            }
            
            const result = await prisma.verificationToken.findUnique(finalQuery);
            return result;
        } catch (e) {
            return e;
        }
    }

    async getVerificationTokenByEmail(email: string) {
        try {
            const whereJson = {
                "email": email
            }

            const finalQuery = {
                where: whereJson
            }

            const result = await prisma.verificationToken.findFirst(finalQuery);
            return result;
        } catch (e) {
            return e;
        }
    }


}