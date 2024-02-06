import LoginProviderEnum from "@/enums/LoginProviderEnum";

export default interface userSignupInterface {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    cfpassword: string,
    provider?: LoginProviderEnum
}