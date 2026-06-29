import { categoryService } from "@/modules/services/category.services";
import { mealServices } from "@/modules/services/meal.services";
import MealCard from "@/myComponents/root/homepage/cards/MealCard";
import SearchFilterControls from "@/myComponents/root/meals/searchControll";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function MealPage({ searchParams }: PageProps) {

  const params = await searchParams;
  const search = params.search || "";
  const category = params.category || "";
  const minPrice = params.minPrice || "";
  const maxPrice = params.maxPrice || "";

  const [meals, categories] = await Promise.all([
    mealServices.getMeals({ search, category, minPrice, maxPrice }),
    categoryService.getCategories()
  ]);

  return (
    <div className='pt-28 bg-[#0d0d0d] pb-10'>

      <SearchFilterControls
        categories={categories}
      />

      {meals.length === 0 ? (
        <div className="px-4 md:px-0">
          <div className="flex flex-col items-center justify-center text-center p-12 mt-10 bg-[#141414] border border-white/5 rounded-3xl max-w-2xl mx-auto min-h-87.5 animate-in fade-in zoom-in-95 duration-300">

            <div className="relative mb-6 p-5 bg-[#0d0d0d] border border-white/10 rounded-2xl text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.05)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-12 animate-pulse"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-wide">
              দুঃখিত! খাবারটি খুঁজে পাওয়া যায়নি 😢
            </h3>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed mb-6">
              সেই-স্বাদে এই নামে বা এই বাজেটে কোনো খাবার আপাতত তৈরি নেই। বানানটি পরীক্ষা করুন অথবা ফিল্টার পরিবর্তন করে দেখুন!
            </p>

            <Link
              href="/meals"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition duration-200 cursor-pointer shadow-lg shadow-amber-500/10"
            >
              সব খাবার একসাথে দেখুন 🍽️
            </Link>

          </div>
        </div>
      ) : (
        <div className="mx-auto lg:max-w-6xl px-4 lg:px-0">
          <MealCard
            meals={meals}
          />
        </div>
      )}
    </div>
  )
}
