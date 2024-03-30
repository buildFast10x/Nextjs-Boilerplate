"use client"
import React, { startTransition, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import userInterface from '@/data/user/userInterface'
import axiosInstance from '@/lib/axios'
import AllAPIRouteMapping from '@/utils/AllAPIRouteMapping'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { FormError } from '../FormError'
import { FormSuccess } from '../FormSuccess'
import { AuthError } from 'next-auth'
import { login } from '@/actions/login'
import { newPasswordSchema } from '@/schemas'

// const newPasswordSchema = z.object({
//     email: z.string().email(),
//     password: z.string(),
// })

export default function NewPasswordForm() {

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof newPasswordSchema>>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof newPasswordSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // console.log("value", values)
        setError("");
        setSuccess("");

        const axios = new axiosInstance();
        const data: any = {
            "password": values.password,
            "token": token
        }
        axios.setPayload(data);
        const response = await axios.makeCall(AllAPIRouteMapping.users.updatePassword.apiPath, AllAPIRouteMapping.users.updatePassword.method);
        if (response?.success) {
            setSuccess(response?.message)
            setError("")
        } else {
            setError(response?.error)
            setSuccess("")
        }

        // startTransition(() => {
        //     login(values)
        //         .then((data) => {
        //             setError(data?.error);
        //             setSuccess(data?.success);
        //             // TODO: Add when we add 2FA

        //         });
        // });
    }


    return (
        <>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Reset Email</CardTitle>
                    <CardDescription>
                        Enter your email below to reset your account
                    </CardDescription>
                </CardHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent>
                            <div className="grid gap-4">

                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input id="password" type="password" required placeholder="****" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Change Password
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Want to login?{" "}
                                <Link href="/" className="underline">
                                    login
                                </Link>
                            </div>

                        </CardContent>
                    </form>
                </Form>
                <div className="px-2 py-5">
                    <FormError message={error} />
                    <FormSuccess message={success} />
                </div>


            </Card>
        </>

    )
}

