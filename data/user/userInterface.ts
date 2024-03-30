import UserRoleEnum from "@/enums/UserRoleEnum";

export default interface userInterface {
    name: string,
    email: string,
    emailVerified: boolean,
    password?: string
    role?: UserRoleEnum
    image?: string

    initFromDataObject(data: any): void;
    getEmail(): void;
    getId(): void;
    toJson(): any;
}