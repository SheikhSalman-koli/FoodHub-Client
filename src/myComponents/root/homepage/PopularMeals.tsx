import { mealServices } from '@/modules/services/meal.services';
import React from 'react';
import MealCard from './cards/MealCard';





export default async function PopularMeals() {
  // Filter out deleted items
 const meals = await mealServices.getMeals()

  return (
    <section className="w-full bg-[#0d0d0d] py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            জনপ্রিয় <span className="font-extrabold text-amber-500">খাবারসমূহ</span>
          </h2>
        </div>

        {/* Meals Grid */}
        <MealCard 
        meals={meals}
        />

      </div>
    </section>
  );
}