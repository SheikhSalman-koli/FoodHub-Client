"use client";

import { useState } from 'react';
import { Star, Flame, Minus, Plus, ShoppingCart, CreditCard, Clock, ShieldCheck, ThumbsUp } from 'lucide-react';
import { MealData } from '@/modules/services/meal.services';
import SimilarFoods from './SimilarFoods';
import CustomerReviews from './CustomerReviews';
import { CalculateDiscount } from '@/lib/helpers/CalculateDiscount';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';

type MelaProps = {
    singleMealData: MealData,
}

export default function MealDetailsPage({ singleMealData }: MelaProps) {

    const [quantity, setQuantity] = useState(1);
    const { originalPrice, finalPrice, hasDiscount } = CalculateDiscount(singleMealData.price, singleMealData.discount ?? 0);
    // if customer buy more then one
    const totalPrice = finalPrice * quantity;

    const reviews = singleMealData?.reviews || [];
    const totalReviews = reviews.length;
    const totalStars = reviews.reduce((sum, review) => sum + review.starCount, 0);
    const averageRating = totalReviews > 0 ? (totalStars / totalReviews).toFixed(1) : "0.0";
    const similarMeals = singleMealData?.similarMeals || [];

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    // add to cart
    const addToCart = useCartStore((state) => state.addToCart)
    const handleAddToCart =()=> {
        addToCart({
            id: singleMealData.id,
            name: singleMealData.name,
            price: finalPrice,
            image: singleMealData.image || "https://i.ibb.co.com/fVyR9Dk6/shourav-sheikh-j9low-Ncnl04-unsplash.jpg",
            discount: singleMealData.discount ?? 0
        },1)
        alert(`${singleMealData.name} কার্টে যোগ হয়েছে!`);
    }

    return (
        <div className="min-h-screen max-w-7xl mx-auto pt-28 text-white pb-16 selection:bg-amber-500 selection:text-black">

            <div className="max-w-6xl mx-auto px-4 pt-8 md:pt-12">
                {/* 🟢 মেইন কন্টেন্ট গ্রিড: ইমেজ বনাম ডিটেইলস */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                    {/* 📸 বাম পাশ: বড় ইমেজের সেকশন */}
                    <div className="relative w-full aspect-4/3 sm:aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-white/5 bg-[#141414] shadow-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={singleMealData.image ?? undefined}
                            alt={singleMealData.name ?? ''}
                            className="w-full h-full object-cover"
                        />
                        {/* গ্রেডিয়েন্ট ওভারলে */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-50" />

                        {/* ব্যাজসমূহ */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {hasDiscount && (
                                <span className="bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-lg">
                                    {singleMealData.discount} % ছাড়
                                </span>
                            )}
                            {singleMealData.orderCount > 100 && (
                                <span className="bg-amber-500 text-[#0d0d0d] text-xs font-black px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-lg flex items-center gap-1">
                                    <Flame className="size-3.5" fill="black" /> বেস্টসেলার
                                </span>
                            )}
                        </div>
                    </div>

                    {/* 📝 ডান পাশ: খাবারের ইনফো ও অ্যাকশন বাটন */}
                    <div className="flex flex-col">
                        {/* <span className="text-amber-500 text-sm font-semibold tracking-wider uppercase">
                            {singleMealData.restaurantName}
                        </span> */}
                        <h1 className="text-3xl md:text-4xl font-black text-white mt-1 mb-3 tracking-tight">
                            {singleMealData.name}
                        </h1>

                        {/* রেটিং ও সেলস সোশ্যাল প্রুফ */}
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 border-b border-white/5 pb-4">
                            <div className="flex items-center gap-1 text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg">
                                <Star className="size-4 fill-amber-400" />
                                <span>{averageRating}</span>
                            </div>
                            <span>•</span>
                            <span className="text-green-400 font-medium">{singleMealData.orderCount}+ অর্ডার সফল হয়েছে</span>
                            <span>•</span>
                        </div>

                        {/* ডেসক্রিপশন */}
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                            {singleMealData.description}
                        </p>

                        {/* প্রাইসিং সেকশন */}
                        <div className="bg-[#141414] border border-white/5 p-4 rounded-2xl mb-6 flex items-center justify-between">
                        
                            <div>
                                <span className="text-xs text-gray-500 block font-medium uppercase tracking-wider">মূল্য</span>
                                <div className="flex items-baseline gap-2 mt-0.5">
                                    <span className="text-3xl font-black text-amber-500">৳{finalPrice}</span>
                                    {hasDiscount && (
                                        <span className="text-sm text-gray-500 line-through font-medium">৳{originalPrice}</span>
                                    )}
                                </div>
                            </div>

                            {/* কোয়ান্টিটি কাউন্টার */}
                            <div className="flex items-center bg-[#0d0d0d] border border-white/10 rounded-xl p-1">
                                <button
                                    onClick={handleDecrement}
                                    className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg transition"
                                >
                                    <Minus className="size-4" />
                                </button>
                                <span className="px-4 font-bold text-lg min-w-[2.5rem] text-center">{quantity}</span>
                                <button
                                    onClick={handleIncrement}
                                    className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg transition"
                                >
                                    <Plus className="size-4" />
                                </button>
                            </div>
                        </div>

                        {/* 🛒 অ্যাকশন বাটনসমূহ (Add to Cart & Buy Now) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <Button 
                            onClick={handleAddToCart}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer">
                                <ShoppingCart className="size-5" />
                                কার্টে যোগ করুন
                            </Button>
                            <Button className="bg-amber-500 hover:bg-amber-600 text-[#0d0d0d] font-black py-4 rounded-xl flex items-center justify-center gap-2 transition active:scale-[0.98] shadow-xl shadow-amber-500/10 cursor-pointer">
                                <CreditCard className="size-5" />
                                অর্ডার করুন (৳{totalPrice})
                            </Button>
                        </div>

                        {/* সিকিউরিটি ট্যাগ */}
                        <div className="flex items-center gap-2 text-xs text-gray-500 bg-[#141414]/50 border border-white/5 p-3 rounded-xl">
                            <ShieldCheck className="size-4 text-green-500 shrink-0" />
                            <span>১০০% হাইজেনিক ও ফ্রেশ ফুড গ্যারান্টি। স্বাস্থ্যসম্মত উপায়ে প্যাকড।</span>
                        </div>

                    </div>
                </div>

                {/* 🟢 রিভিউজ সেকশন */}
                {reviews?.length > 0 &&
                    <CustomerReviews
                        reviews={reviews}
                    />
                }


                {/* 🟢 সিমিলার ফুড সাজেস্টশন সেকশন */}
                {similarMeals.length > 0 &&
                    <SimilarFoods
                        similarMeals={similarMeals}
                    />
                }

            </div>
        </div>
    );
}