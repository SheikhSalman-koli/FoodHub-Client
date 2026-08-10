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

export const userServices = {

    getSessionUser: async () => {
        try {
            const nextHeaders = await headers();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/get-session`, {
                method: "GET",
                headers: {
                    "Cookie": nextHeaders.get("cookie") || "",
                    "Content-Type": "application/json",
                },
                next: { revalidate: 0 }
            });

            if (!response.ok) {
                return null;
            }

            const sessionData = await response.json();

            if (!sessionData || !sessionData.user) {
                return null;
            }

            return sessionData.user;
        } catch (error) {
            console.error("Error fetching session from backend server:", error);
            return null;
        }
    },

    getAllUsers: async (): Promise<UserData[]> => {
        const res = await baseUrl.get<{ data: UserData[], message: string }>('/api/v1/user')
        return res.data.data
    },

       updateUsersStatus: async (id: string, newStatus: string): Promise<UserData> => {
        const res = await baseUrl.patch<{ data: UserData, message: string }>(`/api/v1/update-status/${id}`, {status: newStatus})
        return res.data.data
    },
}



