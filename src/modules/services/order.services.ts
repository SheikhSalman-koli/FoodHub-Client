import { baseUrl } from "@/lib/api-client"

// 🎯 ১. ইন্টারফেস এবং টাইপ ডেফিনিশন
export interface OrderItemInput {
    id?: string;
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
    discountedAmount: number;
    subtotal: number;
    deliveryFee: number;
    deliveryAddress: string;
    contactNumber: string;
    status: string;
    createdAt: string;
    orderItems: OrderItemInput[];
}

// 🎯 ২. সেন্ট্রালাইজড এপিআই লজিক
export const orderServices = {

    // নতুন অর্ডার ক্রিয়েট করা
    createOrder: async (payload: CreateOrderPayload): Promise<OrderResponse> => {
        const res = await baseUrl.post<{ data: OrderResponse, message: string }>('/api/v1/order', payload)
        return res?.data.data
    },

    // ইউজারের নিজের সব অর্ডারগুলো দেখা (হিস্ট্রি পেজের জন্য)
    getMyOrders: async (): Promise<OrderResponse[]> => {
        const res = await baseUrl.get<{ data: OrderResponse[], message: string }>('/api/v1/order')
        return res?.data.data
    },

    // নির্দিষ্ট একটি অর্ডারের status আপডেট করা
    updateOrderStatus: async (id: string, status: string): Promise<OrderResponse> => {
        const res = await baseUrl.patch<{ data: OrderResponse, message: string }>(`/api/v1/update-status/order/${id}`, { status })
        return res?.data.data
    }

}