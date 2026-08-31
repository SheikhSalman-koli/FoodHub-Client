import { baseUrl } from "@/lib/api-client"

export interface OrderItemInput {
    id?: string;
    mealId: string;
    name: string;
    price: number;
    quantity: number;
    discount?: number;
    review?: {
    id: string;
    starCount: number;
    comment: string;
  } | null;
}

export interface CreateOrderPayload {
    providerId: string;
    customerId?: string;
    deliveryAddress: string;
    contactNumber: string;
    deliveryFee: number;
    orderItems: OrderItemInput[];
}

interface ProviderData {
    id: string;
    restaurantName: string
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
    provider: ProviderData
}

export const orderServices = {

    createOrder: async (payload: CreateOrderPayload): Promise<OrderResponse> => {
        const res = await baseUrl.post<{ data: OrderResponse, message: string }>('/api/v1/order', payload)
        return res?.data.data
    },

    getMyOrders: async (): Promise<OrderResponse[]> => {
        const res = await baseUrl.get<{ data: OrderResponse[], message: string }>('/api/v1/order')
        return res?.data.data
    },

    getsingleOrder: async (id:string): Promise<OrderResponse> => {
        const res = await baseUrl.get<{ data: OrderResponse, message: string }>(`/api/v1/order/${id}`)
        return res?.data.data
    },

    updateOrderStatus: async (id: string, status: string): Promise<OrderResponse> => {
        const res = await baseUrl.patch<{ data: OrderResponse, message: string }>(`/api/v1/update-status/order/${id}`, { status })
        return res?.data.data
    }

}