import { CalculateDiscount } from '@/lib/helpers/CalculateDiscount';
import { MealData } from '@/modules/services/meal.services';
import Link from 'next/link';
import React from 'react'

interface SimilarFoodProps {
    similarMeals: MealData[]
}

export default function SimilarFoods({ similarMeals }: SimilarFoodProps) {


    return (
        <div className="mt-16">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2 tracking-tight">
                <span className="w-2.5 h-6 bg-amber-500 rounded-full" />
                আরও কিছু চমৎকার খাবার
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {similarMeals.map((meal) => {
                    // 🚀 আমাদের হেল্পার ফাংশনটি এখানে ম্যাজিক দেখাবে
                    const { originalPrice, finalPrice, hasDiscount } = CalculateDiscount(meal.price, meal.discount ?? 0);

                    return (
                        <Link
                            href={`/meals/${meal.id}`}
                            key={meal.id}
                            className="group bg-[#141414] border border-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:border-amber-500/30 flex flex-col cursor-pointer"
                        >
                            {/* ইমেজ সেকশন */}
                            <div className="relative aspect-[16/11] bg-gray-900 overflow-hidden">
                                <img src={meal.image ?? undefined} alt={meal.name} className="w-full h-full object-cover" />

                                {/* 🏷️ ডিসকাউন্ট ব্যাজ: এখন আমরা ডাটাবেজের পার্সেন্টেজটাই (%) সরাসরি দেখাবো */}
                                {hasDiscount && (
                                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-md">
                                        {meal.discount}% ছাড়
                                    </span>
                                )}
                            </div>

                            {/* কন্টেন্ট সেকশন */}
                            <div className="p-3 flex flex-col justify-between h-[115px] md:h-[125px] grow">
                                <div>
                                    <h3 className="font-bold text-xs md:text-sm text-white group-hover:text-amber-400 transition line-clamp-1">
                                        {meal.name}
                                    </h3>
                                    <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5 leading-tight">
                                        {meal.description}
                                    </p>
                                </div>

                                {/* ফুটার: ফাইনাল প্রাইস প্রদর্শন */}
                                <div className="flex items-center justify-between mt-auto pt-1 border-t border-white/5">
                                    <div className="flex flex-col">
                                        {hasDiscount && (
                                            <span className="text-[10px] text-gray-500 line-through font-medium leading-none mb-0.5">
                                                ৳{originalPrice}
                                            </span>
                                        )}
                                        <span className="text-sm md:text-base font-black text-amber-500 leading-none">
                                            ৳{finalPrice}
                                        </span>
                                    </div>

                                    <span className="text-[11px] text-gray-400 font-bold group-hover:text-amber-400 transition-colors flex items-center gap-0.5">
                                        দেখুন <span className="transition-transform group-hover:translate-x-0.5">→</span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}
