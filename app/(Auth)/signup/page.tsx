"use client"
import User from "@/apiCalls/User"
import userSignupInterface from "@/app/(Auth)/signup/_interfaces/userSignupInterface"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import ResponseHandler from "@/data/ResponseHandler"
import LoginProviderEnum from "@/enums/LoginProviderEnum"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"


const userSchema: z.ZodType<userSignupInterface> = z.object({
    firstName: z.string().max(150, {
        message: "Character Limit Exceeded",
    }),
    lastName: z.string().max(150, {
        message: "Character Limit Exceeded",
    }),
    email: z.string().min(2, {
        message: "Email must be at least 2 characters.",
    }),
    password: z.string(),
    cfpassword: z.string()
})

export default function Login() {

    const [formStatus, setFormStatus] = useState<formResponseInterface>()
    const { toast } = useToast()
    
    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            cfpassword: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(data: z.infer<typeof userSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if(data.cfpassword !== data.password) {
            setFormStatus({
                className: 'text-red-600',
                message: 'Password does not match.',
            });
            return;
        }
        
        const userAPIHandler = new User();
        data.provider = LoginProviderEnum.SELF;
        const response: ResponseHandler = await userAPIHandler.add(data);
        if(response.data.success) {
            setFormStatus({
                className: 'text-green-600',
                message: response.data.message || '',
            });
        } else {
            setFormStatus({
                className: 'text-red-600',
                message: response.data.message || '',
            });
        }
        
    }

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
                                            <Input placeholder="xyz@company.com" type="email" {...field} required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>firstName</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Test" {...field} required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>lastName</FormLabel>
                                        <FormControl>
                                            <Input placeholder="User" {...field} required />
                                        </FormControl>
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
                                            <Input placeholder="password" {...field} required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cfpassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="confirm password" {...field} required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                        <p className={formStatus?.className}>{
                            formStatus?.message
                        }</p>
                    </Form>
                    {/* <Toaster /> */}
                </div>
            </div>
        </div>
    )
}
