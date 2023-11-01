import userLoginInterface from "@/app/(Auth)/(login)/_interfaces/userLoginInterface";
import userSignupInterface from "@/app/(Auth)/signup/_interfaces/userSignupInterface";
import ResponseHandler from "@/data/ResponseHandler";
import userImpl from "@/data/user/userImpl";
import userInterface from "@/data/user/userInterface";
import axiosInstance from "@/lib/axiosInstance";
import AllAPIRouteMapping from "@/utils/AllAPIRouteMapping";

export default class User {
    
    async add(data: userSignupInterface) {
        try {
            const axios = new axiosInstance();
            axios.setPayload(data);
            const response: ResponseHandler = await axios.makeCall(AllAPIRouteMapping.users.add.apiPath, AllAPIRouteMapping.users.add.method);
            return response;
        } catch(e: any) {
            const response: ResponseHandler = e;
            return response;
        }    
    }

    async login(data: userLoginInterface) {
        try {
            const axios = new axiosInstance();
            axios.setPayload(data);
            const response: ResponseHandler = await axios.makeCall(AllAPIRouteMapping.users.login.apiPath, AllAPIRouteMapping.users.login.method);
            return response;
        } catch (e: any) {
            const response: ResponseHandler = e;
            return response;
        }
    }

    async getCurrentUser() {
        try {
            // created axios object from 
            const axios = new axiosInstance();
            // Made axios call to backend 
            const response: ResponseHandler = await axios.makeCall(AllAPIRouteMapping.auth.me.apiPath, AllAPIRouteMapping.auth.me.method);
            // returning the response 
            return response;
        } catch (e: any) {
            const response: ResponseHandler = e;
            return response;
        }
    }
}