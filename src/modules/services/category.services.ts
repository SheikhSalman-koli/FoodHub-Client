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

    getCategories: async (): Promise<CategoryData[]> => {
        const res = await baseUrl.get<{ data: CategoryData[], message: string }>('/api/v1/available-category')
        return res.data.data
    },

    getAllCategories: async (): Promise<CategoryData[]> => {
        const res = await baseUrl.get<{ data: CategoryData[], message: string }>('/api/v1/all-category')
        return res.data.data
    },

    updateCategories: async (id: string, updatedData: Partial<CategoryData>): Promise<CategoryData> => {
        const res = await baseUrl.put<{ data: CategoryData, message: string }>(`/api/v1/category/${id}`, updatedData)
        return res.data.data
    },

    createCategory: async (newCategory: Partial<CategoryData>): Promise<CategoryData> => {
        const res = await baseUrl.post<{ data: CategoryData, message: string }>(`/api/v1/category`, newCategory)
        return res.data.data
    },

}