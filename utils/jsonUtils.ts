import stringUtils from "./stringUtils";

export default class jsonUtilsImpl {

    public static isEmpty(data: any) {
        if (!stringUtils.isUndefinedEmptyorNull(data) && Object.keys(data).length !== 0) {
            return false;
        }
        return true;
    }

    static toString(json: any) {
        return JSON.stringify(json);
    }

}