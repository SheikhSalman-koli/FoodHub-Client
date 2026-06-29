import { baseUrl } from "@/lib/api-client"

export interface ProviderData {
    id: string,
    authoremail: string,
    restaurantName: string,
    tagline?: string,
    location: string,
    logo?: string,
    isDeleted: boolean
}

export const providerServices = {

    getProviders: async (): Promise<ProviderData[]> => {
        const res = await baseUrl.get<{ data: ProviderData[], message: string }>('/api/v1/provider')
        return res?.data.data
    },

    getProvidersById: async (id: string): Promise<ProviderData> => {
        const res = await baseUrl.get<{ data: ProviderData, message: string }>(`/api/v1/provider/${id}`)
        return res?.data.data
    }

}