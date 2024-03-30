import { getCurrentUser } from "@/next-auth/utils";

import SubscriptionController from "@/controllers/SubscriptionController";
import subscriptionImpl from "@/data/subscription/subscriptionImpl";

export const checkSubscription = async () => {
    const session  = await getCurrentUser();

    if (!session) {
        return false;
    }

    const subscriptionControllerHandler = new SubscriptionController();
    const userSubscriptionDB = await subscriptionControllerHandler.getSubscription(session?.user?.id || '');

    const userSubscription = new subscriptionImpl();
    userSubscription.initFromDataObject(userSubscriptionDB, session);

    if (!userSubscription.getStripeCustomerId()) {
        return false;
    }

    userSubscription.isSubsciptionValid();
    let returnJSON: any = userSubscription.toJson();
    return returnJSON;
};

export default checkSubscription;