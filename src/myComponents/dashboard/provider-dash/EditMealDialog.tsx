"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalculateDiscount } from "@/lib/helpers/CalculateDiscount";
import { MealData } from "@/modules/services/meal.services";
import { Loader2, Sparkles } from "lucide-react";
import { CategoryData } from "@/modules/services/category.services";
import { getAllCategories } from "@/modules/actions/category.actions";
import { updateMealAction } from "@/modules/actions/meal.action";
import Swal from "sweetalert2";

import MealImagePrev from "./MealImagePrev";


export default function EditMealDialog({
  isEditOpen,
  setIsEditOpen,
  selectedMeal,
  onSave,
}: {
  isEditOpen: boolean;
  setIsEditOpen: (open: boolean) => void;
  selectedMeal: MealData | null;
  onSave?: () => void;
}) {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: selectedMeal?.name ?? "",
    description: selectedMeal?.description ?? "",
    price: selectedMeal?.price ? String(selectedMeal.price) : "",
    discount: selectedMeal?.discount ?? 0,
    categoryId: selectedMeal?.categoryId ?? "",
  });


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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMeal?.id) return;
    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        categoryId: formData.categoryId,
        discount: Number(formData.discount) || 0,
      };

      const res = await updateMealAction(selectedMeal.id, payload);

      if (res.success) {
        if (onSave) onSave();
        setIsEditOpen(false);
      } else {
        Swal.fire(res.message);
      }
    } catch (error) {
      console.error("Client Submit Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { finalPrice } = CalculateDiscount(formData.price, formData.discount);

  return (
    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
      <DialogContent className="bg-[#0d0d0d] border border-white/10 text-gray-100 max-w-lg rounded-2xl p-0 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-none">
        <DialogHeader className="sr-only">
          <DialogTitle>খাবার সম্পাদনা করুন</DialogTitle>
        </DialogHeader>

        {selectedMeal && (
          <div>

            <MealImagePrev
              mealId={selectedMeal.id}
              currentImage={selectedMeal.image}
              isFeatured={selectedMeal.isFeatured}
              onImageSaved={() => onSave?.()}
            />


            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* নাম */}
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

              {/* ক্যাটেগরি */}
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
                    ছাড় (%)
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
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}