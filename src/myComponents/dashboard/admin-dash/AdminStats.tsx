"use client";

import React, { useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import {
    DollarSign,
    ShoppingBag,
    Users,
    Store,
    TrendingUp,
    Award,
    Utensils,
    Calendar,
    Flame,
    BarChart3,
    PieChart as PieIcon,
} from "lucide-react";
import { AdminDashboardStatsResponse } from "@/modules/services/stats.service";
import { getStatusBadge } from "./ViewAllOrders";


export default function AdminDashboardView({ stats }: { stats: AdminDashboardStatsResponse }) {
    const { kpis, statusBreakdown, growthData, recentOrders, bestProvider, topMeals } = stats;
    const [growthTimeframe, setGrowthTimeframe] = useState<"দৈনিক" | "সাপ্তাহিক" | "মাসিক">("দৈনিক");

    const timeframeMap: Record<"দৈনিক" | "সাপ্তাহিক" | "মাসিক", keyof typeof growthData> = {
        "দৈনিক": "daily",
        "সাপ্তাহিক": "weekly",
        "মাসিক": "monthly"
    };

    const currentGrowthData = growthData[timeframeMap[growthTimeframe]];

    return (
        <div className="space-y-8 w-full max-w-7xl mx-auto pb-10">

            {/* top cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Total Revenue */}
                <div className="bg-[#0F1015] border border-[#232630] p-5 rounded-3xl shadow-lg">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400">মোট রিভিনিউ</span>
                        <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
                            <DollarSign size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-black text-white">৳{kpis.totalRevenue.toLocaleString()}</h3>
                        <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                            <TrendingUp size={12} className="text-emerald-400" />
                            ডেলিভার্ড অর্ডার থেকে সংগৃহীত
                        </p>
                    </div>
                </div>

                {/* Total Orders */}
                <div className="bg-[#0F1015] border border-[#232630] p-5 rounded-3xl shadow-lg">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400">মোট অর্ডার</span>
                        <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20">
                            <ShoppingBag size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-black text-white">{kpis.totalOrders}টি</h3>
                        <p className="text-[11px] text-slate-400 mt-1">
                            সফল: <span className="text-emerald-400 font-bold">{kpis.deliveredOrders}</span> | বাতিল: <span className="text-rose-400 font-bold">{kpis.cancelledOrders}</span>
                        </p>
                    </div>
                </div>

                {/* Avg Order Value */}
                <div className="bg-[#0F1015] border border-[#232630] p-5 rounded-3xl shadow-lg">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400">গড় অর্ডার মান (AOV)</span>
                        <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-black text-white">৳{kpis.averageOrderValue}</h3>
                        <p className="text-[11px] text-slate-400 mt-1">প্রতি অর্ডারে গড় খরচ</p>
                    </div>
                </div>

                {/* Total Users Summary */}
                <div className="bg-[#0F1015] border border-[#232630] p-5 rounded-3xl shadow-lg">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400">প্ল্যাটফর্ম ব্যবহারকারী</span>
                        <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
                            <Users size={20} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <div>
                            <p className="text-lg font-black text-white">{kpis.totalCustomers}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-semibold">কাস্টমার</p>
                        </div>
                        <div className="h-8 w-px bg-[#232630]" />
                        <div>
                            <p className="text-lg font-black text-amber-400">{kpis.totalProviders}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-semibold">প্রোভাইডার</p>
                        </div>
                    </div>
                </div>

            </div>

            {/*  CHARTS SECTION (BAR & PIE CHARTS)                    */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Bar Chart: দৈনিক, সাপ্তাহিক, মাসিক Growth (2 Cols) */}
                <div className="lg:col-span-2 bg-[#0F1015] border border-[#232630] p-6 rounded-3xl shadow-lg flex flex-col justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <BarChart3 size={18} className="text-amber-500" />
                                অর্ডার ও রিভিনিউ গ্রোথ (Sales & Orders Growth)
                            </h3>
                            <p className="text-[11px] text-slate-400 mt-0.5">টাইমফ্রেমে অর্ডারের সংখ্যা ও অর্জিত আয়ের তুলনা</p>
                        </div>

                        {/* দৈনিক / সাপ্তাহিক / মাসিক Filters */}
                        <div className="flex bg-[#14161D] border border-[#232630] p-1 rounded-xl">
                            {(["দৈনিক", "সাপ্তাহিক", "মাসিক"] as const).map((tf) => (
                                <button
                                    key={tf}
                                    onClick={() => setGrowthTimeframe(tf)}
                                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${growthTimeframe === tf
                                            ? "bg-amber-500 text-black font-bold shadow-md"
                                            : "text-slate-400 hover:text-white"
                                        }`}
                                >
                                    {tf === "দৈনিক" ? "দৈনিক" : tf === "সাপ্তাহিক" ? "সাপ্তাহিক" : "মাসিক"}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={currentGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <XAxis dataKey="label" stroke="#64748B" fontSize={11} tickLine={false} />
                                <YAxis yAxisId="left" stroke="#64748B" fontSize={11} tickLine={false} />
                                <YAxis yAxisId="right" orientation="right" stroke="#64748B" fontSize={11} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#14161D", borderColor: "#2B2F3D", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                                />
                                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                                <Bar yAxisId="left" dataKey="revenue" name="Revenue (৳)" fill="#10B981" radius={[6, 6, 0, 0]} barSize={24} />
                                <Bar yAxisId="right" dataKey="orders" name="Orders Count" fill="#F59E0B" radius={[6, 6, 0, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart: Order Status Breakdown (1 Col) */}
                <div className="bg-[#0F1015] border border-[#232630] p-6 rounded-3xl shadow-lg flex flex-col justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                            <PieIcon size={18} className="text-amber-500" />
                            ডেলিভারি স্টেটাস ডিস্ট্রিবিউশন
                        </h3>
                        <p className="text-[11px] text-slate-400 mb-4">সব অর্ডারের অবস্থা অনুপাত</p>

                        <div className="h-56 w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusBreakdown}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={80}
                                        paddingAngle={4}
                                        dataKey="value"
                                    >
                                        {statusBreakdown.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="#0F1015" strokeWidth={2} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#14161D", borderColor: "#2B2F3D", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>

                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-xl font-black text-white">{kpis.totalOrders}</span>
                                <span className="text-[10px] text-slate-400 font-semibold uppercase">মোট অর্ডার</span>
                            </div>
                        </div>
                    </div>

                    {/* Legend Items */}
                    <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[#232630]">
                        {statusBreakdown.map((item) => (
                            <div key={item.name} className="flex items-center gap-2 bg-[#14161D] px-2.5 py-1.5 rounded-xl border border-[#232630]">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-[11px] text-slate-300 font-medium">{item.name}:</span>
                                <span className="text-[11px] font-bold text-white ml-auto">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* BEST PROVIDER & TOP MEALS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Best Provider Card */}
                <div className="bg-linear-to-r from-amber-500/10 via-[#0F1015] to-[#0F1015] border border-amber-500/30 p-6 rounded-3xl relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 p-6 opacity-10 text-amber-500 pointer-events-none">
                        <Award size={120} />
                    </div>

                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest mb-3">
                        <Award size={16} /> সেরা প্রোভাইডার (Best Provider)
                    </div>

                    {bestProvider ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/40">
                                    <Store size={28} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white">{bestProvider.name}</h4>
                                    <p className="text-xs text-slate-400 font-mono mt-0.5">ID: {bestProvider.id.slice(0, 10)}...</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 bg-[#14161D] p-3 rounded-2xl border border-[#2B2F3D]">
                                <div>
                                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">মোট সেলস</span>
                                    <span className="text-base font-bold text-emerald-400">৳{bestProvider.totalRevenue.toLocaleString()}</span>
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">অর্ডার পূরণ</span>
                                    <span className="text-base font-bold text-white">{bestProvider.ordersCount}টি</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-xs text-slate-500">এখনো কোনো প্রোভাইডার ডাটা নেই।</p>
                    )}
                </div>

                {/* Top 5 Meals */}
                <div className="lg:col-span-2 bg-[#0F1015] border border-[#232630] p-6 rounded-3xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <Flame size={16} className="text-amber-500" />
                            সেরা ৫টি খাবার (Top 5 Selling Meals)
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {topMeals.length > 0 ? (
                            topMeals.map((meal, idx) => (
                                <div
                                    key={meal.mealId}
                                    className="flex items-center justify-between p-3 bg-[#14161D] border border-[#232630] rounded-2xl hover:border-amber-500/30 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/20">
                                            #{idx + 1}
                                        </span>
                                        <div>
                                            <h5 className="text-xs font-bold text-white">{meal.name}</h5>
                                            <p className="text-[10px] text-slate-500 font-mono">ID: {meal.mealId.slice(0, 8)}...</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-xl text-xs font-bold border border-amber-500/20">
                                        <Utensils size={12} />
                                        {meal.totalSold}টি
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-slate-500 col-span-2 text-center py-4">কোনো ডাটা পাওয়া যায়নি।</p>
                        )}
                    </div>
                </div>

            </div>

            {/* RECENT ACTIVITY TABLE                               */}
            <div className="bg-[#0F1015] border border-[#232630] rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-[#232630] flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Calendar size={16} className="text-amber-500" />
                        সর্বশেষ অর্ডারসমূহ (Recent Activity)
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-[#14161D] text-slate-400 border-b border-[#232630] uppercase text-[10px] tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4">অর্ডার আইডি</th>
                                <th className="px-6 py-4">প্রোভাইডার</th>
                                <th className="px-6 py-4">তারিখ</th>
                                <th className="px-6 py-4">মোট বিল</th>
                                <th className="px-6 py-4 text-right">স্টেটাস</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#232630]/60">
                            {recentOrders.length > 0 ? (
                                recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-white/2 transition-colors">
                                        <td className="px-6 py-4 font-mono text-amber-400 font-bold">
                                            #{order.id.slice(0, 8)}...
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-white">
                                            {order.provider?.restaurantName || "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-slate-400">
                                            {new Date(order.createdAt).toLocaleDateString("bn-BD", {
                                                day: "numeric",
                                                month: "short",
                                            })}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-emerald-400">
                                            ৳{order.totalAmount}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {getStatusBadge(order.status)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        কোনো অর্ডার পাওয়া যায়নি।
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}