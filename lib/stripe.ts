import userInterface from "@/data/user/userInterface";
import Stripe from "stripe";
import { absoluteUrl } from "./utils";
import configEnv from "@/config"

export default class stripeInstance {
    stripe: any 
    stripePriceId: string = ''

    constructor() {
        this.stripe = new Stripe(configEnv.stripe.secret || "", {
            apiVersion: "2023-10-16",
            typescript: true,
        });
    }

    getStripe() {
        return this.stripe;
    }

    setStripePriceId(stripePriceId: string) {
        this.stripePriceId = stripePriceId;
    }

    async getBillingPortal(stripeCustomerId: string, returnUrl: string) {
        const billingPortal = await this.stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: returnUrl
        })
        return billingPortal;
    }

    async createSession(success_url: string, cancel_url: string, user: userInterface) {
        const userId = user.getId();
        const stripeSession = await this.stripe.checkout.sessions.create({
            success_url: absoluteUrl("/dashboard/billing?success=true"),
            cancel_url: absoluteUrl("/dashboard"),
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.getEmail(),
            line_items: [
                {
                    price: this.stripePriceId,
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
            },
        });

        return stripeSession;
    }


    async webhookEvent(body: string, signature: string) {
        const event = await this.stripe.webhooks.constructEvent(
            body,
            signature,
            configEnv.stripe.webhook!
        )
        return event;
    }


    async retriveSubscription(stripeSession: any) {
        const result = await this.stripe.subscriptions.retrieve(
            stripeSession.subscription as string
        )
        return result;
    }

}