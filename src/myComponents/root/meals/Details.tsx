"use client";

import React, { useState } from 'react';
import { Star, Flame, Minus, Plus, ShoppingCart, CreditCard, Clock, ShieldCheck, ThumbsUp } from 'lucide-react';
import { MealData } from '@/modules/services/meal.services';

type MelaProps = {
    singleMealData: MealData,
}

export default function MealDetailsPage({ singleMealData }:MelaProps ) {

    const [quantity, setQuantity] = useState(1);

    // ক্যালকুলেশন লজিক
    const originalPrice = Number(singleMealData.price);
    const discount = singleMealData.discount ?? 0;
    const currentPrice = Math.max(originalPrice - discount, 0);
    const totalPrice = currentPrice * quantity;
    const reviews = singleMealData.reviews ?? [];

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="min-h-screen pt-28 text-white pb-16 selection:bg-amber-500 selection:text-black">

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
                            {discount > 0 && (
                                <span className="bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-lg">
                                    ৳{discount} ছাড়
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
                                <span>৪.৮</span>
                            </div>
                            <span>•</span>
                            <span className="text-green-400 font-medium">{singleMealData.orderCount}+ অর্ডার সফল হয়েছে</span>
                            <span>•</span>
                            {/* <span className="flex items-center gap-1">
                                <Clock className="size-4 text-gray-500" /> {singleMealData.deliveryTime}
                            </span> */}
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
                                    <span className="text-3xl font-black text-amber-500">৳{currentPrice}</span>
                                    {discount > 0 && (
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
                            <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer">
                                <ShoppingCart className="size-5" />
                                কার্টে যোগ করুন
                            </button>
                            <button className="bg-amber-500 hover:bg-amber-600 text-[#0d0d0d] font-black py-4 rounded-xl flex items-center justify-center gap-2 transition active:scale-[0.98] shadow-xl shadow-amber-500/10 cursor-pointer">
                                <CreditCard className="size-5" />
                                অর্ডার করুন (৳{totalPrice})
                            </button>
                        </div>

                        {/* সিকিউরিটি ট্যাগ */}
                        <div className="flex items-center gap-2 text-xs text-gray-500 bg-[#141414]/50 border border-white/5 p-3 rounded-xl">
                            <ShieldCheck className="size-4 text-green-500 shrink-0" />
                            <span>১০০% হাইজেনিক ও ফ্রেশ ফুড গ্যারান্টি। স্বাস্থ্যসম্মত উপায়ে প্যাকড।</span>
                        </div>

                    </div>
                </div>

                {/* 🟢 রিভিউজ সেকশন */}
                <div className="mt-16 pt-8 border-t border-white/5">
                    <h2 className="text-2xl font-black mb-6 flex items-center gap-2 tracking-tight">
                        <span className="w-2.5 h-6 bg-amber-500 rounded-full" />
                        গ্রাহকদের মতামত ({reviews.length})
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reviews.map((review) => (
                            <div key={review.id} className="bg-[#141414] border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
                                <div>
                                    {/* ইউজার প্রোফাইল ও স্টার */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            {/* <img src={review.user.avatar} alt={review.user.name} className="w-10 h-10 rounded-full object-cover border border-white/10" /> */}
                                            <div>
                                                {/* <h4 className="font-bold text-sm text-white">{review.user.name}</h4> */}
                                                <span className="text-[11px] text-gray-500 block">{review.createdAt}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-0.5 text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`size-3 ${i < review.starCount ? 'fill-amber-400' : 'text-gray-700'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    {/* কমেন্ট */}
                                    <p className="text-sm text-gray-400 leading-relaxed italic">{review.comment}</p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
                                    <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-amber-400 transition">
                                        <ThumbsUp className="size-3.5" /> হেল্পফুল
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🟢 সিমিলার ফুড সাজেস্টশন সেকশন
                <div className="mt-16">
                    <h2 className="text-2xl font-black mb-6 flex items-center gap-2 tracking-tight">
                        <span className="w-2.5 h-6 bg-amber-500 rounded-full" />
                        আরও কিছু চমৎকার খাবার
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {similarMeals.map((meal) => {
                            const hasDisc = meal.discount > 0;
                            const finalPrice = Number(meal.price) - meal.discount;

                            return (
                                <div key={meal.id} className="group bg-[#141414] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-amber-500/30">
                                    <div className="relative aspect-4/3 bg-gray-900">
                                        <img src={meal.image} alt={meal.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                                        {hasDisc && (
                                            <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                                                ৳{meal.discount} ছাড়
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-4 flex flex-col justify-between h-[150px]">
                                        <div>
                                            <h3 className="font-bold text-sm text-white group-hover:text-amber-400 transition line-clamp-1">{meal.name}</h3>
                                            <p className="text-xs text-gray-500 line-clamp-2 mt-1">{meal.description}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-base font-black text-amber-500">৳{finalPrice}</span>
                                            <button className="text-xs bg-white/5 hover:bg-amber-500 hover:text-[#0d0d0d] font-bold px-3 py-1.5 rounded-lg transition border border-white/10 hover:border-amber-500 cursor-pointer">
                                                দেখুন
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div> */}

            </div>
        </div>
    );
}