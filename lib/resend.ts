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
            react: EmailTemplate({ firstName: mailObj.getName() }),
            text: mailObj.getText(),
        });
        return mail;
    }
}
