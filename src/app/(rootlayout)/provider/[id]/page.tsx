import React from 'react'
import { MapPin, ShoppingBag } from "lucide-react";
import MealCard from '@/myComponents/root/homepage/cards/MealCard';
import { providerServices } from '@/modules/services/provider.services';
import { MealData } from '@/modules/services/meal.services';
import Image from 'next/image';

type DynamicProviderData = {
  restaurantName: string,
  tagline?: string,
  location: string,
  logo?: string | null,
  meals?: MealData[]
}

export default async function page({params}: {
  params: Promise<{ id: string }>
}) {
    const {id} = await params
    
    const providers = await providerServices.getProvidersById(id)
    const provider = Array.isArray(providers) ? providers[0] : providers

    const {restaurantName, tagline, location, logo, meals}: DynamicProviderData = provider || {
      restaurantName: '',
      location: '',
      tagline: '',
      logo: '',
      meals: []
    }
    const logoSrc = logo ?? 'https://i.ibb.co.com/fVyR9Dk6/shourav-sheikh-j9low-Ncnl04-unsplash.jpg'

  return <div className="min-h-screen bg-gray-50 text-gray-900 pb-12 pt-28">
      
      {/* 🟢 সুদৃশ্য রেস্তোরাঁ হেডার সেকশন */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 flex flex-col md:flex-row items-center gap-6">
          {/* রেস্তোরাঁ লোগো */}
          <Image 
          fill
            src={logoSrc} 
            alt={restaurantName} 
            className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover shadow-md border-2 border-orange-100"
          />
          
          {/* রেস্তোরাঁর বিস্তারিত বিবরণ */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              {restaurantName}
            </h1>
            <p className="text-orange-600 font-medium italic mt-1 text-sm md:text-base">
              {tagline}
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin size={16} className="text-orange-500" />
                {location}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 hidden sm:inline" />
              <span className="flex items-center gap-1">
                <ShoppingBag size={16} className="text-gray-400" />
                {meals?.length} Items Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 🟢 মেনু বা খাবারগুলোর গ্রিড সেকশন */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-orange-500 rounded-full" />
          Available Meals
        </h2>

        {meals?.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border">
            বর্তমানে কোনো খাবার উপলব্ধ নেই।
          </div>
        ) : (
          <MealCard
            meals={meals ?? []}
          />
        )}
      </div>

    </div>
}
