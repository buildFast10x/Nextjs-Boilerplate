import AllAPIRouteMapping from "@/utils/AllAPIRouteMapping";
import axiosInstance from "@/lib/axiosInstance";
import ResponseHandler from "@/data/ResponseHandler";


export default class StripeAPI{
    async getStripeProductsDetails() {
        try {
            const axios = new axiosInstance();
            const response: ResponseHandler = await axios.makeCall(AllAPIRouteMapping.stripe.getProducts.apiPath, AllAPIRouteMapping.stripe.getProducts.method);
            return response.data;
        } catch(e: any) {
            const response: ResponseHandler = e;
            return response;
        }    
    }

    async checkoutSubscription(data: any){
        try {
            const axios = new axiosInstance();
            axios.setPayload(data);
            const response: ResponseHandler = await axios.makeCall(AllAPIRouteMapping.stripe.checkoutProduct.apiPath, AllAPIRouteMapping.stripe.checkoutProduct.method);
            return response.data;
        } catch(e: any) {
            const response: ResponseHandler = e;
            return response;
        }    
    }
}