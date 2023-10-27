export default class jsonUtilsImpl {

    public static isEmpty(data: any) {
        if (Object.keys(data).length === 0) {
            return true;
        }
        return false;
    }

    static toString(json: any) {
        return JSON.stringify(json);
    }

}