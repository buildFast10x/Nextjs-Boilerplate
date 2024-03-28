import { z } from "zod";

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})


export {
    loginFormSchema
}