import { Resend } from "resend";
import { EmailTemplate } from "@/utils/emailTemplates";
import mailInterface from "@/data/mail/mailInterface";
import configEnv from "@/config"

export default class resendInstance {
    resend: any;

    constructor() {
        this.resend = new Resend(configEnv.resend.apiKey);
    }

    async sendMail(mailObj: mailInterface) {
        const mail = await this.resend.emails.send({
            from: mailObj.getFrom(),
            to: mailObj.getEmail(),
            subject: mailObj.getSubject(),
            text: mailObj.getText(),
        });
        return mail;
    }

    async sendHTMLMail(mailObj: mailInterface) {
        const mail = await this.resend.emails.send({
            from: mailObj.getFrom(),
            to: mailObj.getEmail(),
            subject: mailObj.getSubject(),
            html: mailObj.getHTML(),
        }); 
        return mail;
    }

    async sendVerificationEmail(email: string, token: string, mailObj: mailInterface) {
        const confirmLink = `${configEnv.app.url}/auth/new-verification?token=${token}`;
        mailObj.setEmail(email);
        mailObj.setSubject("Confirm your email");
        mailObj.setHTML(`<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`);
        const result = await this.sendHTMLMail(mailObj);
        return result;
    }

    async sendPasswordResetMail(email: string, token: string, mailObj: mailInterface) {
        const confirmLink = `${configEnv.app.url}/auth/new-password?token=${token}`;
        mailObj.setEmail(email);
        mailObj.setSubject("Reset Your Password");
        mailObj.setHTML(`<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`);
        this.sendHTMLMail(mailObj);

    }

}
