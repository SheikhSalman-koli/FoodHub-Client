import { baseUrl } from "@/lib/api-client"

export interface ReviewInput {
    orderId: string,
    orderItemId: string,
    mealId: string,
    starCount: number,
    comment: string,
    customerId: string
}


interface MealOfReview{
    id: string;
    name: string
}

interface Commenter {
    id: string,
    name: string,
    image: string
}

export interface ReviewResponse {
    id: string;
    comment: string;
    starCount: number;
    createdAt: Date;
    meal: MealOfReview;
    user: Commenter
}

export const reviewService = {

    createReview: async (reviewData: Partial<ReviewInput>): Promise<ReviewInput> => {
        const res = await baseUrl.post<{ data: ReviewInput, message: string }>(`/api/v1/review`, reviewData)
        return res.data.data
    },

    getReviews: async (): Promise<ReviewResponse[]> => {
        const res = await baseUrl.get<{ data: ReviewResponse[], message: string }>(`/api/v1/review`)
        return res.data.data
    },

}