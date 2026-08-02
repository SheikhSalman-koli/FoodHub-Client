"use server";

import { revalidatePath } from "next/cache";
import { MealData, mealServices } from "../services/meal.services";

export async function updateMealAction(mealId: string, updatedData: Partial<MealData>) {
  try {
    // 🔒 ১. বিজনেস লজিক: প্রাইস নেগেটিভ হতে পারবে না
    if (updatedData.price !== undefined && Number(updatedData.price) < 0) {
      return {
        success: false,
        message: "খাবারের মূল্য ০ বা তার বেশি হতে হবে!",
      };
    }

    // 🔒 ২. বিজনেস লজিক: ডিসকাউন্ট ০ থেকে ১০০ এর মধ্যে থাকতে হবে
    if ((updatedData.discount ?? 0) < 0 || (updatedData.discount ?? 0) > 100) {
      return {
        success: false,
        message: "ছাড় (Discount) ০% থেকে ১০০% এর মধ্যে হতে হবে!",
      };
    }

    // 🗄️ ৩. ডাটাবেজ আপডেট কল (Service Layer)
    const result = await mealServices.updateMeal(mealId, updatedData);

    // 🔄 ৪. ডাটাবেজ আপডেট হলে পেজের ক্যাশ রিফ্রেশ করা (Next.js Revalidation)
    revalidatePath("/provider-dash/manage-meal");

    return {
      success: true,
      data: result,
      message: "খাবারের তথ্য সফলভাবে আপডেট হয়েছে!",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন।",
    };
  }
}