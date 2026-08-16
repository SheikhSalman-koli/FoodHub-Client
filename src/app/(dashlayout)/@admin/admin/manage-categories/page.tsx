import { categoryService } from '@/modules/services/category.services'
import ManageCategoriesTable from '@/myComponents/dashboard/admin-dash/CategoryTable'
import React from 'react'

export default async function Categories() {

  const categories = await categoryService.getAllCategories()

  // console.log(categories);

  return (
    <div>
      <ManageCategoriesTable 
        categories={categories}
      />
    </div>
  )
}
