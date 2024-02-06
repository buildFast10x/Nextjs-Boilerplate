"use client"

import User from '@/apiCalls/User';
import StripeAPI from '@/apiCalls/Stripe';
import ResponseHandler from '@/data/ResponseHandler';
import userInterface from '@/data/user/userInterface';
import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store"
import { login } from "@/redux/reducers/auth"
import { Button } from "@/components/ui/button"
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Switch } from "@/components/ui/switch"
import stringUtils from '@/utils/stringUtils';

export default function Page() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const user: userInterface = useAppSelector((state) => state.auth.value.user);
    const [prices, setPrices] = useState<any>([])

    
    useEffect(() => {
        init();
    }, [])

    async function init() {
        const userAPIHandler = new User();
        // Getting API Response HERE 
        const response: ResponseHandler = await userAPIHandler.getCurrentUser();

        const stripeAPIHandler = new StripeAPI();
        const priceData = await stripeAPIHandler.getStripeProductsDetails();

        setPrices(priceData)
        dispatch(login(response.data.data.me))
    }

    async function handleSubscription(e: any, priceId: string) {
        e.preventDefault();
        
        let data = {
            id: priceId,
            headers: {
                "Content-Type": 'application/json'
            }
        }
        const stripeAPIHandler = new StripeAPI();
        const checkout = await stripeAPIHandler.checkoutSubscription(data);
        console.log(checkout);
        router.push(checkout);
    }

    async function handleLogout(e: any) {
        e.preventDefault();

        Cookies.set('access_token', '', { "maxAge": 0 })
        Cookies.set('refresh_token', '', { "maxAge": 0 })
        router.push('/');
    }

    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <p>User Details: {user?.firstName} <br /> {user?.id}</p>

                    <div className="py-12">
                        <Switch /> Monthly
                    </div>
                    <div className="flex flex-row py-12">
                        {
                            !stringUtils.isUndefinedEmptyorNull(prices) ?
                            <>
                                {
                                    prices.map((price: any) => (
                                        <div key={price.id} className="w-1/3 mx-4">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>{price.nickname}</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p>${price.unit_amount/100}/mo</p>
                                                </CardContent>
                                                <CardFooter>
                                                    <Button onClick={(e) => handleSubscription(e, price.id)}>Buy Now</Button>
                                                </CardFooter>
                                            </Card>
                                        </div>
                                    ))
                                }
                            </>
                            :
                            <>
                                No pricing plan available
                            </>
                        }
                    </div>
                    <Button className='mt-5' onClick={(e) => handleLogout(e)}>Logout</Button>
                </div>
            </div>
        </div>
    )
}
