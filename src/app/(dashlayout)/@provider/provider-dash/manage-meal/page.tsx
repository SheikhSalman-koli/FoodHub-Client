
import { mealServices } from '@/modules/services/meal.services'
import { userServices } from '@/modules/services/user.service'
import ProviderMealsTable from '@/myComponents/dashboard/provider-dash/MealTable'


export default async function ManageMeal() {
    const sessionUser = await userServices.getSessionUser()

    if (!sessionUser) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Please sign in</h2>
        <p className="text-gray-500">
          You need to be logged in to view your profile.
        </p>
      </div>
    );
  }

  const { email } = sessionUser;

    // console.log(user);
    const meals = await mealServices.getProviderMeals(email)
    // console.log(meals);
  return (
    <div>
      <ProviderMealsTable 
      meals={meals || [] } 
    
      />
    </div>
  )
}   

