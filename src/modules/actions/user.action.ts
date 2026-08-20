"use server"

import { revalidatePath } from "next/cache";
import { UpdatedPassword, UserData, userServices } from "../services/user.service";


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


export async function updateProfileInfo(id: string, UpdatedInfo: Partial<UserData>) {
    try {
        const result = await userServices.updateProfileInfo(id, UpdatedInfo);
          revalidatePath("/customer/profile");
        return {
            success: true,
            data: result,
            message: "ইউজারের প্রোফাইল সফলভাবে আপডেট হয়েছে!"
        };
    } catch (error) {
        const errorMessage = error instanceof Error 
            ? error.message 
            : "প্রোফাইল আপডেট হতে সমস্যা হয়েছে, আবার চেষ্টা করুন";

            return {
            success: false,
            data: [],
            message: errorMessage
        };
    }
}

export async function changePassword(id: string, updatedPassword: UpdatedPassword) {
    try {
        const result = await userServices.changePassword(id, updatedPassword);
          revalidatePath("/customer/profile");
        return {
            success: true,
            data: result,
            message: "ইউজারের পাসওয়ার্ড সফলভাবে আপডেট হয়েছে!"
        };
    } catch (error) {
        const errorMessage = error instanceof Error 
            ? error.message 
            : "পাসওয়ার্ড আপডেট হতে সমস্যা হয়েছে, আবার চেষ্টা করুন";

            return {
            success: false,
            data: [],
            message: errorMessage
        };
    }
}