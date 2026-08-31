import { reviewService } from '@/modules/services/review.service'
import React from 'react'
import ReviewsCard from './cards/ReviewaCard'

export default async function Reviews() {

  const reviews = await reviewService.getReviews()
  // console.log(reviews);

  return (
    <div>

      {reviews && reviews.length > 0 ? (
        <ReviewsCard
          reviews={reviews}
        />
      ) : (
        <p>কোনো রিভিউ পাওয়া যায়নি।</p>
      )}
    </div>
  )
}
