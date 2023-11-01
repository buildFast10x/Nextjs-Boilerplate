"use client"

import User from '@/apiCalls/User';
import ResponseHandler from '@/data/ResponseHandler';
import userInterface from '@/data/user/userInterface';
import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store"
import { login } from "@/redux/reducers/auth"
import { Button } from "@/components/ui/button"
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function page() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const user: userInterface = useAppSelector((state) => state.auth.value.user);
    
    useEffect(() => {
        init();
    }, [])

    async function init() {
        const userAPIHandler = new User();
        // Getting API Response HERE 
        const response: ResponseHandler = await userAPIHandler.getCurrentUser();
        dispatch(login(response.data.data.me))
    }

    async function handleLogout(e: any) {
        e.preventDefault();

        Cookies.set('access_token', '', { "maxAge": 0 })
        Cookies.set('refresh_token', '', { "maxAge": 0 })
        router.push('/');
    }

    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <p>User Details: {user?.firstName} <br /> {user?.id}</p>
                    <Button className='mt-5' onClick={(e) => handleLogout(e)}>Logout</Button>
                </div>
            </div>
        </div>
    )
}
