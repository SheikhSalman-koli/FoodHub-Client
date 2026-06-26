'use client'
import { CalculateDiscount } from '@/lib/helpers/CalculateDiscount';
import { MealData } from '@/modules/services/meal.services';
import { Flame } from 'lucide-react';
import Link from 'next/link';
import AddToCart from '../../meals/AddToCart';
import { usePathname } from 'next/navigation';

type MealCardProps = {
  meals: MealData[];
};

export default function MealCard({ meals }: MealCardProps) {

  const pathname = usePathname()

  const displayedMeal = pathname === '/' ? meals.slice(0,8) : meals


  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
       {displayedMeal?.map((meal) => {

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
            <div className="flex flex-col grow p-2">

              {/* Title */}
              <div className="grow mb-4">
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {meal.name}
                </h3>
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
                  {/* add To Cart */}
                  <AddToCart 
                  meal={meal}
                  finalPrice={finalPrice}
                  />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}