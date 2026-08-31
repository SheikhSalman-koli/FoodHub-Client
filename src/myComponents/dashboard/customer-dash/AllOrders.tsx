'use client'

import { OrderResponse } from '@/modules/services/order.services';
import { Clock, Eye, Phone, ShoppingBag } from 'lucide-react';
import { getStatusBadge } from '../admin-dash/ViewAllOrders';
import Link from 'next/link';

export default function AllOrders({ orders }: { orders: OrderResponse[] }) {
    return (
        <div className="space-y-5 w-full max-w-5xl mx-auto">
            {/* heading */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-100 tracking-tight">অর্ডারসমূহ</h2>
                    <p className="text-xs text-slate-400">সকল অর্ডারের তালিকা ও ট্রাকিং</p>
                </div>
                <span className="px-3.5 py-1.5 bg-[#14161D] text-slate-300 border border-[#2B2F3D] text-xs font-semibold rounded-full shadow-sm">
                    মোট: {orders.length}
                </span>
            </div>


            <div className="bg-[#0F1015] border border-[#232630] rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-[#14161D] text-slate-400 border-b border-[#232630] uppercase text-[10px] tracking-wider font-bold">
                            <tr>
                                <th scope="col" className="px-6 py-4">অর্ডার আইডি ও তারিখ</th>
                                <th scope="col" className="px-6 py-4">গ্রাহক</th>
                                <th scope="col" className="px-6 py-4">আইটেম</th>
                                <th scope="col" className="px-6 py-4">মোট বিল</th>
                                <th scope="col" className="px-6 py-4 text-center">স্টেটাস</th>
                                <th scope="col" className="px-6 py-4 text-right">অ্যাকশন</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#232630]/60">
                            {orders.length > 0 ? (
                                orders.map((order) => {
                                    const formattedDate = new Date(order.createdAt).toLocaleDateString('bn-BD', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    });

                                    return (
                                        <tr key={order.id} className="hover:bg-white/2 transition-colors">

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-mono font-bold text-amber-400 text-xs">
                                                    #{order.id.slice(0, 8)}...
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                                                    <Clock size={12} className="text-slate-500" />
                                                    <span>{formattedDate}</span>
                                                </div>
                                            </td>


                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-slate-200">
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5 font-mono">
                                                    <Phone size={12} className="text-slate-500" />
                                                    <span>{order.contactNumber}</span>
                                                </div>
                                            </td>


                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-start gap-2">
                                                    <ShoppingBag size={14} className="text-amber-500 shrink-0 mt-0.5" />
                                                    <div>
                                                        <div className="text-slate-200 font-medium text-xs">
                                                            {order.orderItems[0]?.name}
                                                            {order.orderItems.length > 1 && (
                                                                <span className="text-slate-400 font-normal">
                                                                    {' '}
                                                                    +আরও {order.orderItems.length - 1}টি
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-slate-400 mt-0.5">
                                                            পরিমাণ: {order.orderItems.reduce((sum, item) => sum + item.quantity, 0)}টি
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>


                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-bold text-emerald-400 text-sm">৳{order.totalAmount}</div>
                                            </td>


                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                {getStatusBadge(order.status)}
                                            </td>


                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <Link
                                                    href={`/customer/track-order/${order?.id}`}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-xl transition-all active:scale-95"
                                                >
                                                    <Eye size={13} />
                                                    বিস্তারিত দেখুন
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        কোনো অর্ডার পাওয়া যায়নি।
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
