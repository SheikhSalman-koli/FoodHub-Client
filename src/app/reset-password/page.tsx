"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function ResetPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showPass, setShowPass] = useState(true)

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token && !email) {
            setErrorMsg("পাসওয়ার্ড রিসেট করার জন্য প্রয়োজনীয় তথ্য পাওয়া যায়নি।");
            return;
        }

        setLoading(true);
        setErrorMsg("");

        // 🚀 ২. Better Auth ক্লায়েন্ট কল
        const { error } = await authClient.resetPassword({
            newPassword: password,
            ...(token && { token }), // যদি টোকেন থাকে তবে টোকেন পাঠাবে
        });

        setLoading(false);

        if (error) {
            setErrorMsg(error.message || "পাসওয়ার্ড রিসেট করতে ব্যর্থ হয়েছে। লিঙ্কটি হয়তো এক্সপায়ার হয়ে গেছে।");
        } else {
            alert("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে! আপনি এখন লগইন করতে পারেন!");
            router.push("/signin");
        }
    };

    // 🚀 ফিক্স: টোকেন অথবা ইমেইল যেকোনো একটি থাকলেই পেজটি ওপেন হবে
    if (!token && !email) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500 font-bold bg-gray-50">
                অবৈধ বা এক্সপায়ার্ড লিঙ্ক! দয়া করে আবার ট্রাই করুন।
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 ">নতুন পাসওয়ার্ড সেট করুন</h2>
                {email && <p className="text-xs text-gray-500 text-center mb-4">অ্যাকাউন্ট: {email}</p>}
                <form onSubmit={handleReset} className="space-y-4 relative">

                    <Button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-3 size-4"
                    >
                        {showPass ? <Eye /> : <EyeOff />}
                    </Button>

                    <input
                        type={showPass ? "password" : "text"}
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-black focus:outline-none focus:ring-blue-500"
                        placeholder="নতুন পাসওয়ার্ড লিখুন"
                    />
                    {errorMsg && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{errorMsg}</p>}
                    <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md font-medium disabled:bg-green-400">
                        {loading ? "আপডেট হচ্ছে..." : "পাসওয়ার্ড আপডেট করুন"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">লোড হচ্ছে...</div>}>
            <ResetPasswordContent />
        </Suspense>
    );
}