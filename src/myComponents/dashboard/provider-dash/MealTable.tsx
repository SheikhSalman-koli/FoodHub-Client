"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Star } from "lucide-react";
import { MealData } from "@/modules/services/meal.services";
import EditMealDialog from "./EditMealDialog";
import { CalculateDiscount } from "@/lib/helpers/CalculateDiscount";
import { CategoryData } from "@/modules/services/category.services";


export default function ProviderMealsTable({ meals }: { meals?: MealData[] }) {

const [selectedMeal, setSelectedMeal] = useState<MealData | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

const handleOpenEdit = (meal: MealData) => {
    setSelectedMeal(meal);
    setIsEditOpen(true);
  };

  const handleDelete = (id: string) => {
    console.log("Delete meal with ID:", id);
    // ডিলেট কনফার্মেশন মোডাল বা এপিআই কল এখানে লিখুন
  };

  return (
    <div className="w-full bg-[#141414] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      <Table>
        {/* 🥞 ১. হেডার সেকশন */}
        <TableHeader className="bg-white/2 border-b border-white/5">
          <TableRow className="border-white/5 hover:bg-transparent">
            <TableHead className="text-xs uppercase tracking-widest text-gray-400 font-bold py-4">
              ক্র.
            </TableHead>
            <TableHead className="text-xs uppercase tracking-widest text-gray-400 font-bold py-4">
              খাবার (Meal)
            </TableHead>
            <TableHead className="text-xs uppercase tracking-widest text-gray-400 font-bold">
              মূল্য (Price)
            </TableHead>
            <TableHead className="text-xs uppercase tracking-widest text-gray-400 font-bold">
              ডিসকাউন্ট
            </TableHead>
            <TableHead className="text-xs uppercase tracking-widest text-gray-400 font-bold">
              মোট অর্ডার
            </TableHead>
            <TableHead className="text-xs uppercase tracking-widest text-gray-400 font-bold">
              স্ট্যাটাস
            </TableHead>
            <TableHead className="text-xs uppercase tracking-widest text-gray-400 font-bold text-right pr-6">
              অ্যাকশন (Actions)
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* 🍱 ২. টেবিল বডি */}
        <TableBody>
          {meals?.map((meal, index) => {
            const {finalPrice} = CalculateDiscount(meal?.price, (meal?.discount ?? 0))
            return(
               <TableRow
              key={meal.id}
              className="border-b border-white/5 hover:bg-white/2 transition-colors duration-200"
            >
                  <TableCell className="text-gray-300 font-semibold text-xs">
                {index + 1}
              </TableCell>
              {/* খাবার ছবি ও নাম */}
              <TableCell className="py-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-[#0d0d0d]">
                    <Image
                      src={meal.image || "/placeholder.png"}
                      alt={meal.name}
                      className="w-full h-full object-cover"
                      width={48}
                      height={48}
                      priority
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-200 text-sm">
                      {meal.name}
                    </span>
                    <span className="text-xs text-gray-500 line-clamp-1 max-w-60">
                      {meal.description}
                    </span>
                  </div>
                </div>
              </TableCell>

              {/* প্রাইস ও ডিসকাউন্ট */}
              <TableCell>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-amber-500 text-sm">
                    ৳{finalPrice}
                  </span>
                </div>
              </TableCell>

              {/* discount */}
              <TableCell className="text-gray-300 font-semibold text-xs">
                {meal?.discount ? `${meal?.discount}%` : "নেই"}
              </TableCell>

              {/* অর্ডার কাউন্ট */}
              <TableCell className="text-gray-300 font-semibold text-xs">
                {meal.orderCount} টি
              </TableCell>

              {/* ফিচার্ড ব্যাজ */}
              <TableCell>
                {meal.isFeatured ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                    <Star size={10} className="fill-amber-400" /> Featured
                  </span>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">
                    Regular
                  </span>
                )}
              </TableCell>

              {/* 🛠️ ৩. অ্যাকশন বাটন (Edit & Delete) */}
              <TableCell className="text-right pr-6">
                <div className="flex items-center justify-end gap-2">
                  {/* Edit Button */}
                 <Button
                      onClick={() => handleOpenEdit(meal)}
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 rounded-lg bg-white/5 text-gray-400 hover:text-amber-500 hover:bg-amber-500/10 hover:border hover:border-amber-500/20 transition-all cursor-pointer"
                      title="এডিট করুন"
                    >
                      <Pencil size={15} />
                    </Button>
                    {
                        isEditOpen && selectedMeal && (
                            <EditMealDialog
                                isEditOpen={isEditOpen}   
                                setIsEditOpen={setIsEditOpen}
                                selectedMeal={selectedMeal}
                                
                            />
                        )
                    }
                  {/* Delete Button */}
                  <Button
                    onClick={() => handleDelete(meal.id)}
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 hover:border hover:border-red-500/20 transition-all cursor-pointer"
                    title="খাবার মুছুন"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  );
}
