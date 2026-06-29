import React from 'react'
import { MapPin, ShoppingBag, Flame } from "lucide-react";
import MealCard from '@/myComponents/root/homepage/cards/MealCard';
import { providerServices } from '@/modules/services/provider.services';
import { MealData } from '@/modules/services/meal.services';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryData, categoryService } from '@/modules/services/category.services';
import SearchFilterControls from '@/myComponents/root/meals/searchControll';

type DynamicProviderData = {
  restaurantName: string,
  tagline?: string,
  location: string,
  logo?: string | null,
  meals?: MealData[]
}

export default async function page({ params, searchParams }: {
  params: Promise<{ id: string }>,
  searchParams: Promise<{ search?: string; category?: string; minPrice?: string; maxPrice?: string; }>
}) {
 
  const { id } = await params
  const p = await searchParams

  const search = p.search || "";
  const category = p.category || "";
  const minPrice = p.minPrice || "";
  const maxPrice = p.maxPrice || "";

  // রেস্তোরাঁ এবং অল-ক্যাটাগরি ডাটা প্যারালালে ফেচ 
  const [provider, categories] = await Promise.all([
    providerServices.getProvidersById(id),
    categoryService.getCategories() 
  ])

  const activeCategoryObj = (categories || []).find((cat: CategoryData) => cat.slug === category);
  const activeCategoryId = activeCategoryObj?.id;

  const { restaurantName, tagline, location, logo, meals }: DynamicProviderData = provider || {
    restaurantName: '',
    location: '',
    tagline: '',
    logo: '',
    meals: []
  }
  
  const logoSrc = logo ?? 'https://i.ibb.co.com/fVyR9Dk6/shourav-sheikh-j9low-Ncnl04-unsplash.jpg'

  const filteredMeals = (meals || []).filter((meal: MealData) => {
  
    if (search) {
      const searchTerm = search.toLowerCase();
      const nameMatch = meal.name?.toLowerCase().includes(searchTerm);
      const descMatch = meal.description?.toLowerCase().includes(searchTerm);
      if (!nameMatch && !descMatch) return false;
    }

    if (category && meal.categoryId !== activeCategoryId) {
      return false;
    }

    if (minPrice && Number(meal.price) < Number(minPrice)) {
      return false;
    }

    if (maxPrice && Number(meal.price) > Number(maxPrice)) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-100 pb-20 pt-28 relative overflow-hidden">

      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-125 h-125 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="bg-[#0d0d0d]/70 backdrop-blur-xl border border-white/5 sticky top-0 z-20 shadow-2xl shadow-black/20">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border border-white/10 bg-[#141414] shadow-2xl shadow-black/50 group">
            <Image
              fill
              src={logoSrc}
              alt={restaurantName}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-w-768px) 96px, 128px"
              priority
            />
          </div>
          <div className="text-center md:text-left flex-1 space-y-1.5">
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              {restaurantName}
            </h1>

            <p className="text-amber-500 font-medium tracking-wide text-xs md:text-sm uppercase opacity-90">
              {tagline}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 pt-2 text-xs md:text-sm text-gray-400">
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                <MapPin size={14} className="text-amber-500" />
                {location}
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                <ShoppingBag size={14} className="text-gray-400" />
                মেনুতে {meals?.length || 0} টি আইটেম আছে 
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* মেনু ও ফিল্টার সেকশন */}
      <div className=" mt-12 relative z-10">
      
          <SearchFilterControls categories={categories || []} />
       
       
        <h2 className="text-xl px-4 md:px-12 md:text-2xl font-light text-gray-400 mb-8 tracking-tight flex items-center gap-2">
          <Flame size={18} className="text-amber-500" />
          আজকের <span className="font-black text-transparent bg-clip-text bg-linear-to-r from-white to-amber-500">বিশেষ আয়োজন</span>
        </h2>

        {/* কন্ডিশনাল রেন্ডারিং */}
        {meals?.length === 0 ? (
          <div className="text-center py-16 px-6 text-gray-400 bg-[#141414] border border-white/5 rounded-3xl shadow-xl max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-300">
            <div className="text-4xl mb-4 bg-[#0d0d0d] w-16 h-16 flex items-center justify-center rounded-2xl mx-auto border border-white/5 text-amber-500">
              🍽️
            </div>
            <h3 className="font-black text-white text-lg mb-1">দুঃখিত, কোনো খাবার তৈরি নেই!</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
              এই মুহূর্তে এই রেস্টুরেন্টের সব খাবার স্টক-আউট আছে। আমাদের অন্যান্য চমৎকার রেস্টুরেন্টগুলো ট্রাই করে দেখতে পারেন।
            </p>
            <Link
              href="/providers"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition duration-200 cursor-pointer shadow-lg shadow-amber-500/10"
            >
              অন্যান্য রেস্টুরেন্ট দেখুন 🏪
            </Link>
          </div>
        ) : filteredMeals.length === 0 ? (
          <div className="text-center py-16 px-6 text-gray-400 bg-[#141414] border border-white/5 rounded-3xl shadow-xl max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-300">
            <div className="text-4xl mb-4 bg-[#0d0d0d] w-16 h-16 flex items-center justify-center rounded-2xl mx-auto border border-white/5 text-amber-500">
              🔍
            </div>
            <h3 className="font-black text-white text-lg mb-1">কোনো সুস্বাদু পদ মেলেনি!</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              আপনার ফিল্টার কিংবা সার্চ কি-ওয়ার্ডটি রিসেট করে পুনরায় চেষ্টা করুন। ফিল্টার রিসেট করতে ওপরের বাতিল বাটনে ক্লিক করুন।
            </p>
          </div>
        ) : (
          <div className="animate-in px-4 md:px-12 fade-in slide-in-from-bottom-4 duration-500">
            <MealCard meals={filteredMeals} />
          </div>
        )}
      </div>
    </div>
  );
}