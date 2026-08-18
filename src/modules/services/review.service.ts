import { baseUrl } from "@/lib/api-client"

export interface ReviewInput {
    orderId: string,
    orderItemId: string,
    mealId: string,
    starCount: number,
    comment: string,
    customerId: string
}

export const reviewService = {

    createReview: async (reviewData: Partial<ReviewInput>): Promise<ReviewInput> => {
        const res = await baseUrl.post<{ data: ReviewInput, message: string }>(`/api/v1/review`, reviewData)
        return res.data.data
    },

}