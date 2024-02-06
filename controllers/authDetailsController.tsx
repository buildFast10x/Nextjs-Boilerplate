import prisma from "@/lib/prismadb";

import LoginProviderEnum from "@/enums/LoginProviderEnum";
import jsonUtilsImpl from "@/utils/jsonUtils";

export default class authDetailsController {
    async create(userId: string, verificationToken: string, refresh_token: string, expires_at: Date) {
        try {
            const userJson: any = {
                "userId": userId,
                "verificationToken": verificationToken,
                "refresh_token": refresh_token,
                "expires_at": expires_at.toISOString(),
            };

            const result = await prisma.authDetails.create({
                data: userJson
            })

            return result
        } catch (e) {
            return e;
        }
    }

    async upsert(userId: string, verificationToken: string, refresh_token: string, expires_at: Date) {
        try {
            const userJson: any = {
                "verificationToken": verificationToken,
                "refresh_token": refresh_token,
                "expires_at": expires_at.toISOString(),
            };

            const whereJson = {
                "userId": userId
            }

            const result = await prisma.authDetails.upsert({
                where: whereJson,
                update: userJson,
                create: {
                    "userId": userId,
                    ...userJson
                }
            })

            return result
        } catch (e) {
            return e;
        }
    }
}