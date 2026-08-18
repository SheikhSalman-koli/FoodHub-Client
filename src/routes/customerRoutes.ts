import { Route, UserCircle2 } from "lucide-react";
import { RouteType } from "./adminRoutes";

export const customerItems: RouteType[] = [
     { 
        id: 1, 
        name: "প্রোফাইল", 
        url: "/customer/profile", 
        icon: UserCircle2 
    },
    { 
        id: 2, 
        name: "অর্ডার ট্রাকিং", 
        url: "/customer/track-order", 
        icon: Route 
    },
   
]