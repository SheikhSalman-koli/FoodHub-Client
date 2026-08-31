'use client'

import React, { useState } from 'react'
import { Star, Quote, ArrowUpRight, ChevronUp, ChevronDown } from 'lucide-react'
import { ReviewResponse } from '@/modules/services/review.service'
import Link from 'next/link'

export default function ReviewsCard({ reviews }: { reviews: ReviewResponse[] }) {
    const [showAll, setShowAll] = useState(false)
    const displayedReviews = showAll ? reviews : reviews.slice(0, 3)
    const getInitials = (name: string) => {
        if (!name) return 'U'
        const parts = name.trim().split(' ')
        return parts.length >= 2
            ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
            : name.slice(0, 2).toUpperCase()
    }

    const averageRating = reviews?.length
        ? (reviews.reduce((acc, r) => acc + r.starCount, 0) / reviews.length).toFixed(1)
        : '5.0'

    return (
        <section id="reviews" className="w-full bg-[#0d0d0d] py-10 px-6 sm:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto w-full">
                {/* Section Header */}
                <div className="max-w-2xl mb-8 space-y-1">
                    <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
                        গ্রাহকদের <span className="font-extrabold text-amber-500">মতামত ও অভিজ্ঞতা</span>
                    </h2>

                    <div className="flex items-center gap-2 pt-1 text-xs sm:text-sm text-zinc-400">
                        <div className="flex text-amber-500">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    className={
                                        i < Math.round(Number(averageRating))
                                            ? 'fill-amber-500 text-amber-500'
                                            : 'text-zinc-700'
                                    }
                                />
                            ))}
                        </div>
                        <span className="font-bold text-zinc-200">{averageRating}</span>
                        <span>({reviews.length} টি রিভিউ)</span>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {displayedReviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 relative flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 group"
                        >
                            <Quote className="absolute top-6 right-6 size-7 text-zinc-800 group-hover:text-amber-500/20 transition-colors pointer-events-none" />

                            {/* TOP & MIDDLE CONTAINER */}
                            <div>
                                {/* 1. TOP: Full-Rounded Avatar + User Name + "said about [Meal Name]" */}
                                <div className="flex items-center gap-3 pr-8">
                                    {review.user?.image ? (
                                        <img
                                            src={review.user.image}
                                            alt={review.user.name}
                                            className="size-10 rounded-full object-cover border border-amber-500/30 shrink-0"
                                        />
                                    ) : (
                                        <div className="size-10 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-bold text-xs flex items-center justify-center shrink-0">
                                            {getInitials(review.user.name)}
                                        </div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <h4 className="text-xs sm:text-sm font-bold text-zinc-100 truncate">
                                            {review.user.name}
                                        </h4>
                                        <p className="text-[11px] sm:text-xs text-zinc-400 truncate">
                                            said about{' '}
                                            <span className="text-amber-400 font-medium">
                                                {review.meal.name}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* 2. MIDDLE: Star Rating & Comment */}
                                <div className="mt-5 space-y-3">
                                    <div className="flex text-amber-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                className={
                                                    i < review.starCount
                                                        ? 'fill-amber-500 text-amber-500'
                                                        : 'text-zinc-700'
                                                }
                                            />
                                        ))}
                                    </div>

                                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                                        {`"${review.comment}"`}
                                    </p>
                                </div>
                            </div>

                            {/* 3. BOTTOM: Date + See Meal Button */}
                            <div className="pt-5 border-t border-zinc-800/60 mt-6 flex items-center justify-between gap-2">
                                <span className="text-[11px] text-zinc-500">
                                    {new Date(review.createdAt).toLocaleDateString('bn-BD', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </span>

                                <Link
                                    href={`/meals/${review.meal.id}`}
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-xl border border-amber-500/20 transition-all group/btn shrink-0"
                                >
                                    <span>খাবারটি দেখুন</span>
                                    <ArrowUpRight
                                        size={14}
                                        className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                                    />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Toggle Show All / Show Less Button */}
                {reviews.length > 3 && (
                    <div className="mt-6 flex justify-end items-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="text-sm font-bold text-gray-400 hover:text-amber-500 transition-colors uppercase border-b border-gray-800 hover:border-amber-500"
                        >
                            {showAll ? '← কম দেখুন' : 'সবগুলো দেখুন →'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}