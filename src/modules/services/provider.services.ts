import { baseUrl } from "@/lib/api-client"

export interface ProviderData {
    id: string,
    authoremail: string,
    restaurantName: string,
    tagline?: string,
    location: string,
    logo?: string,
    isDeleted: boolean;
    meals?: { id: string }[];
  _count?: { meals: number };
}

export interface providerUpdatedData {
    logo: string;
    restaurantName: string;
    tagline: string;
    location: string
}

export const providerServices = {

    getProviders: async (): Promise<ProviderData[]> => {
        const res = await baseUrl.get<{ data: ProviderData[], message: string }>('/api/v1/provider')
        return res?.data.data
    },

    getProvidersById: async (id: string): Promise<ProviderData> => {
        const res = await baseUrl.get<{ data: ProviderData, message: string }>(`/api/v1/provider/${id}`)
        return res?.data.data
    },

    getProvidersByemail: async (email: string): Promise<ProviderData> => {
        const res = await baseUrl.get<{ data: ProviderData, message: string }>(`/api/v1/providerbyemail/${email}`)
        return res?.data.data
    },

     updateProviders: async (id: string, updatedData: Partial<providerUpdatedData>): Promise<ProviderData> => {
        const res = await baseUrl.put<{ data: ProviderData, message: string }>(`/api/v1/edit-Provider/${id}`, updatedData)
        return res?.data.data
    },


}