import errorHandler from "@/helpers/errorHandler";
import prisma from "@/lib/prisma";
import jsonUtilsImpl from "@/utils/jsonUtils";
// import jsonUtilsImpl from "@/utils/jsonUtils";

export default class SubscriptionController {

    async create(userId: string, subscription: any) {
        try {
            const data = {
                "userId": userId,
                "stripeSubscriptionId": subscription.id,
                "stripeCustomerId": subscription.customer as string,
                "stripePriceId": subscription.items.data[0].price.id,
                "stripeCurrentPeriodEnd": new Date(
                    subscription.current_period_end * 1000
                ),
            }
            const reuult = await prisma.subscription.create({data});
        } catch (e) {
            const error = new errorHandler();
            error.internalServerError(e);
            return error.generateError();
        }
    }

    async findUnique(userIdData: string) {
        try {
            const result = await prisma.subscription.findUnique({
                where: {
                    userId: userIdData
                }
            })
            return result
        } catch(e) {
            const error = new errorHandler();
            error.internalServerError(e);
            return error.generateError();
        }
    }

    async update(subscription: any) {
        try {

            const dataJson = {
                "stripePriceId": subscription.items.data[0].price.id,
                "stripeCurrentPeriodEnd": new Date(
                    subscription.current_period_end * 1000
                ),
            }
            const whereJson = {
                "stripeSubscriptionId": subscription.id,
            }

            const result = await prisma.subscription.update({
                where: whereJson,
                data: dataJson
            })
            return result;
            
        } catch (e) {
            const error = new errorHandler();
            error.internalServerError(e);
            return error.generateError();
        }
    }

    async getSubscription(userId: string) { 
        try {

            const whereJson = {
                "userId": userId
            }

            const selectJson = {
                "stripeSubscriptionId": true,
                "stripeCurrentPeriodEnd": true,
                "stripeCustomerId": true,
                "stripePriceId": true,
            }

            const subscription = await prisma.subscription.findUnique({
                where: whereJson,
                select: selectJson
            })

            return subscription;

        } catch (e) {
            const error = new errorHandler();
            error.internalServerError(e);
            return error.generateError();
        }
    }

}