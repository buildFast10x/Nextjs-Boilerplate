import Stripe from 'stripe'
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
    const prices = await stripe.prices.list({
        limit: 3,
    })
    const reverseProductList = prices.data.reverse();

    return NextResponse.json(reverseProductList);
}

export async function POST(request: NextRequest) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
    let data = await request.json();
    const priceId = data.id;

    const session  =  await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
        mode: 'subscription',
        success_url: 'http://localhost:3000/payment/success',
        cancel_url: 'http://localhost:3000/dashboard'
    })

    return NextResponse.json(session.url);
}