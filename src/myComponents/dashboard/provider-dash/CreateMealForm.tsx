"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalculateDiscount } from "@/lib/helpers/CalculateDiscount";
import { Loader2, Sparkles, Image as ImageIcon, PlusCircle, Upload, X, } from "lucide-react";
import Image from "next/image";
import { CategoryData } from "@/modules/services/category.services";
import { getAllCategories } from "@/modules/actions/category.actions";
import { uploadToCloudinary } from "@/lib/helpers/uploadImage";
import { createMealAction } from "@/modules/actions/meal.action";
import Swal from "sweetalert2";
import { compressImage } from "@/lib/helpers/compressImage";

export default function CreateMealForm() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    discount: 0,
    categoryId: "",
  });


  useEffect(() => {
    async function loadCategories() {
      setIsCategoryLoading(true);
      const res = await getAllCategories();
      if (res.success) {
        setCategories(res.data);
      }
      setIsCategoryLoading(false);
    }
    loadCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  // ইমেজ আপলোড 
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setErrorMessage(null);

      const compressedImage = await compressImage(file)
      const imageUrl = await uploadToCloudinary(compressedImage);

      if (imageUrl) {
        setFormData((prev) => ({ ...prev, image: imageUrl }));
      } else {
        setErrorMessage("ছবি আপলোড করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error("Image Upload Error:", error);
      setErrorMessage("ছবি আপলোড করার সময় সমস্যা দেখা দিয়েছে।");
    } finally {
      setIsUploading(false);
    }
  };

  // ছবি রিমুভ করা
  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const { finalPrice } = CalculateDiscount(formData.price, formData.discount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isUploading) {
      setErrorMessage("ছবি আপলোড সম্পন্ন হওয়া পর্যন্ত অপেক্ষা করুন।");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    if (!formData.name || !formData.price || !formData.categoryId) {
      setErrorMessage("অনুগ্রহ করে নাম, মূল্য এবং ক্যাটেগরি পূরণ করুন।");
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        image: formData.image,
        price: Number(formData.price),
        discount: Number(formData.discount) || 0,
        categoryId: formData.categoryId,
      };

      const res = await createMealAction(payload);

      if (res.success) {
        setFormData({
          name: "",
          description: "",
          image: "",
          price: "",
          discount: 0,
          categoryId: "",
        });

        Swal.fire({
          icon: "success",
          title: "খাবার তৈরি হয়েছে!",
          text: res.message || "নতুন খাবার সফলভাবে যুক্ত হয়েছে।",
          confirmButtonText: "ঠিক আছে",
        });

      } else {
        setErrorMessage(res.message || "খাবার তৈরি করতে সমস্যা হয়েছে।");
      }
    } catch (error) {
      console.error("Meal Creation Error:", error);
      setErrorMessage("সার্ভারে সমস্যা দেখা দিয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#0d0d0d] border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">

      <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2.5">
            <PlusCircle className="text-amber-500" size={24} />
            নতুন খাবার যোগ করুন
          </h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            আপনার রেস্টুরেন্ট বা কিচেন মেন্যুতে একটি নতুন আইটেম অন্তর্ভুক্ত করুন।
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">

        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs font-semibold">
            {errorMessage}
          </div>
        )}


        <div>
          <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wider mb-2 block">
            খাবারের ছবি (Meal Image)
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {/*  */}
            <div className="relative border-2 border-dashed border-white/10 hover:border-amber-500/50 rounded-2xl bg-[#141414] transition-all p-5 flex flex-col items-center justify-center text-center group cursor-pointer min-h-40">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
              />

              {isUploading ? (
                <div className="flex flex-col items-center gap-2 text-amber-500">
                  <Loader2 size={28} className="animate-spin" />
                  <span className="text-xs font-semibold">
                    ছবি আপলোড হচ্ছে...
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-white/5 rounded-full text-gray-400 group-hover:text-amber-500 group-hover:bg-amber-500/10 transition-all">
                    <Upload size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-300 group-hover:text-amber-400 transition-all">
                      ছবি আপলোড করতে ক্লিক করুন
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      JPG, PNG, WebP (Max: 5MB)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* ইমেজ প্রিভিউ */}
            <div className="relative border border-white/10 rounded-2xl bg-[#141414] overflow-hidden flex items-center justify-center min-h-40">
              {formData.image ? (
                <>
                  <Image
                    src={formData.image}
                    alt="Meal Preview"
                    fill
                    className="object-cover"
                  />

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2.5 right-2.5 bg-black/70 hover:bg-red-600 text-white p-1.5 rounded-full border border-white/10 backdrop-blur-md transition-all z-20 cursor-pointer"
                    title="ছবি মুছে ফেলুন"
                  >
                    <X size={14} />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500 p-4 text-center">
                  <ImageIcon size={32} className="text-gray-600 mb-1" />
                  <span className="text-xs font-medium text-gray-500">
                    ছবি আপলোড করলে এখানে প্রিভিউ দেখাবে
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* খাবারের নাম */}
          <div>
            <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wider mb-1.5 block">
              খাবারের নাম <span className="text-amber-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="যেমন: Special Chicken Biryani"
              className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-gray-600"
            />
          </div>

          {/* ক্যাটেগরি */}
          <div>
            <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wider mb-1.5 block">
              ক্যাটেগরি <span className="text-amber-500">*</span>
            </label>
            <select
              name="categoryId"
              required
              value={formData.categoryId}
              onChange={handleChange}
              disabled={isCategoryLoading}
              className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all cursor-pointer disabled:opacity-50"
            >
              <option value="" disabled className="bg-[#141414] text-gray-500">
                {isCategoryLoading
                  ? "ক্যাটেগরি লোড হচ্ছে..."
                  : "একটি ক্যাটেগরি নির্বাচন করুন"}
              </option>
              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                  className="bg-[#141414] text-white"
                >
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* বিবরণ */}
        <div>
          <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wider mb-1.5 block">
            বিবরণ (Description)
          </label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="খাবারের টেস্ট, সাইজ বা উপকরণ সম্পর্কিত তথ্য..."
            className="w-full bg-[#141414] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-gray-600 resize-none"
          />
        </div>

        {/* প্রাইসিং ও ডিসকাউন্ট গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5 block">
              মূল্য (৳) <span className="text-amber-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              required
              min={0}
              value={formData.price}
              onChange={handleChange}
              placeholder="ইংরেজি সংখ্যা"
              className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-amber-500 focus:outline-none focus:border-amber-500 transition-all placeholder:text-gray-600"
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
              placeholder="0"
              className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-300 focus:outline-none focus:border-amber-500 transition-all placeholder:text-gray-600"
            />
          </div>

          {/* চূড়ান্ত বিক্রয়মূল্য ডিসপ্লে */}
          <div className="bg-[#141414] border border-white/5 rounded-xl p-3 text-center flex flex-col justify-center">
            <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">
              চূড়ান্ত বিক্রয়মূল্য
            </span>
            <span className="text-base font-black text-amber-400 mt-0.5">
              ৳{finalPrice}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/5">

          <Button
            type="submit"
            disabled={isLoading || isUploading}
            className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-widest rounded-xl px-8 py-3 flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 size={15} className="animate-spin" /> সাবমিট হচ্ছে...
              </>
            ) : (
              <>
                <Sparkles size={15} /> খাবার যোগ করুন
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}