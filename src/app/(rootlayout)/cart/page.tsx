'use client';

import React from 'react';
import { useCartStore } from '@/store/useCartStore';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { CalculateDiscount } from '@/lib/helpers/CalculateDiscount';

export default function CartPage() {

  const { cart, updateQuantity, removeFromCart } = useCartStore();

  const { originalSubTotal, subTotal } = cart.reduce(
  (acc, item) => {
    const { finalPrice } = CalculateDiscount(item.price, item.discount ?? 0);

    acc.originalSubTotal += item.price * item.quantity; 
    acc.subTotal += finalPrice * item.quantity; 

    return acc;
  },
  { originalSubTotal: 0, subTotal: 0 }
);

// মোট ছাড় বা ডিসকাউন্ট অ্যামাউন্ট
const discountedAmount = originalSubTotal - subTotal;

  const {data: session} = authClient.useSession()
  const router = useRouter()

  const handleCheckout =()=> {
    if (!session?.user) {
            Swal.fire({
                title: 'লগইন করা নেই!',
                text: "অর্ডারটি সম্পন্ন করতে দয়া করে প্রথমে লগইন করুন।",
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'লগইন পেজে যান',
                cancelButtonText: 'পরে করব',
                background: '#141414',
                color: '#ffffff',
                confirmButtonColor: '#f59e0b',
                cancelButtonColor: '#262626',
                customClass: {
                    popup: 'border border-white/5 rounded-3xl',
                }
            }).then( (result) => {
                if (result.isConfirmed) {
                    // লগইন সাকসেসফুল হলে যেন আবার এই চেকাউট পেজেই ফিরে আসে, তাই query parameter পাঠানো
                  router.push('/signin?callbackUrl=/checkout');
                }
            });
        } else {
            // ✅ ইউজার লগইন থাকলে সরাসরি চেকাউট পেজে চলে যাবে
            router.push('/checkout');
        }
  }


  // কার্ট যদি একদম খালি থাকে
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center p-4 pt-24">
        <div className="p-6 bg-[#141414] border border-white/5 rounded-full mb-4 text-gray-500 animate-bounce">
          <ShoppingBag className="size-12" />
        </div>
        <h2 className="text-xl font-black tracking-tight mb-2">আপনার কার্টটি সম্পূর্ণ খালি!</h2>
        <p className="text-gray-500 text-sm mb-6 text-center max-w-xs">সেই-স্বাদের সুস্বাদু খাবারগুলো এখনো কার্টে যোগ করেননি। জলদি মেনু ঘুরে আসুন!</p>
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
      
      {/* বামপাশের সেকশন: খাবারের লিস্ট */}
      <div className="lg:col-span-2 space-y-4">
        {cart.map((item) => {
          const discountPercent = item.discount ?? 0;
          const hasDiscount = discountPercent > 0;
          const { finalPrice } = CalculateDiscount(item.price, discountPercent);

          return (
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
                className="w-20 h-20 rounded-xl object-cover bg-gray-900 border border-white/5 shrink-0"
              />

              {/* ইনফো ও কন্ট্রোল */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base text-white truncate">{item.name}</h3>
                
                {/* 🏷️ প্রাইস ও ডিসকাউন্ট ব্যাজ */}
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-amber-400 font-extrabold text-base">
                    ৳{finalPrice}
                  </span>
                  
                  {hasDiscount && (
                    <>
                      <span className="text-red-500 font-medium line-through text-xs">
                        ৳{item.price}
                      </span>
                      <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {discountPercent}% ছাড়
                      </span>
                    </>
                  )}
                </div>
                
                {/* কোয়ান্টিটি প্লাস-মাইনাস বাটন */}
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
              <div className="flex flex-col items-end justify-between h-20 pl-2 shrink-0">
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-500 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-500/10 transition cursor-pointer"
                >
                  <Trash2 className="size-4" />
                </button>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 block uppercase font-medium tracking-wider">মোট</span>
                  <span className="font-black text-sm text-white">
                    ৳{finalPrice * item.quantity}
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* ➡️ ডানপাশের সেকশন: অর্ডার সামারি */}
      <div className="lg:col-span-1">
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 sticky top-6">
          <h2 className="text-lg font-black mb-4 pb-3 border-b border-white/5 text-white">অর্ডার সামারি</h2>
          
          <div className="space-y-3 text-sm">
            {/* মূল সাবটোটাল */}
            <div className="flex justify-between text-gray-400">
              <span>মূল সাবটোটাল</span>
              <span className="text-white font-medium">৳{originalSubTotal}</span>
            </div>

            {/* মোট ডিসকাউন্ট (যদি থাকে) */}
            {discountedAmount > 0 && (
              <div className="flex justify-between text-emerald-400 font-medium">
                <span>মোট ছাড় (Savings)</span>
                <span>- ৳{discountedAmount}</span>
              </div>
            )}

            <div className="h-px bg-white/5 my-3" />

            {/* চূড়ান্ত সাবটোটাল */}
            <div className="flex justify-between items-center text-base font-black">
              <span className="text-white">সর্বমোট বিল</span>
              <span className="text-amber-400 text-xl">৳{subTotal}</span>
            </div>
          </div>

          {/* চেকআউট বাটন */}
          <Button 
            onClick={handleCheckout}
            className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-[#0d0d0d] font-black py-3.5 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-sm shadow-lg shadow-amber-500/10 group cursor-pointer"
          >
            চেকআউট করুন
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <p className="text-[11px] text-gray-500 text-center mt-3 leading-tight">
            চেকআউট বাটনে ক্লিক করার মাধ্যমে আপনি সেই-স্বাদের শর্তাবলী মেনে নিচ্ছেন।
          </p>
        </div>
      </div>

    </div>

  </div>
</div>
  );
}