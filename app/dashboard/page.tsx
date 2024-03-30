import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { authOptions } from "@/next-auth/config";
import { subscriptionPlansData } from "@/utils/subscriptionPlans";
import { CheckCircle2Icon } from "lucide-react";
// import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import Mail from "./component/mail";
import { ManageUserSubscriptionButton } from "./component/manage-subscription";
import UserMenu from "./component/user-menu";
import checkSubscription from "@/lib/subscription";
import subscriptionInterface from "@/data/subscription/subscriptionInterface";
import { getCurrentUser } from "@/next-auth/utils";

export default async function Dashboard() {
  const session: any = await getCurrentUser();
  const subscription: subscriptionInterface = await checkSubscription();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center p-4">
        <div></div>
        <UserMenu user={session.user} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {subscriptionPlansData.map((plan) => (
          <Card
            key={plan.id}
            className={
              plan.stripePriceId === subscription.stripePriceId ? "border-primary" : ""
            }
          >
            {plan.stripePriceId === subscription.stripePriceId ? (
              <div className="w-full relative">
                <div className="text-center px-3 py-1 bg-secondary-foreground text-secondary text-xs  w-fit rounded-l-lg rounded-t-none absolute right-0 font-semibold">
                  Current Plan
                </div>
              </div>
            ) : null}
            <CardHeader className="mt-2">
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-2 mb-8">
                <h3 className="font-bold">
                  <span className="text-3xl">${plan.price}</span> / month
                </h3>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={`feature_${i + 1}`} className="flex gap-x-2 text-sm">
                    <CheckCircle2Icon className="text-green-400 h-5 w-5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex items-end justify-center">
              {session?.user.email ? (
                <ManageUserSubscriptionButton
                  userId={session.user.id}
                  email={session.user.email || ""}
                  stripePriceId={plan.stripePriceId}
                  stripeCustomerId={subscription?.stripeCustomerId}
                  isSubscribed={subscription.isValid || false}
                  isCurrentPlan={subscription?.stripeCustomerId === plan.stripePriceId}
                />
              ) : (
                <div>
                  <Link href="/account">
                    <Button className="text-center" variant="ghost">
                      Add Email to Subscribe
                    </Button>
                  </Link>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      <Mail />
    </div>
  );
}
