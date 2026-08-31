import { baseUrl } from "@/lib/api-client";
import { headers } from "next/headers";

export interface UserData {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    role: "ADMIN" | "PROVIDER" | "CUSTOMER";
    status: "ACTIVATE" | "INACTIVE";
    image?: string | null;
    isDeleted: boolean;
    emailVerified: boolean;
    deliveryAddress?: string | null;
    createdAt: string;
    updatedAt: string;
}

interface Meal {
    id: string;
    name: string;
    image?: string | null;
}

interface OrderItem {
    id: string;
    quantity: number;
    price: number;
    meal: Meal;
}

interface Order {
    id: string;
    status: string;
    createdAt: string;
    orderItems: OrderItem[];
}

interface Review {
    id: string;
    comment: string;
    starCount: number;
    createdAt: string;
    meal: Meal;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    deliveryAddress?: string | null;
    image?: string | null;
    createdAt: string;
    _count: {
        orders: number;
        reviews: number;
    };
    orders: Order[];
    reviews: Review[];
}
// ==========================================
export interface UpdatedPassword {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string
}

export const userServices = {

    getSessionUser: async () => {
        try {
            const nextHeaders = await headers();
            const cookie = nextHeaders.get("cookie");

            if (!cookie) return null;

            //Rewrite থাকায় ফ্রন্টএন্ড ডোমেইনেই fetch কল কাজ করবে
            const response = await fetch(`https://shei-shad-client.vercel.app/api/auth/get-session`, {
                method: "GET",
                headers: {
                    cookie: cookie, 
                },
                cache: "no-store",
            });

            if (!response.ok) return null;

            const sessionData = await response.json();
            return sessionData?.user ?? null;
        } catch (error) {
            console.error("Error fetching session:", error);
            return null;
        }
    },

    getAllUsers: async (): Promise<UserData[]> => {
        const res = await baseUrl.get<{ data: UserData[], message: string }>('/api/v1/user')
        return res.data.data
    },

    getAUser: async (id: string): Promise<UserProfile> => {
        const res = await baseUrl.get<{ data: UserProfile, message: string }>(`/api/v1/user/${id}`)
        return res.data.data
    },

    updateUsersStatus: async (id: string, newStatus: string): Promise<UserData> => {
        const res = await baseUrl.patch<{ data: UserData, message: string }>(`/api/v1/update-status/${id}`, { status: newStatus })
        return res.data.data
    },

    updateProfileInfo: async (id: string, updatedInfo: Partial<UserData>): Promise<UserData> => {
        const res = await baseUrl.put<{ data: UserData, message: string }>(`/api/v1/user/update-profile/${id}`, updatedInfo)
        return res.data.data
    },

    changePassword: async (id: string, updatedPassword: UpdatedPassword): Promise<UserData> => {
        const res = await baseUrl.patch<{ data: UserData, message: string }>(`/api/v1/change-password/${id}`, updatedPassword)
        return res.data.data
    },
}



