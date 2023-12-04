import Stripe from 'stripe'
import { NextResponse, NextRequest } from "next/server";
import { useAppSelector } from '@/redux/store';
import userInterface from '@/data/user/userInterface';
import prismaDb from '@/lib/prismadb'
import { stripe } from '@/lib/stripe';



export async function GET() {
    const prices = await stripe.prices.list({
        limit: 3,
    })
    const reverseProductList = prices.data.reverse();

    return NextResponse.json(reverseProductList);
}

export async function POST(request: NextRequest) {
    let data = await request.json();
    const priceId = data.id;

    // const user: userInterface = useAppSelector((state) => state.auth.value.user);

    const userId: string = '72e3a86a-b830-4d2a-a211-f344a0756b2f';

    // if(!user.id && !user){
    //     return new NextResponse("Unauthorized",  {status: 401})
    // }

    const userSubscription = await prismaDb.userSubscription.findUnique({
        where: {
            userId
        }
    })

    if(userSubscription && userSubscription.stripeCustomerId){
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId
        })

        return NextResponse.json(stripeSession.url);
    }


    const session  =  await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
        mode: 'subscription',
        success_url: 'http://localhost:3000/payment/success',
        cancel_url: 'http://localhost:3000/dashboard',
        metadata: {
            userId
        }
    })

    return NextResponse.json(session.url);
}