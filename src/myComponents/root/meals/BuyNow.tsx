'use client'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { MealData } from '@/modules/services/meal.services'
import { useCartStore } from '@/store/useCartStore'
import { CreditCard } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import Swal from 'sweetalert2'

interface BuyNowProps {
    meal: MealData,
    finalPrice: number,
    quantity: number
}

export default function BuyNow({meal, finalPrice, quantity}: BuyNowProps) {

    const {addToCart} = useCartStore()
    const router = useRouter()

    const {data: session} = authClient.useSession()
    
    const totalPrice = finalPrice * quantity;

    const handleBuyNow = () => {

    addToCart({
      id: meal.id,
            name: meal.name,
            price: finalPrice,
            image: meal.image || "https://i.ibb.co.com/fVyR9Dk6/shourav-sheikh-j9low-Ncnl04-unsplash.jpg",
            discount: meal.discount ?? 0,
            providerId: meal.providerId 
    }, quantity);

    if (!session?.user) {
            Swal.fire({
                title: 'লগইন করা নেই! 🔐',
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
            }).then((result) => {
                if (result.isConfirmed) {
                    // লগইন সাকসেসফুল হলে যেন আবার এই চেকাউট পেজেই ফিরে আসে, তাই query parameter পাঠানো
                    router.push('/signin?callbackUrl=/checkout');
                }
            });
        } else {
            // ✅ ইউজার লগইন থাকলে সরাসরি চেকাউট পেজে চলে যাবে
            router.push('/checkout');
        }
  };


    return (
        <div><Button
            onClick={handleBuyNow}
            className="bg-amber-500 hover:bg-amber-600 text-[#0d0d0d] font-black py-6 rounded-xl flex items-center justify-center gap-2 transition active:scale-[0.98] shadow-xl shadow-amber-500/10 cursor-pointer w-full">
            <CreditCard className="size-5" />
            এখনই অর্ডার করুন (৳{totalPrice})
        </Button></div>
    )
}
