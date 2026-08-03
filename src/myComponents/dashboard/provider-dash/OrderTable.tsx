"use client";

import { format } from "date-fns";
import { Eye, MapPin, Phone, ShoppingBag } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrderItemInput, OrderResponse, } from "@/modules/services/order.services";
import { CustomAlert } from "@/lib/helpers/Shei-Shad-Alert";
import { OrderStatus } from "@/constants/OrderStatus";
import { UpdateOrderStatusAction } from "@/modules/actions/order.actions";

// স্ট্যাটাস অনুযায়ী ডাইনামিক স্টাইলিং ম্যাপ
const statusStyles: Record<string, string> = {
  PLACED: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  PREPARING: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  READY: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  DELIVERED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
}

export default function OrdersTable({ orders }: { orders: OrderResponse[] }) {

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      if (newStatus === OrderStatus.DELIVERED) {
        const result = await CustomAlert.confirm(
          "আপনি কি নিশ্চিত যে অর্ডারটি ডেলিভারী হয়েছে?",
          "একবার DELIVERED সেট করলে এটি আর পরিবর্তন করা যাবে না।"
        );

        if (!result.isConfirmed) return; 
      }

      const res = await UpdateOrderStatusAction(orderId, newStatus);

      if (res.success) {
        CustomAlert.success(res?.message || "স্ট্যাটাস সফলভাবে আপডেট হয়েছে!");
      } else {
        CustomAlert.error(res?.message || "স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে!");
      }


    } catch (error) {
      CustomAlert.error("স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে!");
    }
  };


  return (
    <div className="w-full overflow-x-auto border border-white/10 rounded-2xl bg-[#0d0d0d]">
      <table className="w-full text-left text-sm text-gray-300">
        {/* 🏷️ Table Head */}
        <thead className="bg-white/5 border-b border-white/10 text-[11px] uppercase tracking-wider font-bold text-gray-400">
          <tr>
            <th className="py-4 px-5">অর্ডার আইডি</th>
            <th className="py-4 px-5">তারিখ</th>
            <th className="py-4 px-5">গ্রাহকের ঠিকানা</th>
            <th className="py-4 px-5">আইটেমস</th>
            <th className="py-4 px-5">মোট মূল্য</th>
            <th className="py-4 px-5">অর্ডার স্ট্যাটাস</th>
            <th className="py-4 px-5 text-right">বিস্তারিত</th>
          </tr>
        </thead>

        {/* 📝 Table Body */}
        <tbody className="divide-y divide-white/5">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-white/2 transition-colors">
              {/* Order ID */}
              <td className="py-4 px-5 font-mono font-semibold text-white">
                #{order.id.slice(0, 8)}
              </td>

              {/* Date */}
              <td className="py-4 px-5 text-xs text-gray-400">
                {format(new Date(order.createdAt), "dd MMM, yyyy - hh:mm a")}
              </td>

              {/* Address & Phone */}
              <td className="py-4 px-5 text-xs max-w-50">
                <p className="text-white truncate flex items-center gap-1">
                  <MapPin size={12} className="text-amber-400 shrink-0" />
                  {order.deliveryAddress}
                </p>
                <p className="text-gray-400 flex items-center gap-1 mt-0.5">
                  <Phone size={11} className="shrink-0" />
                  {order.contactNumber}
                </p>
              </td>

              {/* Items Summary */}
              <td className="py-4 px-5">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
                  <ShoppingBag size={12} className="text-amber-400" />
                  {order.orderItems.length} টি আইটেম
                </span>
              </td>

              {/* Price */}
              <td className="py-4 px-5 font-bold text-amber-400">
                ৳{order.totalAmount}
              </td>

              {/* 🎯 Order Status Select */}
              <td className="py-4 px-5" onClick={(e) => e.stopPropagation()}>
                {order.status === OrderStatus.CANCELLED ? (
                  /* 🔒 ১. অর্ডার ক্যানসেলড হলে শুধু রিড-অনলি ব্যাজ দেখাবে */
                  <span className="w-full inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    বাতিল (Cancelled)
                  </span>
                ) :
                  order.status === OrderStatus.DELIVERED ? (
                    /* 🔒 ১. অর্ডার ক্যানসেলড হলে শুধু রিড-অনলি ব্যাজ দেখাবে */
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      ডেলিভার্ড (Delivered)
                    </span>
                  )
                    : (
                      /* ⚙️ ২. অন্য স্ট্যাটাসের জন্য প্রোভাইডার চেঞ্জ করতে পারবে (ক্যানসেল অপশন ছাড়া) */
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value)}
                      >
                        <SelectTrigger
                          className={`w-36.25 h-8 text-xs font-bold rounded-xl border focus:ring-0 focus:ring-offset-0 transition-all ${statusStyles[order.status] || "bg-white/5 text-gray-400"
                            }`}
                        >
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent className="w-36.25 bg-[#141414] border border-white/10 text-white rounded-xl shadow-2xl p-1 z-50">
                          <SelectItem
                            value={OrderStatus.PLACED}
                            className="text-amber-400 font-semibold text-xs rounded-lg my-0.5 cursor-pointer data-highlighted:bg-amber-500/20 data-highlighted:text-amber-300"
                          >
                            নতুন অর্ডার (Placed)
                          </SelectItem>

                          <SelectItem
                            value={OrderStatus.PREPARING}
                            className="text-blue-400 font-semibold text-xs rounded-lg my-0.5 cursor-pointer data-highlighted:bg-blue-500/20 data-highlighted:text-blue-300"
                          >
                            প্রস্তুত হচ্ছে (Preparing)
                          </SelectItem>

                          <SelectItem
                            value={OrderStatus.READY}
                            className="text-purple-400 font-semibold text-xs rounded-lg my-0.5 cursor-pointer data-highlighted:bg-purple-500/20 data-highlighted:text-purple-300"
                          >
                            তৈরি (Ready)
                          </SelectItem>

                          <SelectItem
                            value={OrderStatus.DELIVERED}
                            className="text-emerald-400 font-semibold text-xs rounded-lg my-0.5 cursor-pointer data-highlighted:bg-emerald-500/20 data-highlighted:text-emerald-300"
                          >
                            ডেলিভার্ড (Delivered)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
              </td>

              {/* 🔍 Details Modal */}
              <td className="py-4 px-5 text-right">
                <OrderDetailsDialog order={order} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 📦 Order Details Modal Component
function OrderDetailsDialog({ order }: { order: OrderResponse }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-all cursor-pointer">
          <Eye size={15} />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-[#141414] border border-white/10 text-white rounded-2xl max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold border-b border-white/10 pb-3 flex justify-between items-center">
            <span>অর্ডার ডিটেইলস</span>
            <span className="text-xs font-mono text-amber-400">#{order.id.slice(0, 8)}</span>
          </DialogTitle>
        </DialogHeader>

        {/* Items Breakdown */}
        <div className="space-y-3 my-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">অর্ডারকৃত খাবারসমূহ</p>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {order.orderItems.map((item: OrderItemInput) => (
              <div
                key={item?.id}
                className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-gray-400">
                    ৳{item.price} x {item.quantity} টি
                    {(item.discount ?? 0) > 0 && (
                      <span className="text-amber-400 ml-2">({item.discount}% ছাড়)</span>
                    )}
                  </p>
                </div>
                <p className="text-sm font-bold text-amber-400">
                  ৳{Number(item.price) * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Calculation Summary */}
        <div className="border-t border-white/10 pt-3 space-y-1.5 text-xs">
          <div className="flex justify-between text-gray-400">
            <span>সাবটোটাল</span>
            <span>৳{order.subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>ডেলিভারি চার্জ</span>
            <span>৳{order.deliveryFee}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-amber-400 pt-2 border-t border-white/5">
            <span>সর্বমোট মূল্য</span>
            <span>৳{order.totalAmount}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}