import { baseUrl } from "@/lib/api-client"

export interface Review {
    id: string;
    customerId: string;
    mealId: string;
    orderId: string;
    comment: string;
    starCount: number;
    isDeleted: boolean;
    createdAt: string;
}

export interface MealData {
    id: string;
  providerId: string;
  categoryId: string;
  name: string;
  description: string;
  image: string | null;       // Prisma-র String? এর জন্য string | null
  orderCount: number;
  price: string;              // Decimal-এর জন্য string (আপনার ডেটা ফরম্যাট অনুযায়ী)
  isDeleted: boolean;
  discount: number | null;
  reviews?: Review[]
}

export const mealServices = {

    getMeals: async (): Promise<MealData[]> => {
        const res = await baseUrl.get<{ data: MealData[], message: string }>('/api/v1/meal')
        return res?.data.data
    },

    getMealById: async (id: string): Promise<MealData[]> => {
        const res = await baseUrl.get<{ data: MealData[], message: string }>(`/api/v1/meal/single/${id}`)
        return res?.data.data
    }

}