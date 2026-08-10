"use server"

import { revalidatePath } from "next/cache";
import { userServices } from "../services/user.service";


export async function updateUserStatus(id: string, newStatus: string) {
    try {
        const result = await userServices.updateUsersStatus(id, newStatus);
          revalidatePath("/admin/manage-users");
        
        return {
            success: true,
            data: result,
            message: "ইউজারের স্ট্যাটাস পরিবর্তন হয়েছে!"
        };
    } catch (error) {
        const errorMessage = error instanceof Error 
            ? error.message 
            : "স্ট্যাটাস পরিবর্তন হতে সমস্যা হয়েছে, আবার চেষ্টা করুন";

            return {
            success: false,
            data: [],
            message: errorMessage
        };
    }
}