'use client'
import { Button } from '@/components/ui/button';
import { CalculateDiscount } from '@/lib/helpers/CalculateDiscount';
import { MealData } from '@/modules/services/meal.services';
import { useCartStore } from '@/store/useCartStore';
import { Flame, Plus, ShoppingCart } from 'lucide-react';
import Link from 'next/link'; // 1️⃣ Next.js Link ইমপোর্ট করা হয়েছে

type MealCardProps = {
  meals: MealData[];
};

export default function MealCard({ meals }: MealCardProps) {

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {meals?.map((meal) => {

        const { originalPrice, finalPrice, hasDiscount } = CalculateDiscount(meal.price, meal.discount ?? 0);

        const isPopular = meal.orderCount > 100;

        return (
          <Link
            href={`/meals/${meal.id}`}
            key={meal.id}
            className="group flex-col bg-[#141414] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer block"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-900">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${meal.image})` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-transparent to-transparent opacity-60" />

              {/* Floating Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {hasDiscount && (
                  <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-lg">
                    {meal.discount} % ছাড়
                  </span>
                )}
                {isPopular && (
                  <span className="bg-amber-500 text-[#0d0d0d] text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-lg flex items-center gap-1 w-max">
                    <Flame className="size-3" />
                    বেস্টসেলার
                  </span>
                )}
              </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col grow p-4">

              {/* Title & Description */}
              <div className="grow mb-4">
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 mb-1">
                  {meal.name}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                  {meal.description}
                </p>
              </div>

              {/* Order Count / Social Proof */}
              <div className="text-[11px] font-medium text-gray-500 mb-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                {meal.orderCount}+ জন অর্ডার করেছেন
              </div>

              {/* Footer: Price & Add to Cart */}
              <div className="pt-4 border-t border-white/5 flex items-end justify-between gap-2 mt-auto">
                <div className="flex flex-col">
                  {hasDiscount && (
                    <span className="text-xs text-gray-500 line-through font-medium">
                      ৳ {originalPrice}
                    </span>
                  )}
                  <span className="text-xl font-black text-amber-500">
                    ৳ {finalPrice}
                  </span>
                </div>

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart({
                      id: meal.id,
                      name: meal.name,
                      image: meal.image || "https://i.ibb.co.com/fVyR9Dk6/shourav-sheikh-j9low-Ncnl04-unsplash.jpg",
                      price: finalPrice,
                      discount: meal?.discount ?? 0,
                    },
                      1 //default quantity
                    );
                    alert(`${meal.name} কার্টে যোগ হয়েছে!`);
                  }}

                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer">
                  <ShoppingCart className="size-5" />
                </Button>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}