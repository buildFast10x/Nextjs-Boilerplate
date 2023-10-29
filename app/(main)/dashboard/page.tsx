"use client"

import User from '@/apiCalls/User';
import ResponseHandler from '@/data/ResponseHandler';
import userInterface from '@/data/user/userInterface';
import React, { ReactNode, useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store"
import { login } from "@/redux/reducers/auth"

export default function page() {
    const dispatch = useDispatch<AppDispatch>();
    const user: userInterface = useAppSelector((state) => state.auth.value.user);

    useEffect(() => {
        init();
    }, [])

    async function init() {
        const userAPIHandler = new User();
        const response: ResponseHandler = await userAPIHandler.getCurrentUser();
        dispatch(login(response.data.data.me))
    }
    return (
        <div>user: {user?.firstName} {user?.id}</div>
    )
}
