import stringUtils from "@/utils/stringUtils";
import userImpl from "../user/userImpl";
import userInterface from "../user/userInterface";
import subscriptionInterface from "./subscriptionInterface";

export default class subscriptionImpl implements subscriptionInterface {
    id: string = ''
    user: userInterface = new userImpl() ;
    stripeCustomerId?: string
    stripeSubscriptionId?: string
    stripePriceId?: string
    stripeCurrentPeriodEnd?: string

    initFromDataObject(data: any, userSession: any) {

        if (stringUtils.isUndefinedEmptyorNull(data) && stringUtils.isUndefinedEmptyorNull(userSession)) {
            return null;
        }

        if (!stringUtils.isUndefinedEmptyorNull(data?.id)) {
            this.id = data?.id
        }

        if (!stringUtils.isUndefinedEmptyorNull(data?.stripeCustomerId)) {
            this.stripeCustomerId = data?.stripeCustomerId
        }
        
        if (!stringUtils.isUndefinedEmptyorNull(data?.stripeSubscriptionId)) {
            this.stripeSubscriptionId = data?.stripeSubscriptionId
        }

        if (!stringUtils.isUndefinedEmptyorNull(data?.stripePriceId)) {
            this.stripePriceId = data?.stripePriceId
        }

        if (!stringUtils.isUndefinedEmptyorNull(data?.stripeCurrentPeriodEnd)) {
            this.stripeCurrentPeriodEnd = data?.stripeCurrentPeriodEnd
        }

        if (!stringUtils.isUndefinedEmptyorNull(userSession)) {
            this.user.initFromDataObject(userSession.user);
        }
    }

    getStripeCustomerId() {
        return this.stripeCustomerId || '';
    }

    getUser() {
        return this.user;
    }
}