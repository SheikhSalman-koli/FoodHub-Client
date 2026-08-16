import { ClipboardList, FolderTree, LayoutDashboard, LucideIcon, Users } from "lucide-react";

export interface RouteType {
    id: number;
    name: string;
    url: string;
    icon: LucideIcon
}

export const adminItems: RouteType[] = [
  { 
    id: 1, 
    name: "পরিসংখ্যান", 
    url: "/admin/statistic", 
    icon: LayoutDashboard 
  },
  { 
    id: 3, 
    name: "ইউজার ম্যানেজমেন্ট", 
    url: "/admin/manage-users", 
    icon: Users 
  },
  { 
    id: 4, 
    name: "ক্যাটেগরি ম্যানেজমেন্ট", 
    url: "/admin/manage-categories", 
    icon: FolderTree 
  },
  { 
    id: 5, 
    name: "সব অর্ডার দেখুন", 
    url: "/admin/manage-orders", 
    icon: ClipboardList 
  }
]
