import { NextResponse, NextRequest } from "next/server";
import prismaDb from '@/lib/prismadb'
import { stripe } from '@/lib/stripe';
import AuthHelper from "@/helpers/AuthHelper";



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

    const access_token: string = request.cookies.get('access_token')?.value || '';
    const refresh_token: string = request.cookies.get('refresh_token')?.value || '';
    const authHelperHandler = new AuthHelper();
    const user: any = (await authHelperHandler.extractToken(access_token, refresh_token));


    const userId: string = user.id;

    if(!user.id && !user){
        return new NextResponse("Unauthorized",  {status: 401})
    }

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