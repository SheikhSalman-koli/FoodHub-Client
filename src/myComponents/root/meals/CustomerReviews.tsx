import { Review } from '@/modules/services/meal.services'
import { Star } from 'lucide-react'
import React from 'react'

interface ReviewsProps {
    reviews: Review[]
}

export default function CustomerReviews({reviews}: ReviewsProps) {
  return (
    <div className="mt-16 pt-8 border-t border-white/5">
                    <h2 className="text-2xl font-black mb-6 flex items-center gap-2 tracking-tight">
                        <span className="w-2.5 h-6 bg-amber-500 rounded-full" />
                        গ্রাহকদের মতামত ({reviews.length})
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reviews?.map((review) => (
                            <div key={review.id} className="bg-[#141414] border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
                                <div>
                                    {/* ইউজার প্রোফাইল ও স্টার */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <img src={review?.user.image} alt={review.user.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                                            <div>
                                                <h4 className="font-bold text-sm text-white">{review?.user.name}</h4>
                                                <span className="text-[11px] text-gray-500 block">{review.createdAt}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-0.5 text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`size-3 ${i < review.starCount ? 'fill-amber-400' : 'text-gray-700'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    {/* কমেন্ট */}
                                    <p className="text-sm text-gray-400 leading-relaxed italic">{review.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
  )
}
