import { z } from "zod";

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

const resetFormSchema = z.object({
    email: z.string().email()
})

const newPasswordSchema = z.object({
    password: z.string()
})


export {
    loginFormSchema,
    resetFormSchema,
    newPasswordSchema
}