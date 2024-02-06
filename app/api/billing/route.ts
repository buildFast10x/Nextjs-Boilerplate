import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/stripe";

interface ManageStripeSubscriptionActionProps {
    isSubscribed: boolean;
    stripeCustomerId?: string | null;
    isCurrentPlan: boolean;
    stripePriceId: string;
    email: string;
    userId: string;
}

export async function POST(req: Request) {
    const body: ManageStripeSubscriptionActionProps = await req.json();
    const { isSubscribed, stripeCustomerId, userId, stripePriceId, email } = body;

    if (isSubscribed && stripeCustomerId) {
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: absoluteUrl("/dashboard"),
        });

        return new Response(JSON.stringify({ url: stripeSession.url }), {
            status: 200,
        });
    }

    const stripeSession = await stripe.checkout.sessions.create({
        success_url: absoluteUrl("/dashboard/billing?success=true"),
        cancel_url: absoluteUrl("/dashboard"),
        payment_method_types: ["card"],
        mode: "subscription", 
        billing_address_collection: "auto",
        customer_email: email,
        line_items: [
            {
                price: stripePriceId,
                quantity: 1,
            },
        ],
        metadata: {
            userId,
        },
    });

    return new Response(JSON.stringify({ url: stripeSession.url }), {
        status: 200,
    });
}
