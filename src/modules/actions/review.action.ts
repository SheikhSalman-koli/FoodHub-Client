'use server'

import { revalidatePath } from "next/cache";
import { ReviewInput, reviewService } from "../services/review.service";

export async function createReviewAction(reviewData: Partial<ReviewInput>) {
    try {
        const review = await reviewService.createReview(reviewData)

        revalidatePath(`/customer/track-order/${reviewData.orderId}`);

        return {
            success: true,
            data: review,
            message: "আপনার মতামত সফলভাবে সংরক্ষন হয়েছে"
        };
    } catch (error) {
        const errorMessage = error instanceof Error 
            ? error.message 
            : "মতামত সংরক্ষন করতে সমস্যা হয়েছে";

            return {
            success: false,
            data: [],
            message: errorMessage
        };
    }
}