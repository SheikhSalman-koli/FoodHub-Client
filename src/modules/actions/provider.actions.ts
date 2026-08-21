'use server'

import { revalidatePath } from "next/cache";
import { providerServices, providerUpdatedData } from "../services/provider.services";


export async function updateProviderAction(provId: string, updatedData: Partial<providerUpdatedData>) {
  try {
    const result = await providerServices.updateProviders(provId, updatedData);

    revalidatePath("/provider-dash/profile");

    return {
      success: true,
      data: result,
      message: "প্রোভাইডারের তথ্য সফলভাবে আপডেট হয়েছে!",
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



export async function getProvidersAction() {
  try {
    const result = await providerServices.getProviders()

    return {
      success: true,
      data: result,
      message: "প্রোভাইডারের তথ্য সফলভাবে আনা হয়েছে!",
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