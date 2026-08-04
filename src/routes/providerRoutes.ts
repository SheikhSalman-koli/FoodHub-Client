import { BarChart3, PlusCircle, ShoppingBag, User2Icon, Utensils } from "lucide-react"
import { RouteType } from "./adminRoutes"

export const providerItems: RouteType[] = [
   { 
    id: 1, 
    name: "পরিসংখ্যান", 
    url: "/provider-dash/statistic", 
    icon: BarChart3
  },
  { 
    id: 2, 
    name: "প্রোফাইল", 
    url: "/provider-dash/profile", 
    icon: User2Icon
  },
  { 
    id: 3, 
    name: "খাবার যুক্ত করুন", 
    url: "/provider-dash/create-meal", 
    icon: PlusCircle 
  },
  { 
    id: 4, 
    name: "খাবার ম্যানেজ করুন", 
    url: "/provider-dash/manage-meal", 
    icon: Utensils 
  },
  { 
    id: 5, 
    name: "অর্ডার ম্যানেজ করুন", 
    url: "/provider-dash/manage-orders", 
    icon: ShoppingBag 
  }
]
