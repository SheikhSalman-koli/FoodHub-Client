import { HomeIcon } from "lucide-react"
import { RouteType } from "./adminRoutes"

export const providerItems: RouteType[] = [
    { id: 3, name: "Create Meal", url: "/provider-dash/create-meal", icon: HomeIcon },
    { id: 4, name: "Manage Meals", url: "manage-meals", icon: HomeIcon }
]
