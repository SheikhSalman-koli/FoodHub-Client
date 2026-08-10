"use client";

import React, { useState } from "react";
import {
  ChefHat,
  MapPin,
  Mail,
  ShieldCheck,
  Store,
  ImageIcon,
  Hash,
  Pencil,
  XCircle,
  CheckCircle2,
  Utensils,
} from "lucide-react";

import ProviderImagePrev from "./ProviderImagePrev";
import ProviderInfoUpdate, { providerUpdatedData } from "./ProviderInfoUpdate";

export interface KitchenData {
  id: string;
  authoremail: string;
  restaurantName: string;
  tagline?: string | null;
  location: string;
  logo?: string | null;
  stats?: {
    totalMeals: number;
    activeMeals: number;
    inactiveMeals: number;
  };
  meals?: { id: string; isDeleted?: boolean }[];
  _count?: { meals: number };
}

interface Props {
  data: KitchenData;
  onUpdateInfo?: (updatedData: {
    restaurantName: string;
    tagline: string;
    location: string;
  }) => Promise<void>;
  onUpdateLogo?: (newLogoUrl: string) => Promise<void>;
}

export default function KitchenRoomDisplay({
  data,
}: Props) {
 
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalMeals =
    data.stats?.totalMeals ??
    data._count?.meals ??
    data.meals?.length ??
    0;

  const activeMeals =
    data.stats?.activeMeals ??
    data.meals?.filter((m) => !m.isDeleted).length ??
    totalMeals;

  const inactiveMeals =
    data.stats?.inactiveMeals ??
    data.meals?.filter((m) => m.isDeleted).length ??
    Math.max(0, totalMeals - activeMeals);


  // লোগো ফর্মের স্টেট
  const [logoUrl, setLogoUrl] = useState(data.logo || "");

  // ইনফো আপডেট 
  const updatedData: providerUpdatedData = {
    id: data?.id,
    restaurantName: data?.restaurantName,
    tagline: data?.tagline || '',
    location: data?.location
  }

  return (
    <div className="space-y-6 text-slate-100 font-sans max-w-5xl mx-auto">

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

        {/*Image / Logo Section */}
        <div className="md:col-span-4 bg-[#0F1015] border border-[#232630] rounded-3xl p-3 sm:p-3.5 flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-amber-500 to-orange-500" />

          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2 w-full">
            <div className="flex items-center gap-1.5">
              <ImageIcon size={15} className="text-amber-500 shrink-0" />
              <span>ব্র্যান্ড লোগো / ছবি</span>
            </div>

            <button
              onClick={() => {
                setLogoUrl(data.logo || "");
                setIsLogoModalOpen(true);
              }}
              className="p-1.5 bg-[#14161D] hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 border border-[#2B2F3D] hover:border-amber-500/40 rounded-lg transition-all"
              title="ছবি পরিবর্তন করুন"
            >
              <Pencil size={13} />
            </button>

            {
              isLogoModalOpen &&
              <ProviderImagePrev
                id={data?.id}
                isLogoModalOpen={isLogoModalOpen}
                setIsLogoModalOpen={setIsLogoModalOpen}
                logoUrl={logoUrl}
                setLogoUrl={setLogoUrl}
                loading={loading}
                setLoading={setLoading}
              />
            }
          </div>

          {/* লোগো ফ্রেম */}
          <div className="relative w-full aspect-square max-w-55 rounded-2xl bg-[#14161D] border-2 border-[#2B2F3D] overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-amber-500/50 transition-colors">
            {data.logo ? (
              <img
                src={data.logo}
                alt={data.restaurantName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <ChefHat className="text-amber-500" size={56} />
            )}
          </div>
        </div>

        {/*Kitchen Details Section */}
        <div className="md:col-span-8 bg-[#0F1015] border border-[#232630] rounded-3xl p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#232630] pb-4">
              <div>
                <span className="text-[11px] font-bold text-amber-500 tracking-wider uppercase">
                  হোম কিচেন প্রোফাইল
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
                  {data.restaurantName}
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs px-3 py-1 rounded-xl font-medium">
                  <ShieldCheck size={15} />
                  ভেরিফাইড প্রোভাইডার
                </span>

                <button
                  onClick={() => {
                    setIsInfoModalOpen(true);
                  }}
                  className="p-2 bg-[#14161D] hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 border border-[#2B2F3D] hover:border-amber-500/40 rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold"
                  title="তথ্য পরিবর্তন করুন"
                >
                  <Pencil size={14} className="text-amber-500" />
                  <span className="hidden sm:inline">এডিট</span>
                </button>

                {
                  isInfoModalOpen &&
                  <ProviderInfoUpdate
                    data={updatedData}
                    isInfoModalOpen={isInfoModalOpen}
                    setIsInfoModalOpen={setIsInfoModalOpen}
                    loading={loading}
                    setLoading={setLoading}
                  />
                }
              </div>
            </div>

            {/* ট্যাগলাইন */}
            {data.tagline && (
              <div className="bg-[#14161D] border border-[#2B2F3D] px-4 py-3 rounded-2xl">
                <p className="text-xs sm:text-sm text-amber-200/90 italic font-medium">
                  {data.tagline}
                </p>
              </div>
            )}

            {/* ঠিকানা ও ইমেইল ইনফো */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-[#14161D] p-3.5 rounded-2xl border border-[#2B2F3D] flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20 shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] text-slate-400">অবস্থান / ঠিকানা</p>
                  <p className="text-xs font-semibold text-slate-200 truncate mt-0.5">
                    {data.location}
                  </p>
                </div>
              </div>

              <div className="bg-[#14161D] p-3.5 rounded-2xl border border-[#2B2F3D] flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20 shrink-0">
                  <Mail size={18} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] text-slate-400">অনার ইমেইল</p>
                  <p className="text-xs font-semibold text-slate-200 truncate mt-0.5">
                    {data.authoremail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* কিচেন আইডি */}
          <div className="pt-4 mt-4 border-t border-[#232630] flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Hash size={14} className="text-amber-500" />
              <span>আইডি:</span>
              <span className="font-mono text-slate-300 bg-[#14161D] px-2 py-0.5 rounded border border-[#2B2F3D]">
                {data.id}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Store size={14} className="text-amber-500" />
              <span>কিচেন রুম</span>
            </div>
          </div>
        </div>
      </div>


      {/* MEAL STATS SECTION */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        {/*Total Meal*/}
        <div className="relative bg-[#0F1015] border border-[#232630] hover:border-amber-500/40 rounded-2xl p-5 transition-all duration-300 group overflow-hidden shadow-lg">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                মোট খাবার (Total)
              </p>
              <h3 className="text-3xl font-black text-amber-400 mt-1">
                {totalMeals} <span className="text-sm font-medium text-slate-400">টি</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-1">লিস্টেড মোট খাবারের সংখ্যা</p>
            </div>
            <div className="p-3.5 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20 group-hover:scale-110 transition-transform">
              <Utensils size={24} />
            </div>
          </div>
        </div>

        {/*Active Meal*/}
        <div className="relative bg-[#0F1015] border border-[#232630] hover:border-emerald-500/40 rounded-2xl p-5 transition-all duration-300 group overflow-hidden shadow-lg">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                সক্রিয় খাবার (Active)
              </p>
              <h3 className="text-3xl font-black text-emerald-400 mt-1">
                {activeMeals} <span className="text-sm font-medium text-slate-400">টি</span>
              </h3>
              <p className="text-[11px] text-emerald-500/80 mt-1">অর্ডার গ্রহণের জন্য রেডি</p>
            </div>
            <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>

        {/*Inactive Meal*/}
        <div className="relative bg-[#0F1015] border border-[#232630] hover:border-rose-500/40 rounded-2xl p-5 transition-all duration-300 group overflow-hidden shadow-lg">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                নিষ্ক্রিয় খাবার (Inactive)
              </p>
              <h3 className="text-3xl font-black text-rose-400 mt-1">
                {inactiveMeals} <span className="text-sm font-medium text-slate-400">টি</span>
              </h3>
              <p className="text-[11px] text-rose-500/80 mt-1">হাইড বা স্টক-আউট করা</p>
            </div>
            <div className="p-3.5 bg-rose-500/10 text-rose-400 rounded-2xl border border-rose-500/20 group-hover:scale-110 transition-transform">
              <XCircle size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}