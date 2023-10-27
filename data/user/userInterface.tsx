import { LoginProviderEnum } from "@/enums/LoginProviderEnum"
import authDetailsInterface from "../authDetails/authDetailsInterface"

export default interface userInterface {
    id: string
    firstName: string
    lastName: string
    password: string 
    email: string
    emailVerified: Date
    provider: LoginProviderEnum
    providerId: String 

    authDetials: authDetailsInterface

    createdAt: Date
    updatedAt: Date
}