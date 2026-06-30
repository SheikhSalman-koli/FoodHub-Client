import { HomeIcon } from "lucide-react";
import { RouteType } from "./adminRoutes";

export const customerItems: RouteType[] = [
    { id: 1, name: "Orders History", url: "/customer/order-history", icon: HomeIcon },
    { id: 2, name: "Statistic", url: "stats", icon: HomeIcon },
    { id: 3, name: "Manage Category", url: "manage-catagory", icon: HomeIcon },
    { id: 4, name: "Manage Meals", url: "manage-meals", icon: HomeIcon }
]