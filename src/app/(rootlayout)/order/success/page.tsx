'use client'

import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {

  return (
    <div className="w-full flex justify-center items-center">
    <div className=" bg-[#141414] border border-white/5 p-8 md:p-12 rounded-3xl max-w-md w-full text-center shadow-2xl">
      
      {/* সাকসেস অ্যানিমেটেড টিক চিহ্নের আইকন */}
      <div className=" w-20 h-20 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* টেক্সট মেসেজ */}
      <h1 className="text-2xl font-black mb-3 text-white">অর্ডার সফল হয়েছে! 🎉</h1>
      <p className="text-sm text-gray-400 mb-6 leading-relaxed">
        আপনার অর্ডারটি আমরা সফলভাবে গ্রহণ করেছি। আমাদের শেফ ইতিমধ্যেই আপনার পছন্দের খাবারটি প্রস্তুত করা শুরু করে দিয়েছেন।
      </p>

      {/* ডাটাবেজ থেকে আসা রিয়াল অর্ডার আইডি বক্স */}
      {/* {orderId ? (
        <div className="bg-[#1c1c1c] border border-white/5 rounded-2xl p-4 mb-8">
          <span className="text-xs text-gray-500 block mb-1 font-mono uppercase tracking-wider">Order ID</span>
          <span className="text-sm font-bold text-amber-500 font-mono break-all">{orderId}</span>
        </div>
      ) : (
        <div className="h-4"></div>
      )} */}

      {/* অ্যাকশন বাটনস */}
      <div className="flex justify-between gap-3">
        <Link
          href="/orders"
          className="block w-full bg-amber-500 hover:bg-amber-600 text-black font-black py-4 rounded-xl transition duration-200 text-sm text-center"
        >
          অর্ডার ট্র্যাক করুন 🗺️
        </Link>
        
        <Link
          href="/meals"
          className="block w-full bg-[#1c1c1c] hover:bg-white/5 border border-white/5 text-white font-bold py-4 rounded-xl transition duration-200 text-sm text-center"
        >
          আরো খাবার অর্ডার করুন 🍔
        </Link>
      </div>
    </div>
         
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center p-6">
      <Suspense 
        fallback={
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-gray-500">অর্ডার ভেরিফাই হচ্ছে...</p>
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}