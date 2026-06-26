import { mealServices } from "@/modules/services/meal.services";
import MealCard from "@/myComponents/root/homepage/cards/MealCard";


export default async function MealPage() {

const meals = await mealServices.getMeals()

  return (
    <div className='pt-28 bg-[#0d0d0d] pb-10'>

      <div className="mx-auto lg:max-w-6xl px-4 lg:px-0">
      <MealCard
        meals={meals}
      />
      </div>
    </div>
  )
}
