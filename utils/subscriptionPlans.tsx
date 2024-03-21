export type subscriptionPlanInterface = {
    id: string;
    name: string;
    description: string;
    stripePriceId: string;
    price: number;
    features: Array<string>;
}



export const subscriptionPlansData: subscriptionPlanInterface[] = [
    {
        id: "pro",
        name: "Pro",
        description: "Pro tier that offers x, y, and z features.",
        stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ?? "",
        price: 19,
        features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
        id: "max",
        name: "Max",
        description: "Super Pro tier that offers x, y, and z features.",
        stripePriceId: process.env.NEXT_PUBLIC_STRIPE_MAX_PRICE_ID ?? "",
        price: 39,
        features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
        id: "ultra",
        name: "Ultra",
        description: "Ultra Pro tier that offers x, y, and z features.",
        stripePriceId: process.env.NEXT_PUBLIC_STRIPE_ULTRA_PRICE_ID ?? "",
        price: 59,
        features: ["Feature 1", "Feature 2", "Feature 3"],
    },
];

async function getPlanByStripePriceId(stripePriceId: string) {
    return await subscriptionPlansData.find(
        (plan) => plan.stripePriceId === stripePriceId)
}