import { baseUrl } from "@/lib/api-client";

// চাট ডাটা আইটেম টাইপ (Daily, Weekly, Monthly এর জন্য)
export interface ChartDataItem {
    label: string; // e.g., "2026-08-01", "2026-W30", "2026-08"
    orders: number;
    earn: number;
}

//  মিল কার্ড স্ট্যাটস
export interface MealStats {
    total: number;
    active: number;
    inactive: number;
}

// অর্ডার কার্ড স্ট্যাটস
export interface OrderStats {
    total: number;
    cancelled: number;
    delivered: number;
}

// ফাইন্যান্স কার্ড স্ট্যাটস
export interface FinanceStats {
    totalAmount: number;
    deliveryFeeCost: number;
    totalEarn: number; // subtotal
}

// সব কার্ডের একত্রিত টাইপ
export interface ProviderCardsData {
    meals: MealStats;
    orders: OrderStats;
    finance: FinanceStats;
}

// সব চার্টের একত্রিত টাইপ
export interface ProviderChartsData {
    daily: ChartDataItem[];
    weekly: ChartDataItem[];
    monthly: ChartDataItem[];
}

// মেইন ডাটা পেলোড টাইপ
export interface ProviderStatsData {
    cards: ProviderCardsData;
    charts: ProviderChartsData;
}

// সার্ভার অ্যাকশন রেসপন্স টাইপ (Discriminated Union)
export type ProviderStatsResponse =
    | {
        data: ProviderStatsData;
        message: string;
    }
    | {
        success: false;
        message: string;
    };


export const statsService = {

    getProviderStats: async (email: string): Promise<ProviderStatsData> => {
        const res = await baseUrl.get<{data: ProviderStatsData, message: string}>(`/api/v1/stats-provider/${email}`);
        return res.data.data;
    },

};