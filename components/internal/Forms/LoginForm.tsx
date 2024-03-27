"use client"
import React, { startTransition } from 'react'
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
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"


const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export default function LoginForm() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get("callbackUrl");

    function handleSignupRedirect() {
        router.push('/signup');
    }

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof loginFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log("value", values)

        signIn("credentials", values);

        // // startTransition(() => {
        // login(values, callbackUrl)
        //     .then((data) => {
        //         // if (data?.error) {
        //         //     form.reset();
        //         //     setError(data.error);
        //         // }

        //         // if (data?.success) {
        //         //     form.reset();
        //         //     setSuccess(data.success);
        //         // }

        //         // if (data?.twoFactor) {
        //         //     setShowTwoFactor(true);
        //         // }
        //         console.log("success")
        //     }).catch(() => console.log("Something is wrong"));
        // // });
    }

    return (
        <>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent>
                            <div className="grid gap-4">
                                
                                    <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input id="email"
                                                        type="email"
                                                        placeholder="m@example.com"
                                                        required {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center">
                                                        <FormLabel>Password</FormLabel>
                                                        <Link href="#" className="ml-auto inline-block text-sm underline">
                                                            Forgot your password?
                                                        </Link>
                                                    </div>
                                                    <FormControl>
                                                        <Input id="password" type="password" required placeholder="****" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>
                                
                                <Button variant="outline" className="w-full">
                                    Login with Google
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/signup" className="underline">
                                    Sign up
                                </Link>
                            </div>
                        </CardContent>
                    </form>
                </Form>
            </Card>
        </>

    )
}

export { loginFormSchema };
