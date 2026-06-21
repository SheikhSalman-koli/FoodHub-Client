"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Store, Mail, Lock, Phone, MapPin, Edit3, ArrowLeft, Utensils, LocateFixedIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [role, setRole] = useState<"CUSTOMER" | "PROVIDER">("CUSTOMER");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // 🚀 ১. সাবমিট শুরু হতেই লোডার চালু করুন

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);

      const baseUserData = {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
        phone: formData.get("phone") ? String(formData.get("phone")) : undefined,
        address: formData.get("address") ? String(formData.get("address")) : undefined, // 🛠️ ফিক্সড: phone এর বদলে address হবে
        role: role as "CUSTOMER" | "PROVIDER",
      };

      if (role === "PROVIDER") {
        const providerData = {
          ...baseUserData,
          restaurantName: formData.get("restaurantName") ?? "",
          tagline: formData.get("tagline") ?? "",
          location: formData.get("location") ?? "",
        };

        // Create Provider
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/provider/api/v1`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(providerData),
        });

        const result = await response.json();

        if (!response.ok) {
          alert(result.error || "একটি সমস্যা হয়েছে, আবার চেষ্টা করুন");
          return;
        }

        (e.target as HTMLFormElement).reset();

        router.push('/verify-email?email=' + baseUserData.email);

      } else {
        // Create Customer
        const { data } = await authClient.signUp.email(baseUserData);

        if (data) {
          (e.target as HTMLFormElement).reset();
          router.push('/verify-email?email=' + baseUserData.email);
        }
      }

    } catch (error) {
      console.error("Frontend submit error:", error);
      alert(error || "কোথাও কোনো সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#0d0d0d] grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT SIDE: Brand Visuals (Hidden on Mobile) */}
      <div className="hidden lg:flex relative flex-col justify-between p-12 overflow-hidden bg-zinc-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-linear-to-tr from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 text-2xl font-black text-white tracking-tight">
            <Utensils className="size-6 text-amber-500" />
            <span>সেই-<span className="text-amber-400">স্বাদ</span></span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-light text-white leading-tight mb-4">
            আপনার রান্নার জাদু ছড়িয়ে দিন <span className="font-black text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">হাজারো ভোজনরসিকের</span> মাঝে।
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            গ্রাহক হিসেবে অর্ডার করুন অথবা প্রোভাইডার হিসেবে নিজের কিচেন খুলে আজই ব্যবসা শুরু করুন।
          </p>
        </div>

        <div className="relative z-10 text-xs text-gray-500 font-medium">
          © ২০২৬ সেই-স্বাদ প্ল্যাটফর্ম। সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>

      {/* RIGHT SIDE: Multi-role Form Wrapper */}
      <div className="flex items-center justify-center p-6 sm:p-12 md:p-16 relative">
        <div className="w-full max-w-xl space-y-6 relative z-10">

          <div className="flex flex-col space-y-1.5 text-center lg:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">নতুন অ্যাকাউন্ট তৈরি করুন</h1>
            <p className="text-sm text-gray-400">নিচের অপশন থেকে আপনার অ্যাকাউন্টের ধরণ নির্বাচন করুন</p>
          </div>

          {/* Role Choice Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setRole("CUSTOMER")}
              className={`flex-1 py-3.5 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer text-sm font-bold tracking-wide ${role === "CUSTOMER" ? "bg-amber-500/10 border-amber-500 text-amber-500" : "bg-[#141414] border-white/5 text-gray-400 hover:border-white/10"}`}
            >
              <User className="size-4" /> কাস্টমার
            </button>
            <button
              type="button"
              onClick={() => setRole("PROVIDER")}
              className={`flex-1 py-3.5 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer text-sm font-bold tracking-wide ${role === "PROVIDER" ? "bg-amber-500/10 border-amber-500 text-amber-500" : "bg-[#141414] border-white/5 text-gray-400 hover:border-white/10"}`}
            >
              <Store className="size-4" /> প্রোভাইডার/রেস্টুরেন্ট-ওনার
            </button>
          </div>

          {/* Form Starts */}
          <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar pb-2">

            {/* Account Info Container */}
            <div className="space-y-4 bg-[#141414] p-5 rounded-2xl border border-white/5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-gray-400 text-xs">পূর্ণ নাম</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2 size-4 text-gray-600" />
                    <Input name="name" placeholder="নাম" className="pl-10 bg-[#0d0d0d] border-white/5 text-white focus-visible:ring-amber-500 rounded-xl" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-gray-400 text-xs">ইমেইল অ্যাড্রেস</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2 size-4 text-gray-600" />
                    <Input name="email" type="email" placeholder="ইমেল" className="pl-10 bg-[#0d0d0d] border-white/5 text-white focus-visible:ring-amber-500 rounded-xl" required />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-gray-400 text-xs">পাসওয়ার্ড</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2 size-4 text-gray-600" />
                    <Input name="password" type="password" placeholder="••••••••" className="pl-10 bg-[#0d0d0d] border-white/5 text-white focus-visible:ring-amber-500 rounded-xl" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-gray-400 text-xs">ফোন নাম্বার <span className="text-gray-600 text-[10px]">(ঐচ্ছিক)</span></Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2 size-4 text-gray-600" />
                    <Input name="phone" placeholder="" className="pl-10 bg-[#0d0d0d] border-white/5 text-white focus-visible:ring-amber-500 rounded-xl" />
                  </div>
                </div>
              </div>

              <div className={`${role === 'PROVIDER' ? "hidden" : ""} space-y-1.5`}>
                <Label className="text-gray-400 text-xs">ঠিকানা <span className="text-gray-600 text-[10px]">(ঐচ্ছিক)</span></Label>
                <div className="relative">
                  <LocateFixedIcon className="absolute left-3 top-2 size-4 text-gray-600" />
                  <Input name="address" placeholder="হাইজ নং, রোড নং, এলাকার নাম" className="pl-10 bg-[#0d0d0d] border-white/5 text-white focus-visible:ring-amber-500 rounded-xl" />
                </div>
              </div>

            </div>

            {/* Conditional Provider Section */}
            {role === "PROVIDER" && (
              <div className="space-y-4 bg-amber-500/5 p-5 rounded-2xl border border-amber-500/20 animate-in fade-in slide-in-from-top-4 duration-300">
                <h3 className="text-xs font-black text-amber-500 uppercase tracking-wider flex items-center gap-2 border-b border-amber-500/10 pb-2">
                  <Store className="size-3.5" /> রেস্টুরেন্ট/কিচেন ইনফো
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-gray-400 text-xs">রেস্টুরেন্টের নাম</Label>
                    <Input name="restaurantName" placeholder="রেস্টুরেন্টের নাম" className="bg-[#0d0d0d] border-white/5 text-white focus-visible:ring-amber-500 rounded-xl" required={role === "PROVIDER"} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-gray-400 text-xs">ট্যাগলাইন (Tagline)<span className="text-gray-600 text-[10px]">(ঐচ্ছিক)</span></Label>
                    <div className="relative">
                      <Edit3 className="absolute left-3 top-2 size-4 text-gray-600" />
                      <Input name="tagline" placeholder="খাঁটি স্বাদ, তৃপ্ত মন" className="pl-10 bg-[#0d0d0d] border-white/5 text-white focus-visible:ring-amber-500 rounded-xl" required={role === "PROVIDER"} />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-gray-400 text-xs">আউটলেট লোকেশন</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2 size-4 text-gray-600" />
                    <Input name="location" placeholder="হাইজ নং, রোড নং, এলাকার নাম" className="pl-10 bg-[#0d0d0d] border-white/5 text-white focus-visible:ring-amber-500 rounded-xl" required={role === "PROVIDER"} />
                  </div>
                </div>

              </div>
            )}


            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-[#0d0d0d] font-bold text-base py-6 rounded-xl shadow-lg shadow-amber-500/10 cursor-pointer mt-2 disabled:opacity-50 btn-primary"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 ...">...</svg>
                  অপেক্ষা করুন...
                </span>
              ) : (
                role === "PROVIDER" ? "রেস্টুরেন্ট-ওনার হিসেবে যোগ দিন" : "ফ্রি অ্যাকাউন্ট খুলুন"
              )}
            </Button>
          </form>

          <div className="flex justify-center items-center text-sm text-gray-400 pt-2">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="text-amber-500 font-bold hover:underline inline-flex items-center gap-1">
              <ArrowLeft className="size-3.5" /> লগইন করুন
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}