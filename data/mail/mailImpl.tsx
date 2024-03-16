import stringUtils from "@/utils/stringUtils";
import mailInterface from "./mailInterface";

export default class mailImpl implements mailInterface {
    name: string = '';
    email: string = '';
    from: string = '';
    subject: string = '';
    text: string = '';

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
        return this.text
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }
}