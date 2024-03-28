import NextAuth, { type DefaultSession } from "next-auth"
import UserRoleEnum from "./enums/UserRoleEnum"

export type ExtendedUser = DefaultSession["user"] & {
    role: string
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}
