"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalculateDiscount } from "@/lib/helpers/CalculateDiscount";
import { MealData } from "@/modules/services/meal.services";
import { Star, Loader2, Sparkles, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { CategoryData } from "@/modules/services/category.services";
import { getAllCategories } from "@/modules/actions/category.actions";
import { updateMealAction } from "@/modules/actions/meal.action";
import Swal from "sweetalert2";

export default function EditMealDialog({
  isEditOpen,
  setIsEditOpen,
  selectedMeal,
}: {
  isEditOpen: boolean;
  setIsEditOpen: (open: boolean) => void;
  selectedMeal: MealData | null;
  onSave?: (updatedData: Partial<MealData>) => Promise<void> | void;
}) {
  // ১. ক্যাটেগরি ও লোডিং স্টেট
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);

  const getFormDataFromMeal = (meal: MealData | null) => ({
    name: meal?.name ?? "",
    description: meal?.description ?? "",
    image: meal?.image ?? "",
    price: meal?.price ? String(meal.price) : "",
    discount: meal?.discount ?? 0,
    categoryId: meal?.categoryId ?? "",
  });

  const [formData, setFormData] = useState(() => getFormDataFromMeal(selectedMeal));

  const [isLoading, setIsLoading] = useState(false);

  // ক্যাটেগরি লোড করা
  useEffect(() => {
    async function fetchCategories() {
      if (isEditOpen && categories.length === 0) {
        setIsCategoryLoading(true);
        const response = await getAllCategories();
        
        if (response.success) {
          setCategories(response.data);
        }
        setIsCategoryLoading(false);
      }
    }

    fetchCategories();
  }, [isEditOpen, categories.length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { finalPrice } = CalculateDiscount(formData.price, formData.discount);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!selectedMeal?.id) return;
  setIsLoading(true);

  try {
    const payload = {
      ...(formData.name && { name: formData.name }),
      ...(formData.description && { description: formData.description }),
      ...(formData.image && { image: formData.image }),
      ...(formData.price && { price: Number(formData.price) }),
      ...(formData.categoryId && { categoryId: formData.categoryId }),
      discount: Number(formData.discount) || 0,
    };

    // console.log(payload);

    // Server Action কল
    const res = await updateMealAction(selectedMeal.id, payload);

    if (res.success) {
      setIsEditOpen(false);
    } else {
      Swal.fire(res.message)
    }
  } catch (error) {
    console.error("Client Submit Error:", error);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
      <DialogContent className="bg-[#0d0d0d] border border-white/10 text-gray-100 max-w-lg rounded-2xl p-0 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-none">
        <DialogHeader className="sr-only">
          <DialogTitle>খাবার সম্পাদনা করুন</DialogTitle>
        </DialogHeader>

        {selectedMeal && (
          <form onSubmit={handleSubmit}>
            {/* ইমেজ প্রিভিউ */}
            <div className="relative w-full h-48 bg-[#141414] border-b border-white/5">
              {formData.image ? (
                <Image
                  src={formData.image}
                  alt={formData.name || "Meal Preview"}
                  className="w-full h-full object-cover"
                  width={500}
                  height={300}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 gap-2">
                  <ImageIcon size={32} />
                  <span className="text-xs">ছবির URL ইনপুট দিন</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-liner-to-t from-[#0d0d0d] via-transparent to-black/40 pointer-events-none" />

              {selectedMeal.isFeatured && (
                <span className="absolute top-4 left-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-[#0d0d0d]/80 backdrop-blur-md border border-amber-500/30 px-3 py-1 rounded-full shadow-lg">
                  <Star size={12} className="fill-amber-400" /> Featured Meal
                </span>
              )}
            </div>

            <div className="p-6 space-y-4">
              {/* খাবারের নাম */}
              <div>
                <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wider mb-1.5 block">
                  খাবারের নাম
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-all"
                />
              </div>

              {/* 🏷️ ক্যাটেগরি ড্রপডাউন (অটো সার্ভার অ্যাকশন লোড) */}
              <div>
                <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wider mb-1.5 block">
                  ক্যাটেগরি (Category)
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  disabled={isCategoryLoading}
                  className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-all cursor-pointer disabled:opacity-50"
                >
                  <option value="" disabled className="bg-[#141414] text-gray-500">
                    {isCategoryLoading ? "ক্যাটেগরি লোড হচ্ছে..." : "ক্যাটেগরি নির্বাচন করুন"}
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-[#141414] text-white">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* ইমেজ URL */}
              <div>
                <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wider mb-1.5 block">
                  ইমেজ URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-all"
                />
              </div>

              {/* বিবরণ */}
              <div>
                <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wider mb-1.5 block">
                  বিবরণ
                </label>
                <textarea
                  name="description"
                  rows={2}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-[#141414] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-all resize-none"
                />
              </div>

              {/* প্রাইসিং ও ডিসকাউন্ট */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5 block">
                    মূল্য (৳)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full bg-[#141414] border border-white/10 rounded-xl px-3 py-2 text-sm font-bold text-amber-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5 block">
                    ছাড় (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    min={0}
                    max={100}
                    className="w-full bg-[#141414] border border-white/10 rounded-xl px-3 py-2 text-sm font-bold text-gray-300 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="bg-[#141414] border border-white/5 rounded-xl p-2 text-center flex flex-col justify-center">
                  <span className="text-[9px] uppercase font-bold text-gray-500">চূড়ান্ত মূল্য</span>
                  <span className="text-sm font-black text-amber-400">৳{finalPrice}</span>
                </div>
              </div>

              {/* বাটনসমূহ */}
              <div className="flex items-center justify-end gap-3 pt-5 border-t border-white/5">
                <Button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  variant="outline"
                  disabled={isLoading}
                  className="bg-transparent border-white/10 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl text-xs uppercase font-bold px-5 py-2.5"
                >
                  বাতিল
                </Button>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase rounded-xl px-6 py-2.5 flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> আপডেটিং...
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} /> সেভ করুন
                    </>
                  )}
                </Button>
              </div>

            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}