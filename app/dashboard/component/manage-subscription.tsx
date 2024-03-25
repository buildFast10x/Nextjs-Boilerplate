"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ManageUserSubscriptionButtonProps {
  userId: string;
  email: string;
  isCurrentPlan: boolean;
  isSubscribed: boolean;
  stripeCustomerId?: string | null;
  stripePriceId: string;
}

export function ManageUserSubscriptionButton({
  userId,
  email,
  isCurrentPlan,
  isSubscribed,
  stripeCustomerId,
  stripePriceId,
}: ManageUserSubscriptionButtonProps) {
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const res = await fetch("/api/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            userId,
            isSubscribed,
            isCurrentPlan,
            stripeCustomerId,
            stripePriceId,
          }),
        });
        const session: { url: string } = await res.json();
        if (session) {
          window.location.href = session.url ?? "/dashboard/billing";
        }
      } catch (err) {
        console.error((err as Error).message);
        toast.error("Something went wrong, please try again later.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Button
        disabled={isPending}
        className="w-full"
        variant={isCurrentPlan ? "default" : "outline"}
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isCurrentPlan ? "Manage Subscription" : "Subscribe"}
      </Button>
    </form>
  );
}
