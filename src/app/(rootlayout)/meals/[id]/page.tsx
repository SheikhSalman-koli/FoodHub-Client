import { mealServices } from '@/modules/services/meal.services'
import MealDetailsPage from '@/myComponents/root/meals/Details'
import React from 'react'

export default async function page({params}: {
  params: Promise<{ id: string }>
}) {

    const {id} =await params

    const mealData = await mealServices.getMealById(id)
    const singleMeal = Array.isArray(mealData) ? mealData[0] : mealData

  return (
    <div className=' bg-[#0d0d0d]'>
        <MealDetailsPage
        singleMealData={singleMeal}
        />
    </div>
  )
}
