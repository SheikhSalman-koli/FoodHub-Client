import { HomeIcon, LucideIcon } from "lucide-react";

export interface RouteType {
    id: number;
    name: string;
    url: string;
    icon: LucideIcon
}

export const adminItems: RouteType[] = [
    { id: 3, name: "Manage Category", url: "manage-catagory", icon: HomeIcon },
    { id: 4, name: "Manage Meals", url: "manage-meals", icon: HomeIcon }
]
