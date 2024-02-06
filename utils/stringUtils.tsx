export default class stringUtils {
    constructor() { };

    static isUndefinedEmptyorNull(data: any) {
        if (data === undefined || data === '' || data === null) {
            return true;
        }
        return false;
    }

}