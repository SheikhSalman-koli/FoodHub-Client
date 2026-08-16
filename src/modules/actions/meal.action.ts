"use server";

import { revalidatePath } from "next/cache";
import { MealData, mealServices } from "../services/meal.services";

export async function updateMealAction(mealId: string, updatedData: Partial<MealData>) {
  try {
    if (updatedData.price !== undefined && Number(updatedData.price) < 0) {
      return {
        success: false,
        message: "খাবারের মূল্য ০ বা তার বেশি হতে হবে!",
      };
    }

    if ((updatedData.discount ?? 0) < 0 || (updatedData.discount ?? 0) > 100) {
      return {
        success: false,
        message: "ছাড় (Discount) ০% থেকে ১০০% এর মধ্যে হতে হবে!",
      };
    }

    const result = await mealServices.updateMeal(mealId, updatedData);

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

export async function createMealAction(mealData: Partial<MealData>) {
  try {
    const result = await mealServices.createMeal(mealData)
    
      return {
      success: true,
      data: result,
      message: "খাবারটি সফলভাবে যুক্ত হয়েছে!",
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

export async function softDeleteMealAction(mealId: string, isDeleted: boolean) {
  try {
    const result = await mealServices.softDeleteMeal(mealId, isDeleted);

    revalidatePath("/provider-dash/manage-meal");

    return {
      success: true,
      data: result,
      message: "খাবারের তথ্য সফলভাবে আপডেট হয়েছে!",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন।",
    };
  }
}