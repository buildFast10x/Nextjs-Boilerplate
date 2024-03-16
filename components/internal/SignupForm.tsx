"use client"
import React, { useState } from 'react'
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
import { FormError } from './FormError'
import { FormSuccess } from './FormSuccess'

const userFormSchema= z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string()
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match"
    });
  }
});

export default function SignupForm() {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("value", values)

    const axios = new axiosInstance();
    axios.setPayload(values);
    const response = await axios.makeCall(AllAPIRouteMapping.users.add.apiPath, AllAPIRouteMapping.users.add.method);
    if (response?.success) {
      setSuccess(response?.message)
      setError("")
    } else {
      setError(response?.error)
      setSuccess("")
    }
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full max-w-md p-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="Uday" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="uday@buildfast.co.in" {...field} />
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
                <Input placeholder="****" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="****" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <FormError message={error}/>
        <FormSuccess message={success}/>
      </form>
    </Form>

  )
}
