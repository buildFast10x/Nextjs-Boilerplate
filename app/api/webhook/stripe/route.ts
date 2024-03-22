
import { stripe } from "@/stripe";
import { headers } from "next/headers";
import type Stripe from "stripe";
import prisma from "@/lib/prisma";

import configEnv from "@/config"
export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      configEnv.stripe.webhook || ""
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;
  // console.log("this is the session metadata -> ", session);

  if (!session?.metadata?.userId && session.customer == null) {
    return new Response(null, {
      status: 200,
    });
  }

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    const updatedData = {
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    };

    if (session?.metadata?.userId != null) {
      await prisma.subscription.upsert({
        where: { userId: session.metadata.userId },
        update: { ...updatedData, userId: session.metadata.userId },
        create: { ...updatedData, userId: session.metadata.userId },
      });
    } else if (
      typeof session.customer === "string" &&
      session.customer != null
    ) {
      await prisma.subscription.update({
        where: { stripeCustomerId: session.customer },
        data: updatedData,
      });
    }
  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // Update the price id and set the new period end.
    await prisma.subscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  return new Response(null, { status: 200 });
}
