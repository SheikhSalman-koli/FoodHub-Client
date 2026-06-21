"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSent, setIsSent] = useState(false); // 🚀 লিঙ্ক পাঠানো হয়েছে কিনা ট্র্যাক করার জন্য

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // 🚀 আপনার কোডের মেইল পাঠানোর মেথডটি (যা মেইল পাঠাতে সফল হচ্ছে)
    const { data, error } = await authClient.requestPasswordReset({ 
      email: email,
      redirectTo: "/reset-password", 
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message || "কোনো সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    } else {
      // ➔ সফল হলে রিডাইরেক্ট না করে সাকসেস স্টেট ট্রু করে দেব
      setIsSent(true);
    }
  };

  // 🎯 জিমেইলে যাওয়ার বাটনসহ সাকসেস স্ক্রিন
  if (isSent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
          <div className="text-blue-500 text-6xl mb-4">✉️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">ইমেইল চেক করুন!</h2>
          <p className="text-gray-600 mb-6 text-sm">
            আমরা <span className="font-semibold text-black">{email}</span> ঠিকানায় একটি পাসওয়ার্ড রিসেট লিঙ্ক পাঠিয়েছি। দয়া করে আপনার ইনবক্স বা স্প্যাম ফোল্ডার চেক করুন।
          </p>
          
          {/* 🚀 ইউজারকে সরাসরি জিমেইলে নিয়ে যাওয়ার বাটন */}
          <a
            href="https://mail.google.com"
            rel="noopener noreferrer"
            className="inline-block w-full bg-blue-600 text-white py-2.xl rounded-md font-medium text-center hover:bg-blue-700 transition-colors py-2.5"
          >
            Open Gmail Inbox
          </a>
        </div>
      </div>
    );
  }

  // ইমেইল ইনপুট দেওয়ার মেইন ফর্ম
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">পাসওয়ার্ড ভুলে গেছেন?</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">আপনার ইমেইল এড্রেস</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-blue-500"
              placeholder="example@gmail.com"
            />
          </div>

          {errorMsg && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? "লিঙ্ক পাঠানো হচ্ছে..." : "রিসেট লিঙ্ক পাঠান"}
          </button>
        </form>
      </div>
    </div>
  );
}