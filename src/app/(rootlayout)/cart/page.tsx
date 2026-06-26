'use client';

import React from 'react';
import { useCartStore } from '@/store/useCartStore';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  // 🚀 জুস্ট্যান্ড থেকে সব ডাটা ও ফাংশন নিয়ে আসলাম
  const { cart, updateQuantity, removeFromCart } = useCartStore();

  // 💰 বিল ক্যালকুলেশন
  const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🛒 কার্ট যদি একদম খালি থাকে
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center p-4 pt-24">
        <div className="p-6 bg-[#141414] border border-white/5 rounded-full mb-4 text-gray-500 animate-bounce">
          <ShoppingBag className="size-12" />
        </div>
        <h2 className="text-xl font-black tracking-tight mb-2">আপনার কার্টটি সম্পূর্ণ খালি!</h2>
        <p className="text-gray-500 text-sm mb-6 text-center max-w-xs">কুডিলের সুস্বাদু খাবারগুলো এখনো কার্টে যোগ করেননি। জলদি মেনু ঘুরে আসুন!</p>
        <Link href="/meals" className="bg-amber-500 hover:bg-amber-600 text-[#0d0d0d] font-black px-6 py-3 rounded-xl transition duration-300 text-sm shadow-lg shadow-amber-500/10">
          খাবার পছন্দ করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-6xl mx-auto">
        
        {/* হেডার */}
        <h1 className="text-3xl font-black mb-8 flex items-center gap-3 tracking-tight">
          <span className="w-3 h-8 bg-amber-500 rounded-full" />
          আপনার কার্টে ({cart.length}) টি খাবার আছে
        </h1>

        {/* grid লেআউট: ২ কলাম */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ⬅️ বামপাশের সেকশন: খাবারের লিস্ট */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="bg-[#141414] border border-white/5 rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 hover:border-white/10"
              >
                {/* খাবার ইমেজ */}
                <Image 
                width={150}
                height={200}
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 rounded-xl object-cover bg-gray-900 border border-white/5"
                />

                {/* ইনফো ও কন্ট্রোল */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base text-white truncate">{item.name}</h3>
                  <p className="text-amber-500 font-black text-sm mt-0.5">৳{item.price}</p>
                  
                  {/* কোয়ান্টিটি প্লাস-মাইনাস বাটন (মোবাইলে নিচে নামবে) */}
                  <div className="flex items-center gap-2 mt-3">
                    <button 
                      onClick={() => updateQuantity(item.id, 'decrease')}
                      className="size-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition cursor-pointer text-gray-400 hover:text-white"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-white">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, 'increase')}
                      className="size-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition cursor-pointer text-gray-400 hover:text-white"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                </div>

                {/* ডানপাশের অংশ: টোটাল দাম ও ডিলেট বাটন */}
                <div className="flex flex-col items-end justify-between h-20 pl-2">
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-500/10 transition cursor-pointer"
                  >
                    <Trash2 className="size-4" />
                  </button>
                  <span className="font-black text-sm text-white">
                    ৳{item.price * item.quantity}
                  </span>
                </div>

              </div>
            ))}
          </div>

          {/* ➡️ ডানপাশের সেকশন: অর্ডার সামারি ও চেকআউট বাটন */}
          <div className="lg:col-span-1">
            <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 sticky top-6">
              <h2 className="text-lg font-black mb-4 pb-3 border-b border-white/5">অর্ডার সামারি</h2>
              
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>সাবটোটাল</span>
                  <span className="text-white font-bold">৳{subTotal}</span>
                </div>
                
                <div className="h-px bg-white/5 my-2" />
                
                {/* <div className="flex justify-between text-base font-black text-white pt-1">
                  <span>সর্বমোট বিল</span>
                  <span className="text-amber-500 text-lg">৳{grandTotal}</span>
                </div> */}
              </div>

              {/* 💳 প্রসিড টু চেকআউট বাটন */}
              <Link 
                href="/checkout"
                className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-[#0d0d0d] font-black py-3.5 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-sm shadow-lg shadow-amber-500/10 group cursor-pointer"
              >
                চেকআউট করুন
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <p className="text-[11px] text-gray-500 text-center mt-3 leading-tight">
                চেকআউট বাটনে ক্লিক করার মাধ্যমে আপনি কুডিলের শর্তাবলী মেনে নিচ্ছেন।
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}