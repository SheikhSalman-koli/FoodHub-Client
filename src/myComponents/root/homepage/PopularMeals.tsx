import { mealServices } from '@/modules/services/meal.services';
import React from 'react';
import MealCard from './cards/MealCard';
import Link from 'next/link';





export default async function PopularMeals() {
  // Filter out deleted items
 const meals = await mealServices.getMeals()

  return (
    <section className="w-full bg-[#0d0d0d] py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            জনপ্রিয় <span className="font-extrabold text-amber-500">খাবারসমূহ</span>
          </h2>

           <Link
            href="/meals" 
            className="text-sm font-bold text-gray-400 hover:text-amber-500 transition-colors uppercase border-b border-gray-800 hover:border-amber-500"
          >
            সবগুলো দেখুন &rarr;
          </Link>
        </div>

        {/* Meals Grid */}
        <MealCard 
        meals={meals}
        />
           <div className="mt-4 flex justify-between items-center">
          <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
          </h2>

           <Link
            href="/meals" 
            className="text-sm font-bold text-gray-400 hover:text-amber-500 transition-colors uppercase border-b border-gray-800 hover:border-amber-500"
          >
            সবগুলো দেখুন &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}