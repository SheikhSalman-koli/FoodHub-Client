import { categoryService } from '@/modules/services/category.services'
import { mealServices } from '@/modules/services/meal.services'
import { userServices } from '@/modules/services/user.service'
import ProviderMealsTable from '@/myComponents/dashboard/provider-dash/MealTable'


export default async function ManageMeal() {
    const {email} = await userServices.getSessionUser()
    // console.log(user);
    const meals = await mealServices.getProviderMeals(email)
    // console.log(meals);

    // const categories = await categoryService.getCategories()
  return (
    <div>
      <ProviderMealsTable 
      meals={meals || [] } 
    
      />
    </div>
  )
}   

