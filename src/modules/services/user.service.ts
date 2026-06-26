import { headers } from "next/headers";

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
    }

}



