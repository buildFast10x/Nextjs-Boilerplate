"use client"

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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import userLoginInterface from "./_interfaces/userLoginInterface"
import User from "@/apiCalls/User"
import ResponseHandler from "@/data/ResponseHandler"

import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';
import userInterface from "@/data/user/userInterface"

const loginSchema: z.ZodType<userLoginInterface> = z.object({
    email: z.string().min(2, {
        message: "Email must be at least 2 characters.",
    }),
    password: z.string()
})

export default function Login() {

    const router = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(data: z.infer<typeof loginSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const userAPIHandler = new User();
        const response: ResponseHandler = await userAPIHandler.login(data);
        if(response.data.success) {
            router.push('/dashboard');
        }
    }

    function handleSignupRedirect() {
        router.push('/signup');
    }

    const user: userInterface = useAppSelector((state) => state.auth.value.user);

    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
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
                                            <Input placeholder="shadcn" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                    <div className="mt-5">
                        Didn't have a account? <Button type="submit" onClick={handleSignupRedirect}>Signup</Button>
                    </div>
                </div>
               
            </div>
        </div>
    )
}
