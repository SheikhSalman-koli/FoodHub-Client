"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Utensils, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import SocialLogin from "@/myComponents/root/auth/SocialLogin";



export default function SignInPage() {

  const router = useRouter()
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(true)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await authClient.signIn.email({
      email,
      password,
    }, {
      onRequest: () => setLoading(true),
      onSuccess: () => {
        (e.target as HTMLFormElement).reset();
        setLoading(false);
        router.push(callbackUrl);
      },
      onError: async (ctx) => {
        if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
          try {
            await authClient.sendVerificationEmail({
              email: email,
              callbackURL: "/",
            });
          } catch (err) {
            console.error("Verification email failed:", err);
          }

          // ➔ মেইল প্রসেস শেষ (বা ফেইল) হলে রিডাইরেক্ট হবে
          router.push(`/verify-email?email=${encodeURIComponent(email)}`);
          return;
        }
        setLoading(false);
        alert(ctx.error.message || "লগইন করতে সমস্যা হয়েছে।");
      }
    });
  };

  return (
    <main className="min-h-screen w-full bg-[#0d0d0d] grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT SIDE: Brand Visuals (Hidden on Mobile) */}
      <div className="hidden lg:flex relative flex-col justify-between p-12 overflow-hidden bg-zinc-900">
        {/* Background Image with Dark Mask */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-10000 hover:scale-100"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-linear-to-tr from-[#0d0d0d] via-[#0d0d0d]/70 to-transparent" />

        {/* Content */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 text-2xl font-black text-white tracking-tight">
            <Utensils className="size-6 text-amber-500" />
            <span>সেই-<span className="text-amber-400">স্বাদ</span></span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-light text-white leading-tight mb-4">
            খাবারের আসল <span className="font-black text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">স্বাদ ও ঐতিহ্য</span>, এখন আপনার হাতের মুঠোয়।
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            লগইন করুন এবং আপনার আশেপাশের সেরা হোম-শেফ ও রেস্টুরেন্টগুলোর খাঁটি স্বাদ উপভোগ করুন।
          </p>
        </div>

        <div className="relative z-10 text-xs text-gray-500 font-medium">
          © ২০২৬ সেই-স্বাদ প্ল্যাটফর্ম। সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>

      {/* RIGHT SIDE: Auth Form Wrapper */}
      <div className="flex items-center justify-center p-6 sm:p-12 md:p-20 relative">
        {/* Subtle mobile background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl lg:hidden pointer-events-none" />

        <div className="w-full max-w-md space-y-8 relative z-10">

          {/* Mobile Logo Only */}
          <div className="text-center lg:hidden mb-4">
            <h2 className="text-3xl font-black text-white tracking-tight">
              সেই-<span className="text-amber-500">স্বাদ</span>
            </h2>
          </div>

          <div className="flex flex-col space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">ফিরে আসার জন্য ধন্যবাদ!</h1>
            <p className="text-sm text-gray-400">আপনার ক্রেডেনশিয়াল ব্যবহার করে লগইন করুন</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-gray-300">ইমেইল অ্যাড্রেস</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-4 size-4 text-gray-500" />
                <Input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="pl-10 h-12 bg-[#141414] border-white/5 text-white focus-visible:ring-amber-500 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-gray-300">পাসওয়ার্ড</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-amber-500 hover:underline">
                  ভুলে গেছেন?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 size-4 text-gray-500" />
                <Button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3 size-4 text-gray-500"
                >
                  {showPass ? <Eye /> : <EyeOff />}
                </Button>

                <Input
                  type={showPass ? "password" : "text"}
                  name="password"
                  placeholder="••••••••"
                  className="pl-10 h-12 bg-[#141414] border-white/5 text-white focus-visible:ring-amber-500 rounded-xl"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-[#0d0d0d] font-bold text-base py-6 rounded-xl shadow-lg shadow-amber-500/10 cursor-pointer mt-2 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 ...">...</svg>
                  অপেক্ষা করুন...
                </span>
              ) : (<p>লগইন করুন</p>)
              }
            </Button>
          </form>

              <SocialLogin />

          <div className="flex justify-center items-center gap-2 text-sm text-gray-400 pt-4 border-t border-white/5">
            <p>নতুন অ্যাকাউন্ট তৈরি করতে চান?</p>
            <Link href="/signup" className="text-amber-500 font-bold hover:underline inline-flex items-center gap-1">
              এখানে রেজিস্টার করুন <ArrowRight className="size-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}