export default interface userInterface {
    name: string,
    email: string,
    emailVerified: boolean,
    password?: string
    image?: string

    initFromDataObject(data: any): void;
    getEmail(): void;
    getId(): void;
}