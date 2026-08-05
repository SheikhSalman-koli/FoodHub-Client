"use client";

import React, { useState, useRef } from "react";
import { ImageIcon, Star, Loader2, Pencil, Check, X } from "lucide-react";
import Swal from "sweetalert2";
import { uploadToCloudinary } from "@/lib/helpers/uploadImage";
import { updateMealAction } from "@/modules/actions/meal.action";
import { compressImage } from "@/lib/helpers/compressImage";
import { getPublicIdFromUrl } from "@/lib/helpers/GetPublicIdFromUrl";

interface MealImageUploaderProps {
  mealId: string;
  currentImage?: string | null;
  isFeatured?: boolean;
  onImageSaved?: (newImageUrl: string) => void;
}

export default function MealImagePrev({
  mealId,
  currentImage,
  isFeatured = false,
  onImageSaved,
}: MealImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [savedImageUrl, setSavedImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // ফাইল সিলেক্ট হ্যান্ডলার
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // ফাইল বাতিল
  const handleCancel = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  // পেন বাটনে ক্লিক
  const handlePencilClick = () => {
    fileInputRef.current?.click();
  };

  // // শুধু ইমেজ সেভ করা
  // const handleSaveImage = async () => {
  //   if (!selectedFile || !mealId) return;

  //   setIsUploading(true);
  //   try {
  //     //compress image


  //     const CompressdImage = await compressImage(selectedFile)
  //     const uploadedUrl = await uploadToCloudinary(CompressdImage);

  //     if (currentImage && currentImage.includes("cloudinary")) {
  //       const publicId = getPublicIdFromUrl(currentImage);

  //       // আপনার তৈরি করা API রুটে কল করুন
  //       await fetch("/api/cloudinary/delete", {
  //         method: "POST",
  //         body: JSON.stringify({ publicId }),
  //       });
  //     }

  //     if (uploadedUrl) {
  //       // Step B: ডাটাবেজ আপডেট অ্যাকশন
  //       const res = await updateMealAction(mealId, { image: uploadedUrl });

  //       if (res.success) {
  //         setSavedImageUrl(uploadedUrl);
  //         setSelectedFile(null);
  //         setPreviewUrl(null);

  //         if (onImageSaved) onImageSaved(uploadedUrl);

  //         Swal.fire({
  //           icon: "success",
  //           title: "ছবি সফলভাবে আপডেট হয়েছে!",
  //           toast: true,
  //           position: "top-end",
  //           showConfirmButton: false,
  //           timer: 2000,
  //         });
  //       } else {
  //         Swal.fire(res.message);
  //       }
  //     }
  //   } catch (error) {
  //     // console.error("Image upload error:", error);
  //     Swal.fire("ছবি আপলোড করতে সমস্যা হয়েছে!");
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  const handleSaveImage = async () => {
  if (!selectedFile || !mealId) return;

  setIsUploading(true);
  try {
    const compressedImage = await compressImage(selectedFile);
    const uploadedUrl = await uploadToCloudinary(compressedImage);

    if (!uploadedUrl) {
      Swal.fire("ছবি আপলোড করতে সমস্যা হয়েছে!");
      return;
    }

    const res = await updateMealAction(mealId, { image: uploadedUrl });

    if (res.success) {
      if (currentImage && currentImage.includes("cloudinary")) {
        const publicId = getPublicIdFromUrl(currentImage);

        if (publicId) {
          fetch("/api/cloudinary/delete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ publicId }),
          }).catch((err) => console.error("Old image deletion failed:", err));
        }
      }

      setSavedImageUrl(uploadedUrl);
      setSelectedFile(null);
      setPreviewUrl(null);

      if (onImageSaved) onImageSaved(uploadedUrl);

      Swal.fire({
        icon: "success",
        title: "ছবি সফলভাবে আপডেট হয়েছে!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire(res.message);
    }
  } catch (error) {
    Swal.fire("ছবি আপলোড করতে সমস্যা হয়েছে!");
  } finally {
    setIsUploading(false);
  }
};


  const displayImage = previewUrl || savedImageUrl || currentImage;

  return (
    <div className="relative w-full h-48 bg-[#141414] border-b border-white/5">
      {displayImage ? (
        <img
          src={displayImage}
          alt="Meal Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 gap-2">
          <ImageIcon size={32} />
          <span className="text-xs">কোনো ছবি নেই</span>
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-[#0d0d0d] via-transparent to-black/40 pointer-events-none z-0" />

      {isFeatured && (
        <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-[#0d0d0d]/80 backdrop-blur-md border border-amber-500/30 px-3 py-1 rounded-full shadow-lg">
          <Star size={12} className="fill-amber-400" /> Featured Meal
        </span>
      )}

      {/* 🔘 কন্ট্রোল বাটন */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2 z-30">
        {selectedFile ? (
          <>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isUploading}
              className="p-2 rounded-xl bg-black/80 hover:bg-black text-gray-300 border border-white/20 transition cursor-pointer"
              title="বাতিল করুন"
            >
              <X size={16} />
            </button>

            <button
              type="button"
              onClick={handleSaveImage}
              disabled={isUploading}
              className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer transition-all active:scale-95"
            >
              {isUploading ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> আপলোড হচ্ছে...
                </>
              ) : (
                <>
                  <Check size={14} /> ছবি সেভ করুন
                </>
              )}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handlePencilClick}
            className="p-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black shadow-xl cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center border border-amber-400/50"
            title="ছবি পরিবর্তন করুন"
          >
            <Pencil size={16} />
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}