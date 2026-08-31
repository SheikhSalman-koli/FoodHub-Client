"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const token = searchParams.get("token");
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!token) return;

    authClient.verifyEmail({
      query: { token }
    })
      .then(({ error }) => {
        if (error) {
          setStatus("error");
          setErrorMsg(error.message || "টোকেনটি ইনভ্যালিড বা এক্সপায়ার হয়ে গেছে।");
        } else {
          setStatus("success");
          setTimeout(() => {
            router.push(callbackUrl);
          }, 3000);
        }
      })
      .catch(() => {
        setStatus("error");
        setErrorMsg("কোথাও কোনো সমস্যা হয়েছে, আবার চেষ্টা করুন।");
      });
  }, [token, callbackUrl, router]);

  const handleOpenEmail = () => {
    if (!email) return;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isGmail = email.toLowerCase().endsWith("@gmail.com");

    if (isMobile) {
      if (isGmail) {
        // মোবাইলে সরাসরি জিমেইল অ্যাপের ডিপ লিংক
        window.location.href = "googlegmail:///co";
      } else {
        // অন্যান্য ইমেইলের জন্য ডিভাইসের ডিফল্ট মেল অ্যাপ
        window.location.href = `mailto:${email}`;
      }
    } else {
      // ডেক্সটপ ওয়েব ব্রাউজারের জন্য
      if (isGmail) {
        window.open("https://mail.google.com", "_blank", "noopener,noreferrer");
      } else {
        window.location.href = `mailto:${email}`;
      }
    }
  };

  if (token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">

          {status === "loading" && (
            <div>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <h2 className="text-xl font-semibold mt-4 text-gray-700">আপনার ইমেইল ভেরিফাই করা হচ্ছে...</h2>
              <p className="text-gray-500 mt-2">দয়া করে কিছু মুহূর্ত অপেক্ষা করুন।</p>
            </div>
          )}

          {status === "success" && (
            <div>
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-green-600">ভেরিফিকেশন সফল হয়েছে!</h2>
              <p className="text-gray-600 mt-2">আপনাকে মূল পেজে রিডাইরেক্ট করা হচ্ছে।</p>
            </div>
          )}

          {status === "error" && (
            <div>
              <div className="text-red-500 text-5xl mb-4">✕</div>
              <h2 className="text-2xl font-bold text-red-600">ভেরিফিকেশন ব্যর্থ হয়েছে</h2>
              <p className="text-gray-600 mt-2">{errorMsg}</p>
              <button
                onClick={() => router.push('/login')}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                লগইন পেজে যান
              </button>
            </div>
          )}

        </div>
      </div>
    );
  }

  if (!token && email) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
          <div className="text-blue-500 text-5xl mb-4">✉️</div>
          <h2 className="text-2xl font-bold text-gray-800">ইমেইল চেক করুন!</h2>
          <p className="text-gray-600 mt-3">
            আমরা একটি ভেরিফিকেশন লিঙ্ক পাঠিয়েছি এই ঠিকানায়: <br />
            <strong className="text-blue-600 break-all">{email}</strong>
          </p>
          <p className="text-sm text-gray-400 mt-4">
            ইনবক্স বা স্প্যাম (Spam) ফোল্ডারটি চেক করে লিংকে ক্লিক করুন।
          </p>
          <div className="mt-6">
            <button
              onClick={handleOpenEmail}
              className="w-full bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
            >
              ইমেইল ইনবক্স ওপেন করুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
        <div className="text-red-500 text-5xl mb-4">✕</div>
        <h2 className="text-2xl font-bold text-red-600">ভেরিফিকেশন লিংকটি সঠিক নয়</h2>
        <button
          onClick={() => router.push('/login')}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          লগইন পেজে যান
        </button>
      </div>
    </div>
  );
}