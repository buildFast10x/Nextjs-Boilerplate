import LoginProviderEnum from "@/enums/LoginProviderEnum"
import authDetailsInterface from "../authDetails/authDetailsInterface"
import { JsonObject } from "@prisma/client/runtime/library"

export default interface userInterface {
    id: string
    firstName: string
    lastName: string
    password: string 
    email: string
    emailVerified: Date
    provider: LoginProviderEnum
    providerId: string 

    authDetials: authDetailsInterface

    createdAt: Date
    updatedAt: Date

    toJson(): any
}