'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Roles } from "@/constants/userRole"
import { authClient } from "@/lib/auth-client"
import { adminItems, RouteType } from "@/routes/adminRoutes"
import { customerItems } from "@/routes/customerRoutes"
import { providerItems } from "@/routes/providerRoutes"
import { LogOut, User, Utensils } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface UserRole {
    role: string
}

export function AppSidebar({role}: UserRole) {


const pathname = usePathname()

// console.log(user?.role)

let items: RouteType[] = []

switch (role) {
    case Roles.admin:
        items = adminItems
        break;
    case Roles.provider:
        items = providerItems
        break;
    case Roles.customer:
        items = customerItems
        break;

    default:
        items = []
        break
}

    return (
       <Sidebar className="border-r border-white/5 bg-[#0d0d0d]">
      
      {/* 🥞 ১. কুদিল ব্র্যান্ডেড হেডার */}
      <SidebarHeader className="p-6 border-b border-white/5 bg-[#0d0d0d] flex flex-row items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
                 <Utensils className="size-6 text-amber-500" />
                  <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    সেই-<span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">স্বাদ</span>
                  </span>
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 animate-pulse" />
                </Link>
      </SidebarHeader>

      {/* 🍱 ২. কাস্টমাইজড কুদিল মেনু কন্টেন্ট */}
      <SidebarContent className="bg-[#0d0d0d] px-4 py-6 scrollbar-none">
        <SidebarMenu className="space-y-2">
          {items.map((item) => {
            // চেক করা হচ্ছে এই লিংকটি এখন অ্যাক্টিভ কি না
            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  className={`w-full justify-start px-4 py-6 rounded-xl transition-all duration-200 group border-l-2 ${
                    isActive
                      ? "bg-white/5 text-amber-500 border-amber-500 font-bold shadow-xl shadow-black/40" // অ্যাক্টিভ স্টেট
                      : "bg-transparent text-gray-400 border-transparent hover:text-gray-200 hover:bg-white/5" // ইন-অ্যাক্টিভ স্টেট
                  }`}
                >
                  <Link href={item.url} className="flex items-center gap-4 w-full">
                    {/* আইকন কালার ডাইনামিক হ্যান্ডেল */}
                    <item.icon 
                      size={16} 
                      className={`transition-colors duration-200 ${
                        isActive ? "text-amber-500" : "text-gray-400 group-hover:text-gray-200"
                      }`} 
                    />
                    <span className="text-xs tracking-widest uppercase font-bold">
                      {item.name}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* 🪵 ৩. লাক্সারি ডার্ক ফুটার (ইউজার বা লগআউট সেকশন) */}
      <SidebarFooter className="p-4 border-t border-white/5 bg-[#0d0d0d]">
        <div className="flex items-center justify-between p-2 rounded-xl bg-[#141414]/50 border border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
              <User size={14} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-black text-white">Shourav</span>
              <span className="text-[10px] text-gray-500">Admin</span>
            </div>
          </div>
          <button className="text-gray-500 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10 cursor-pointer">
            <LogOut size={14} />
          </button>
        </div>
      </SidebarFooter>

    </Sidebar>
    )
}