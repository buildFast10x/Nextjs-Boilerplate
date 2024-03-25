export default interface mailInterface {
    name: string;
    email: string;
    from: string;
    subject: string;
    text: string;

    getFrom(): string;
    getSubject(): string;
    getEmail(): string;
    getName(): string;
    getText(): string;
}