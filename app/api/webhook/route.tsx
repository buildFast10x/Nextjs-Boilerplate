import Stripe from "stripe"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import prismadb from "@/lib/prisma"
import stripeInstance  from "@/lib/stripe"
import errorHandler from "@/helpers/errorHandler"
import SubscriptionController from "@/controllers/SubscriptionController"

export async function POST(req: NextRequest) {
    const body = await req.text()
    const signature = headers().get("Stripe-Signature") as string

    let event: Stripe.Event

    const stripe = new stripeInstance();

    try {
        event = await stripe.webhookEvent(body, signature)
    } catch (e: any) {
        const error = new errorHandler();
        error.internalServerError(e);
        return error.generateError();
    }

    const session = event.data.object as Stripe.Checkout.Session

    // ÇHECKOUT COMPLETED
    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.retriveSubscription(session);

        if (!session?.metadata?.userId) {
            const error = new errorHandler();
            error.missingItem("User Id is required");
            return error.generateError();
        }

        const subscriptionControllerHandler = new SubscriptionController();
        await subscriptionControllerHandler.create(session?.metadata?.userId, subscription)
    }

    // PAYMENT SUCCEDDED 
    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.retriveSubscription(session);

        const subscriptionControllerHandler = new SubscriptionController();
        await subscriptionControllerHandler.update(subscription);
    }

}