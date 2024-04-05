import stringUtils from "@/utils/stringUtils";
import mailInterface from "./mailInterface";
import configEnv from "@/config";

export default class mailImpl implements mailInterface {
    name: string = '';
    email: string = '';
    from: string = '';
    subject: string = '';
    text?: string = '';
    html?: string;

    initFromDataObject(data: any) {
        if (!stringUtils.isUndefinedEmptyorNull(data.name)) {
            this.name = data.name
        }

        if (!stringUtils.isUndefinedEmptyorNull(data.name)) {
            this.name = data.name
        }

        if (!stringUtils.isUndefinedEmptyorNull(data.from)) {
            this.from = data.from
        }

        if (!stringUtils.isUndefinedEmptyorNull(data.subject)) {
            this.subject = data.subject
        }

        if (!stringUtils.isUndefinedEmptyorNull(data.text)) {
            this.text = data.text
        }
    }

    setFrom(from: string) {
        this.from = from
    }

    getFrom(): string {
        return this.from;
    }

    setSubject(subject: string) {
        this.subject = subject
    }

    getSubject(): string {
        return this.subject;
    }

    setText(text: string) {
        this.text = text
    }

    getText() {
        return this.text || ''
    }

    setHTML(html: string) {
        this.html = html;
    }

    getHTML() {
        return this.html || ''
    }

    getName() {
        return this.name;
    }

    setEmail(email: string) {
        this.email = email;
    }

    getEmail() {
        return this.email;
    }

    populateTestCredentials() {
        this.from = "onboarding@resend.dev";
    }

    populateProdCredentials() {
        this.from = "onboarding@buildfast.co.in";
    }

    populateCredentials() {
        if (configEnv.nextEnv === 'dev') {
            this.populateTestCredentials();
        } else {
            // TODO: Chagne to prod 
            this.populateProdCredentials();
        }
    }
}