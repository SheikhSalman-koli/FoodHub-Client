'use server'

import { CreateOrderPayload, orderServices } from "../services/order.services";
import { userServices } from "../services/user.service";


export const createOrderAction = async (payload: CreateOrderPayload) => {
    try {
        const user = await userServices.getSessionUser()
        if (!user) {
            return { success: false, error: "অর্ডার করতে প্রথমে লগইন করুন।" };
        }

        // ২. ক্লায়েন্টের পাঠানো ডাটার সাথে সিকিউরলি 'customerId' ইনজেক্ট করুন
        const finalPayload: CreateOrderPayload = {
            ...payload,
            customerId: user.id // 🎯 Better Auth থেকে আসা রিয়াল আইডি এখানে বসে গেল
        };

        const orderData = await orderServices.createOrder(finalPayload);
        return { 
            success: true, 
            data: orderData ,
            message: "ifjhoui"
        };
    } catch (error: unknown) {

        const message = error instanceof Error ? error.message : String(error) || "অর্ডার প্লেস করতে ব্যর্থ হয়েছে।";

        return { 
            success: false, 
            error: message
        };
    }
}