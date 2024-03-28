"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FormSuccess } from "../FormSuccess";
import { FormError } from "../FormError";
import axiosInstance from "@/lib/axios";
import AllAPIRouteMapping from "@/utils/AllAPIRouteMapping";


export default function NewVerificationForm() {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams();

    const token = searchParams.get("token");


    const onSubmit = useCallback(async () => {
        if (success || error) return;

        if (!token) {
            setError("Missing token!");
            return;
        }

        const axios = new axiosInstance()
        const data = {
            "token": token
        };
        axios.setPayload(data);
        const response = await axios.makeCall(AllAPIRouteMapping.users.verify.apiPath, AllAPIRouteMapping.users.verify.method);
        if (response?.success) {
            setSuccess(response?.message)
            setError("")
        } else {
            setError(response?.error)
            setSuccess("")
        }
        // newVerification(token)
        //     .then((data) => {
        //         setSuccess(data.success);
        //         setError(data.error);
        //     })
        //     .catch(() => {
        //         setError("Something went wrong!");
        //     })
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);


    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center w-full justify-center">
                    <FormSuccess message={success} />
                    {!success && (
                        <FormError message={error} />
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}