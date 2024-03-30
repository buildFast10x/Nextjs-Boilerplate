export default interface mailInterface {
    name: string;
    email: string;
    from: string;
    subject: string;
    text?: string;
    html?: string;

    getFrom(): string;

    setSubject(subject: string): void;
    getSubject(): string;
    
    setEmail(email: string): void;
    getEmail(): string;

    getName(): string;
    getText(): string;
    
    setHTML(html: string): void;
    getHTML(): string;

}