import userInterface from "../user/userInterface"

export default interface authDetailsInterface {
    id?: string
    user: userInterface
    verificationToken: string
    refresh_token: string
    expires_at: Date

    createdAt: Date
    updatedAt: Date

    getUser(): userInterface
    toJson(): any
}