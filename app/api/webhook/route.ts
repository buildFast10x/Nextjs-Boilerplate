import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prismaDb from '@/lib/prismadb'
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
    const body =  await request.text();
    const signature = headers().get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error) {
        return NextResponse.json(`Webhook Error`, {status: 400})
    }

    const session  = event.data.object as Stripe.Checkout.Session;

    if(event.type === "checkout.session.completed"){
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        if(!session?.metadata?.userId){
            return new NextResponse("user id is required", {status: 400})
        }

        await prismaDb.userSubscription.create({
            data: {
                userId: session?.metadata?.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                ),
                stripeSubscriptionType: subscription.items.data[0].price.nickname as string,
            }
        })
    }

    if(event.type === 'invoice.payment_succeeded'){
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        await prismaDb.userSubscription.update({
            where: {
                stripeSubscriptionId: subscription.id
            },
            data: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                ),
                stripeSubscriptionType: subscription.items.data[0].price.nickname as string,
            }
        })
    }

    return new NextResponse(null, {status: 200})
     
}