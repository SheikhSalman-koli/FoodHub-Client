
'use client'

import React, { useState } from 'react';
import {
    ArrowLeft,
    Calendar,
    Phone,
    MapPin,
    ShoppingBag,
    Star,
    XCircle,
    CheckCircle2,
    Loader2,
} from 'lucide-react';
import { OrderItemInput, OrderResponse } from '@/modules/services/order.services';
import { UpdateOrderStatusAction } from '@/modules/actions/order.actions';
import { CustomAlert } from '@/lib/helpers/Shei-Shad-Alert';
import { getStatusBadge } from '../admin-dash/ViewAllOrders';
import { createReviewAction } from '@/modules/actions/review.action';
import { authClient } from '@/lib/auth-client';

interface OrderDetailsProps {
    order: OrderResponse;
    onBack?: () => void;
}

export default function OrderDetailsPage({
    order,
    onBack,
}: OrderDetailsProps) {
    // console.log(order);
    const { data: session } = authClient.useSession();
    const id = session?.user?.id

    const [itemReviews, setItemReviews] = useState<{
        [key: string]: {
            rating: number;
            hoverRating: number;
            comment: string;
            submitted: boolean;
            isSubmitting?: boolean;
        };
    }>({});

    const handleCancelOrder = async () => {
        try {
            const result = await CustomAlert.confirm(
                "আপনি কি অর্ডারটি বাতিল করবেন ?",
                "একবার বাতিল করলে এটি আর পরিবর্তন করা যাবে না, আবার নতুন করে অর্ডার করতে হবে!"
            );

            if (!result.isConfirmed) return;

            const newStatus = 'CANCELLED';
            const res = await UpdateOrderStatusAction(order?.id, newStatus);
            if (res.success) {
                CustomAlert.success("অর্ডারটি সফলভাবে বাতিল হয়েছে!");
            } else {
                CustomAlert.error("অর্ডারটি বাতিল করতে ব্যর্থ হয়েছে!");
            }
        } catch (error: Error | unknown) {
            const errorMessage = error instanceof Error ? error.message : 'অর্ডার বাতিল করা সম্ভব হয়নি।';
            CustomAlert.error(errorMessage);
        }
    };

    // Rating handlers
    const handleRatingChange = (itemId: string, rating: number) => {
        setItemReviews((prev) => ({
            ...prev,
            [itemId]: { ...(prev[itemId] || { hoverRating: 0, comment: '', submitted: false }), rating },
        }));
    };

    const handleHoverRatingChange = (itemId: string, hoverRating: number) => {
        setItemReviews((prev) => ({
            ...prev,
            [itemId]: { ...(prev[itemId] || { rating: 0, comment: '', submitted: false }), hoverRating },
        }));
    };

    const handleCommentChange = (itemId: string, comment: string) => {
        setItemReviews((prev) => ({
            ...prev,
            [itemId]: { ...(prev[itemId] || { rating: 0, hoverRating: 0, submitted: false }), comment },
        }));
    };

    // Review submit
    const handleSingleItemReviewSubmit = async (e: React.FormEvent, item: OrderItemInput) => {
        e.preventDefault();
        const itemId = item?.id;

        if (!itemId) {
            CustomAlert.error('আইটেম আইডি অনুপস্থিত।');
            return;
        }

        const reviewData = itemReviews[itemId];

        if (!reviewData || reviewData.rating === 0) {
            CustomAlert.error('রেটিং দিন!', 'অনুগ্রহ করে রেটিং দিতে স্টার এ ক্লিক করুন।')
            return;
        }

        try {
            setItemReviews((prev) => ({
                ...prev,
                [itemId]: { ...prev[itemId], isSubmitting: true },
            }));

            const payload = {
                orderId: order.id,
                orderItemId: item.id,
                mealId: item.mealId,
                starCount: reviewData.rating,
                comment: reviewData.comment,
                customerId: id
            }

            const res = await createReviewAction(payload);

            if (res.success) {
                setItemReviews((prev) => ({
                    ...prev,
                    [itemId]: { ...prev[itemId], submitted: true, isSubmitting: false },
                }));
                CustomAlert.success("ধন্যবাদ", "আইটেমটির জন্য আপনার রিভিউ গ্রহণ করা হয়েছে।")
            } else {
                setItemReviews((prev) => ({
                    ...prev,
                    [itemId]: { ...prev[itemId], isSubmitting: false },
                }));
                CustomAlert.error(res.message || "রিভিউ জমা দিতে ব্যর্থ হয়েছে!");
            }
        } catch (error: Error | unknown) {
            setItemReviews((prev) => ({
                ...prev,
                [itemId]: { ...prev[itemId], isSubmitting: false },
            }));
            const errorMessage = error instanceof Error ? error.message : 'রিভিউ জমা দেওয়া সম্ভব হয়নি।';
            CustomAlert.error(errorMessage);
        }
    };

    const formattedDate = order?.createdAt
        ? new Date(order.createdAt).toLocaleDateString('bn-BD', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        : '';

    return (
        <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-6 text-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button
                    onClick={onBack || (() => window.history.back())}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-[#14161D] border border-[#2B2F3D] rounded-xl hover:bg-[#1f222e] transition-all"
                >
                    <ArrowLeft size={14} /> ফিরে যান
                </button>
                {getStatusBadge(order?.status)}
            </div>

            {/* Title & Cancel Button */}
            <div className="bg-[#0F1015] border border-[#232630] p-5 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                        অর্ডার আইডি: <span className="font-mono text-amber-400">#{order?.id}</span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                        <Calendar size={13} className="text-slate-500" /> {formattedDate}
                    </p>
                </div>

                {order?.status === 'PLACED' && (
                    <button
                        onClick={handleCancelOrder}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition-all active:scale-95 shrink-0"
                    >
                        <XCircle size={15} /> অর্ডার বাতিল করুন
                    </button>
                )}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Side*/}
                <div className="md:col-span-2 space-y-4">
                    <div className="bg-[#0F1015] border border-[#232630] rounded-3xl overflow-hidden shadow-xl">
                        <div className="bg-[#14161D] border-b border-[#232630] px-5 py-3.5 flex items-center gap-2">
                            <ShoppingBag size={15} className="text-amber-500" />
                            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                                অর্ডারকৃত আইটেমসমূহ ({order?.orderItems?.length || 0}টি)
                            </h3>
                        </div>

                        <div className="p-5 divide-y divide-[#232630]">
                            {order?.orderItems?.map((item: OrderItemInput, index: number) => {
                                const itemKey = item.id ?? `item-${index}`;

                                const hasExistingReview = !!item.review;
                                const isSubmittedNow = itemReviews[itemKey]?.submitted;

                                const displayRating = item.review?.starCount || itemReviews[itemKey]?.rating;

                                const currentReview = itemReviews[itemKey] || {
                                    rating: 0, hoverRating: 0, comment: '', submitted: false, isSubmitting: false,
                                };

                                return (
                                    <div key={itemKey} className="py-4 first:pt-0 last:pb-0 space-y-3">
                                      
                                        <div className="flex items-center justify-between text-xs">
                                            <div>
                                                <h4 className="font-semibold text-slate-200 text-sm">{item.name}</h4>
                                                <p className="text-slate-400 mt-0.5">
                                                    ৳{item.price} × {item.quantity}টি
                                                </p>
                                            </div>
                                            <div className="font-bold text-slate-100 text-sm">
                                                ৳{Number(item.price) * Number(item.quantity)}
                                            </div>
                                        </div>

                                        {/* Review Section if DELIVERE*/}
                                        {order?.status === 'DELIVERED' && (
                                            <div className="bg-[#14161D] border border-[#2B2F3D] p-3.5 rounded-2xl space-y-3">

                                              
                                                {(hasExistingReview || isSubmittedNow) ? (
                                                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                                                        <CheckCircle2 size={14} />
                                                        <span>
                                                            রিভিউ প্রদান করা হয়েছে ({displayRating} স্টার)
                                                        </span>

                                                      
                                                        {item.review?.comment && (
                                                            <span className="text-slate-500 italic ml-2 border-l border-slate-700 pl-2">
                                                                {item.review.comment}
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    (
                                                        < form
                                                            onSubmit={(e) => handleSingleItemReviewSubmit(e, item)}
                                                            className="space-y-2.5"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-[11px] font-medium text-slate-400">
                                                                    আইটেম রেটিং দিন:
                                                                </span>
                                                                {/* Star Rating */}
                                                                <div className="flex items-center gap-1">
                                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                                        <button
                                                                            key={star}
                                                                            type="button"
                                                                            onClick={() => handleRatingChange(itemKey, star)}
                                                                            onMouseEnter={() => handleHoverRatingChange(itemKey, star)}
                                                                            onMouseLeave={() => handleHoverRatingChange(itemKey, 0)}
                                                                            className="p-0.5 focus:outline-none transition-transform hover:scale-110"
                                                                        >
                                                                            <Star
                                                                                size={16}
                                                                                className={`${star <= (currentReview.hoverRating || currentReview.rating)
                                                                                    ? 'text-amber-400 fill-amber-400'
                                                                                    : 'text-slate-600'
                                                                                    } transition-colors`}
                                                                            />
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Comment & Submit */}
                                                            <div className="flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    placeholder={`"${item.name}" এর অনুভূতি কেমন ছিল?`}
                                                                    value={currentReview.comment}
                                                                    onChange={(e) => handleCommentChange(itemKey, e.target.value)}
                                                                    className="flex-1 bg-[#0F1015] border border-[#2B2F3D] rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                                                                />
                                                                <button
                                                                    type="submit"
                                                                    disabled={currentReview.rating === 0 || currentReview.isSubmitting}
                                                                    className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 rounded-xl transition-all inline-flex items-center gap-1"
                                                                >
                                                                    {currentReview.isSubmitting && <Loader2 size={12} className="animate-spin" />}
                                                                    জমা দিন
                                                                </button>
                                                            </div>
                                                        </form>
                                                    )
                                                )}
                                            </div>
                                        )
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Side*/}
                <div className="space-y-6">
                    
                    <div className="bg-[#0F1015] border border-[#232630] p-5 rounded-3xl shadow-xl space-y-3.5">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-[#232630] pb-2.5">
                            পেমেন্ট বিস্তারিত
                        </h3>

                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between text-slate-400">
                                <span>সাবটোটাল</span>
                                <span>৳{order?.subtotal || order?.totalAmount}</span>
                            </div>
                            {order?.deliveryFee !== undefined && (
                                <div className="flex justify-between text-slate-400">
                                    <span>ডেলিভারি চার্জ</span>
                                    <span>৳{order?.deliveryFee}</span>
                                </div>
                            )}
                            <div className="border-t border-[#232630] pt-2.5 flex justify-between font-bold text-sm text-slate-100">
                                <span>মোট পরিমাণ</span>
                                <span className="text-emerald-400">৳{order?.totalAmount}</span>
                            </div>
                        </div>
                    </div>

                    {/* Address & Contact */}
                    <div className="bg-[#0F1015] border border-[#232630] p-5 rounded-3xl shadow-xl space-y-3.5">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-[#232630] pb-2.5">
                            ডেলিভারি ঠিকানা
                        </h3>

                        <div className="space-y-3 text-xs">
                            {order?.deliveryAddress && (
                                <div className="flex items-start gap-2.5 text-slate-300">
                                    <MapPin size={15} className="text-amber-500 shrink-0 mt-0.5" />
                                    <span>{order.deliveryAddress}</span>
                                </div>
                            )}

                            {order?.contactNumber && (
                                <div className="flex items-center gap-2.5 text-slate-300 font-mono">
                                    <Phone size={15} className="text-amber-500 shrink-0" />
                                    <span>{order.contactNumber}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
