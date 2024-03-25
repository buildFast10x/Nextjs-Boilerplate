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
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full max-w-md p-8">

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="uday@buildfast.co.in" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your Email.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="****" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
            <div className="mt-5">
                Didn&apos;t have a account? <Button type="submit" onClick={handleSignupRedirect}>Signup</Button>
            </div>
        </Form>

    )
}

export { loginFormSchema };
