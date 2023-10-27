import userInterface from "../user/userInterface"

export default interface authDetailsInterface {
    id: string
    user: userInterface
    verificationToken: string
    refresh_token: string
    expires_at: Number

    createdAt: Date
    updatedAt: Date
}