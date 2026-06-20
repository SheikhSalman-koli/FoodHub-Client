"use client";

import { Menu, ShoppingCart, Activity, Utensils } from "lucide-react";
import {
  Accordion,

} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarProps {
  className?: string;
}

export default function Navbarr({ className }: NavbarProps) {
  const menu: MenuItem[] = [
    { title: "হোম", url: "/" },
    { title: "মেনু", url: "/meals" },
    { title: "অর্ডার ট্র্যাকিং", url: "/track-order" },
  ];

  const auth = [
    { id: 1, title: "রেজিস্ট্রেশন", url: "/signup" },
    { id: 2, title: "লগইন", url: "/signin" },
  ]



  return (
    <nav className={cn("fixed top-0 inset-x-0 h-20 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-white z-50 px-6 sm:px-8 lg:px-16 transition-all duration-300 flex items-center", className)}>

      {/* Decorative Architecture Lines Matching Hero Grid */}
      <div className="absolute inset-y-0 left-12 w-px bg-white/5 hidden lg:block pointer-events-none" />
      <div className="absolute inset-y-0 right-12 w-px bg-white/5 hidden lg:block pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative z-10">

        {/* LOGO (Desktop & Mobile Anchor) */}
        <Link href="/" className="flex items-center gap-2 group">
         <Utensils className="size-6 text-amber-500" />
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            সেই-<span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">স্বাদ</span>
          </span>
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 animate-pulse" />
        </Link>

        {/* DESKTOP VIEWPORT LAYOUT */}
        <div className="hidden lg:flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-8">
              {menu.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink
                    href={item.url}
                    className="text-xs tracking-widest uppercase font-bold text-gray-400 hover:text-amber-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    {item.url === "/track-order" && (
                      <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                    )}
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* RIGHT ACTION NODE: CART & ACCOUNT GATEWAY */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="p-2.5 text-gray-400 hover:text-amber-400 transition-colors relative cursor-pointer active:scale-95 bg-transparent border-0">
            <ShoppingCart className="size-5" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-orange-600 text-white rounded-full text-[9px] font-black flex items-center justify-center">
              0
            </span>
          </button>

         
          {
            auth.map(item => (
              <Link
                key={item.id}
                href={item.url}
                className="bg-amber-500 hover:bg-amber-400 text-[#0d0d0d] text-xs uppercase font-black tracking-wider px-5 py-3 transition-all duration-300 shadow-md shadow-amber-500/5 active:scale-98"
              >
                {item.title}
              </Link>
            ))
          }

        </div>

        {/* MOBILE VIEWPORT TRIGGER ENGINE */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Mobile Cart Tracker */}
          <button className="p-2 text-gray-400 hover:text-amber-400 relative bg-transparent border-0">
            <ShoppingCart className="size-5" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-orange-600 text-white rounded-full text-[9px] font-black flex items-center justify-center">
              0
            </span>
          </button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-white/10 bg-[#141414] hover:bg-[#1f1f1f] text-white hover:text-amber-400 size-10 rounded-none cursor-pointer">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0d0d0d] border-l border-white/5 text-white w-full sm:max-w-md p-6 overflow-y-auto">
              <SheetHeader className="border-b border-white/5 pb-4">
                <SheetTitle className="text-left">
                  <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-black tracking-tight text-white">
                      সেই-<span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">স্বাদ</span>
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col justify-between h-[calc(100vh-100px)] pt-8">
                <Accordion type="single" collapsible className="w-full flex flex-col gap-5">
                  {menu.map((item) => (
                    <a
                      key={item.title}
                      href={item.url}
                      className="text-lg font-medium tracking-wide text-gray-300 hover:text-amber-400 transition-colors flex items-center gap-3 py-1"
                    >
                      {item.url === "/track-order" ? (
                        <Activity className="size-5 text-green-500 animate-pulse" />
                      ) : (
                        <span className="w-1.5 h-1.5 bg-amber-500/40 rounded-full" />
                      )}
                      {item.title}
                    </a>
                  ))}
                </Accordion>

                {/* Mobile Auth Button Frame Stack */}
                <div className="flex flex-col gap-3 pb-6">
                  {
                    auth.map(item => (
                      <Link
                        key={item.id}
                        href={item.url}
                        className="bg-amber-500 hover:bg-amber-400 text-[#0d0d0d] text-xs uppercase font-black tracking-wider px-6 py-3 transition-all duration-300 shadow-md shadow-amber-500/5 active:scale-98"
                      >
                        {item.title}
                      </Link>
                    ))
                  }
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
}