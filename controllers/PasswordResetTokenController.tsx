import prisma from "@/lib/prisma";
import jsonUtilsImpl from "@/utils/jsonUtils";
// import jsonUtilsImpl from "@/utils/jsonUtils";

export default class passwordResetTokenController {
    async create(email: string, token: string, expires: any) {
        try {
            const userJson: any = {
                "email": email,
                "token": token,
                "expires": expires
            };

            const result = await prisma.passwordResetToken.create({
                data: userJson
            })

            return result
        } catch (e) {
            return e;
        }
    }

    async deletePasswordResetTokenById(id: string) {
        try {
            const whereJson = {
                "id": id
            }

            const finalQuery = {
                where: whereJson
            }

            await prisma.passwordResetToken.delete(finalQuery);
        } catch (e) {
            return e;
        }
    }

    async getPasswordResetTokenByToken(token: string) {
        try {
            const whereJson = {
                "token": token
            }

            const finalQuery = {
                where: whereJson
            }

            const result = await prisma.passwordResetToken.findUnique(finalQuery);
            return result;
        } catch (e) {
            return e;
        }
    }

    async getPasswordResetTokenByEmail(email: string) {
        try {
            const whereJson = {
                "email": email
            }

            const finalQuery = {
                where: whereJson
            }

            const result = await prisma.passwordResetToken.findFirst(finalQuery);
            return result;
        } catch (e) {
            return e;
        }
    }


}