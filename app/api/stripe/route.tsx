import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import stripeInstance from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import errorHandler from "@/helpers/errorHandler";
import { getCurrentUser } from "@/next-auth/utils";
import SubscriptionController from "@/controllers/SubscriptionController";
import subscriptionImpl from "@/data/subscription/subscriptionImpl";

const dashboardUrl = absoluteUrl("/dashboard");

export async function POST(req: NextRequest) {
    try {   
        const user = await getCurrentUser();
        const { stripePriceId } = await req.json();

        if (!user || !user.user) {
            const error = new errorHandler();
            error.notFound();
            return error.generateError();
        }

        const subscriptionControllerHandler = new SubscriptionController();
        const userSubscriptionDB = await subscriptionControllerHandler.findUnique(user?.user?.id || '');

        const userSubscription = new subscriptionImpl();
        userSubscription.initFromDataObject(userSubscriptionDB, user);

        const stripe = new stripeInstance();

        if (userSubscription && userSubscription.getStripeCustomerId()) {
            const stripeSession = await stripe.getBillingPortal(userSubscription.getStripeCustomerId(), dashboardUrl);
            return new NextResponse(JSON.stringify({ url: stripeSession.url }))
        }

        stripe.setStripePriceId(stripePriceId);
        const stripeSession = await stripe.createSession(dashboardUrl, dashboardUrl, userSubscription.getUser());
        return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    } catch (e: any) {
        const error = new errorHandler();
        error.internalServerError(e);
        return error.generateError();
    }
}