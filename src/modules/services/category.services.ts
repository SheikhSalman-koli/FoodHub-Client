import { baseUrl } from "@/lib/api-client"

export interface CategoryData {
    id: string
    name: string
    slug: string
    logo?: string
    isAvailable: boolean
    isDeleted: boolean
}


export const categoryService = {

    getCategories:async(): Promise<CategoryData[]> => {
        const res = await baseUrl.get<{data: CategoryData[], message: string}>('/api/v1/category')
        return res.data.data
    }
    
}