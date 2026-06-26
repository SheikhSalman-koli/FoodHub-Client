'use client'
import { Button } from '@/components/ui/button';
import { MealData } from '@/modules/services/meal.services';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart } from 'lucide-react';

interface AddToCartProps {
    meal: MealData,
    finalPrice: number
}

export default function AddToCart({meal, finalPrice}: AddToCartProps) {

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
            providerId: meal.providerId // 🎯 ডাটাবেজ থেকে আসা প্রোভাইডার আইডি
        }, 1);

        // ⚠️ যদি আলাদা রেস্তোরাঁর খাবার হয়
        if (!res.success && res.errorType === 'DIFFERENT_PROVIDER') {
            const shouldReplace = window.confirm(
                "আপনার কার্টে অলরেডি অন্য রেস্তোরাঁর খাবার আছে। নতুন রেস্তোরাঁর খাবারটি যোগ করতে আগের কার্ট খালি করতে চান?"
            );

            if (shouldReplace) {
                // ইউজার রাজি হলে আগের কার্ট মুছে এই নতুন খাবারটি যোগ হয়ে যাবে
                replaceCart({
                    id: meal.id,
                    name: meal.name,
                    price: finalPrice,
                    image: meal.image || "https://i.ibb.co.com/fVyR9Dk6/shourav-sheikh-j9low-Ncnl04-unsplash.jpg",
                    discount: meal.discount ?? 0,
                    providerId: meal.providerId
                }, 1);
                alert("আগের কার্ট মুছে নতুন খাবার যোগ করা হয়েছে!");
            }
        } else {
            alert("খাবার কার্টে যোগ হয়েছে!");
        }
    };

    return (
        <Button
            onClick={handleAddToCart}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer">
            <ShoppingCart className="size-5" />
        </Button>
    )
}



