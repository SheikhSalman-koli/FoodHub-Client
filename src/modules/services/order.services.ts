import { baseUrl } from "@/lib/api-client"

// 🎯 ১. ইন্টারফেস এবং টাইপ ডেফিনিশন
export interface OrderItemInput {
    mealId: string;
    name: string;
    price: number;
    quantity: number;
    discount?: number;
}

export interface CreateOrderPayload {
    providerId: string;
    customerId?: string;
    deliveryAddress: string;
    contactNumber: string;
    deliveryFee: number;
    orderItems: OrderItemInput[];
}

export interface OrderResponse {
    id: string;
    customerId: string;
    providerId: string;
    totalAmount: number;
    subtotal: number;
    deliveryFee: number;
    deliveryAddress: string;
    contactNumber: string;
    status: string; 
    createdAt: string;
}

// 🎯 ২. সেন্ট্রালাইজড এপিআই লজিক
export const orderServices = {

    // নতুন অর্ডার ক্রিয়েট করা
    createOrder: async (payload: CreateOrderPayload): Promise<OrderResponse> => {
        const res = await baseUrl.post<{ data: OrderResponse, message: string }>('/api/v1/order', payload)
        return res?.data.data
    },

    // ইউজারের নিজের সব অর্ডারগুলো দেখা (হিস্ট্রি পেজের জন্য)
    // getMyOrders: async (): Promise<OrderResponse[]> => {
    //     const res = await baseUrl.get<{ data: OrderResponse[], message: string }>('/api/v1/order/my-orders')
    //     return res?.data.data
    // },

    // নির্দিষ্ট একটি অর্ডারের বিস্তারিত দেখা (সাকসেস বা ডিটেইলস পেজের জন্য)
    // getOrderById: async (id: string): Promise<OrderResponse> => {
    //     const res = await baseUrl.get<{ data: OrderResponse, message: string }>(`/api/v1/order/single/${id}`)
    //     return res?.data.data
    // }

}