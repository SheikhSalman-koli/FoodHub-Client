"use client";

import React, { useState } from "react";
import { Search, Filter, Calendar, Phone, ShoppingBag, Store } from "lucide-react";
import { OrderResponse } from "@/modules/services/order.services";


 export const getStatusBadge = (status: string) => {
    switch (status) {
      case "PLACED":
        return <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">PLACED</span>;
      case "PREPARING":
        return <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">PREPARING</span>;
      case "DELIVERED":
        return <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">DELIVERED</span>;
      case "CANCELLED":
        return <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">CANCELLED</span>;
      default:
        return <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20">{status}</span>;
    }
  };

export default function ViewAllOrders({ orders }: { orders: OrderResponse[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.contactNumber.includes(searchTerm) ||
      order.providerId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });



  return (
    <div className="space-y-5 w-full max-w-6xl mx-auto">
      
      {/*সার্চ ও ফিল্টার বার */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0F1015] border border-[#232630] p-4 rounded-2xl shadow-lg">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="অর্ডার ID বা ফোন দিয়ে খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#14161D] border border-[#2B2F3D] rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={15} className="text-amber-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#14161D] border border-[#2B2F3D] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="ALL">সব অর্ডার (All Status)</option>
            <option value="PLACED">Placed</option>
            <option value="PREPARING">Preparing</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* টেবিল  */}
      <div className="bg-[#0F1015] border border-[#232630] rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#14161D] text-slate-400 border-b border-[#232630] uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">অর্ডার আইডি</th>
                <th className="px-6 py-4">তারিখ ও সময়</th>
                <th className="px-6 py-4">প্রোভাইডারের নাম</th>
                <th className="px-6 py-4">যোগাযোগ</th>
                <th className="px-6 py-4 text-center">আইটেম সংখ্যা</th>
                <th className="px-6 py-4">মোট বিল</th>
                <th className="px-6 py-4 text-right">স্টেটাস</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#232630]/60">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/2 transition-colors">
                    
                    {/* অর্ডার আইডি */}
                    <td className="px-6 py-4 font-mono text-amber-400 font-bold">
                      #{order.id.slice(0, 8)}...
                    </td>

                    {/* তারিখ */}
                    <td className="px-6 py-4 text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-slate-500" />
                        {new Date(order.createdAt).toLocaleDateString("bn-BD", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                    {/*প্রোভাইডার আইডি */}
                    <td className="px-6 py-4 font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <Store size={12} className="text-slate-500" />
                        {/* {order.providerId.slice(0, 8)}... */}
                        {order.provider?.restaurantName}
                      </span>
                    </td>

                    {/* যোগাযোগ */}
                    <td className="px-6 py-4 font-mono text-slate-300">
                      <span className="flex items-center gap-1">
                        <Phone size={12} className="text-slate-500" />
                        {order.contactNumber}
                      </span>
                    </td>

                    {/* আইটেম সংখ্যা */}
                    <td className="px-6 py-4 text-center font-bold text-slate-200">
                      <span className="inline-flex items-center gap-1 bg-[#14161D] px-2.5 py-1 rounded-lg border border-[#2B2F3D]">
                        <ShoppingBag size={12} className="text-amber-500" />
                        {order.orderItems?.length || 0}টি
                      </span>
                    </td>

                    {/* মোট টাকা */}
                    <td className="px-6 py-4 font-bold text-emerald-400 text-sm">
                      ৳{order.totalAmount}
                    </td>

                    {/* স্টেটাস */}
                    <td className="px-6 py-4 text-right">
                      {getStatusBadge(order.status)}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
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