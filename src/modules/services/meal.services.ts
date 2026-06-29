import { baseUrl } from "@/lib/api-client"

interface Commenter {
    id: string,
    name: string,
    image: string
}

export interface Review {
    id: string;
    customerId: string;
    mealId: string;
    orderId: string;
    comment: string;
    starCount: number;
    isDeleted: boolean;
    createdAt: string;
    user: Commenter
}

export interface MealData {
    id: string;
  providerId: string;
  categoryId: string;
  name: string;
  description: string;
  image: string | null;       
  orderCount: number;
  isFeatured: boolean,
  price: string;           
  isDeleted: boolean;
  discount: number | null;
  reviews?: Review[]
  similarMeals?: MealData[]
}

interface FilterParams {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
}

export const mealServices = {

    getMeals: async (filters: FilterParams = {}): Promise<MealData[]> => {
        const query = new URLSearchParams();
    
    if (filters.search) query.set("search", filters.search);
    if (filters.category) query.set("category", filters.category);
    if (filters.minPrice) query.set("minPrice", filters.minPrice);
    if (filters.maxPrice) query.set("maxPrice", filters.maxPrice);

        const res = await baseUrl.get<{ data: MealData[], message: string }>(`/api/v1/meal?${query.toString()}`)
        return res?.data.data
    },

    getMealById: async (id: string): Promise<MealData> => {
        const res = await baseUrl.get<{ data: MealData, message: string }>(`/api/v1/meal/single/${id}`)
        return res?.data.data
    }

}