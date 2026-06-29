'use client'
import { Button } from '@/components/ui/button';
import { MealData } from '@/modules/services/meal.services';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart } from 'lucide-react';
import Swal from 'sweetalert2';

interface AddToCartProps {
    meal: MealData,
    finalPrice: number
    showCartText?: boolean
}

export default function AddToCart({ meal, finalPrice, showCartText = false }: AddToCartProps) {

    const { addToCart, replaceCart } = useCartStore();

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const res = addToCart({
            id: meal.id,
            name: meal.name,
            price: finalPrice,
            image: meal.image || "https://i.ibb.co.com/fVyR9Dk6/shourav-sheikh-j9low-Ncnl04-unsplash.jpg",
            discount: meal.discount ?? 0,
            providerId: meal.providerId // ডাটাবেজ থেকে আসা প্রোভাইডার আইডি
        }, 1);

        // ⚠️ যদি আলাদা রেস্তোরাঁর খাবার হয়
        if (!res.success && res.errorType === 'DIFFERENT_PROVIDER') {
            Swal.fire({
                title: 'কার্ট খালি করতে চান? 🛒',
                text: "আপনার কার্টে অলরেডি অন্য রেস্তোরাঁর খাবার আছে। নতুন রেস্তোরাঁর খাবারটি যোগ করতে আগের কার্ট খালি করতে চান?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'হ্যাঁ, খালি করুন',
                cancelButtonText: 'বাতিল',
                background: '#141414',
                color: '#ffffff',
                confirmButtonColor: '#f59e0b',
                cancelButtonColor: '#262626',
                customClass: {
                    popup: 'border border-white/5 rounded-3xl',
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // কার্ট রিপ্লেস করা
                    replaceCart({
                        id: meal.id,
                        name: meal.name,
                        price: finalPrice,
                        image: meal.image || "https://i.ibb.co.com/fVyR9Dk6/shourav-sheikh-j9low-Ncnl04-unsplash.jpg",
                        discount: meal.discount ?? 0,
                        providerId: meal.providerId
                    }, 1);

                    // কার্ট খালি করে নতুন খাবার যোগ করার সাকসেস মেসেজ
                    Swal.fire({
                        title: 'কার্ট আপডেট হয়েছে! 🎉',
                        text: 'আগের কার্ট মুছে নতুন খাবার যোগ করা হয়েছে।',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                        background: '#141414',
                        color: '#ffffff',
                        customClass: {
                            popup: 'border border-white/5 rounded-3xl',
                        }
                    });
                }
            });
        } else {
            // সাধারণ অবস্থায় খাবার কার্টে যোগ হওয়ার চমৎকার সাকসেস টোস্ট/মেসেজ
            Swal.fire({
                title: 'খাবার যোগ হয়েছে! 🍔',
                text: 'সফলভাবে খাবারটি আপনার কার্টে যোগ করা হয়েছে।',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                background: '#141414',
                color: '#ffffff',
                customClass: {
                    popup: 'border border-white/5 rounded-3xl',
                }
            });
        }
    };


    return (
        <Button
            onClick={handleAddToCart}
            className={`${showCartText ? 'py-6' : 'py-4'} bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer`}>
            <ShoppingCart className="size-5" />
            {showCartText && <span>কার্টে যোগ করুন</span>}
        </Button>
    )
}



