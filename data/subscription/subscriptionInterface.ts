import userInterface from "../user/userInterface";

export default interface subscriptionInterface {
    id: string
    user: userInterface
    stripeCustomerId? : string
    stripeSubscriptionId?: string
    stripePriceId?: string
    stripeCurrentPeriodEnd? : string
    isValid?: boolean;

    getStripePriceId(): string;
}