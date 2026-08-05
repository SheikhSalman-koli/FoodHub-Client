"use client";

import {  useState } from "react";
import {
  Utensils,
  CheckCircle2,
  XCircle,
  ShoppingBag,
  Wallet,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { ProviderStatsData } from "@/modules/services/stats.service";

type TimeFrame = "daily" | "weekly" | "monthly";

export default function ProviderStatsDashboard({stats}: {stats: ProviderStatsData}) {
  
  // চার্ট ট্যাবের জন্য স্টেট
  const [orderTimeframe, setOrderTimeframe] = useState<TimeFrame>("daily");
  const [earnTimeframe, setEarnTimeframe] = useState<TimeFrame>("daily");


  if (!stats) {
    return (
      <div className="p-8 text-center text-gray-400 bg-[#141414] rounded-2xl border border-white/5">
        কোনো ডাটা পাওয়া যায়নি!
      </div>
    );
  }

  const { cards, charts } = stats;

  return (
    <div className="space-y-6">
      {/* mini card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
         {/* for meal */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 shadow-xl space-y-4 hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-gray-400">
              খাবারের তথ্য (Meals)
            </span>
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
              <Utensils size={20} />
            </div>
          </div>

          <div>
            <span className="text-3xl font-black text-white">{cards.meals.total}</span>
            <span className="text-xs text-gray-400 ml-2">মোট আইটেম</span>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-xs">
            <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-semibold border border-emerald-500/20">
              <CheckCircle2 size={12} /> {cards.meals.active} সক্রিয়
            </span>
            <span className="inline-flex items-center gap-1 bg-rose-500/10 text-rose-400 px-2.5 py-1 rounded-full font-semibold border border-rose-500/20">
              <XCircle size={12} /> {cards.meals.inactive} নিষ্ক্রিয়
            </span>
          </div>
        </div>

      {/* for order */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 shadow-xl space-y-4 hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-gray-400">
              অর্ডারের তথ্য (Orders)
            </span>
            <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
              <ShoppingBag size={20} />
            </div>
          </div>

          <div>
            <span className="text-3xl font-black text-white">{cards.orders.total}</span>
            <span className="text-xs text-gray-400 ml-2">মোট অর্ডার</span>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-xs">
            <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-semibold border border-emerald-500/20">
              <CheckCircle2 size={12} /> {cards.orders.delivered} ডেলিভার্ড
            </span>
            <span className="inline-flex items-center gap-1 bg-rose-500/10 text-rose-400 px-2.5 py-1 rounded-full font-semibold border border-rose-500/20">
              <XCircle size={12} /> {cards.orders.cancelled} বাতিল
            </span>
          </div>
        </div>

        {/* for finance */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 shadow-xl space-y-4 hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-gray-400">
              আয় ও খরচ (Financials)
            </span>
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Wallet size={20} />
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-400">মোট আর্নিং (Subtotal)</div>
            <span className="text-3xl font-black text-amber-400">৳{cards.finance.totalEarn.toLocaleString()}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
            <div className="bg-white/5 p-2 rounded-lg">
              <span className="text-gray-400 block">মোট বিক্রয়</span>
              <span className="font-bold text-white">৳{cards.finance.totalAmount.toLocaleString()}</span>
            </div>
            <div className="bg-white/5 p-2 rounded-lg">
              <span className="text-gray-400 block">ডেলিভারি খরচ</span>
              <span className="font-bold text-rose-400">৳{cards.finance.deliveryFeeCost.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>

   
   {/* chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

       {/* order chart */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShoppingBag size={18} className="text-amber-500" /> অর্ডার বিশ্লেষণ
              </h3>
              <p className="text-xs text-gray-400">সময় অনুযায়ী অর্ডারের সংখ্যা</p>
            </div>

            {/* Timeframe Tabs */}
            <div className="flex bg-[#0d0d0d] border border-white/10 p-1 rounded-xl text-xs">
              {(["daily", "weekly", "monthly"] as TimeFrame[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setOrderTimeframe(tab)}
                  className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                    orderTimeframe === tab
                      ? "bg-amber-500 text-black font-bold shadow"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab === "daily" ? "দৈনিক" : tab === "weekly" ? "সাপ্তাহিক" : "মাসিক"}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts[orderTimeframe]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="label" stroke="#666" fontSize={11} />
                <YAxis stroke="#666" fontSize={11} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0d0d0d", borderColor: "#333", borderRadius: "12px", color: "#fff" }}
                  formatter={(value) => [`${value} টি অর্ডার`, "অর্ডার"]}
                />
                <Bar dataKey="orders" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* finance chart */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp size={18} className="text-emerald-500" /> আয় বিশ্লেষণ (Net Earn)
              </h3>
              <p className="text-xs text-gray-400">সময় অনুযায়ী প্রোভাইডারের নিট আয়</p>
            </div>

            {/* Timeframe Tabs */}
            <div className="flex bg-[#0d0d0d] border border-white/10 p-1 rounded-xl text-xs">
              {(["daily", "weekly", "monthly"] as TimeFrame[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setEarnTimeframe(tab)}
                  className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                    earnTimeframe === tab
                      ? "bg-emerald-500 text-black font-bold shadow"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab === "daily" ? "দৈনিক" : tab === "weekly" ? "সাপ্তাহিক" : "মাসিক"}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts[earnTimeframe]}>
                <defs>
                  <linearGradient id="earnGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="label" stroke="#666" fontSize={11} />
                <YAxis stroke="#666" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0d0d0d", borderColor: "#333", borderRadius: "12px", color: "#fff" }}
                  formatter={(value) => [`৳${value ?? 0}`, "আয়"]}
                />
                <Area
                  type="monotone"
                  dataKey="earn"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#earnGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}