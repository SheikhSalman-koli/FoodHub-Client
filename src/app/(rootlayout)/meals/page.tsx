import { mealServices } from "@/modules/services/meal.services";
import MealCard from "@/myComponents/root/homepage/cards/MealCard";



export default async function MealPage() {

const meals = await mealServices.getMeals()


  return (
    <div className='pt-28'>
      <MealCard
        meals={meals}
      />
    </div>
  )
}
