import stringUtils from "@/utils/stringUtils";
import userImpl from "../user/userImpl";
import userInterface from "../user/userInterface";
import subscriptionInterface from "./subscriptionInterface";

const DAY_IN_MS = 86_400_000;

export default class subscriptionImpl implements subscriptionInterface {
    id: string = ''
    user: userInterface = new userImpl() ;
    stripeCustomerId?: string
    stripeSubscriptionId?: string
    stripePriceId?: string
    stripeCurrentPeriodEnd?: string
    isValid?: boolean;

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

    getId() {
        return this.id;
    }

    getStripePriceId() {
        return this.stripePriceId || '';
    }

    getStripeCurrentPeriodEnd() {
        return new Date(this.stripeCurrentPeriodEnd || '');
    }

    setIsValid(isValid: boolean) {
        this.isValid = isValid
    }

    getIsValid() {
        return this.isValid;
    }

    isSubsciptionValid() {
        const isValid: boolean = this.getStripePriceId() &&
            this.getStripeCurrentPeriodEnd()?.getTime()! + DAY_IN_MS > Date.now() || false;
        this.setIsValid(isValid);
    }

    toJson() {

        let json: any = {}

        if (!stringUtils.isUndefinedEmptyorNull(this.id)) {
            json['id'] = this.id
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.user)) {
            json['user'] = this.user.toJson();
        }
        
        if (!stringUtils.isUndefinedEmptyorNull(this.stripeCustomerId)) {
            json['stripeCustomerId'] = this.stripeCustomerId
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.stripeSubscriptionId)) {
            json['stripeSubscriptionId'] = this.stripeSubscriptionId
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.stripePriceId)) {
            json['stripePriceId'] = this.stripePriceId
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.stripeCurrentPeriodEnd)) {
            json['stripeCurrentPeriodEnd'] = this.stripeCurrentPeriodEnd
        }

        if (!stringUtils.isUndefinedEmptyorNull(this.isValid)) {
            json['isValid'] = this.isValid
        }

        return json;
    }
}