
"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, startTransition } from "react";
import { RefreshCw } from "lucide-react";
import { CategoryData } from "@/modules/services/category.services";

export default function SearchFilterControls({ categories }: { categories: CategoryData[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const [priceError, setPriceError] = useState<string | null>(null);

  const hasActiveFilters = !!(search || category || minPrice || maxPrice || priceError);

  const handlePriceChange = (value: string, type: "min" | "max") => {
    const banglaNumberRegex = /[০-৯]/;

    if (banglaNumberRegex.test(value)) {
      setPriceError("দয়া করে মূল্য ইংরেজিতে লিখুন (যেমন: 500) ⚠️");
      if (type === "min") setMinPrice(value); 
      return;
    }

    if (value !== "" && !/^\d+$/.test(value)) {
      return; 
    }

    setPriceError(null);
    if (type === "min") setMinPrice(value);
    else setMaxPrice(value);
  };

  useEffect(() => {
    if (priceError) return;

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category) params.set("category", category);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, category, minPrice, maxPrice, priceError, pathname, router]);

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setPriceError(null);
    router.push(pathname);
  };

  return (
    <div className="p-6 px-4 md:px-12 rounded-2xl space-y-4">
      <div className="grid grid-cols-12 gap-3 items-end">
        
        {/*খাবার খুঁজুন */}
        <div className="col-span-7 md:col-span-4">
          <label className="block text-xs uppercase font-bold text-gray-400 mb-1 truncate">খাবার খুজুন</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="কাচ্চি, পিৎজা খুঁজুন..."
            className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500 h-10"
          />
        </div>

        {/* ক্যাটেগরি ফিল্টার */}
        <div className="col-span-5 md:col-span-3">
          <label className="block text-xs uppercase font-bold text-gray-400 mb-1 truncate">ক্যাটেগরি ফিল্টার করুন</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500 cursor-pointer h-10"
          >
            <option value="">সব ক্যাটেগরি</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className={`${hasActiveFilters ? "col-span-8 md:col-span-3" : "col-span-12 md:col-span-5"} transition-all duration-200 relative`}>
          <label className="block text-xs uppercase font-bold text-gray-400 mb-1">
            মূল্য নির্ধারন করুন-(৳)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="numeric"
              value={minPrice}
              onChange={(e) => handlePriceChange(e.target.value, "min")}
              placeholder="Min"
              className={`w-1/2 bg-[#0d0d0d] border rounded-xl px-3 py-2 text-sm text-white focus:outline-none h-10 ${priceError ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-amber-500'}`}
            />
            <input
              type="text"
              inputMode="numeric"
              value={maxPrice}
              onChange={(e) => handlePriceChange(e.target.value, "max")}
              placeholder="Max"
              className={`w-1/2 bg-[#0d0d0d] border rounded-xl px-3 py-2 text-sm text-white focus:outline-none h-10 ${priceError ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-amber-500'}`}
            />
          </div>
          
          {/* এরর মেসেজ */}
          {priceError && (
            <span className="absolute -bottom-5 left-0 text-[10px] text-red-400 font-medium animate-pulse">
              {priceError}
            </span>
          )}
        </div>

        {/* রিসেট বাটন */}
        {hasActiveFilters && (
          <div className="col-span-4 md:col-span-2 animate-in fade-in duration-200">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm h-10 rounded-xl transition duration-200 cursor-pointer"
            >
              <span>রিসেট</span>
              <RefreshCw size={14} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}